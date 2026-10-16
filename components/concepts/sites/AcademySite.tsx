"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Laptop, Menu, Star, X } from "lucide-react";
import { unsplash } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { DemoDone, pick } from "@/components/concepts/sites/shared";

const tracks = ["Design", "Code", "Film", "Music"] as const;
type Track = (typeof tracks)[number];
const courses: { title: string; track: Track; weeks: number; mode: string; fee: string; level: string }[] = [
  { title: "Product Design Bootcamp", track: "Design", weeks: 12, mode: "Hybrid", fee: "₹68,000", level: "Beginner" },
  { title: "Brand & Visual Identity", track: "Design", weeks: 8, mode: "Online", fee: "₹42,000", level: "Intermediate" },
  { title: "Full-stack Web Development", track: "Code", weeks: 16, mode: "Hybrid", fee: "₹84,000", level: "Beginner" },
  { title: "App Development with React Native", track: "Code", weeks: 10, mode: "Online", fee: "₹56,000", level: "Intermediate" },
  { title: "Filmmaking & Editing", track: "Film", weeks: 12, mode: "On campus", fee: "₹72,000", level: "Beginner" },
  { title: "Music Production", track: "Music", weeks: 10, mode: "On campus", fee: "₹64,000", level: "All levels" },
];
const steps = ["Apply online", "Portfolio chat", "Offer & fee plan", "Start your batch"];

