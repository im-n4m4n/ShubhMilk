/**
 * SideRail — fixed vertical editorial rail on the left edge (Two Brothers
 * floating-rail pattern, restrained to a quiet mono caption). Hidden below xl.
 */
export default function SideRail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="h-16 w-px bg-motif" />
        <span
          className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted"
          style={{ writingMode: "vertical-rl" }}
        >
          Farm to doorstep · Since 2019
        </span>
        <span className="h-16 w-px bg-motif" />
      </div>
    </div>
  );
}
