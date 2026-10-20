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
    // Formé — an "F" in a fine frame, with the acute accent as a slash.
    case "fashion":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
          <rect x="7" y="9" width="34" height="34" stroke={color} strokeWidth="1.5" />
          <path d="M19 37V17h12M19 27h9" stroke={color} strokeWidth="2.5" strokeLinecap="square" />
          <path d="M28 4l6-6" transform="translate(0 7)" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    // Crumb & Co. — a scored loaf with a couple of crumbs.
    case "bakery-cafe":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
          <path d="M6 30c0-9 8-16 18-16s18 7 18 16c0 4-3 6-6 6H12c-3 0-6-2-6-6z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M16 22l4 7M23 20l4 8M30 21l4 7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="41" r="1.6" fill={color} />
          <circle cx="18" cy="42.5" r="1.1" fill={color} />
        </svg>
      );
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
