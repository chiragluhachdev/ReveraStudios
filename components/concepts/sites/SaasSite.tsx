"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Check, CheckCircle2, GitBranch, Menu, Plug, ShieldCheck, X, Zap } from "lucide-react";
import LogoMark from "@/components/concepts/LogoMark";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { DemoDone, pick } from "@/components/concepts/sites/shared";

const bars = [42, 58, 51, 70, 64, 82, 76, 91, 85, 97];
const runs = [
  { name: "Invoice approvals", status: "Running", time: "2m ago" },
  { name: "Vendor onboarding", status: "Done", time: "14m ago" },
  { name: "Weekly ops report", status: "Scheduled", time: "Mon 9:00" },
];
const features = [
  { key: "Automations", icon: Zap, title: "Build workflows without code", body: "Drag triggers, conditions and actions into a flow. If it repeats, Flowline runs it." },
  { key: "Dashboards", icon: BarChart3, title: "Every workflow, one live screen", body: "See what's running, what's stuck and who it's waiting on — updated in real time." },
  { key: "Approvals", icon: ShieldCheck, title: "Approvals in one tap", body: "Route spend, access and contract approvals to the right person with a full audit trail." },
  { key: "Integrations", icon: Plug, title: "Plugs into your stack", body: "Works with the tools your team already uses — no migration project required." },
] as const;
const plans = [
  { name: "Starter", monthly: 19, who: "Small teams getting started", perks: ["5 workflows", "1,000 runs / mo", "Email support"] },
  { name: "Team", monthly: 49, who: "Growing ops teams", perks: ["Unlimited workflows", "25,000 runs / mo", "Approvals & audit log", "Priority support"], featured: true },
  { name: "Scale", monthly: 99, who: "Multi-team organisations", perks: ["Everything in Team", "SSO & roles", "Dedicated success manager"] },
];

