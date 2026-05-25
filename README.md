# dummyoauth examples (public repo)

Minimal standalone sample apps for [dummyoauth](https://dummyoauth.com). Each uses the **real framework package** where possible.

## Summary

| Folder | Package(s) | dummyoauth | Extra setup |
|--------|------------|------------|-------------|
| `oidc` | (vanilla `fetch`) | Direct OIDC + PKCE | None |
| `authjs` | `next-auth` | Direct OIDC provider | `AUTH_SECRET` |
| `auth0` | `@auth0/nextjs-auth0` | Via Auth0 OIDC connection | Auth0 tenant |
| `better-auth` | `better-auth` + genericOAuth | Direct discovery | SQLite file auto-created |
| `passport` | `passport` + `openid-client` | Direct discovery | None |
| `cognito` | `openid-client` | Cognito **preset** issuer | None |
| `clerk` | `@clerk/nextjs` | Via Clerk SSO OIDC connection | Clerk app keys |
| `supabase` | `@supabase/ssr` | Via Supabase OIDC provider | Supabase project |
| `firebase` | `firebase` | Via Firebase OIDC provider | Firebase project |
| `workos` | `@workos-inc/authkit-nextjs` | Via WorkOS connection | WorkOS keys |
| `aspnet` | OpenIdConnect | Direct Authority | .NET SDK |
| `spring` | Spring OAuth2 client | `issuer-uri` | Java/Maven |

## Run

```bash
cd authjs   # or any folder
cp .env.example .env.local
pnpm install
pnpm dev
```

Start dummyoauth on port 3000 and register the redirect URI from the example home page.

## Verify builds (monorepo)

```bash
node scripts/test-examples.mjs
```

## Git

This tree is a **separate repository** from the main dummyoauth product (parent repo gitignores `examples/`). Do not `git init` inside individual example folders.

Development and test only.
