"use client";

import { compliance, contact } from "@/lib/businessConfig";
import { useLang } from "@/lib/i18n";

/**
 * TrustBar — the mono trust strip under the hero: no adulteration, hygienic
 * packing, before-7 delivery, returnable glass, FSSAI number.
 * Renders the previously-orphaned `translations.trustBar` block.
 */
export default function TrustBar() {
  const { t } = useLang();

  const items = [
    t.trustBar.noAdulteration,
    t.trustBar.hygienicPacking,
    t.trustBar.before7,
    t.trustBar.glassBottle,
    t.trustBar.labelledNumber,
  ];

  return (
    <section className="border-b border-hairline bg-buttermilk">
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-3 lg:px-12">
        {items.map((item) => (
          <span key={item} className="font-mono text-[11px] tracking-[0.18em] text-muted">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
