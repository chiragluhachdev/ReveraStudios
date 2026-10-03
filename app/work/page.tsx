import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ProjectList, { WorkStats } from "@/components/work/ProjectList";
import Ticker from "@/components/Ticker";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { projects } from "@/lib/data";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work by Rêvera Studios — websites, apps and platforms for education, food, culture, fashion and energy brands.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative bg-canvas pb-10 pt-32 lg:pb-16 lg:pt-44">
          <div className="container-x">
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                Selected work
              </span>
            </Reveal>
            <AnimatedHeading
              as="h1"
              text="Work that / gets remembered."
              className="mt-6 max-w-5xl font-sans text-[12vw] font-normal leading-[0.98] tracking-[-0.055em] text-ink sm:text-[8vw] lg:text-[6vw]"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-stone sm:text-lg">
                Websites, web apps and mobile apps for education, food,
                culture, fashion and energy — designed, built and shipped end
                to end.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="overflow-hidden py-4">
          <Ticker items={projects.map((p) => p.title)} tilt={-1.5} />
        </div>

        {/* Projects */}
        <section className="relative bg-canvas py-12 lg:py-20">
          <div className="container-x">
            <ProjectList />
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#151515] py-20 text-canvas lg:py-32">
          <div className="container-x flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <span className="-rotate-2 inline-block rounded-full bg-lilac px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
                  Open for projects
                </span>
              </Reveal>
              <AnimatedHeading
                text="Your project / could be next."
                className="mt-6 font-sans text-[12vw] font-normal leading-[0.98] tracking-[-0.055em] text-canvas sm:text-[8vw] lg:text-[5.5vw]"
              />
            </div>
            <Reveal delay={0.1}>
              <a
                href="/#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-lime py-2.5 pl-6 pr-2.5 text-sm font-bold text-ink transition-transform duration-300 ease-expo hover:-rotate-2 hover:scale-105"
              >
                Start a project
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
