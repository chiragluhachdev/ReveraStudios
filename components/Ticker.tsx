"use client";

import { Fragment } from "react";

type TickerProps = {
  items: string[];
  reverse?: boolean;
  /** Degrees of tilt for the band — a little attitude between sections. */
  tilt?: number;
  className?: string;
};

// Each word takes the next pop colour, so the band reads multi-colour.
const pops = ["text-lime", "text-lilac", "text-sky", "text-pink"];

/**
 * A loud, looping word band on a dark strip. Two copies of the row slide by
 * half their width, so the loop is seamless at any viewport size.
 */
export default function Ticker({
  items,
  reverse = false,
  tilt = 0,
  className = "",
}: TickerProps) {
  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden
      className={`relative z-10 -mx-4 select-none overflow-hidden bg-[#151515] py-4 sm:py-6 ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ "--marquee-duration": "36s" } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <Fragment key={`${copy}-${i}`}>
                <span
                  className={`whitespace-nowrap px-5 font-sans text-3xl font-extrabold tracking-[-0.04em] sm:px-8 sm:text-5xl ${pops[i % pops.length]}`}
                >
                  {item}
                </span>
                <span className="text-xl text-canvas/30 sm:text-2xl">✦</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
