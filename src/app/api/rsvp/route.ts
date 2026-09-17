// src/app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

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

    // 1. Save to database
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

    // 2. Send both emails
    const fromAddress = "Forty in Phuket <guest@fortyinphuket.com>";
    const replyToAddress = "no-reply@fortyinphuket.com";

    await Promise.all([
      // Guest confirmation
      resend.emails.send({
        from: fromAddress,
        replyTo: replyToAddress,
        to: email,
        subject: "Your RSVP is confirmed",
        html: `
          <h2 style="font-family: 'Playfair Display', Georgia, serif; color: #2C5F2D;">You're confirmed for Forty in Phuket</h2>
          <p>Hi ${name},</p>
          <p>We've received your RSVP. We can't wait to celebrate with you in Phuket.</p>
          <p>We'll be in touch with more details closer to the date.</p>
          <br/>
          <p>Warmly,</p>
          <p>Fourty in Phuket!</p>
        `,
      }),

      // Admin notification
      resend.emails.send({
        from: fromAddress,
        replyTo: replyToAddress,
        to: adminEmail!,
        subject: `New RSVP from ${name}`,
        html: `
          <h2>New RSVP Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Plus One:</strong> ${plusOne ? "Yes" : "No"}</p>
          ${plusOne ? `<p><strong>Plus One Name:</strong> ${plusOneName || "Not provided"}</p>` : ""}
          <p><strong>Dietary:</strong> ${dietary || "None"}</p>
          <p><strong>Message:</strong> ${message || "None"}</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
