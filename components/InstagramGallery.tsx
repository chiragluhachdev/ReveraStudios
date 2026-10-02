"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import { contactMeta } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

// Floating stickers around the "coming soon" card.
const stickers = [
  { label: "Reels", cls: "bg-lime", pos: "left-[6%] top-[12%]", rot: -10 },
  { label: "Behind the scenes", cls: "bg-lilac", pos: "right-[6%] top-[16%]", rot: 7 },
  { label: "Launches", cls: "bg-sky", pos: "left-[10%] bottom-[14%]", rot: 6 },
  { label: "Process", cls: "bg-pink", pos: "right-[8%] bottom-[12%]", rot: -6 },
];

export default function InstagramGallery() {
  const reduce = useReducedMotion();
  const instaUrl = `https://instagram.com/${contactMeta.instagram.replace("@", "")}`;

  return (
    <section className="relative bg-canvas py-16 lg:py-32">
      <div className="container-x">
        <div className="mb-8 flex items-end justify-between gap-6 lg:mb-14">
          <div>
            <Reveal>
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                The feed
              </span>
            </Reveal>
            <AnimatedHeading
              text="From the studios, / daily."
              className="mt-4 font-sans text-[11vw] font-normal leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={0.1} className="hidden md:block">
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              <Instagram size={16} />
              {contactMeta.instagram}
            </a>
          </Reveal>
        </div>

        <Reveal>
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[19rem] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] bg-[#151515] px-6 text-center text-canvas sm:min-h-[24rem] lg:min-h-[30rem]"
          >
            {/* Stickers — tablet/desktop only; phones keep the card compact */}
            {stickers.map((s, i) => (
              <motion.span
                key={s.label}
                aria-hidden
                className={`absolute hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-ink shadow-lg sm:block ${s.cls} ${s.pos}`}
                style={{ rotate: s.rot }}
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3.2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {s.label}
              </motion.span>
            ))}

            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime via-lilac to-pink text-ink transition-transform duration-500 ease-expo group-hover:rotate-12 group-hover:scale-110">
              <Instagram size={24} />
            </span>
            <p className="mt-6 font-sans text-5xl font-normal tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Coming <span className="font-display italic text-lime">soon.</span>
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-canvas/50">
              Our feed is being curated
            </p>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105">
              Follow {contactMeta.instagram}
              <ArrowUpRight size={15} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
