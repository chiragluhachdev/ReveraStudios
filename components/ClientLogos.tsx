"use client";

import { useState } from "react";
import { clients } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function ClientLogos() {
  const [slow, setSlow] = useState(false);
  const row = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-canvas py-16 lg:py-20">
      <Reveal className="container-x mb-10">
        <p className="eyebrow text-center">
          Trusted by brands who care about the details
        </p>
      </Reveal>

      <div
        className="relative flex select-none overflow-hidden"
        onMouseEnter={() => setSlow(true)}
        onMouseLeave={() => setSlow(false)}
        style={
          { "--marquee-duration": slow ? "90s" : "40s" } as React.CSSProperties
        }
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-canvas to-transparent lg:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-canvas to-transparent lg:w-40" />

        <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16 lg:gap-24 lg:pr-24">
          {row.map((c, i) => (
            <span
              key={i}
              className="font-display text-3xl font-medium tracking-tight text-ink/30 transition-colors duration-500 hover:text-ink lg:text-4xl"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
