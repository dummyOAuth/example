import { auth0 } from "@/lib/auth0";

export default async function Page() {
  const session = await auth0.getSession();
  const connection = process.env.AUTH0_CONNECTION?.trim();
  const loginHref = connection
    ? `/auth/login?connection=${encodeURIComponent(connection)}`
    : "/auth/login";
  const issuer = (process.env.DUMMYOAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
  const appBase = process.env.APP_BASE_URL ?? "http://localhost:3004";

  return (
    <main>
      <h1>Auth0 + dummyoauth</h1>
      <p className="muted">
        This app uses <code>@auth0/nextjs-auth0</code>. Your users sign in through your Auth0 tenant; in dev,
        federate dummyoauth with a custom OIDC connection (see README).
      </p>
      <p className="muted">
        Callback URL for Auth0: <code>{appBase}/auth/callback</code>
      </p>
      <p className="muted">
        dummyoauth issuer (OIDC connection): <code>{issuer}</code>
      </p>
      {connection ? (
        <p className="muted">
          Connection: <code>{connection}</code> (via <code>AUTH0_CONNECTION</code>)
        </p>
      ) : null}
      <div className="card">
        <p className="muted">Auth0 domain</p>
        <p>
          <code>{process.env.AUTH0_DOMAIN ?? "(set AUTH0_DOMAIN)"}</code>
        </p>
      </div>
      {session?.user ? (
        <div className="card">
          <p>Signed in</p>
          {session.user.email ? <p>{session.user.email}</p> : null}
          {session.user.name ? <p>{session.user.name}</p> : null}
          {session.user.sub ? <p><code>{session.user.sub}</code></p> : null}
          <a className="btn secondary" href="/auth/logout">
            Sign out
          </a>
        </div>
      ) : (
        <a className="btn" href={loginHref}>
          Log in with Auth0
        </a>
      )}
    </main>
  );
}
