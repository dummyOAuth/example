import { cookies } from "next/headers";
import { getOAuthConfig } from "@/lib/oauth";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function Page({ searchParams }: Props) {
  const { error } = await searchParams;
  const jar = await cookies();
  const raw = jar.get("session")?.value;
  let session: { user?: { sub?: string; email?: string; name?: string }; access_token?: string } | null = null;
  if (raw) {
    try {
      session = JSON.parse(raw);
    } catch {
      session = null;
    }
  }
  const config = getOAuthConfig();

  return (
    <main>
      <h1>Supabase + dummyoauth</h1>
      <p className="muted">undefined</p>
      <p className="muted">
        Register redirect URI <code>{config.redirectUri}</code> on your dummyoauth client.
      </p>
      {error ? <p className="error">Error: {error}</p> : null}
      <div className="card">
        <p className="muted">Issuer</p>
        <p><code>{config.issuer}</code></p>
        <p className="muted">Client ID: {config.clientId}</p>
      </div>
      {session?.user ? (
        <div className="card">
          <p>Signed in</p>
          {session.user.email ? <p>{session.user.email}</p> : null}
          {session.user.name ? <p>{session.user.name}</p> : null}
          {session.user.sub ? <p><code>{session.user.sub}</code></p> : null}
          <a className="btn secondary" href="/api/logout">Sign out</a>
        </div>
      ) : (
        <a className="btn" href="/api/login">Sign in with dummyoauth</a>
      )}
    </main>
  );
}
