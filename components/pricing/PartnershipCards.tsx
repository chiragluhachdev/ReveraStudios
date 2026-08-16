"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { partnershipPlans } from "@/lib/pricing";
import { PlanId } from "@/lib/agency";
import Reveal from "@/components/ui/Reveal";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";

export default function PartnershipCards() {
  const { open } = useOnboarding();

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-14 flex flex-col gap-2">
            <span className="eyebrow text-ink/50">Stay in the Loop</span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-ink lg:text-5xl">
              Ongoing support, growth & management —<br className="hidden lg:block"/> without another agency to coordinate.
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          {partnershipPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <article
                className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 ease-expo lg:flex-row ${
                  plan.featured
                    ? "border-gold/40 bg-ivory shadow-[0_24px_60px_-30px_rgba(176,141,87,0.35)] hover:-translate-y-1.5 hover:border-gold/60"
                    : "border-ink/10 bg-white hover:-translate-y-1.5 hover:border-ink/20 hover:bg-ivory/50"
                }`}
              >
                {/* Left Side: Info & Pricing */}
                <div className="flex flex-col justify-between p-8 lg:w-5/12 lg:border-r lg:border-ink/10 lg:p-12">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="eyebrow text-ink/60">
                        {plan.id === "social-presence" ? "SOCIAL / 01" : "DIGITAL / 02"}
                      </span>
                      {plan.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-canvas">
                          ⭐ {plan.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink">
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-stone">
                      {plan.tagline}
                    </p>

                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="font-display text-5xl font-medium tracking-tight text-ink">
                        {plan.price}
                      </span>
                      {plan.cadence && (
                        <span className="text-sm text-stone">/ {plan.cadence}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 hidden lg:block">
                    <button
                      onClick={() => open(plan.id as PlanId)}
                      className={`group/cta inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all duration-500 ease-expo ${
                        plan.featured
                          ? "bg-ink text-canvas hover:bg-gold"
                          : "bg-ink text-canvas hover:bg-accent"
                      }`}
                    >
                      {plan.cta.label}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-500 ease-expo group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </div>

                {/* Right Side: Features */}
                <div className="flex flex-col justify-center bg-ink/[0.01] p-8 lg:w-7/12 lg:p-12">
                  <h4 className="mb-6 font-display text-xl font-medium text-ink">
                    What's included:
                  </h4>
                  <ul className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {plan.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            plan.featured ? "bg-gold/15 text-gold" : "bg-ink/[0.06] text-ink"
                          }`}
                        >
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed text-ink/80">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-ink/10 pt-6">
                    <p className="text-sm italic text-stone">
                      <strong className="font-semibold text-ink">Best for:</strong> {plan.details.ideal}
                    </p>
                  </div>
                  
                  {/* Mobile CTA */}
                  <div className="mt-8 block lg:hidden">
                    <button
                      onClick={() => open(plan.id as PlanId)}
                      className={`group/cta flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all duration-500 ease-expo ${
                        plan.featured
                          ? "bg-ink text-canvas hover:bg-gold"
                          : "bg-ink text-canvas hover:bg-accent"
                      }`}
                    >
                      {plan.cta.label}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-500 ease-expo group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 max-w-3xl border-l-2 border-ink/10 pl-6">
            <p className="text-sm leading-relaxed text-stone">
              <strong className="font-medium text-ink">Need something more tailored?</strong> Every partnership can be customized around your business, audience and technical requirements.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone/80">
              * Pricing may vary based on content volume, platform requirements, customer volume, technical complexity and scope of ongoing support.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
