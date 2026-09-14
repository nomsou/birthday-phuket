import type { Metadata } from "next";
import Link from "next/link";
import { CountdownTimer } from "@/components/home/CountdownTimer";

export const metadata: Metadata = {
  title: "Nonso & Tijani | Birthday Paradise",
  description:
    "Private birthday celebration in Phuket, Thailand. Dec 14-19, 2026.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#F5F0E6]">
      {/* Header */}
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <h1
          className="text-4xl md:text-6xl font-medium"
          style={{
            color: "#2C5F2D",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          BIRTHDAY PARADISE
        </h1>
        <p className="text-sm md:text-base" style={{ color: "#5A5A5A" }}>
          Phuket, Thailand • Dec 14–19, 2026
        </p>
      </div>

      {/* Countdown */}
      <div className="mb-12">
        <CountdownTimer />
      </div>

      {/* Dual Arch Frame */}
      <div className="relative w-full max-w-2xl mx-auto mb-12">
        {/* Green Arch (Nonso) */}
        <div
          className="absolute inset-0 rounded-t-full border-[12px] md:border-[16px]"
          style={{
            borderColor: "#2C5F2D",
            clipPath: "inset(0 50% 0 0 round 100% 0 0 0)",
            transform: "translateX(-8px)",
          }}
        />
        {/* Blue Arch (Tijani) */}
        <div
          className="absolute inset-0 rounded-t-full border-[12px] md:border-[16px]"
          style={{
            borderColor: "#7BAFD4",
            clipPath: "inset(0 0 0 50% round 0 100% 0 0)",
            transform: "translateX(8px)",
          }}
        />
        {/* Beach Photo */}
        <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-t-full bg-[#E0DCD0]">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
            alt="Phuket beach sunset"
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href="/itinerary"
        className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all hover:opacity-80 rounded-full"
        style={{
          background: "#2C5F2D",
          color: "#F5F0E6",
        }}
      >
        View Itinerary
      </Link>

      {/* Footer Note */}
      <p
        className="mt-12 text-xs tracking-[0.15em] uppercase"
        style={{ color: "#5A5A5A" }}
      >
        Private Invite Only Event
      </p>
    </main>
  );
}
