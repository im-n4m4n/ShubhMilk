"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mandala from "@/components/patterns/Mandala";
import PatternLayer from "@/components/patterns/PatternLayer";
import PourCanvas from "@/components/three/PourCanvas";
import { Overline } from "@/components/ui";
import { claims } from "@/lib/businessConfig";

/**
 * ThePour — the showpiece.
 *
 * DESKTOP: a tall section with a pinned canvas; scroll progress drives the pour
 * and three text beats fade in over the image at checkpoints.
 *
 * MOBILE: no pin, no scrub, no overlay. Pinning a section on a phone is the
 * single most expensive thing this page can do — the browser has to keep a
 * composited layer locked while the address bar collapses and the viewport
 * resizes, and every scrub frame re-rasterises. Instead the mobile layout stacks
 * the image on top and the copy underneath on plain bone, which is both much
 * cheaper and far more readable than white text sitting over a dark bottle.
 *
 * The two layouts share one DOM tree; only the positioning classes differ, and
 * GSAP is initialised through gsap.matchMedia() so the scroll choreography is
 * never created on a small screen at all.
 */
export default function ThePour() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const mandala = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const beats = [
    { at: 0.25, text: `Milk leaves the dairy at ${claims.dairyLeaveTime}, chilled within 90 minutes.` },
    { at: 0.55, text: "Never homogenised. Never powdered. Never touched by plastic." },
    { at: 0.85, text: "Bottled, sealed, and at your door in the morning." },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = section.current;
    if (!sectionEl) return;

    /* matchMedia: the pin + scrub timeline is only ever built on desktop.
       `isDesktop` is torn down automatically when the query stops matching. */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        /* Drive the 3D pour from scroll progress (no React re-renders). */
        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: pin.current as HTMLElement,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        });

        /* Text beats: one scrubbed timeline per beat, created once. */
        const beatEls = gsap.utils.toArray<HTMLElement>("[data-beat]");
        beatEls.forEach((el, i) => {
          const from = beats[i]?.at ?? 0;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: sectionEl,
                start: `top+=${from * 100}% top`,
                end: `top+=${(from + 0.12) * 100}% top`,
                scrub: true,
              },
            })
            .fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power3.out" });
        });

        /* Slow rotating mandala behind the canvas; pauses when off-screen. */
        const spin = gsap.to(mandala.current, {
          rotation: -360,
          duration: 120,
          ease: "none",
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
        });
      }, sectionEl);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative bg-bone lg:h-[300vh]">
      {/* On mobile this is a normal in-flow block; on desktop it is the pinned
          full-height stage. */}
      <div
        ref={pin}
        className="flex flex-col overflow-hidden lg:h-screen lg:flex-row lg:items-center"
      >
        {/* counter-rotating mandala — desktop only */}
        <PatternLayer opacity={0.08} className="hidden items-center justify-center lg:flex">
          <div ref={mandala} className="aspect-square h-[130vh]">
            <Mandala className="h-full w-full" />
          </div>
        </PatternLayer>

        {/* Stage: the 3D canvas on capable desktops, a still image everywhere
            else. On mobile it is a fixed-height band above the copy. */}
        <div className="relative h-[46vh] w-full shrink-0 lg:absolute lg:inset-0 lg:h-full">
          <PourCanvas
            progressRef={progressRef}
            fallback={
              <div className="relative h-full w-full">
                <Image
                  src="/images/bottle-still.jpeg"
                  alt="A glass bottle of fresh Shubh Milk"
                  fill
                  sizes="100vw"
                  quality={70}
                  className="object-cover"
                />
                {/* On desktop the copy sits over the image, so darken it for
                    contrast. On mobile the copy is below, so no scrim needed. */}
                <div aria-hidden className="absolute inset-0 hidden bg-ink/45 lg:block" />
              </div>
            }
          />
        </div>

        {/* Copy. Mobile: in flow, on bone. Desktop: absolutely over the stage. */}
        <div className="relative z-20 mx-auto w-full max-w-site px-6 py-12 lg:pointer-events-none lg:absolute lg:inset-0 lg:py-0 lg:px-12">
          <div className="lg:grid lg:h-full lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Overline>THE POUR</Overline>

              {/* Mobile: solid ink. Desktop: white over the darkened photo. */}
              <h2 className="display mt-4 text-[clamp(1.75rem,8vw,3.5rem)] font-medium leading-[1.1] text-ink lg:text-[clamp(2rem,4vw,3.5rem)] lg:text-[#FDFBF7]">
                Proof, poured <em className="font-light">slowly</em>.
              </h2>

              {/* Mobile: all three beats stacked and always visible. Desktop: the
                  same nodes, absolutely stacked and scrubbed into view. */}
              <div className="mt-6 space-y-5 lg:relative lg:mt-10 lg:h-40 lg:space-y-0">
                {beats.map((b, i) => (
                  <div
                    key={b.at}
                    data-beat
                    className="lg:absolute lg:inset-x-0 lg:top-0 lg:opacity-0"
                  >
                    <p className="display max-w-sm break-words text-[17px] leading-[1.55] text-ink/85 lg:text-xl lg:leading-[1.5] lg:text-[#EDE6DA]">
                      {b.text}
                    </p>
                    <p className="mt-2 font-mono text-[11px] tracking-[0.25em] text-muted lg:mt-3 lg:text-[#F3C888]">
                      {String(i + 1).padStart(2, "0")} / 03
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
