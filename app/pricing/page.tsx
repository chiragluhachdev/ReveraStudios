import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import PricingCards from "@/components/pricing/PricingCards";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import { OnboardingProvider } from "@/components/onboarding/OnboardingContext";
import StartProjectButton from "@/components/onboarding/StartProjectButton";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";
import { oneTimeProjects } from "@/lib/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Rêvera Studio pricing — carefully crafted plans to build, grow and launch premium websites, mobile apps, branding and AI experiences for modern businesses.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-canvas pb-16 pt-36 lg:pb-24 lg:pt-48">
          <div className="container-x">
            <Reveal>
              <span className="eyebrow">Pricing — Investment</span>
            </Reveal>
            <AnimatedHeading
              as="h1"
              text="BUILD → LAUNCH / → MAINTAIN"
              className="mt-6 max-w-5xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl uppercase"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-stone">
                Don&apos;t just build your product. Keep it moving. <br className="hidden md:block"/> One yearly plan for hosting, maintenance, updates and technical support.
              </p>
            </Reveal>
          </div>
        </section>

        <OnboardingProvider>
          {/* Pricing cards + slide-over details */}
          <PricingCards />

          {/* One-Time Projects */}
          <section className="relative bg-white py-24 lg:py-32">
            <div className="container-x">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5">
                  <Reveal>
                    <span className="eyebrow text-ink/50">03 — One-Time Projects</span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-ink lg:text-5xl">
                      Build something from scratch?
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-stone">
                      Our one-time development costs cover the initial build of your product. 
                      Once built, you can transition to our recurring maintenance plans to keep it running flawlessly.
                    </p>
                  </Reveal>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <ul className="flex flex-col border-t border-ink/10">
                    {oneTimeProjects.map((project, i) => (
                      <Reveal key={project.name} delay={0.1 + i * 0.05}>
                        <li className="flex items-center justify-between border-b border-ink/10 py-6 px-4 transition-colors hover:bg-ink/[0.02]">
                          <span className="font-display text-xl md:text-2xl font-medium text-ink">
                            {project.name}
                          </span>
                          <span className="font-sans text-lg text-stone uppercase tracking-wider">
                            Starting at {project.price}
                          </span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                  
                  <Reveal delay={0.4}>
                    <div className="mt-12">
                      <StartProjectButton
                        plan="custom"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-accent"
                      >
                        Request a Quote
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </StartProjectButton>
                    </div>
                  </Reveal>
                </div>
              </div>
              
              <Reveal delay={0.2}>
                <div className="mt-20 border-t border-ink/10 pt-8">
                  <p className="text-sm leading-relaxed text-stone/80 text-center md:text-left">
                    * Pricing may vary based on project complexity, customer volume, feature requirements, integrations, and the level of ongoing support required.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* FAQ */}
          <PricingFAQ />

          {/* Custom solution CTA */}
          <section className="relative overflow-hidden bg-ink py-24 text-canvas lg:py-32">
            <div className="container-x">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <Reveal>
                    <span className="eyebrow text-canvas/50">Bespoke</span>
                  </Reveal>
                  <AnimatedHeading
                    text="Need something / custom?"
                    className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-canvas sm:text-6xl lg:text-7xl"
                  />
                  <Reveal delay={0.1}>
                    <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-canvas/65">
                      Every business is unique. If none of our plans perfectly
                      match your vision, we&apos;ll craft a custom solution tailored
                      specifically for your goals.
                    </p>
                  </Reveal>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <Reveal delay={0.15}>
                    <div className="flex flex-col items-center justify-start gap-4 sm:flex-row lg:justify-end">
                      <a
                        href="tel:+918130809374"
                        className="group inline-flex items-center gap-3 rounded-full border border-canvas/20 px-9 py-4 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-canvas/10"
                      >
                        Call Us
                        <ArrowUpRight
                          size={17}
                          className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </a>
                      <StartProjectButton
                        plan="custom"
                        className="group inline-flex items-center gap-3 rounded-full bg-canvas px-9 py-4 text-sm font-medium text-ink transition-all duration-500 ease-expo hover:bg-accent hover:text-canvas"
                      >
                        Request a Proposal
                        <ArrowUpRight
                          size={17}
                          className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </StartProjectButton>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        </OnboardingProvider>
      </main>
      <Footer />
    </>
  );
}
