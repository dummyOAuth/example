# Better Auth + dummyoauth

Uses [Better Auth](https://better-auth.com) (`better-auth`) with the **genericOAuth** plugin pointed at your dummyoauth issuer.

## Setup

```bash
cp .env.example .env.local
# Set BETTER_AUTH_URL, BETTER_AUTH_SECRET, OAUTH_ISSUER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET
pnpm install
pnpm dev
```

Register redirect URI on your dummyoauth client:

`http://localhost:3006/api/auth/oauth2/callback/dummyoauth`

Use `.env.local` (or `.env`) in this folder. `BETTER_AUTH_URL` must be `http://localhost:3006` (not the oidc example port).

Sign-in uses a server action (POST to Better Auth). Do not link to `/api/auth/sign-in/oauth2` with GET; that returns 404.

First run creates `.better-auth.sqlite` in this folder (gitignored). If sign-in errors mention missing tables, run: `pnpm dlx @better-auth/cli migrate`

Development and test only.
