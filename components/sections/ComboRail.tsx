"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { combos } from "@/lib/combos";
import { inr } from "@/lib/products";
import { useCart } from "@/lib/store";
import { toast } from "@/components/motion/toast";
import SilkReveal from "@/components/motion/SilkReveal";

/**
 * ComboRail — "Buy More. Save More." per Rosier Foods: a horizontal rail of
 * bundle cards with arrow paging, snap scrolling, strikethrough MRP, ratings
 * and inline add-to-cart with quantity stepper.
 */
export default function ComboRail() {
  const rail = useRef<HTMLDivElement>(null);
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <SilkReveal>
          <div data-silk className="flex items-end justify-between gap-6">
            <div>
              <p className="overline text-kesar">BUY MORE. SAVE MORE.</p>
              <h2 className="display mt-3 text-[clamp(1.75rem,3.5vw,3rem)] font-medium text-ink">
                Curated bundles, better value
              </h2>
            </div>
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                aria-label="Previous bundles"
                onClick={() => page(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-milk text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="More bundles"
                onClick={() => page(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-milk text-ink transition-colors hover:bg-ink hover:text-bone"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </SilkReveal>

        <SilkReveal className="mt-10">
          <div
            ref={rail}
            data-silk
            className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {combos.map((c) => {
              const off = Math.round((1 - c.price / c.mrp) * 100);
              return (
                <article
                  key={c.id}
                  className="card group w-[78vw] shrink-0 snap-start p-5 sm:w-[46vw] lg:w-[calc(25%-18px)]"
                >
                  <div className="relative h-44 overflow-hidden rounded-2xl">
                    <Image
                      src={c.photo}
                      alt={c.name}
                      fill
                      sizes="(min-width:1024px) 25vw, 78vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-kesar px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-milk">
                      {off}% OFF
                    </span>
                  </div>
                  <h3 className="display mt-4 text-lg text-ink">{c.name}</h3>
                  <p className="mt-1 font-mono text-[10px] text-muted">
                    <span className="text-kesar">★</span> {c.rating} · {c.items}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2 font-mono">
                    <span className="text-base text-ink">{inr(c.price)}</span>
                    <span className="text-xs text-muted line-through">{inr(c.mrp)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      add(c.id);
                      toast(`${c.name} added to basket`);
                      openDrawer();
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 font-mono text-xs uppercase tracking-[0.15em] text-bone transition-colors hover:bg-kesar hover:text-ink"
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                    Add to Cart
                  </button>
                </article>
              );
            })}
          </div>
        </SilkReveal>
      </div>
    </section>
  );
}
