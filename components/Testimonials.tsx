"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

// Each quote gets its own pop colour for the mark, avatar and progress.
const pops = [
  { text: "text-lime", bg: "bg-lime" },
  { text: "text-lilac", bg: "bg-lilac" },
  { text: "text-sky", bg: "bg-sky" },
];
const AUTOPLAY_MS = 6500;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const current = testimonials[index];
  const pop = pops[index % pops.length];

  const go = (d: number) =>
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  // Auto-advance; resting the mouse on the quote holds it.
  useEffect(() => {
    if (reduce || hovered) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, hovered, reduce]);

  return (
    <section className="relative overflow-hidden bg-[#151515] py-20 text-canvas lg:py-36">
      <div className="container-x">
        <Reveal className="mb-10 flex items-center justify-between lg:mb-16">
          <span className="eyebrow text-canvas/50">06 — Words</span>
          <span className="hidden rounded-full border border-canvas/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-canvas/60 sm:inline-block">
            Real clients, real words
          </span>
        </Reveal>

        <div
          className="relative min-h-[17rem] max-w-5xl sm:min-h-[20rem]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={reduce ? false : { opacity: 0, y: 30, rotate: 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              // Swipe left / right to change quote (touch + mouse drag).
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="relative cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <span className={`block font-display text-7xl leading-[0.6] sm:text-8xl ${pop.text}`}>
                “
              </span>
              <p className="mt-4 font-display text-2xl font-medium leading-[1.2] tracking-tight sm:text-4xl lg:text-6xl">
                {current.quote}
              </p>
              <footer className="mt-8 flex items-center gap-4 lg:mt-10">
                <span
                  className={`flex h-12 w-12 -rotate-6 items-center justify-center rounded-2xl font-sans text-sm font-extrabold text-ink ${pop.bg}`}
                >
                  {initials(current.name)}
                </span>
                <div>
                  <p className="text-base font-semibold text-canvas">{current.name}</p>
                  <p className="text-sm text-canvas/55">{current.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3 lg:mt-14">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-canvas/20 text-canvas transition-all duration-300 ease-expo hover:bg-canvas hover:text-ink"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-canvas/20 text-canvas transition-all duration-300 ease-expo hover:bg-canvas hover:text-ink"
          >
            <ArrowRight size={18} />
          </button>

          {/* Progress pills — click to jump */}
          <div className="ml-3 flex flex-1 items-center gap-2 sm:max-w-xs">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className="relative h-1.5 flex-1 overflow-hidden rounded-full"
              >
                <span className="absolute inset-0 bg-canvas/15" />
                <motion.span
                  key={`${i}-${index}`}
                  className={`absolute inset-0 origin-left ${pops[i % pops.length].bg}`}
                  initial={{ scaleX: i < index ? 1 : 0 }}
                  animate={{ scaleX: i <= index ? 1 : 0 }}
                  transition={
                    i === index && !reduce && !hovered
                      ? { duration: AUTOPLAY_MS / 1000, ease: "linear" }
                      : { duration: 0.3 }
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
