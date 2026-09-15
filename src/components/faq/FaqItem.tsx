"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "#E0DCD0" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span
          className="text-base md:text-lg font-medium"
          style={{ color: "#1A1A1A", fontFamily: "'Playfair Display', serif" }}
        >
          {question}
        </span>
        <span
          className="shrink-0 transition-transform duration-300 ease-out"
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            color: "#5A5A5A",
          }}
        >
          {open ? <X size={16} /> : <Plus size={16} />}
        </span>
      </button>

      {/* Animated height using grid-template-rows */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`text-sm leading-relaxed pb-5 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "#5A5A5A" }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
