import * as client from "openid-client";

const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo/emulate/cognito").replace(
  /\/$/,
  "",
);
const clientId = process.env.OAUTH_CLIENT_ID ?? "demo";
const clientSecret = process.env.OAUTH_CLIENT_SECRET ?? "demo";
const origin = (process.env.EXAMPLE_APP_ORIGIN ?? "http://localhost:3009").replace(/\/$/, "");
export const redirectUri = `${origin}/callback`;

let configPromise: ReturnType<typeof client.discovery> | null = null;

export function getOidcConfig() {
  if (!configPromise) {
    configPromise = client.discovery(new URL(issuer), clientId, clientSecret);
  }
  return configPromise;
}

export { issuer, clientId };
