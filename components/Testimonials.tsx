"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const current = testimonials[index];

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative bg-canvas py-28 lg:py-40">
      <div className="container-x">
        <Reveal className="mb-16">
          <span className="eyebrow">06 — Words</span>
        </Reveal>

        <div className="relative min-h-[280px] max-w-5xl">
          <span className="pointer-events-none absolute -left-2 -top-16 font-display text-[12rem] leading-none text-ink/8 lg:-top-24 lg:text-[16rem]">
            “
          </span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <p className="font-display text-3xl font-medium leading-[1.2] tracking-tight text-ink sm:text-4xl lg:text-6xl">
                {current.quote}
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <span className="h-px w-12 bg-accent" />
                <div>
                  <p className="text-base font-medium text-ink">
                    {current.name}
                  </p>
                  <p className="text-sm text-stone">{current.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex items-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 ease-expo hover:bg-ink hover:text-canvas"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 ease-expo hover:bg-ink hover:text-canvas"
          >
            <ArrowRight size={18} />
          </button>
          <span className="ml-4 text-sm text-stone">
            {String(index + 1).padStart(2, "0")} — {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
