// src/components/phuket/PhuketSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Activity = {
  tag: string;
  title: string;
  description: string;
  image: string;
};

const FAMILY_ACTIVITIES: Activity[] = [
  {
    tag: "MAKE A SPLASH",
    title: "Andamanda Phuket",
    description:
      "Pools, slides and water play for the whole family. A full day out if you want one, or a few hours if you don't.",
    image: "/phuket/andamanda.webp",
  },
  {
    tag: "MEET THE ELEPHANTS",
    title: "Phuket Elephant Sanctuary",
    description:
      "Watch rescued elephants roam, forage and bathe in a more natural setting. A gentler, ethical way to spend time with them.",
    image: "/phuket/elephants.webp",
  },
  {
    tag: "WANDER",
    title: "Old Phuket Town",
    description:
      "Colourful Sino-Portuguese streets, cafés and boutiques for an easy afternoon wander. Best explored slowly.",
    image: "/phuket/old-town.webp",
  },
  {
    tag: "GO UNDERWATER",
    title: "Aquaria Phuket",
    description:
      "Sharks, rays and marine life, plus a cool escape from the heat. A good rainy-day backup.",
    image: "/phuket/aquaria.webp",
  },
  {
    tag: "PLAY WITH DINOSAURS",
    title: "Dino Park Mini Golf",
    description:
      "Mini golf with caves, volcanoes and dinosaurs along the way. Ridiculous in the best way, and the kids will love it.",
    image: "/phuket/dino-golf.webp",
  },
];

const EVENING_ACTIVITIES: Activity[] = [
  {
    tag: "CATCH THE VIEW",
    title: "Karon Viewpoint",
    description:
      "Three bays, one coastline and a beautiful stop around golden hour. Worth the drive up.",
    image: "/phuket/karon-view.webp",
  },
  {
    tag: "GO OUT",
    title: "Bangla Road",
    description:
      "Phuket nightlife in full swing, for anyone up for a late one. Loud, bright and unmissable.",
    image: "/phuket/bangla.webp",
  },
  {
    tag: "GO BIG",
    title: "Carnival Magic",
    description:
      "Lights, colour and performances. Gloriously over-the-top, and unapologetically so.",
    image: "/phuket/carnival.webp",
  },
];

function ActivityCard({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(false);

  return (
<div className="border bg-[#F5F0E6]" style={{ borderColor: "#E0DCD0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 md:px-10 py-6 md:py-8 text-left"
      >
        <div>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-2"
            style={{ color: "#5A5A5A" }}
          >
            {activity.tag}
          </p>
          <h3
            className="text-2xl md:text-3xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {activity.title}
          </h3>
        </div>
        <ChevronDown
          className={`shrink-0 transition-transform duration-300 ease-out ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={18}
          style={{ color: "#2C5F2D" }}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`px-6 md:px-10 pb-10 md:pb-12 transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <p
                className="text-base leading-relaxed md:order-1"
                style={{ color: "#5A5A5A" }}
              >
                {activity.description}
              </p>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E0DCD0] md:order-2">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhuketSection() {
  return (
    <section id="phuket" className="px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            While You're Here
          </p>
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            A Little More Phuket
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "#5A5A5A" }}>
            If you're staying on after the celebrations, here are a few
            favourites for little adventures, easy afternoons and everything in
            between.
          </p>
        </div>

        {/* For the Family */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold"
              style={{ color: "#2C5F2D" }}
            >
              For the Family
            </p>
          </div>
          <div className="space-y-4">
            {FAMILY_ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
          </div>
        </div>

        {/* For the Evening */}
        <div>
          <div className="text-center mb-6">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold"
              style={{ color: "#2C5F2D" }}
            >
              For the Evening
            </p>
          </div>
          <div className="space-y-4">
            {EVENING_ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
