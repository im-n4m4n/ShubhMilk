import { User } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import SilkReveal from "@/components/motion/SilkReveal";

const testimonials = [
  {
    quote:
      "The bottle lands before the newspaper does. Chai has never tasted this honest — my mother asked which farm we had stolen it from.",
    name: "Meera Krishnan",
    area: "Indiranagar, Bengaluru",
    since: "SUBSCRIBER SINCE 2021",
  },
  {
    quote:
      "We moved the whole family to the 1L plan. Curd sets overnight in the jar, and the ghee smells exactly like my grandmother's kitchen.",
    name: "Arjun & Divya Rao",
    area: "Jayanagar, Bengaluru",
    since: "SUBSCRIBER SINCE 2022",
  },
  {
    quote:
      "Pause it when we travel, resume when we're back. Empty bottles go out with the morning delivery like clockwork. Easiest good habit we own.",
    name: "Farah Siddiqui",
    area: "Koramangala, Bengaluru",
    since: "SUBSCRIBER SINCE 2023",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <SectionHeading
          overline="FROM THE NEIGHBOURHOOD"
          title="12,000 homes, one morning ritual"
        />

        <SilkReveal className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={t.name} data-silk className={`card p-8 ${i === 1 ? "lg:translate-y-8" : ""}`}>
              <span
                aria-hidden
                className="display block text-6xl leading-none text-kesar opacity-[0.12]"
              >
                “
              </span>
              <blockquote className="mt-4 font-display text-lg italic leading-[1.6] text-ink/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-buttermilk">
                  <User className="h-4 w-4 text-muted" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{t.name}</span>
                  <span className="block text-xs text-muted">{t.area}</span>
                  <span className="mt-1 block font-mono text-[10px] text-peacock">{t.since}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </SilkReveal>

        <div className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-buttermilk ${
                  i > 0 ? "-ml-2" : ""
                }`}
              >
                <User className="h-4 w-4 text-muted" strokeWidth={1.5} />
              </span>
            ))}
          </div>
          <p className="font-mono text-xs text-muted">4.8/5 · 3,200+ verified reviews</p>
        </div>
      </div>
    </section>
  );
}
