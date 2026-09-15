// src/components/layout/Navbar.tsx
"use client";

import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image"; // Import Image

const links = [
  { href: "#itinerary", label: "Itinerary" },
  { href: "#stay", label: "Stay" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 bg-[#F5F0E6]/90 backdrop-blur-md border-b"
        style={{ borderColor: "#E0DCD0" }}
      >
        <a href="#top" className="flex items-center gap-3 group">
          <div className="absolute w-25 h-25 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="NT Logo"
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "#5A5A5A" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: "#2C5F2D" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-[#F5F0E6] pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-medium tracking-[0.1em] uppercase"
                style={{ color: "#1A1A1A" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="absolute bottom-10 left-6">
            <p
              className="text-xs tracking-[0.15em] uppercase opacity-40"
              style={{ color: "#5A5A5A" }}
            >
              Forty in Phuket • Dec 14-19
            </p>
          </div>
        </div>
      )}
    </>
  );
}
