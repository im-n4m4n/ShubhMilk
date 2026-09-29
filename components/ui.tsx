import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/* ---------- Overline ---------- */

export function Overline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`overline text-kesar ${className}`}>{children}</p>;
}

/* ---------- Buttons (pill, per design system) ---------- */

export function PrimaryButton({
  children,
  className = "",
  type = "button",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-[15px] font-medium text-bone transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 text-kesar transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.5} />
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-full border border-hairline bg-transparent px-8 py-4 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-milk ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- Section heading ---------- */

export function SectionHeading({
  overline,
  title,
  italicWord,
  lede,
}: {
  overline: string;
  title: string;
  /** one word of the title rendered in italic serif for emphasis */
  italicWord?: string;
  lede?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Overline>{overline}</Overline>
      <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
        {italicWord ? renderItalic(title, italicWord) : title}
      </h2>
      {lede ? <p className="mt-4 text-[17px] leading-[1.7] text-muted">{lede}</p> : null}
    </div>
  );
}

function renderItalic(title: string, word: string) {
  const parts = title.split(" ");
  const i = parts.indexOf(word);
  if (i === -1) return title;
  return (
    <>
      {parts.slice(0, i).join(" ")}{" "}
      <em className="font-light">{word}</em>
      {i < parts.length - 1 ? <> {parts.slice(i + 1).join(" ")}</> : null}
    </>
  );
}

/* ---------- Product image placeholder ---------- */

const categoryTint: Record<string, { top: string; bottom: string; glyph: string }> = {
  "a2-milk": { top: "#F7F3EA", bottom: "#EDE6DA", glyph: "#C9BBA4" },
  "buffalo-milk": { top: "#F3EEE4", bottom: "#E4DBC9", glyph: "#B8A88D" },
  curd: { top: "#F5F1E8", bottom: "#E7E0D1", glyph: "#CFC3AC" },
  paneer: { top: "#F6F2E9", bottom: "#E9E2D3", glyph: "#D3C7B0" },
  ghee: { top: "#F9F1E2", bottom: "#F0E2C8", glyph: "#D9A85C" },
  butter: { top: "#F8F3E7", bottom: "#EFE5D0", glyph: "#DFC98F" },
  lassi: { top: "#F6F1E6", bottom: "#E8DFCC", glyph: "#D8C9A8" },
  chaas: { top: "#F2F1E8", bottom: "#E2E2D2", glyph: "#B9C0A2" },
  shrikhand: { top: "#F9F0E4", bottom: "#F1DFC6", glyph: "#DBA96A" },
  "flavoured-milk": { top: "#F8EFE3", bottom: "#EFE0C9", glyph: "#D6A878" },
};

/**
 * Round-1 placeholder visual: an embossed glass-bottle silhouette on a cream
 * tile, unique tint per category. Replaced by photography in Round 2/3.
 */
export function ProductImage({
  category,
  name,
  className = "",
}: {
  category: string;
  name: string;
  className?: string;
}) {
  const t = categoryTint[category] ?? categoryTint["a2-milk"];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-label={name} role="img">
      <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id={`g-${category}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.top} />
            <stop offset="100%" stopColor={t.bottom} />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#g-${category})`} />
        {/* glass bottle silhouette */}
        <g fill="none" stroke={t.glyph} strokeWidth="3">
          <path d="M170 130 L170 190 C150 210 145 235 145 265 L145 360 C145 372 153 380 165 380 L235 380 C247 380 255 372 255 360 L255 265 C255 235 250 210 230 190 L230 130 Z" />
          <path d="M170 130 L170 110 L230 110 L230 130" />
          <path d="M178 118 L222 118" strokeWidth="2" />
          {/* milk level */}
          <path d="M152 300 L248 300" strokeWidth="2" strokeDasharray="4 6" />
          <path d="M152 330 L248 330" strokeWidth="2" strokeDasharray="4 6" opacity="0.6" />
        </g>
        {/* cap */}
        <rect x="172" y="88" width="56" height="22" rx="4" fill={t.glyph} opacity="0.55" />
      </svg>
    </div>
  );
}
