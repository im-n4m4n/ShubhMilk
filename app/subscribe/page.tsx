import Image from "next/image";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import SubscriptionBuilder from "@/components/sections/SubscriptionBuilder";
import Faq from "@/components/sections/Faq";
import { Overline } from "@/components/ui";
import MaskedLines from "@/components/motion/MaskedLines";

export default function Subscribe() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="bg-bone py-12 lg:py-16">
          <div className="mx-auto max-w-site px-6 lg:px-12">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative h-[48vh] min-h-[360px] w-full">
                <Image
                  src="/images/dawn-delivery.jpeg"
                  alt="Glass bottles loaded into a delivery crate at dawn"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />
                <div className="absolute inset-0 flex items-end p-8 lg:p-14">
                  <div>
                    <Overline>BUILD YOUR RHYTHM</Overline>
                    <MaskedLines
                      className="display mt-4 text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] text-[#FDFBF7]"
                      lines={[
                        <span key="1">
                          Milk at your door,{" "}
                          <em className="font-light">every</em>
                        </span>,
                        <span key="2">single morning.</span>,
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <SubscriptionBuilder />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
