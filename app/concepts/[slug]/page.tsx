import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/seo/JsonLd";
import LogoMark from "@/components/concepts/LogoMark";
import BrandIdentity from "@/components/concepts/BrandIdentity";
import SitePreview from "@/components/concepts/SitePreview";
import SocialGrid from "@/components/concepts/SocialGrid";
import Strategy from "@/components/concepts/Strategy";
import AutomationFlow from "@/components/concepts/AutomationFlow";
import ConceptNav from "@/components/concepts/ConceptNav";
import InteriorMoodboard from "@/components/concepts/InteriorMoodboard";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { concepts, conceptSections, getConcept } from "@/lib/concepts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const concept = getConcept((await params).slug);
  if (!concept) return {};
  return pageMetadata({
    title: `${concept.category} concept`,
    description: `A ${concept.category.toLowerCase()} concept by Rêvera Studios: ${concept.brand.name}, a fictional brand with identity, website, social and automation.`,
    path: `/concepts/${concept.slug}`,
  });
}

function SectionHead({ no, label, title, body }: { no: string; label: string; title: string; body?: string }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-12">
      <div>
        <Reveal>
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
            <span className="text-ink/40">{no}</span>
            {label}
          </span>
        </Reveal>
        <AnimatedHeading
          text={title}
          className="mt-4 max-w-3xl font-sans text-[9vw] font-normal leading-[1] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl"
        />
      </div>
      {body && (
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-base leading-relaxed text-stone">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

export default async function ConceptPage({ params }: Params) {
  const concept = getConcept((await params).slug);
  if (!concept) notFound();

  const { brand } = concept;
  const [bg, ink, accent] = brand.palette;
  const index = concepts.findIndex((c) => c.slug === concept.slug);
  const others = concepts.filter((c) => c.slug !== concept.slug);

  // The interior concept gets an extra Moodboard section after the brand.
  const hasMoodboard = concept.slug === "interior-design";
  const sections = hasMoodboard
    ? [conceptSections[0], { id: "moodboard", label: "Moodboard" }, ...conceptSections.slice(1)]
    : conceptSections;
  const at = (id: string) => sections.findIndex((x) => x.id === id);
  const no = (id: string) => String(at(id) + 1).padStart(2, "0");
  // Alternate section backgrounds in order, whatever the section count.
  const band = (id: string) => (at(id) % 2 === 0 ? "bg-canvas" : "bg-[#F1EEE9]");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Concepts", path: "/concepts" },
          { name: concept.category, path: `/concepts/${concept.slug}` },
        ])}
      />
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-canvas pb-10 pt-28 lg:pb-16 lg:pt-36">
          <div className="container-x">
            <Reveal>
              <Link href="/concepts" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-ink">
                <ArrowLeft size={15} /> All concepts
              </Link>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-6">
                <Reveal className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
                    Concept 0{index + 1} · {concept.category}
                  </span>
                  <span className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60">
                    Fictional brand
                  </span>
                </Reveal>
                <h1 className="mt-5 text-[14vw] leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-8xl" style={{ fontFamily: brand.displayFont, fontWeight: 600 }}>
                  {brand.name}
                </h1>
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink/70">{brand.positioning}</p>
                </Reveal>
              </div>
              <Reveal delay={0.1} className="lg:col-span-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                  <Image src={concept.cover} alt={`${brand.name} concept`} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 shadow-lg" style={{ backgroundColor: bg.hex, color: ink.hex }}>
                    <LogoMark slug={concept.slug} color={ink.hex} accent={accent.hex} className="h-6 w-6" />
                    <span className="text-sm font-semibold" style={{ fontFamily: brand.displayFont }}>{brand.name}</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="brand" className={`scroll-mt-24 py-14 lg:py-24 ${band("brand")}`}>
          <div className="container-x">
            <SectionHead no={no("brand")} label="Brand identity" title="A brand with a point of view." body="Name, mark, palette and type — the system everything else is built on." />
            <BrandIdentity concept={concept} />
          </div>
        </section>

        {hasMoodboard && (
          <section id="moodboard" className={`scroll-mt-24 py-14 lg:py-24 ${band("moodboard")}`}>
            <div className="container-x">
              <SectionHead no={no("moodboard")} label="Moodboard" title="Where every room begins." body="Light, material and colour, pinned before a single drawing. Rearrange it — this is how Oriel would present a concept." />
              <InteriorMoodboard concept={concept} />
            </div>
          </section>
        )}

        <section id="website" className={`scroll-mt-24 py-14 lg:py-24 ${band("website")}`}>
          <div className="container-x">
            <SectionHead no={no("website")} label="Website experience" title="A site built for this business." body="Click through the pages, try the filters and forms, and switch to the mobile view." />
            <SitePreview concept={concept} />
          </div>
        </section>

        <section id="social" className={`scroll-mt-24 py-14 lg:py-24 ${band("social")}`}>
          <div className="container-x">
            <SectionHead no={no("social")} label="Social presence" title="A feed that feels like the brand." body="A consistent grid of campaigns, proof and personality. Tap any post to open it." />
            <SocialGrid concept={concept} />
          </div>
        </section>

        <section id="strategy" className={`scroll-mt-24 py-14 lg:py-24 ${band("strategy")}`}>
          <div className="container-x">
            <SectionHead no={no("strategy")} label="Strategy & optimisation" title="Designed to convert, not just impress." />
            <Strategy concept={concept} />
          </div>
        </section>

        <section id="automation" className={`scroll-mt-24 py-14 lg:py-24 ${band("automation")}`}>
          <div className="container-x">
            <SectionHead no={no("automation")} label="Automation" title="The busywork, handled." body="Where automation would save this business time. A demonstration, not a live integration." />
            <AutomationFlow concept={concept} />
          </div>
        </section>

        {/* CTA */}
        <section id="concept-cta" className="relative overflow-hidden bg-[#151515] py-20 text-canvas lg:py-32">
          <div className="container-x">
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <Reveal>
                  <span className="-rotate-2 inline-block rounded-full bg-lime px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                    Your turn
                  </span>
                </Reveal>
                <AnimatedHeading
                  text="Love what you see? / Let’s build yours."
                  className="mt-6 font-sans text-[11vw] font-normal leading-[0.98] tracking-[-0.055em] text-canvas sm:text-6xl lg:text-7xl"
                />
              </div>
              <Reveal delay={0.1}>
                <a
                  href="/#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-lime py-2.5 pl-6 pr-2.5 text-sm font-bold text-ink transition-transform duration-300 ease-expo hover:-rotate-2 hover:scale-105"
                >
                  Start Your Project
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              </Reveal>
            </div>

            <div className="mt-16 border-t border-canvas/10 pt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-canvas/45">More concepts</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/concepts/${o.slug}`}
                    className="group flex items-center justify-between rounded-2xl bg-canvas/[0.05] p-4 ring-1 ring-canvas/10 transition-colors hover:bg-canvas/[0.09]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: o.brand.palette[0].hex }}>
                        <LogoMark slug={o.slug} color={o.brand.palette[1].hex} accent={o.brand.palette[2].hex} className="h-6 w-6" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{o.category}</span>
                        <span className="block text-xs text-canvas/50">{o.brand.name}</span>
                      </span>
                    </span>
                    <ArrowUpRight size={16} className="text-canvas/50 transition-transform group-hover:rotate-45 group-hover:text-lime" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <ConceptNav sections={sections} />
      <Footer />
    </>
  );
}
