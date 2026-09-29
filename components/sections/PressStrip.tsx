import SilkReveal from "@/components/motion/SilkReveal";

const outlets = [
  "VOGUE INDIA",
  "GQ",
  "THE ECONOMIC TIMES",
  "HINDUSTAN TIMES",
  "FOOD & WINE",
  "BETTER HOMES",
  "THE HINDU",
];

/**
 * PressStrip — "Featured in" trust band, per the Two Brothers pattern
 * (press logo marquee). Static row on mobile; light auto-scroll on desktop
 * is handled by CSS overflow + duplicate track in TrustMarquee style —
 * kept static here for restraint.
 */
export default function PressStrip() {
  return (
    <section className="border-y border-hairline bg-buttermilk py-8">
      <SilkReveal>
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 lg:justify-between lg:px-12" data-silk>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Featured in
          </span>
          {outlets.map((o) => (
            <span
              key={o}
              className="display text-sm font-medium uppercase tracking-[0.18em] text-ink/45"
            >
              {o}
            </span>
          ))}
        </div>
      </SilkReveal>
    </section>
  );
}
