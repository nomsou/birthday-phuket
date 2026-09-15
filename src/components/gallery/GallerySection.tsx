const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
];
export function GallerySection() {
  return (
    <section id="gallery" className="px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          {/* <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            Memories
          </p> */}
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Forty in Phuket Gallery
          </h2>
          {/* <p className="text-sm" style={{ color: "#5A5A5A" }}>
            Placeholder imagery — swap in real Phuket photos here.
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PLACEHOLDER_IMAGES.map((src, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-lg bg-[#E0DCD0]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Phuket placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
