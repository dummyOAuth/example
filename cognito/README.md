# Cognito-shaped dummyoauth + openid-client

Uses `openid-client` against the dummyoauth **cognito preset** (`/emulate/cognito`). This is not the AWS Cognito SDK; it exercises Cognito-style OAuth paths on the mock issuer.

## Setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Redirect URI: `http://localhost:3009/callback`

Development and test only.
