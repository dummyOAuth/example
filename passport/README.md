# Passport.js + dummyoauth

Uses **Passport** with the official **`openid-client/passport`** strategy and dummyoauth OIDC discovery.

## Setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Register redirect URI: `http://localhost:3007/auth/callback`

Development and test only.
