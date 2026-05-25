import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export function getFirebaseAuth() {
  const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  return getAuth(app);
}

export const oidcProviderId =
  process.env.NEXT_PUBLIC_FIREBASE_OIDC_PROVIDER_ID ?? "oidc.dummyoauth";
