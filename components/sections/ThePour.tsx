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
 * ThePour — the showpiece. A tall section with a pinned canvas.
 * Scroll progress drives the pour; three text beats fade in at checkpoints.
 *
 * PERFORMANCE NOTES (why this file was rewritten):
 *   • The canvas is lazy-loaded and only mounted while on screen, and skipped
 *     entirely on mobile / reduced-motion (see components/three/PourCanvas.tsx).
 *   • The old version created three ScrollTrigger.onUpdate callbacks that each
 *     called gsap.to() on EVERY scroll frame — hundreds of tweens a second,
 *     all fighting each other, which is what made scrolling feel sticky. Those
 *     are now two plain scrubbed timelines created once, and GSAP handles the
 *     interpolation.
 *   • The 130vh rotating mandala SVG is desktop-only: a full-screen spin behind
 *     a WebGL canvas is pure cost on a phone.
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

      /* Text beats: one scrubbed timeline over the whole section, with each
         beat's fade mapped to its own slice of the scroll. Created once —
         GSAP does the interpolating, not a JS callback per frame. */
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

      /* Counter-rotating mandala — desktop only, and it stops when off-screen. */
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
  }, []);

  return (
    <section ref={section} className="relative h-[200vh] bg-bone lg:h-[300vh]">
      <div ref={pin} className="flex h-screen items-center overflow-hidden">
        {/* counter-rotating mandala behind the canvas — desktop only */}
        <PatternLayer opacity={0.08} className="hidden items-center justify-center lg:flex">
          <div ref={mandala} className="aspect-square h-[130vh]">
            <Mandala className="h-full w-full" />
          </div>
        </PatternLayer>

        {/* 3D canvas — lazy, in-view only, still image on mobile */}
        <PourCanvas
          progressRef={progressRef}
          fallback={
            <div className="relative h-full w-full">
              <Image
                src="/images/bottle-still.jpeg"
                alt="A glass bottle of Shubh Milk being poured"
                fill
                sizes="100vw"
                quality={70}
                className="object-cover"
              />
            </div>
          }
        />

        {/* copy */}
        <div className="pointer-events-none absolute inset-0 z-20 mx-auto max-w-site px-6 lg:px-12">
          <div className="grid h-full grid-cols-12 items-center">
            <div className="col-span-12 lg:col-span-5">
              <Overline>THE POUR</Overline>
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.08] text-ink">
                Proof, poured <em className="font-light">slowly</em>.
              </h2>

              <div className="relative mt-10 h-40">
                {beats.map((b, i) => (
                  <div key={b.at} data-beat className="absolute inset-x-0 top-0 opacity-0">
                    <p className="display max-w-sm text-xl leading-[1.5] text-ink/90">{b.text}</p>
                    <p className="mt-3 font-mono text-[11px] tracking-[0.25em] text-muted">
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
