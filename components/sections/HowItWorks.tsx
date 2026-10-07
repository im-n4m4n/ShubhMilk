"use client";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/businessConfig";

/**
 * HowItWorks — start / pause / extra milk / monthly bill, each with its own
 * prefilled WhatsApp action. Renders the previously-orphaned
 * `translations.subscription` block (pause, extra milk, bill, how-to-start).
 */
export default function HowItWorks() {
  const { t } = useLang();

  const cards = [
    {
      title: t.subscription.pauseTitle,
      desc: t.subscription.pauseDesc,
      cta: t.subscription.pauseCta,
      href: waLink("Hi Shubh Milk! Please pause my delivery from ____ to ____."),
    },
    {
      title: t.subscription.extraTitle,
      desc: t.subscription.extraDesc,
      cta: t.subscription.extraCta,
      href: waLink("Hi Shubh Milk! Tomorrow I need extra milk: ____ litres."),
    },
    {
      title: t.subscription.billTitle,
      desc: t.subscription.billDesc,
      cta: t.subscription.billCta,
      href: waLink("Hi Shubh Milk! Please send this month's bill."),
    },
  ];

  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-kesar">{t.subscription.title}</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            {t.subscription.subtitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cards.map((c) => (
            <article key={c.title} className="card flex flex-col p-8">
              <h3 className="display text-lg text-ink">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-[1.7] text-muted">{c.desc}</p>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-ink/20 px-5 text-sm font-medium text-ink transition-colors hover:bg-milk"
              >
                {c.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="card mt-6 p-8">
          <h3 className="display text-lg text-ink">{t.subscription.howTitle}</h3>
          <ol className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-3">
            <li className="flex gap-3"><span className="font-mono text-kesar">1.</span>{t.subscription.howStep1}</li>
            <li className="flex gap-3"><span className="font-mono text-kesar">2.</span>{t.subscription.howStep2}</li>
            <li className="flex gap-3"><span className="font-mono text-kesar">3.</span>{t.subscription.howStep3}</li>
          </ol>
          <p className="mt-4 font-mono text-[11px] text-muted">{t.subscription.autopayTitle}: {t.subscription.autopayDesc}</p>
        </div>
      </div>
    </section>
  );
}
