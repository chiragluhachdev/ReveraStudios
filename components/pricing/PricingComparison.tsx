"use client";

import { Check, Minus } from "lucide-react";
import { comparison } from "@/lib/pricing";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-ink text-canvas">
        <Check size={13} strokeWidth={2.5} />
      </span>
    ) : (
      <span className="mx-auto flex h-6 w-6 items-center justify-center text-ink/25">
        <Minus size={16} />
      </span>
    );
  }
  return <span className="text-sm text-ink/80">{value}</span>;
}

export default function PricingComparison() {
  const { plans, rows, featuredIndex } = comparison;

  return (
    <section className="relative bg-canvas py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="eyebrow">Compare</span>
          </Reveal>
          <AnimatedHeading
            text="A closer look, / side by side."
            className="mt-5 font-display text-4xl font-medium leading-[1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          />
        </div>

        <Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/15">
                  <th className="w-2/5 py-5 pr-4 text-sm font-medium uppercase tracking-[0.18em] text-stone">
                    Features
                  </th>
                  {plans.map((p, i) => (
                    <th
                      key={p}
                      className={`px-4 py-5 text-center font-display text-xl font-medium tracking-tight ${
                        i === featuredIndex ? "text-gold" : "text-ink"
                      }`}
                    >
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-ink/10 transition-colors duration-300 hover:bg-ivory/60"
                  >
                    <td className="py-5 pr-4 text-sm text-ink/90">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={`px-4 py-5 text-center ${
                          i === featuredIndex ? "bg-gold/[0.06]" : ""
                        }`}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
