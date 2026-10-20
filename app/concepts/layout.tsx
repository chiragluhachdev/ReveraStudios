import { ReactNode } from "react";
import {
  Bodoni_Moda,
  Bricolage_Grotesque,
  Caveat,
  Cormorant_Garamond,
  DM_Sans,
  Fraunces,
  Instrument_Serif,
  Jost,
  Manrope,
  Space_Grotesk,
  Young_Serif,
} from "next/font/google";

// Typefaces for the fictional concept brands. Loaded only under /concepts so
// the rest of the site doesn't pay for them.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const young = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-young", display: "swap" });
const dmsans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-bodoni", display: "swap" });

export default function ConceptsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${cormorant.variable} ${manrope.variable} ${bricolage.variable} ${space.variable} ${fraunces.variable} ${instrument.variable} ${jost.variable} ${young.variable} ${dmsans.variable} ${caveat.variable} ${bodoni.variable}`}
    >
      {children}
    </div>
  );
}
