import { prisma } from "@/lib/prisma";
import AdminGalleryClient from "@/components/admin/AdminGalleryClient";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  return <AdminGalleryClient initialImages={images} />;
}
