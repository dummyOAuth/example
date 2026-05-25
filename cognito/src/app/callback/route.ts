import * as client from "openid-client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getOidcConfig, redirectUri } from "@/lib/oidc";

const STATE_COOKIE = "oauth_state";
const VERIFIER_COOKIE = "oauth_verifier";
const SESSION_COOKIE = "session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const err = url.searchParams.get("error");
  if (err) {
    return NextResponse.redirect(`/?error=${encodeURIComponent(err)}`);
  }
  const jar = await cookies();
  const state = jar.get(STATE_COOKIE)?.value;
  const verifier = jar.get(VERIFIER_COOKIE)?.value;
  if (!state || !verifier) {
    return NextResponse.redirect("/?error=invalid_callback");
  }
  try {
    const oidcConfig = await getOidcConfig();
    const tokens = await client.authorizationCodeGrant(oidcConfig, url, {
      pkceCodeVerifier: verifier,
      expectedState: state,
    });
    const claims = tokens.claims();
    const res = NextResponse.redirect("/");
    res.cookies.set(
      SESSION_COOKIE,
      JSON.stringify({ user: claims, access_token: tokens.access_token }),
      { httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 },
    );
    res.cookies.delete(STATE_COOKIE);
    res.cookies.delete(VERIFIER_COOKIE);
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "token_failed";
    return NextResponse.redirect(`/?error=${encodeURIComponent(message)}`);
  }
}
