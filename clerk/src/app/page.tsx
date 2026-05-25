import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function Page() {
  const issuer = (process.env.DUMMYOAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");

  return (
    <main>
      <h1>Clerk + dummyoauth</h1>
      <p className="muted">
        Uses <code>@clerk/nextjs</code>. Configure a Clerk <strong>SSO OIDC</strong> connection to your dummyoauth
        issuer (see README).
      </p>
      <p className="muted">
        dummyoauth issuer for the connection: <code>{issuer}</code>
      </p>
      <p className="muted">
        Clerk app URLs: sign-in and sign-up redirect to <code>http://localhost:3003</code>
      </p>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn" type="button">
            Sign in with Clerk
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="card">
          <p>Signed in with Clerk</p>
          <UserButton />
        </div>
      </SignedIn>
    </main>
  );
}
