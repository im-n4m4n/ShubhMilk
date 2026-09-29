/**
 * Mandala — concentric dot-and-petal rangoli.
 * Slow continuous rotation (120s per revolution) is applied by the CSS class
 * `animate-[spin_120s_linear_infinite]` on the wrapper (Tailwind arbitrary
 * value), so the SVG itself stays a pure presentational layer.
 */
export default function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);
  const inner = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  const dots = Array.from({ length: 36 }, (_, i) => (i * 360) / 36);

  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 800 800" className="h-full w-full">
        <g fill="none" stroke="var(--motif)" strokeWidth="1.5">
          {/* concentric rings */}
          {[120, 180, 240, 300, 360].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} />
          ))}
          {/* outer petal band */}
          {petals.map((a) => (
            <path
              key={`p${a}`}
              d="M400 40 C430 90 430 130 400 170 C370 130 370 90 400 40 Z"
              transform={`rotate(${a} 400 400)`}
            />
          ))}
          {/* mid lotus band */}
          {inner.map((a) => (
            <path
              key={`l${a}`}
              d="M400 160 C425 205 425 240 400 275 C375 240 375 205 400 160 Z"
              transform={`rotate(${a} 400 400)`}
            />
          ))}
          {/* inner dot ring */}
          {dots.map((a) => (
            <circle key={`d${a}`} cx="400" cy="330" r="4" transform={`rotate(${a} 400 400)`} />
          ))}
          <circle cx="400" cy="400" r="60" />
          <circle cx="400" cy="400" r="20" />
        </g>
      </svg>
    </div>
  );
}
