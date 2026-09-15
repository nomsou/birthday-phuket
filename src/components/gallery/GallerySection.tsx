"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER_IMAGES = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
];

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i + 1) % PLACEHOLDER_IMAGES.length,
      ),
    [],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null
          ? i
          : (i - 1 + PLACEHOLDER_IMAGES.length) % PLACEHOLDER_IMAGES.length,
      ),
    [],
  );

  // Keyboard controls while the lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    // Prevent background scroll while the lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PLACEHOLDER_IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-[#E0DCD0] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5F2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6]"
              aria-label={`Open image ${i + 1} of ${PLACEHOLDER_IMAGES.length}`}
            >
              <Image
                src={src}
                alt="Phuket"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                priority={i < 3}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Image container — click inside doesn't close */}
          <div
            className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-[#F5F0E6] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PLACEHOLDER_IMAGES[activeIndex]}
              alt={`Phuket ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />

            {/* Close — top-right, inside the frame */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#1A1A1A] shadow-md transition-transform hover:scale-105"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Prev — left-center, inside the frame */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#1A1A1A] shadow-md transition-transform hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next — right-center, inside the frame */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#1A1A1A] shadow-md transition-transform hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter — bottom-center, inside the frame */}
            <p className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
              {activeIndex + 1} / {PLACEHOLDER_IMAGES.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
