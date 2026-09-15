import Image from "next/image";

const PLACEHOLDER_IMAGES = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
];

export function GallerySection() {
  return (
    <section id="gallery" className="px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Forty in Phuket Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PLACEHOLDER_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg bg-[#E0DCD0]"
            >
              <Image
                src={src}
                alt="Phuket"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
