import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ItinerarySection } from "@/components/itinerary/ItinerarySection";
import { StaySection } from "@/components/stay/StaySection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { FaqSection } from "@/components/faq/FaqSection";
import { RsvpSection } from "@/components/rsvp/RsvpSection";
import { PhuketSection } from "@/components/phuket/PhuketSection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Forty in Phuket - Nonso & Tijani",
  description:
    "An excellent reason to celebrate. Phuket, Thailand. Dec 14-19, 2026.",
};

export default function HomePage() {
  return (
    <main>
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal>
        <RsvpSection />
      </Reveal>
      <Reveal>
        <ItinerarySection />
      </Reveal>
      <Reveal>
        <StaySection />
      </Reveal>
      <Reveal>
        <PhuketSection />
      </Reveal>
      <Reveal>
        <GallerySection />
      </Reveal>
      <Reveal>
        <FaqSection />
      </Reveal>
    </main>
  );
}
