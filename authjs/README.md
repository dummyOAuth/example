# Auth.js (NextAuth v5) + dummyoauth

Minimal Next.js app using Auth.js with an OIDC provider pointed at your dummyoauth project issuer.

## Prerequisites

1. Run dummyoauth (`pnpm dev` from repo root) or use your hosted project.
2. Create a project, generic OIDC preset, OAuth client, and dummy user.
3. Register redirect URI: `http://localhost:3002/api/auth/callback/dummyoauth`

## Setup

```bash
cp .env.example .env.local
# Paste OAUTH_* values from dashboard Integration
pnpm install
pnpm dev
```

From repo root: `pnpm dev:example:authjs`

## Guide

[Integrate Auth.js with dummyoauth](https://dummyoauth.com/guides/integrate-authjs)

Development and test only. Swap issuer and client credentials for production.
