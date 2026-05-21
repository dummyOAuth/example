import type { ReactNode } from "react";
import "./globals.css";
export const metadata = { title: "Clerk + dummyoauth", description: "Minimal dummyoauth OAuth example" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}