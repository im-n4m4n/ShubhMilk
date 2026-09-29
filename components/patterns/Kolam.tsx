/**
 * Kolam — the South Indian dot-grid with looping curved lines drawn through
 * the dots. Used for the scroll-progress rail and the subscription builder's
 * step connectors. Variants: "rail" (vertical) and "strip" (horizontal).
 */
export default function Kolam({
  variant = "strip",
  className = "",
  /** 0 → 1: how much of the loop has been "drawn" in saffron */
  progress = 0,
}: {
  variant?: "rail" | "strip";
  className?: string;
  progress?: number;
}) {
  const dots = Array.from({ length: 9 }, (_, i) => 20 + i * 20);

  if (variant === "rail") {
    return (
      <svg viewBox="0 0 40 200" preserveAspectRatio="none" className={className} aria-hidden>
        <g fill="none" stroke="var(--motif)" strokeWidth="2">
          {/* dot grid */}
          {dots.map((y) => (
            <circle key={y} cx="20" cy={y * (200 / 200)} r="2.5" fill="var(--motif)" stroke="none" />
          ))}
          {/* looping kurma line through the dots */}
          <path d="M20 10 C34 40 6 50 20 80 C34 110 6 120 20 150 C34 175 10 185 20 195" />
        </g>
        {/* saffron fill drawn by scroll progress (clip-path only) */}
        <g
          fill="none"
          stroke="var(--kesar)"
          strokeWidth="2.5"
          style={{ clipPath: `inset(0 0 ${Math.max(0, 100 - progress * 100)}% 0)` }}
        >
          <path d="M20 10 C34 40 6 50 20 80 C34 110 6 120 20 150 C34 175 10 185 20 195" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className={className} aria-hidden>
      <g fill="var(--motif)" stroke="none">
        {Array.from({ length: 20 }, (_, i) => (
          <circle key={i} cx={10 + i * 20} cy={20} r="2.5" />
        ))}
      </g>
      <g fill="none" stroke="var(--motif)" strokeWidth="2">
        <path d="M10 20 C30 4 50 36 70 20 C90 4 110 36 130 20 C150 4 170 36 190 20 C210 4 230 36 250 20 C270 4 290 36 310 20 C330 4 350 36 370 20 C384 9 392 15 396 20" />
      </g>
      <g
        fill="none"
        stroke="var(--kesar)"
        strokeWidth="2.5"
        style={{ clipPath: `inset(0 ${Math.max(0, 100 - progress * 100)}% 0 0)` }}
      >
        <path d="M10 20 C30 4 50 36 70 20 C90 4 110 36 130 20 C150 4 170 36 190 20 C210 4 230 36 250 20 C270 4 290 36 310 20 C330 4 350 36 370 20 C384 9 392 15 396 20" />
      </g>
    </svg>
  );
}
