import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ✅ ALLOW: Password entry page + all API routes
  if (path === "/enter" || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // ✅ CHECK: Single shared password cookie
  const authCookie = req.cookies.get("birthday-guest")?.value;
  const validPassword = process.env.BIRTHDAY_ADMIN_PASSWORD;

  // ❌ BLOCK: Missing cookie, missing env var, or mismatch
  if (!authCookie || !validPassword || authCookie !== validPassword) {
    const enterUrl = new URL("/enter", req.url);
    enterUrl.searchParams.set("from", path);
    return NextResponse.redirect(enterUrl);
  }

  // ✅ ALLOW: Authenticated user accessing protected route
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/itinerary", "/travel"],
};
