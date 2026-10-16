"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { Concept, SocialPost } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import { isLight } from "@/components/concepts/color";
import Reveal from "@/components/ui/Reveal";


export default function BrandIdentity({ concept }: { concept: Concept }) {
  const { brand } = concept;
  const [bg, ink, accent, support, soft] = brand.palette;
  const [copied, setCopied] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const posterImage = concept.social.posts.find(
    (p): p is Extract<SocialPost, { kind: "photo" }> => p.kind === "photo"
  );
  const tagline =
    concept.social.posts.find((p): p is Extract<SocialPost, { kind: "type" }> => p.kind === "type")?.text ??
    brand.name;

  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Lockup */}
        <Reveal className="lg:col-span-7">
          <div
            className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-[2rem] p-8 sm:aspect-[16/10]"
            style={{ backgroundColor: bg.hex, color: ink.hex }}
          >
            <motion.div
              initial={reduce ? false : { scale: 0.6, opacity: 0, rotate: -12 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 140, damping: 14 }}
            >
              <LogoMark slug={concept.slug} color={ink.hex} accent={accent.hex} className="h-16 w-16 sm:h-20 sm:w-20" />
            </motion.div>
            <p
              className="mt-5 text-center text-5xl leading-none sm:text-7xl"
              style={{
                fontFamily: brand.displayFont,
                letterSpacing: concept.slug === "real-estate" ? "0.18em" : "-0.03em",
                fontWeight: concept.slug === "real-estate" ? 500 : 600,
              }}
            >
              {brand.wordmark}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.32em] opacity-60" style={{ fontFamily: brand.bodyFont }}>
              {brand.descriptor}
            </p>
            <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.2em] opacity-45">Primary lockup</span>
          </div>
        </Reveal>

        {/* Positioning + type */}
        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
          <Reveal delay={0.05}>
            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/10 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink/45">Positioning</p>
              <p className="mt-3 text-pretty text-base leading-relaxed text-ink/80">{brand.positioning}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {brand.voice.map((v) => (
                  <span
                    key={v}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: soft.hex, color: ink.hex }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex-1">
            <div className="flex h-full flex-col justify-between rounded-[2rem] p-6 sm:p-8" style={{ backgroundColor: ink.hex, color: bg.hex }}>
              <div className="flex items-end justify-between gap-4">
                <span className="text-7xl leading-none sm:text-8xl" style={{ fontFamily: brand.displayFont }}>
                  Aa
                </span>
                <span className="text-right text-xs leading-relaxed opacity-70">
                  Display — {brand.displayName}
                  <br />
                  Body — {brand.bodyName}
                </span>
              </div>
              <p className="mt-6 text-pretty text-2xl leading-snug" style={{ fontFamily: brand.displayFont }}>
                {concept.strategy.goal}
              </p>
              <p className="mt-3 text-sm opacity-60" style={{ fontFamily: brand.bodyFont }}>
                ABCDEFGHIJKLM nopqrstuvwxyz 0123456789
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Palette */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {brand.palette.map((c, i) => {
          const light = isLight(c.hex);
          return (
            <Reveal key={c.hex} delay={i * 0.05} className={i === 0 ? "col-span-2 sm:col-span-1" : ""}>
              <button
                type="button"
                onClick={() => copy(c.hex)}
                aria-label={`Copy ${c.name} ${c.hex}`}
                className="group flex h-32 w-full flex-col justify-between rounded-[1.5rem] p-4 text-left ring-1 ring-ink/10 transition-transform duration-300 hover:-translate-y-1 sm:h-44"
                style={{ backgroundColor: c.hex, color: light ? "#111" : "#fff" }}
              >
                <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.15em] opacity-70">
                  {c.name}
                  {copied === c.hex ? <Check size={14} /> : <Copy size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />}
                </span>
                <span className="font-mono text-sm">{copied === c.hex ? "Copied!" : c.hex}</span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Applications */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
        {/* Business card — flips on hover / tap */}
        <Reveal>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            aria-label="Flip business card"
            className="block w-full rounded-[2rem] bg-white p-6 ring-1 ring-ink/10"
            style={{ perspective: 1000 }}
          >
            <div
              className="relative mx-auto aspect-[1.75/1] w-full max-w-[18rem] transition-transform duration-700 ease-expo [transform-style:preserve-3d]"
              style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl shadow-lg [backface-visibility:hidden]"
                style={{ backgroundColor: ink.hex }}
              >
                <LogoMark slug={concept.slug} color={bg.hex} accent={accent.hex} className="h-10 w-10" />
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-between rounded-xl p-4 text-left shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ backgroundColor: bg.hex, color: ink.hex, fontFamily: brand.bodyFont }}
              >
                <span className="text-lg" style={{ fontFamily: brand.displayFont }}>
                  {brand.wordmark}
                </span>
                <span className="text-[10px] leading-relaxed opacity-70">
                  Aanya Mehra · Brand Lead
                  <br />
                  hello@{concept.website.domain}
                </span>
              </div>
            </div>
            <p className="mt-5 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">
              Business card · tap to flip
            </p>
          </button>
        </Reveal>

        {/* Campaign poster */}
        <Reveal delay={0.05}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-auto sm:h-full">
            {posterImage && (
              <Image src={posterImage.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            )}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ink.hex}E6, transparent 60%)` }} />
            <div className="absolute inset-x-0 bottom-0 p-6" style={{ color: bg.hex }}>
              <LogoMark slug={concept.slug} color={bg.hex} accent={accent.hex} className="h-8 w-8" />
              <p className="mt-3 text-2xl leading-tight" style={{ fontFamily: brand.displayFont }}>
                {tagline}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] opacity-70">Campaign poster</p>
            </div>
          </div>
        </Reveal>

        {/* App icon + avatar */}
        <Reveal delay={0.1}>
          <div
            className="flex h-full min-h-[14rem] flex-col items-center justify-center gap-5 rounded-[2rem] p-6"
            style={{ backgroundColor: support.hex }}
          >
            <div className="flex items-end gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] shadow-xl" style={{ backgroundColor: ink.hex }}>
                <LogoMark slug={concept.slug} color={bg.hex} accent={accent.hex} className="h-11 w-11" />
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg ring-4 ring-white/60" style={{ backgroundColor: bg.hex }}>
                <LogoMark slug={concept.slug} color={ink.hex} accent={accent.hex} className="h-7 w-7" />
              </span>
            </div>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink">@{brand.handle}</span>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: isLight(support.hex) ? "#111a" : "#fffb" }}>
              App icon & avatar
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
