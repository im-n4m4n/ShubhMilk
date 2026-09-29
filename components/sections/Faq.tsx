"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui";

const faqs = [
  {
    q: "What makes A2 milk different from regular milk?",
    a: "Most packaged milk blends crossbred cow milk carrying the A1 beta-casein protein. Ours comes only from indigenous Gir and Sahiwal herds on a single farm, so it is naturally A2-only. Many people find it easier to digest — and every batch is lab-tested, so you can read the report before the milk reaches your doorstep.",
  },
  {
    q: "How do I choose my delivery slot?",
    a: "Two slots run every morning: AM (5:30–7:30) for chai-time delivery and PM (7:00–9:00) for the evening. Pick a slot when you start a subscription and change it any day until 10 pm the night before — the change applies from the very next delivery.",
  },
  {
    q: "How does the glass bottle deposit work?",
    a: "We charge a fully refundable deposit of ₹25 per bottle at checkout. Leave the rinsed bottle at your door on any delivery day and we collect it and swap in a clean one. The deposit is credited straight back to your account whenever you end your subscription.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Yes — pause for a weekend or a whole month from Manage Subscription, no questions asked. Mark the days by 10 pm the previous night and you are not charged a rupee for the skipped deliveries. Fasting months, travel, house guests: it all works.",
  },
  {
    q: "What is the shelf life of your bilona ghee?",
    a: "Nine months from the date of churning, stored at room temperature away from direct sunlight. No refrigeration needed — hand-churned bilona ghee only improves as it rests. The churning date is printed on every jar.",
  },
  {
    q: "Can I see the daily test reports?",
    a: "Every morning batch is tested for MBRT, antibiotics and adulterants before it leaves the farm. Reports are published by 7 am on the Daily Reports page and linked in your delivery notification, batch number by batch number.",
  },
  {
    q: "Which areas do you cover?",
    a: "We currently deliver to 42 neighbourhoods across Bengaluru — Indiranagar, Koramangala, Jayanagar, HSR Layout, Whitefield and more. Enter your pincode on the homepage to confirm same-morning coverage in your lane.",
  },
  {
    q: "How do I return my bottles?",
    a: "Rinse them and leave them at the doorstep on any delivery day — we collect on the spot. Each returned bottle credits ₹25 back to your account within 24 hours. Forgot to rinse? We still take them; they just rejoin the washing line a day later.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-buttermilk">
      <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <SectionHeading overline="GOOD TO KNOW" title="Questions, answered" />

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
        </div>
      </div>
    </section>
  );
}
