"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EnterForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auto-redirect if already authenticated
  useEffect(() => {
    const hasCookie = document.cookie.includes("birthday-guest=");
    if (hasCookie) {
      const redirectTo = searchParams.get("from") || "/";
      router.push(redirectTo);
    }
  }, [router, searchParams]);

  const handleLogin = async () => {
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/guest-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const redirectTo = searchParams.get("from") || "/";
        router.push(redirectTo);
        router.refresh(); // Force revalidation of protected routes
      } else {
        const data = await res.json();
        setError(data.error || "Incorrect password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#F5F0E6]">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-xs tracking-[0.3em] uppercase text-[#5A5A5A]">
            Nonso & Tijani
          </p>
          <h1
            className="text-2xl font-medium text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Birthday Paradise
          </h1>
          <p className="text-sm text-[#5A5A5A]">Phuket, Thailand • Dec 14-19</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter invite password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 text-sm outline-none border bg-transparent text-[#1A1A1A] rounded-md focus:border-[#2C5F2D] transition-colors"
            style={{ borderColor: "#E0DCD0" }}
          />

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 text-sm tracking-[0.2em] uppercase font-medium transition-all disabled:opacity-50 rounded-md"
            style={{ background: "#2C5F2D", color: "#F5F0E6" }}
          >
            {loading ? "..." : "Enter"}
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-[#5A5A5A]">
          Private invite-only event. Contact the hosts if you need access.
        </p>
      </div>
    </div>
  );
}
