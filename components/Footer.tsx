"use client";

import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { nav, contactMeta } from "@/lib/data";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Footer() {
  const year = new Date().getFullYear();
  const onHome = usePathname() === "/";
  const resolve = (href: string) =>
    href.startsWith("#") && !onHome ? `/${href}` : href;

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-canvas pt-20 lg:pt-28">
      <div className="container-x">
        <div className="flex flex-col gap-12 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">Rêvera Studio</span>
            <AnimatedHeading
              text="Where ideas / become experiences."
              className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
          </div>
          <a
            href={resolve("#contact")}
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-accent"
          >
            Start a project
            <ArrowUp
              size={16}
              className="rotate-45 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-ink/10 py-14 sm:grid-cols-4">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone">
              Navigate
            </p>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolve(item.href)}
                    className="text-base text-ink/70 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone">
              Social
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-base text-ink/70 transition-colors hover:text-ink">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-ink/70 transition-colors hover:text-ink">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-ink/70 transition-colors hover:text-ink">
                  Behance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone">
              Say hello
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactMeta.email}`}
                  className="text-base text-ink/70 transition-colors hover:text-ink"
                >
                  {contactMeta.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactMeta.phone.replace(/\s/g, "")}`}
                  className="text-base text-ink/70 transition-colors hover:text-ink"
                >
                  {contactMeta.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-stone">
              Studios
            </p>
            <p className="text-base text-ink/70">{contactMeta.location}</p>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative select-none border-t border-ink/10">
        <div className="container-x flex items-center justify-between py-8">
          <p className="text-sm text-stone">
            © {year} Rêvera Studio. All rights reserved.
          </p>
          <p className="text-sm text-stone">Crafted with intention.</p>
        </div>
        <div className="pointer-events-none overflow-hidden">
          <p className="whitespace-nowrap text-center font-display text-[24vw] font-medium leading-[0.8] tracking-tightest text-ink/[0.05]">
            Rêvera
          </p>
        </div>
      </div>
    </footer>
  );
}
