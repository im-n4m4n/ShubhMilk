"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { inr, products } from "@/lib/products";
import { displayPrice, useCart } from "@/lib/store";
import Buti from "@/components/patterns/Buti";
import PatternLayer from "@/components/patterns/PatternLayer";
import SilkReveal from "@/components/motion/SilkReveal";
import FlipIn from "@/components/motion/FlipIn";
import { toast } from "@/components/motion/toast";

const offPct = (price: number, mrp: number) => Math.round((1 - price / mrp) * 100);

export default function Bestsellers() {
  const subPrices = useCart((s) => s.subPrices);
  const toggleSubPrices = useCart((s) => s.toggleSubPrices);
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);

  // Badge-tagged products first, topped up to 8 from the rest, deduped.
  const tagged = products.filter((p) => p.badge !== null);
  const rest = products.filter((p) => p.badge === null);
  const seen = new Set<string>();
  const featured = [...tagged, ...rest]
    .filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .slice(0, 8);

  return (
    <section className="relative bg-buttermilk">
      <PatternLayer opacity={0.05}>
        <Buti className="h-full w-full" />
      </PatternLayer>
      <div className="relative mx-auto max-w-site px-6 py-24 lg:px-12">
        <SilkReveal>
          <div data-silk className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading overline="MOST LOVED" title="The Daily Essentials" />
          <div className="shrink-0">
            <button
              type="button"
              onClick={toggleSubPrices}
              aria-pressed={subPrices}
              className="flex items-center gap-3 rounded-full border border-hairline bg-milk px-5 py-2.5"
            >
              <span className="font-mono text-xs text-ink">Subscribe &amp; Save 12%</span>
              <span
                aria-hidden
                className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-200 ${
                  subPrices ? "bg-kesar" : "bg-motif"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full bg-milk shadow-sm transition-transform duration-200 ${
                    subPrices ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </span>
            </button>
            <p className="mt-2 font-mono text-[11px] text-muted">
              Prices switch site-wide. Cancel anytime.
            </p>
          </div>
          </div>
        </SilkReveal>

        {/* Product grid — FlipIn stagger per DRIFT spec */}
        <FlipIn className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4" stagger={0.07}>
          {featured.map((p) => (
            <article key={p.id} data-flip className="card group relative overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                {/* pack shot */}
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                />
                {/* hover swap: today's lab report (transparency as interaction, per Anveshan) */}
                <Image
                  src="/images/lab-report.jpeg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/85 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-bone opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  TODAY'S LAB REPORT
                </span>
                {p.badge === "bestseller" ? (
                  <span className="absolute left-4 top-4 rounded-full bg-kesar px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-milk">
                    BESTSELLER
                  </span>
                ) : p.badge === "fresh-today" ? (
                  <span className="absolute left-4 top-4 rounded-full border border-fresh/40 bg-milk px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-fresh">
                    FRESH TODAY
                  </span>
                ) : null}
              </div>

              <div className="p-5">
                <h3 className="display text-lg text-ink">{p.name}</h3>
                <p className="mt-1 font-mono text-[11px] text-muted">{p.spec}</p>
                {/* benefit one-liner + rating (per Two Brothers card pattern) */}
                <p className="mt-2 line-clamp-1 text-xs leading-[1.6] text-muted">{p.blurb}</p>
                <p className="mt-1.5 font-mono text-[10px] text-ink">
                  <span className="text-kesar">★</span> 4.9
                  <span className="text-muted"> · 2k+ reviews</span>
                </p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="font-mono leading-tight">
                    <span className="text-sm text-ink">{inr(displayPrice(p, subPrices))}</span>{" "}
                    <span className="text-xs text-muted line-through">{inr(p.mrp)}</span>{" "}
                    <span className="text-[11px] text-kesar">{offPct(p.price, p.mrp)}% OFF</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Add ${p.name} to cart`}
                    onClick={() => {
                      add(p.id);
                      toast(`${p.name} added to basket`);
                      openDrawer();
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink transition-colors duration-200 hover:bg-ink hover:text-bone"
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Slide-up bar on card hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink py-3 text-center font-mono text-xs text-bone transition-transform duration-300 group-hover:translate-y-0"
              >
                Add to Cart
              </div>
            </article>
          ))}
        </FlipIn>
      </div>
    </section>
  );
}
