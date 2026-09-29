/**
 * KanthaRule — the Bengali running-stitch dashed divider used between all
 * major sections. A pure divider element (no positioning needed).
 */
export default function KanthaRule({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <hr className="border-0 border-t border-dashed" style={{ borderColor: "var(--motif)" }} />
      </div>
    </div>
  );
}
