import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Plane, Clock, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Travel & Logistics | Nonso & Tijani",
};

// Helper to safely parse JSON settings or return a typed default
const getSetting = <T,>(
  settings: Record<string, string>,
  key: string,
  fallback: T,
): T => {
  try {
    return settings[key] ? JSON.parse(settings[key]) : fallback;
  } catch {
    return fallback;
  }
};

export default async function TravelPage() {
  // Fetch dynamic content from DB
  const dbSettings = await prisma.setting.findMany({
    where: { key: { in: ["travel_visa", "pickup_schedule"] } },
  });

  const settingsMap = dbSettings.reduce(
    (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
    {} as Record<string, string>,
  );

  const visaInfo = getSetting(
    settingsMap,
    "travel_visa",
    "Most nationalities require a visa for Thailand. Please check your local embassy requirements at least 3 weeks prior.",
  );

  const pickupSchedule = getSetting(settingsMap, "pickup_schedule", [
    {
      time: "Dec 14, 2:00 PM",
      loc: "HKT Airport (Arrivals Hall)",
      note: "Welcome shuttle to resort",
    },
    {
      time: "Dec 19, 10:00 AM",
      loc: "Resort Lobby",
      note: "Airport transfer departures",
    },
  ] as Array<{ time: string; loc: string; note: string }>);

  return (
    <main className="min-h-screen px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-2xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            Getting There
          </p>
          <h1
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Travel & Logistics
          </h1>
        </div>

        {/* Visa & Entry */}
        <section
          className="p-8 border bg-white/50 backdrop-blur-sm"
          style={{ borderColor: "#E0DCD0" }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-full bg-[#2C5F2D]/10 shrink-0">
              <Plane size={20} style={{ color: "#2C5F2D" }} />
            </div>
            <div>
              <h2
                className="text-lg font-medium mb-2"
                style={{ color: "#1A1A1A" }}
              >
                Visa & Entry Requirements
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5A5A5A" }}
              >
                {visaInfo}
              </p>
              <div
                className="mt-4 flex items-start gap-2 p-3 text-xs"
                style={{ background: "#7BAFD415", color: "#2C5F2D" }}
              >
                <Info size={14} className="shrink-0 mt-0.5" />
                <span>
                  Passport must be valid for at least 6 months beyond travel
                  date.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pickup Schedule */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock size={18} style={{ color: "#2C5F2D" }} />
            <h2 className="text-xl font-medium" style={{ color: "#1A1A1A" }}>
              Transfer Schedule
            </h2>
          </div>

          <div className="space-y-4">
            {pickupSchedule.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border bg-white/50 transition-all hover:bg-white"
                style={{ borderColor: "#E0DCD0" }}
              >
                <div className="flex items-start gap-4 mb-3 sm:mb-0">
                  <MapPin
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#7BAFD4" }}
                  />
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#1A1A1A" }}
                    >
                      {item.loc}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#5A5A5A" }}>
                      {item.note}
                    </p>
                  </div>
                </div>
                <div
                  className="px-4 py-2 text-xs tracking-[0.1em] uppercase font-medium rounded-full self-start sm:self-auto"
                  style={{ background: "#2C5F2D", color: "#F5F0E6" }}
                >
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-8 text-center">
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
