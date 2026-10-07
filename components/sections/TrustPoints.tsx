"use client";

import { BadgeCheck, CircleDot, GlassWater, Home } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * TrustPoints — own dairy / FSSAI / glass / no adulteration.
 * Renders the previously-orphaned `translations.trust` block.
 */
export default function TrustPoints() {
  const { t } = useLang();

  const points = [
    { Icon: Home, title: t.trust.point1Title, desc: t.trust.point1Desc },
    { Icon: BadgeCheck, title: t.trust.point2Title, desc: t.trust.point2Desc },
    { Icon: GlassWater, title: t.trust.point3Title, desc: t.trust.point3Desc },
    { Icon: CircleDot, title: t.trust.point4Title, desc: t.trust.point4Desc },
  ];

  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="overline text-kesar">{t.trust.title}</p>
          <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            {t.trust.subtitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ Icon, title, desc }) => (
            <article key={title} className="card p-8">
              <Icon className="h-6 w-6 text-kesar" strokeWidth={1.5} aria-hidden />
              <h3 className="display mt-4 text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-muted">{desc}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] text-muted">{t.trust.photoNote}</p>
      </div>
    </section>
  );
}
