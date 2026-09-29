/**
 * PatternLayer — the standard wrapper for background motifs. Absolutely
 * positioned, pointer-events none, aria-hidden, warm motif linework at
 * opacity 0.05–0.09 with multiply blend, so patterns feel embossed into
 * khadi paper rather than printed on.
 */
import type { ReactNode } from "react";

export default function PatternLayer({
  children,
  opacity = 0.07,
  className = "",
  z = 0,
}: {
  children: ReactNode;
  opacity?: number;
  className?: string;
  z?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: z }}
    >
      <div
        className="h-full w-full"
        style={{
          opacity,
          mixBlendMode: "multiply",
        }}
      >
        {children}
      </div>
    </div>
  );
}
