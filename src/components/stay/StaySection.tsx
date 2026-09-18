"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AddTripToCalendarButton } from "../itinerary/AddTripToCalendarButton";

const STAY_IMAGES = [
  "/stay/1.webp",
  "/stay/2.webp",
  "/stay/3.webp",
  "/stay/4.webp",
];

const ROTATION_MS = 4000;

export function StaySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % STAY_IMAGES.length);
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stay" className="px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            Logistics
          </p>
          <h2
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Everything You Need
          </h2>
        </div>

        {/* Two columns: content (left) + sticky image (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: scrollable content */}
          <div className="space-y-12">
            {/* Secure Your Stay */}
            <div>
              <h3
                className="text-xl md:text-2xl font-medium mb-4"
                style={{
                  color: "#1A1A1A",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Secure Your Stay
              </h3>

              <div className="space-y-4">
                {[
                  {
                    name: "Phuket Marriott Resort & Spa, Merlin Beach",
                  },
                ].map((stay) => (
                  <div
                    key={stay.name}
                    className="rounded-lg p-5 flex flex-col gap-3"
                    style={{ background: "#F5F0E6" }}
                  >
                    <div>
                      <p
                        className="font-medium text-sm md:text-base"
                        style={{ color: "#1A1A1A" }}
                      >
                        {stay.name}
                      </p>
                    </div>
                    <a
                      href="https://www.marriott.com/en-us/hotels/hktmb-phuket-marriott-resort-and-spa-merlin-beach/overview/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm font-medium underline-offset-4 decoration-[#1A1A1A] transition-colors duration-200 hover:text-[#2C5F2D] hover:decoration-[#2C5F2D]"
                      style={{ color: "#1A1A1A" }}
                    >
                      Reserve Your Room
                      <span
                        aria-hidden
                        className="inline-block"
                        style={{
                          animation: "arrow-slide 1.4s ease-in-out infinite",
                        }}
                      >
                        →
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ borderColor: "#E0DCD0" }} />

            {/* Dress guide */}
            <div>
              <h3
                className="text-xl md:text-2xl font-medium mb-3"
                style={{
                  color: "#1A1A1A",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Dress Code
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#5A5A5A" }}
              >
                Think island elegance, vibrant colour, and a touch of
                celebration.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5A5A5A" }}
              >
                A full style guide will be shared closer to the date, with
                inspiration for each event.
              </p>
            </div>

            <hr style={{ borderColor: "#E0DCD0" }} />

            {/* Travel agent */}
            <div>
              <h3
                className="text-xl md:text-2xl font-medium mb-3"
                style={{
                  color: "#1A1A1A",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Travel Agent
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#5A5A5A" }}
              >
                If you would like help with visa processing, flights, or general
                travel logistics, our travel partner can assist.
              </p>

              <div
                className="rounded-lg p-5 space-y-3 w-full"
                style={{ background: "#F5F0E6" }}
              >
                <div>
                  <p
                    className="font-medium text-sm md:text-base"
                    style={{ color: "#1A1A1A" }}
                  >
                    Kharigoo Voyage Ltd
                  </p>
                </div>

                <ul
                  className="text-xs leading-relaxed space-y-1"
                  style={{ color: "#5A5A5A" }}
                >
                  <li>Visa support and processing</li>
                  <li>Flight booking and ticketing</li>
                  <li>Tailored travel planning</li>
                </ul>

                <div className="text-xs space-y-1" style={{ color: "#1A1A1A" }}>
                  <p>
                    <span style={{ color: "#5A5A5A" }}>Phone: </span>
                    <a
                      href="tel:+2348159009813"
                      className="hover:text-[#2C5F2D] transition-colors"
                    >
                      +234 815 900 9813
                    </a>
                  </p>
                  <p>
                    <span style={{ color: "#5A5A5A" }}>Website: </span>
                    <a
                      href="https://www.kharigoo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#2C5F2D] transition-colors"
                    >
                      kharigoo.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E0DCD0" }} />

            {/* Explore the destinations */}
            <div>
              <h3
                className="text-xl md:text-2xl font-medium mb-3"
                style={{
                  color: "#1A1A1A",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Explore the Destinations
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#5A5A5A" }}
              >
                Familiarise yourself with everything Phuket has to offer, and
                let the anticipation begin.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#itinerary"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium transition-colors hover:border-[#2C5F2D] hover:text-[#2C5F2D]"
                  style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
                >
                  Explore Itinerary
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-medium transition-colors hover:border-[#2C5F2D] hover:text-[#2C5F2D]"
                  style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
                >
                  Explore Gallery
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <hr style={{ borderColor: "#E0DCD0" }} />

            {/* Reserve these dates */}
            <div>
              <h3
                className="text-xl md:text-2xl font-medium mb-3"
                style={{
                  color: "#1A1A1A",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Reserve These Dates
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#5A5A5A" }}
              >
                Add the dates to your calendar and let the anticipation begin.
              </p>
              <AddTripToCalendarButton />
            </div>
          </div>

          {/* Right: sticky, auto-rotating image panel */}
          <div className="hidden md:block">
            <div className="sticky top-28">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#E0DCD0]">
                {STAY_IMAGES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Phuket stay"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${
                      i === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                    priority={i === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
