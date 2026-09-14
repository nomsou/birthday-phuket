"use client";

import { generateICS } from "@/lib/calendar";
import { Download } from "lucide-react";

type ItineraryEvent = {
  date: string;
  day: string;
  title: string;
  time: string;
  desc: string;
  loc: string;
};

export function AddToCalendarButton({ event }: { event: ItineraryEvent }) {
  const handleDownload = () => {
    const year = 2026;
    const [dayStr] = event.date.split(" ");
    const day = parseInt(dayStr);

    // Parse time for start/end
    const times = event.time.split("/").map((t) => t.trim());
    const startTime =
      times[0].includes("AM") || times[0].includes("PM")
        ? new Date(`${year}-12-${day}T${times[0].replace(" ", "")}:00+07:00`)
        : new Date(`${year}-12-${day}T00:00:00+07:00`);

    const endTime =
      times.length > 1 && (times[1].includes("AM") || times[1].includes("PM"))
        ? new Date(`${year}-12-${day}T${times[1].replace(" ", "")}:00+07:00`)
        : new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    const ics = generateICS({
      title: `Nonso & Tijani: ${event.title}`,
      start: startTime,
      end: endTime,
      location: event.loc,
      description: `${event.desc}\nLocation: ${event.loc}`,
    });

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nonso-tijani-${event.date.toLowerCase().replace(" ", "-")}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-all hover:bg-[#2C5F2D] hover:text-white hover:border-[#2C5F2D]"
      style={{ borderColor: "#E0DCD0", color: "#5A5A5A" }}
    >
      <Download size={10} />
      Add to Calendar
    </button>
  );
}
