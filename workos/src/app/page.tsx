import Link from "next/link";
import { getSignInUrl, getSignUpUrl, withAuth, signOut } from "@workos-inc/authkit-nextjs";

export default async function Page() {
  const issuer = (process.env.DUMMYOAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
  const { user } = await withAuth();

  if (user) {
    return (
      <main>
        <h1>WorkOS + dummyoauth</h1>
        <p className="muted">Signed in via @workos-inc/authkit-nextjs</p>
        <div className="card">
          <p>
            {user.firstName ?? user.email ?? user.id}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="btn secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </main>
    );
  }

  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  return (
    <main>
      <h1>WorkOS + dummyoauth</h1>
      <p className="muted">
        Uses <code>@workos-inc/authkit-nextjs</code>. Add a WorkOS connection to your dummyoauth OIDC issuer (README).
      </p>
      <p className="muted">
        dummyoauth issuer: <code>{issuer}</code>
      </p>
      <p className="muted">
        Redirect: <code>{process.env.WORKOS_REDIRECT_URI ?? "http://localhost:3012/callback"}</code>
      </p>
      <Link className="btn" href={signInUrl}>
        Sign in
      </Link>{" "}
      <Link className="btn secondary" href={signUpUrl}>
        Sign up
      </Link>
    </main>
  );
}
