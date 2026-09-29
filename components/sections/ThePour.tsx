"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mandala from "@/components/patterns/Mandala";
import PatternLayer from "@/components/patterns/PatternLayer";
import BottleScene from "@/components/three/BottleScene";
import { Overline } from "@/components/ui";

/**
 * ThePour — the showpiece. A ~300vh section with a pinned R3F canvas.
 * Scroll progress drives the pour; three text beats fade in at checkpoints.
 * The Mandala DOM layer behind the canvas counter-rotates slowly.
 */
export default function ThePour() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const mandala = useRef<HTMLDivElement>(null);
  const beat1 = useRef<HTMLDivElement>(null);
  const beat2 = useRef<HTMLDivElement>(null);
  const beat3 = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const beats = [
    { ref: beat1, at: 0.25, text: "Collected at 4:30 AM, chilled within 90 minutes." },
    { ref: beat2, at: 0.55, text: "Never homogenised. Never powdered. Never touched by plastic." },
    { ref: beat3, at: 0.85, text: "Bottled, sealed, and at your door by 6:45 AM." },
  ];

  const bindBeat = (r: React.RefObject<HTMLDivElement | null>) => (el: HTMLDivElement) => {
    // callback-ref assignment keeps the typed refs stable
    (r as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = section.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      // Drive the 3D pour from scroll progress (no React re-renders).
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

      // Text beats fade/slide at their checkpoints (power3.out, per PRD).
      const show = (r: React.RefObject<HTMLDivElement | null> | React.RefObject<HTMLDivElement>, at: number) => {
        gsap.set(r.current, { autoAlpha: 0, y: 24 });
        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const on = self.progress >= at;
            gsap.to(r.current, {
              autoAlpha: on ? 1 : 0,
              y: on ? 0 : 24,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        });
      };
      show(beat1, 0.25);
      show(beat2, 0.55);
      show(beat3, 0.85);
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative h-[220vh] bg-bone lg:h-[300vh]">
      <div ref={pin} className="flex h-screen items-center overflow-hidden">
        {/* counter-rotating mandala behind the canvas */}
        <PatternLayer opacity={0.08} className="flex items-center justify-center">
          <div ref={mandala} className="aspect-square h-[130vh] animate-[spin_120s_linear_infinite_reverse]">
            <Mandala className="h-full w-full" />
          </div>
        </PatternLayer>

        {/* 3D canvas */}
        <div ref={canvasWrap} className="absolute inset-0 z-10">
          <BottleScene progressRef={progressRef} />
        </div>

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
                  <div
                    key={b.at}
                    ref={bindBeat(b.ref)}
                    className="absolute inset-x-0 top-0"
                    data-beat={i}
                  >
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
