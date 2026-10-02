"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Kolam from "@/components/patterns/Kolam";
import { Overline } from "@/components/ui";

/**
 * The six steps, each with its own photograph. `from`/`to` remain as the soft
 * gradient that sits behind the photo while it loads, so a card never flashes
 * an empty white box.
 *
 * alt text describes what SHOULD be in the picture. If you swap these for your
 * own photographs, update the alt to match what is actually shown — mismatched
 * alt text is worse than none for screen readers and for search.
 */
const steps = [
  {
    n: "01",
    title: "Farm",
    copy: "Gir cows graze on open pasture. No feedlots, no shortcuts.",
    photo: "/images/farm/farm-step-01-farm.jpeg",
    alt: "An indigenous Gir cow grazing on open pasture at sunrise, with a village hut in the misty background",
    from: "#F4EDDF",
    to: "#E2D5BC",
  },
  {
    n: "02",
    title: "Milking",
    copy: "Hand-milked at 4:30 AM into stainless steel, never plastic.",
    photo: "/images/farm/farm-step-02-milking.jpeg",
    alt: "A dairy farmer hand-milking a cow into a stainless steel pail inside a simple cowshed",
    from: "#F5EEE1",
    to: "#DFD2BB",
  },
  {
    n: "03",
    title: "Chilling",
    copy: "From 37°C to 4°C within ninety minutes, on site.",
    photo: "/images/farm/farm-step-03-chilling.jpeg",
    alt: "Two polished stainless steel milk cans standing in a clean, bare dairy chilling room",
    from: "#F2EDE2",
    to: "#D9DFD2",
  },
  {
    n: "04",
    title: "Testing",
    copy: "Every batch tested for adulterants before it leaves the gate.",
    photo: "/images/farm/farm-step-04-testing.jpeg",
    alt: "A lactometer testing a sample of milk in a glass beaker, beside a bottle of milk",
    from: "#F4EFE3",
    to: "#E0DCC8",
  },
  {
    n: "05",
    title: "Glass Bottling",
    copy: "Filled, capped and sealed in sterilised returnable glass.",
    photo: "/images/farm/farm-step-05-bottling.jpeg",
    alt: "Fresh milk being poured into a clear glass bottle, with clean empty bottles waiting beside it",
    from: "#F6F0E4",
    to: "#E4DAC3",
  },
  {
    n: "06",
    title: "Your Doorstep",
    copy: "Delivered cold, before the city wakes. Bottles collected.",
    photo: "/images/farm/farm-step-06-doorstep.jpeg",
    alt: "A crate of fresh milk bottles waiting on the doorstep of a home at first light",
    from: "#F7F1E6",
    to: "#E8DEC8",
  },
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
                    <Image
                      src={s.photo}
                      alt={s.alt}
                      fill
                      quality={70}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                      className="object-cover"
                    />
                    {/* madhubani double border, laid over the photograph as a frame */}
                    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                      <g fill="none" stroke="#F6F0E4" strokeWidth="2" opacity="0.5">
                        <rect x="10" y="10" width="380" height="280" />
                        <rect x="18" y="18" width="364" height="264" strokeWidth="1.2" opacity="0.7" />
                      </g>
                    </svg>
                    {/* soft base wash so the card edge stays calm against the grid */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink/25 to-transparent"
                    />
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
