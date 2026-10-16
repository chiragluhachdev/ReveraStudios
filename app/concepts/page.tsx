import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Ticker from "@/components/Ticker";
import ConceptCard from "@/components/concepts/ConceptCard";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { concepts } from "@/lib/concepts";

export const metadata: Metadata = pageMetadata({
  title: "Concepts",
  description:
    "Concept work by Rêvera Studios — explore the brand identity, website, social presence and automation we could build for real estate, academies, SaaS and e-commerce.",
  path: "/concepts",
});

export default function ConceptsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Concepts", path: "/concepts" },
        ])}
      />
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="relative bg-canvas pb-12 pt-32 lg:pb-20 lg:pt-44">
          <div className="container-x">
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Concept showcase
              </span>
              <span className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/60">
                Concept work by Rêvera Studios
              </span>
            </Reveal>
            <AnimatedHeading
              as="h1"
              text="Your business, / reimagined."
              className="mt-6 max-w-5xl font-sans text-[12vw] font-normal leading-[0.98] tracking-[-0.055em] text-ink sm:text-[8vw] lg:text-[6vw]"
            />
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <Reveal delay={0.1}>
                <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink/70">
                  Explore what your brand could become with Rêvera. Pick an
                  industry to see a complete concept — identity, website,
                  social presence, strategy and automation.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="max-w-xs text-sm leading-relaxed text-stone">
                  These are fictional brands designed by Rêvera to show our
                  approach. They are not client projects.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="overflow-hidden py-4">
          <Ticker items={concepts.map((c) => c.category)} tilt={-1.5} />
        </div>

        <section className="relative bg-canvas py-12 lg:py-20">
          <div className="container-x grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
            {concepts.map((c, i) => (
              <ConceptCard key={c.slug} concept={c} i={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