export default function SaasSite({ concept, page, go, m }: SiteProps) {
  const [mist, night, electric, signal, haze] = concept.brand.palette.map((c) => c.hex);
  const display = concept.brand.displayFont;
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState(0);
  const [yearly, setYearly] = useState(true);
  const [demo, setDemo] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };
  const openDemo = () => {
    setDone(false);
    setDemo(true);
  };

  const navLink = (label: string, i: number) => (
    <button
      key={label}
      onClick={() => {
        go(i);
        setMenu(false);
      }}
      className="text-sm font-medium transition-colors"
      style={{ color: page === i ? "#fff" : "#ffffff99" }}
    >
      {label}
    </button>
  );

  const Feature = features[tab];

  return (
    <div style={{ backgroundColor: mist, color: night, fontFamily: concept.brand.bodyFont }}>
      <header className="sticky top-0 z-20 border-b border-white/10" style={{ backgroundColor: `${night}F2` }}>
        <div className={`flex items-center justify-between ${pick(m, "px-5 py-3.5", "px-10 py-4")}`}>
          <button onClick={() => go(0)} className="flex items-center gap-2 text-white">
            <LogoMark slug="saas" color="#fff" accent={signal} className="h-7 w-7" />
            <span className="text-lg font-semibold tracking-[-0.03em]" style={{ fontFamily: display }}>
              flowline
            </span>
          </button>
          {m ? (
            <button onClick={() => setMenu((v) => !v)} aria-label="Menu" className="text-white">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          ) : (
            <nav className="flex items-center gap-7">
              {concept.website.pages.map(navLink)}
              <button onClick={openDemo} className="text-sm font-medium text-white/80">
                Book a demo
              </button>
              <button className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: electric }}>
                Start free trial
              </button>
            </nav>
          )}
        </div>
        <AnimatePresence>
          {m && menu && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col items-start gap-3 overflow-hidden px-5 pb-4">
              {concept.website.pages.map(navLink)}
              <button onClick={openDemo} className="text-sm font-medium" style={{ color: signal }}>
                Book a demo →
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {page === 0 && (
            <>
              <section className={`relative overflow-hidden text-center text-white ${pick(m, "px-5 pb-10 pt-10", "px-10 pb-14 pt-16")}`} style={{ backgroundColor: night }}>
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl" style={{ backgroundColor: electric }} />
                <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: signal }} />
                  New: live dashboards
                </span>
                <h1 className={`relative mx-auto mt-5 max-w-2xl font-semibold leading-[1.02] tracking-[-0.045em] ${pick(m, "text-4xl", "text-6xl")}`} style={{ fontFamily: display }}>
                  Operations on autopilot.
                </h1>
                <p className="relative mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/65">
                  Flowline automates approvals, handoffs and reports for ops teams — so people work on decisions, not data entry.
                </p>
                <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                  <button className="rounded-lg px-5 py-3 text-sm font-semibold" style={{ backgroundColor: electric }}>
                    Start free trial
                  </button>
                  <button onClick={openDemo} className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold">
                    Book a demo
                  </button>
                </div>

                {/* Product dashboard mock */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl text-left text-[11px] ring-1 ring-white/10"
                  style={{ backgroundColor: "#12151D" }}
                >
                  <div className="flex">
                    {!m && (
                      <aside className="w-36 space-y-2 border-r border-white/10 p-3 text-white/50">
                        {["Overview", "Workflows", "Approvals", "Reports"].map((x, i) => (
                          <p key={x} className="rounded-md px-2 py-1.5" style={i === 0 ? { backgroundColor: `${electric}33`, color: "#fff" } : undefined}>
                            {x}
                          </p>
                        ))}
                      </aside>
                    )}
                    <div className="flex-1 space-y-3 p-4">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          ["Runs today", "1,284"],
                          ["Hours saved", "312"],
                          ["Stuck", "3"],
                        ].map(([l, v]) => (
                          <div key={l} className="rounded-lg bg-white/5 p-2.5">
                            <p className="text-white/45">{l}</p>
                            <p className="mt-1 text-lg font-semibold text-white" style={{ fontFamily: display }}>{v}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex h-24 items-end gap-1.5 rounded-lg bg-white/5 p-3">
                        {bars.map((h, i) => (
                          <motion.span
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{ backgroundColor: i === bars.length - 1 ? signal : electric }}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 0.4 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        {runs.map((r) => (
                          <div key={r.name} className="flex items-center justify-between rounded-md bg-white/5 px-2.5 py-2 text-white/75">
                            <span>{r.name}</span>
                            <span className="flex items-center gap-2">
                              <span className="rounded px-1.5 py-0.5" style={{ backgroundColor: r.status === "Done" ? `${signal}33` : r.status === "Running" ? `${electric}40` : "#ffffff14", color: r.status === "Done" ? signal : "#fff" }}>
                                {r.status}
                              </span>
                              {!m && <span className="text-white/35">{r.time}</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
              <section className={pick(m, "px-5 py-10", "px-10 py-12")}>
                <p className="text-center text-xs font-medium uppercase tracking-[0.2em] opacity-50">Trusted by ops teams at</p>
                <div className={`mt-5 grid gap-4 text-center text-lg font-semibold opacity-40 ${pick(m, "grid-cols-2", "grid-cols-5")}`} style={{ fontFamily: display }}>
                  {["Northwind", "Kestrel", "Halcyon", "Orbitly", "Mapleton"].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
                <div className={`mt-10 grid gap-4 ${pick(m, "grid-cols-1", "grid-cols-3")}`}>
                  {[
                    ["11h", "saved per person, every week"],
                    ["63%", "fewer manual handoffs"],
                    ["10 min", "to your first live workflow"],
                  ].map(([v, l]) => (
                    <div key={l} className="rounded-xl bg-white p-5 ring-1 ring-black/5">
                      <p className="text-3xl font-semibold tracking-[-0.04em]" style={{ fontFamily: display, color: electric }}>{v}</p>
                      <p className="mt-1 text-sm opacity-65">{l}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {page === 1 && (
            <section className={pick(m, "px-5 py-10", "px-10 py-14")}>
              <h1 className={`font-semibold tracking-[-0.045em] ${pick(m, "text-4xl", "text-5xl")}`} style={{ fontFamily: display }}>
                Everything ops needs. Nothing it doesn&apos;t.
              </h1>
              <div className={`mt-8 grid gap-6 ${pick(m, "grid-cols-1", "grid-cols-5")}`}>
                <div className={`flex gap-2 ${pick(m, "overflow-x-auto pb-1", "col-span-2 flex-col")}`} role="tablist">
                  {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.key}
                        role="tab"
                        aria-selected={tab === i}
                        onClick={() => setTab(i)}
                        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors"
                        style={tab === i ? { backgroundColor: night, color: "#fff" } : { backgroundColor: "#fff" }}
                      >
                        <Icon size={16} style={{ color: tab === i ? signal : electric }} />
                        {f.key}
                      </button>
                    );
                  })}
                </div>
                <div className={pick(m, "", "col-span-3")}>
                  <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
                      <h3 className="text-2xl font-semibold tracking-[-0.03em]" style={{ fontFamily: display }}>{Feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed opacity-70">{Feature.body}</p>
                      <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: haze }}>
                        {tab === 0 && (
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                            {["Form submitted", "Amount > ₹50k?", "Ask finance", "Notify Slack"].map((s, i) => (
                              <span key={s} className="flex items-center gap-2">
                                <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 shadow-sm">
                                  <GitBranch size={12} style={{ color: electric }} /> {s}
                                </motion.span>
                                {i < 3 && <span className="opacity-40">→</span>}
                              </span>
                            ))}
                          </div>
                        )}
                        {tab === 1 && (
                          <div className="flex h-24 items-end gap-1.5">
                            {bars.map((h, i) => (
                              <motion.span key={i} className="flex-1 rounded-sm" style={{ backgroundColor: electric }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.04 }} />
                            ))}
                          </div>
                        )}
                        {tab === 2 && (
                          <div className="space-y-2 text-xs">
                            {["Laptop for new hire — ₹92,000", "Annual design tool licence — ₹48,000"].map((a, i) => (
                              <motion.div key={a} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5">
                                <span>{a}</span>
                                <span className="flex items-center gap-1 font-semibold" style={{ color: "#1a9e68" }}>
                                  <CheckCircle2 size={13} /> Approved
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        )}
                        {tab === 3 && (
                          <div className="grid grid-cols-4 gap-2">
                            {["Sl", "Gm", "Sh", "Nt", "Hs", "Xe", "Jr", "Dr"].map((x, i) => (
                              <motion.span key={x} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05, type: "spring" }} className="flex aspect-square items-center justify-center rounded-lg bg-white text-sm font-semibold shadow-sm" style={{ fontFamily: display }}>
                                {x}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </section>
          )}

          {page === 2 && (
            <section className={pick(m, "px-5 py-10", "px-10 py-14")}>
              <div className="text-center">
                <h1 className={`font-semibold tracking-[-0.045em] ${pick(m, "text-4xl", "text-5xl")}`} style={{ fontFamily: display }}>
                  Simple, honest pricing
                </h1>
                <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-white p-1 text-sm font-medium ring-1 ring-black/5">
                  {[false, true].map((y) => (
                    <button key={String(y)} onClick={() => setYearly(y)} className="rounded-full px-4 py-1.5 transition-colors" style={yearly === y ? { backgroundColor: night, color: "#fff" } : undefined}>
                      {y ? "Yearly · save 20%" : "Monthly"}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`mt-8 grid gap-4 ${pick(m, "grid-cols-1", "grid-cols-3")}`}>
                {plans.map((p) => {
                  const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly;
                  return (
                    <div key={p.name} className="relative flex flex-col rounded-2xl p-6" style={p.featured ? { backgroundColor: night, color: "#fff" } : { backgroundColor: "#fff" }}>
                      {p.featured && (
                        <span className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-semibold" style={{ backgroundColor: signal, color: night }}>
                          Most popular
                        </span>
                      )}
                      <p className="text-lg font-semibold" style={{ fontFamily: display }}>{p.name}</p>
                      <p className="text-xs opacity-60">{p.who}</p>
                      <p className="mt-4 text-4xl font-semibold tracking-[-0.04em]" style={{ fontFamily: display }}>
                        $
                        <AnimatePresence mode="wait">
                          <motion.span key={price} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="inline-block">
                            {price}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-sm font-normal opacity-60"> /user/mo</span>
                      </p>
                      <ul className="mt-5 flex-1 space-y-2 text-sm">
                        {p.perks.map((k) => (
                          <li key={k} className="flex items-center gap-2">
                            <Check size={14} style={{ color: p.featured ? signal : electric }} /> {k}
                          </li>
                        ))}
                      </ul>
                      <button onClick={p.name === "Scale" ? openDemo : undefined} className="mt-6 rounded-lg py-2.5 text-sm font-semibold" style={p.featured ? { backgroundColor: electric, color: "#fff" } : { backgroundColor: mist }}>
                        {p.name === "Scale" ? "Book a demo" : "Start free trial"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      {/* Book-a-demo sheet (inside the preview) */}
      <AnimatePresence>
        {demo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sticky bottom-0 z-30 p-4">
            <motion.div initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} className="relative mx-auto max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10">
              <button onClick={() => setDemo(false)} aria-label="Close" className="absolute right-3 top-3 opacity-50 hover:opacity-100">
                <X size={18} />
              </button>
              {done ? (
                <DemoDone title="Demo booked for Thursday, 11:00." body="Flowline would send a calendar invite and a short prep survey." color={night} accent={electric} font={display} onReset={() => setDone(false)} />
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <p className="text-xl font-semibold tracking-[-0.03em]" style={{ fontFamily: display }}>Book a 20-minute demo</p>
                  <input required type="email" placeholder="Work email" className="block w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ backgroundColor: mist }} />
                  <select className="block w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ backgroundColor: mist }}>
                    {["Team size: 10–50", "Team size: 50–200", "Team size: 200+"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button type="submit" className="w-full rounded-lg py-3 text-sm font-semibold text-white" style={{ backgroundColor: electric }}>
                    Book my demo
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={`flex items-center justify-between text-xs text-white/50 ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: night }}>
        <span className="text-base font-semibold text-white" style={{ fontFamily: display }}>flowline</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
