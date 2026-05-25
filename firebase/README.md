# Firebase Auth + dummyoauth

Uses the `firebase` JS SDK (`OAuthProvider`).

## Firebase Console

1. **Authentication** → **Sign-in method** → add **OpenID Connect** provider.
2. Issuer and client credentials from dummyoauth Integration.
3. Provider ID must match `NEXT_PUBLIC_FIREBASE_OIDC_PROVIDER_ID` (default `oidc.dummyoauth`).
4. Authorized domain: `localhost`.

## App

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Development and test only.
