"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Play, RotateCcw } from "lucide-react";
import { Concept } from "@/lib/concepts";

const STEP_MS = 850;

export default function AutomationFlow({ concept }: { concept: Concept }) {
  const { automation, brand } = concept;
  const accent = brand.palette[2].hex;
  const steps = automation.steps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  // -1 = idle, 0..n-1 = running that step, n = complete
  const [at, setAt] = useState(-1);
  const running = at >= 0 && at < steps.length;

  const run = () => setAt(0);

  // Auto-run once when the flow scrolls into view.
  useEffect(() => {
    if (inView && at === -1) setAt(reduce ? steps.length : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setAt((a) => a + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [at, running]);

  return (
    <div ref={ref} className="rounded-[2rem] bg-[#151515] p-6 text-canvas sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-canvas/45">Demo workflow</p>
          <h3 className="mt-2 font-sans text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{automation.title}</h3>
        </div>
        <button
          onClick={run}
          disabled={running}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105 disabled:opacity-60"
        >
          {at >= steps.length ? <RotateCcw size={15} /> : <Play size={15} fill="currentColor" />}
          {running ? "Running…" : at >= steps.length ? "Run again" : "Run workflow"}
        </button>
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-0">
        {steps.map((s, i) => {
          const doneStep = at > i;
          const active = at === i;
          return (
            <li key={s.title} className="relative flex items-start gap-4 md:flex-col md:items-stretch md:gap-0 md:pr-3">
              {/* Connector: vertical on phones, horizontal on desktop */}
              {i < steps.length - 1 && (
                <>
                  <span className="absolute left-[1.35rem] top-12 h-[calc(100%-1.5rem)] w-px bg-canvas/15 md:hidden" />
                  <span className="absolute left-12 right-0 top-[1.35rem] hidden h-px bg-canvas/15 md:block">
                    <motion.span
                      className="absolute inset-y-0 left-0"
                      style={{ backgroundColor: accent }}
                      initial={false}
                      animate={{ width: doneStep ? "100%" : "0%" }}
                      transition={{ duration: STEP_MS / 1000, ease: "easeInOut" }}
                    />
                  </span>
                </>
              )}
              <motion.span
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                animate={{
                  backgroundColor: doneStep || active ? accent : "rgba(250,250,248,0.08)",
                  scale: active ? 1.12 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ color: "#fff" }}
              >
                {doneStep ? <Check size={18} /> : i + 1}
                {active && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: `0 0 0 0 ${accent}` }}
                    animate={{ boxShadow: [`0 0 0 0 ${accent}99`, `0 0 0 12px ${accent}00`] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                )}
              </motion.span>
              <div className="pb-4 md:mt-4 md:pb-0">
                <p className={`font-semibold transition-opacity ${doneStep || active ? "opacity-100" : "opacity-60"}`}>{s.title}</p>
                <p className="mt-1 text-sm text-canvas/50">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-canvas/10 pt-5 text-xs text-canvas/45">
        <span>
          {at >= steps.length
            ? `Workflow complete · ${steps.length} steps · simulated`
            : running
              ? `Step ${at + 1} of ${steps.length}…`
              : "Press run to simulate the flow"}
        </span>
        <span>Illustrative only — not connected to any live system</span>
      </div>
    </div>
  );
}
