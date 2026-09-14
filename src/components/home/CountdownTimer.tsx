"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-12-14T00:00:00+07:00").getTime(); // Phuket time (UTC+7)

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" },
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div
            className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border text-lg md:text-xl font-medium"
            style={{
              borderColor: "#E0DCD0",
              color: "#2C5F2D",
              background: "rgba(44, 95, 45, 0.04)",
            }}
          >
            {pad(item.value)}
          </div>
          <p
            className="text-[10px] tracking-[0.15em] uppercase mt-2"
            style={{ color: "#5A5A5A" }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
