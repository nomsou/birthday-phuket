import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/enter" || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  const authCookie = req.cookies.get("birthday-guest")?.value;
  const validPassword = process.env.BIRTHDAY_ADMIN_PASSWORD;

  if (!authCookie || !validPassword || authCookie !== validPassword) {
    const enterUrl = new URL("/enter", req.url);
    enterUrl.searchParams.set("from", path);
    return NextResponse.redirect(enterUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
