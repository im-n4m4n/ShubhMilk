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

        /* Text beats: ONE master timeline spanning the section's whole scroll
         * range, with each beat placed at its own `at` progress.
         *
         * This replaces one-ScrollTrigger-per-beat choreography that was wrong
         * in two separate ways, both visible as the copy piling up on top of
         * itself:
         *
         * 1. A beat's checkpoint was measured as a percentage of the SECTION
         *    (`top+=${at * 100}%`), but the pin only lasts the section height
         *    MINUS one viewport (`bottom bottom`). On a 300vh section and an
         *    802px viewport that is 2406px of scrolling for a pin that releases
         *    after 2406 - 802 = 1604px, so the last beat's 0.85 checkpoint
         *    (0.85 x 2406 = 2045px) sat ~440px PAST the release and could never
         *    be reached while pinned — it held at opacity 0 and never appeared.
         *
         * 2. A scrubbed `fromTo` only interpolates inside its own start/end
         *    window; after that the element keeps its end state. Nothing ever
         *    faded a beat OUT, so beat 1 was still fully legible at the end of
         *    the section while beat 2 faded in underneath it.
         *
         * Positioning the timeline on the same start/end as the pin makes `at`
         * mean "progress through the pinned range", which is what the design
         * intends; the explicit fade-out gives each beat a handover.
         */
        const beatEls = gsap.utils.toArray<HTMLElement>("[data-beat]");
        /* How long a beat takes to fade in, and to fade out again, as a share
         * of the pinned range. 0.06 * 1600px ≈ 96px of scroll. */
        const BEAT_FADE = 0.06;

        const beatTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionEl,
            /* Deliberately identical to the pin's start/end below, so
               progress 0 is the moment the section sticks and progress 1 is the
               moment it releases. */
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        beatEls.forEach((el, i) => {
          const at = beats[i]?.at ?? 0;
          const nextAt = beats[i + 1]?.at ?? 1;
          const isLast = i === beatEls.length - 1;

          const fadeInEnd = Math.min(at + BEAT_FADE, nextAt);
          beatTl.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: Math.max(0.001, fadeInEnd - at) },
            at,
          );

          /* Not the last beat: fade out so the exit finishes exactly as the
             next beat begins its fade-in. That guarantees no two beats are ever
             legible at once, and no blank gap between them either. */
          if (!isLast) {
            const holdEnd = Math.max(fadeInEnd, nextAt - BEAT_FADE);
            beatTl.to(
              el,
              { autoAlpha: 0, y: -24, duration: Math.max(0.001, nextAt - holdEnd) },
              holdEnd,
            );
          }
        });

        /* Pad the timeline out to a total duration of exactly 1.
         *
         * A timeline's duration is however long its LAST child ends, which here
         * would be 0.91 (the final beat's fade-in). GSAP then stretches the whole
         * timeline across the scroll range, so every `at` above would land ~10%
         * later than the number says — measured, beat 1 reached full opacity at
         * 0.32 instead of 0.31 and beat 3 only at 1.0 instead of 0.91.
         * A zero-effect tween ending at 1 pins the total, so `at` is a literal
         * fraction of the pinned range again. (A `duration` in the timeline's
         * own config does not do this — GSAP derived 0.91 from the children
         * here and ignored it.)
         */
        beatTl.to({}, { duration: 0.001 }, 0.999);

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
