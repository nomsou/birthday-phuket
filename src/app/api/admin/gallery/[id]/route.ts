import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const image = await prisma.galleryImage.findUnique({ where: { id } });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Extract public_id from Cloudinary URL
    const urlParts = image.url.split("/");
    const fileNameWithExt = urlParts[urlParts.length - 1];
    const publicId = `birthday-phuket/${fileNameWithExt.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);
    await prisma.galleryImage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
