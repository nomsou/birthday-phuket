"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema, type RsvpInput, type RsvpData } from "@/lib/zod";
import Link from "next/link";

export default function RSVPPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RsvpInput, unknown, RsvpData>({
    resolver: zodResolver(rsvpSchema),
  });

  const hasPlusOne = watch("plusOne");

  const onSubmit = async (data: RsvpData) => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const err = await res.json();
        setError(err.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-[#F5F0E6]">
        <div className="text-center space-y-6 max-w-md">
          <h1
            className="text-3xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            You're In!
          </h1>
          <p className="text-sm" style={{ color: "#5A5A5A" }}>
            Your RSVP has been confirmed. Check your email for details and stay
            tuned for WhatsApp updates.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 text-xs tracking-[0.2em] uppercase border transition-all hover:bg-[#2C5F2D] hover:text-white hover:border-[#2C5F2D]"
            style={{ borderColor: "#2C5F2D", color: "#2C5F2D" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-20 bg-[#F5F0E6]">
      <div className="max-w-xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#5A5A5A" }}
          >
            Join Us
          </p>
          <h1
            className="text-4xl md:text-5xl font-medium"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            RSVP
          </h1>
          <p className="text-sm" style={{ color: "#5A5A5A" }}>
            Please confirm your attendance by October 30, 2026.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              className="block text-xs tracking-[0.15em] uppercase"
              style={{ color: "#5A5A5A" }}
            >
              Full Name *
            </label>
            <input
              {...register("name")}
              placeholder="Nonso Cole"
              className="w-full px-4 py-3 text-sm outline-none border bg-transparent"
              style={{
                borderColor: errors.name ? "#E24B4A" : "#E0DCD0",
                color: "#1A1A1A",
              }}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                className="block text-xs tracking-[0.15em] uppercase"
                style={{ color: "#5A5A5A" }}
              >
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm outline-none border bg-transparent"
                style={{
                  borderColor: errors.email ? "#E24B4A" : "#E0DCD0",
                  color: "#1A1A1A",
                }}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="block text-xs tracking-[0.15em] uppercase"
                style={{ color: "#5A5A5A" }}
              >
                Phone / WhatsApp *
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+234..."
                className="w-full px-4 py-3 text-sm outline-none border bg-transparent"
                style={{
                  borderColor: errors.phone ? "#E24B4A" : "#E0DCD0",
                  color: "#1A1A1A",
                }}
              />
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Hotel */}
          <div className="space-y-2">
            <label
              className="block text-xs tracking-[0.15em] uppercase"
              style={{ color: "#5A5A5A" }}
            >
              Hotel / Accommodation
            </label>
            <input
              {...register("hotel")}
              placeholder="e.g., Radisson Blu, Lekki"
              className="w-full px-4 py-3 text-sm outline-none border bg-transparent"
              style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
            />
          </div>

          {/* Dietary */}
          <div className="space-y-2">
            <label
              className="block text-xs tracking-[0.15em] uppercase"
              style={{ color: "#5A5A5A" }}
            >
              Dietary Restrictions
            </label>
            <textarea
              {...register("dietary")}
              rows={2}
              placeholder="Allergies, vegetarian, halal, etc."
              className="w-full px-4 py-3 text-sm outline-none border bg-transparent resize-none"
              style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
            />
          </div>

          {/* Plus One Toggle */}
          <div className="flex items-center gap-3 pt-2">
            <input
              id="plusOne"
              type="checkbox"
              {...register("plusOne")}
              className="w-4 h-4 accent-[#2C5F2D]"
            />
            <label
              htmlFor="plusOne"
              className="text-sm cursor-pointer"
              style={{ color: "#1A1A1A" }}
            >
              Bringing a Plus One?
            </label>
          </div>

          {/* Plus One Details (Conditional) */}
          {hasPlusOne && (
            <div className="space-y-2 pl-7 animate-in fade-in slide-in-from-top-2 duration-300">
              <label
                className="block text-xs tracking-[0.15em] uppercase"
                style={{ color: "#5A5A5A" }}
              >
                Plus One Details
              </label>
              <input
                {...register("plusOneDetails")}
                placeholder="Name & relationship"
                className="w-full px-4 py-3 text-sm outline-none border bg-transparent"
                style={{
                  borderColor: errors.plusOneDetails ? "#E24B4A" : "#E0DCD0",
                  color: "#1A1A1A",
                }}
              />
              {errors.plusOneDetails && (
                <p className="text-xs text-red-600">
                  {errors.plusOneDetails.message}
                </p>
              )}
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all disabled:opacity-50 rounded-full"
            style={{ background: "#2C5F2D", color: "#F5F0E6" }}
          >
            {submitting ? "Confirming..." : "Confirm Attendance"}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs" style={{ color: "#5A5A5A" }}>
          Your information is private and will be deleted after the event.
        </p>
      </div>
    </main>
  );
}
