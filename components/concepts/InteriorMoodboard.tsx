"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Hand, Shuffle } from "lucide-react";
import { Concept, unsplash } from "@/lib/concepts";
import { materialTextures } from "@/components/concepts/sites/interiorData";

type Item =
  | { id: string; kind: "photo"; src: string; label: string; w: string }
  | { id: string; kind: "material"; name: string; w: string }
  | { id: string; kind: "note"; text: string; w: string }
  | { id: string; kind: "swatch"; hex: string; name: string; w: string };

// Widths are % of the board so the layout scales from phone to desktop.
const items: Item[] = [
  { id: "p1", kind: "photo", src: unsplash("1618220179428-22790b461013", 700), label: "Living — ochre & cane", w: "34%" },
  { id: "p2", kind: "photo", src: unsplash("1631679706909-1844bbd07221", 600), label: "Rattan, linen, round mirror", w: "26%" },
  { id: "p3", kind: "photo", src: unsplash("1600494603989-9650cf6ddd3d", 600), label: "Fern study", w: "24%" },
  { id: "p4", kind: "photo", src: unsplash("1618219908412-a29a1bb7b86e", 500), label: "Entry vignette", w: "20%" },
  { id: "m1", kind: "material", name: "Travertine", w: "14%" },
  { id: "m2", kind: "material", name: "White oak", w: "14%" },
  { id: "m3", kind: "material", name: "Cane", w: "13%" },
  { id: "m4", kind: "material", name: "Brass", w: "12%" },
  { id: "n1", kind: "note", text: "Light first. Then everything else.", w: "22%" },
  { id: "s1", kind: "swatch", hex: "#BF8B3E", name: "Ochre", w: "9%" },
  { id: "s2", kind: "swatch", hex: "#4D5C45", name: "Fern", w: "9%" },
  { id: "s3", kind: "swatch", hex: "#DCC0B0", name: "Rose clay", w: "9%" },
];

// Composed starting layout: [left %, top %, rotation deg].
const home: Record<string, [number, number, number]> = {
  p1: [3, 6, -3], p2: [40, 4, 2.5], p3: [70, 10, -2], p4: [44, 52, 3],
  m1: [6, 62, -6], m2: [22, 70, 5], m3: [70, 62, -4], m4: [84, 70, 7],
  n1: [67, 40, 4], s1: [30, 44, -8], s2: [24, 52, 6], s3: [36, 58, -3],
};

export default function InteriorMoodboard({ concept }: { concept: Concept }) {
  const board = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [layout, setLayout] = useState(home);
  const [order, setOrder] = useState(items.map((i) => i.id));
  const [shuffles, setShuffles] = useState(0);
  const serif = concept.brand.displayFont;
  const [, ink, ochre] = concept.brand.palette.map((c) => c.hex);

  const bringToFront = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);

  const shuffle = () => {
    const next: Record<string, [number, number, number]> = {};
    items.forEach((it) => {
      const wide = parseFloat(it.w);
      next[it.id] = [Math.random() * (92 - wide), Math.random() * 68, Math.random() * 14 - 7];
    });
    setLayout(next);
    // Remount so drag offsets reset along with the new positions.
    setShuffles((n) => n + 1);
  };
  const reset = () => {
    setLayout(home);
    setShuffles((n) => n + 1);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-stone">
          <Hand size={15} /> Drag anything around the board.
        </span>
        <div className="flex gap-2">
          <button onClick={shuffle} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-canvas transition-transform hover:scale-105">
            <Shuffle size={14} /> Shuffle
          </button>
          <button onClick={reset} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink hover:border-ink">
            Reset
          </button>
        </div>
      </div>

      <div
        ref={board}
        className="relative h-[520px] overflow-hidden rounded-[2rem] ring-1 ring-ink/10 sm:h-[600px] lg:h-[680px]"
        style={{
          backgroundColor: "#E9E3DA",
          backgroundImage:
            "radial-gradient(rgba(31,29,26,0.12) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.25em] text-ink/40">
          Oriel · Moodboard 01 — Ochre Flat
        </span>

        {items.map((it, idx) => {
          const [x, y, r] = layout[it.id];
          return (
            <motion.div
              key={`${it.id}-${shuffles}`}
              drag={!reduce}
              dragConstraints={board}
              dragElastic={0.08}
              dragMomentum={false}
              onPointerDown={() => bringToFront(it.id)}
              initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: r * 2 }}
              animate={{ opacity: 1, scale: 1, rotate: r }}
              whileDrag={{ scale: 1.06, rotate: 0, boxShadow: "0 30px 50px -20px rgba(0,0,0,0.45)" }}
              transition={{ type: "spring", stiffness: 160, damping: 18, delay: reduce ? 0 : idx * 0.04 }}
              className="absolute cursor-grab touch-none active:cursor-grabbing"
              style={{ left: `${x}%`, top: `${y}%`, width: it.w, zIndex: order.indexOf(it.id) + 1 }}
            >
              {it.kind === "photo" && (
                <div className="bg-white p-[5%] pb-[3%] shadow-[0_14px_30px_-18px_rgba(0,0,0,0.55)]">
                  <div className="relative aspect-[4/3.4] overflow-hidden">
                    <Image src={it.src} alt={it.label} fill sizes="320px" className="pointer-events-none object-cover" draggable={false} />
                  </div>
                  <p className="mt-[4%] truncate text-[clamp(9px,1.1vw,13px)] text-ink/70" style={{ fontFamily: serif }}>
                    {it.label}
                  </p>
                  {/* Tape */}
                  <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-4deg] bg-white/60 shadow-sm" />
                </div>
              )}
              {it.kind === "material" && (
                <div className="bg-white p-[6%] shadow-[0_12px_24px_-16px_rgba(0,0,0,0.5)]">
                  <span className="block aspect-square" style={materialTextures[it.name]} />
                  <span className="mt-[6%] block truncate text-[clamp(8px,0.9vw,11px)] uppercase tracking-[0.12em] text-ink/70">{it.name}</span>
                </div>
              )}
              {it.kind === "swatch" && (
                <div className="aspect-square rounded-full shadow-[0_10px_20px_-12px_rgba(0,0,0,0.55)] ring-4 ring-white" style={{ backgroundColor: it.hex }} title={it.name} />
              )}
              {it.kind === "note" && (
                <div className="p-[9%] shadow-[0_14px_28px_-18px_rgba(0,0,0,0.5)]" style={{ backgroundColor: "#F6E7B4", color: ink }}>
                  <p className="text-[clamp(12px,1.6vw,22px)] italic leading-tight" style={{ fontFamily: serif }}>
                    {it.text}
                  </p>
                  <p className="mt-2 text-[clamp(8px,0.8vw,10px)] uppercase tracking-[0.2em]" style={{ color: ochre }}>
                    — design note
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
