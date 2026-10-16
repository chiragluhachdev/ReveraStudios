"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, MoveHorizontal, RotateCcw, X } from "lucide-react";
import { unsplash } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { DemoDone, pick } from "@/components/concepts/sites/shared";
import {
  interiorProjects,
  materialTextures,
  Room,
  rooms,
  StyleName,
  styleBoards,
  styles,
} from "@/components/concepts/sites/interiorData";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ───────────── Before / after reveal ───────────── */

function BeforeAfter({ image, ink, accent, m }: { image: string; ink: string; accent: string; m: boolean }) {
  const [pos, setPos] = useState(55);
  return (
    <div className={`relative select-none overflow-hidden ${pick(m, "aspect-[4/4.4]", "aspect-[4/4.6]")}`}>
      {/* After — the delivered room */}
      <Image src={image} alt="Delivered living room" fill sizes="500px" className="object-cover" />
      {/* Before — the same room as a desaturated "concept" */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={image} alt="" fill sizes="500px" className="object-cover [filter:grayscale(1)_contrast(0.85)_brightness(1.08)_sepia(0.25)]" />
        <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,transparent_0_23px,rgba(0,0,0,0.25)_23px_24px),repeating-linear-gradient(90deg,transparent_0_23px,rgba(0,0,0,0.25)_23px_24px)]" />
      </div>
      <span className="absolute left-3 top-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ backgroundColor: "#F1ECE5", color: ink }}>
        Concept
      </span>
      <span className="absolute right-3 top-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white" style={{ backgroundColor: accent }}>
        Delivered
      </span>
      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ color: ink }}>
          <MoveHorizontal size={18} />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare concept and delivered room"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/* ───────────── Site ───────────── */

