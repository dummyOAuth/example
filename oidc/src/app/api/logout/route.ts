import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/oauth";

export async function GET() {
  const res = NextResponse.redirect("/");
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
