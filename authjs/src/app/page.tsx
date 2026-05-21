import { auth, signIn, signOut } from "@/auth";

export default async function Page() {
  const session = await auth();
  const callback = "http://localhost:3002/api/auth/callback/dummyoauth";
  const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");

  return (
    <main>
      <h1>Auth.js + dummyoauth</h1>
      <p className="muted">Redirect URI: <code>{callback}</code></p>
      <p className="muted">Issuer: <code>{issuer}</code></p>
      {session?.user ? (
        <div className="card">
          <p>Signed in as {session.user.email ?? session.user.name ?? session.user.id}</p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
            <button className="btn secondary" type="submit">Sign out</button>
          </form>
        </div>
      ) : (
        <form action={async () => { "use server"; await signIn("dummyoauth", { redirectTo: "/" }); }}>
          <button className="btn" type="submit">Sign in with dummyoauth</button>
        </form>
      )}
    </main>
  );
}
