"use client";

import { useState } from "react";
import Image from "next/image";

export function RsvpSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          plusOne,
          plusOneName,
          message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: image */}
          <div className="hidden md:block relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#E0DCD0] order-2 md:order-1">
            <Image
              src="/gallery/4.jpg"
              alt="Phuket"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Right: form */}
          <div className="order-1 md:order-2">
            <div className="text-center mb-10 space-y-3">
              <p
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#5A5A5A" }}
              >
                Confirm Your Spot
              </p>
              <h2
                className="text-4xl md:text-5xl font-medium"
                style={{
                  color: "#2C5F2D",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                RSVP
              </h2>
              <p className="text-sm" style={{ color: "#5A5A5A" }}>
                Let us know you're coming to Forty in Phuket.
              </p>
            </div>

            {submitted ? (
              <div
                className="text-center rounded-2xl p-10 shadow-lg"
                style={{ background: "#F5F0E6", border: "1px solid #E0DCD0" }}
              >
                <h3
                  className="text-2xl mb-2"
                  style={{
                    color: "#2C5F2D",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  You're confirmed.
                </h3>
                <p className="text-sm" style={{ color: "#5A5A5A" }}>
                  A confirmation email is on its way. We can't wait to celebrate
                  with you.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5 shadow-lg"
                style={{ background: "#F5F0E6", border: "1px solid #E0DCD0" }}
              >
                <div>
                  <label
                    className="block text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ color: "#5A5A5A" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 text-sm outline-none border rounded-lg focus:border-[#2C5F2D] transition-colors disabled:opacity-60"
                    style={{
                      borderColor: "#E0DCD0",
                      color: "#1A1A1A",
                      background: "white",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ color: "#5A5A5A" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 text-sm outline-none border rounded-lg focus:border-[#2C5F2D] transition-colors disabled:opacity-60"
                    style={{
                      borderColor: "#E0DCD0",
                      color: "#1A1A1A",
                      background: "white",
                    }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="plusOne"
                    checked={plusOne}
                    onChange={(e) => setPlusOne(e.target.checked)}
                    disabled={submitting}
                    className="w-4 h-4 disabled:opacity-60"
                  />
                  <label
                    htmlFor="plusOne"
                    className="text-sm"
                    style={{ color: "#1A1A1A" }}
                  >
                    Bringing a plus one
                  </label>
                </div>

                {plusOne && (
                  <div>
                    <label
                      className="block text-xs tracking-[0.15em] uppercase mb-2"
                      style={{ color: "#5A5A5A" }}
                    >
                      Plus One's Name
                    </label>
                    <input
                      type="text"
                      value={plusOneName}
                      onChange={(e) => setPlusOneName(e.target.value)}
                      disabled={submitting}
                      className="w-full px-4 py-3 text-sm outline-none border rounded-lg focus:border-[#2C5F2D] transition-colors disabled:opacity-60"
                      style={{
                        borderColor: "#E0DCD0",
                        color: "#1A1A1A",
                        background: "white",
                      }}
                    />
                  </div>
                )}

                <div>
                  <label
                    className="block text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ color: "#5A5A5A" }}
                  >
                    Message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    disabled={submitting}
                    className="w-full px-4 py-3 text-sm outline-none border rounded-lg focus:border-[#2C5F2D] transition-colors resize-none disabled:opacity-60"
                    style={{
                      borderColor: "#E0DCD0",
                      color: "#1A1A1A",
                      background: "white",
                    }}
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-sm font-medium tracking-wide uppercase rounded-lg transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "#2C5F2D", color: "#F5F0E6" }}
                >
                  {submitting ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 border-[#F5F0E6] border-t-transparent animate-spin"
                        aria-hidden
                      />
                      Submitting…
                    </>
                  ) : (
                    "Confirm My Spot"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
