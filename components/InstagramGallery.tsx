"use client";

import { Instagram } from "lucide-react";
import { contactMeta } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function InstagramGallery() {
  const instaUrl = `https://instagram.com/${contactMeta.instagram.replace("@", "")}`;
  return (
    <section className="relative bg-ivory py-28 lg:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">09 — The Feed</span>
            </Reveal>
            <AnimatedHeading
              text="From the studio, / daily."
              className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
            />
          </div>
          <Reveal delay={0.1}>
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-medium text-ink"
            >
              <Instagram size={18} />
              <span className="relative">
                Follow {contactMeta.instagram}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-500 ease-expo group-hover:scale-x-0" />
              </span>
            </a>
          </Reveal>
        </div>

        {/* Feed coming soon */}
        <Reveal>
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-ink px-6 text-center text-canvas lg:min-h-[540px]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-canvas/25 text-canvas/70 transition-colors duration-500 ease-expo group-hover:border-canvas/50">
              <Instagram size={26} />
            </span>
            <p className="mt-8 font-display text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              Coming <span className="italic">soon.</span>
            </p>
            <p className="mt-5 max-w-md text-sm uppercase tracking-[0.28em] text-canvas/50">
              Our feed is being curated
            </p>
            <span className="mt-9 inline-flex items-center gap-2 rounded-full border border-canvas/25 px-7 py-3.5 text-sm font-medium transition-all duration-500 ease-expo group-hover:bg-canvas group-hover:text-ink">
              <Instagram size={16} />
              Follow {contactMeta.instagram}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
