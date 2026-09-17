import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, plusOne, plusOneName, dietary, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    await prisma.guest.create({
      data: {
        name,
        email,
        phone: phone || null,
        plusOne: plusOne || false,
        plusOneName: plusOne ? plusOneName || null : null,
        dietary: dietary || null,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
