/**
 * Warli — Maharashtra's tribal line art. Stick figures with triangular bodies,
 * the tarpa (drum), and the classic tarpa-dance chain. Used as narrative
 * markers along the farm-to-doorstep timeline.
 */
export default function Warli({ className = "" }: { className?: string }) {
  /* A single warli figure: two triangles for the body, lines for limbs. */
  const figure = (x: number, y: number, scale = 1) => (
    <g key={`f${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* head */}
      <circle cx="0" cy="-30" r="7" />
      {/* body: two triangles meeting at the waist */}
      <path d="M-11 -20 L11 -20 L0 0 Z" />
      <path d="M0 0 L11 22 L-11 22 Z" />
      {/* limbs */}
      <path d="M-11 -18 L-22 -4 M11 -18 L22 -4 M-6 22 L-10 42 M6 22 L10 42" />
    </g>
  );

  return (
    <svg viewBox="0 0 480 160" className={className} aria-hidden>
      <g fill="none" stroke="var(--motif)" strokeWidth="2" strokeLinecap="round">
        {/* tarpa drum */}
        <g transform="translate(60 90)">
          <path d="M-16 -22 L16 -22 L22 22 L-22 22 Z" />
          <path d="M-22 -22 L22 -22 M-16 22 L16 22" />
        </g>
        {/* dancing chain */}
        {figure(130, 90)}
        {figure(200, 90)}
        {figure(270, 90)}
        {figure(340, 90)}
        {/* joined hands */}
        <path d="M112 72 L152 72 M182 72 L222 72 M252 72 L292 72 M322 72 L362 72" opacity="0.7" />
        {/* hut */}
        <g transform="translate(420 90)">
          <path d="M-26 26 L0 -18 L26 26 Z" />
          <path d="M-18 -2 L-18 26" />
        </g>
      </g>
    </svg>
  );
}
