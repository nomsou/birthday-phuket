import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Nonso & Tijani",
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            Memories
          </p>
          <h1
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Photo Gallery
          </h1>
        </div>

        {/* Grid */}
        {images.length === 0 ? (
          <div
            className="py-20 text-center border-2 border-dashed"
            style={{ borderColor: "#E0DCD0" }}
          >
            <p className="text-sm" style={{ color: "#5A5A5A" }}>
              Photos coming soon. Check back after the celebration!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-lg bg-[#E0DCD0]"
              >
                <Image
                  src={img.url}
                  alt={img.caption || "Birthday moment"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "#5A5A5A" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
