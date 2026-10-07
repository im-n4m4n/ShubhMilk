"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { useLang } from "@/lib/i18n";

/**
 * Faq — bilingual Q&A from translations.faq (q1..q8).
 * The earlier build hardcoded English questions here, one of which still said
 * "42 neighbourhoods across Bengaluru" — that invented text is gone; every
 * answer now reads from lib/translations.ts in the visitor's language.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLang();

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
    { q: t.faq.q7, a: t.faq.a7 },
    { q: t.faq.q8, a: t.faq.a8 },
  ];

  return (
    <section className="bg-buttermilk">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <SectionHeading overline="GOOD TO KNOW" title={t.faq.title} />

          <div className="mt-10">
            {faqs.map((item, i) => (
              <div key={item.q} className="border-b border-hairline">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[17px] font-medium text-ink">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                      open === i ? "rotate-45" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[15px] leading-[1.7] text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted">{t.faq.askMore}</p>
        </div>
      </div>
    </section>
  );
}
