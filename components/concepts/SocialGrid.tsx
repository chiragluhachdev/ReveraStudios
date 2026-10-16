"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3x3, Heart, MessageCircle, X } from "lucide-react";
import { Concept, ConceptSlug, SocialPost } from "@/lib/concepts";
import LogoMark from "@/components/concepts/LogoMark";
import { isLight } from "@/components/concepts/color";

const highlights: Record<ConceptSlug, string[]> = {
  "interior-design": ["Before/After", "Materials", "Studio", "Reviews"],
  "real-estate": ["The Ridge", "Casa Alva", "Visits", "Materials"],
  academy: ["Admissions", "Student work", "Mentors", "Demo day"],
  saas: ["Product", "Customers", "Changelog", "Events"],
  shopify: ["Rituals", "New in", "Reviews", "Behind batch"],
};

// Deterministic "likes" so server and client render the same numbers.
const likes = (i: number) => `${(1.4 + ((i * 7) % 9) * 0.6).toFixed(1)}K`;

function PostTile({ post, concept, big = false }: { post: SocialPost; concept: Concept; big?: boolean }) {
  const { palette, displayFont } = concept.brand;
  if (post.kind === "photo") {
    return (
      <div className="relative h-full w-full">
        <Image src={post.image} alt="" fill sizes={big ? "600px" : "220px"} className="object-cover" />
        {post.overlay && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p
              className={`absolute inset-x-0 bottom-0 p-3 leading-tight text-white ${big ? "p-6 text-3xl" : "text-sm sm:text-base"}`}
              style={{ fontFamily: displayFont }}
            >
              {post.overlay}
            </p>
          </>
        )}
      </div>
    );
  }
  const bg = palette[post.tone].hex;
  const fg = isLight(bg) ? palette[1].hex : "#fff";
  return (
    <div className="flex h-full w-full flex-col justify-between p-3 sm:p-4" style={{ backgroundColor: bg, color: fg }}>
      <LogoMark slug={concept.slug} color={fg} accent={isLight(bg) ? palette[2].hex : fg} className={big ? "h-10 w-10" : "h-5 w-5"} />
      {post.kind === "type" ? (
        <p className={`leading-[1.05] ${big ? "text-5xl" : "text-base sm:text-xl"}`} style={{ fontFamily: displayFont }}>
          {post.text}
        </p>
      ) : (
        <div>
          <p className={`leading-none ${big ? "text-8xl" : "text-3xl sm:text-5xl"}`} style={{ fontFamily: displayFont }}>
            {post.value}
          </p>
          <p className={`mt-1 opacity-80 ${big ? "text-base" : "text-[10px] sm:text-xs"}`}>{post.label}</p>
        </div>
      )}
    </div>
  );
}

export default function SocialGrid({ concept }: { concept: Concept }) {
  const { brand, social } = concept;
  const [bg, ink, accent] = brand.palette;
  const [open, setOpen] = useState<number | null>(null);
  const posts = social.posts;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % posts.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + posts.length) % posts.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, posts.length]);

  const avatar = (size: string) => (
    <span className={`flex shrink-0 items-center justify-center rounded-full p-[3px] ${size}`} style={{ background: `linear-gradient(135deg, ${accent.hex}, ${brand.palette[3].hex})` }}>
      <span className="flex h-full w-full items-center justify-center rounded-full ring-2 ring-white" style={{ backgroundColor: bg.hex }}>
        <LogoMark slug={concept.slug} color={ink.hex} accent={accent.hex} className="h-1/2 w-1/2" />
      </span>
    </span>
  );

  return (
    <>
      <div className="mx-auto max-w-[560px] rounded-[2rem] bg-white p-4 shadow-[0_40px_80px_-50px_rgba(10,10,10,0.5)] ring-1 ring-ink/10 sm:p-6">
        {/* Profile */}
        <div className="flex items-center gap-4 sm:gap-6">
          {avatar("h-20 w-20 sm:h-24 sm:w-24")}
          <div className="flex-1">
            <p className="text-base font-semibold text-ink">{brand.handle}</p>
            <div className="mt-2 flex gap-5 text-sm text-ink">
              <span><b>248</b> posts</span>
              <span><b>{social.followers}</b> followers</span>
              <span className="hidden sm:inline"><b>312</b> following</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">{brand.name}</p>
        <p className="whitespace-pre-line text-sm text-ink/75">{social.bio}</p>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-lg py-1.5 text-center text-sm font-semibold text-white" style={{ backgroundColor: ink.hex }}>Follow</span>
          <span className="flex-1 rounded-lg bg-ink/[0.06] py-1.5 text-center text-sm font-semibold text-ink">Message</span>
        </div>

        {/* Highlights */}
        <div className="mt-5 flex gap-4 overflow-x-auto pb-1">
          {highlights[concept.slug].map((h, i) => (
            <div key={h} className="flex shrink-0 flex-col items-center gap-1.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-full p-[2px] ring-1 ring-ink/15">
                <span className="flex h-full w-full items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: brand.palette[(i % 4) + 1].hex, color: isLight(brand.palette[(i % 4) + 1].hex) ? ink.hex : "#fff" }}>
                  {h.slice(0, 2).toUpperCase()}
                </span>
              </span>
              <span className="max-w-[4rem] truncate text-[11px] text-ink/70">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center border-t border-ink/10 py-2.5 text-ink">
          <Grid3x3 size={18} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1">
          {posts.map((p, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.08, duration: 0.45 }}
              className="group relative aspect-square overflow-hidden bg-ink/5"
              aria-label={`Open post ${i + 1}`}
            >
              <PostTile post={p} concept={concept} />
              <span className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Heart size={15} fill="currentColor" /> {likes(i)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Post preview"
          >
            <motion.div
              key={open}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white md:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative aspect-square">
                <PostTile post={posts[open]} concept={concept} big />
              </div>
              <div className="flex flex-col p-5">
                <div className="flex items-center gap-3 border-b border-ink/10 pb-3">
                  {avatar("h-9 w-9")}
                  <span className="text-sm font-semibold text-ink">{brand.handle}</span>
                  <button onClick={() => setOpen(null)} aria-label="Close" className="ml-auto text-ink/60 hover:text-ink">
                    <X size={18} />
                  </button>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">
                  <b className="text-ink">{brand.handle}</b> {posts[open].caption}
                </p>
                <div className="mt-4 flex items-center gap-4 text-ink">
                  <Heart size={20} /> <MessageCircle size={20} />
                  <span className="ml-auto text-sm font-semibold">{likes(open)} likes</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <button onClick={() => setOpen((open - 1 + posts.length) % posts.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.06]" aria-label="Previous post">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="self-center text-xs text-ink/50">
                    {open + 1} / {posts.length} · concept post
                  </span>
                  <button onClick={() => setOpen((open + 1) % posts.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.06]" aria-label="Next post">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
