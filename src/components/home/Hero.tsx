import { CountdownTimer } from "@/components/home/CountdownTimer";
import { Logo } from "../branding/Logo";

export function Hero() {
  return (
    <section
      id="top"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#F5F0E6]"
    >
      <Logo variant="mark" className="mb-8" />

      <div className="text-center space-y-3 mb-10">
        <h1
          className="text-5xl md:text-7xl font-medium"
          style={{
            color: "#2C5F2D",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          FORTY IN PHUKET
        </h1>
        <p
          className="text-base md:text-lg italic"
          style={{ color: "#5A5A5A", fontFamily: "'Playfair Display', serif" }}
        >
          An excellent reason to celebrate.
        </p>
        <p className="text-sm md:text-base" style={{ color: "#5A5A5A" }}>
          Phuket, Thailand • Dec 14–19, 2026
        </p>
      </div>

      <div className="mb-10">
        <CountdownTimer />
      </div>

      <a
        href="#itinerary"
        className="px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all hover:opacity-80 rounded-full"
        style={{ background: "#2C5F2D", color: "#F5F0E6" }}
      >
        View Itinerary
      </a>
    </section>
  );
}
