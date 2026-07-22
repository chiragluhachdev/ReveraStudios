"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

function ProjectRow({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const external = project.href.startsWith("http");
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-16 ${className}`}
    >
      {/* Mobile Number & Year */}
      <Reveal className="lg:hidden">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-stone">
          <span className="font-display text-2xl text-accent">
            {project.index}
          </span>
          <span className="h-px w-10 bg-ink/20" />
          <span>{project.year}</span>
        </div>
      </Reveal>

      {/* Image */}
      <Reveal
        className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        y={40}
      >
        <a
          href={project.href}
          {...linkProps}
          className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ivory"
        >
          <motion.div
            style={reduce ? undefined : { y, scale }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-all duration-700 ease-expo group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
          <span className="absolute right-6 top-6 flex h-14 w-14 translate-y-3 items-center justify-center rounded-full bg-canvas text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={22} />
          </span>
        </a>
      </Reveal>

      {/* Text */}
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal className="hidden lg:block">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-stone">
            <span className="font-display text-2xl text-accent">
              {project.index}
            </span>
            <span className="h-px w-10 bg-ink/20" />
            <span>{project.year}</span>
          </div>
        </Reveal>

        <AnimatedHeading
          text={project.title}
          className="mt-0 lg:mt-5 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl"
        />

        <Reveal delay={0.05}>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-stone">
            {project.sector}
          </p>
        </Reveal>

        {project.clientLabel && (
          <Reveal delay={0.07}>
            <p className="mt-2 text-sm text-stone">
              <span className="text-ink/40">Client — </span>
              {project.clientLabel}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink/70">
            {project.story}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/12 px-4 py-1.5 text-xs text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="hidden md:block">
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-ink/10 pt-6">
            {project.results.map((r) => (
              <div key={r.label}>
                <p className="font-display text-3xl font-medium text-ink">
                  {r.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <a
            href={project.href}
            {...linkProps}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
          >
            <span className="relative">
              {project.cta ?? "Visit Project"}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-500 ease-expo group-hover:scale-x-0" />
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </Reveal>

        {/* Mobile divider */}
        <div className="mt-10 h-px w-full bg-ink/10 md:hidden" />
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="relative bg-canvas py-16 lg:py-40">
      <div className="container-x">
        <div className="mb-10 lg:mb-20 flex flex-col justify-between gap-6 border-b-0 md:border-b border-ink/10 pb-8 lg:pb-12 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">02 — Selected Work</span>
            </Reveal>
            <AnimatedHeading
              text="Featured / Projects"
              className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-pretty text-base leading-relaxed text-stone">
              Restaurants, jewellery, fashion, enterprise, apps and platforms —
              each built to be remembered.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 lg:gap-40">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} className={i >= 4 ? "hidden md:grid" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
