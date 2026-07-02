"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { showreel, ShowreelItem } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import VideoEmbed from "@/components/ui/VideoEmbed";

export default function Showreel() {
  const [active, setActive] = useState<ShowreelItem | null>(null);

  return (
    <section id="showreel" className="relative bg-canvas py-28 lg:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">01 — Showreel</span>
            </Reveal>
            <AnimatedHeading
              text="Motion, / in its finest form."
              className="mt-5 max-w-2xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty text-base leading-relaxed text-stone">
              A selection of films made for brands who understand that story is
              the product. Hover to preview, click to watch.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {showreel.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.08}>
              <button
                onClick={() => setActive(item)}
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink text-left"
              >
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 transition-all duration-700 ease-expo group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

                {/* Play affordance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-canvas/40 bg-canvas/10 backdrop-blur-md transition-all duration-500 ease-expo group-hover:scale-110 group-hover:bg-canvas group-hover:text-ink">
                    <Play size={20} className="translate-x-0.5 text-canvas transition-colors duration-500 group-hover:text-ink" fill="currentColor" />
                  </span>
                </div>

                {/* Meta */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-canvas">
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-canvas/70">{item.client}</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.2em] text-canvas/70">
                    <p>{item.category}</p>
                    <p className="mt-1">{item.year}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-10"
          >
            <button
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-canvas/30 text-canvas transition-colors hover:bg-canvas hover:text-ink"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              <VideoEmbed source={active.video} title={active.title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
