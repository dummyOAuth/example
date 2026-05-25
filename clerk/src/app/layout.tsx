import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Clerk + dummyoauth",
  description: "Clerk with dummyoauth OIDC enterprise connection",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local (see .env.example)");
  }
  return (
    <ClerkProvider publishableKey={key}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
