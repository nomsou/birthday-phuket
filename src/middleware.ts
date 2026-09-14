import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow public access to login page and API routes
  if (path === "/enter" || path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // --- ADMIN PROTECTION ---
  if (path.startsWith("/admin")) {
    const adminAuth = req.cookies.get("admin-auth")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD; // Use a different env var for security

    if (!adminAuth || !adminPassword || adminAuth !== adminPassword) {
      // Redirect to a specific admin login or just block access
      // For now, we'll redirect to home, but you could create /admin/login
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // --- GUEST PROTECTION ---
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
