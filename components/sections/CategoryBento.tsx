import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui";
import { categories } from "@/lib/products";
import SilkReveal from "@/components/motion/SilkReveal";
import KenBurns from "@/components/motion/KenBurns";

export default function CategoryBento() {
  return (
    <section className="bg-buttermilk">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <SilkReveal>
          <div data-silk>
            <SectionHeading
              overline="SHOP BY CATEGORY"
              title="From our farms, to your kitchen"
            />
          </div>
        </SilkReveal>
        <SilkReveal className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const isFirst = i === 0;
            return (
              <Link
                key={c.key}
                href="/shop"
                data-silk
                className={`card group block overflow-hidden ${isFirst ? "lg:row-span-2" : ""}`}
              >
                <div className={`relative ${isFirst ? "h-[560px]" : "h-[240px]"}`}>
                  <KenBurns className="absolute inset-0">
                    <Image
                      src={c.photo}
                      alt={c.label}
                      fill
                      sizes={isFirst ? "(min-width:1024px) 33vw, 100vw" : "(min-width:1024px) 33vw, 50vw"}
                      className="object-cover"
                    />
                  </KenBurns>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
                  />
                  <h3 className="display absolute bottom-5 left-5 text-2xl text-milk">{c.label}</h3>
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <p className="text-sm leading-[1.6] text-muted">{c.blurb}</p>
                  <span
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-300 group-hover:bg-ink group-hover:text-bone ${
                      isFirst ? "border-kesar text-ink" : "border-ink/20 text-ink"
                    }`}
                  >
                    Explore
                  </span>
                </div>
              </Link>
            );
          })}
        </SilkReveal>
      </div>
    </section>
  );
}
