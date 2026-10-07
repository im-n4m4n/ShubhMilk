"use client";

import { rateKeys, rates, rateUnits } from "@/lib/businessConfig";
import { useLang } from "@/lib/i18n";

/**
 * RateList — the honest rate table: one row per product from businessConfig,
 * per-litre / per-kg unit beside each rate.
 * Renders the previously-orphaned `translations.pricing` block.
 */
export default function RateList() {
  const { t } = useLang();

  const unitFor = (key: (typeof rateKeys)[number]) =>
    rateUnits[key] === "/ kg" ? t.pricing.perKg : t.pricing.perLitre;

  const labelFor = (key: (typeof rateKeys)[number]) => {
    const map: Record<string, string> = {
      cow: t.pricing.cow,
      buffalo: t.pricing.buffalo,
      a2: t.pricing.a2,
      dahi: t.pricing.dahi,
      paneer: t.pricing.paneer,
      ghee: t.pricing.ghee,
    };
    return map[key];
  };

  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-kesar">{t.pricing.title}</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            {t.pricing.subtitle}
          </h2>
        </div>

        <div className="card mt-12 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {rateKeys.map((key, i) => (
                <tr key={key} className={i % 2 === 0 ? "bg-milk/50" : ""}>
                  <td className="px-6 py-4 text-ink">{labelFor(key)}</td>
                  <td className="px-6 py-4 text-right font-mono text-muted">{rates[key]}</td>
                  <td className="px-6 py-4 text-right font-mono text-[11px] text-muted">
                    {unitFor(key)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-mono text-[11px] text-muted">{t.pricing.note}</p>
      </div>
    </section>
  );
}
