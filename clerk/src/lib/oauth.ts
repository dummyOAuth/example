import { createHash, randomBytes } from "crypto";

export type OAuthConfig = {
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export function getOAuthConfig(): OAuthConfig {
  const origin = (process.env.EXAMPLE_APP_ORIGIN ?? process.env.APP_ORIGIN ?? "http://localhost:3003").replace(/\/$/, "");
  const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
  return {
    issuer,
    clientId: process.env.OAUTH_CLIENT_ID ?? "demo",
    clientSecret: process.env.OAUTH_CLIENT_SECRET ?? "demo",
    redirectUri: `${origin}/callback`,
  };
}

export async function fetchDiscovery(issuer: string) {
  const url = `${issuer.replace(/\/$/, "")}/.well-known/openid-configuration`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`OpenID discovery failed: ${res.status} ${url}`);
  const doc = await res.json();
  if (!doc.authorization_endpoint || !doc.token_endpoint) {
    throw new Error("Invalid discovery document");
  }
  return doc as {
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
  };
}

export function randomUrlSafe(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export const SESSION_COOKIE = "session";
export const STATE_COOKIE = "oauth_state";
export const VERIFIER_COOKIE = "oauth_verifier";
