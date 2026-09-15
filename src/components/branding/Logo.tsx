type LogoProps = {
  className?: string;
  variant?: "mark" | "full";
};

export function Logo({ className = "", variant = "mark" }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Split ring — left half green, right half blue, echoing the homepage arches */}
        <path
          d="M 36 2 A 34 34 0 0 0 36 70"
          fill="none"
          stroke="#2C5F2D"
          strokeWidth="1.5"
        />
        <path
          d="M 36 2 A 34 34 0 0 1 36 70"
          fill="none"
          stroke="#7BAFD4"
          strokeWidth="1.5"
        />

        {/* N & T monogram */}
        <text
          x="36"
          y="32"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="14"
          fontWeight="600"
          fill="#1A1A1A"
        >
          N
          <tspan fill="#5A5A5A" fontSize="9" dx="1">
            &amp;
          </tspan>
          <tspan fill="#1A1A1A" dx="1">
            T
          </tspan>
        </text>

        {/* FORTY, small tracked caps */}
        <text
          x="36"
          y="45"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="9"
          letterSpacing="2"
          fill="#2C5F2D"
        >
          FORTY
        </text>

        <line
          x1="26"
          y1="50"
          x2="46"
          y2="50"
          stroke="#E0DCD0"
          strokeWidth="1"
        />

        <text
          x="36"
          y="58"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          letterSpacing="1.5"
          fill="#5A5A5A"
        >
          PHUKET
        </text>
      </svg>

      {variant === "full" && (
        <p
          className="mt-2 text-xs tracking-[0.2em] uppercase"
          style={{ color: "#2C5F2D" }}
        >
          Forty in Phuket
        </p>
      )}
    </div>
  );
}
