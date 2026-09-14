import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== process.env.BIRTHDAY_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("birthday-guest", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
