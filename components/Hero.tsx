"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/*
 * Hero: white page, a rounded "stage" that loops a short motion-graphics
 * reel, and the headline sitting in a stepped white tab cut into the
 * stage's top-left corner (desktop). On mobile the tab and stage stack.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const DARK = "#17120F";
const LIGHT = "#F1EEE9";

const cornerDesktop = {
  background: "radial-gradient(circle at 100% 100%, transparent 27.5px, #FAFAF8 28px)",
};

const cornerMobile = {
  background: "radial-gradient(circle at 100% 100%, transparent 11.5px, #FAFAF8 12px)",
};

function TabRow({
  children,
  first = false,
  last = false,
  className = "",
}: {
  children: ReactNode;
  first?: boolean;
  last?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-fit rounded-br-[12px] sm:rounded-br-[28px] bg-canvas pl-5 pr-5 sm:pl-8 lg:pl-14 lg:pr-8 ${className}`}>
      {children}
      <span aria-hidden className="hidden sm:block absolute left-full top-0 h-7 w-7" style={cornerDesktop} />
      {!first && <span aria-hidden className="sm:hidden absolute left-full top-0 h-3 w-3" style={cornerMobile} />}
      {last && (
        <>
          <span aria-hidden className="hidden sm:block absolute left-0 top-full h-7 w-7" style={cornerDesktop} />
          <span aria-hidden className="sm:hidden absolute left-0 top-full h-3 w-3" style={cornerMobile} />
        </>
      )}
    </div>
  );
}

/* ───────────── Shared pieces ───────────── */

// The logo tile carries a shared layoutId, so it glides from scene to scene
// instead of popping — that's what makes the reel read as one continuous take.
function Logo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      layoutId="rv-logo"
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`relative shrink-0 overflow-hidden rounded-[22%] bg-black shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] ${className}`}
    >
      <Image src="/webtoplogo.png" alt="" fill sizes="160px" className="object-contain p-[12%]" />
    </motion.div>
  );
}

const driftWords = ["Websites", "Apps", "Brands", "AI", "Films", "Strategy"];

// Giant outlined words that never stop scrolling behind every scene.
function BgDrift({ dark }: { dark: boolean }) {
  const stroke = dark ? "rgba(250,250,248,0.07)" : "rgba(10,10,10,0.06)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-around overflow-hidden">
      {[0, 1].map((row) => (
        <div
          key={row}
          className={`flex w-max ${row ? "animate-marquee-reverse" : "animate-marquee"}`}
          style={{ "--marquee-duration": row ? "70s" : "55s" } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="whitespace-nowrap pr-12 font-sans text-[15vw] font-extrabold leading-none tracking-[-0.05em] text-transparent sm:text-[20vw] lg:text-[12vw]"
              style={{ WebkitTextStroke: `2px ${stroke}` }}
            >
              {driftWords.join(" ✦ ")} ✦{" "}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ───────────── Scenes ───────────── */

function SceneWordmark() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[30, 70].map((top, i) => (
        <div key={top} className="absolute inset-x-0 flex items-center" style={{ top: `${top}%` }}>
          <motion.span
            className="h-[3px] w-[64%] origin-left bg-canvas/90"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
          />
          <motion.span
            className="flex items-center gap-1.5 px-1.5"
            initial={{ opacity: 0, y: i ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <span className="h-6 w-2.5 bg-lime" />
            <span className="h-6 w-2.5 bg-lilac" />
            {i === 0 ? <Logo className="h-10 w-10 sm:h-12 sm:w-12" /> : <span className="h-6 w-6 bg-canvas" />}
          </motion.span>
          <span className="h-0 flex-1 border-t-[3px] border-dashed border-canvas/80" />
        </div>
      ))}
      {/* Shifted right on desktop so the white tab doesn't cover the start of the word */}
      <div className="absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-[10%] lg:pr-[15%] overflow-hidden">
        <motion.span
          className="whitespace-nowrap font-sans text-[11vw] font-semibold leading-none tracking-[-0.05em] text-canvas sm:text-[9vw] lg:text-[7.5vw]"
          initial={{ x: "70%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }} 
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Rêvera Studios
        </motion.span>
      </div>
    </div>
  );
}

// A site (and its app) assembling itself, with a cursor that clicks "Launch".
function SceneBuild() {
  const pop = (delay: number) => ({
    initial: { opacity: 0, y: 14, scale: 0.92 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring" as const, stiffness: 240, damping: 20, delay },
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 p-4 sm:gap-5 lg:justify-end lg:pr-[7%]">
      {/* Floating Status Badge (Fills the top-left void on mobile) */}
      <motion.div
        className="absolute left-[8%] top-[38%] z-10 flex items-center gap-2 rounded-full border border-canvas/10 bg-[#221C19] px-3 py-1.5 shadow-2xl sm:left-[15%] sm:top-[25%] lg:left-[25%] lg:top-[20%]"
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.8 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime"></span>
        </span>
        <span className="font-mono text-[9px] font-medium text-canvas/80 sm:text-[10px]">Deploying...</span>
      </motion.div>

      {/* Floating UI Component (Enhances the scene globally) */}
      <motion.div
        className="absolute right-[5%] top-[15%] z-10 hidden aspect-square w-12 flex-col gap-1.5 rounded-xl border border-canvas/10 bg-[#221C19] p-2 shadow-2xl sm:flex lg:right-[3%] lg:w-16"
        initial={{ opacity: 0, scale: 0.8, y: -20, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 2.1 }}
      >
        <span className="h-1/2 w-full rounded-md bg-lilac/90" />
        <span className="h-1.5 w-3/4 rounded-full bg-canvas/30" />
        <span className="h-1.5 w-1/2 rounded-full bg-canvas/30" />
      </motion.div>

      {/* Browser */}
      <motion.div
        className="relative flex aspect-[16/10] w-[70%] flex-col overflow-hidden rounded-xl bg-[#221C19] ring-1 ring-canvas/10 sm:w-[60%] lg:w-[44%]"
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="flex items-center gap-1.5 border-b border-canvas/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-canvas/25" />
          <span className="h-2 w-2 rounded-full bg-canvas/25" />
          <span className="h-2 w-2 rounded-full bg-canvas/25" />
          <span className="ml-2 rounded-full bg-canvas/10 px-3 py-0.5 text-[9px] text-canvas/60 sm:text-[10px]">
            yourbrand.com
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-[5%] p-[4%]">
          <motion.div {...pop(0.3)} className="flex items-center justify-between">
            <Logo className="h-5 w-5 rounded-md sm:h-6 sm:w-6" />
            <span className="flex gap-1.5">
              <span className="h-2 w-6 rounded-full bg-canvas/25" />
              <span className="h-2 w-6 rounded-full bg-canvas/25" />
              <span className="h-2 w-6 rounded-full bg-canvas/25" />
            </span>
          </motion.div>
          <motion.div {...pop(0.6)} className="relative flex flex-[1.3] flex-col justify-center gap-[8%] rounded-lg bg-lime px-[5%]">
            <span className="h-[14%] w-[62%] rounded-full bg-ink/85" />
            <span className="h-[14%] w-[44%] rounded-full bg-ink/85" />
            <motion.span
              className="mt-[2%] flex h-[20%] w-[26%] items-center justify-center rounded-full text-[8px] font-bold sm:text-[10px]"
              initial={{ backgroundColor: "#0A0A0A", color: "#FAFAF8" }}
              animate={{ backgroundColor: ["#0A0A0A", "#0A0A0A", "#FAFAF8"], color: ["#FAFAF8", "#FAFAF8", "#0A0A0A"] }}
              transition={{ duration: 2.6, times: [0, 0.92, 1] }}
            >
              Launch
            </motion.span>
          </motion.div>
          <div className="flex flex-1 gap-[4%]">
            {["bg-lilac", "bg-sky", "bg-pink"].map((c, i) => (
              <motion.span key={c} {...pop(0.95 + i * 0.12)} className={`flex-1 rounded-lg ${c}`} />
            ))}
          </div>
        </div>
        {/* Cursor */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute h-5 w-5 drop-shadow sm:h-6 sm:w-6"
          initial={{ left: "88%", top: "92%", opacity: 0 }}
          animate={{ left: ["88%", "88%", "20%", "20%"], top: ["92%", "92%", "64%", "64%"], opacity: [0, 1, 1, 1], scale: [1, 1, 1, 0.8] }}
          transition={{ duration: 2.6, times: [0, 0.35, 0.85, 1], ease: "easeInOut" }}
        >
          <path d="M4 2l16 9-7 2-3 7z" fill="#FAFAF8" stroke="#0A0A0A" strokeWidth="1.5" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      {/* Phone */}
      <motion.div
        className="flex aspect-[9/18] w-[20%] flex-col gap-[6%] overflow-hidden rounded-[1.1rem] bg-[#221C19] p-[2.5%] ring-1 ring-canvas/10 sm:w-[16%] lg:w-[11%]"
        initial={{ opacity: 0, y: 60, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ type: "spring", stiffness: 140, damping: 16, delay: 1.2 }}
      >
        <span className="mx-auto mt-[4%] h-1 w-1/3 rounded-full bg-canvas/25" />
        <motion.span {...pop(1.5)} className="h-[22%] rounded-lg bg-lilac" />
        {[0, 1, 2].map((n) => (
          <motion.span key={n} {...pop(1.65 + n * 0.12)} className="flex h-[12%] items-center gap-[8%] rounded-lg bg-canvas/10 px-[8%]">
            <span className="aspect-square h-1/2 rounded-full bg-lime" />
            <span className="h-[18%] flex-1 rounded-full bg-canvas/40" />
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

const swatches = [
  { c: "bg-lime", hex: "#DCFC5A" },
  { c: "bg-lilac", hex: "#927FF7" },
  { c: "bg-sky", hex: "#8EDCFB" },
  { c: "bg-ink", hex: "#0A0A0A" },
];

// A brand kit snapping together around the logo.
function SceneBrand() {
  return (
    <div className="absolute inset-0 p-4 sm:flex sm:items-center sm:justify-center sm:gap-6 sm:p-6 lg:justify-end lg:pr-[8%]">
      {/* Type Card (Top Right on Mobile) */}
      <motion.div
        drag
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="absolute right-4 top-[28%] z-20 flex cursor-grab flex-col items-center justify-center rounded-2xl bg-white/60 px-5 py-4 shadow-lg ring-1 ring-ink/5 backdrop-blur-md sm:static sm:px-8 sm:py-6 lg:top-auto lg:right-auto"
        initial={{ opacity: 0, y: -20, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <span className="pointer-events-none font-display text-5xl italic leading-none text-ink sm:text-6xl lg:text-7xl">Aa</span>
        <span className="pointer-events-none mt-3 rounded-full bg-ink/5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink/50 sm:text-[10px]">Typography</span>
      </motion.div>

      {/* Logo Center (Bottom Left on Mobile) */}
      <div className="absolute bottom-[24%] left-[8%] z-10 flex flex-col items-center sm:static lg:bottom-auto lg:left-auto">
        <Logo className="h-24 w-24 shadow-2xl sm:h-36 sm:w-36 lg:h-44 lg:w-44" />
        <motion.span
          className="absolute -right-5 -top-5 font-display text-4xl text-brand sm:text-5xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 12 }}
          transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.5 }}
        >
          ✦
        </motion.span>
        <motion.span
          className="absolute -bottom-4 -left-4 font-display text-3xl text-lime sm:text-4xl"
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.7 }}
        >
          ✦
        </motion.span>
      </div>

      {/* Colors Card (Bottom Right on Mobile) */}
      <motion.div
        drag
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="absolute bottom-6 right-4 z-30 grid cursor-grab grid-cols-2 gap-2 rounded-2xl bg-white/60 p-3 shadow-lg ring-1 ring-ink/5 backdrop-blur-md sm:static sm:gap-4 sm:p-5 lg:bottom-auto lg:right-auto"
        initial={{ opacity: 0, y: 40, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.35 }}
      >
        {swatches.map((sw, i) => (
          <motion.div
            key={sw.hex}
            className="pointer-events-none flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 + i * 0.1 }}
          >
            <span className={`h-10 w-10 rounded-full shadow-inner ring-1 ring-ink/10 sm:h-12 sm:w-12 ${sw.c}`} />
            <span className="font-mono text-[9px] font-medium text-ink/60 sm:text-[10px]">{sw.hex}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const services = [
  ["Web / App", "Development"],
  ["Brand", "Identity"],
  ["AI", "Automation"],
  ["Cinematic", "Films"],
];
const chips = ["Websites", "Mobile Apps", "Brand Identity", "UI/UX", "AI Automation", "SEO", "Films", "Strategy"];
const chipColors = ["bg-lime", "bg-lilac", "bg-sky", "bg-pink"];

function SceneServices() {
  return (
    <div className="absolute inset-0">
      {/* Drifting chip strip across the top */}
      <div className="absolute inset-x-0 top-[6%] overflow-hidden lg:top-[46%]">
        <motion.div
          className="flex w-max gap-2 sm:gap-3"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
        >
          {[...chips, ...chips].map((c, i) => (
            <span
              key={i}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold text-ink sm:text-sm ${chipColors[i % chipColors.length]}`}
            >
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Sticker: top-left on phones, top-right on desktop (the tab covers top-left) */}
      <motion.span
        className="absolute left-5 top-[24%] inline-flex -rotate-6 items-center gap-2 rounded-full bg-ink px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-lime shadow-lg lg:left-auto lg:right-[6%] lg:top-[14%]"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.4 }}
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
        Open for projects
      </motion.span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-5 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-12">
        <div className="flex items-end gap-4 sm:gap-5">
          <Logo className="h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
          >
            <p className="font-sans text-xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">Rêvera Studios</p>
            <p className="mt-1 max-w-[16rem] text-sm leading-snug text-ink/60 sm:text-base">
              Creative technology for modern brands.
            </p>
          </motion.div>
        </div>
        <div className="hidden grid-cols-2 gap-x-8 gap-y-4 sm:grid lg:gap-x-12">
          {services.map(([a, b], i) => (
            <motion.p
              key={a}
              className="font-sans leading-[1.05] tracking-[-0.03em] text-ink"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: EASE }}
            >
              <span className="block text-lg font-semibold sm:text-2xl lg:text-3xl">{a}</span>
              <span className="block text-base text-ink/60 sm:text-xl lg:text-2xl">{b}</span>
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}

