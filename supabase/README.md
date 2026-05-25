# Supabase Auth + dummyoauth

Uses `@supabase/ssr` and `@supabase/supabase-js`.

## Supabase Dashboard

1. **Authentication** → **Providers** → enable **OIDC** (or custom OIDC) with dummyoauth issuer and client credentials from Integration.
2. Note the provider slug (e.g. `oidc`) and set `NEXT_PUBLIC_SUPABASE_OIDC_PROVIDER`.
3. Add redirect URL `http://localhost:3005/auth/callback` in Supabase URL configuration.

## App

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Development and test only.