export default function InteriorSite({ concept, page, go, m }: SiteProps) {
  const [plaster, ink, ochre, fern, rose] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const [menu, setMenu] = useState(false);
  const [room, setRoom] = useState<"All" | Room>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [quizPick, setQuizPick] = useState<StyleName | null>(null);
  const [style, setStyle] = useState<StyleName | "Not sure yet">("Not sure yet");
  const [type, setType] = useState("Full home");
  const [area, setArea] = useState(1600);
  const [budget, setBudget] = useState("₹20–40L");
  const [done, setDone] = useState(false);

  const shown = interiorProjects.map((p, i) => ({ p, i })).filter(({ p }) => room === "All" || p.room === room);
  const designWeeks = Math.max(3, Math.round(area / 600) + 2);
  const buildWeeks = Math.max(4, Math.round(area / 260));

  const openProject = (i: number) => {
    setOpen(i);
    go(1);
  };
  const consultWith = (s?: StyleName) => {
    if (s) setStyle(s);
    setDone(false);
    go(3);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  const navLink = (label: string, i: number) => (
    <button
      key={label}
      onClick={() => {
        if (i === 1) setOpen(null);
        go(i);
        setMenu(false);
      }}
      className="relative text-[13px]"
      style={{ color: ink, opacity: page === i ? 1 : 0.55 }}
    >
      {label}
      {page === i && <motion.span layoutId="oriel-nav" className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ backgroundColor: ochre }} />}
    </button>
  );

  const project = open !== null ? interiorProjects[open] : null;

  return (
    <div style={{ backgroundColor: plaster, color: ink, fontFamily: concept.brand.bodyFont }}>
      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur" style={{ backgroundColor: `${plaster}EE` }}>
        <div className={`flex items-center justify-between ${pick(m, "px-5 py-4", "px-10 py-5")}`}>
          <button onClick={() => go(0)} className="flex items-baseline gap-2">
            <LogoMark slug="interior-design" color={ink} accent={ochre} className="h-7 w-7 self-center" />
            <span className="text-3xl italic leading-none" style={{ fontFamily: serif }}>oriel</span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">atelier</span>
          </button>
          {m ? (
            <button onClick={() => setMenu((v) => !v)} aria-label="Menu">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          ) : (
            <nav className="flex items-center gap-8">
              {concept.website.pages.map(navLink)}
              <button onClick={() => consultWith()} className="rounded-full px-5 py-2.5 text-[13px] text-white transition-colors" style={{ backgroundColor: ink }}>
                Book a consultation
              </button>
            </nav>
          )}
        </div>
        <AnimatePresence>
          {m && menu && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col items-start gap-4 overflow-hidden px-5 pb-5">
              {concept.website.pages.map(navLink)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={`${page}-${open}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
          {/* ── Home ── */}
          {page === 0 && (
            <>
              <section className={`grid items-center gap-8 ${pick(m, "grid-cols-1 px-5 pb-10 pt-4", "grid-cols-[1.05fr_1fr] px-10 pb-16 pt-8")}`}>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">Interior atelier · Bengaluru</p>
                  <h1 className={`mt-4 leading-[0.9] ${pick(m, "text-6xl", "text-[5.6rem]")}`} style={{ fontFamily: serif }}>
                    Rooms that <em style={{ color: ochre }}>hold</em> you.
                  </h1>
                  <p className="mt-5 max-w-sm text-[15px] leading-relaxed opacity-75">
                    Full-home interiors, kitchens and joinery for people who want a home that feels collected over years — delivered in months.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button onClick={() => go(2)} className="flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white" style={{ backgroundColor: ink }}>
                      Take the style quiz <ArrowRight size={15} />
                    </button>
                    <button onClick={() => consultWith()} className="rounded-full border px-6 py-3 text-sm" style={{ borderColor: `${ink}40` }}>
                      Book a consultation
                    </button>
                  </div>
                  <div className="mt-8 flex gap-8 text-sm">
                    {[
                      ["38", "homes delivered"],
                      ["4.9★", "client rating"],
                      ["12 wks", "average project"],
                    ].map(([v, l]) => (
                      <div key={l}>
                        <p className="text-3xl leading-none" style={{ fontFamily: serif }}>{v}</p>
                        <p className="mt-1 text-xs opacity-60">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <BeforeAfter image={unsplash("1618220179428-22790b461013", 1200)} ink={ink} accent={ochre} m={m} />
                  <p className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] opacity-50">Drag to reveal · Ochre Flat, Koramangala</p>
                </div>
              </section>

              {/* Services */}
              <section className={`grid border-y ${pick(m, "grid-cols-2", "grid-cols-4")}`} style={{ borderColor: `${ink}1A` }}>
                {["Full-home design", "Kitchens & joinery", "Styling & sourcing", "Turnkey execution"].map((s, i) => (
                  <div key={s} className={`${pick(m, "p-5", "p-7")} ${i > 0 ? "border-l" : ""} ${m && i === 2 ? "border-l-0 border-t" : ""} ${m && i === 3 ? "border-t" : ""}`} style={{ borderColor: `${ink}1A` }}>
                    <p className="text-[11px] opacity-50">0{i + 1}</p>
                    <p className={`mt-2 leading-tight ${pick(m, "text-xl", "text-2xl")}`} style={{ fontFamily: serif }}>{s}</p>
                  </div>
                ))}
              </section>

              {/* Selected work */}
              <section className={pick(m, "px-5 py-12", "px-10 py-16")}>
                <div className="flex items-end justify-between">
                  <h2 className={pick(m, "text-4xl", "text-5xl")} style={{ fontFamily: serif }}>Selected work</h2>
                  <button onClick={() => { setOpen(null); go(1); }} className="text-[13px] underline underline-offset-4">All projects</button>
                </div>
                <div className={`mt-6 grid gap-4 ${pick(m, "grid-cols-1", "grid-cols-3")}`}>
                  {[0, 2, 4].map((i, k) => {
                    const p = interiorProjects[i];
                    return (
                      <button key={p.name} onClick={() => openProject(i)} className="group text-left">
                        <div className={`relative overflow-hidden ${pick(m, "aspect-[4/3]", k === 1 ? "aspect-[3/4.4]" : "aspect-[3/4]")}`}>
                          <Image src={p.image} alt={p.name} fill sizes="320px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <span className="text-xs uppercase tracking-[0.2em] text-white">{p.style} · {p.area}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                          <span className="text-2xl" style={{ fontFamily: serif }}>{p.name}</span>
                          <span className="text-xs opacity-60">{p.locality}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Process */}
              <section className={pick(m, "px-5 pb-12", "px-10 pb-16")}>
                <div className="p-6 sm:p-8" style={{ backgroundColor: rose }}>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">How we work</p>
                  <div className={`mt-6 grid gap-6 ${pick(m, "grid-cols-1", "grid-cols-4")}`}>
                    {[
                      ["Brief", "Week 1", "A walk-through, a questionnaire and the style quiz."],
                      ["Concept", "Weeks 2–3", "Moodboards, layouts and a first material palette."],
                      ["Design", "Weeks 4–6", "Drawings, 3D views, joinery and a fixed quote."],
                      ["Build", "Weeks 7+", "Our site team executes; you get weekly photo updates."],
                    ].map(([t, w, d], i) => (
                      <motion.div key={t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                        <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: fern }}>{w}</p>
                        <p className="mt-1 text-3xl" style={{ fontFamily: serif }}>{t}</p>
                        <p className="mt-2 text-sm leading-relaxed opacity-75">{d}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Quote */}
              <section className={`text-center ${pick(m, "px-5 py-14", "px-16 py-20")}`} style={{ backgroundColor: fern, color: plaster }}>
                <p className={`mx-auto max-w-2xl leading-[1.1] ${pick(m, "text-3xl", "text-5xl")}`} style={{ fontFamily: serif }}>
                  “It finally feels like a home we <em>chose</em>, not one we ended up with.”
                </p>
                <p className="mt-5 text-xs uppercase tracking-[0.25em] opacity-70">Meera & Arjun · Ochre Flat</p>
              </section>
            </>
          )}

          {/* ── Projects ── */}
          {page === 1 && !project && (
            <section className={pick(m, "px-5 py-8", "px-10 py-12")}>
              <h1 className={pick(m, "text-5xl", "text-7xl")} style={{ fontFamily: serif }}>Projects</h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["All", ...rooms] as const).map((r) => (
                  <button key={r} onClick={() => setRoom(r)} className="rounded-full px-4 py-1.5 text-[13px] transition-colors" style={room === r ? { backgroundColor: ink, color: plaster } : { border: `1px solid ${ink}30` }}>
                    {r}
                  </button>
                ))}
              </div>
              <motion.div layout className={`mt-7 ${pick(m, "columns-1", "columns-3")} gap-4 [column-fill:_balance]`}>
                <AnimatePresence mode="popLayout">
                  {shown.map(({ p, i }, k) => (
                    <motion.button
                      key={p.name}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      onClick={() => setOpen(i)}
                      className="group mb-4 block w-full break-inside-avoid text-left"
                    >
                      <motion.div layoutId={`oriel-${p.name}`} className={`relative overflow-hidden ${["aspect-[3/4]", "aspect-square", "aspect-[4/5]"][k % 3]}`}>
                        <Image src={p.image} alt={p.name} fill sizes="320px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                        <span className="absolute left-3 top-3 px-2 py-1 text-[10px] uppercase tracking-[0.18em]" style={{ backgroundColor: plaster }}>
                          {p.room}
                        </span>
                      </motion.div>
                      <div className="mt-2.5 flex items-baseline justify-between">
                        <span className="text-xl" style={{ fontFamily: serif }}>{p.name}</span>
                        <span className="flex items-center gap-1 text-xs opacity-60 transition-opacity group-hover:opacity-100">
                          View <ArrowUpRight size={12} />
                        </span>
                      </div>
                      <p className="text-xs opacity-55">{p.style} · {p.locality}</p>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}

          {page === 1 && project && open !== null && (
            <section className={pick(m, "px-5 py-6", "px-10 py-10")}>
              <button onClick={() => setOpen(null)} className="flex items-center gap-2 text-[13px] opacity-70 hover:opacity-100">
                <ArrowLeft size={14} /> All projects
              </button>
              <div className={`mt-5 grid gap-8 ${pick(m, "grid-cols-1", "grid-cols-[1.3fr_1fr]")}`}>
                <motion.div layoutId={`oriel-${project.name}`} className="relative aspect-[4/3.2] overflow-hidden">
                  <Image src={project.image} alt={project.name} fill sizes="600px" className="object-cover" />
                </motion.div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">{project.room} · {project.locality}</p>
                  <h1 className={`mt-2 leading-none ${pick(m, "text-5xl", "text-6xl")}`} style={{ fontFamily: serif }}>{project.name}</h1>
                  <div className="mt-6 grid grid-cols-3 border-y py-4 text-sm" style={{ borderColor: `${ink}1A` }}>
                    {[
                      ["Style", project.style],
                      ["Area", project.area],
                      ["Timeline", `${project.weeks} weeks`],
                    ].map(([l, v]) => (
                      <div key={l}>
                        <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">{l}</p>
                        <p className="mt-1">{v}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.2em] opacity-50">Material palette</p>
                  <div className="mt-2 flex gap-2">
                    {project.swatches.map((c, i) => (
                      <motion.span key={c} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 16 }} className="h-12 w-12 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed opacity-75">
                    A {project.style.toLowerCase()} {project.room.toLowerCase()} for a family in {project.locality}, built around natural light, storage that disappears and pieces that will age well.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => consultWith(project.style)} className="rounded-full px-5 py-3 text-sm text-white" style={{ backgroundColor: ink }}>
                      Start a similar project
                    </button>
                    <button onClick={() => setOpen((open + 1) % interiorProjects.length)} className="flex items-center gap-2 rounded-full border px-5 py-3 text-sm" style={{ borderColor: `${ink}40` }}>
                      Next project <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Style quiz ── */}
          {page === 2 && (
            <section className={pick(m, "px-5 py-8", "px-10 py-12")}>
              {!quizPick ? (
                <>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">Style quiz · 30 seconds</p>
                  <h1 className={`mt-3 leading-[0.95] ${pick(m, "text-5xl", "text-6xl")}`} style={{ fontFamily: serif }}>
                    Which room would you <em style={{ color: ochre }}>walk into</em>?
                  </h1>
                  <div className={`mt-8 grid gap-4 ${pick(m, "grid-cols-2", "grid-cols-4")}`}>
                    {styles.map((s, i) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, ease: EASE }}
                        whileHover={{ y: -6 }}
                        onClick={() => setQuizPick(s)}
                        className="group text-left"
                      >
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image src={styleBoards[s].images[0]} alt={s} fill sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          <span className="absolute inset-x-0 bottom-0 flex h-1/4 items-end p-3 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(to top, ${ink}AA, transparent)` }}>
                            <span className="text-xs text-white">This one →</span>
                          </span>
                        </div>
                        <p className="mt-2 text-xl" style={{ fontFamily: serif }}>{["A", "B", "C", "D"][i]}.</p>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">Your moodboard</p>
                    <button onClick={() => setQuizPick(null)} className="flex items-center gap-1.5 text-[13px] opacity-70 hover:opacity-100">
                      <RotateCcw size={13} /> Retake
                    </button>
                  </div>
                  <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`mt-2 leading-none ${pick(m, "text-5xl", "text-7xl")}`} style={{ fontFamily: serif }}>
                    You&apos;re <em style={{ color: ochre }}>{quizPick}</em>.
                  </motion.h1>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed opacity-75">{styleBoards[quizPick].line}</p>
                  <div className={`mt-7 grid gap-3 ${pick(m, "grid-cols-2", "grid-cols-[1.3fr_1fr_1fr]")}`}>
                    {styleBoards[quizPick].images.map((img, i) => (
                      <motion.div
                        key={img}
                        initial={{ opacity: 0, scale: 0.92, rotate: [-2, 1.5, -1][i] }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
                        className={`relative overflow-hidden ${i === 0 ? pick(m, "col-span-2 aspect-[16/10]", "row-span-2 aspect-auto min-h-[300px]") : "aspect-square"}`}
                      >
                        <Image src={img} alt="" fill sizes="360px" className="object-cover" />
                      </motion.div>
                    ))}
                  </div>
                  <div className={`mt-5 grid gap-5 ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Palette</p>
                      <div className="mt-2 flex gap-2">
                        {styleBoards[quizPick].palette.map((c, i) => (
                          <motion.span key={c} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + i * 0.07 }} className="h-14 flex-1 ring-1 ring-black/10" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Materials</p>
                      <div className="mt-2 grid grid-cols-4 gap-2">
                        {styleBoards[quizPick].materials.map((mat, i) => (
                          <motion.div key={mat} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.07 }}>
                            <span className="block h-14 ring-1 ring-black/10" style={materialTextures[mat]} />
                            <span className="mt-1 block text-[10px] opacity-70">{mat}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => consultWith(quizPick)} className="mt-7 flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white" style={{ backgroundColor: ink }}>
                    Book a consult with this style <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </section>
          )}

          {/* ── Consult ── */}
          {page === 3 && (
            <section className={`grid gap-8 ${pick(m, "grid-cols-1 px-5 py-8", "grid-cols-[1.2fr_1fr] px-10 py-12")}`}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">Consultation</p>
                <h1 className={`mt-2 leading-[0.95] ${pick(m, "text-5xl", "text-6xl")}`} style={{ fontFamily: serif }}>
                  Tell us about <em style={{ color: ochre }}>your home</em>.
                </h1>
                {done ? (
                  <div className="mt-6">
                    <DemoDone
                      title={`Consultation requested — ${type.toLowerCase()}, ${area.toLocaleString("en-IN")} sq ft.`}
                      body="Oriel would send a welcome note, a short questionnaire and two times for a site visit."
                      color={ink}
                      accent={fern}
                      font={serif}
                      onReset={() => setDone(false)}
                    />
                  </div>
                ) : (
                  <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-55">Project</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["Full home", "Living & dining", "Kitchen", "Bedroom", "Workspace"].map((t) => (
                          <button type="button" key={t} onClick={() => setType(t)} className="rounded-full px-4 py-2 text-[13px] transition-colors" style={type === t ? { backgroundColor: ink, color: plaster } : { border: `1px solid ${ink}30` }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between">
                        <p className="text-[10px] uppercase tracking-[0.2em] opacity-55">Carpet area</p>
                        <p className="text-2xl" style={{ fontFamily: serif }}>{area.toLocaleString("en-IN")} sq ft</p>
                      </div>
                      <input type="range" min={300} max={5000} step={50} value={area} onChange={(e) => setArea(Number(e.target.value))} aria-label="Carpet area in square feet" className="mt-2 w-full" style={{ accentColor: ochre }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-55">Budget</p>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {["₹10–20L", "₹20–40L", "₹40L+"].map((b) => (
                          <button type="button" key={b} onClick={() => setBudget(b)} className="py-2.5 text-[13px] transition-colors" style={budget === b ? { backgroundColor: ochre, color: "#fff" } : { border: `1px solid ${ink}30` }}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] opacity-55">
                      Style
                      <select value={style} onChange={(e) => setStyle(e.target.value as StyleName | "Not sure yet")} className="mt-2 block w-full border-b bg-transparent py-2 text-[15px] normal-case tracking-normal outline-none" style={{ borderColor: `${ink}33`, color: ink }}>
                        {["Not sure yet", ...styles].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <div className={`grid gap-4 ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                      <input required placeholder="Your name" className="border-b bg-transparent py-2 text-[15px] outline-none" style={{ borderColor: `${ink}33` }} />
                      <input required type="tel" placeholder="Phone" className="border-b bg-transparent py-2 text-[15px] outline-none" style={{ borderColor: `${ink}33` }} />
                    </div>
                    <button type="submit" className="w-full rounded-full py-3.5 text-sm text-white" style={{ backgroundColor: ink }}>
                      Request a consultation
                    </button>
                  </form>
                )}
              </div>

              {/* Live summary */}
              <aside className="h-fit p-6" style={{ backgroundColor: ink, color: plaster }}>
                <p className="text-[10px] uppercase tracking-[0.25em] opacity-60">Your project, so far</p>
                <p className="mt-3 text-3xl leading-tight" style={{ fontFamily: serif }}>
                  {type}, {area.toLocaleString("en-IN")} sq ft
                </p>
                <p className="mt-1 text-sm opacity-70">
                  {style === "Not sure yet" ? "Style to be discovered together" : style} · {budget}
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    ["Design", designWeeks, rose],
                    ["Build", buildWeeks, ochre],
                  ].map(([l, w, c]) => (
                    <div key={l as string}>
                      <div className="flex justify-between text-xs opacity-80">
                        <span>{l}</span>
                        <span>~{w} weeks</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: c as string }} animate={{ width: `${Math.min(100, ((w as number) / 24) * 100)}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 border-t border-white/10 pt-4 text-xs opacity-60">
                  Indicative only. A fixed quote follows the site measure.
                </p>
              </aside>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className={`flex items-center justify-between text-xs ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: ink, color: `${plaster}99` }}>
        <span className="text-2xl italic" style={{ fontFamily: serif, color: plaster }}>oriel</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
