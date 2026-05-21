# dummyoauth examples (public repo)

Minimal standalone sample apps for [dummyoauth](https://dummyoauth.com). Each folder has only the dependencies that framework needs.

## Layout

| Folder | Port | Notes |
|--------|------|--------|
| `oidc` | 3001 | Vanilla OIDC + PKCE |
| `authjs` | 3002 | Auth.js (NextAuth v5) |
| `clerk` | 3003 | Companion OIDC client |
| `auth0` | 3004 | Companion OIDC client |
| `supabase` | 3005 | Companion OIDC client |
| `better-auth` | 3006 | Companion OIDC client |
| `passport` | 3007 | Express |
| `firebase` | 3008 | Companion OIDC client |
| `cognito` | 3009 | Cognito preset issuer |
| `aspnet` | 3010 | ASP.NET Core |
| `spring` | 3011 | Spring Boot |
| `workos` | 3012 | Companion OIDC client |

## Run one example

```bash
cd authjs
cp .env.example .env.local
# Fill OAUTH_* from dummyoauth dashboard Integration
pnpm install
pnpm dev
```

Register the redirect URI shown on the example home page on your dummyoauth OAuth client.

## Relationship to the main dummyoauth repo

The **product** repo (`dummyoauth`) keeps `examples/` on disk for development but **does not commit** this tree (see parent `.gitignore`). This directory is its **own git repository** for [github.com/dummyOAuth/example](https://github.com/dummyOAuth/example).

Do **not** run `git init` inside individual folders (`auth0/`, `clerk/`, etc.). Only this `examples/` root should be a git repo.

From the monorepo root after changing examples:

```bash
node scripts/fix-examples-embedded-git.mjs --unstage   # if nested .git appeared again
cd examples && git add -A && git commit -m "..."
```

Or export a clean copy without any `.git` metadata:

```bash
node scripts/sync-example-repo.mjs /path/to/example-repo-clone
cd /path/to/example-repo-clone && git add -A && git commit -m "..."
```

Development and test only — not a production identity provider.
