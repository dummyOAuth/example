import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fetchDiscovery, getOAuthConfig, SESSION_COOKIE, STATE_COOKIE, VERIFIER_COOKIE } from "@/lib/oauth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const err = url.searchParams.get("error");
  if (err) {
    return NextResponse.redirect(`/?error=${encodeURIComponent(err)}`);
  }
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get(STATE_COOKIE)?.value;
  const verifier = jar.get(VERIFIER_COOKIE)?.value;
  if (!code || !state || !expected || !verifier || state !== expected) {
    return NextResponse.redirect("/?error=invalid_callback");
  }
  const config = getOAuthConfig();
  const doc = await fetchDiscovery(config.issuer);
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: config.redirectUri,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code_verifier: verifier,
  });
  const tokenRes = await fetch(doc.token_endpoint, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const tokens = await tokenRes.json();
  if (!tokenRes.ok || typeof tokens.access_token !== "string") {
    return NextResponse.redirect("/?error=token_failed");
  }
  const userRes = await fetch(doc.userinfo_endpoint, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const user = userRes.ok ? await userRes.json() : {};
  const res = NextResponse.redirect("/");
  res.cookies.set(SESSION_COOKIE, JSON.stringify({ user, access_token: tokens.access_token }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });
  res.cookies.delete(STATE_COOKIE);
  res.cookies.delete(VERIFIER_COOKIE);
  return res;
}
