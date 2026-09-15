"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/enter") return null;

  return (
    <footer
      className="mt-auto border-t px-6 py-12 bg-[#F5F0E6]"
      style={{ borderColor: "#E0DCD0" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: "#2C5F2D" }}
          >
            Nonso & Tijani
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#5A5A5A" }}>
            Forty in Phuket • Phuket, Thailand
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
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-60"
              style={{ color: "#5A5A5A" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-center md:text-right">
          <p className="text-xs" style={{ color: "#5A5A5A" }}>
            © {new Date().getFullYear()} Private Event
          </p>
          <p
            className="text-[10px] mt-1 opacity-60"
            style={{ color: "#5A5A5A" }}
          >
            Designed & Built by{" "}
            <a
              href="https://www.linkedin.com/in/nomsounaogu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-100 transition-opacity"
            >
              Nomso
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
