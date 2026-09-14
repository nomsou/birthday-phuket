import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRSVPConfirmation({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Nonso & Tijani Birthday <hello@yourdomain.com>",
      to: email,
      subject: "You're In!  Birthday Paradise RSVP Confirmed",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;color:#1A1A1A;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#2C5F2D;margin-bottom:24px;">
            NONSO & TIJANI • BIRTHDAY PARADISE
          </p>
          <h2 style="font-size:22px;font-weight:500;margin-bottom:8px;">
            Welcome to paradise, ${name}! 🎉
          </h2>
          <p style="font-size:14px;color:#5A5A5A;margin-bottom:24px;">
            Your RSVP has been confirmed for our birthday celebration in Phuket, Thailand (Dec 14-19).
          </p>
          <p style="font-size:14px;color:#5A5A5A;margin-bottom:32px;">
            You'll receive detailed travel information, itinerary updates, and logistics via:
          </p>
          <ul style="font-size:14px;color:#5A5A5A;margin-bottom:32px;padding-left:20px;">
            <li>Email: ${email}</li>
            <li>WhatsApp (to the number you provided)</li>
          </ul>
          <p style="font-size:14px;color:#5A5A5A;margin-bottom:32px;">
            Get ready for an birthday paradise experience! 🌺🍹
          </p>
          <hr style="margin:32px 0;border:none;border-top:1px solid #E0DCD0;" />
          <p style="font-size:11px;color:#5A5A5A;">Nonso & Tijani • Phuket, Thailand</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Failed to send RSVP confirmation:", err);
    throw err;
  }
}