// Each scene sets how long it holds before the next one takes over.
const scenes = [
  { key: "wordmark", bg: DARK, ms: 3600, el: <SceneWordmark /> },
  { key: "services", bg: LIGHT, ms: 4400, el: <SceneServices /> },
  { key: "build", bg: DARK, ms: 4200, el: <SceneBuild /> },
  // { key: "brand", bg: LIGHT, ms: 3400, el: <SceneBrand /> },
];

/* ───────────── Hero ───────────── */

const headline =
  "font-sans text-[8vw] font-normal leading-[1] tracking-[-0.055em] text-ink sm:text-[6.4vw] lg:text-[5vw]";

// One line per tab row; each is shorter than the one above so the tab steps in.
const lines = ["Creative house for", "brands people", "remember."];

export default function Hero() {
  const reduce = useReducedMotion();
  const [s, setS] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setS((n) => (n + 1) % scenes.length), scenes[s].ms);
    return () => clearTimeout(t);
  }, [s, reduce]);

  // Reduced motion: hold on the build scene.
  const active = reduce ? 1 : s;
  const scene = scenes[active];

  return (
    <section id="top" className="relative overflow-x-clip bg-canvas pb-6 pt-24 lg:pt-28">
      <div className="container-x">
        <div className="relative h-[34rem] sm:h-[calc(100svh-7.5rem)] sm:min-h-[560px] lg:h-[calc(100svh-8.5rem)] lg:min-h-[620px]">
          {/* Headline tab — stepped, cut into the stage's top-left corner */}
          <div className="absolute -left-px -top-px z-20">
            <h1 className="sr-only">Creative house for brands people remember.</h1>
            {lines.map((line, i) => {
              const first = i === 0;
              const last = i === lines.length - 1;
              return (
                <TabRow key={line} first={first} last={last} className={i === 0 ? "pt-4 lg:pt-6" : last ? "-mt-px pb-5 lg:pb-7" : "-mt-px"}>
                  {i === 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="mb-3 flex items-center gap-2 text-xs font-medium text-ink/70 sm:text-sm lg:mb-4"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                      Rêvera Studios
                    </motion.p>
                  )}
                  <p aria-hidden className={headline}>
                    <span className="mask-line">
                      <motion.span
                        className="block whitespace-nowrap pb-[0.1em]"
                        initial={reduce ? false : { y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  </p>
                  {last && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
                      className="mt-4 flex flex-col items-start gap-3 lg:mt-5 lg:flex-row lg:items-center lg:gap-5 -ml-1 sm:ml-0"
                    >
                      <a
                        href="/work"
                        className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-ink py-1.5 pl-4 pr-1.5 sm:py-2 sm:pl-5 sm:pr-2 text-xs sm:text-sm font-semibold text-canvas transition-colors duration-300 hover:bg-accent"
                      >
                        View our work
                        <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-canvas/15 transition-all duration-300 group-hover:rotate-45 group-hover:bg-lime group-hover:text-ink">
                          <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </span>
                      </a>
                      <a href="#contact" className="group inline-flex items-center gap-1.5 pl-1 text-sm font-semibold text-ink lg:pl-0">
                        <span className="relative">
                          Start a project
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </motion.div>
                  )}
                </TabRow>
              );
            })}
          </div>

          {/* Stage */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, backgroundColor: scene.bg }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 1, ease: EASE },
              backgroundColor: { duration: 0.6 },
            }}
            style={{ backgroundColor: scenes[0].bg }}
            className="absolute inset-0 overflow-hidden rounded-[28px]"
          >
            <BgDrift dark={scene.bg === DARK} />
            <MotionConfig reducedMotion="user">
              <LayoutGroup>
                <AnimatePresence mode="sync">
                  <motion.div
                    key={scene.key}
                    className="absolute inset-x-0 bottom-0 top-[50%] sm:top-[40%] lg:top-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {scene.el}
                  </motion.div>
                </AnimatePresence>
              </LayoutGroup>
            </MotionConfig>

            {/* Scene progress */}
            <div
              className={`absolute right-6 top-6 z-10 hidden gap-1.5 lg:flex ${
                scene.bg === DARK ? "text-canvas" : "text-ink"
              }`}
            >
              {scenes.map((sc, i) => (
                <span
                  key={sc.key}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-6 bg-lime" : "w-1.5 bg-current opacity-30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
