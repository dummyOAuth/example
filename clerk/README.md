# Clerk + dummyoauth

Uses `@clerk/nextjs`. Clerk does not accept a raw external issuer in app code; federate dummyoauth in the Clerk Dashboard.

## Clerk Dashboard

1. **Configure** → **SSO connections** → add **OIDC** (or custom) connection.
2. Issuer / discovery: your dummyoauth issuer (`http://localhost:3000/p/demo`) and `/.well-known/openid-configuration`.
3. Client ID and secret from dummyoauth Integration.
4. Enable the connection for your Clerk application.

## App

```bash
cp .env.example .env.local
# CLERK_* from https://dashboard.clerk.com
pnpm install
pnpm dev
```

Development and test only.
