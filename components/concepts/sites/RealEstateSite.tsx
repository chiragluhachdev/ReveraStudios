"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BedDouble, MapPin, Maximize, Menu, X } from "lucide-react";
import { unsplash } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { DemoDone, pick } from "@/components/concepts/sites/shared";

type Status = "Ready to move" | "Under construction";
const projects: { name: string; city: string; type: string; beds: string; area: string; price: string; status: Status; image: string }[] = [
  { name: "The Ridge", city: "Gurugram", type: "Villas", beds: "4–5 BHK", area: "4,800 sq ft", price: "₹6.2 Cr", status: "Under construction", image: unsplash("1600585154340-be6161a56a0c", 900) },
  { name: "Casa Alva", city: "Goa", type: "Courtyard villas", beds: "3–4 BHK", area: "3,600 sq ft", price: "₹4.8 Cr", status: "Ready to move", image: unsplash("1613490493576-7fde63acd811", 900) },
  { name: "Linden Court", city: "Gurugram", type: "Residences", beds: "3 BHK", area: "2,450 sq ft", price: "₹3.2 Cr", status: "Ready to move", image: unsplash("1600607687939-ce8a6c25118c", 900) },
  { name: "Saltwood", city: "Goa", type: "Sea-view apartments", beds: "2–3 BHK", area: "1,900 sq ft", price: "₹2.6 Cr", status: "Under construction", image: unsplash("1600047509807-ba8f99d2cdde", 900) },
  { name: "Arden House", city: "Gurugram", type: "Penthouses", beds: "4 BHK", area: "5,200 sq ft", price: "₹8.9 Cr", status: "Ready to move", image: unsplash("1512917774080-9991f1c4c750", 900) },
];
const days = ["Sat 18", "Sun 19", "Mon 20", "Tue 21", "Wed 22"];
const slots = ["10:00", "12:00", "15:00", "17:30"];

