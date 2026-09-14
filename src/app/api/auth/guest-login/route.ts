import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const guestPassword = process.env.BIRTHDAY_ADMIN_PASSWORD;
    const adminPassword = process.env.ADMIN_PASSWORD; // Add this to .env.local

    const res = NextResponse.json({ ok: true });

    // Check for Admin Password first
    if (password === adminPassword) {
      res.cookies.set("admin-auth", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      // Also set guest cookie so they can view the site
      res.cookies.set("birthday-guest", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    // Check for Guest Password
    if (password === guestPassword) {
      res.cookies.set("birthday-guest", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
