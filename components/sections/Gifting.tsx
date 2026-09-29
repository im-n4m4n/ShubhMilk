import { Gift } from "lucide-react";
import Image from "next/image";
import { PrimaryButton, SectionHeading } from "@/components/ui";
import Madhubani from "@/components/patterns/Madhubani";
import PatternLayer from "@/components/patterns/PatternLayer";
import SilkReveal from "@/components/motion/SilkReveal";

const boxes = [
  { name: "Ghee Trio", price: "₹1,499" },
  { name: "Mithai & Milk", price: "₹1,899" },
  { name: "The Shubh Hamper", price: "₹2,999" },
];

export default function Gifting() {
  return (
    <section className="bg-buttermilk py-32 lg:py-48">
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <SilkReveal>
        <div className="card relative overflow-hidden p-10 lg:p-16">
          <PatternLayer opacity={0.07}>
            <Madhubani className="h-full w-full" />
          </PatternLayer>
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                overline="FESTIVE GIFTING"
                title="Gift the auspicious."
                italicWord="auspicious"
                lede="Diwali, Raksha Bandhan, weddings — our ghee and glass-bottled milk travel in hand-tied hampers."
              />
              <div className="mt-8 flex flex-col items-start gap-4">
                <PrimaryButton>Build a Hamper</PrimaryButton>
                <span className="cursor-pointer text-sm text-peacock underline underline-offset-4">
                  Corporate &amp; bulk gifting
                </span>
              </div>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-3">
              <div className="relative col-span-full mb-2 h-44 overflow-hidden rounded-3xl sm:col-span-3 sm:h-52">
                <Image
                  src="/images/gifting-hamper.jpeg"
                  alt="A Shubh festive hamper: ghee jar, glass bottles and a brass diya"
                  fill
                  sizes="(min-width:640px) 100%, 100vw"
                  className="object-cover"
                />
              </div>
              {boxes.map((b, i) => (
                <div
                  key={b.name}
                  data-silk
                  className="card p-6 transition-colors duration-200 hover:border-ink"
                >
                  <Gift className="h-8 w-8 text-kesar" strokeWidth={1.5} aria-hidden />
                  <p className="display mt-4 text-lg text-ink">{b.name}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{b.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </SilkReveal>
      </div>
    </section>
  );
}
