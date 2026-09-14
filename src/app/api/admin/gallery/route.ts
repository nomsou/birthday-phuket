import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "birthday-phuket", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    // Get current max order to append to end
    const lastImage = await prisma.galleryImage.findFirst({
      orderBy: { order: "desc" },
    });
    const nextOrder = (lastImage?.order ?? -1) + 1;

    await prisma.galleryImage.create({
      data: {
        url: result.secure_url,
        caption: caption || null,
        order: nextOrder,
      },
    });

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
