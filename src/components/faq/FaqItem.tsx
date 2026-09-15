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
        {open ? (
          <X size={16} className="shrink-0" style={{ color: "#5A5A5A" }} />
        ) : (
          <Plus size={16} className="shrink-0" style={{ color: "#5A5A5A" }} />
        )}
      </button>
      {open && (
        <p
          className="text-sm leading-relaxed pb-5"
          style={{ color: "#5A5A5A" }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}
