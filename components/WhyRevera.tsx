"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const reasons = [
  {
    no: "01",
    title: "Taste is a strategy",
    body: "We treat craft as a competitive advantage. The details others skip are the ones your customers feel.",
  },
  {
    no: "02",
    title: "One team, end to end",
    body: "Strategy, design, film and engineering in one room. No hand-offs, no lost intent.",
  },
  {
    no: "03",
    title: "Built to perform",
    body: "Beautiful is the baseline. Everything we ship is measured against outcomes that matter.",
  },
];

export default function WhyRevera() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="studio" className="relative bg-ivory py-28 lg:py-40">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Sticky imagery */}
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <div
            ref={ref}
            className="relative h-[60vh] overflow-hidden rounded-2xl lg:h-full"
          >
            <motion.div
              style={reduce ? undefined : { y, scale }}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
                alt="Inside the Rêvera studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            <div className="absolute bottom-8 left-8 text-canvas">
              <p className="font-display text-2xl italic">
                “Where ideas become experiences.”
              </p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="eyebrow">05 — Why Rêvera</span>
          </Reveal>
          <AnimatedHeading
            text="We make work / worth remembering."
            className="mt-5 font-display text-5xl font-medium leading-[1] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-ink/70">
              Rêvera is a studio for founders and brand leaders who refuse to
              blend in. We combine editorial taste with engineering rigour to
              build experiences that feel effortless — and perform relentlessly.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {reasons.map((r, i) => (
              <Reveal key={r.no} delay={i * 0.05}>
                <div className="group flex items-start gap-6 py-8">
                  <span className="font-display text-lg text-accent">{r.no}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                      {r.title}
                    </h3>
                    <p className="mt-2 max-w-md text-pretty text-base leading-relaxed text-stone">
                      {r.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
