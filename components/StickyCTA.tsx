"use client";

import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { waLink, telLink } from "@/lib/businessConfig";

/**
 * StickyCTA — the always-visible order bar on mobile.
 *
 * The brief asks for WhatsApp **and** Call to be visible at all times, so this
 * is a full-width tile bar pinned to the bottom of the screen on small
 * viewports, plus a compact floating pair on desktop. It sits below the cart
 * drawer's z-index so the basket still opens over it.
 *
 * All three targets come from lib/businessConfig.ts — no numbers here.
 */
export default function StickyCTA() {
  const { t } = useLang();

  const order = waLink();
  const call = telLink();
  const trial = waLink("Hi Shubh Milk! I'd like to book the 2-day free trial please.");

  return (
    <>
      {/* ── Mobile: full-width bar, always visible ─────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bone pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="flex items-stretch gap-2 px-3 py-2.5">
          <a
            href={order}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sticky.ariaLabelWhatsApp}
            className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-medium text-bone"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
            {t.sticky.orderOnWhatsApp}
          </a>
          <a
            href={call}
            aria-label={t.sticky.ariaLabelCall}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-3 text-sm font-medium text-ink"
          >
            <Phone className="h-4 w-4" strokeWidth={1.6} />
            {t.sticky.callNow}
          </a>
          <a
            href={trial}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sticky.bookTrial}
            className="flex items-center justify-center rounded-full bg-kesar px-3.5 py-3 text-[#1A1410]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.6} />
          </a>
        </div>
      </div>

      {/* ── Desktop: floating pair, bottom-right ───────────────────────────── */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
        <a
          href={call}
          aria-label={t.sticky.ariaLabelCall}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-bone text-ink shadow-md transition-transform duration-300 hover:scale-[1.04]"
        >
          <Phone className="h-5 w-5" strokeWidth={1.5} />
        </a>
        <a
          href={order}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.sticky.ariaLabelWhatsApp}
          className="group pointer-events-auto flex h-12 items-center rounded-full bg-ink px-4 text-bone shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:pl-2 group-hover:opacity-100">
            {t.sticky.orderOnWhatsApp}
          </span>
        </a>
      </div>

      {/* keep the last page content clear of the mobile bar */}
      <div aria-hidden className="h-[68px] lg:hidden" />
    </>
  );
}
