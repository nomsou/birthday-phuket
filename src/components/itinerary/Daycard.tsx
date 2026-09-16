"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export type ItineraryDay = {
  day: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  activities: { label: string; detail: string }[];
  image: string;
};

export function DayCard({
  day,
  isFirst,
}: {
  day: ItineraryDay;
  isFirst?: boolean;
}) {
  const [open, setOpen] = useState(!!isFirst);

  return (
    <div className="border bg-white" style={{ borderColor: "#E0DCD0" }}>
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 md:px-10 py-6 md:py-8 text-left"
      >
        <div>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-2"
            style={{ color: "#5A5A5A" }}
          >
            {day.day} · {day.date}
          </p>
          <h3
            className="text-2xl md:text-3xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {day.title}
          </h3>
          <p
            className="text-[11px] tracking-[0.18em] uppercase mt-2 font-semibold"
            style={{ color: "#2C5F8D" }}
          >
            {day.subtitle}
          </p>
        </div>
        <ChevronDown
          className={`shrink-0 transition-transform duration-300 ease-out ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={18}
          style={{ color: "#2C5F2D" }}
        />
      </button>

      {/* Animated expand/collapse */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {/* Inner padding lives here so it collapses cleanly */}
          <div
            className={`px-6 md:px-10 pb-10 md:pb-12 transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left: description + activities */}
              <div className="space-y-8">
                <div>
                  <h4
                    className="text-2xl md:text-3xl mb-4"
                    style={{
                      color: "#1A1A1A",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    Description
                  </h4>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#5A5A5A" }}
                  >
                    {day.description}
                  </p>
                </div>

                <div>
                  <h4
                    className="text-2xl md:text-3xl mb-4"
                    style={{
                      color: "#1A1A1A",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    Activities
                  </h4>
                  <ul className="space-y-3">
                    {day.activities.map((a, i) => (
                      <li
                        key={i}
                        className="text-base leading-relaxed"
                        style={{ color: "#5A5A5A" }}
                      >
                        <span
                          className="font-medium"
                          style={{ color: "#1A1A1A" }}
                        >
                          {a.label}
                        </span>
                        : {a.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E0DCD0]">
                <Image
                  src={day.image}
                  alt={day.title}
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
