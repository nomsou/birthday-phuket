import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { key, value } = await req.json();

    if (!key || typeof value !== "string") {
      return NextResponse.json(
        { error: "Key and string value required" },
        { status: 400 },
      );
    }

    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 },
    );
  }
}
