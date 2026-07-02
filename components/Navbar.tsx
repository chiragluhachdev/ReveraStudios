"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  // Off the homepage there is no dark hero behind the bar, so we always
  // render the solid, readable treatment there.
  const solid = scrolled || !onHome;

  // Hash links only resolve to sections on the homepage — when we're on
  // another route, send them home first (e.g. "#work" -> "/#work").
  const resolve = (href: string) =>
    href.startsWith("#") && !onHome ? `/${href}` : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-expo ${
            solid
              ? "border-b border-ink/5 bg-canvas/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav className="container-x flex items-center justify-between py-5">
            <a
              href={onHome ? "#top" : "/"}
              className={`font-display text-xl tracking-tight transition-colors duration-500 ease-expo ${
                solid ? "text-ink" : "text-canvas"
              }`}
              aria-label="Rêvera Studio home"
            >
              Rêvera<span className="text-accent">.</span>
            </a>

            <ul className="hidden items-center gap-10 md:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolve(item.href)}
                    className={`group relative text-sm font-medium transition-colors duration-500 ease-expo ${
                      solid
                        ? "text-ink/70 hover:text-ink"
                        : "text-canvas/80 hover:text-canvas"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 ease-expo group-hover:w-full ${
                        solid ? "bg-ink" : "bg-canvas"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={resolve("#contact")}
              className={`hidden rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-500 ease-expo md:inline-block ${
                solid
                  ? "border-ink/15 text-ink hover:bg-ink hover:text-canvas"
                  : "border-canvas/30 text-canvas hover:bg-canvas hover:text-ink"
              }`}
            >
              Start a project
            </a>

            <button
              onClick={() => setOpen(true)}
              className={`flex h-10 w-10 items-center justify-center transition-colors duration-500 ease-expo md:hidden ${
                solid ? "text-ink" : "text-canvas"
              }`}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas md:hidden"
          >
            <div className="container-x flex items-center justify-between py-5">
              <span className="font-display text-xl">Rêvera<span className="text-accent">.</span></span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="container-x mt-8 flex flex-1 flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={resolve(item.href)}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl tracking-tight text-ink"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x pb-12">
              <a
                href={resolve("#contact")}
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full bg-ink px-8 py-4 text-sm font-medium text-canvas"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
