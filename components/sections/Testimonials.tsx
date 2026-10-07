import testimonialData from "@/content/testimonials.json";
import { User } from "lucide-react";
import { claims } from "@/lib/businessConfig";

/**
 * Real customers' own words only — edited in the admin panel
 * (content/testimonials.json). Until real Varanasi customers agree, in
 * writing, to be quoted, the entries carry [PLACEHOLDER] tokens on purpose.
 * Publishing fabricated reviews is misleading and can cost you the Google
 * listing (see TODO.md).
 */

export default function Testimonials() {
  const testimonials = testimonialData.testimonials;

  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-kesar">FROM THE NEIGHBOURHOOD</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            One morning ritual, across Varanasi
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={t.name} className={`card p-8 ${i === 1 ? "lg:translate-y-8" : ""}`}>
              <span
                aria-hidden
                className="display block text-6xl leading-none text-kesar opacity-[0.12]"
              >
                &ldquo;
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
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

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
          <p className="font-mono text-xs text-muted">
            {claims.rating}/5 · {claims.reviewCount} verified reviews
          </p>
        </div>
      </div>
    </section>
  );
}
