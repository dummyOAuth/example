import { NextResponse } from "next/server";

const SESSION_COOKIE = "session";

export async function GET() {
  const res = NextResponse.redirect("/");
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
