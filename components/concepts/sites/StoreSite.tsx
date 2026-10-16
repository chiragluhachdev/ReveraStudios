"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { unsplash } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import type { SiteProps } from "@/components/concepts/SitePreview";
import { pick } from "@/components/concepts/sites/shared";

const concerns = ["Glow", "Hydrate", "Calm"] as const;
type Concern = (typeof concerns)[number];
const products: { name: string; price: number; concern: Concern; rating: number; reviews: number; image: string; note: string }[] = [
  { name: "Rosehip Facial Oil", price: 1450, concern: "Glow", rating: 4.9, reviews: 2140, image: unsplash("1608571423902-eed4a5ad8108", 800), note: "Cold-pressed rosehip & sea buckthorn" },
  { name: "Neroli Mist", price: 890, concern: "Hydrate", rating: 4.8, reviews: 980, image: unsplash("1620916566398-39f1143ab7be", 800), note: "Orange blossom water & aloe" },
  { name: "Whipped Shea Balm", price: 1150, concern: "Calm", rating: 4.9, reviews: 1630, image: unsplash("1598440947619-2c35fc9aa908", 800), note: "Raw shea, oat & calendula" },
  { name: "Vitamin C Serum", price: 1690, concern: "Glow", rating: 4.7, reviews: 3210, image: unsplash("1617897903246-719242758050", 800), note: "15% vitamin C & ferulic acid" },
  { name: "Cloud Cream", price: 1250, concern: "Hydrate", rating: 4.8, reviews: 1120, image: unsplash("1556228720-195a672e8a03", 800), note: "Squalane & hyaluronic acid" },
  { name: "Clay Cleanser", price: 790, concern: "Calm", rating: 4.6, reviews: 760, image: unsplash("1611930022073-b7a4ba5fcccd", 800), note: "Kaolin, rose & chamomile" },
];
const FREE_SHIPPING = 999;
type Product = (typeof products)[number];
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Stars({ r, color }: { r: number; color: string }) {
  return (
    <span className="flex items-center gap-0.5" style={{ color }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} fill={i < Math.round(r) ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

function ProductTile({
  p,
  serif,
  colors,
  onView,
  onAdd,
}: {
  p: Product;
  serif: string;
  colors: { cream: string; espresso: string; terracotta: string; sand: string };
  onView: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="group">
      <button onClick={onView} className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl" style={{ backgroundColor: colors.sand }}>
        <Image src={p.image} alt={p.name} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: colors.cream }}>
          {p.concern}
        </span>
      </button>
      <div className="mt-3 flex items-start justify-between gap-2">
        <button onClick={onView} className="text-left">
          <p className="text-lg leading-tight" style={{ fontFamily: serif }}>{p.name}</p>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] opacity-70">
            <Stars r={p.rating} color={colors.terracotta} /> {p.reviews.toLocaleString("en-IN")}
          </div>
        </button>
        <span className="text-sm font-semibold">{inr(p.price)}</span>
      </div>
      <button
        onClick={onAdd}
        className="mt-3 w-full rounded-full border border-[var(--ink)] py-2 text-xs font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-white"
        style={{ "--ink": colors.espresso } as React.CSSProperties}
      >
        Add to bag
      </button>
    </div>
  );
}

