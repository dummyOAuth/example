# Passport.js + openid-client + dummyoauth

Express app using `openid-client` (the same underlying library many Passport OIDC strategies wrap) against your dummyoauth issuer.

## Redirect URI

`http://localhost:3007/auth/callback`

## Run

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

From repo root: `pnpm dev:example:passport`

Guide: `/guides/integrate-passport`

Development and test only.
