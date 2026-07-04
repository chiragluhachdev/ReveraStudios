import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import PricingCards from "@/components/pricing/PricingCards";
import PricingComparison from "@/components/pricing/PricingComparison";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import { OnboardingProvider } from "@/components/onboarding/OnboardingContext";
import StartProjectButton from "@/components/onboarding/StartProjectButton";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/site";

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
              text="Choose the Right Brand / for Your Business"
              className="mt-6 max-w-5xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-stone">
                Every business is different. Whether you&apos;re just getting
                started or ready to scale, Rêvera Studio offers carefully crafted
                solutions designed to build, grow and elevate your brand.
              </p>
            </Reveal>
          </div>
        </section>

        <OnboardingProvider>
          {/* Pricing cards + slide-over details */}
          <PricingCards />

          {/* Comparison table */}
          <PricingComparison />

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
