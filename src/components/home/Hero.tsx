// src/components/home/Hero.tsx
import Image from "next/image";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { Logo } from "../branding/Logo";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/hero/1.webp"
        alt="Phuket beach paradise"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo - invert colors for dark background */}
        <div className="mb-8 brightness-0 invert opacity-90">
          <Logo variant="mark" />
        </div>

        <div className="text-center space-y-3 mb-10">
          <h1
            className="text-5xl md:text-7xl font-medium text-white drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            FORTY IN PHUKET
          </h1>
          <p
            className="text-base md:text-lg italic text-white/80 drop-shadow"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            An excellent reason to celebrate.
          </p>
          <p className="text-sm md:text-base text-white/70 drop-shadow">
            Phuket, Thailand • Dec 14–19, 2026
          </p>
        </div>

        <div className="mb-10">
          <CountdownTimer dark />
        </div>

        <a
          href="#itinerary"
          className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all hover:opacity-80 rounded-full border border-white/30 backdrop-blur-sm"
          style={{ background: "rgba(44, 95, 45, 0.85)", color: "#F5F0E6" }}
        >
          View Itinerary
        </a>
      </div>
    </section>
  );
}
