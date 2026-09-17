// src/app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmails =
  process.env.ADMIN_EMAIL?.split(",")
    .map((e) => e.trim())
    .filter(Boolean) ?? [];

const SITE_URL = "https://fortyinphuket.com";
const HERO_IMAGE = `${SITE_URL}/email/hero.jpg`;

// Shared email wrapper — brand-consistent shell for both emails
function emailShell({ preheader, body }: { preheader: string; body: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forty in Phuket</title>
</head>
<body style="margin:0; padding:0; background-color:#F5F0E6; font-family: Georgia, 'Times New Roman', serif; -webkit-font-smoothing:antialiased;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    ${preheader}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F0E6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border-radius:16px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">

          <!-- Hero image -->
          <tr>
            <td style="padding:0; line-height:0;">
              <img src="${HERO_IMAGE}" alt="Phuket" width="600" style="display:block; width:100%; max-width:600px; height:auto; border:0; outline:none; text-decoration:none;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 40px 48px 40px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px 40px; border-top: 1px solid #E0DCD0; text-align:center;">
              <p style="margin:0; font-family: Georgia, serif; font-size:12px; letter-spacing: 0.15em; text-transform: uppercase; color:#5A5A5A;">
                Forty in Phuket
              </p>
              <p style="margin:8px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:11px; color:#5A5A5A; opacity:0.7;">
                Phuket, Thailand &middot; December 14–19, 2026
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, plusOne, plusOneName, message } = body;

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
        plusOne: plusOne || false,
        plusOneName: plusOne ? plusOneName || null : null,
        message: message || null,
      },
    });

    const fromAddress = "Forty in Phuket <guest@fortyinphuket.com>";
    const replyToAddress = "no-reply@fortyinphuket.com";

    // Guest confirmation email body
    const guestBody = `
      <h1 style="margin:0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size:28px; font-weight:500; line-height:1.25; color:#2C5F2D;">
        You're confirmed.
      </h1>

      <p style="margin:0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:15px; line-height:1.6; color:#1A1A1A;">
        Hi ${name},
      </p>

      <p style="margin:0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:15px; line-height:1.6; color:#5A5A5A;">
        We've received your RSVP. We can't wait to celebrate with you in Phuket.
      </p>

      <p style="margin:0 0 32px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:15px; line-height:1.6; color:#5A5A5A;">
        We'll be in touch with more details closer to the date. In the meantime, save the dates.
      </p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 32px 0;">
        <tr>
          <td style="background-color:#2C5F2D; border-radius:9999px;">
            <a href="${SITE_URL}#itinerary" style="display:inline-block; padding:14px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:13px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#F5F0E6; text-decoration:none; border-radius:9999px;">
              View Itinerary
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:14px; line-height:1.6; color:#5A5A5A; font-style:italic;">
        Warmly,<br/>
        Nonso &amp; Tijani
      </p>
    `;

    // Admin notification body
    const adminBody = `
      <h1 style="margin:0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size:28px; font-weight:500; line-height:1.25; color:#2C5F2D;">
        New RSVP Received
      </h1>

      <p style="margin:0 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:15px; line-height:1.6; color:#5A5A5A;">
        ${name} just confirmed their spot for Forty in Phuket.
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F0E6; border-radius:12px; padding:0;">
        <tr>
          <td style="padding: 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:13px; color:#5A5A5A; width:120px; vertical-align:top;">
                  Name
                </td>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:14px; color:#1A1A1A; font-weight:500;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:13px; color:#5A5A5A; vertical-align:top;">
                  Email
                </td>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:14px; color:#1A1A1A;">
                  <a href="mailto:${email}" style="color:#2C5F2D; text-decoration:underline;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:13px; color:#5A5A5A; vertical-align:top;">
                  Plus One
                </td>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:14px; color:#1A1A1A;">
                  ${plusOne ? (plusOneName ? `Yes — ${plusOneName}` : "Yes") : "No"}
                </td>
              </tr>
              ${
                message
                  ? `
              <tr>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:13px; color:#5A5A5A; vertical-align:top;">
                  Message
                </td>
                <td style="padding: 6px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:14px; color:#1A1A1A; line-height:1.6;">
                  ${message}
                </td>
              </tr>
              `
                  : ""
              }
            </table>
          </td>
        </tr>
      </table>
    `;

    await Promise.all([
      resend.emails.send({
        from: fromAddress,
        replyTo: replyToAddress,
        to: email,
        subject: "Your RSVP is confirmed: Forty in Phuket",
        html: emailShell({
          preheader: "You're confirmed for Forty in Phuket.",
          body: guestBody,
        }),
      }),

      resend.emails.send({
        from: fromAddress,
        replyTo: replyToAddress,
        to: "no-reply@fortyinphuket.com",
        bcc: adminEmails,
        subject: `New RSVP from ${name}`,
        html: emailShell({
          preheader: `${name} just RSVP'd for Forty in Phuket.`,
          body: adminBody,
        }),
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
