"use client";

import { OAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirebaseAuth, oidcProviderId } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

export function FirebaseSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (user) {
    return (
      <div className="card">
        <p>Signed in as {user.email ?? user.uid}</p>
        <button
          className="btn secondary"
          type="button"
          onClick={() => signOut(getFirebaseAuth())}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      {error ? <p className="error">{error}</p> : null}
      <button
        className="btn"
        type="button"
        onClick={async () => {
          try {
            const provider = new OAuthProvider(oidcProviderId);
            await signInWithPopup(getFirebaseAuth(), provider);
          } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
          }
        }}
      >
        Sign in with Firebase (OIDC)
      </button>
    </>
  );
}
