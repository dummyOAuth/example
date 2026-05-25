import { FirebaseSignIn } from "./firebase-sign-in";

export default function Page() {
  const issuer = (process.env.DUMMYOAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");

  return (
    <main>
      <h1>Firebase Auth + dummyoauth</h1>
      <p className="muted">
        Uses the <code>firebase</code> SDK with an <code>OAuthProvider</code>. Configure OpenID Connect in Firebase
        Console to use your dummyoauth issuer (README).
      </p>
      <p className="muted">
        Issuer: <code>{issuer}</code>
      </p>
      <FirebaseSignIn />
    </main>
  );
}
