"use client";

import { createClient } from "@/lib/supabase/client";

const provider = process.env.NEXT_PUBLIC_SUPABASE_OIDC_PROVIDER ?? "oidc";

export function SignInButton() {
  return (
    <button
      className="btn"
      type="button"
      onClick={async () => {
        const supabase = createClient();
        const origin = process.env.NEXT_PUBLIC_EXAMPLE_APP_ORIGIN ?? window.location.origin;
        await supabase.auth.signInWithOAuth({
          provider: provider as "apple",
          options: { redirectTo: `${origin}/auth/callback` },
        });
      }}
    >
      Sign in with Supabase (OIDC)
    </button>
  );
}
