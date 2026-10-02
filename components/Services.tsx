"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, Service } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

// One pop colour per service (cycled); full class strings so Tailwind keeps them.
const pops = [
  { bg: "bg-lime", text: "text-lime", ring: "ring-lime", border: "border-lime/50" },
  { bg: "bg-lilac", text: "text-lilac", ring: "ring-lilac", border: "border-lilac/50" },
  { bg: "bg-sky", text: "text-sky", ring: "ring-sky", border: "border-sky/50" },
  { bg: "bg-pink", text: "text-pink", ring: "ring-pink", border: "border-pink/50" },
];
const popFor = (i: number) => pops[i % pops.length];

const tilts = [-1.2, 1, -0.6, 0.8];

// Mobile only: one sticky card per service; later cards slide over earlier ones.
function StackCard({
  service,
  i,
  total,
  progress,
}: {
  service: Service;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const pop = popFor(i);
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.025]);

  return (
    <div className="sticky -mx-3 mb-[4vh] last:mb-0 sm:-mx-6" style={{ top: `calc(5.5rem + ${i * 0.6}rem)` }}>
      <motion.article
        style={reduce ? { rotate: tilts[i % tilts.length] } : { scale, rotate: tilts[i % tilts.length] }}
        className="relative isolate flex min-h-[26rem] origin-top flex-col overflow-hidden rounded-[1.75rem] p-6 text-canvas shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
      >
        {/* Background photo + legibility gradient */}
        <Image src={service.image} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />

        <div className="flex items-start justify-between">
          <span
            className={`flex h-14 w-14 -rotate-12 items-center justify-center rounded-full font-display text-xl font-medium text-ink shadow-lg ${pop.bg}`}
          >
            0{i + 1}
          </span>
          <span className="rounded-full border border-canvas/30 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-canvas/80 backdrop-blur-sm">
            {i + 1} / {total}
          </span>
        </div>

        <div className="mt-auto pt-16">
          <h3 className="font-display text-4xl font-medium tracking-tight">
            {service.title}
            <span className={`italic ${pop.text}`}>.</span>
          </h3>
          <p className={`mt-2 font-sans text-base font-bold tracking-[-0.02em] ${pop.text}`}>{service.summary}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-canvas/75">{service.detail}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <span
                key={d}
                className={`rounded-full border bg-black/20 px-3 py-1 text-xs font-semibold text-canvas/90 backdrop-blur-sm ${pop.border}`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function Preview({ service, i }: { service: Service; i: number }) {
  const reduce = useReducedMotion();
  const pop = popFor(i);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={reduce ? false : { opacity: 0, y: 24, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        exit={reduce ? {} : { opacity: 0, y: -16, rotate: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2rem] bg-canvas/[0.04] p-4 ring-1 ring-canvas/10 sm:p-6"
      >
        <div className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] ring-4 ${pop.ring}`}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <span
            className={`absolute left-4 top-4 flex h-12 w-12 -rotate-12 items-center justify-center rounded-full font-display text-lg font-medium text-ink shadow-lg ${pop.bg}`}
          >
            0{i + 1}
          </span>
        </div>
        <div className="px-1 pb-1 pt-6">
          <p className={`font-sans text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl ${pop.text}`}>
            {service.summary}
          </p>
          <p className="mt-3 text-pretty text-base leading-relaxed text-canvas/70">{service.detail}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <span key={d} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold text-canvas/85 ${pop.border}`}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  // Which card is on top of the mobile stack (drives the sticky counter).
  const [onTop, setOnTop] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setOnTop(Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length))))
  );

  return (
    <section id="services" className="relative bg-[#151515] py-20 text-canvas lg:py-36">
      <div className="container-x">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow text-canvas/50">03 — Services</span>
              <span className="-rotate-3 rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                {services.length} in-house
              </span>
            </Reveal>
            <AnimatedHeading
              text="Everything a / brand needs to / feel inevitable."
              className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-canvas sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={0.1} className="hidden md:block">
            <p className="max-w-xs text-pretty text-base leading-relaxed text-canvas/60">
              One studios, end to end. Strategy, craft and technology under a
              single roof — so nothing gets lost in translation.
            </p>
          </Reveal>
        </div>

        {/* Mobile: stacked sticky cards (same pattern as How We Work) */}
        <div ref={stackRef} className="relative lg:hidden">
          {/* Sticky title bar fills the space above the stack while the header is hidden */}
          <div className="sticky top-0 z-20 -mx-6 flex h-[5.25rem] items-end justify-between bg-[#151515] px-6 pb-3 sm:-mx-10 sm:px-10">
            <span className="flex items-center gap-2 font-sans text-2xl font-semibold tracking-[-0.03em] text-canvas">
              <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${popFor(onTop).bg}`} />
              Services
            </span>
            <span className="font-sans text-sm font-semibold tabular-nums text-canvas/70">
              <span className={`transition-colors duration-300 ${popFor(onTop).text}`}>
                {String(onTop + 1).padStart(2, "0")}
              </span>{" "}
              / {String(services.length).padStart(2, "0")}
            </span>
          </div>
          {services.map((service, i) => (
            <StackCard
              key={service.id}
              service={service}
              i={i}
              total={services.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Desktop: list on the left, sticky preview on the right */}
        <div className="hidden grid-cols-12 gap-12 lg:grid">
          <ul className="col-span-6 border-t border-canvas/10" role="tablist" aria-label="Services">
            {services.map((s, i) => {
              const on = i === active;
              const pop = popFor(i);
              return (
                <li key={s.id} className="border-b border-canvas/10">
                  <button
                    role="tab"
                    aria-selected={on}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-6 py-6 text-left"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm transition-all duration-300 ${
                        on ? `${pop.bg} -rotate-12 text-ink` : "text-canvas/35 ring-1 ring-canvas/15"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <motion.span
                      animate={{ x: on ? 14 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className={`flex-1 font-display text-4xl font-medium tracking-tight transition-colors duration-300 xl:text-5xl ${
                        on ? "text-canvas" : "text-canvas/40 group-hover:text-canvas/70"
                      }`}
                    >
                      {s.title}
                    </motion.span>
                    <ArrowUpRight
                      size={22}
                      className={`shrink-0 transition-all duration-300 ${on ? `${pop.text} rotate-45` : "text-canvas/20"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="col-span-6">
            <div className="sticky top-28">
              <Preview service={current} i={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
