"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrimaryButton, Overline } from "@/components/ui";
import MaskedLines from "@/components/motion/MaskedLines";

const counters = [
  { n: "30 → 1", l: "litres of milk per litre of ghee" },
  { n: "6 hrs", l: "of hand churning" },
  { n: "0", l: "additives, ever" },
];

export default function BilonaGhee() {
  const media = useRef<HTMLDivElement>(null);
  const counterEls = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = media.current;
    if (!el) return;
    // Ken Burns 1.15 → 1, transform-only, power3.out per PRD.
    const tween = gsap.fromTo(
      el,
      { scale: 1.15 },
      {
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      },
    );

    // animated counters
    const nums = counterEls.current?.querySelectorAll("[data-count]") ?? [];
    const tweens = Array.from(nums).map((n) =>
      gsap.fromTo(
        n,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: counterEls.current, start: "top 85%", once: true },
        },
      ),
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section className="bg-bone py-32 lg:py-48">
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Macro photography with Ken Burns */}
          <div className="card overflow-hidden">
            <div className="relative h-[460px] w-full">
              <div ref={media} className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/ghee-macro.jpeg"
                  alt="Golden bilona ghee being hand-churned, the Vedic way"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
              />
            </div>
          </div>

          <div>
            <Overline>MADE THE OLD WAY</Overline>
            <MaskedLines
              className="display mt-4 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.08] text-ink"
              lines={[
                <span key="1">
                  Churned by hand. <em className="font-light">Not</em>
                </span>,
                <span key="2">by machine.</span>,
              ]}
            />
            <p className="mt-6 max-w-md text-[17px] leading-[1.7] text-muted">
              The Vedic bilona method: curd from the morning milk, churned slowly
              with a wooden rope-drum until the butter rises, then simmered over a
              slow flame into golden ghee. Nothing hurried, nothing added.
            </p>

            <div ref={counterEls} className="mt-10 grid grid-cols-3 gap-6">
              {counters.map((s) => (
                <div key={s.l} data-count>
                  <p className="display text-3xl text-ink">{s.n}</p>
                  <p className="mt-2 text-xs leading-[1.6] text-muted">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <PrimaryButton>Shop Ghee</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
