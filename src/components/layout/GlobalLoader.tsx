"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);

    // Hide after short delay to allow content to render
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F0E6]/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
      style={{ opacity: isLoading ? 1 : 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated Logo/Icon */}
        <div
          className="w-12 h-12 rounded-full border-2 border-[#2C5F2D] border-t-transparent animate-spin"
          style={{ animationDuration: "1s" }}
        />

        {/* Loading Text */}
        <p
          className="text-xs tracking-[0.2em] uppercase animate-pulse"
          style={{ color: "#2C5F2D" }}
        >
          Loading Paradise...
        </p>
      </div>
    </div>
  );
}
