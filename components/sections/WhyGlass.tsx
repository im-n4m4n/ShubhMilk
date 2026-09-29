"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui";
import FlipIn from "@/components/motion/FlipIn";

const rows: { label: string; glass: string; plastic: string; tetra: string }[] = [
  { label: "Shelf life", glass: "48 hrs chilled", plastic: "6 months", tetra: "6 months" },
  { label: "Taste", glass: "Clean, cold, sweet", plastic: "Slight wax", tetra: "Cooked" },
  { label: "Recycling", glass: "Infinitely, in deposit loop", plastic: "Downcycled", tetra: "Rarely recycled" },
  { label: "Cost to farmer", glass: "₹4 back per bottle", plastic: "₹0", tetra: "₹0" },
];

export default function WhyGlass() {
  const [material, setMaterial] = useState<"glass" | "plastic">("glass");

  return (
    <section className="bg-bone py-32 lg:py-48">
      <div className="mx-auto max-w-site px-6 lg:px-12">
        <SectionHeading
          overline="WHY GLASS"
          title="Better for the milk. Fairer to the farmer."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FlipIn>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline text-left">
                    <th className="px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
                      Spec
                    </th>
                    <th className="border-l border-hairline bg-milk px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-kesar">
                      Glass
                    </th>
                    <th className="border-l border-hairline px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
                      Plastic
                    </th>
                    <th className="border-l border-hairline px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
                      Tetra
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-hairline last:border-b-0">
                      <td className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        {r.label}
                      </td>
                      <td className="border-l border-hairline bg-milk px-6 py-4 text-ink">{r.glass}</td>
                      <td className="border-l border-hairline px-6 py-4 text-muted">{r.plastic}</td>
                      <td className="border-l border-hairline px-6 py-4 text-muted">{r.tetra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </FlipIn>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-10">
              {/* material toggle */}
              <div className="inline-flex rounded-full border border-hairline bg-bone p-1">
                {(["glass", "plastic"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMaterial(m)}
                    className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                      material === m ? "bg-ink text-bone" : "text-muted hover:text-ink"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="mt-10">
                {material === "glass" ? (
                  <>
                    <p className="display text-6xl text-ink">40×</p>
                    <p className="mt-3 text-sm leading-[1.7] text-muted">
                      a bottle is reused per year. 1 bottle returned = 1 bottle reused.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="display text-6xl text-ink">450 yrs</p>
                    <p className="mt-3 text-sm leading-[1.7] text-muted">
                      1 plastic bottle used = 450 years in a landfill.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
