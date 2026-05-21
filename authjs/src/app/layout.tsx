import type { ReactNode } from "react";
import "./globals.css";
export const metadata = { title: "Auth.js example", description: "Minimal dummyoauth OAuth example" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}