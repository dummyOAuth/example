import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function signIn() {
  "use server";
  const result = await auth.api.signInWithOAuth2({
    body: {
      providerId: "dummyoauth",
      callbackURL: "/",
    },
    headers: await headers(),
  });
  if (result && "url" in result && typeof result.url === "string") {
    redirect(result.url);
  }
  throw new Error("Sign-in failed: no authorization URL returned");
}

async function signOut() {
  "use server";
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
  const callback =
    (process.env.BETTER_AUTH_URL ?? "http://localhost:3006") +
    "/api/auth/oauth2/callback/dummyoauth";

  return (
    <main>
      <h1>Better Auth + dummyoauth</h1>
      <p className="muted">
        Uses <code>better-auth</code> with the <code>genericOAuth</code> plugin and dummyoauth discovery.
      </p>
      <p className="muted">
        Callback: <code>{callback}</code>
      </p>
      <p className="muted">
        Issuer: <code>{issuer}</code>
      </p>
      {session?.user ? (
        <div className="card">
          <p>Signed in as {session.user.email ?? session.user.name ?? session.user.id}</p>
          <form action={signOut}>
            <button className="btn secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <form action={signIn}>
          <button className="btn" type="submit">
            Sign in with dummyoauth
          </button>
        </form>
      )}
    </main>
  );
}
