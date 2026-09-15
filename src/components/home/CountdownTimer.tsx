// src/components/home/CountdownTimer.tsx
"use client";
import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-12-14T00:00:00+07:00").getTime();

function calculateTimeLeft() {
  const now = Date.now();
  const distance = TARGET_DATE - now;

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

export function CountdownTimer({ dark = false }: { dark?: boolean }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const display = mounted
    ? timeLeft
    : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {[
        { value: display.days, label: "Days" },
        { value: display.hours, label: "Hours" },
        { value: display.minutes, label: "Mins" },
        { value: display.seconds, label: "Secs" },
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div
            className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border text-lg md:text-xl font-medium backdrop-blur-sm"
            style={
              dark
                ? {
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#F5F0E6",
                    background: "rgba(255,255,255,0.1)",
                  }
                : {
                    borderColor: "#E0DCD0",
                    color: "#2C5F2D",
                    background: "rgba(44, 95, 45, 0.04)",
                  }
            }
          >
            {pad(item.value)}
          </div>
          <p
            className="text-[10px] tracking-[0.15em] uppercase mt-2"
            style={{ color: dark ? "rgba(255,255,255,0.7)" : "#5A5A5A" }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
