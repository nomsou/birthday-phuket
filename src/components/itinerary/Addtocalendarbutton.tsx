"use client";
import { Calendar } from "lucide-react";

type ItineraryEvent = {
  date: string;
  day: string;
  title: string;
  time: string;
  desc: string;
  loc: string;
};

export function AddToCalendarButton({ event }: { event: ItineraryEvent }) {
  const handleAdd = () => {
    const year = 2026;
    const [monthStr, dayStr] = event.date.split(" ");
    const monthMap: Record<string, number> = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    const month = monthMap[monthStr];
    const day = parseInt(dayStr);

    let startHour = 12;
    let startMinute = 0;
    const timeMatch = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

    if (timeMatch) {
      let hour = parseInt(timeMatch[1]);
      const minute = parseInt(timeMatch[2]);
      const ampm = timeMatch[3].toUpperCase();
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
      startHour = hour;
      startMinute = minute;
    }

    const startDate = new Date(
      Date.UTC(year, month - 1, day, startHour, startMinute),
    );
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

    const formatGCalDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const details = `${event.desc}\nLocation: ${event.loc}`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Nonso & Tijani: ${event.title}`)}&dates=${formatGCalDate(startDate)}/${formatGCalDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(event.loc)}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-all duration-200 ease-out
             text-[#5A5A5A] border-[#E0DCD0]
             hover:bg-[#2C5F2D] hover:text-white hover:border-[#2C5F2D]"
    >
      <Calendar size={10} />
      Add to Calendar
    </button>
  );
}
