import { FlaskConical, MapPin, Milk, Sunrise } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import Buti from "@/components/patterns/Buti";
import PatternLayer from "@/components/patterns/PatternLayer";
import FlipIn from "@/components/motion/FlipIn";

const promises = [
  {
    Icon: Sunrise,
    tag: "5:30 AM SLOT",
    title: "Before Sunrise",
    copy: "Milk leaves the farm at 4:30 and reaches your door before the city wakes.",
  },
  {
    Icon: Milk,
    tag: "RETURNABLE",
    title: "Glass, Not Plastic",
    copy: "Chilled glass bottles that go back, get washed, and come again.",
  },
  {
    Icon: FlaskConical,
    tag: "EVERY BATCH",
    title: "Lab Tested Daily",
    copy: "Every morning's milk is tested before it ever reaches a bottle.",
  },
  {
    Icon: MapPin,
    tag: "OPEN INVITE",
    title: "Farms You Can Visit",
    copy: "Two hours out of the city. Come see exactly where your milk comes from.",
  },
];

export default function Promise() {
  return (
    <section className="relative bg-bone">
      <PatternLayer opacity={0.06}>
        <Buti className="h-full w-full" />
      </PatternLayer>
      <div className="relative mx-auto max-w-site px-6 py-24 lg:px-12">
        <SectionHeading overline="THE PROMISE" title="Why homes switch to Shubh" />
        <FlipIn className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4" stagger={0.1}>
          {promises.map(({ Icon, tag, title, copy }) => (
            <article key={tag} data-flip className="card p-8 will-change-transform">
              <Icon className="h-6 w-6 text-kesar" strokeWidth={1.5} />
              <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-muted">
                {tag}
              </p>
              <h3 className="display mt-2 text-2xl text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-[1.7] text-muted">{copy}</p>
            </article>
          ))}
        </FlipIn>
      </div>
    </section>
  );
}
