/**
 * Buti — tiny Rajasthani block-print florals, scattered sparsely.
 * Used as a faint full-bleed background behind the products grid and the
 * promise pillars. Deterministic pseudo-random placement (no hydration drift).
 */
export default function Buti({ className = "" }: { className?: string }) {
  /* Deterministic scatter: golden-angle spiral.
   * The coordinates are ROUNDED on purpose. Math.cos/sin are not guaranteed to
   * return bit-identical results in every JS engine, so the un-rounded values
   * could serialise as e.g. 26.35612277238292 on the server and
   * 26.356122772382918 in the browser — which React reports as a hydration
   * mismatch. Rounding to 4dp makes both sides agree exactly. */
  const round = (n: number): number => Math.round(n * 10000) / 10000;
  const seed = Array.from({ length: 34 }, (_, i) => {
    const golden = 137.508;
    const a = (i * golden * Math.PI) / 180;
    const r = Math.sqrt(i / 34);
    return {
      x: round(50 + Math.cos(a) * r * 46),
      y: round(50 + Math.sin(a) * r * 46),
      s: round(0.7 + ((i * 37) % 60) / 100),
      rot: (i * 53) % 360,
    };
  });

  const floral = (x: number, y: number, s: number, rot: number, key: number) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
      {/* four-petal buti with a dot centre and two leaves */}
      <path d="M0 0 C-6 -8 -6 -16 0 -22 C6 -16 6 -8 0 0 Z" />
      <path d="M0 0 C-8 -6 -16 -6 -22 0 C-16 6 -8 6 0 0 Z" />
      <path d="M0 0 C6 8 6 16 0 22 C-6 16 -6 8 0 0 Z" />
      <path d="M0 0 C8 6 16 6 22 0 C16 -6 8 -6 0 0 Z" />
      <circle cx="0" cy="0" r="2.5" fill="var(--motif)" stroke="none" />
      <path d="M0 24 C-4 30 -4 36 0 40 M0 24 C4 30 4 36 0 40" strokeWidth="1" />
    </g>
  );

  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <g fill="none" stroke="var(--motif)" strokeWidth="0.8">
          {seed.map((p, i) => floral(p.x, p.y, p.s, p.rot, i))}
        </g>
      </svg>
    </div>
  );
}
