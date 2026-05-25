import { cookies } from "next/headers";
import { issuer } from "@/lib/oidc";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function Page({ searchParams }: Props) {
  const { error } = await searchParams;
  const jar = await cookies();
  const raw = jar.get("session")?.value;
  let session: { user?: { sub?: string; email?: string; name?: string } } | null = null;
  if (raw) {
    try {
      session = JSON.parse(raw);
    } catch {
      session = null;
    }
  }
  const redirect = (process.env.EXAMPLE_APP_ORIGIN ?? "http://localhost:3009") + "/callback";

  return (
    <main>
      <h1>Amazon Cognito + dummyoauth</h1>
      <p className="muted">
        Uses <code>openid-client</code> against the dummyoauth <strong>cognito preset</strong> issuer (no AWS SDK).
      </p>
      <p className="muted">
        Register redirect URI <code>{redirect}</code> on your dummyoauth client.
      </p>
      {error ? <p className="error">Error: {error}</p> : null}
      <div className="card">
        <p className="muted">Issuer</p>
        <p>
          <code>{issuer}</code>
        </p>
      </div>
      {session?.user ? (
        <div className="card">
          <p>Signed in</p>
          {session.user.email ? <p>{session.user.email}</p> : null}
          {session.user.sub ? <p><code>{session.user.sub}</code></p> : null}
          <a className="btn secondary" href="/api/logout">
            Sign out
          </a>
        </div>
      ) : (
        <a className="btn" href="/api/login">
          Sign in with dummyoauth (cognito paths)
        </a>
      )}
    </main>
  );
}
