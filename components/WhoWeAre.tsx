"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Gauge, MapPin, Sparkles, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/* ───────────── Statement ───────────── */

type Seg =
  | { t: string }
  | { t: string; mark: string }
  | { img: string; alt: string; logo?: boolean };

// The sentence, with inline photo pills and highlighted words.
const statement: Seg[] = [
  { t: "An independent studio in Faridabad, India" },
  { img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=70", alt: "The team at work" },
  { t: "crafting" },
  { t: "websites", mark: "bg-lime" },
  { img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&q=70", alt: "A website on screen" },
  { t: "," },
  { t: "apps", mark: "bg-lilac" },
  { img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=70", alt: "A mobile app" },
  { t: "and" },
  { t: "brands", mark: "bg-sky" },
  { img: "/webtoplogo.png", alt: "Rêvera logo", logo: true },
  { t: "that people remember." },
];

// Flatten into words so each one can light up on its own as you scroll.
type Token = { kind: "word"; text: string; mark?: string } | { kind: "img"; seg: Extract<Seg, { img: string }> };
const tokens: Token[] = statement.flatMap((seg): Token[] => {
  if ("img" in seg) return [{ kind: "img", seg }];
  const mark = "mark" in seg ? seg.mark : undefined;
  return seg.t.split(" ").map((w) => ({ kind: "word", text: w, mark }));
});

// Every inline-block in the statement resets `text-indent` (indent-0):
// it's inherited, and would otherwise shove each word right by a % of itself.
function Word({
  token,
  i,
  total,
  progress,
}: {
  token: Extract<Token, { kind: "word" }>;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = i / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.15, 1]);
  const markScale = useTransform(progress, [start, start + 2 / total], [0, 1]);
  // A lone comma hugs the word before it.
  const tight = token.text === ",";

  return (
    <motion.span style={{ opacity }} className={`relative isolate inline-block indent-0 ${tight ? "-ml-[0.25em]" : ""}`}>
      {token.mark && (
        <motion.span
          aria-hidden
          style={{ scaleX: markScale }}
          className={`absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.42em] -z-10 origin-left -skew-x-6 rounded-[0.15em] ${token.mark}`}
        />
      )}
      {token.text}
    </motion.span>
  );
}

function Pill({ seg }: { seg: Extract<Seg, { img: string }> }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      whileHover={reduce ? {} : { width: "2.9em", rotate: -3 }}
      whileTap={reduce ? {} : { scale: 0.9, rotate: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`relative inline-block h-[0.82em] w-[1.7em] translate-y-[0.1em] indent-0 overflow-hidden rounded-full align-baseline ring-2 ring-canvas shadow-[0_8px_20px_-10px_rgba(10,10,10,0.6)] ${
        seg.logo ? "bg-black" : "bg-ivory"
      }`}
    >
      <Image
        src={seg.img}
        alt={seg.alt}
        fill
        sizes="160px"
        className={seg.logo ? "object-contain p-[14%]" : "object-cover"}
      />
    </motion.span>
  );
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const words = tokens.filter((t) => t.kind === "word").length;
  let w = -1;

  return (
    <p
      ref={ref}
      className="font-sans text-[8.4vw] font-normal leading-[1.08] tracking-[-0.05em] text-ink sm:text-[5.6vw] lg:indent-[18%] lg:text-[4.4vw] xl:text-[4vw]"
    >
      {tokens.map((tok, i) => {
        if (tok.kind === "img") return <Pill key={i} seg={tok.seg} />;
        w += 1;
        return reduce ? (
          <span key={i} className={`relative isolate inline-block indent-0 ${tok.text === "," ? "-ml-[0.25em]" : ""}`}>
            {tok.mark && (
              <span aria-hidden className={`absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.42em] -z-10 -skew-x-6 rounded-[0.15em] ${tok.mark}`} />
            )}
            {tok.text}
          </span>
        ) : (
          <Word key={i} token={tok} i={w} total={words} progress={scrollYProgress} />
        );
      }).flatMap((node, i) => (i === 0 ? [node] : [" ", node]))}
    </p>
  );
}

/* ───────────── Reasons ───────────── */

const reasons = [
  {
    no: "01",
    title: "Taste is a strategy",
    body: "Craft is our competitive advantage. The details others skip are the ones your customers feel.",
    icon: Sparkles,
    tile: "bg-[#151515] text-canvas",
    sticker: "bg-lime text-ink",
    muted: "text-canvas/60",
  },
  {
    no: "02",
    title: "One team, end to end",
    body: "Strategy, design, film and engineering in one room. No hand-offs, no lost intent.",
    icon: Users,
    tile: "bg-lime text-ink",
    sticker: "bg-ink text-lime",
    muted: "text-ink/70",
  },
  {
    no: "03",
    title: "Built to perform",
    body: "Beautiful is the baseline. Everything we ship is measured against outcomes that matter.",
    icon: Gauge,
    tile: "bg-lilac text-ink",
    sticker: "bg-ink text-lilac",
    muted: "text-ink/70",
  },
];

const CYCLE_MS = 3500;

// Phones: one card that cycles through the reasons, story-style.
function ReasonCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % reasons.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [i, reduce]);

  const r = reasons[i];
  const Icon = r.icon;

  return (
    <button
      type="button"
      onClick={() => setI((n) => (n + 1) % reasons.length)}
      aria-label={`Reason ${i + 1} of ${reasons.length}: ${r.title}. Tap for next.`}
      className={`relative flex min-h-[14rem] w-full flex-col overflow-hidden rounded-[1.75rem] p-6 text-left transition-colors duration-500 ease-expo ${r.tile}`}
    >
      <div className="flex gap-1.5">
        {reasons.map((_, n) => (
          <span key={n} className="relative h-1 flex-1 overflow-hidden rounded-full">
            <span className="absolute inset-0 bg-current opacity-20" />
            <motion.span
              key={`${n}-${i}`}
              className="absolute inset-0 origin-left bg-current"
              initial={{ scaleX: n < i ? 1 : 0 }}
              animate={{ scaleX: n <= i ? 1 : 0 }}
              transition={n === i && !reduce ? { duration: CYCLE_MS / 1000, ease: "linear" } : { duration: 0 }}
            />
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={r.no}
          initial={reduce ? false : { opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={reduce ? {} : { opacity: 0, x: -40, rotate: -2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex flex-1 flex-col"
        >
          <div className="flex items-center justify-between">
            <span className={`flex h-11 w-11 -rotate-6 items-center justify-center rounded-2xl ${r.sticker}`}>
              <Icon size={19} />
            </span>
            <span className="font-display text-base opacity-50">
              {r.no} / 0{reasons.length}
            </span>
          </div>
          <h3 className="mt-5 font-display text-3xl font-medium tracking-tight">{r.title}</h3>
          <p className={`mt-2 text-pretty text-sm leading-relaxed ${r.muted}`}>{r.body}</p>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

/* ───────────── Section ───────────── */

export default function WhoWeAre() {
  const reduce = useReducedMotion();

  return (
    <section id="studio" aria-label="Who we are" className="relative bg-canvas py-20 lg:py-36">
      <span id="about" className="absolute -top-20" aria-hidden />
      <div className="container-x">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Label column */}
          <div className="flex items-center justify-between lg:col-span-3 lg:flex-col lg:items-start lg:justify-start lg:gap-6 lg:pt-4">
            <Reveal>
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                Who we are
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="inline-flex rotate-3 items-center gap-1.5 rounded-full bg-[#151515] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
                <MapPin size={12} />
                Founder-led · India
              </span>
            </Reveal>
          </div>

          {/* Statement + actions */}
          <div className="lg:col-span-9">
            <Statement />

            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-sm font-semibold text-canvas transition-colors duration-300 hover:bg-accent"
              >
                See our work
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas/15 transition-all duration-300 group-hover:rotate-45 group-hover:bg-lime group-hover:text-ink">
                  <ArrowUpRight size={14} />
                </span>
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
              >
                Start a project
                <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>

        {/* Reasons — tiles on tablet/desktop, a cycling card on phones */}
        <div className="mt-14 lg:mt-24">
          <div className="sm:hidden">
            <Reveal>
              <ReasonCycler />
            </Reveal>
          </div>
          <div className="hidden grid-cols-3 gap-4 sm:grid lg:gap-5">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.no} delay={i * 0.08}>
                  <motion.div
                    whileHover={reduce ? {} : { y: -8, rotate: i % 2 ? 1.2 : -1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex h-full flex-col rounded-[2rem] p-7 lg:p-8 ${r.tile}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`flex h-12 w-12 -rotate-6 items-center justify-center rounded-2xl ${r.sticker}`}>
                        <Icon size={20} />
                      </span>
                      <span className="font-display text-lg opacity-50">{r.no}</span>
                    </div>
                    <h3 className="mt-10 font-display text-3xl font-medium tracking-tight">{r.title}</h3>
                    <p className={`mt-3 text-pretty text-base leading-relaxed ${r.muted}`}>{r.body}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
