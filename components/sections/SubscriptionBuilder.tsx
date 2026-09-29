"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { Overline, PrimaryButton, SectionHeading } from "@/components/ui";
import { products, inr } from "@/lib/products";
import { useCart } from "@/lib/store";
import { frequencies, slots, isServiceable, monthlyTotal } from "@/lib/subscriptions";
import Kolam from "@/components/patterns/Kolam";

const pincodeSchema = z.object({
  pincode: z.string().regex(/^\d{6}$/, "Enter a 6-digit pincode"),
});
type PincodeForm = z.infer<typeof pincodeSchema>;

export default function SubscriptionBuilder() {
  const subPincode = useCart((s) => s.subPincode);
  const subFrequency = useCart((s) => s.subFrequency);
  const subSlot = useCart((s) => s.subSlot);
  const setSubDraft = useCart((s) => s.setSubDraft);

  const [serviceable, setServiceable] = useState<boolean | null>(null);
  const [step2, setStep2] = useState<Record<string, number>>({ [products[0].id]: 1 });

  const { register, handleSubmit, formState } = useForm<PincodeForm>({
    resolver: zodResolver(pincodeSchema) as unknown as Resolver<PincodeForm>,
    defaultValues: { pincode: subPincode },
  });

  const onPincode = (data: PincodeForm) => {
    const ok = isServiceable(data.pincode);
    setServiceable(ok);
    setSubDraft({ subPincode: data.pincode });
  };

  const bump = (id: string, delta: number) =>
    setStep2((s) => {
      const next = { ...s, [id]: Math.max(0, (s[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });

  const chosen = products.filter((p) => step2[p.id] > 0);
  const perMonth = frequencies.find((f) => f.key === subFrequency)?.perMonth ?? 0;
  const monthly = monthlyTotal(
    chosen.map((p) => ({ productId: p.id, qty: step2[p.id] })),
    subFrequency,
    (id) => products.find((x) => x.id === id),
  );
  const oneTimeMonthly = chosen.reduce(
    (acc, p) => acc + p.price * step2[p.id] * perMonth,
    0,
  );
  const savings = oneTimeMonthly - monthly;

  return (
    <section id="subscribe" className="bg-bone py-32 lg:py-48">
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <SectionHeading
          overline="BUILD YOUR RHYTHM"
          title="Milk on your schedule"
          italicWord="schedule"
          lede="Four quiet steps. Pause or cancel anytime. No lock-in. First delivery free."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Steps */}
          <div className="lg:col-span-7">
            {/* Step 1 — pincode */}
            <StepBlock n="01" label="CHECK YOUR PINCODE">
              <form onSubmit={handleSubmit(onPincode)} className="flex flex-wrap items-center gap-4">
                <input
                  {...register("pincode")}
                  inputMode="numeric"
                  placeholder="560038"
                  className="w-48 rounded-full border border-hairline bg-milk px-6 py-3.5 font-mono text-sm text-ink outline-none focus:border-ink"
                />
                <button
                  type="submit"
                  className="rounded-full border border-ink bg-transparent px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bone"
                >
                  Check
                </button>
              </form>
              {formState.errors.pincode ? (
                <p className="mt-3 font-mono text-xs text-kesar">{formState.errors.pincode.message}</p>
              ) : null}
              {serviceable === true ? (
                <p className="mt-3 font-mono text-xs text-fresh">✓ Served · AM slot available tomorrow</p>
              ) : null}
              {serviceable === false ? (
                <p className="mt-3 font-mono text-xs text-kesar">
                  We don&apos;t reach this pincode yet — join the waitlist
                </p>
              ) : null}
            </StepBlock>

            <StepConnector />

            {/* Step 2 — products */}
            <StepBlock n="02" label="PICK YOUR PRODUCTS">
              <div className="space-y-3">
                {products.slice(0, 6).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-milk px-5 py-4"
                  >
                    <div>
                      <p className="display text-base text-ink">{p.name}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted">
                        {p.spec} · {inr(p.subscriptionPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Remove one ${p.name}`}
                        onClick={() => bump(p.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-ink"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                      <span className="w-6 text-center font-mono text-sm">{step2[p.id] ?? 0}</span>
                      <button
                        type="button"
                        aria-label={`Add one ${p.name}`}
                        onClick={() => bump(p.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-ink"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </StepBlock>

            <StepConnector />

            {/* Step 3 — frequency + slot */}
            <StepBlock n="03" label="CHOOSE FREQUENCY & SLOT">
              <div className="grid gap-3 sm:grid-cols-2">
                {frequencies.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setSubDraft({ subFrequency: f.key })}
                    className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                      subFrequency === f.key
                        ? "border-ink bg-milk"
                        : "border-hairline bg-milk/60 hover:border-muted"
                    }`}
                  >
                    <span className="text-sm font-medium text-ink">{f.label}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-muted">
                      {f.perMonth} deliveries / month
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {slots.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSubDraft({ subSlot: s.key })}
                    className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                      subSlot === s.key
                        ? "border-ink bg-milk"
                        : "border-hairline bg-milk/60 hover:border-muted"
                    }`}
                  >
                    <span className="text-sm font-medium text-ink">{s.label}</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-muted">{s.window}</span>
                  </button>
                ))}
              </div>
            </StepBlock>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-5">
            <div className="card p-8 lg:sticky lg:top-28">
              <Overline>YOUR SUBSCRIPTION</Overline>
              <div className="mt-6 space-y-3">
                {chosen.length === 0 ? (
                  <p className="font-mono text-xs text-muted">No products picked yet.</p>
                ) : (
                  chosen.map((p) => (
                    <div key={p.id} className="flex justify-between text-sm">
                      <span className="text-ink">
                        {p.name} <span className="font-mono text-[11px] text-muted">× {step2[p.id]}</span>
                      </span>
                      <span className="font-mono text-ink">
                        {inr(p.subscriptionPrice * step2[p.id] * perMonth)}
                      </span>
                    </div>
                  ))
                )}
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-[11px] text-muted uppercase tracking-[0.2em]">
                    {frequencies.find((f) => f.key === subFrequency)?.label} ·{" "}
                    {slots.find((s) => s.key === subSlot)?.label}
                  </span>
                </div>
              </div>

              <hr className="kantha-rule my-6" />

              <div className="flex justify-between">
                <span className="text-sm text-muted">Monthly total</span>
                <span className="display text-2xl text-ink">{inr(monthly)}</span>
              </div>
              <p className="mt-1 text-right font-mono text-[11px] text-fresh">
                You save {inr(savings > 0 ? savings : 0)} vs one-time
              </p>

              <div className="mt-8">
                <PrimaryButton className="w-full justify-center">Start Subscription</PrimaryButton>
              </div>
              <p className="mt-4 text-center font-mono text-[11px] text-muted">
                Pause or cancel anytime. No lock-in. First delivery free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBlock({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-kesar">{n}</span>
        <span className="overline text-ink">{label}</span>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function StepConnector({ progress = 1 }: { progress?: number }) {
  return (
    <div className="my-8 flex items-center" aria-hidden>
      <Kolam variant="strip" progress={progress} className="h-6 w-40 opacity-70" />
    </div>
  );
}
