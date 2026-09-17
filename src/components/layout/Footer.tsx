"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/enter") return null;

  return (
    <footer
      className="mt-auto border-t px-6 py-8 bg-white"
      style={{ borderColor: "#E0DCD0" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <a
          href="#top"
          aria-label="Back to top"
          className="relative w-40 h-40 shrink-0 block transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="Forty in Phuket"
            fill
            sizes="160px"
            className="object-contain"
          />
        </a>

        <div className="text-center md:text-left">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: "#2C5F2D" }}
          >
            FORTY IN PHUKET
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#5A5A5A" }}>
            Phuket, Thailand
            <br />
            December 14–19, 2026
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-xs tracking-[0.15em] uppercase">
          {[
            { label: "Itinerary", href: "#itinerary" },
            { label: "Stay", href: "#stay" },
            { label: "Gallery", href: "#gallery" },
            { label: "FAQ", href: "#faq" },
            { label: "RSVP", href: "#rsvp" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-semibold transition-colors duration-200 hover:text-[#2C5F2D]"
              style={{ color: "#5A5A5A" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
