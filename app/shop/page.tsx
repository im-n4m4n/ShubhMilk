import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Bestsellers from "@/components/sections/Bestsellers";
import { Overline, SectionHeading, GhostButton } from "@/components/ui";
import { categories } from "@/lib/products";
import MaskedLines from "@/components/motion/MaskedLines";

export default function Shop() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="bg-bone py-12 lg:py-16">
          <div className="mx-auto max-w-site px-6 lg:px-12">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative h-[52vh] min-h-[380px] w-full">
                <Image
                  src="/images/bottle-still.jpeg"
                  alt="A glass bottle of A2 milk on a teak table in morning light"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />
                <div className="absolute inset-0 flex items-end p-8 lg:p-14">
                  <div>
                    <Overline>THE FULL SHELF</Overline>
                    <MaskedLines
                      className="display mt-4 text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] text-[#FDFBF7]"
                      lines={[
                        <span key="1">
                          Shop the <em className="font-light">morning</em>
                        </span>,
                      ]}
                    />
                    <p className="mt-4 max-w-md text-[16px] leading-[1.7] text-[#EDE6DA]">
                      Everything is made the day it is delivered. Glass bottles only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bone pb-32 lg:pb-48">
          <div className="mx-auto max-w-site px-6 lg:px-12">
            <div className="grid gap-10">
              {categories.map((c) => (
                <div key={c.key} className="border-t border-hairline pt-10">
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <h2 className="display text-3xl text-ink">{c.label}</h2>
                      <p className="mt-2 text-sm text-muted">{c.blurb}</p>
                    </div>
                    <Link href="/subscribe" className="font-mono text-xs text-kesar">
                      SUBSCRIBE & SAVE 12% →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <SectionHeading
                overline="MOST LOVED"
                title="The Daily Essentials"
              />
            </div>
          </div>
        </section>

        <Bestsellers />
      </main>
      <Footer />
    </>
  );
}
