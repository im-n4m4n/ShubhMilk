"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Warli from "@/components/patterns/Warli";
import Kolam from "@/components/patterns/Kolam";
import { Overline } from "@/components/ui";

const steps = [
  { n: "01", title: "Farm", copy: "Gir cows graze on open pasture. No feedlots, no shortcuts.", from: "#F4EDDF", to: "#E2D5BC" },
  { n: "02", title: "Milking", copy: "Hand-milked at 4:30 AM into stainless steel, never plastic.", from: "#F5EEE1", to: "#DFD2BB" },
  { n: "03", title: "Chilling", copy: "From 37°C to 4°C within ninety minutes, on site.", from: "#F2EDE2", to: "#D9DFD2" },
  { n: "04", title: "Testing", copy: "Every batch tested for adulterants before it leaves the gate.", from: "#F4EFE3", to: "#E0DCC8" },
  { n: "05", title: "Glass Bottling", copy: "Filled, capped and sealed in sterilised returnable glass.", from: "#F6F0E4", to: "#E4DAC3" },
  { n: "06", title: "Your Doorstep", copy: "Delivered cold, before the city wakes. Bottles collected.", from: "#F7F1E6", to: "#E8DEC8" },
];

/**
 * FarmJourney — a pinned horizontal-scroll timeline of six illustrated panels.
 * GSAP translates the row left as you scroll down; a kolam dotted line draws in
 * saffron with progress and a mono caption reads the current step.
 */
export default function FarmJourney() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = section.current;
    const rowEl = row.current;
    if (!sectionEl || !rowEl) return;

    const ctx = gsap.context(() => {
      const distance = () => rowEl.scrollWidth - window.innerWidth;

      gsap.to(rowEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          pin: pin.current as HTMLElement,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            setCurrent(Math.min(steps.length, Math.floor(self.progress * steps.length) + 1));
          },
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-bone">
      <div ref={pin} className="flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-site px-6 lg:px-12">
          <Overline>FARM TO DOORSTEP</Overline>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            Six steps, <em className="font-light">eleven minutes</em> of handling.
          </h2>
        </div>

        <div className="mt-14">
          <div ref={row} className="flex w-max gap-6 px-6 lg:px-12">
            {steps.map((s) => (
              <article key={s.n} className="relative w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30vw]">
                {/* madhubani-framed duotone panel */}
                <div className="card overflow-hidden">
                  <div
                    className="relative h-[46vh] w-full"
                    style={{ background: `linear-gradient(160deg, ${s.from} 0%, ${s.to} 100%)` }}
                  >
                    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
                      {/* madhubani double border */}
                      <g fill="none" stroke="#C9B79A" strokeWidth="2">
                        <rect x="10" y="10" width="380" height="280" strokeOpacity="0.8" />
                        <rect x="18" y="18" width="364" height="264" strokeWidth="1.2" strokeOpacity="0.7" />
                      </g>
                      <StepGlyph n={s.n} />
                    </svg>

                    {/* warli figure at the base */}
                    <Warli className="absolute bottom-2 left-4 h-16 w-40 opacity-[0.55]" />
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-kesar">{s.n}</p>
                    <h3 className="display mt-2 text-2xl text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-[1.7] text-muted">{s.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* kolam connector + caption */}
        <div className="mx-auto mt-12 w-full max-w-site px-6 lg:px-12">
          <Kolam variant="strip" progress={progress} className="h-8 w-full opacity-60" />
          <p className="mt-3 font-mono text-[11px] tracking-[0.25em] text-muted">
            {String(current).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Simple duotone illustration per step — abstract, warm, drawn not clipped. */
function StepGlyph({ n }: { n: string }) {
  const stroke = "#B9A582";
  const common = { fill: "none", stroke, strokeWidth: 2.5, strokeLinecap: "round" as const };
  return (
    <g {...common}>
      {n === "01" && (
        <>
          <path d="M60 220 L140 130 L220 220 Z" />
          <path d="M120 220 L120 165 L165 165 L165 220" />
          <path d="M250 200 C270 175 300 175 320 200 C310 210 260 210 250 200 Z" />
          <path d="M240 205 C230 200 225 190 228 180 M330 205 C342 200 348 190 344 180" />
        </>
      )}
      {n === "02" && (
        <>
          <path d="M110 210 L150 210 L150 155 L110 155 Z" />
          <path d="M130 155 L130 120" />
          <circle cx="250" cy="150" r="22" />
          <path d="M250 172 L250 215 M230 215 L270 215" />
        </>
      )}
      {n === "03" && (
        <>
          <path d="M100 200 L100 120 L180 120 L180 200 Z" />
          <path d="M120 140 L160 140 M120 160 L160 160 M120 180 L160 180" strokeWidth="2" />
          <path d="M220 200 C240 160 280 160 300 200" />
          <path d="M260 130 L260 160" />
          <circle cx="260" cy="176" r="8" />
        </>
      )}
      {n === "04" && (
        <>
          <path d="M150 110 L150 140 L130 190 C125 205 140 215 155 215 L245 215 C260 215 275 205 270 190 L250 140 L250 110 Z" />
          <path d="M160 175 L240 175" strokeWidth="2" />
          <path d="M190 130 L190 100 M210 130 L230 96 M230 130 L250 100" strokeWidth="2" />
        </>
      )}
      {n === "05" && (
        <>
          <path d="M120 120 L120 90 L280 90 L280 120" />
          <path d="M140 120 L140 215 L260 215 L260 120" />
          <path d="M170 75 L230 75" />
          <path d="M120 165 L280 165" strokeWidth="2" />
        </>
      )}
      {n === "06" && (
        <>
          <path d="M80 190 L80 110 L200 110 L200 190 Z" />
          <path d="M200 130 L260 130 L260 190 L200 190" />
          <circle cx="230" cy="196" r="10" />
          <path d="M280 150 L320 150 L320 190" />
        </>
      )}
    </g>
  );
}
