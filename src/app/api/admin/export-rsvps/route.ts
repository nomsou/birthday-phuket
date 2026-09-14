import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows: string[] = [];
  // Header row
  rows.push(
    [
      "Name",
      "Email",
      "Phone",
      "Hotel",
      "Dietary",
      "Plus One",
      "Plus One Details",
      "RSVP Date",
    ]
      .map((h) => `"${h}"`)
      .join(","),
  );

  for (const guest of guests) {
    const date = new Date(guest.createdAt);
    const dateStr = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const row = [
      guest.name,
      guest.email,
      guest.phone,
      guest.hotel || "",
      guest.dietary || "",
      guest.plusOne ? "Yes" : "No",
      guest.plusOneDetails || "",
      dateStr,
    ]
      .map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`)
      .join(",");

    rows.push(row);
  }

  const csv = rows.join("\r\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="birthday-rsvps-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
