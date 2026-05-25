import { createClient } from "@/lib/supabase/server";
import { SignInButton } from "./sign-in-button";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function Page({ searchParams }: Props) {
  const { error } = await searchParams;
  const issuer = (process.env.DUMMYOAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
  const origin = process.env.EXAMPLE_APP_ORIGIN ?? "http://localhost:3005";
  let email: string | null = null;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      email = data.user?.email ?? data.user?.id ?? null;
    } catch {
      email = null;
    }
  }

  return (
    <main>
      <h1>Supabase Auth + dummyoauth</h1>
      <p className="muted">
        Uses <code>@supabase/ssr</code>. Add a custom OIDC provider in Supabase Auth pointing at dummyoauth (README).
      </p>
      <p className="muted">
        Issuer for Supabase OIDC config: <code>{issuer}</code>
      </p>
      <p className="muted">
        Redirect: <code>{origin}/auth/callback</code>
      </p>
      {error ? <p className="error">Error: {error}</p> : null}
      {email ? (
        <div className="card">
          <p>Signed in as {email}</p>
          <form action="/auth/signout" method="post">
            <button className="btn secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
