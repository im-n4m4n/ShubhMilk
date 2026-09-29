/**
 * PaperGrain — an SVG feTurbulence fractalNoise overlay at opacity 0.025,
 * fixed across the whole page. This is what makes white feel expensive.
 * Rendered once in the root layout; pointer-events none.
 */
export default function PaperGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity: 0.025 }}
    >
      <svg className="h-full w-full">
        <filter id="shubh-paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#shubh-paper-grain)" />
      </svg>
    </div>
  );
}
