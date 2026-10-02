"use client";

import { PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/lib/data";

const stickers = ["bg-lime text-ink", "bg-lilac text-ink", "bg-sky text-ink", "bg-pink text-ink"];

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const reduce = useReducedMotion();
  const external = project.href.startsWith("http");

  // Pointer-follow tilt (mouse only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={project.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/10 shadow-[0_30px_60px_-45px_rgba(10,10,10,0.6)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(10,10,10,0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-expo group-hover:scale-[1.05]"
        />
        <span
          className={`absolute left-4 top-4 flex h-12 w-12 -rotate-12 items-center justify-center rounded-full font-display text-base font-medium shadow-lg transition-transform duration-500 ease-expo group-hover:rotate-6 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-lg ${stickers[i % stickers.length]}`}
        >
          {project.index}
        </span>
        <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-ink shadow-md transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:bg-ink group-hover:text-lime">
          <ArrowUpRight size={19} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone">
          {project.sector} · {project.year}
        </p>
        <h3 className="mt-2 font-sans text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
          {project.title}
        </h3>
        {project.clientLabel && <p className="mt-1 text-sm text-stone">{project.clientLabel}</p>}
        <p className="mt-4 line-clamp-3 text-pretty text-base leading-relaxed text-ink/70">{project.story}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.services.slice(0, 4).map((s) => (
            <span key={s} className="rounded-full border border-ink/12 px-3 py-1 text-[11px] text-ink/70">
              {s}
            </span>
          ))}
        </div>

        {/* Pinned to the card bottom, with at least 1.5rem above it */}
        <div className="mt-auto pt-6">
        <div className="flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {project.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <p className="font-sans text-lg font-semibold tracking-[-0.03em] text-ink">{r.value}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-stone">{r.label}</p>
              </div>
            ))}
          </div>
          <span className="shrink-0 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
            {project.cta ?? "Visit Project"}
          </span>
        </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
        >
          <ProjectCard project={p} i={i} />
        </motion.div>
      ))}
    </div>
  );
}
