import NextAuth from "next-auth";

const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
const clientId = process.env.OAUTH_CLIENT_ID ?? "demo";
const clientSecret = process.env.OAUTH_CLIENT_SECRET ?? "demo";
function resolveSecret(): string {
  const raw = process.env.AUTH_SECRET?.trim();
  if (raw && !raw.startsWith("replace-with")) return raw;
  if (process.env.NEXT_PHASE === "phase-production-build") return "build-placeholder";
  if (process.env.NODE_ENV !== "production") return "dev-authjs-example-secret";
  throw new Error("Set AUTH_SECRET in .env.local (see .env.example)");
}
const secret = resolveSecret();

process.env.AUTH_URL = process.env.AUTH_URL ?? process.env.EXAMPLE_APP_ORIGIN ?? "http://localhost:3002";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [{ id: "dummyoauth", name: "dummyoauth", type: "oidc", issuer, clientId, clientSecret }],
  secret,
});
