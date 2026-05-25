import type { ReactNode } from "react";
import "./globals.css";
export const metadata = {
  title: "Auth0 + dummyoauth",
  description: "Auth0 Next.js SDK with dummyoauth OIDC federation",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}