"use client";

import { Gift, HeartHandshake, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * Offers — first order / referral / loyalty. Copy comes from
 * translations.payments + businessConfig.offers.
 * Renders the previously-orphaned `translations.payments` offer rows.
 */
export default function Offers() {
  const { t } = useLang();

  const cards = [
    { Icon: Sparkles, title: t.payments.firstOrderTitle, desc: t.payments.firstOrderDesc },
    { Icon: Gift, title: t.payments.referralTitle, desc: t.payments.referralDesc },
    { Icon: HeartHandshake, title: t.payments.loyaltyTitle, desc: t.payments.loyaltyDesc },
  ];

  return (
    <section className="bg-buttermilk">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-kesar">{t.payments.title}</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            {t.payments.subtitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {cards.map(({ Icon, title, desc }) => (
            <article key={title} className="card p-8">
              <Icon className="h-6 w-6 text-kesar" strokeWidth={1.5} aria-hidden />
              <h3 className="display mt-4 text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-muted">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <span className="font-mono text-[11px] text-muted">{t.payments.upi}</span>
          <span className="font-mono text-[11px] text-muted">{t.payments.cash}</span>
          <span className="font-mono text-[11px] text-muted">{t.payments.monthly}</span>
        </div>
      </div>
    </section>
  );
}
