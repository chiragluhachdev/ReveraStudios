"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const line = {
  hidden: { y: "120%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.12 },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yMedia = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scaleMedia = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Cinematic background media (parallax) */}
      <motion.div
        style={reduce ? undefined : { y: yMedia, scale: scaleMedia }}
        className="absolute inset-0 z-0"
      >
        {/*
          Drop a file at /public/videos/hero.mp4 to enable the cinematic
          background film. Until then, the poster image carries the frame.
          The <video> also accepts Vimeo/YouTube via the Showreel lightbox.
        */}
        <video
          className="h-full w-full object-cover"
          poster="https://plus.unsplash.com/premium_photo-1714618939758-84f1dd5e229c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
      </motion.div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
      <div className="absolute inset-0 z-10 bg-ink/10" />

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { opacity: opacityContent, y: yContent }}
        className="container-x relative z-20 flex flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-[11px] font-medium uppercase tracking-[0.4em] text-canvas/80"
        >
          Rêvera Studio — Where Ideas Become Experiences
        </motion.p>

        <h1 className="font-display text-[13vw] font-medium leading-[0.95] tracking-tightest text-canvas sm:text-[10vw] lg:text-[7vw]">
          {["We Build Brands", "That People", "Remember."].map((l, i) => (
            <span key={i} className="mask-line">
              <motion.span
                custom={i}
                variants={line}
                initial={reduce ? undefined : "hidden"}
                animate={reduce ? undefined : "show"}
                className="block"
              >
                {i === 2 ? (
                  <span className="italic">{l}</span>
                ) : (
                  l
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-4 text-sm uppercase tracking-[0.3em] text-canvas/85"
        >
          <span>Creative</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span>Technology</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span>Stories</span>
        </motion.div>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-canvas px-9 py-4 text-sm font-medium text-ink transition-all duration-500 ease-expo hover:bg-accent hover:text-canvas"
        >
          View Our Work
          <ArrowDown
            size={16}
            className="transition-transform duration-500 ease-expo group-hover:translate-y-1"
          />
        </motion.a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-canvas/40 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-canvas/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
