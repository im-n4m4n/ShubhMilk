import Image from "next/image";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Promise from "@/components/sections/Promise";
import BilonaGhee from "@/components/sections/BilonaGhee";
import { Overline } from "@/components/ui";
import MaskedLines from "@/components/motion/MaskedLines";

export default function Farms() {
  return (
    <>
      <Nav />
      <main className="pt-40">
        <section className="bg-bone py-20 lg:py-28">
          <div className="mx-auto max-w-site px-6 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Overline>OUR FARMS</Overline>
                <MaskedLines
                  className="display mt-4 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.05] text-ink"
                  lines={[
                    <span key="1">Two hours from the city.</span>,
                    <span key="2">
                      <em className="font-light">A lifetime</em> from a factory.
                    </span>,
                  ]}
                />
                <p className="mt-6 max-w-lg text-[17px] leading-[1.7] text-muted">
                  Small Gir-cow herds, pasture mornings, and a chilling plant that
                  starts work while the milk is still warm. You are welcome any day
                  of the week — call ahead and we&apos;ll keep chai ready.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: "var(--hairline)" }}>
                  <Image
                    src="/images/gir-herd.jpeg"
                    alt="A Gir cow herd grazing at golden hour on the Shubh farm"
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Promise />
        <BilonaGhee />
      </main>
      <Footer />
    </>
  );
}