export default function StoreSite({ concept, page, go, m }: SiteProps) {
  const [cream, espresso, terracotta, olive, sand] = concept.brand.palette.map((c) => c.hex);
  const serif = concept.brand.displayFont;
  const [concern, setConcern] = useState<"All" | Concern>("All");
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState<"30 ml" | "50 ml">("30 ml");
  const [qty, setQty] = useState(1);
  const [bag, setBag] = useState<{ count: number; total: number }>({ count: 0, total: 0 });
  const [toast, setToast] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>("Ingredients");

  const add = (i: number, q = 1, extra = 0) => {
    const p = products[i];
    setBag((b) => ({ count: b.count + q, total: b.total + (p.price + extra) * q }));
    setToast(p.name);
    setTimeout(() => setToast(null), 1600);
  };
  const view = (i: number) => {
    setSelected(i);
    setQty(1);
    setSize("30 ml");
    go(2);
  };
  const shown = products.map((p, i) => ({ p, i })).filter(({ p }) => concern === "All" || p.concern === concern);
  const product = products[selected];
  const sizeExtra = size === "50 ml" ? 450 : 0;
  const shipLeft = Math.max(0, FREE_SHIPPING - bag.total);
  const tileColors = { cream, espresso, terracotta, sand };

  return (
    <div className="relative" style={{ backgroundColor: cream, color: espresso, fontFamily: concept.brand.bodyFont }}>
      {/* Free-shipping bar */}
      <div className="px-4 py-2 text-center text-[11px] font-medium text-white" style={{ backgroundColor: olive }}>
        {bag.total === 0
          ? "Free shipping over ₹999 · Small-batch, made in India"
          : shipLeft > 0
            ? `You're ${inr(shipLeft)} away from free shipping`
            : "You've unlocked free shipping 🌿"}
      </div>

      <header className="sticky top-0 z-20 border-b backdrop-blur" style={{ backgroundColor: `${cream}F0`, borderColor: `${espresso}14` }}>
        <div className={`flex items-center justify-between ${pick(m, "px-4 py-3.5", "px-10 py-4")}`}>
          {!m && (
            <nav className="flex gap-6 text-sm">
              {concept.website.pages.map((label, i) => (
                <button key={label} onClick={() => (i === 2 ? view(selected) : go(i))} style={{ opacity: page === i ? 1 : 0.6 }}>
                  {label}
                </button>
              ))}
            </nav>
          )}
          <button onClick={() => go(0)} className="flex items-center gap-2">
            <LogoMark slug="shopify" color={espresso} accent={terracotta} className="h-7 w-7" />
            <span className="text-2xl italic" style={{ fontFamily: serif }}>Solenne</span>
          </button>
          <div className="flex items-center gap-4">
            {m && (
              <button onClick={() => go(1)} className="text-sm font-medium">
                Shop
              </button>
            )}
            <span className="relative">
              <ShoppingBag size={20} />
              <AnimatePresence>
                {bag.count > 0 && (
                  <motion.span key={bag.count} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ backgroundColor: terracotta }}>
                    {bag.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {page === 0 && (
            <>
              <section className={`grid ${pick(m, "grid-cols-1", "grid-cols-2")}`}>
                <div className={`relative ${pick(m, "aspect-[4/4]", "min-h-[460px]")}`}>
                  <Image src={unsplash("1556228578-8c89e6adf883", 1200)} alt="Solenne Morning Ritual set" fill sizes="450px" className="object-cover" />
                </div>
                <div className={`flex flex-col justify-center ${pick(m, "px-5 py-10", "px-12 py-12")}`} style={{ backgroundColor: sand }}>
                  <p className="text-[11px] uppercase tracking-[0.25em] opacity-60">The Morning Ritual</p>
                  <h1 className={`mt-3 leading-[0.98] ${pick(m, "text-5xl", "text-6xl")}`} style={{ fontFamily: serif }}>
                    Slow mornings, <em style={{ color: terracotta }}>soft skin.</em>
                  </h1>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-75">
                    Three small-batch botanicals for a ten-minute ritual. Cleanse, mist, glow — nothing hidden in the bottle.
                  </p>
                  <button onClick={() => go(1)} className="mt-6 w-fit rounded-full px-7 py-3 text-sm font-semibold text-white" style={{ backgroundColor: espresso }}>
                    Shop the ritual
                  </button>
                </div>
              </section>
              <section className={pick(m, "px-4 py-10", "px-10 py-14")}>
                <p className="text-center text-[11px] uppercase tracking-[0.25em] opacity-60">Shop by concern</p>
                <div className={`mt-4 grid gap-3 ${pick(m, "grid-cols-3", "grid-cols-3")}`}>
                  {concerns.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => {
                        setConcern(c);
                        go(1);
                      }}
                      className="rounded-2xl py-6 text-center transition-transform hover:-translate-y-1"
                      style={{ backgroundColor: [terracotta, olive, sand][i], color: i === 2 ? espresso : "#fff" }}
                    >
                      <span className={pick(m, "text-xl", "text-3xl")} style={{ fontFamily: serif }}>{c}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex items-end justify-between">
                  <h2 className={pick(m, "text-3xl", "text-4xl")} style={{ fontFamily: serif }}>Bestsellers</h2>
                  <button onClick={() => go(1)} className="text-sm underline underline-offset-4">Shop all</button>
                </div>
                <div className={`mt-5 grid gap-4 ${pick(m, "grid-cols-2", "grid-cols-3")}`}>
                  {products.slice(0, m ? 2 : 3).map((p, i) => (
                    <ProductTile key={p.name} p={p} serif={serif} colors={tileColors} onView={() => view(i)} onAdd={() => add(i)} />
                  ))}
                </div>
              </section>
            </>
          )}

          {page === 1 && (
            <section className={pick(m, "px-4 py-8", "px-10 py-12")}>
              <h1 className={pick(m, "text-4xl", "text-5xl")} style={{ fontFamily: serif }}>Shop all</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["All", ...concerns] as const).map((c) => (
                  <button key={c} onClick={() => setConcern(c)} className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors" style={concern === c ? { backgroundColor: espresso, color: cream } : { border: `1px solid ${espresso}33` }}>
                    {c}
                  </button>
                ))}
              </div>
              <motion.div layout className={`mt-6 grid gap-x-4 gap-y-8 ${pick(m, "grid-cols-2", "grid-cols-3")}`}>
                <AnimatePresence mode="popLayout">
                  {shown.map(({ p, i }) => (
                    <motion.div key={p.name} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <ProductTile p={p} serif={serif} colors={tileColors} onView={() => view(i)} onAdd={() => add(i)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          )}

          {page === 2 && (
            <section className={`grid gap-8 ${pick(m, "grid-cols-1 px-4 py-6", "grid-cols-2 px-10 py-12")}`}>
              <div>
                <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ backgroundColor: sand }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={selected} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                      <Image src={product.image} alt={product.name} fill sizes="450px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-3 grid grid-cols-6 gap-2">
                  {products.map((p, i) => (
                    <button key={p.name} onClick={() => setSelected(i)} aria-label={p.name} className="relative aspect-square overflow-hidden rounded-lg transition-opacity" style={{ opacity: selected === i ? 1 : 0.5, outline: selected === i ? `2px solid ${espresso}` : "none" }}>
                      <Image src={p.image} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] opacity-60">{product.concern}</p>
                <h1 className={`mt-2 leading-tight ${pick(m, "text-4xl", "text-5xl")}`} style={{ fontFamily: serif }}>{product.name}</h1>
                <div className="mt-2 flex items-center gap-2 text-xs opacity-75">
                  <Stars r={product.rating} color={terracotta} /> {product.rating} · {product.reviews.toLocaleString("en-IN")} reviews
                </div>
                <p className="mt-4 text-2xl font-semibold">{inr(product.price + sizeExtra)}</p>
                <p className="mt-2 text-sm opacity-70">{product.note}</p>
                <div className="mt-5 flex gap-2">
                  {(["30 ml", "50 ml"] as const).map((s) => (
                    <button key={s} onClick={() => setSize(s)} className="rounded-full px-4 py-2 text-xs font-semibold" style={size === s ? { backgroundColor: espresso, color: cream } : { border: `1px solid ${espresso}33` }}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center gap-4 rounded-full px-4 py-2.5" style={{ border: `1px solid ${espresso}33` }}>
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={14} /></button>
                    <span className="w-4 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={() => add(selected, qty, sizeExtra)} className="flex-1 rounded-full py-3 text-sm font-semibold text-white" style={{ backgroundColor: terracotta }}>
                    Add to bag · {inr((product.price + sizeExtra) * qty)}
                  </motion.button>
                </div>
                <div className="mt-6 divide-y" style={{ borderColor: `${espresso}1A` }}>
                  {[
                    ["Ingredients", `${product.note}. Full INCI list printed on every bottle — nothing hidden.`],
                    ["How to use", "Warm 3–4 drops between palms and press into damp skin, morning and night."],
                    ["Shipping & returns", "Ships in 24h. Free over ₹999. Unopened returns within 14 days."],
                  ].map(([t, body]) => (
                    <div key={t} className="py-3">
                      <button onClick={() => setOpen(open === t ? null : t)} className="flex w-full items-center justify-between text-sm font-semibold">
                        {t}
                        <ChevronDown size={15} className="transition-transform" style={{ transform: open === t ? "rotate(180deg)" : "none" }} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open === t && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2 text-sm opacity-70">
                            {body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      {/* Added-to-bag toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="sticky bottom-4 z-30 mx-auto w-fit rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-xl" style={{ backgroundColor: espresso }}>
            Added {toast} to your bag · {bag.count} {bag.count === 1 ? "item" : "items"}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={`mt-6 flex items-center justify-between text-xs ${pick(m, "flex-col gap-2 px-5 py-6", "px-10 py-8")}`} style={{ backgroundColor: espresso, color: `${cream}99` }}>
        <span className="text-xl italic" style={{ fontFamily: serif, color: cream }}>Solenne</span>
        <span>A fictional concept brand by Rêvera Studios</span>
      </footer>
    </div>
  );
}
