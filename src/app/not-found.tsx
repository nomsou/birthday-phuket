// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F5F0E6] text-center">
      <h1
        className="text-6xl font-medium mb-4"
        style={{ color: "#2C5F2D", fontFamily: "'Playfair Display', serif" }}
      >
        404
      </h1>
      <p className="text-lg mb-8" style={{ color: "#5A5A5A" }}>
        This page could not be found.
      </p>
      <Link
        href="/"
        className="px-8 py-3 text-sm tracking-[0.2em] uppercase font-medium rounded-full transition-all hover:opacity-80"
        style={{ background: "#2C5F2D", color: "#F5F0E6" }}
      >
        Return Home
      </Link>
    </div>
  );
}
