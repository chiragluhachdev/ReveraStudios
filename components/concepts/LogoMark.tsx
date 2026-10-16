import { ConceptSlug } from "@/lib/concepts";

/** Simple SVG marks for the fictional concept brands. */
export default function LogoMark({
  slug,
  color,
  accent,
  className = "h-10 w-10",
}: {
  slug: ConceptSlug;
  color: string;
  accent: string;
  className?: string;
}) {
  switch (slug) {
    // Oriel — a bay ("oriel") window: three facets, mullions, one lit pane.
    case "interior-design":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
          <path d="M8 42V20l8-9h16l8 9v22" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M16 11v31M32 11v31M8 26h32" stroke={color} strokeWidth="2" />
          <rect x="18" y="13" width="12" height="11" fill={accent} />
          <path d="M5 42h38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    // Halden — an architectural arch with a doorway line.
    case "real-estate":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
          <path d="M10 42V22a14 14 0 0 1 28 0v20" stroke={color} strokeWidth="2.5" />
          <path d="M18 42V24a6 6 0 0 1 12 0v18" stroke={accent} strokeWidth="2.5" />
          <path d="M6 42h36" stroke={color} strokeWidth="2.5" />
        </svg>
      );
    // Brightpath — a rising stepped path toward a sun.
    case "academy":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden>
          <circle cx="34" cy="14" r="7" fill={accent} />
          <path d="M6 40h10v-8h10v-8h10" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    // Flowline — three flowing strokes joining a node.
    case "saas":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
          <path d="M6 14c12 0 14 10 26 10" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M6 24h26" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M6 34c12 0 14-10 26-10" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="38" cy="24" r="5" fill={accent} />
        </svg>
      );
    // Solenne — a sun setting into a horizon.
    case "shopify":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
          <path d="M10 30a14 14 0 0 1 28 0" fill={accent} />
          <path d="M6 30h36M12 36h24M18 42h12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
