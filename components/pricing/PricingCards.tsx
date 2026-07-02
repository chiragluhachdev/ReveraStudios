"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock, Sparkles, Target, X } from "lucide-react";
import { plans, Plan } from "@/lib/pricing";
import { PlanId } from "@/lib/agency";
import Reveal from "@/components/ui/Reveal";
import { useOnboarding } from "@/components/onboarding/OnboardingContext";

export default function PricingCards() {
  const [active, setActive] = useState<Plan | null>(null);
  const { open } = useOnboarding();

  // Lock the page scroll while the slide-over is open.
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="plans" className="relative bg-ivory py-24 lg:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1}>
              <article
                className={`group relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-xl transition-all duration-500 ease-expo lg:p-10 ${
                  plan.featured
                    ? "border-gold/40 bg-white/80 shadow-[0_24px_60px_-30px_rgba(176,141,87,0.45)] hover:-translate-y-1.5 hover:border-gold/60"
                    : "border-ink/10 bg-white/60 hover:-translate-y-1.5 hover:border-ink/20 hover:bg-white/80"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-canvas lg:left-10">
                    <Sparkles size={12} />
                    {plan.badge}
                  </span>
                )}

                <header>
                  <h3 className="font-display text-3xl font-medium tracking-tight text-ink">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-stone">
                    {plan.tagline}
                  </p>
                </header>

                {/* Price */}
                <div className="mt-8 flex items-baseline gap-2 border-b border-ink/10 pb-8">
                  <span className="font-display text-5xl font-medium tracking-tight text-ink">
                    {plan.price}
                  </span>
                  {plan.cadence && (
                    <span className="text-sm text-stone">/ {plan.cadence}</span>
                  )}
                </div>

                {/* Highlights */}
                <ul className="mt-8 flex flex-1 flex-col gap-3.5">
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

                {/* Actions */}
                <div className="mt-10 flex flex-col gap-3">
                  <button
                    onClick={() => open(plan.id as PlanId)}
                    className={`group/cta inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-500 ease-expo ${
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
                  <button
                    onClick={() => setActive(plan)}
                    className="group/details inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 ease-expo hover:border-ink/40"
                    aria-haspopup="dialog"
                  >
                    View Details
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-500 ease-expo group-hover/details:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Slide-over details panel */}
      <AnimatePresence>
        {active && (
          <PlanDetails
            plan={active}
            onClose={() => setActive(null)}
            onStart={() => {
              const id = active.id as PlanId;
              setActive(null);
              open(id);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function PlanDetails({
  plan,
  onClose,
  onStart,
}: {
  plan: Plan;
  onClose: () => void;
  onStart: () => void;
}) {
  // The featured plan carries the subtle gold accent through its panel too.
  const priceColor = plan.featured ? "text-gold" : "text-accent";
  const chip = plan.featured
    ? "bg-gold/15 text-gold"
    : "bg-accent/12 text-accent";

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.aside
        role="dialog"
        aria-label={`${plan.name} plan details`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent
        className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-canvas shadow-2xl"
      >
        {/* Panel header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-ink/10 bg-canvas/85 px-7 py-7 backdrop-blur-xl lg:px-10">
          <div>
            <span className="eyebrow">{plan.badge ?? "Plan"}</span>
            <h3 className="mt-2 font-display text-4xl font-medium tracking-tight text-ink">
              {plan.name}
            </h3>
            <p className="mt-1 flex items-baseline gap-2">
              <span className={`font-display text-2xl ${priceColor}`}>{plan.price}</span>
              {plan.cadence && (
                <span className="text-sm text-stone">/ {plan.cadence}</span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 ease-expo hover:bg-ink hover:text-canvas"
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel body */}
        <div className="flex-1 px-7 py-8 lg:px-10">
          <p className="text-pretty text-base leading-relaxed text-ink/75">
            {plan.details.intro}
          </p>

          {/* Meta */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-ink/10 bg-white/50 p-5">
              <div className="flex items-center gap-2 text-stone">
                <Clock size={15} />
                <span className="text-xs uppercase tracking-[0.18em]">Timeline</span>
              </div>
              <p className="mt-2 text-sm text-ink/80">{plan.details.timeline}</p>
            </div>
            <div className="rounded-xl border border-ink/10 bg-white/50 p-5">
              <div className="flex items-center gap-2 text-stone">
                <Target size={15} />
                <span className="text-xs uppercase tracking-[0.18em]">Ideal for</span>
              </div>
              <p className="mt-2 text-sm text-ink/80">{plan.details.ideal}</p>
            </div>
          </div>

          {/* Feature groups */}
          <div className="mt-10 flex flex-col gap-9">
            {plan.details.groups.map((group) => (
              <div key={group.title}>
                <h4 className="font-display text-xl font-medium tracking-tight text-ink">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-3 border-t border-ink/10 pt-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${chip}`}>
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      <span className="text-sm leading-relaxed text-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
                {group.note && (
                  <p className="mt-3 border-l-2 border-ink/15 pl-3 text-xs italic leading-relaxed text-stone">
                    {group.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Panel footer CTA */}
        <div className="sticky bottom-0 border-t border-ink/10 bg-canvas/85 px-7 py-6 backdrop-blur-xl lg:px-10">
          <button
            onClick={onStart}
            className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-canvas transition-all duration-500 ease-expo ${
              plan.featured ? "hover:bg-gold" : "hover:bg-accent"
            }`}
          >
            {plan.cta.label}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </motion.aside>
    </div>
  );
}