export default function RealEstateSite({ concept, page, go, m }: SiteProps) {
  const [bg, ink, bronze, sage, ivory] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [city, setCity] = useState("Any city");
  const [visitProject, setVisitProject] = useState(projects[0].name);
  const [day, setDay] = useState(days[0]);
  const [slot, setSlot] = useState(slots[1]);
  const [done, setDone] = useState(false);

  const shown = projects.filter((p) => (filter === "All" || p.status === filter) && (city === "Any city" || p.city === city));
  const enquire = (name: string) => {
    setVisitProject(name);
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
      className="relative text-[13px] tracking-[0.12em] uppercase"
      style={{ color: ink, opacity: page === i ? 1 : 0.6 }}
    >
      {label}
      {page === i && <motion.span layoutId="re-underline" className="absolute -bottom-1 left-0 right-0 h-px" style={{ backgroundColor: bronze }} />}
    </button>
  );

  return (
    <div style={{ backgroundColor: ivory, color: ink, fontFamily: concept.brand.bodyFont }}>
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b backdrop-blur" style={{ backgroundColor: `${ivory}EE`, borderColor: `${ink}14` }}>
        <div className={`flex items-center justify-between ${pick(m, "px-5 py-4", "px-10 py-5")}`}>
          <button onClick={() => go(0)} className="flex items-center gap-2.5">
            <LogoMark slug="real-estate" color={ink} accent={bronze} className="h-7 w-7" />
            <span className="text-xl tracking-[0.3em]" style={{ fontFamily: serif, fontWeight: 600 }}>
              HALDEN
            </span>
          </button>
          {m ? (
            <button onClick={() => setMenu((v) => !v)} aria-label="Menu">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          ) : (
            <nav className="flex items-center gap-8">
              {concept.website.pages.map(navLink)}
              <button onClick={() => enquire(visitProject)} className="px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] text-white" style={{ backgroundColor: ink }}>
                Book a visit
              </button>
            </nav>
          )}
        </div>
        <AnimatePresence>
          {m && menu && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col items-start gap-4 overflow-hidden px-5 pb-5"
            >
              {concept.website.pages.map(navLink)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {page === 0 && (
            <>
              {/* Hero */}
              <section className={`relative ${pick(m, "h-[440px]", "h-[480px]")}`}>
                <Image src={unsplash("1600596542815-ffad4c1539a9", 1600)} alt="Halden residence exterior at dusk" fill sizes="900px" className="object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ink}D9, ${ink}33 60%, transparent)` }} />
                <div className={`absolute inset-x-0 bottom-0 text-white ${pick(m, "p-5 pb-28", "p-10 pb-32")}`}>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-80">Architect-led homes · Gurugram & Goa</p>
                  <h1 className={`mt-3 leading-[0.95] ${pick(m, "text-5xl", "text-7xl")}`} style={{ fontFamily: serif, fontWeight: 500 }}>
                    Live above <em>the ordinary.</em>
                  </h1>
                </div>
              </section>
              {/* Search */}
              <div className={pick(m, "relative z-10 -mt-20 px-4", "relative z-10 -mt-20 px-10")}>
                <div className={`grid gap-3 bg-white p-4 shadow-xl ${pick(m, "grid-cols-1", "grid-cols-4 items-end")}`}>
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    City
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full border-b bg-transparent py-1.5 text-sm normal-case tracking-normal opacity-100 outline-none" style={{ borderColor: `${ink}33`, color: ink }}>
                      {["Any city", "Gurugram", "Goa"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Status
                    <select value={filter} onChange={(e) => setFilter(e.target.value as "All" | Status)} className="mt-1 block w-full border-b bg-transparent py-1.5 text-sm normal-case tracking-normal outline-none" style={{ borderColor: `${ink}33`, color: ink }}>
                      {["All", "Ready to move", "Under construction"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Matches
                    <span className="mt-1 block py-1.5 text-sm normal-case tracking-normal" style={{ color: ink, opacity: 1 }}>
                      {shown.length} {shown.length === 1 ? "project" : "projects"}
                    </span>
                  </p>
                  <button onClick={() => go(1)} className="flex items-center justify-center gap-2 py-3 text-[12px] uppercase tracking-[0.14em] text-white" style={{ backgroundColor: bronze }}>
                    View homes <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              {/* Featured */}
              <section className={pick(m, "px-5 py-12", "px-10 py-16")}>
                <div className="flex items-end justify-between">
                  <h2 className={pick(m, "text-3xl", "text-4xl")} style={{ fontFamily: serif, fontWeight: 500 }}>
                    Current residences
                  </h2>
                  <button onClick={() => go(1)} className="text-[12px] uppercase tracking-[0.14em] underline underline-offset-4">
                    All projects
                  </button>
                </div>
                <div className={`mt-6 grid gap-5 ${pick(m, "grid-cols-1", "grid-cols-3")}`}>
                  {projects.slice(0, 3).map((p) => (
                    <button key={p.name} onClick={() => enquire(p.name)} className="group text-left">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image src={p.image} alt={p.name} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <span className="absolute left-3 top-3 px-2 py-1 text-[10px] uppercase tracking-[0.15em]" style={{ backgroundColor: ivory }}>
                          {p.status}
                        </span>
                      </div>
                      <p className="mt-3 text-2xl" style={{ fontFamily: serif, fontWeight: 500 }}>{p.name}</p>
                      <p className="text-sm opacity-60">
                        {p.city} · {p.beds} · From {p.price}
                      </p>
                    </button>
                  ))}
                </div>
              </section>
              {/* Proof */}
              <section className={`grid gap-6 ${pick(m, "grid-cols-1 px-5 py-12", "grid-cols-3 px-10 py-16")}`} style={{ backgroundColor: bg }}>
                {[
                  ["12", "Homes per project — never more"],
                  ["40%", "Of every site left as open green"],
                  ["2009", "Building quietly since"],
                ].map(([v, l]) => (
                  <div key={l} className="border-t pt-4" style={{ borderColor: `${ink}26` }}>
                    <p className="text-5xl" style={{ fontFamily: serif, color: bronze }}>{v}</p>
                    <p className="mt-2 text-sm opacity-70">{l}</p>
                  </div>
                ))}
              </section>
            </>
          )}

          {page === 1 && (
            <section className={pick(m, "px-5 py-10", "px-10 py-14")}>
              <h1 className={pick(m, "text-4xl", "text-6xl")} style={{ fontFamily: serif, fontWeight: 500 }}>
                Projects
              </h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {(["All", "Ready to move", "Under construction"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors"
                    style={filter === f ? { backgroundColor: ink, color: ivory } : { border: `1px solid ${ink}33` }}
                  >
                    {f}
                  </button>
                ))}
                <select value={city} onChange={(e) => setCity(e.target.value)} className="border bg-transparent px-3 py-2 text-[11px] uppercase tracking-[0.14em] outline-none" style={{ borderColor: `${ink}33` }}>
                  {["Any city", "Gurugram", "Goa"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <motion.div layout className={`mt-8 grid gap-6 ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                <AnimatePresence mode="popLayout">
                  {shown.map((p) => (
                    <motion.article key={p.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="bg-white">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={p.image} alt={p.name} fill sizes="450px" className="object-cover" />
                        <span className="absolute left-3 top-3 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white" style={{ backgroundColor: p.status === "Ready to move" ? sage : bronze }}>
                          {p.status}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-baseline justify-between">
                          <p className="text-2xl" style={{ fontFamily: serif, fontWeight: 500 }}>{p.name}</p>
                          <p className="text-sm" style={{ color: bronze }}>From {p.price}</p>
                        </div>
                        <p className="mt-1 text-xs opacity-60">{p.type}</p>
                        <div className="mt-4 flex flex-wrap gap-4 text-xs opacity-75">
                          <span className="flex items-center gap-1"><MapPin size={13} /> {p.city}</span>
                          <span className="flex items-center gap-1"><BedDouble size={13} /> {p.beds}</span>
                          <span className="flex items-center gap-1"><Maximize size={13} /> {p.area}</span>
                        </div>
                        <button onClick={() => enquire(p.name)} className="mt-5 w-full py-3 text-[11px] uppercase tracking-[0.16em] text-white" style={{ backgroundColor: ink }}>
                          Book a site visit
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
              {shown.length === 0 && <p className="mt-8 text-sm opacity-60">No projects match — try another city or status.</p>}
            </section>
          )}

          {page === 2 && (
            <section className={pick(m, "px-5 py-10", "grid grid-cols-2 gap-12 px-10 py-14")}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: bronze }}>Private site visit</p>
                <h1 className={`mt-3 ${pick(m, "text-4xl", "text-6xl")}`} style={{ fontFamily: serif, fontWeight: 500 }}>
                  See it in person.
                </h1>
                <p className="mt-4 text-sm leading-relaxed opacity-70">
                  Pick a residence and a time. An advisor meets you on site with plans, pricing and an honest answer to every question.
                </p>
                {!m && (
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden">
                    <Image src={projects.find((p) => p.name === visitProject)!.image} alt={visitProject} fill sizes="450px" className="object-cover" />
                  </div>
                )}
              </div>
              <div className={m ? "mt-8" : ""}>
                {done ? (
                  <DemoDone
                    title={`Visit requested — ${visitProject}, ${day} at ${slot}.`}
                    body="A Halden advisor would confirm on WhatsApp within the hour."
                    color={ink}
                    accent={bronze}
                    font={serif}
                    onReset={() => setDone(false)}
                  />
                ) : (
                  <form onSubmit={submit} className="space-y-6 bg-white p-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">1 · Residence</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {projects.map((p) => (
                          <button type="button" key={p.name} onClick={() => setVisitProject(p.name)} className="px-3 py-2 text-xs" style={visitProject === p.name ? { backgroundColor: ink, color: ivory } : { border: `1px solid ${ink}26` }}>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">2 · Day</p>
                      <div className="mt-2 grid grid-cols-5 gap-2">
                        {days.map((d) => (
                          <button type="button" key={d} onClick={() => setDay(d)} className="py-2.5 text-xs leading-tight" style={day === d ? { backgroundColor: bronze, color: "#fff" } : { border: `1px solid ${ink}26` }}>
                            {d.split(" ")[0]}
                            <br />
                            <span className="text-base" style={{ fontFamily: serif }}>{d.split(" ")[1]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">3 · Time</p>
                      <div className="mt-2 grid grid-cols-4 gap-2">
                        {slots.map((t) => (
                          <button type="button" key={t} onClick={() => setSlot(t)} className="py-2 text-xs" style={slot === t ? { backgroundColor: ink, color: ivory } : { border: `1px solid ${ink}26` }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={`grid gap-3 ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                      <input required placeholder="Full name" className="border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: `${ink}33` }} />
                      <input required type="tel" placeholder="Phone" className="border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: `${ink}33` }} />
                    </div>
                    <button type="submit" className="w-full py-3.5 text-[12px] uppercase tracking-[0.16em] text-white" style={{ backgroundColor: ink }}>
                      Request visit
                    </button>
                  </form>
                )}
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className={`flex items-center justify-between text-xs ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: ink, color: `${ivory}99` }}>
        <span style={{ fontFamily: serif, color: ivory }} className="text-lg tracking-[0.3em]">HALDEN</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
