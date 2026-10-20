"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { Concept } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import { categories, dietary, inr, menu, specials } from "@/components/concepts/sites/bakeryData";

const script = "var(--font-caveat), cursive";

/* Decorative QR: deterministic pattern (same on server and client) with finder squares. */
function useQrCells(size = 21) {
  return useMemo(() => {
    let seed = 2417;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    const cells: boolean[] = [];
    for (let i = 0; i < size * size; i++) cells.push(rand() > 0.52);
    const finder = (r0: number, c0: number) => {
      for (let r = 0; r < 7; r++)
        for (let c = 0; c < 7; c++) {
          const edge = r === 0 || r === 6 || c === 0 || c === 6;
          const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          cells[(r0 + r) * size + (c0 + c)] = edge || core;
        }
      // quiet ring around the finder
      for (let k = -1; k <= 7; k++) {
        [[r0 - 1, c0 + k], [r0 + 7, c0 + k], [r0 + k, c0 - 1], [r0 + k, c0 + 7]].forEach(([r, c]) => {
          if (r >= 0 && c >= 0 && r < size && c < size) cells[r * size + c] = false;
        });
      }
    };
    finder(0, 0);
    finder(0, size - 7);
    finder(size - 7, 0);
    // clear the centre for the logo
    for (let r = 8; r <= 12; r++) for (let c = 8; c <= 12; c++) cells[r * size + c] = false;
    return { cells, size };
  }, [size]);
}

