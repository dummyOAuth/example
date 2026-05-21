# Auth0 + dummyoauth

Companion OIDC client; point a custom OIDC connection at your mock issuer in dev.

## Setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Redirect URI: http://localhost:3004/callback

Development and test only.
