import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow public access to login page and API routes
  if (path === "/enter" || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  const auth = req.cookies.get("birthday-guest")?.value;
  const validPassword = process.env.BIRTHDAY_ADMIN_PASSWORD;

  if (!auth || !validPassword || auth !== validPassword) {
    const enterUrl = new URL("/enter", req.url);
    enterUrl.searchParams.set("from", path);
    return NextResponse.redirect(enterUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/itinerary", "/travel", "/gallery", "/rsvp", "/admin/:path*"],
};
