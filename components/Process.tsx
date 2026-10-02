"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { processSteps } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

// One loud colourway per step — the stack reads like a deck of cards.
const themes = [
  { card: "bg-[#151515] text-canvas", muted: "text-canvas/60", chip: "border-canvas/25 text-canvas/80", num: "text-lime" },
  { card: "bg-lime text-ink", muted: "text-ink/70", chip: "border-ink/25 text-ink/80", num: "text-ink" },
  { card: "bg-[#1f1f1f] text-canvas", muted: "text-canvas/60", chip: "border-canvas/25 text-canvas/80", num: "text-lilac" },
  { card: "bg-lilac text-ink", muted: "text-ink/70", chip: "border-ink/25 text-ink/80", num: "text-ink" },
];
const tilts = [-1.2, 1, -0.6, 0.8];

type Step = (typeof processSteps)[number];

function StepCard({
  step,
  i,
  total,
  progress,
}: {
  step: Step;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const t = themes[i % themes.length];
  // Cards shrink a touch as the ones after them slide over the top.
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.04]);

  return (
    <div
      className="sticky mb-[4vh] last:mb-0 sm:mb-[8vh]"
      style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}
    >
      <motion.article
        style={reduce ? { rotate: tilts[i] } : { scale, rotate: tilts[i] }}
        className={`relative grid min-h-[18rem] origin-top grid-cols-1 gap-6 overflow-hidden rounded-[2rem] p-7 shadow-[0_30px_70px_-40px_rgba(10,10,10,0.6)] sm:p-10 lg:min-h-[26rem] lg:grid-cols-12 lg:gap-10 lg:p-14 ${t.card}`}
      >
        <div className="flex items-start justify-between lg:col-span-5 lg:flex-col">
          <span
            className={`font-display text-[4.5rem] font-medium leading-[0.8] tracking-tightest sm:text-[8rem] lg:text-[11rem] ${t.num}`}
          >
            {step.no}
          </span>
          <span
            className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] ${t.chip}`}
          >
            Step {i + 1} / {total}
          </span>
        </div>

        <div className="flex flex-col justify-end lg:col-span-7">
          <h3 className="font-display text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
            {step.title}
            <span className="italic">.</span>
          </h3>
          <p className={`mt-5 max-w-lg text-pretty text-base leading-relaxed sm:text-lg ${t.muted}`}>
            {step.body}
          </p>
          <div className="mt-7 hidden flex-wrap gap-2 sm:flex">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-4 py-1.5 text-xs ${t.chip}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="process" className="relative hidden bg-canvas py-24 md:block lg:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">04 — How We Work</span>
            </Reveal>
            <AnimatedHeading
              text="A process built / for the work / that lasts."
              className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
            />
          </div>
          <Reveal delay={0.1} className="hidden md:block">
            <p className="max-w-xs text-pretty text-base leading-relaxed text-stone">
              Four moves, zero guesswork. Keep scrolling — the deck stacks
              itself.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {processSteps.map((step, i) => (
            <StepCard
              key={step.no}
              step={step}
              i={i}
              total={processSteps.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
