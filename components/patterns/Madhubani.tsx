/**
 * Madhubani — Mithila painting. Fish, peacock, lotus and double-line bordered
 * panels with the characteristic cross-hatched fill. Used only in the festive
 * gifting section, faintly.
 */
export default function Madhubani({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className} aria-hidden>
      <g fill="none" stroke="var(--motif)" strokeWidth="2">
        {/* double border panel */}
        <rect x="14" y="14" width="572" height="372" />
        <rect x="26" y="26" width="548" height="348" strokeWidth="1.5" />

        {/* lotus, centre-left */}
        <g transform="translate(150 200)">
          <path d="M0 60 C-40 20 -40 -30 0 -60 C40 -30 40 20 0 60 Z" />
          <path d="M0 60 C-70 45 -95 0 -70 -40 C-30 -20 -10 15 0 60 Z" />
          <path d="M0 60 C70 45 95 0 70 -40 C30 -20 10 15 0 60 Z" />
          <circle cx="0" cy="30" r="10" />
        </g>

        {/* fish, right */}
        <g transform="translate(380 150)">
          <path d="M-70 0 C-30 -40 40 -40 70 0 C40 40 -30 40 -70 0 Z" />
          <path d="M-70 0 L-100 -22 L-100 22 Z" />
          <circle cx="30" cy="-8" r="5" />
          {/* scale hatching */}
          <path d="M-40 -12 C-20 -26 0 -26 20 -12 M-40 12 C-20 26 0 26 20 12" strokeWidth="1.5" />
        </g>

        {/* peacock, lower right */}
        <g transform="translate(430 300)">
          <path d="M-60 0 C-30 -30 20 -30 50 0 C20 16 -30 16 -60 0 Z" />
          <path d="M50 0 L76 -14 M50 0 L76 14" />
          <circle cx="34" cy="-8" r="4" />
          <path d="M-60 0 C-90 -30 -120 -40 -140 -20" />
          {/* eye feathers */}
          <g strokeWidth="1.5">
            <circle cx="-120" cy="-24" r="8" />
            <circle cx="-140" cy="-20" r="8" />
            <circle cx="-100" cy="-30" r="8" />
          </g>
        </g>

        {/* small lotus, bottom-left */}
        <g transform="translate(170 320)">
          <path d="M0 26 C-16 8 -16 -12 0 -26 C16 -12 16 8 0 26 Z" />
          <path d="M0 26 C-30 18 -40 0 -30 -16 C-12 -8 -4 6 0 26 Z" />
          <path d="M0 26 C30 18 40 0 30 -16 C12 -8 4 6 0 26 Z" />
        </g>

        {/* cross-hatch fill strip */}
        <g strokeWidth="1" opacity="0.8">
          {Array.from({ length: 22 }, (_, i) => (
            <path key={i} d={`M${40 + i * 24} 24 L${64 + i * 24} 48`} />
          ))}
        </g>
      </g>
    </svg>
  );
}
