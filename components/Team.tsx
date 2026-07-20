"use client";

import Image from "next/image";
import { team } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Team() {
  return (
    <section className="relative bg-canvas py-28 lg:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">08 — Behind the Studio</span>
            </Reveal>
            <AnimatedHeading
              text="The people / behind the work."
              className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-pretty text-base leading-relaxed text-stone">
              A small, senior team of directors, designers and engineers who
              obsess so you don&apos;t have to.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 4) * 0.06}>
              <figure className="group">
                <div
                  className={`relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl ${
                    member.image ? "bg-ivory" : "bg-ink"
                  }`}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale transition-all duration-700 ease-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="font-display text-6xl font-medium text-canvas/25 transition-colors duration-700 ease-expo group-hover:text-canvas/40">
                      X
                    </span>
                  )}
                </div>
                <figcaption className="mt-5">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.15em] text-stone">
                    {member.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
