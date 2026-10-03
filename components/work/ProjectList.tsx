"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { projects, Project } from "@/lib/data";

const stickers = ["bg-lime text-ink", "bg-lilac text-ink", "bg-sky text-ink", "bg-pink text-ink"];

/* ───────────── Small brand glyphs (lucide has no store logos) ───────────── */

function AppleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.37 12.77c-.02-2.16 1.77-3.2 1.85-3.25-1.01-1.47-2.58-1.67-3.13-1.7-1.33-.13-2.6.79-3.28.79-.68 0-1.72-.77-2.83-.75-1.45.02-2.8.85-3.55 2.15-1.52 2.63-.39 6.52 1.09 8.66.72 1.04 1.58 2.21 2.71 2.17 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.69.7 2.84.68 1.17-.02 1.91-1.06 2.63-2.11.83-1.21 1.17-2.38 1.19-2.44-.03-.01-2.28-.88-2.34-3.5zM14.2 6.42c.6-.73 1.01-1.74.9-2.75-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.22z" />
    </svg>
  );
}

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4.2 2.6 13.6 12l-9.4 9.4c-.3-.2-.5-.6-.5-1.1V3.7c0-.5.2-.9.5-1.1z" fill="#8EDCFB" />
      <path d="m16.6 15-3-3 3-3 3.5 2c1 .6 1 1.4 0 2z" fill="#DCFC5A" />
      <path d="M13.6 12 4.2 21.4c.4.2.9.2 1.4-.1L16.6 15z" fill="#FFA8D4" />
      <path d="M13.6 12 16.6 9 5.6 2.7c-.5-.3-1-.3-1.4-.1z" fill="#C4B5FD" />
    </svg>
  );
}

function AndroidGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6 9h12v8a1 1 0 0 1-1 1h-1v3h-2v-3h-4v3H8v-3H7a1 1 0 0 1-1-1zm-2.5 0A1.5 1.5 0 0 1 5 10.5v5a1.5 1.5 0 0 1-3 0v-5A1.5 1.5 0 0 1 3.5 9zm17 0a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-3 0v-5A1.5 1.5 0 0 1 20.5 9zM15.5 3.1l1-1.6.8.5-1 1.6A6 6 0 0 1 18 8H6a6 6 0 0 1 1.7-4.4l-1-1.6.8-.5 1 1.6a6 6 0 0 1 7 0zM9.5 5.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
    </svg>
  );
}

const platformIcon = {
  Web: <Globe size={13} />,
  iOS: <AppleGlyph className="h-3.5 w-3.5" />,
  Android: <AndroidGlyph className="h-3.5 w-3.5" />,
};

/* ───────────── Count-up for numeric results ("50%", "10") ───────────── */

function ResultValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const [shown, setShown] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduce) return setShown(value);
    const target = Number(match[1]);
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(`${Math.round(v)}${match[2]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}

/* ───────────── Card ───────────── */

const domainOf = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const reduce = useReducedMotion();
  const external = project.href.startsWith("http");
  const isApp = project.platforms?.some((p) => p !== "Web");

  // Pointer-follow tilt (mouse only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });
  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/10 shadow-[0_30px_60px_-45px_rgba(10,10,10,0.6)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(10,10,10,0.55)]"
    >
      {/* Device stage */}
      <div className="relative bg-[#F1EEE9] p-3 sm:p-4">
        {/* Browser frame */}
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
          <div className="flex items-center gap-1.5 border-b border-ink/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="ml-2 truncate rounded-full bg-ink/[0.05] px-3 py-0.5 text-[10px] text-ink/55">
              {domainOf(project.href)}
            </span>
          </div>
          {/* Screenshot pans top → bottom on hover, like scrolling the live site */}
          <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-[object-position] duration-[3500ms] ease-in-out group-hover:object-bottom"
            />
          </div>
        </div>

        {/* Phone mock for app projects — peeks out, rises on hover */}
        {isApp && (
          <div className="absolute -bottom-2 right-5 w-[22%] translate-y-[18%] transition-transform duration-700 ease-expo group-hover:translate-y-[2%] group-hover:-rotate-3 sm:right-7">
            <div className="overflow-hidden rounded-[0.9rem] bg-ink p-[5%] shadow-[0_18px_30px_-14px_rgba(10,10,10,0.6)]">
              <div className="relative aspect-[9/18] overflow-hidden rounded-[0.6rem] bg-ivory">
                <Image src={project.image} alt="" fill sizes="120px" className="object-cover object-left-top" />
              </div>
            </div>
          </div>
        )}

        <span
          className={`absolute left-6 top-12 flex h-12 w-12 -rotate-12 items-center justify-center rounded-full font-display text-base font-medium shadow-lg transition-transform duration-500 ease-expo group-hover:rotate-6 group-hover:scale-110 sm:left-7 sm:top-14 sm:h-14 sm:w-14 sm:text-lg ${stickers[i % stickers.length]}`}
        >
          {project.index}
        </span>
        <span className="absolute right-6 top-12 flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-ink shadow-md transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-ink group-hover:text-lime sm:right-7 sm:top-14 sm:h-11 sm:w-11">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {project.platforms?.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1 text-[11px] font-semibold text-ink/75"
            >
              {platformIcon[p]}
              {p}
            </span>
          ))}
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone">· {project.year}</span>
        </div>

        <h3 className="mt-3 font-sans text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-stone">{project.sector}</p>
        {project.clientLabel && <p className="mt-1 text-sm text-stone">{project.clientLabel}</p>}

        {project.liveOnStores && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              Live
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-ink px-3 py-1.5 text-canvas transition-transform duration-300 group-hover:-translate-y-0.5">
              <AppleGlyph className="h-4 w-4" />
              <span className="leading-none">
                <span className="block text-[8px] uppercase tracking-[0.1em] text-canvas/60">Download on the</span>
                <span className="block text-xs font-semibold">App Store</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-ink px-3 py-1.5 text-canvas transition-transform delay-75 duration-300 group-hover:-translate-y-0.5">
              <PlayGlyph className="h-4 w-4" />
              <span className="leading-none">
                <span className="block text-[8px] uppercase tracking-[0.1em] text-canvas/60">Get it on</span>
                <span className="block text-xs font-semibold">Google Play</span>
              </span>
            </span>
          </div>
        )}

        <p className="mt-4 line-clamp-3 text-pretty text-base leading-relaxed text-ink/70">{project.story}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.services.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/12 px-3 py-1 text-[11px] text-ink/70 transition-colors duration-300 group-hover:border-ink/25"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Pinned to the card bottom, with at least 1.5rem above it */}
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {project.results.slice(0, 2).map((r) => (
                <div key={r.label}>
                  <p className="font-sans text-lg font-semibold tracking-[-0.03em] text-ink">
                    <ResultValue value={r.value} />
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-stone">{r.label}</p>
                </div>
              ))}
            </div>
            <span className="shrink-0 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
              {project.cta ?? "Visit Project"}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ───────────── Stats strip (header) ───────────── */

function Stat({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-ink/10">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full font-sans text-lg font-bold text-ink ${tone}`}>
        <ResultValue value={String(value)} />
      </span>
      <span className="text-sm font-semibold leading-tight text-ink">{label}</span>
    </div>
  );
}

export function WorkStats() {
  const apps = projects.filter((p) => p.platforms?.some((x) => x !== "Web")).length;
  const live = projects.filter((p) => p.liveOnStores).length;
  return (
    <div className="flex flex-wrap gap-3">
      <Stat value={projects.length} label="Projects shipped" tone="bg-lime" />
      <Stat value={apps} label="Mobile apps" tone="bg-lilac" />
      <Stat value={live} label="Live on App Store & Google Play" tone="bg-sky" />
    </div>
  );
}

/* ───────────── Grid ───────────── */

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
        >
          <ProjectCard project={p} i={i} />
        </motion.div>
      ))}
    </div>
  );
}
