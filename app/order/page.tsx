"use client";

/**
 * /order — the order form. On submit it opens WhatsApp with every detail
 * pre-filled, so the customer only has to press Send.
 *
 * Nothing here talks to a server: no backend, no database, no paid API — the
 * WhatsApp deep link IS the order channel, which is what the brief asked for.
 */

import { useState } from "react";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import StickyCTA from "@/components/StickyCTA";
import { Check, MessageCircle, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import {
  contact,
  delivery,
  payments,
  serviceAreas,
  telLink,
  waLink,
} from "@/lib/businessConfig";

type Frequency = "daily" | "alternate";

export default function OrderPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    area: "",
    address: "",
    milkType: "",
    quantity: "",
    frequency: "daily" as Frequency,
    startDate: "",
    payment: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  /** Build the WhatsApp message from the form, in the customer's language. */
  const buildMessage = (): string => {
    const L = t.order;
    const freq = form.frequency === "daily" ? L.freqDaily : L.freqAlternate;
    const lines = [
      `${L.title} — ${contact.whatsappDisplay}`,
      "",
      `${L.name}: ${form.name || "-"}`,
      `${L.mobile}: ${form.mobile || "-"}`,
      `${L.area}: ${form.area || "-"}`,
      `${L.address}: ${form.address || "-"}`,
      `${L.milkType}: ${form.milkType || "-"}`,
      `${L.quantity}: ${form.quantity || "-"}`,
      `${L.frequency}: ${freq}`,
      `${L.startDate}: ${form.startDate || "-"}`,
      `${L.paymentPref}: ${form.payment || "-"}`,
    ];
    if (form.notes.trim()) lines.push(`${L.notes} ${form.notes.trim()}`);
    return lines.join("\n");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open WhatsApp in a new tab; keep this page so the success note is visible.
    window.open(waLink(buildMessage()), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border border-hairline bg-milk px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink/40";
  const label = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted";

  return (
    <>
      <Nav />
      <main className="bg-bone">
        <div className="mx-auto max-w-site px-6 pb-24 pt-36 lg:px-12 lg:pt-44">
          <p className="overline text-kesar">{t.nav.order}</p>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.08]">
            {t.order.title}
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-muted">{t.order.subtitle}</p>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {/* ── form ─────────────────────────────────────────────────────── */}
            <form onSubmit={onSubmit} className="card p-6 sm:p-8 lg:col-span-2">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={label}>{t.order.name} *</span>
                  <input required value={form.name} onChange={set("name")} className={field} />
                </label>

                <label className="block">
                  <span className={label}>{t.order.mobile} *</span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9+ ]{10,15}"
                    value={form.mobile}
                    onChange={set("mobile")}
                    className={field}
                  />
                </label>

                <label className="block">
                  <span className={label}>{t.order.area} *</span>
                  <select required value={form.area} onChange={set("area")} className={field}>
                    <option value="">—</option>
                    {serviceAreas.map((a) => (
                      <option key={a.slug} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className={label}>{t.order.milkType} *</span>
                  <select required value={form.milkType} onChange={set("milkType")} className={field}>
                    <option value="">—</option>
                    <option value="cow">{t.products.cowMilk}</option>
                    <option value="buffalo">{t.products.buffaloMilk}</option>
                    <option value="a2">{t.products.a2Milk}</option>
                    <option value="dahi">{t.products.dahi}</option>
                    <option value="paneer">{t.products.paneer}</option>
                    <option value="ghee">{t.products.ghee}</option>
                  </select>
                </label>

                <label className="block">
                  <span className={label}>{t.order.quantity} *</span>
                  <input
                    required
                    inputMode="decimal"
                    value={form.quantity}
                    onChange={set("quantity")}
                    placeholder="1"
                    className={field}
                  />
                </label>

                <label className="block">
                  <span className={label}>{t.order.frequency}</span>
                  <select value={form.frequency} onChange={set("frequency")} className={field}>
                    <option value="daily">{t.order.freqDaily}</option>
                    <option value="alternate">{t.order.freqAlternate}</option>
                  </select>
                </label>

                <label className="block">
                  <span className={label}>{t.order.startDate}</span>
                  <input type="date" value={form.startDate} onChange={set("startDate")} className={field} />
                </label>

                <label className="block">
                  <span className={label}>{t.order.paymentPref}</span>
                  <select value={form.payment} onChange={set("payment")} className={field}>
                    <option value="">—</option>
                    <option value="upi">{t.order.paymentUpi}</option>
                    <option value="cash">{t.order.paymentCash}</option>
                    <option value="monthly">{t.order.paymentMonthly}</option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className={label}>{t.order.address} *</span>
                  <input required value={form.address} onChange={set("address")} className={field} />
                </label>

                <label className="block sm:col-span-2">
                  <span className={label}>{t.order.notes}</span>
                  <textarea rows={3} value={form.notes} onChange={set("notes")} className={field} />
                </label>
              </div>

              <button
                type="submit"
                className="mt-7 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-bone transition-transform hover:scale-[1.01] sm:w-auto sm:px-8"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                {t.order.submit}
              </button>

              {sent && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-5 flex items-start gap-2 rounded-xl border border-fresh/30 bg-fresh/5 p-4 text-sm text-ink"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-fresh" strokeWidth={2} />
                  <span>
                    {t.order.success}
                    <br />
                    <span className="text-muted">{t.order.whatsappOpening}</span>
                  </span>
                </p>
              )}
            </form>

            {/* ── sidebar: UPI + call ──────────────────────────────────────── */}
            <aside className="space-y-6">
              <div className="card p-6">
                <h2 className="display text-lg font-medium">{t.order.upiTitle}</h2>
                <p className="mt-2 break-words text-sm text-muted">{t.order.upiDesc}</p>

                {/* QR only if you have replaced the placeholder with your own image */}
                {!payments.upiQrImage.startsWith("[") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={payments.upiQrImage}
                    alt="UPI QR code for Shubh Milk"
                    width={220}
                    height={220}
                    className="mt-4 w-full max-w-[220px] rounded-xl border border-hairline"
                  />
                ) : (
                  <p className="mt-4 rounded-xl border border-dashed border-hairline p-4 font-mono text-xs text-muted">
                    {payments.upiQrImage}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted">{t.order.upiScanText}</p>
              </div>

              <div className="card p-6">
                <p className="text-sm text-muted">{t.order.orCall}</p>
                <a
                  href={telLink()}
                  className="mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-ink/20 text-sm font-medium text-ink"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                  {t.sticky.callNow}
                </a>
                <dl className="mt-5 space-y-2 text-xs text-muted">
                  <div className="flex justify-between gap-3">
                    <dt>{t.delivery.timeLabel}</dt>
                    <dd className="text-ink">{delivery.time}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>{t.delivery.minOrderLabel}</dt>
                    <dd className="text-ink">{delivery.minOrder}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
