# Auth0 + dummyoauth

Minimal [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) (`@auth0/nextjs-auth0`) sample. The app talks to **your Auth0 tenant**, not directly to dummyoauth.

## How dummyoauth fits in

1. Run dummyoauth locally and copy issuer + client credentials from the dashboard.
2. In [Auth0 Dashboard](https://manage.auth0.com/) → **Authentication** → **Enterprise** → **OIDC**, create a connection:
   - **Issuer URL**: your dummyoauth issuer (e.g. `http://localhost:3000/p/demo`)
   - **Client ID / Secret**: from dummyoauth Integration
   - **Discovery**: `/.well-known/openid-configuration` on that issuer
3. Name the connection (e.g. `dummyoauth`) and enable it for your Auth0 application.
4. Set `AUTH0_CONNECTION=dummyoauth` in `.env.local` so login uses that connection.

Flow: **Your app → Auth0 → dummyoauth (OIDC) → Auth0 → your app**.

## Setup

```bash
cp .env.example .env.local
# Fill AUTH0_* from your Auth0 application
pnpm install
pnpm dev
```

Register in Auth0 application settings:

- **Allowed Callback URLs**: `http://localhost:3004/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3004`

Development and test only — not a production identity setup.
