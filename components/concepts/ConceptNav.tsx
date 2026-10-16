"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { conceptSections } from "@/lib/concepts";

/**
 * Floating pill at the bottom of the screen that jumps between concept
 * sections and highlights the one in view. Bottom placement keeps it clear
 * of the site header, which slides in on scroll-up.
 */
export default function ConceptNav({ sections = conceptSections }: { sections?: { id: string; label: string }[] }) {
  const [active, setActive] = useState("brand");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const first = document.getElementById("brand");
      const cta = document.getElementById("concept-cta");
      const y = window.scrollY + window.innerHeight * 0.6;
      setVisible(!!first && y > first.offsetTop && (!cta || window.scrollY + window.innerHeight * 0.9 < cta.offsetTop));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Concept sections"
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3"
        >
          <div className="hide-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full bg-[#151515]/90 p-1.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === s.id ? "text-ink" : "text-canvas/70 hover:text-canvas"
                }`}
              >
                {active === s.id && (
                  <motion.span layoutId="concept-nav-pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
