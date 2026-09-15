// src/components/branding/Logo.tsx
import Image from "next/image";

type LogoProps = {
  className?: string;
  variant?: "mark" | "full";
};

export function Logo({ className = "", variant = "mark" }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <Image
          src="/logo.png"
          alt="Nonso & Tijani Monogram"
          fill
          sizes="(max-width: 768px) 80px, 96px"
          className="object-contain"
          priority
        />
      </div>

      {variant === "full" && (
        <p
          className="mt-3 text-xs tracking-[0.2em] uppercase font-medium"
          style={{ color: "#2C5F2D" }}
        >
          Forty in Phuket
        </p>
      )}
    </div>
  );
}
