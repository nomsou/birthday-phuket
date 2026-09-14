import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRSVPConfirmation } from "@/lib/resend";
import { rsvpSchema } from "@/lib/zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = rsvpSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.format() },
        { status: 400 },
      );
    }

    const data = validated.data;

    // Save to Neon DB
    await prisma.guest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        hotel: data.hotel || null,
        dietary: data.dietary || null,
        plusOne: data.plusOne,
        plusOneDetails: data.plusOne ? data.plusOneDetails : null,
      },
    });

    // Send Confirmation Email
    await sendRSVPConfirmation({
      name: data.name,
      email: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 },
    );
  }
}
