"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock, MapPin, Menu, Minus, Plus, ShoppingBag, Star, X } from "lucide-react";
import { unsplash } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { DemoDone, pick } from "@/components/concepts/sites/shared";
import { byId, categories, Category, Diet, dietary, hours, inr, menu, orderable, pickupSlots } from "@/components/concepts/sites/bakeryData";

const script = "var(--font-caveat), cursive";
const EASE = [0.16, 1, 0.3, 1] as const;

const ovenBoard: { id: string; time: string; status: "out" | "baking" | "soldout"; progress?: number; note?: string }[] = [
  { id: "croissant", time: "7:10", status: "out" },
  { id: "pain-choc", time: "7:25", status: "out" },
  { id: "cardamom-bun", time: "~8:05", status: "baking", progress: 72 },
  { id: "sourdough", time: "7:40", status: "out", note: "4 left" },
  { id: "orange-tart", time: "7:00", status: "soldout" },
];
const trackSteps = ["Order received", "In the oven", "Packed with love", "Ready for pickup"];

export default function BakerySite({ concept, page, go, m }: SiteProps) {
  const [flour, cocoa, crust, pistachio, butter] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState<Category>("Viennoiserie");
  const [diet, setDiet] = useState<Diet | "All">("All");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [slot, setSlot] = useState(pickupSlots[1]);
  const [stage, setStage] = useState(-1);
  const [stamps, setStamps] = useState(6);
  const [party, setParty] = useState(2);
  const [time, setTime] = useState("10:00");
  const [booked, setBooked] = useState(false);
  const [today, setToday] = useState<number | null>(null);

  // Day of week is only known in the browser — set after mount to avoid a hydration mismatch.
  useEffect(() => setToday(new Date().getDay()), []);

  // Demo order tracker: advance through the stages once an order is placed.
  useEffect(() => {
    if (stage < 0 || stage >= trackSteps.length - 1) return;
    const t = setTimeout(() => setStage((s) => s + 1), 1600);
    return () => clearTimeout(t);
  }, [stage]);

  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = Object.entries(qty).reduce((a, [id, q]) => a + byId(id).price * q, 0);
  const change = (id: string, d: number) => setQty((s) => ({ ...s, [id]: Math.max(0, (s[id] ?? 0) + d) }));
  const addAndOrder = (id: string) => {
    change(id, 1);
    setStage(-1);
    go(2);
  };
  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (count > 0) setStage(0);
  };

  const shownMenu = menu.filter((i) => i.category === cat && (diet === "All" || i.diet.includes(diet)));
  // Hours list is Monday-first; JS getDay() is Sunday = 0.
  const todayRow = today === null ? -1 : (today + 6) % 7;

  const navLink = (label: string, i: number) => (
    <button
      key={label}
      onClick={() => {
        go(i);
        setMenuOpen(false);
      }}
      className="relative text-sm font-medium"
      style={{ color: cocoa, opacity: page === i ? 1 : 0.6 }}
    >
      {label}
      {page === i && (
        <motion.svg layoutId="crumb-nav" viewBox="0 0 40 6" className="absolute -bottom-2 left-0 h-1.5 w-full" preserveAspectRatio="none">
          <path d="M1 4 Q10 0 20 3 T39 2" fill="none" stroke={crust} strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      )}
    </button>
  );

  const bag = (
    <button onClick={() => go(2)} className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold" style={{ backgroundColor: cocoa, color: flour }}>
      <ShoppingBag size={14} /> {count}
      {count > 0 && (
        <motion.span key={count} initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -right-1 -top-1 h-3 w-3 rounded-full" style={{ backgroundColor: crust }} />
      )}
    </button>
  );

  return (
    <div style={{ backgroundColor: flour, color: cocoa, fontFamily: concept.brand.bodyFont }}>
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b backdrop-blur" style={{ backgroundColor: `${flour}F0`, borderColor: `${cocoa}14` }}>
        <div className={`flex items-center justify-between ${pick(m, "px-4 py-3.5", "px-10 py-4")}`}>
          <button onClick={() => go(0)} className="flex items-center gap-2">
            <LogoMark slug="bakery-cafe" color={cocoa} accent={crust} className="h-8 w-8" />
            <span className="text-xl" style={{ fontFamily: serif }}>Crumb &amp; Co.</span>
          </button>
          {m ? (
            <div className="flex items-center gap-3">
              {bag}
              <button onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          ) : (
            <nav className="flex items-center gap-7">
              {concept.website.pages.map(navLink)}
              {bag}
            </nav>
          )}
        </div>
        <AnimatePresence>
          {m && menuOpen && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col items-start gap-4 overflow-hidden px-4 pb-5">
              {concept.website.pages.map(navLink)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
          {/* ── Home ── */}
          {page === 0 && (
            <>
              <section className={`relative overflow-hidden ${pick(m, "h-[460px]", "h-[500px]")}`}>
                <Image src={unsplash("1555507036-ab1f4038808a", 1600)} alt="Fresh butter croissants dusted with flour" fill sizes="900px" className="object-cover" priority={false} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${cocoa}F2 0%, ${cocoa}99 45%, transparent 80%)` }} />
                {/* Rotating badge */}
                <motion.svg viewBox="0 0 120 120" className={`absolute ${pick(m, "right-4 top-4 h-20 w-20", "right-10 top-10 h-28 w-28")}`} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                  <defs>
                    <path id="crumb-badge" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                  </defs>
                  <circle cx="60" cy="60" r="58" fill={butter} />
                  <text fill={cocoa} style={{ fontSize: 12, letterSpacing: 3, fontFamily: concept.brand.bodyFont, fontWeight: 600 }}>
                    <textPath href="#crumb-badge">BAKED IN BANDRA • SINCE 4AM • </textPath>
                  </text>
                </motion.svg>
                <div className={`relative flex h-full flex-col justify-end ${pick(m, "p-5", "max-w-xl p-10")}`} style={{ color: flour }}>
                  <p className="text-2xl" style={{ fontFamily: script, color: butter }}>fresh since 4am ↘</p>
                  <h1 className={`mt-2 leading-[0.95] ${pick(m, "text-5xl", "text-6xl")}`} style={{ fontFamily: serif }}>
                    Baked at 4am. Gone by noon.
                  </h1>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-85">
                    Croissants, sourdough and very good coffee from a small bakehouse in Bandra. Pre-order tonight, pick up warm tomorrow.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => go(2)} className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold" style={{ backgroundColor: butter, color: cocoa }}>
                      Order for pickup <ArrowRight size={15} />
                    </button>
                    <button onClick={() => go(1)} className="rounded-full border px-6 py-3 text-sm font-semibold" style={{ borderColor: `${flour}66` }}>
                      See the menu
                    </button>
                  </div>
                </div>
              </section>

              {/* Out of the oven */}
              <section className={pick(m, "px-4 py-10", "px-10 py-14")}>
                <div className={`grid gap-6 ${pick(m, "grid-cols-1", "grid-cols-[1fr_1.1fr] items-center")}`}>
                  <div>
                    <p className="text-2xl" style={{ fontFamily: script, color: crust }}>what&apos;s warm right now</p>
                    <h2 className={pick(m, "text-4xl", "text-5xl")} style={{ fontFamily: serif }}>Out of the oven</h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-70">
                      Our live bake board — so you know the croissants are still there before you leave the house.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-2xl shadow-[0_20px_40px_-28px_rgba(58,35,24,0.6)]" style={{ backgroundColor: "#fff" }}>
                    <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold" style={{ backgroundColor: pistachio, color: flour }}>
                      <span>Today&apos;s bake</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Updated 2 min ago
                      </span>
                    </div>
                    <ul className="divide-y" style={{ borderColor: `${cocoa}10` }}>
                      {ovenBoard.map((row, i) => {
                        const item = byId(row.id);
                        return (
                          <motion.li key={row.id} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-3 px-4 py-3">
                            <span className="flex-1">
                              <span className={`block text-[15px] ${row.status === "soldout" ? "line-through opacity-40" : ""}`} style={{ fontFamily: serif }}>
                                {item.name}
                              </span>
                              {row.status === "baking" ? (
                                <span className="mt-1.5 block h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full" style={{ backgroundColor: `${crust}26` }}>
                                  <motion.span className="block h-full rounded-full" style={{ backgroundColor: crust }} initial={{ width: "10%" }} whileInView={{ width: `${row.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }} />
                                </span>
                              ) : (
                                <span className="text-xs opacity-55">{row.note ?? (row.status === "out" ? `out at ${row.time}` : "back tomorrow")}</span>
                              )}
                            </span>
                            <span
                              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                              style={
                                row.status === "out"
                                  ? { backgroundColor: `${pistachio}2E`, color: "#4f5a35" }
                                  : row.status === "baking"
                                    ? { backgroundColor: `${butter}66`, color: cocoa }
                                    : { backgroundColor: `${cocoa}10`, color: `${cocoa}99` }
                              }
                            >
                              {row.status === "out" ? "Out ✓" : row.status === "baking" ? `In the oven · ${row.time}` : "Sold out"}
                            </span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Signature bakes */}
              <section className={pick(m, "px-4 pb-10", "px-10 pb-14")}>
                <h2 className={pick(m, "text-3xl", "text-4xl")} style={{ fontFamily: serif }}>The ones people queue for</h2>
                <div className={`mt-6 grid gap-5 ${pick(m, "grid-cols-1", "grid-cols-3")}`}>
                  {["croissant", "cardamom-bun", "orange-tart"].map((id, i) => {
                    const item = byId(id);
                    return (
                      <motion.div key={id} whileHover={{ y: -6, rotate: i === 1 ? 0.8 : -0.8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="group overflow-hidden rounded-2xl bg-white">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {item.image && <Image src={item.image} alt={item.name} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                          {i === 0 && (
                            <span className="absolute left-3 top-3 -rotate-6 rounded-full px-3 py-1 text-lg leading-none" style={{ fontFamily: script, backgroundColor: butter, color: cocoa }}>
                              our fave!
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-baseline justify-between">
                            <p className="text-xl" style={{ fontFamily: serif }}>{item.name}</p>
                            <p className="text-sm font-semibold" style={{ color: crust }}>{inr(item.price)}</p>
                          </div>
                          <p className="mt-1 text-xs opacity-65">{item.note}</p>
                          <button onClick={() => addAndOrder(id)} className="mt-4 w-full rounded-full py-2.5 text-sm font-semibold transition-colors" style={{ backgroundColor: cocoa, color: flour }}>
                            Add to pickup order
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* Stamp card */}
              <section className={pick(m, "px-4 pb-10", "px-10 pb-14")}>
                <div className={`grid items-center gap-6 rounded-3xl p-6 ${pick(m, "grid-cols-1", "grid-cols-[1fr_1.2fr] p-8")}`} style={{ backgroundColor: crust, color: flour }}>
                  <div>
                    <p className="text-2xl" style={{ fontFamily: script, color: butter }}>the crumb club</p>
                    <p className={pick(m, "text-3xl", "text-4xl")} style={{ fontFamily: serif }}>10 coffees, the 11th is on us.</p>
                    <p className="mt-2 text-sm opacity-80">A digital stamp card — no paper, no app download. Tap to try it.</p>
                  </div>
                  <div>
                    <div className="grid grid-cols-5 gap-2.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i} className="relative flex aspect-square items-center justify-center rounded-full border-2 border-dashed" style={{ borderColor: `${flour}80` }}>
                          <AnimatePresence>
                            {i < stamps && (
                              <motion.span
                                initial={{ scale: 2.2, opacity: 0, rotate: -40 }}
                                animate={{ scale: 1, opacity: 1, rotate: (i * 37) % 30 - 15 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 380, damping: 18 }}
                                className="absolute inset-[3px] flex items-center justify-center rounded-full text-lg leading-none"
                                style={{ backgroundColor: butter, color: cocoa, fontFamily: script }}
                              >
                                C&amp;
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <AnimatePresence mode="wait">
                        <motion.p key={stamps >= 10 ? "won" : "go"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm font-semibold">
                          {stamps >= 10 ? "Free flat white unlocked ☕" : `${10 - stamps} to go`}
                        </motion.p>
                      </AnimatePresence>
                      <button onClick={() => setStamps((s) => (s >= 10 ? 0 : s + 1))} className="rounded-full px-4 py-2 text-sm font-semibold" style={{ backgroundColor: flour, color: cocoa }}>
                        {stamps >= 10 ? "Start a new card" : "Add a stamp"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Café */}
              <section className={pick(m, "px-4 pb-12", "px-10 pb-16")}>
                <div className={`grid gap-3 ${pick(m, "grid-cols-2", "grid-cols-[1.4fr_1fr_1fr]")}`}>
                  {["1554118811-1e0d58224f24", "1600093463592-8e36ae95ef56", "1453614512568-c4024d13c247"].map((id, i) => (
                    <div key={id} className={`relative overflow-hidden rounded-2xl ${i === 0 ? pick(m, "col-span-2 aspect-[16/10]", "aspect-auto min-h-[260px]") : "aspect-[4/5]"}`}>
                      <Image src={unsplash(id, 900)} alt="Inside the Crumb & Co. café" fill sizes="360px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-2xl" style={{ fontFamily: script, color: crust }}>tables & laptops welcome till 11 ✌️</p>
                  <button onClick={() => go(3)} className="flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
                    Plan your visit <ArrowRight size={14} />
                  </button>
                </div>
              </section>
            </>
          )}

          {/* ── Menu ── */}
          {page === 1 && (
            <section className={pick(m, "px-4 py-8", "px-10 py-12")}>
              <p className="text-2xl" style={{ fontFamily: script, color: crust }}>all day, every day</p>
              <h1 className={pick(m, "text-5xl", "text-6xl")} style={{ fontFamily: serif }}>The menu</h1>
              <div className="sticky top-[60px] z-10 -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 py-2" style={{ backgroundColor: flour }}>
                {categories.map((c) => (
                  <button key={c} onClick={() => setCat(c)} className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors" style={cat === c ? { backgroundColor: cocoa, color: flour } : { border: `1px solid ${cocoa}26` }}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="opacity-55">Show:</span>
                {(["All", "V", "VG", "GF"] as const).map((d) => (
                  <button key={d} onClick={() => setDiet(d)} className="rounded-full px-3 py-1 font-semibold" style={diet === d ? { backgroundColor: pistachio, color: "#fff" } : { backgroundColor: `${cocoa}0D` }}>
                    {d === "All" ? "Everything" : dietary[d]}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.ul key={`${cat}-${diet}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-6 grid gap-x-10 gap-y-5 ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                  {shownMenu.map((item) => (
                    <li key={item.id}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg" style={{ fontFamily: serif }}>{item.name}</span>
                        {item.signature && <Star size={12} fill={crust} stroke={crust} aria-label="Signature" />}
                        <span className="mx-1 flex-1 translate-y-[-3px] border-b-2 border-dotted" style={{ borderColor: `${cocoa}33` }} />
                        <span className="text-sm font-semibold">{inr(item.price)}</span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-xs opacity-60">{item.note}</span>
                        {item.diet.map((d) => (
                          <span key={d} title={dietary[d]} className="rounded px-1.5 py-[1px] text-[10px] font-bold" style={{ backgroundColor: d === "N" ? `${crust}26` : `${pistachio}33`, color: d === "N" ? crust : "#4f5a35" }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                  {shownMenu.length === 0 && <li className="text-sm opacity-60">Nothing here for that filter — try another.</li>}
                </motion.ul>
              </AnimatePresence>
              <p className="mt-8 text-xs opacity-50">V vegetarian · VG vegan · GF gluten-free · N contains nuts · ★ signature</p>
            </section>
          )}

          {/* ── Order ── */}
          {page === 2 && (
            <section className={`grid gap-8 ${pick(m, "grid-cols-1 px-4 py-8", "grid-cols-[1.5fr_1fr] px-10 py-12")}`}>
              <div>
                <p className="text-2xl" style={{ fontFamily: script, color: crust }}>skip the queue</p>
                <h1 className={pick(m, "text-5xl", "text-6xl")} style={{ fontFamily: serif }}>Order for pickup</h1>
                <div className={`mt-6 grid gap-4 ${pick(m, "grid-cols-2", "grid-cols-4")}`}>
                  {orderable.map((item) => {
                    const q = qty[item.id] ?? 0;
                    return (
                      <div key={item.id} className="overflow-hidden rounded-2xl bg-white">
                        <div className="relative aspect-square">
                          {item.image && <Image src={item.image} alt={item.name} fill sizes="200px" className="object-cover" />}
                          {q > 0 && (
                            <motion.span key={q} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-xs font-bold" style={{ backgroundColor: crust, color: "#fff" }}>
                              ×{q}
                            </motion.span>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-[15px] leading-tight" style={{ fontFamily: serif }}>{item.name}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-semibold">{inr(item.price)}</span>
                            <span className="flex items-center gap-2 rounded-full px-1 py-0.5" style={{ backgroundColor: `${cocoa}0D` }}>
                              <button onClick={() => change(item.id, -1)} aria-label={`Remove ${item.name}`} className="flex h-6 w-6 items-center justify-center rounded-full">
                                <Minus size={12} />
                              </button>
                              <span className="w-3 text-center text-xs font-bold">{q}</span>
                              <button onClick={() => change(item.id, 1)} aria-label={`Add ${item.name}`} className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ backgroundColor: cocoa }}>
                                <Plus size={12} />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className={`h-fit rounded-2xl p-5 ${m ? "" : "sticky top-24"}`} style={{ backgroundColor: cocoa, color: flour }}>
                {stage >= 0 ? (
                  <div>
                    <p className="text-2xl" style={{ fontFamily: script, color: butter }}>order #CC-2417</p>
                    <p className="text-2xl" style={{ fontFamily: serif }}>{stage === trackSteps.length - 1 ? "Ready when you are!" : "We're on it."}</p>
                    <ol className="mt-5 space-y-3">
                      {trackSteps.map((s, i) => (
                        <li key={s} className="flex items-center gap-3 text-sm">
                          <motion.span
                            className="flex h-7 w-7 items-center justify-center rounded-full"
                            animate={{ backgroundColor: i <= stage ? butter : "rgba(251,244,232,0.12)", scale: i === stage ? 1.12 : 1 }}
                            style={{ color: cocoa }}
                          >
                            {i < stage || stage === trackSteps.length - 1 ? <Check size={14} /> : <span className="text-xs font-bold" style={{ color: i <= stage ? cocoa : flour }}>{i + 1}</span>}
                          </motion.span>
                          <span className={i <= stage ? "" : "opacity-50"}>{s}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-5 flex items-center gap-2 text-xs opacity-70">
                      <Clock size={13} /> Pickup {slot} · 14 Chapel Road, Bandra
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] opacity-45">Concept demo — nothing was ordered</p>
                    <button onClick={() => { setStage(-1); setQty({}); }} className="mt-4 text-sm font-semibold underline underline-offset-4">
                      Start a new order
                    </button>
                  </div>
                ) : (
                  <form onSubmit={placeOrder}>
                    <p className="text-2xl" style={{ fontFamily: serif }}>Your order</p>
                    {count === 0 ? (
                      <p className="mt-3 text-sm opacity-70">Nothing yet — add a croissant or three.</p>
                    ) : (
                      <ul className="mt-3 space-y-1.5 text-sm">
                        {Object.entries(qty)
                          .filter(([, q]) => q > 0)
                          .map(([id, q]) => (
                            <li key={id} className="flex justify-between">
                              <span>{q} × {byId(id).name}</span>
                              <span className="opacity-80">{inr(byId(id).price * q)}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                    <div className="mt-4 flex justify-between border-t border-white/15 pt-3 text-base font-semibold">
                      <span>Total</span>
                      <span>{inr(total)}</span>
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] opacity-60">Pickup time</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {pickupSlots.map((s) => (
                        <button type="button" key={s} onClick={() => setSlot(s)} className="rounded-lg py-2 text-xs font-semibold" style={slot === s ? { backgroundColor: butter, color: cocoa } : { backgroundColor: "rgba(251,244,232,0.08)" }}>
                          {s}
                        </button>
                      ))}
                    </div>
                    <input required placeholder="Name for the bag" className="mt-4 w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm outline-none placeholder:text-white/40" />
                    <button type="submit" disabled={count === 0} className="mt-4 w-full rounded-full py-3 text-sm font-bold transition-opacity disabled:opacity-40" style={{ backgroundColor: butter, color: cocoa }}>
                      Place pickup order · {inr(total)}
                    </button>
                  </form>
                )}
              </aside>
            </section>
          )}

          {/* ── Visit ── */}
          {page === 3 && (
            <section className={`grid gap-8 ${pick(m, "grid-cols-1 px-4 py-8", "grid-cols-2 px-10 py-12")}`}>
              <div>
                <p className="text-2xl" style={{ fontFamily: script, color: crust }}>come say hi</p>
                <h1 className={pick(m, "text-5xl", "text-6xl")} style={{ fontFamily: serif }}>Visit the bakehouse</h1>
                {/* Illustrated map */}
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl" style={{ backgroundColor: "#EFE6D6" }}>
                  <div className="absolute inset-0 [background-image:linear-gradient(#fff_2px,transparent_2px),linear-gradient(90deg,#fff_2px,transparent_2px)] [background-size:56px_44px]" />
                  <div className="absolute left-0 right-0 top-[58%] h-5 bg-white" />
                  <div className="absolute bottom-0 top-0 left-[38%] w-5 bg-white" />
                  <div className="absolute right-[8%] top-[10%] h-16 w-24 rounded-xl" style={{ backgroundColor: `${pistachio}66` }} />
                  <span className="absolute left-[44%] top-[63%] text-[10px] font-semibold uppercase tracking-[0.15em] opacity-50">Chapel Rd</span>
                  <motion.span className="absolute left-[39%] top-[34%] flex flex-col items-center" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg" style={{ backgroundColor: crust }}>
                      <LogoMark slug="bakery-cafe" color="#fff" accent={butter} className="h-6 w-6" />
                    </span>
                    <span className="h-2 w-0.5" style={{ backgroundColor: crust }} />
                  </motion.span>
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <MapPin size={15} style={{ color: crust }} /> 14 Chapel Road, Bandra West, Mumbai
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Pet-friendly terrace", "Laptops welcome till 11", "Wheelchair access", "Free Wi-Fi"].map((a) => (
                    <span key={a} className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${pistachio}26` }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-5">
                  <p className="text-xl" style={{ fontFamily: serif }}>Opening hours</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {hours.map((h, i) => (
                      <li key={h.day} className="flex justify-between rounded-lg px-2 py-1.5" style={i === todayRow ? { backgroundColor: `${butter}80`, fontWeight: 600 } : undefined}>
                        <span>
                          {h.day}
                          {i === todayRow && <span className="ml-2 text-base" style={{ fontFamily: script, color: crust }}>today</span>}
                        </span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl p-5" style={{ backgroundColor: cocoa, color: flour }}>
                  {booked ? (
                    <DemoDone title={`Table for ${party} at ${time} — see you soon!`} body="Crumb & Co. would confirm on WhatsApp and hold the table for 15 minutes." color={flour} accent={crust} font={serif} onReset={() => setBooked(false)} />
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setBooked(true);
                      }}
                    >
                      <p className="text-xl" style={{ fontFamily: serif }}>Save a table</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm opacity-75">Guests</span>
                        <span className="flex items-center gap-3">
                          <button type="button" onClick={() => setParty((p) => Math.max(1, p - 1))} aria-label="Fewer guests" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Minus size={13} /></button>
                          <span className="w-4 text-center font-semibold">{party}</span>
                          <button type="button" onClick={() => setParty((p) => Math.min(8, p + 1))} aria-label="More guests" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Plus size={13} /></button>
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {["8:30", "10:00", "12:30", "16:00"].map((t) => (
                          <button type="button" key={t} onClick={() => setTime(t)} className="rounded-lg py-2 text-xs font-semibold" style={time === t ? { backgroundColor: butter, color: cocoa } : { backgroundColor: "rgba(251,244,232,0.08)" }}>
                            {t}
                          </button>
                        ))}
                      </div>
                      <input required placeholder="Your name" className="mt-4 w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm outline-none placeholder:text-white/40" />
                      <button type="submit" className="mt-4 w-full rounded-full py-3 text-sm font-bold" style={{ backgroundColor: butter, color: cocoa }}>
                        Save my table
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      <footer className={`flex items-center justify-between text-xs ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: cocoa, color: `${flour}99` }}>
        <span className="text-xl" style={{ fontFamily: serif, color: flour }}>Crumb &amp; Co.</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
