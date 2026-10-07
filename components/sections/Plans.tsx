"use client";

import { plans } from "@/lib/businessConfig";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/businessConfig";

/**
 * Plans — the monthly plan cards (trial / weekly / monthly / family / B2B).
 * Prices come straight from businessConfig.plans; copy from translations.plans.
 * Renders the previously-orphaned `translations.plans` block.
 */
export default function Plans() {
  const { t } = useLang();

  const nameFor: Record<string, string> = {
    trial: t.plans.trialName,
    weekly: t.plans.weeklyName,
    monthly: t.plans.monthlyName,
    family: t.plans.familyName,
    b2b: t.plans.b2bName,
  };
  const descFor: Record<string, string> = {
    trial: t.plans.trialDesc,
    weekly: t.plans.weeklyDesc,
    monthly: t.plans.monthlyDesc,
    family: t.plans.familyDesc,
    b2b: t.plans.b2bDesc,
  };

  return (
    <section className="bg-buttermilk">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-kesar">{t.plans.title}</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            {t.plans.subtitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.key} className="card flex flex-col p-8">
              <h3 className="display text-xl text-ink">{nameFor[plan.key]}</h3>
              <p className="mt-2 flex-1 text-sm leading-[1.7] text-muted">{descFor[plan.key]}</p>
              <p className="mt-6 font-mono text-sm text-ink">{plan.priceLabel}</p>
              <p className="mt-1 font-mono text-[11px] text-muted">{plan.volume}</p>
              <a
                href={waLink(
                  plan.key === "trial"
                    ? "Hi Shubh Milk! I'd like to book the 2-day free trial please."
                    : `Hi Shubh Milk! I'd like to start the ${nameFor[plan.key]} plan.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:bg-milk"
              >
                {plan.key === "trial" ? t.plans.ctaTrial : t.plans.ctaStart}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
