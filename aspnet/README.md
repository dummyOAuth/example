# ASP.NET Core + dummyoauth

OpenIdConnect middleware with `Authority` set to your dummyoauth issuer.

## Redirect URI

`http://localhost:3010/signin-oidc`

## Run

```bash
cd examples/aspnet
export OAUTH_ISSUER=http://localhost:3000/p/demo
export OAUTH_CLIENT_ID=demo
export OAUTH_CLIENT_SECRET=demo
dotnet run
```

From repo root: `pnpm dev:example:aspnet` (wraps `dotnet run`).

Guide: `/guides/integrate-aspnet`

Development and test only.
