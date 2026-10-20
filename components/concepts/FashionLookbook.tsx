"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Concept } from "@/lib/concepts";
import { inr, looks, productById } from "@/components/concepts/sites/fashionData";

export default function FashionLookbook({ concept }: { concept: Concept }) {
  const [bone, noir, oxblood] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [spot, setSpot] = useState<string | null>(null);

  const look = looks[i];
  const go = (d: number) => {
    setDir(d);
    setSpot(null);
    setI((n) => (n + d + looks.length) % looks.length);
  };
  const jump = (n: number) => {
    setDir(n > i ? 1 : -1);
    setSpot(null);
    setI(n);
  };

  return (
    <div className="overflow-hidden rounded-[2rem]" style={{ backgroundColor: noir, color: bone }}>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8 lg:p-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">Formé · Autumn — Winter 2026</p>
          <p className="mt-2 text-5xl italic leading-none sm:text-6xl" style={{ fontFamily: serif }}>
            Quiet Hours
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm tabular-nums opacity-70">
            {String(i + 1).padStart(2, "0")} / {String(looks.length).padStart(2, "0")}
          </span>
          <button onClick={() => go(-1)} aria-label="Previous look" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-black">
            <ArrowLeft size={17} />
          </button>
          <button onClick={() => go(1)} aria-label="Next look" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-black">
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Frame */}
        <div className="relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[640px]">
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.div
              key={i}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(1);
                else if (info.offset.x > 70) go(-1);
              }}
              className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <Image src={look.image} alt={look.title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="pointer-events-none object-cover" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 text-xl italic sm:text-2xl" style={{ fontFamily: serif }}>
                {look.title}
              </p>

              {/* Hotspots */}
              {look.spots.map((s) => {
                const p = productById(s.productId);
                const active = spot === s.productId;
                return (
                  <div key={s.productId} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpot(active ? null : s.productId);
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onMouseEnter={() => setSpot(s.productId)}
                      aria-label={`Shop ${p.name}`}
                      className="relative -ml-4 -mt-4 flex h-8 w-8 items-center justify-center"
                    >
                      {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />}
                      <span className="relative h-3.5 w-3.5 rounded-full bg-white ring-4 ring-white/30" />
                    </button>
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.25 }}
                          className={`absolute top-6 z-10 w-48 bg-white p-3 text-black shadow-2xl ${s.x > 55 ? "right-0" : "left-0"}`}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <p className="text-base leading-tight" style={{ fontFamily: serif }}>{p.name}</p>
                          <p className="mt-0.5 text-xs opacity-70">{inr(p.price)}</p>
                          <div className="mt-2 flex gap-1.5">
                            {p.colours.map((c) => (
                              <span key={c.name} className="h-3 w-3 rounded-full ring-1 ring-black/15" style={{ backgroundColor: c.hex }} />
                            ))}
                          </div>
                          <a href="#website" className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">
                            Shop in store <ArrowUpRight size={11} />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Shop the look */}
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <p className="text-[10px] uppercase tracking-[0.35em] opacity-60">Shop the look</p>
          <AnimatePresence mode="wait">
            <motion.ul key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-5 space-y-4">
              {look.spots.map((s) => {
                const p = productById(s.productId);
                const active = spot === s.productId;
                return (
                  <li key={s.productId}>
                    <button
                      onMouseEnter={() => setSpot(s.productId)}
                      onClick={() => setSpot(active ? null : s.productId)}
                      className="flex w-full items-center gap-4 p-2 text-left transition-colors"
                      style={{ backgroundColor: active ? "rgba(243,239,232,0.08)" : "transparent" }}
                    >
                      <span className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden">
                        <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xl leading-tight" style={{ fontFamily: serif }}>{p.name}</span>
                        <span className="mt-1 block text-xs opacity-60">{p.fabric}</span>
                        <span className="mt-2 block text-sm">{inr(p.price)}</span>
                      </span>
                      <span className="h-2 w-2 shrink-0 rounded-full transition-colors" style={{ backgroundColor: active ? oxblood : "rgba(243,239,232,0.2)" }} />
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          {/* Thumbnails + progress */}
          <div className="mt-auto pt-8">
            <div className="grid grid-cols-5 gap-2">
              {looks.map((l, n) => (
                <button key={l.title} onClick={() => jump(n)} aria-label={l.title} className="relative aspect-[3/4] overflow-hidden transition-opacity" style={{ opacity: n === i ? 1 : 0.4 }}>
                  <Image src={l.image} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="mt-3 h-px w-full bg-white/15">
              <motion.div className="h-px bg-white" animate={{ width: `${((i + 1) / looks.length) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] opacity-45">Tap the dots to shop · swipe for the next look</p>
          </div>
        </div>
      </div>
    </div>
  );
}
