"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const FLOATING_IMAGES = [
  {
    src: "/phuket/1.webp",
    className: "top-[10%] left-[14%] w-40 h-28 md:w-52 md:h-36",
    delay: "0s",
    duration: "16s",
  },
  {
    src: "/phuket/2.webp",
    className: "top-[10%] right-[14%] w-40 h-28 md:w-52 md:h-36",
    delay: "3s",
    duration: "20s",
  },
  {
    src: "/phuket/3.webp",
    className: "bottom-[10%] left-[14%] w-40 h-28 md:w-52 md:h-36",
    delay: "6s",
    duration: "18s",
  },
  {
    src: "/phuket/4.webp",
    className: "bottom-[10%] right-[14%] w-40 h-28 md:w-52 md:h-36",
    delay: "2s",
    duration: "22s",
  },
  {
    src: "/phuket/5.webp",
    className: "top-[42%] left-[10%] w-40 h-28 md:w-52 md:h-36",
    delay: "8s",
    duration: "17s",
  },
  {
    src: "/phuket/6.webp",
    className: "top-[42%] right-[10%] w-40 h-28 md:w-52 md:h-36",
    delay: "5s",
    duration: "19s",
  },
];

export default function EnterForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasCookie = document.cookie.includes("birthday-guest=");
    if (hasCookie) {
      const redirectTo = searchParams.get("from") || "/";
      router.push(redirectTo);
    }
  }, [router, searchParams]);

  const handleLogin = async () => {
    if (!password.trim() || loading) return;

    setLoading(true);
    setError("");

    const redirectTo = searchParams.get("from") || "/";

    try {
      const res = await fetch("/api/auth/guest-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, from: redirectTo }),
      });

      if (res.ok) {
        window.location.assign(redirectTo);
        return;
      }

      const data = await res.json();
      setError(data.error || "Incorrect access code.");
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#F5F0E6] relative overflow-hidden">
      {FLOATING_IMAGES.map((img, i) => (
        <div
          key={i}
          className={`absolute ${img.className} rounded-2xl overflow-hidden shadow-lg pointer-events-none animate-float`}
          style={{
            animationDelay: img.delay,
            animationDuration: img.duration,
          }}
        >
          <Image
            src={img.src}
            alt="Phuket"
            fill
            sizes="240px"
            className="object-cover"
            priority={i < 2}
          />
        </div>
      ))}

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 space-y-6">
        <div className="text-center space-y-3">
          <h1
            className="text-4xl md:text-5xl font-semibold"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Forty in Phuket!
          </h1>
          <p
            className="text-sm italic"
            style={{
              color: "#5A5A5A",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            A celebration for Nonso and Tijani
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter access code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            disabled={loading}
            className="w-full px-4 py-3 text-sm outline-none border border-[#E0DCD0] bg-transparent text-[#1A1A1A] rounded-lg focus:border-[#2C5F2D] transition-colors disabled:opacity-60"
          />

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 text-sm font-medium tracking-wide uppercase rounded-lg transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: "#2C5F2D", color: "#F5F0E6" }}
          >
            {loading ? (
              <>
                <span
                  className="w-4 h-4 rounded-full border-2 border-[#F5F0E6] border-t-transparent animate-spin"
                  aria-hidden
                />
                Entering…
              </>
            ) : (
              "Enter"
            )}
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(10px, -30px) rotate(2deg);
          }
          50% {
            transform: translate(-8px, -18px) rotate(-2deg);
          }
          75% {
            transform: translate(6px, -38px) rotate(1deg);
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
