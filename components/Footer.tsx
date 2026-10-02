"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { nav, contactMeta } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

// Each letter of the giant wordmark jumps and takes a pop colour on hover.
const letterPops = ["#DCFC5A", "#927FF7", "#8EDCFB", "#FFA8D4"];

function Wordmark() {
  const reduce = useReducedMotion();
  const letters = "Rêvera".split("");
  return (
    <p
      aria-hidden
      className="flex select-none justify-center whitespace-nowrap font-display text-[26vw] font-medium leading-[0.78] tracking-tightest text-ink sm:text-[22vw]"
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className={`inline-block cursor-default ${l === "ê" ? "text-brand" : ""}`}
          whileHover={reduce ? {} : { y: "-0.12em", rotate: i % 2 ? 6 : -6, color: letterPops[i % letterPops.length] }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
        >
          {l}
        </motion.span>
      ))}
      <motion.span
        className="inline-block cursor-default text-brand"
        whileHover={reduce ? {} : { scale: 1.3, color: "#DCFC5A" }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
      >
        .
      </motion.span>
    </p>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const onHome = usePathname() === "/";
  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);
  const instaUrl = `https://instagram.com/${contactMeta.instagram.replace("@", "")}`;
  const fbUrl = `https://facebook.com/${contactMeta.facebook.replace("@", "")}`;

  const linkCls = "text-[15px] font-semibold text-ink transition-opacity hover:opacity-60";
  const label = "mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-ink/45";

  return (
    <footer className="relative overflow-hidden bg-canvas pt-16 lg:pt-24">
      <div className="container-x">
        {/* Top: brand + CTA */}
        <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 overflow-hidden rounded-[10px] bg-black">
                <Image src="/webtoplogo.png" alt="" fill sizes="36px" className="object-contain p-[14%]" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                Rêvera<span className="text-brand">.</span>
              </span>
            </div>
            <AnimatedHeading
              text="Where ideas / become experiences."
              className="mt-6 max-w-3xl font-sans text-[10vw] font-normal leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <div className="flex items-center gap-3">
            <a
              href={resolve("#contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors duration-300 hover:bg-accent"
            >
              Start a project
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#top"
              onClick={(e) => {
                if (!document.getElementById("top")) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-label="Back to top"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-lime"
            >
              <ArrowUp size={17} />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/10 py-12 lg:grid-cols-4 lg:py-14">
          <div>
            <p className={label}>Navigate</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={resolve(item.href)} className={linkCls}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={label}>Say hello</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${contactMeta.email}`} className={`${linkCls} flex items-center gap-2.5 break-all`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <Mail size={13} />
                  </span>
                  <span className="hidden sm:inline">{contactMeta.email}</span>
                  <span className="sm:hidden">Email us</span>
                </a>
              </li>
              <li>
                <a href={`tel:${contactMeta.phone.replace(/\s/g, "")}`} className={`${linkCls} flex items-center gap-2.5`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky text-ink">
                    <Phone size={13} />
                  </span>
                  {contactMeta.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={label}>Follow</p>
            <ul className="space-y-3">
              <li>
                <a href={instaUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} flex items-center gap-2.5`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink text-ink">
                    <Instagram size={13} />
                  </span>
                  Instagram
                </a>
              </li>
              <li>
                <a href={fbUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} flex items-center gap-2.5`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lilac text-ink">
                    <Facebook size={13} />
                  </span>
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={label}>Studios</p>
            <p className="text-[15px] font-semibold leading-relaxed text-ink">{contactMeta.location}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              Open for projects
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-ink/10 py-6 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Rêvera Studios. All rights reserved.</p>
          <p>Crafted with intention.</p>
        </div>
      </div>

      {/* Giant interactive wordmark */}
      <div className="overflow-hidden pt-2">
        <Wordmark />
      </div>
    </footer>
  );
}