export default function AcademySite({ concept, page, go, m }: SiteProps) {
  const [paper, ink, cobalt, sun, coral] = concept.brand.palette.map((c) => c.hex);
  const font = concept.brand.displayFont;
  const trackColor: Record<Track, string> = { Design: cobalt, Code: ink, Film: coral, Music: sun };
  const [menu, setMenu] = useState(false);
  const [track, setTrack] = useState<"All" | Track>("All");
  const [course, setCourse] = useState(courses[0].title);
  const [who, setWho] = useState<"Student" | "Parent">("Student");
  const [done, setDone] = useState(false);

  const shown = courses.filter((c) => track === "All" || c.track === track);
  const apply = (title?: string) => {
    if (title) setCourse(title);
    setDone(false);
    go(2);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  const navLink = (label: string, i: number) => (
    <button
      key={label}
      onClick={() => {
        go(i);
        setMenu(false);
      }}
      className="rounded-full px-3 py-1.5 text-sm font-semibold transition-colors"
      style={page === i ? { backgroundColor: ink, color: paper } : { color: ink }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ backgroundColor: paper, color: ink, fontFamily: font }}>
      <header className="sticky top-0 z-20" style={{ backgroundColor: paper }}>
        <div className={`flex items-center justify-between ${pick(m, "px-5 py-4", "px-10 py-5")}`}>
          <button onClick={() => go(0)} className="flex items-center gap-2">
            <LogoMark slug="academy" color={ink} accent={sun} className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-[-0.04em]">brightpath</span>
          </button>
          {m ? (
            <button onClick={() => setMenu((v) => !v)} aria-label="Menu">
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          ) : (
            <nav className="flex items-center gap-2">
              {concept.website.pages.map(navLink)}
              <button onClick={() => apply()} className="ml-3 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-rotate-2" style={{ backgroundColor: cobalt }}>
                Apply now
              </button>
            </nav>
          )}
        </div>
        <AnimatePresence>
          {m && menu && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col items-start gap-1 overflow-hidden px-4 pb-4">
              {concept.website.pages.map(navLink)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {page === 0 && (
            <>
              <section className={`grid items-center gap-8 ${pick(m, "grid-cols-1 px-5 pb-10 pt-4", "grid-cols-2 px-10 pb-14 pt-8")}`}>
                <div>
                  <span className="inline-block -rotate-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: coral, color: "#fff" }}>
                    Spring admissions open
                  </span>
                  <h1 className={`mt-4 font-extrabold leading-[0.92] tracking-[-0.05em] ${pick(m, "text-5xl", "text-7xl")}`}>
                    Learn it by{" "}
                    <span className="relative inline-block">
                      <motion.span
                        className="absolute inset-x-[-0.05em] bottom-[0.05em] top-[0.45em] -z-0 origin-left -skew-x-6 rounded"
                        style={{ backgroundColor: sun }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <span className="relative">making it.</span>
                    </span>
                  </h1>
                  <p className="mt-5 max-w-md text-base leading-relaxed opacity-75">
                    Twelve-week creative courses taught by working designers, developers and filmmakers. Small cohorts, real briefs, a portfolio at the end.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => go(1)} className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: ink }}>
                      Explore courses <ArrowRight size={15} />
                    </button>
                    <button onClick={() => apply()} className="rounded-full border-2 px-6 py-3 text-sm font-bold" style={{ borderColor: ink }}>
                      Apply now
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2rem]">
                    <Image src={unsplash("1522202176988-66273c2fd55f", 1000)} alt="Brightpath students working together" fill sizes="450px" className="object-cover" />
                  </div>
                  <motion.span
                    className="absolute -bottom-4 -left-2 rounded-2xl px-4 py-3 text-sm font-bold shadow-xl"
                    style={{ backgroundColor: sun }}
                    animate={{ rotate: [-4, 2, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    92% placed in 6 months
                  </motion.span>
                </div>
              </section>
              <section className={`grid gap-3 ${pick(m, "grid-cols-2 px-5 pb-10", "grid-cols-4 px-10 pb-14")}`}>
                {tracks.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTrack(t);
                      go(1);
                    }}
                    className="group flex aspect-square flex-col justify-between rounded-[1.5rem] p-5 text-left transition-transform hover:-translate-y-1 hover:-rotate-1"
                    style={{ backgroundColor: trackColor[t], color: t === "Music" ? ink : paper }}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.15em] opacity-70">Track</span>
                    <span className="flex items-end justify-between text-3xl font-extrabold tracking-[-0.04em]">
                      {t}
                      <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                ))}
              </section>
              <section className={pick(m, "px-5 pb-12", "px-10 pb-16")}>
                <div className="rounded-[2rem] p-7" style={{ backgroundColor: ink, color: paper }}>
                  <div className="flex gap-1" style={{ color: sun }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className={`mt-4 font-semibold leading-snug tracking-[-0.02em] ${pick(m, "text-xl", "text-3xl")}`}>
                    “I walked in unsure what UX even was. Twelve weeks later I had three case studies and two job offers.”
                  </p>
                  <p className="mt-4 text-sm opacity-60">Rhea S. · Product Design, Autumn batch</p>
                </div>
              </section>
            </>
          )}

          {page === 1 && (
            <section className={pick(m, "px-5 py-8", "px-10 py-12")}>
              <h1 className={`font-extrabold tracking-[-0.05em] ${pick(m, "text-4xl", "text-6xl")}`}>Find your course</h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["All", ...tracks] as const).map((t) => (
                  <button key={t} onClick={() => setTrack(t)} className="rounded-full px-4 py-2 text-sm font-bold transition-all" style={track === t ? { backgroundColor: cobalt, color: "#fff", transform: "rotate(-2deg)" } : { backgroundColor: `${ink}0D` }}>
                    {t}
                  </button>
                ))}
              </div>
              <motion.div layout className={`mt-7 grid gap-4 ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                <AnimatePresence mode="popLayout">
                  {shown.map((c) => (
                    <motion.article
                      key={c.title}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1"
                      style={{ "--tw-ring-color": `${ink}14` } as React.CSSProperties}
                    >
                      <div className="h-2" style={{ backgroundColor: trackColor[c.track] }} />
                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: c.track === "Music" ? coral : trackColor[c.track] }}>
                            {c.track}
                          </span>
                          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: `${ink}0D` }}>{c.level}</span>
                        </div>
                        <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.03em]">{c.title}</h3>
                        <div className="mt-3 flex flex-wrap gap-4 text-xs opacity-70">
                          <span className="flex items-center gap-1"><Clock size={13} /> {c.weeks} weeks</span>
                          <span className="flex items-center gap-1"><Laptop size={13} /> {c.mode}</span>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-lg font-bold">{c.fee}</span>
                          <button onClick={() => apply(c.title)} className="rounded-full px-4 py-2 text-sm font-bold text-white" style={{ backgroundColor: ink }}>
                            Apply
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}

          {page === 2 && (
            <section className={pick(m, "px-5 py-8", "grid grid-cols-2 gap-10 px-10 py-12")}>
              <div>
                <h1 className={`font-extrabold tracking-[-0.05em] ${pick(m, "text-4xl", "text-6xl")}`}>Admissions</h1>
                <p className="mt-3 text-sm opacity-70">Four steps, about ten days, no entrance exam.</p>
                <ol className="mt-6 space-y-3">
                  {steps.map((s, i) => (
                    <motion.li key={s} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: [cobalt, coral, sun, ink][i], color: i === 2 ? ink : "#fff" }}>
                        {i + 1}
                      </span>
                      <span className="font-semibold">{s}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
              <div className={m ? "mt-8" : ""}>
                {done ? (
                  <DemoDone title={`Application started for ${course}!`} body="Brightpath would send a confirmation and a counsellor's calendar link right away." color={ink} accent={cobalt} font={font} onReset={() => setDone(false)} />
                ) : (
                  <form onSubmit={submit} className="space-y-4 rounded-[1.5rem] bg-white p-5 shadow-sm">
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] opacity-60">
                      Course
                      <select value={course} onChange={(e) => setCourse(e.target.value)} className="mt-1.5 block w-full rounded-xl px-3 py-2.5 text-sm normal-case tracking-normal outline-none" style={{ backgroundColor: `${ink}0A`, color: ink }}>
                        {courses.map((c) => (
                          <option key={c.title}>{c.title}</option>
                        ))}
                      </select>
                    </label>
                    <div className="flex gap-2">
                      {(["Student", "Parent"] as const).map((w) => (
                        <button type="button" key={w} onClick={() => setWho(w)} className="flex-1 rounded-xl py-2.5 text-sm font-bold" style={who === w ? { backgroundColor: ink, color: paper } : { backgroundColor: `${ink}0A` }}>
                          I&apos;m a {w.toLowerCase()}
                        </button>
                      ))}
                    </div>
                    <input required placeholder="Full name" className="block w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ backgroundColor: `${ink}0A` }} />
                    <input required type="email" placeholder="Email" className="block w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ backgroundColor: `${ink}0A` }} />
                    <button type="submit" className="w-full rounded-full py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]" style={{ backgroundColor: cobalt }}>
                      Start my application
                    </button>
                  </form>
                )}
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className={`flex items-center justify-between text-xs ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: cobalt, color: "#ffffffb3" }}>
        <span className="text-lg font-bold tracking-[-0.03em] text-white">brightpath</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
