"use client";

import { ComponentType, useEffect, useRef, useState } from "react";
import { Lock, Monitor, Smartphone } from "lucide-react";
import { Concept, ConceptSlug } from "@/lib/concepts";
import InteriorSite from "@/components/concepts/sites/InteriorSite";
import RealEstateSite from "@/components/concepts/sites/RealEstateSite";
import AcademySite from "@/components/concepts/sites/AcademySite";
import SaasSite from "@/components/concepts/sites/SaasSite";
import StoreSite from "@/components/concepts/sites/StoreSite";

export type SiteProps = {
  concept: Concept;
  page: number;
  go: (page: number) => void;
  /** Render the phone layout (driven by the device toggle, not viewport). */
  m: boolean;
};

const sites: Record<ConceptSlug, ComponentType<SiteProps>> = {
  "interior-design": InteriorSite,
  "real-estate": RealEstateSite,
  academy: AcademySite,
  saas: SaasSite,
  shopify: StoreSite,
};

export default function SitePreview({ concept }: { concept: Concept }) {
  const [page, setPage] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [smallScreen, setSmallScreen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const Site = sites[concept.slug];

  // On phones the preview is always the mobile layout.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSmallScreen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const m = smallScreen || device === "mobile";

  const go = (p: number) => {
    setPage(p);
    scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const path = page === 0 ? "" : `/${concept.website.pages[page].toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Preview pages">
          {concept.website.pages.map((p, i) => (
            <button
              key={p}
              role="tab"
              aria-selected={page === i}
              onClick={() => go(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                page === i ? "bg-ink text-canvas" : "bg-ink/[0.05] text-ink/70 hover:bg-ink/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-1 rounded-full bg-ink/[0.05] p-1 md:flex" role="group" aria-label="Device">
          {(["desktop", "mobile"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              aria-pressed={device === d}
              aria-label={d === "desktop" ? "Desktop preview" : "Mobile preview"}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                device === d ? "bg-ink text-canvas" : "text-ink/60 hover:text-ink"
              }`}
            >
              {d === "desktop" ? <Monitor size={16} /> : <Smartphone size={16} />}
            </button>
          ))}
        </div>
      </div>

      {/* Frame */}
      <div
        className={`mx-auto overflow-hidden bg-white shadow-[0_40px_80px_-50px_rgba(10,10,10,0.6)] ring-1 ring-ink/10 transition-[max-width] duration-500 ease-expo ${
          m ? "max-w-[400px] rounded-[2.25rem]" : "max-w-full rounded-[1.25rem]"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-ink/10 bg-[#F4F2EE] px-4 py-2.5">
          {!m && (
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
          )}
          <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs text-ink/60 ring-1 ring-ink/5">
            <Lock size={11} />
            <span className="truncate">
              {concept.website.domain}
              {path}
            </span>
          </span>
        </div>
        <div
          ref={scroller}
          data-lenis-prevent
          className={`overflow-y-auto overscroll-contain ${m ? "h-[640px]" : "h-[620px] lg:h-[680px]"}`}
        >
          <Site concept={concept} page={page} go={go} m={m} />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-stone">
        Interactive concept preview — click around. Forms are demos and don&apos;t send anything.
      </p>
    </div>
  );
}
