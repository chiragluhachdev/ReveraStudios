"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { team } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

// Members without a photo get a pop-colour card with their initial.
const pops = ["bg-lime", "bg-lilac", "bg-sky", "bg-pink"];
const tilts = [-2, 1.5, -1, 2];

export default function Team() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-canvas py-20 lg:py-36">
      <div className="container-x">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div>
            <Reveal>
              <span className="eyebrow">08 — Behind the Studios</span>
            </Reveal>
            <AnimatedHeading
              text="The people / behind the work."
              className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
            />
          </div>
          <Reveal delay={0.1} className="hidden md:block">
            <p className="max-w-xs text-pretty text-base leading-relaxed text-stone">
              A small, senior team of directors, designers and engineers who
              obsess so you don&apos;t have to.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Mobile: swipeable row. Desktop: four-up grid. */}
      <div
        data-lenis-prevent-horizontal
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 pt-3 sm:px-10 lg:mx-auto lg:grid lg:max-w-[1600px] lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-16"
      >
        {team.map((member, i) => (
          <Reveal key={member.name} delay={(i % 4) * 0.06} className="w-[62vw] shrink-0 snap-start sm:w-[40vw] lg:w-auto">
            <motion.figure
              className="group"
              whileHover={reduce ? {} : { rotate: tilts[i % tilts.length], y: -8 }}
              whileTap={reduce ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div
                className={`relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[1.75rem] ${
                  member.image ? "bg-ivory" : pops[i % pops.length]
                }`}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 40vw, 25vw"
                    className="object-cover grayscale transition-all duration-700 ease-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                ) : (
                  <span className="font-sans text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-ink transition-transform duration-500 ease-expo group-hover:scale-110 lg:text-[9rem]">
                    {member.name[0]}
                  </span>
                )}

                {/* Role sticker */}
                <span className="absolute bottom-4 left-4 right-4 w-fit -rotate-2 rounded-full bg-[#151515] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-canvas shadow-lg transition-transform duration-500 ease-expo group-hover:rotate-0">
                  {member.role}
                </span>
              </div>
              <figcaption className="mt-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                  {member.name}
                </h3>
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
        <div aria-hidden className="w-1 shrink-0 lg:hidden" />
      </div>
    </section>
  );
}
