"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const FLOATING_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=400&q=75",
    className: "top-[10%] left-[14%] w-40 h-28 md:w-56 md:h-40",
    delay: "0s",
    duration: "16s",
  },
  {
    src: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=75",
    className: "top-[10%] right-[14%] w-36 h-24 md:w-52 md:h-36",
    delay: "3s",
    duration: "20s",
  },
  {
    src: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=400&q=75",
    className: "bottom-[10%] left-[14%] w-44 h-32 md:w-60 md:h-44",
    delay: "6s",
    duration: "18s",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=75",
    className: "bottom-[10%] right-[14%] w-40 h-28 md:w-56 md:h-40",
    delay: "2s",
    duration: "22s",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=75",
    className: "top-[42%] left-[10%] w-32 h-24 md:w-44 md:h-32",
    delay: "8s",
    duration: "17s",
  },
  {
    src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=400&q=75",
    className: "top-[42%] right-[10%] w-32 h-24 md:w-44 md:h-32",
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
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Incorrect access code.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
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
          />
        </div>
      ))}

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-10 space-y-6">
        <div className="text-center space-y-2">
          <h1
            className="text-3xl font-semibold"
            style={{
              color: "#2C5F2D",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Private Access
          </h1>
          <p
            className="text-sm italic"
            style={{
              color: "#5A5A5A",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Forty in Phuket!
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter access code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 text-sm outline-none border border-[#E0DCD0] bg-transparent text-[#1A1A1A] rounded-lg focus:border-[#2C5F2D] transition-colors"
          />

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 text-sm font-medium tracking-wide uppercase rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "#2C5F2D", color: "#F5F0E6" }}
          >
            {loading ? "..." : "Enter"}
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