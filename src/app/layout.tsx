import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientAudio } from "@/components/ui/AmbientAudio";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Forty in Phuket - Nonso & Tijani",
    template: "%s",
  },
  description:
    "Private birthday celebration in Phuket, Thailand. Dec 14-19, 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#F5F0E6] text-[#1A1A1A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AmbientAudio />
      </body>
    </html>
  );
}
