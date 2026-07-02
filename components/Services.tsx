"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { services } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Services() {
  const [active, setActive] = useState<string>(services[0].id);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ink py-28 text-canvas lg:py-40"
    >
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow text-canvas/50">03 — Capabilities</span>
            </Reveal>
            <AnimatedHeading
              text="Everything a / brand needs to feel / inevitable."
              className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-canvas sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-pretty text-base leading-relaxed text-canvas/60">
              One studio, end to end. Strategy, craft and technology under a
              single roof — so nothing gets lost in translation.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-canvas/12">
          {services.map((service, i) => {
            const isOpen = active === service.id;
            return (
              <Reveal key={service.id} y={20}>
                <div
                  className="border-b border-canvas/12"
                  onMouseEnter={() => setActive(service.id)}
                >
                  <button
                    onClick={() => setActive(service.id)}
                    className="group flex w-full items-center gap-6 py-7 text-left lg:py-8"
                    aria-expanded={isOpen}
                  >
                    <span className="w-12 font-display text-lg text-canvas/40">
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`font-display text-3xl font-medium tracking-tight transition-colors duration-500 sm:text-4xl lg:text-5xl ${
                          isOpen ? "text-canvas" : "text-canvas/55"
                        }`}
                      >
                        {service.title}
                      </span>
                    </span>
                    <span className="hidden max-w-xs flex-1 text-sm text-canvas/50 md:block">
                      {service.summary}
                    </span>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ease-expo ${
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-canvas"
                          : "border-canvas/25 text-canvas/70"
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-12 lg:gap-12">
                          <div className="lg:col-span-5 lg:col-start-2">
                            <p className="text-pretty text-lg leading-relaxed text-canvas/75">
                              {service.detail}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                              {service.deliverables.map((d) => (
                                <span
                                  key={d}
                                  className="rounded-full border border-canvas/20 px-4 py-1.5 text-xs text-canvas/70"
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-5">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
