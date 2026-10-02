"use client";

import { MessageCircle } from "lucide-react";
import { contact, waLink } from "@/lib/businessConfig";

/**
 * FloatingWhatsApp — wa.me deep link with a prefilled order message.
 * The number lives in lib/businessConfig.ts (contact.whatsapp); the old
 * hard-coded demo fallback has been removed on purpose, so an unfilled
 * placeholder is visible instead of silently sending orders nowhere.
 */
const LINK = waLink();

export default function FloatingWhatsApp() {
  return (
    <a
      href={LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Order on WhatsApp ${contact.whatsappDisplay} (opens in a new tab)`}
      className="group fixed bottom-6 right-6 z-40 flex h-14 items-center rounded-full bg-ink px-4 text-bone shadow-lg transition-transform duration-300 hover:scale-[1.02]"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[11rem] group-hover:pl-2 group-hover:opacity-100">
        Order on WhatsApp
      </span>
    </a>
  );
}
