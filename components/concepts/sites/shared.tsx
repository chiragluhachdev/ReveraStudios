"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/** Pick mobile or desktop classes from the preview's device mode. */
export const pick = (m: boolean, mobile: string, desktop: string) => (m ? mobile : desktop);

/** Shared "form submitted" state for the demo sites — nothing is sent. */
export function DemoDone({
  title,
  body,
  color,
  accent,
  onReset,
  font,
}: {
  title: string;
  body: string;
  color: string;
  accent: string;
  onReset: () => void;
  font?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start gap-4 rounded-2xl p-6"
      style={{ backgroundColor: `${accent}1A`, color }}
    >
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: accent }}
      >
        <Check size={22} />
      </motion.span>
      <p className="text-2xl leading-tight" style={{ fontFamily: font }}>
        {title}
      </p>
      <p className="text-sm opacity-75">{body}</p>
      <p className="text-[11px] uppercase tracking-[0.18em] opacity-50">Concept demo — nothing was sent</p>
      <button onClick={onReset} className="text-sm font-semibold underline underline-offset-4">
        Start again
      </button>
    </motion.div>
  );
}
