"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Minus, Plus, X } from "lucide-react";
import { unsplash } from "@/lib/concepts";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { DemoDone, pick } from "@/components/concepts/sites/shared";
import {
  FashionCategory,
  fashionCategories,
  FREE_SHIPPING,
  inr,
  Product,
  productById,
  products,
  Size,
  sizes,
} from "@/components/concepts/sites/fashionData";

const EASE = [0.16, 1, 0.3, 1] as const;
type BagLine = { key: string; id: string; size: Size; colour: string; qty: number };

const sizeChart: Record<Size, [string, string]> = {
  XS: ["82", "64"],
  S: ["86", "68"],
  M: ["92", "74"],
  L: ["98", "80"],
  XL: ["104", "86"],
};

/* Product tile — hover swaps to the alternate image. Top-level so it never remounts. */
function ProductCard({
  p,
  serif,
  onOpen,
  onQuickAdd,
  m,
}: {
  p: Product;
  serif: string;
  onOpen: () => void;
  onQuickAdd: () => void;
  m: boolean;
}) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#E7E1D7]">
        <button onClick={onOpen} className="absolute inset-0" aria-label={`View ${p.name}`}>
          <Image src={p.image} alt={p.name} fill sizes="300px" className="object-cover transition-opacity duration-700 group-hover:opacity-0" />
          <Image src={p.alt} alt="" fill sizes="300px" className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
        </button>
        {p.isNew && <span className="pointer-events-none absolute left-2.5 top-2.5 bg-white px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-black">New</span>}
        <button
          onClick={onQuickAdd}
          className={`absolute inset-x-2.5 bottom-2.5 bg-white/95 py-2 text-[10px] uppercase tracking-[0.2em] text-black transition-all duration-300 ${
            m ? "" : "translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          Quick add · M
        </button>
      </div>
      <button onClick={onOpen} className="mt-3 block w-full text-left">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[15px] leading-tight" style={{ fontFamily: serif }}>{p.name}</span>
          <span className="text-xs">{inr(p.price)}</span>
        </div>
        <span className="mt-1.5 flex gap-1.5">
          {p.colours.map((c) => (
            <span key={c.name} className="h-2.5 w-2.5 rounded-full ring-1 ring-black/15" style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </span>
      </button>
    </div>
  );
}

export default function FashionSite({ concept, page, go, m }: SiteProps) {
  const [bone, noir, oxblood, taupe, stone] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const [menu, setMenu] = useState(false);
  const [cat, setCat] = useState<"All" | FashionCategory>("All");
  const [sort, setSort] = useState("Featured");
  const [pid, setPid] = useState("overcoat");
  const [colour, setColour] = useState(0);
  const [size, setSize] = useState<Size | null>(null);
  const [nudge, setNudge] = useState(0);
  const [guide, setGuide] = useState(false);
  const [view, setView] = useState<"main" | "alt">("main");
  const [open, setOpen] = useState<string | null>("Fabric & care");
  const [bag, setBag] = useState<BagLine[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const product = productById(pid);
  const count = bag.reduce((a, l) => a + l.qty, 0);
  const subtotal = bag.reduce((a, l) => a + productById(l.id).price * l.qty, 0);
  const shipLeft = Math.max(0, FREE_SHIPPING - subtotal);

  const openProduct = (id: string) => {
    setPid(id);
    setColour(0);
    setSize(null);
    setGuide(false);
    setView("main");
    go(2);
  };
  const addLine = (id: string, s: Size, c: string) => {
    const key = `${id}-${s}-${c}`;
    setBag((b) => (b.some((l) => l.key === key) ? b.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...b, { key, id, size: s, colour: c, qty: 1 }]));
    setToast(`${productById(id).name} · ${s}`);
    setTimeout(() => setToast(null), 1800);
  };
  const quickAdd = (p: Product) => addLine(p.id, p.soldOut.includes("M") ? "L" : "M", p.colours[0].name);
  const addToBag = () => {
    if (!size) {
      setNudge((n) => n + 1);
      return;
    }
    addLine(product.id, size, product.colours[colour].name);
  };
  const changeQty = (key: string, d: number) => setBag((b) => b.map((l) => (l.key === key ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0));
  const checkout = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  const shown = products
    .filter((p) => cat === "All" || p.category === cat)
    .sort((a, b) => (sort === "Price: low to high" ? a.price - b.price : sort === "Price: high to low" ? b.price - a.price : 0));
  const completeLook = products.filter((p) => p.id !== product.id && p.category !== product.category).slice(0, 2);

  const navLinks = (
    <>
      {[
        ["Shop", () => { setCat("All"); go(1); }],
        ["New in", () => { setCat("All"); setSort("Featured"); go(1); }],
        ["Outerwear", () => { setCat("Outerwear"); go(1); }],
      ].map(([label, fn]) => (
        <button key={label as string} onClick={() => { (fn as () => void)(); setMenu(false); }} className="text-[11px] uppercase tracking-[0.22em]">
          {label as string}
        </button>
      ))}
    </>
  );

  return (
    <div className="relative" style={{ backgroundColor: bone, color: noir, fontFamily: concept.brand.bodyFont }}>
      <div className="py-2 text-center text-[10px] uppercase tracking-[0.25em]" style={{ backgroundColor: noir, color: bone }}>
        {shipLeft > 0 && subtotal > 0 ? `${inr(shipLeft)} away from complimentary shipping` : "Complimentary shipping over ₹4,999 · 15-day returns"}
      </div>

      <header className="sticky top-0 z-20 border-b backdrop-blur" style={{ backgroundColor: `${bone}F2`, borderColor: `${noir}14` }}>
        <div className={`grid grid-cols-3 items-center ${pick(m, "px-4 py-3.5", "px-10 py-5")}`}>
          <div className="flex items-center gap-6">
            {m ? (
              <button onClick={() => setMenu((v) => !v)} aria-label="Menu">
                {menu ? <X size={19} /> : <Menu size={19} />}
              </button>
            ) : (
              navLinks
            )}
          </div>
          <button onClick={() => go(0)} className="justify-self-center text-2xl tracking-[0.32em]" style={{ fontFamily: serif, fontWeight: 500 }}>
            FORMÉ
          </button>
          <button onClick={() => go(3)} className="justify-self-end text-[11px] uppercase tracking-[0.22em]">
            Bag (
            <motion.span key={count} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
              {count}
            </motion.span>
            )
          </button>
        </div>
        <AnimatePresence>
          {m && menu && (
            <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="flex flex-col items-start gap-4 overflow-hidden px-4 pb-5">
              {navLinks}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={`${page}-${page === 2 ? pid : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
          {/* ── Home ── */}
          {page === 0 && (
            <>
              <section className="relative">
                <div className={`grid ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                  {["1475180098004-ca77a66827be", "1581044777550-4cfa60707c03"].slice(0, m ? 1 : 2).map((id) => (
                    <motion.div key={id} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: EASE }} className={`relative overflow-hidden ${pick(m, "h-[480px]", "h-[540px]")}`}>
                      <Image src={unsplash(id, 1200)} alt="Formé AW26 campaign" fill sizes="450px" className="object-cover" />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/55 via-transparent to-transparent pb-12 text-center text-white">
                  <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.3em" }} transition={{ duration: 1.2, delay: 0.2 }} className="text-[10px] uppercase">
                    Autumn — Winter 2026
                  </motion.p>
                  <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease: EASE }} className={`mt-3 italic leading-none ${pick(m, "text-6xl", "text-8xl")}`} style={{ fontFamily: serif }}>
                    Quiet Hours
                  </motion.h1>
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} onClick={() => go(1)} className="mt-6 border border-white px-7 py-3 text-[10px] uppercase tracking-[0.25em] transition-colors hover:bg-white hover:text-black">
                    Shop the collection
                  </motion.button>
                </div>
              </section>

              <section className={pick(m, "px-4 py-10", "px-10 py-14")}>
                <div className="flex items-baseline justify-between">
                  <h2 className={pick(m, "text-3xl", "text-4xl")} style={{ fontFamily: serif }}>New in</h2>
                  <button onClick={() => go(1)} className="text-[10px] uppercase tracking-[0.22em] underline underline-offset-4">View all</button>
                </div>
                <div className={`mt-6 ${pick(m, "-mx-4 flex gap-3 overflow-x-auto px-4", "grid grid-cols-4 gap-5")}`}>
                  {products.filter((p) => p.isNew || p.id === "dress").slice(0, 4).map((p) => (
                    <div key={p.id} className={m ? "w-[62%] shrink-0" : ""}>
                      <ProductCard p={p} serif={serif} m={m} onOpen={() => openProduct(p.id)} onQuickAdd={() => quickAdd(p)} />
                    </div>
                  ))}
                </div>
              </section>

              <section className={`grid items-center ${pick(m, "grid-cols-1", "grid-cols-2")}`} style={{ backgroundColor: stone }}>
                <div className={`relative ${pick(m, "aspect-[4/5]", "h-[520px]")}`}>
                  <Image src={unsplash("1539109136881-3be0616acf4b", 1000)} alt="The Formé wool overcoat" fill sizes="450px" className="object-cover" />
                </div>
                <div className={pick(m, "p-6", "p-14")}>
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">The edit</p>
                  <h2 className={`mt-3 leading-[1.02] ${pick(m, "text-4xl", "text-5xl")}`} style={{ fontFamily: serif }}>
                    The overcoat, <em>considered.</em>
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-75">
                    Italian wool with a whisper of cashmere, cut long and relaxed with a hand-stitched collar. Made in a single run of 200.
                  </p>
                  <button onClick={() => openProduct("overcoat")} className="mt-6 px-7 py-3 text-[10px] uppercase tracking-[0.25em] text-white" style={{ backgroundColor: noir }}>
                    Shop the coat · {inr(productById("overcoat").price)}
                  </button>
                </div>
              </section>

              <section className={pick(m, "px-4 py-10", "px-10 py-14")}>
                <div className={`grid gap-3 ${pick(m, "grid-cols-2", "grid-cols-4")}`}>
                  {(["Outerwear", "Knitwear", "Tailoring", "Essentials"] as const).map((c) => {
                    const img = { Outerwear: "1591047139829-d91aecb6caea", Knitwear: "1558769132-cb1aea458c5e", Tailoring: "1617137968427-85924c800a22", Essentials: "1562157873-818bc0726f68" }[c];
                    return (
                      <button key={c} onClick={() => { setCat(c); go(1); }} className="group relative aspect-[3/4] overflow-hidden text-left">
                        <Image src={unsplash(img, 700)} alt={c} fill sizes="240px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-xl italic text-white" style={{ fontFamily: serif }}>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={`grid border-t text-center ${pick(m, "grid-cols-2", "grid-cols-4")}`} style={{ borderColor: `${noir}1A` }}>
                {[
                  ["120–200", "pieces per style"],
                  ["86%", "natural fibres"],
                  ["Mumbai", "where it's made"],
                  ["15 days", "free returns"],
                ].map(([v, l]) => (
                  <div key={l} className={pick(m, "py-6", "py-10")}>
                    <p className="text-3xl italic" style={{ fontFamily: serif, color: oxblood }}>{v}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-60">{l}</p>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* ── Shop ── */}
          {page === 1 && (
            <section className={pick(m, "px-4 py-8", "px-10 py-12")}>
              <div className="flex items-baseline justify-between">
                <h1 className={pick(m, "text-4xl", "text-5xl")} style={{ fontFamily: serif }}>{cat === "All" ? "Shop all" : cat}</h1>
                <span className="text-[10px] uppercase tracking-[0.22em] opacity-60">{shown.length} pieces</span>
              </div>
              <div className={`mt-5 flex gap-3 ${pick(m, "flex-col", "items-center justify-between")}`}>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  {(["All", ...fashionCategories] as const).map((c) => (
                    <button key={c} onClick={() => setCat(c)} className="shrink-0 border px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors" style={cat === c ? { backgroundColor: noir, color: bone, borderColor: noir } : { borderColor: `${noir}33` }}>
                      {c}
                    </button>
                  ))}
                </div>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-fit border-b bg-transparent py-1 text-[11px] uppercase tracking-[0.15em] outline-none" style={{ borderColor: `${noir}40` }}>
                  {["Featured", "Price: low to high", "Price: high to low"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <motion.div layout className={`mt-7 grid gap-x-4 gap-y-8 ${pick(m, "grid-cols-2", "grid-cols-3")}`}>
                <AnimatePresence mode="popLayout">
                  {shown.map((p) => (
                    <motion.div key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <ProductCard p={p} serif={serif} m={m} onOpen={() => openProduct(p.id)} onQuickAdd={() => quickAdd(p)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}

          {/* ── Product ── */}
          {page === 2 && (
            <section className={`grid gap-8 ${pick(m, "grid-cols-1 pb-10", "grid-cols-[1.2fr_1fr] px-10 py-10")}`}>
              <div className={pick(m, "", "grid grid-cols-2 gap-3")}>
                {m ? (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                        <Image src={view === "main" ? product.image : product.alt} alt={product.name} fill sizes="400px" className="object-cover" />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {(["main", "alt"] as const).map((v) => (
                        <button key={v} onClick={() => setView(v)} aria-label={`Image ${v}`} className="h-1.5 rounded-full transition-all" style={{ width: view === v ? 18 : 6, backgroundColor: "#fff" }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  [product.image, product.alt].map((src, i) => (
                    <motion.div key={src + i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, ease: EASE }} className="relative aspect-[3/4] overflow-hidden">
                      <Image src={src} alt={i ? "" : product.name} fill sizes="300px" className="object-cover" />
                    </motion.div>
                  ))
                )}
              </div>

              <div className={m ? "px-4" : ""}>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">{product.category}</p>
                <h1 className={`mt-2 leading-tight ${pick(m, "text-4xl", "text-5xl")}`} style={{ fontFamily: serif }}>{product.name}</h1>
                <p className="mt-2 text-sm">{inr(product.price)}</p>

                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] opacity-60">Colour — {product.colours[colour].name}</p>
                <div className="mt-2 flex gap-2">
                  {product.colours.map((c, i) => (
                    <button key={c.name} onClick={() => setColour(i)} aria-label={c.name} className="h-8 w-8 rounded-full p-0.5 transition-all" style={{ boxShadow: colour === i ? `0 0 0 1.5px ${noir}` : `0 0 0 1px ${noir}26` }}>
                      <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-baseline justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Size</p>
                  <button onClick={() => setGuide((g) => !g)} className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-4">Size guide</button>
                </div>
                <motion.div key={nudge} animate={nudge ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.4 }} className="mt-2 grid grid-cols-5 gap-2">
                  {sizes.map((s) => {
                    const out = product.soldOut.includes(s);
                    return (
                      <button
                        key={s}
                        disabled={out}
                        onClick={() => setSize(s)}
                        className={`relative border py-2.5 text-xs transition-colors ${out ? "cursor-not-allowed opacity-35 line-through" : ""}`}
                        style={size === s ? { backgroundColor: noir, color: bone, borderColor: noir } : { borderColor: `${noir}33` }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </motion.div>
                {nudge > 0 && !size && <p className="mt-2 text-xs" style={{ color: oxblood }}>Choose a size first.</p>}
                <AnimatePresence initial={false}>
                  {guide && (
                    <motion.table initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 w-full overflow-hidden text-left text-xs">
                      <thead>
                        <tr className="opacity-60">
                          <th className="py-1 font-normal">Size</th>
                          <th className="py-1 font-normal">Bust (cm)</th>
                          <th className="py-1 font-normal">Waist (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizes.map((s) => (
                          <tr key={s} className="border-t" style={{ borderColor: `${noir}14`, fontWeight: size === s ? 600 : 400 }}>
                            <td className="py-1">{s}</td>
                            <td className="py-1">{sizeChart[s][0]}</td>
                            <td className="py-1">{sizeChart[s][1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </motion.table>
                  )}
                </AnimatePresence>
                <p className="mt-3 text-xs opacity-60">Fit: {product.fit}</p>

                <motion.button whileTap={{ scale: 0.98 }} onClick={addToBag} className="mt-6 w-full py-4 text-[11px] uppercase tracking-[0.25em] text-white" style={{ backgroundColor: noir }}>
                  {size ? `Add to bag — ${size}` : "Select a size"}
                </motion.button>

                <div className="mt-6 divide-y border-y" style={{ borderColor: `${noir}1A` }}>
                  {[
                    ["Fabric & care", `${product.fabric}. Dry clean or cool hand wash. Dry flat.`],
                    ["Made by", "Cut and sewn in our partner atelier in Mumbai, in a small, numbered run."],
                    ["Shipping & returns", "Ships in 48 hours. Complimentary over ₹4,999. Free returns within 15 days."],
                  ].map(([t, body]) => (
                    <div key={t} className="py-3" style={{ borderColor: `${noir}1A` }}>
                      <button onClick={() => setOpen(open === t ? null : t)} className="flex w-full items-center justify-between text-[11px] uppercase tracking-[0.18em]">
                        {t}
                        <ChevronDown size={14} className="transition-transform" style={{ transform: open === t ? "rotate(180deg)" : "none" }} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open === t && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2 text-sm leading-relaxed opacity-75">
                            {body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[10px] uppercase tracking-[0.3em] opacity-60">Complete the look</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {completeLook.map((p) => (
                    <button key={p.id} onClick={() => openProduct(p.id)} className="group text-left">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image src={p.image} alt={p.name} fill sizes="160px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <p className="mt-2 text-sm" style={{ fontFamily: serif }}>{p.name}</p>
                      <p className="text-xs opacity-60">{inr(p.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Bag ── */}
          {page === 3 && (
            <section className={`grid gap-8 ${pick(m, "grid-cols-1 px-4 py-8", "grid-cols-[1.4fr_1fr] px-10 py-12")}`}>
              <div>
                <h1 className={pick(m, "text-4xl", "text-5xl")} style={{ fontFamily: serif }}>Your bag</h1>
                {bag.length === 0 ? (
                  <div className="mt-8">
                    <p className="text-sm opacity-70">Your bag is empty — the overcoat is lonely.</p>
                    <button onClick={() => go(1)} className="mt-5 px-7 py-3 text-[10px] uppercase tracking-[0.25em] text-white" style={{ backgroundColor: noir }}>
                      Continue shopping
                    </button>
                  </div>
                ) : (
                  <ul className="mt-6 divide-y border-y" style={{ borderColor: `${noir}1A` }}>
                    <AnimatePresence initial={false}>
                      {bag.map((l) => {
                        const p = productById(l.id);
                        return (
                          <motion.li key={l.key} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="flex gap-4 py-4" style={{ borderColor: `${noir}1A` }}>
                            <div className="relative h-28 w-20 shrink-0 overflow-hidden">
                              <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between gap-2">
                                <span style={{ fontFamily: serif }}>{p.name}</span>
                                <span className="text-sm">{inr(p.price * l.qty)}</span>
                              </div>
                              <span className="mt-1 text-xs opacity-60">{l.colour} · {l.size}</span>
                              <div className="mt-auto flex items-center gap-3 pt-2">
                                <button onClick={() => changeQty(l.key, -1)} aria-label="Decrease" className="flex h-6 w-6 items-center justify-center border" style={{ borderColor: `${noir}33` }}><Minus size={11} /></button>
                                <span className="text-xs">{l.qty}</span>
                                <button onClick={() => changeQty(l.key, 1)} aria-label="Increase" className="flex h-6 w-6 items-center justify-center border" style={{ borderColor: `${noir}33` }}><Plus size={11} /></button>
                                <button onClick={() => changeQty(l.key, -l.qty)} className="ml-auto text-[10px] uppercase tracking-[0.18em] underline underline-offset-4 opacity-70">Remove</button>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                )}
              </div>
              <aside className="h-fit p-6" style={{ backgroundColor: stone }}>
                {done ? (
                  <DemoDone title="Order FS-0926 placed." body="Formé would send a confirmation now and tracking with styling notes once it ships." color={noir} accent={oxblood} font={serif} onReset={() => { setDone(false); setBag([]); }} />
                ) : (
                  <form onSubmit={checkout}>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">Summary</p>
                    <div className="mt-4 h-1 overflow-hidden rounded-full" style={{ backgroundColor: `${noir}14` }}>
                      <motion.div className="h-full" style={{ backgroundColor: oxblood }} animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
                    </div>
                    <p className="mt-2 text-xs opacity-70">{shipLeft > 0 ? `${inr(shipLeft)} away from complimentary shipping` : "Complimentary shipping unlocked"}</p>
                    <div className="mt-5 space-y-1.5 text-sm">
                      <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span>{inr(subtotal)}</span></div>
                      <div className="flex justify-between"><span className="opacity-70">Shipping</span><span>{subtotal === 0 ? "—" : shipLeft > 0 ? inr(250) : "Free"}</span></div>
                      <div className="flex justify-between border-t pt-2 text-base" style={{ borderColor: `${noir}26` }}>
                        <span>Total</span>
                        <span>{inr(subtotal + (subtotal > 0 && shipLeft > 0 ? 250 : 0))}</span>
                      </div>
                    </div>
                    <input required type="email" placeholder="Email for your receipt" className="mt-5 w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: `${noir}40` }} />
                    <button type="submit" disabled={bag.length === 0} className="mt-5 w-full py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-opacity disabled:opacity-40" style={{ backgroundColor: noir }}>
                      Checkout
                    </button>
                    <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em]" style={{ color: taupe }}>UPI · Cards · Pay later</p>
                  </form>
                )}
              </aside>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      {/* Added-to-bag toast */}
      <AnimatePresence>
        {toast && (
          <motion.button
            onClick={() => go(3)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-4 z-30 mx-auto block w-fit px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white shadow-xl"
            style={{ backgroundColor: noir }}
          >
            Added — {toast} · View bag ({count})
          </motion.button>
        )}
      </AnimatePresence>

      <footer className={`mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: noir, color: `${bone}99` }}>
        <span className="text-xl tracking-[0.32em]" style={{ fontFamily: serif, color: bone }}>FORMÉ</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
