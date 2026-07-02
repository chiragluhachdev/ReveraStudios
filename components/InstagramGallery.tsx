"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { instagram, contactMeta } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function InstagramGallery() {
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
              href={`https://instagram.com/${contactMeta.instagram.replace("@", "")}`}
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

        {/* Masonry via CSS columns */}
        <div className="columns-2 gap-4 [column-fill:_balance] lg:columns-4">
          {instagram.map((src, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05} className="mb-4 block break-inside-avoid">
              <a
                href={`https://instagram.com/${contactMeta.instagram.replace("@", "")}`}
                className={`group relative block overflow-hidden rounded-xl bg-canvas ${
                  i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt="Rêvera Studio on Instagram"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30">
                  <Instagram
                    size={28}
                    className="scale-75 text-canvas opacity-0 transition-all duration-500 ease-expo group-hover:scale-100 group-hover:opacity-100"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
