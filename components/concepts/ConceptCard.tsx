"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Concept } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";

const inside = ["Brand", "Website", "Social", "Strategy", "Automation"];

export default function ConceptCard({ concept, i }: { concept: Concept; i: number }) {
  const reduce = useReducedMotion();
  const [bg, ink, accent] = concept.brand.palette;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.1 }}
    >
      <Link
        href={`/concepts/${concept.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-[0_40px_80px_-45px_rgba(10,10,10,0.55)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={concept.cover}
            alt={`${concept.category} concept preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Brand lockup chip */}
          <span
            className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 shadow-lg"
            style={{ backgroundColor: bg.hex, color: ink.hex }}
          >
            <LogoMark slug={concept.slug} color={ink.hex} accent={accent.hex} className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: concept.brand.displayFont }}>
              {concept.brand.name}
            </span>
          </span>
          <span className="absolute right-5 top-5 font-display text-lg text-canvas/80">0{i + 1}</span>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <h2 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-canvas sm:text-4xl">
              {concept.category}
            </h2>
            <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-canvas/75 sm:text-base">
              {concept.pitch}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex flex-wrap gap-1.5">
            {inside.map((x) => (
              <span key={x} className="rounded-full bg-ink/[0.05] px-3 py-1 text-[11px] font-semibold text-ink/70">
                {x}
              </span>
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink">
            Explore concept
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-500 ease-expo group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
