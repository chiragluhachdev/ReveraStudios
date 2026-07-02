"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative bg-canvas py-28 lg:py-40">
      <div className="container-x">
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <span className="eyebrow">04 — How We Work</span>
          </Reveal>
          <AnimatedHeading
            text="A process built / for the work / that lasts."
            className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
          />
        </div>

        <div ref={ref} className="relative">
          {/* Track */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-ink/10 lg:left-[9.5rem] lg:block">
            <motion.div
              style={reduce ? { scaleY: 1 } : { scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-accent"
            />
          </div>

          <div className="flex flex-col">
            {processSteps.map((step, i) => (
              <Reveal key={step.no} y={30}>
                <div className="group relative grid grid-cols-1 gap-6 border-b border-ink/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
                  <div className="flex items-center gap-8 lg:col-span-3">
                    <span className="font-display text-5xl font-medium text-ink/25 transition-colors duration-500 group-hover:text-accent">
                      {step.no}
                    </span>
                    <span className="relative z-10 hidden h-4 w-4 rounded-full border-2 border-canvas bg-ink ring-4 ring-canvas lg:block" />
                  </div>
                  <h3 className="font-display text-4xl font-medium tracking-tight text-ink lg:col-span-4 lg:text-5xl">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-pretty text-base leading-relaxed text-stone lg:col-span-5">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
