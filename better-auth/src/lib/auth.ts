import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";
import path from "path";

const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
const discoveryUrl = `${issuer}/.well-known/openid-configuration`;

function resolveSecret(): string {
  const raw = process.env.BETTER_AUTH_SECRET?.trim();
  if (raw && !raw.startsWith("replace-with")) return raw;
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return "build-placeholder-better-auth-secret-32ch";
  }
  if (process.env.NODE_ENV !== "production") {
    return "dev-better-auth-example-secret-32chars";
  }
  throw new Error("Set BETTER_AUTH_SECRET in .env.local (see .env.example)");
}

const dbPath = path.join(process.cwd(), ".better-auth.sqlite");

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3006";

export const auth = betterAuth({
  baseURL,
  secret: resolveSecret(),
  trustedOrigins: [baseURL, "http://localhost:3000"],
  database: new Database(dbPath),
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "dummyoauth",
          clientId: process.env.OAUTH_CLIENT_ID ?? "demo",
          clientSecret: process.env.OAUTH_CLIENT_SECRET ?? "demo",
          discoveryUrl,
          pkce: true,
          scopes: ["openid", "email", "profile"],
        },
      ],
    }),
    nextCookies(),
  ],
});
