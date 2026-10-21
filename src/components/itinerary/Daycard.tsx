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
  activities: {
    label: string;
    detail: string;
    dressCode?: {
      title: string;
      body: string;
      cta?: string;
      href?: string;
    };
  }[];
  image: string;
};

export function DayCard({
  day,
  isFirst,
}: {
  day: ItineraryDay;
  isFirst?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border bg-white" style={{ borderColor: "#E0DCD0" }}>
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
              <div className="space-y-8">
                <p
                  className="text-base leading-relaxed whitespace-pre-line"
                  style={{ color: "#5A5A5A" }}
                >
                  {day.description}
                </p>

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
                        {a.dressCode && (
                          <div
                            className="mt-3 rounded-lg p-4"
                            style={{
                              background: "#F5F0E6",
                              border: "1px solid #E0DCD0",
                            }}
                          >
                            <p
                              className="text-xs tracking-[0.15em] uppercase font-semibold mb-2"
                              style={{ color: "#2C5F2D" }}
                            >
                              {a.dressCode.title}
                            </p>
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: "#5A5A5A" }}
                            >
                              {a.dressCode.body}
                            </p>
                            {a.dressCode.cta && (
                              <a
                                href={
                                  a.dressCode.href ??
                                  "/dress-code/dress-code-nonso-dec-17.pdf"
                                }
                                download
                                className="mt-3 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 decoration-[#1A1A1A] transition-colors duration-200 hover:text-[#2C5F2D] hover:decoration-[#2C5F2D]"
                                style={{ color: "#1A1A1A" }}
                              >
                                {a.dressCode.cta}
                                <span
                                  aria-hidden
                                  className="inline-block"
                                  style={{
                                    animation:
                                      "arrow-slide 1.4s ease-in-out infinite",
                                  }}
                                >
                                  →
                                </span>
                              </a>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

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
