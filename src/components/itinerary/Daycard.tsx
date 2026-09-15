"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type ItineraryDay = {
  day: string;
  date: string;
  title: string;
  subtitle: string;
  body: string[];
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
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <div>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-1"
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
            className="text-xs tracking-[0.1em] uppercase mt-1"
            style={{ color: "#7BAFD4" }}
          >
            {day.subtitle}
          </p>
        </div>
        <ChevronDown
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          size={18}
          style={{ color: "#2C5F2D" }}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-3">
          {day.body.map((line, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: "#5A5A5A" }}
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
