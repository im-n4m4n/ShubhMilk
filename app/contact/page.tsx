"use client";

/**
 * /contact — delivery areas, timings and the direct order channels.
 * Every number, area and timing on this page is read from
 * lib/businessConfig.ts. Unfilled placeholders are shown as-is on purpose, so
 * you can see at a glance what is still missing before going live.
 */

import { MessageCircle, Phone, MapPin, Clock, BadgeCheck, Send } from "lucide-react";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import StickyCTA from "@/components/StickyCTA";
import { useLang } from "@/lib/i18n";
import { compliance, contact, delivery, location, serviceAreas, telLink, waLink } from "@/lib/businessConfig";

export default function ContactPage() {
  const { t } = useLang();

  return (
    <>
      <Nav />
      <main className="bg-bone">
        <div className="mx-auto max-w-site px-6 pb-24 pt-36 lg:px-12 lg:pt-44">
          <p className="overline text-kesar">{t.nav.contact}</p>
          <h1 className="display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08]">
            {t.delivery.title}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted">{t.delivery.subtitle}</p>

          {/* direct channels */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bone transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
              {t.sticky.orderOnWhatsApp}
            </a>
            <a
              href={telLink()}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-milk"
            >
              <Phone className="h-4 w-4" strokeWidth={1.6} />
              {t.sticky.callNow} · {contact.phoneDisplay}
            </a>
          </div>

          {/* key facts */}
          <dl className="card mt-12 grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-4">
            <Fact icon={<Clock className="h-4 w-4" strokeWidth={1.6} />} label={t.delivery.timeLabel} value={delivery.time} />
            <Fact icon={<Send className="h-4 w-4" strokeWidth={1.6} />} label={t.delivery.minOrderLabel} value={delivery.minOrder} />
            <Fact icon={<Clock className="h-4 w-4" strokeWidth={1.6} />} label={t.delivery.cutoffLabel} value={delivery.orderCutoff} />
            <Fact icon={<BadgeCheck className="h-4 w-4" strokeWidth={1.6} />} label={t.footer.fssaiLabel} value={compliance.fssai} />
          </dl>

          {/* address */}
          <div className="card mt-6 flex items-start gap-4 p-8">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" strokeWidth={1.6} />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                {location.city}, {location.state}
              </p>
              <p className="mt-2 text-sm text-ink">{location.address}</p>
            </div>
          </div>

          {/* areas */}
          <h2 className="display mt-20 text-2xl font-medium">{t.delivery.areasLabel}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((area) => (
              <li key={area.slug} className="flex items-center gap-2 border-b border-hairline pb-2 text-sm text-ink/90">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-fresh" />
                {area.name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">{t.delivery.notListed}</p>
          <a
            href={waLink("Hi Shubh Milk! Do you deliver to my area? My pincode is ")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-mono text-xs text-peacock underline underline-offset-4"
          >
            {t.delivery.checkCta}
          </a>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {icon}
        {label}
      </dt>
      <dd className="display mt-2 text-lg text-ink">{value}</dd>
    </div>
  );
}
