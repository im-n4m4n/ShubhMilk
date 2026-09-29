/**
 * Paisley — the ambi / mango motif as a repeating border strip.
 * Used along section top and bottom edges, and on the footer's top edge.
 */
export default function Paisley({ className = "" }: { className?: string }) {
  const motif = (x: number) => (
    <g key={x} transform={`translate(${x} 0)`}>
      {/* mango outline: a teardrop hooking right, with an inner counter-line */}
      <path d="M0 28 C0 12 12 2 26 2 C40 2 50 12 50 26 C50 40 38 46 28 46 C18 46 10 40 10 32 C10 24 16 20 22 20 C28 20 32 24 32 28" />
      <path d="M28 46 C34 52 44 54 52 50" strokeWidth="1" />
      {/* dotted inner fill */}
      <circle cx="30" cy="14" r="1.6" fill="var(--motif)" stroke="none" />
      <circle cx="40" cy="22" r="1.6" fill="var(--motif)" stroke="none" />
      <circle cx="22" cy="30" r="1.6" fill="var(--motif)" stroke="none" />
    </g>
  );

  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 640 56" preserveAspectRatio="none" className="h-full w-full">
        <g fill="none" stroke="var(--motif)" strokeWidth="1.5">
          <path d="M0 54 L640 54" strokeWidth="1" />
          {Array.from({ length: 12 }, (_, i) => motif(i * 54))}
        </g>
      </svg>
    </div>
  );
}
