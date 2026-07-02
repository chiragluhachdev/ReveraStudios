"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { pricingFaqs } from "@/lib/pricing";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-canvas py-24 lg:py-32">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <span className="eyebrow">Questions</span>
          </Reveal>
          <AnimatedHeading
            text="Frequently / asked."
            className="mt-5 font-display text-4xl font-medium leading-[1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          />
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-ink/12">
            {pricingFaqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.q} y={16}>
                  <div className="border-b border-ink/12">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center gap-6 py-7 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="flex-1 font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-expo ${
                          isOpen
                            ? "rotate-45 border-accent bg-accent text-canvas"
                            : "border-ink/20 text-ink/70"
                        }`}
                      >
                        <Plus size={17} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 text-pretty text-base leading-relaxed text-stone">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
