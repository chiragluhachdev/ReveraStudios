"use client";

import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

const columns = [
  {
    title: "What we build",
    items: [
      "Websites & web apps",
      "Mobile applications",
      "Branding & identity",
      "Cinematic content",
      "AI integrations & automation",
    ],
  },
  {
    title: "Industries we serve",
    items: site.industries,
  },
  {
    title: "Technologies",
    items: ["Next.js", "React", "React Native", "Tailwind CSS", "Node & APIs"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Rêvera Studio"
      className="relative bg-canvas py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">About Rêvera Studio</span>
            </Reveal>
            <AnimatedHeading
              as="h2"
              text="A creative technology / & digital agency."
              className="mt-5 font-display text-4xl font-medium leading-[1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-ink/75">
                Rêvera Studio is an independent creative technology and digital
                agency based in Faridabad, India. We design and build premium
                websites, mobile applications, brand identities, cinematic
                content, AI integrations and digital growth solutions —
                end-to-end, under one roof.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-stone">
                We partner with startups, restaurants, educational institutions,
                healthcare, fashion, jewellery and modern businesses that care
                about craft. Clients choose Rêvera for the rare combination of
                editorial taste and engineering rigour: work that looks
                effortless, performs relentlessly, and ships on time.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3">
              {columns.map((col, i) => (
                <Reveal key={col.title} delay={i * 0.06}>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-stone">
                      {col.title}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="text-sm text-ink/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