export default function BakeryMenu({ concept }: { concept: Concept }) {
  const [flour, cocoa, crust, pistachio, butter] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const reduce = useReducedMotion();
  const [day, setDay] = useState(5);
  const [hover, setHover] = useState(false);
  const qr = useQrCells();

  // Open the chalkboard on today's specials (browser-only).
  useEffect(() => setDay(new Date().getDay()), []);

  const printed = categories.filter((c) => c !== "Breads");
  const special = specials[day];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Printed menu */}
      <motion.div
        className="lg:col-span-7"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        animate={reduce ? {} : { rotate: hover ? 0 : -1.2, y: hover ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className="relative p-6 shadow-[0_40px_70px_-40px_rgba(58,35,24,0.65)] sm:p-10"
          style={{
            backgroundColor: "#FFFBF3",
            color: cocoa,
            backgroundImage:
              "radial-gradient(rgba(58,35,24,0.04) 1px, transparent 1px), radial-gradient(rgba(58,35,24,0.03) 1px, transparent 1px)",
            backgroundSize: "7px 7px, 13px 13px",
            backgroundPosition: "0 0, 3px 5px",
          }}
        >
          <div className="pointer-events-none absolute inset-3 border sm:inset-4" style={{ borderColor: `${cocoa}33` }} />
          <div className="pointer-events-none absolute inset-[18px] border sm:inset-[22px]" style={{ borderColor: `${cocoa}1A` }} />

          <div className="relative text-center">
            <LogoMark slug="bakery-cafe" color={cocoa} accent={crust} className="mx-auto h-10 w-10" />
            <p className="mt-2 text-4xl sm:text-5xl" style={{ fontFamily: serif }}>Crumb &amp; Co.</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.35em] opacity-60">Bakehouse &amp; Café · Bandra</p>
            <p className="mt-4 text-3xl" style={{ fontFamily: script, color: crust }}>~ the menu ~</p>
          </div>

          <div className="relative mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {printed.map((cat) => (
              <div key={cat}>
                <p className="border-b pb-1 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ borderColor: `${cocoa}33`, color: crust }}>
                  {cat}
                </p>
                <ul className="mt-2.5 space-y-2.5">
                  {menu
                    .filter((i) => i.category === cat)
                    .slice(0, 4)
                    .map((item) => (
                      <li key={item.id}>
                        <div className="flex items-baseline gap-1.5 text-[15px]">
                          <span style={{ fontFamily: serif }}>{item.name}</span>
                          {item.signature && <Star size={10} fill={crust} stroke={crust} />}
                          <span className="flex-1 translate-y-[-3px] border-b border-dotted" style={{ borderColor: `${cocoa}4D` }} />
                          <span className="text-sm font-semibold">{inr(item.price)}</span>
                        </div>
                        <p className="text-[11px] italic opacity-60">
                          {item.note}
                          {item.diet.length > 0 && <span className="not-italic"> · {item.diet.join(" ")}</span>}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative mt-6 flex flex-wrap items-end justify-between gap-3">
            <p className="text-[10px] opacity-50">
              {Object.entries(dietary)
                .map(([k, v]) => `${k} ${v.toLowerCase()}`)
                .join(" · ")}{" "}
              · ★ signature
            </p>
            <p className="-rotate-3 text-2xl leading-none" style={{ fontFamily: script, color: crust }}>
              ask about today&apos;s specials →
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">Printed menu · A4, uncoated stock</p>
      </motion.div>

      <div className="flex flex-col gap-6 lg:col-span-5">
        {/* Chalkboard */}
        <div className="rounded-xl p-2.5 shadow-[0_30px_50px_-30px_rgba(0,0,0,0.6)]" style={{ background: "linear-gradient(135deg, #8a5a36, #6b4226 60%, #7c4f2e)" }}>
          <div
            className="relative overflow-hidden rounded-md p-5 sm:p-6"
            style={{
              backgroundColor: "#2A302B",
              backgroundImage:
                "radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.07), transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(255,255,255,0.05), transparent 45%)",
              color: "#F4EFE6",
              fontFamily: script,
            }}
          >
            <div className="flex flex-wrap gap-1">
              {specials.map((s, i) => (
                <button
                  key={s.day}
                  onClick={() => setDay(i)}
                  aria-pressed={day === i}
                  className="rounded-full px-2.5 py-0.5 text-lg leading-tight transition-colors"
                  style={day === i ? { backgroundColor: butter, color: cocoa } : { color: "rgba(244,239,230,0.6)" }}
                >
                  {s.day}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={day} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-4">
                <p className="text-4xl leading-none" style={{ color: butter }}>Today&apos;s specials</p>
                <ul className="mt-4 space-y-2.5">
                  {special.items.map((it, i) => (
                    <motion.li
                      key={it.name}
                      initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.25, ease: "easeOut" }}
                      className="flex items-baseline justify-between gap-3 text-2xl leading-tight"
                    >
                      <span>{it.name}</span>
                      <span style={{ color: butter }}>{inr(it.price)}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.p
                  initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.7, delay: 0.95 }}
                  className="mt-4 -rotate-1 text-xl"
                  style={{ color: "#B9D3A0" }}
                >
                  {special.note}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            {/* chalk tray */}
            <div className="pointer-events-none absolute bottom-2 right-4 flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full bg-white/70" />
              <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: butter }} />
            </div>
          </div>
        </div>
        <p className="-mt-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">Daily chalkboard · tap a day</p>

        {/* QR table card */}
        <div className="flex items-center gap-5 rounded-2xl p-5" style={{ backgroundColor: flour, color: cocoa, boxShadow: `inset 0 0 0 1px ${cocoa}1A` }}>
          <div className="relative shrink-0 rounded-xl bg-white p-2.5 shadow-sm">
            <div className="grid h-28 w-28 sm:h-32 sm:w-32" style={{ gridTemplateColumns: `repeat(${qr.size}, 1fr)` }}>
              {qr.cells.map((on, i) => (
                <span key={i} style={{ backgroundColor: on ? cocoa : "transparent" }} />
              ))}
            </div>
            <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-white">
              <LogoMark slug="bakery-cafe" color={cocoa} accent={crust} className="h-6 w-6" />
            </span>
            {!reduce && (
              <motion.span
                className="pointer-events-none absolute inset-x-2 h-0.5 rounded-full"
                style={{ backgroundColor: crust, boxShadow: `0 0 12px ${crust}` }}
                animate={{ top: ["12%", "88%", "12%"] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
          <div>
            <p className="text-3xl leading-none" style={{ fontFamily: script, color: crust }}>table 07</p>
            <p className="mt-1 text-2xl leading-tight" style={{ fontFamily: serif }}>Scan to order — skip the queue.</p>
            <p className="mt-2 text-xs opacity-65">Your order lands at the counter and we bring it over, warm.</p>
            <span className="mt-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold" style={{ backgroundColor: `${pistachio}33`, color: "#4f5a35" }}>
              Same menu as the website
            </span>
          </div>
        </div>
        <p className="-mt-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink/40">Table card · decorative QR</p>
      </div>
    </div>
  );
}
