import { NextResponse } from "next/server";
import { fetchDiscovery, getOAuthConfig, pkceChallenge, randomUrlSafe, STATE_COOKIE, VERIFIER_COOKIE } from "@/lib/oauth";

export async function GET() {
  const config = getOAuthConfig();
  const doc = await fetchDiscovery(config.issuer);
  const state = randomUrlSafe(24);
  const verifier = randomUrlSafe(48);
  const url = new URL(doc.authorization_endpoint);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", pkceChallenge(verifier));
  url.searchParams.set("code_challenge_method", "S256");
  const res = NextResponse.redirect(url.toString());
  const opts = { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 600 };
  res.cookies.set(STATE_COOKIE, state, opts);
  res.cookies.set(VERIFIER_COOKIE, verifier, opts);
  return res;
}
