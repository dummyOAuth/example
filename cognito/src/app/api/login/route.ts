import * as client from "openid-client";
import { NextResponse } from "next/server";
import { getOidcConfig, redirectUri } from "@/lib/oidc";

const STATE_COOKIE = "oauth_state";
const VERIFIER_COOKIE = "oauth_verifier";

export async function GET() {
  const oidcConfig = await getOidcConfig();
  const state = client.randomState();
  const verifier = client.randomPKCECodeVerifier();
  const challenge = await client.calculatePKCECodeChallenge(verifier);
  const url = client.buildAuthorizationUrl(oidcConfig, {
    redirect_uri: redirectUri,
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });
  const res = NextResponse.redirect(url.href);
  const opts = { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 600 };
  res.cookies.set(STATE_COOKIE, state, opts);
  res.cookies.set(VERIFIER_COOKIE, verifier, opts);
  return res;
}
