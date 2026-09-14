import type { Metadata } from "next";
import Link from "next/link";
import { AddToCalendarButton } from "@/components/itinerary/Addtocalendarbutton";

export const metadata: Metadata = {
  title: "Itinerary | Nonso & Tijani",
};

const EVENTS = [
  {
    date: "Dec 14",
    day: "Saturday",
    title: "Welcome Party",
    time: "6:00 PM - Late",
    desc: "Kick off the celebration with cocktails and canapés.",
    loc: "Resort Main Pool",
  },
  {
    date: "Dec 15",
    day: "Sunday",
    title: "Games & Sports + Tijani's Birthday Dinner",
    time: "10:00 AM / 7:00 PM",
    desc: "Morning beach games followed by an elegant birthday dinner.",
    loc: "Beach Club / Private Villa",
  },
  {
    date: "Dec 16",
    day: "Monday",
    title: "Wellness Spa Day + Daddy Hit Town",
    time: "9:00 AM / 8:00 PM",
    desc: "Ladies spa morning & kids fun. Evening dinner celebration.",
    loc: "Spa Resort / Rooftop Lounge",
  },
  {
    date: "Dec 17",
    day: "Tuesday",
    title: "Kids Party + Nonso's Dinner",
    time: "3:00 PM / 8:00 PM",
    desc: "Afternoon kids' activities followed by Nonso's private dinner.",
    loc: "Garden Pavilion",
  },
  {
    date: "Dec 18",
    day: "Wednesday",
    title: "Yacht Party",
    time: "12:00 PM - Sunset",
    desc: "Full day yacht cruise with music, drinks, and ocean views.",
    loc: "Phuket Marina",
  },
  {
    date: "Dec 19",
    day: "Thursday",
    title: "See You Later",
    time: "All Day",
    desc: "Farewell brunches and airport transfers.",
    loc: "Various Locations",
  },
];

export default function ItineraryPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            The Plan
          </p>
          <h1
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Event Itinerary
          </h1>
          <p className="text-sm" style={{ color: "#5A5A5A" }}>
            Phuket, Thailand • December 14–19, 2026
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-12 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-[#E0DCD0] md:before:left-1/2 md:before:-translate-x-1/2">
          {EVENTS.map((evt, i) => (
            <div
              key={i}
              className="relative flex flex-col md:flex-row gap-8 items-start md:items-center group"
            >
              {/* Date Badge */}
              <div
                className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center z-10 bg-[#F5F0E6] border-2 ${i % 2 === 0 ? "border-[#2C5F2D]" : "border-[#7BAFD4]"} md:left-1/2 md:-translate-x-1/2`}
              >
                <span
                  className="text-[10px] font-bold"
                  style={{ color: i % 2 === 0 ? "#2C5F2D" : "#7BAFD4" }}
                >
                  {evt.date.split(" ")[1]}
                </span>
              </div>

              {/* Content Card */}
              <div
                className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}
              >
                <div
                  className="p-6 border bg-white/50 backdrop-blur-sm transition-colors hover:bg-white"
                  style={{ borderColor: "#E0DCD0" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                    <div>
                      <p
                        className="text-[10px] tracking-[0.15em] uppercase mb-1"
                        style={{ color: "#5A5A5A" }}
                      >
                        {evt.day} • {evt.time}
                      </p>
                      <h3
                        className="text-lg font-medium"
                        style={{ color: "#1A1A1A" }}
                      >
                        {evt.title}
                      </h3>
                    </div>
                    <AddToCalendarButton event={evt} />
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "#5A5A5A" }}
                  >
                    {evt.desc}
                  </p>
                  <p className="text-xs italic" style={{ color: "#2C5F2D" }}>
                    📍 {evt.loc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "#5A5A5A" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
