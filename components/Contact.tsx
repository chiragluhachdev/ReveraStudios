"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contactMeta } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Wire this to your provider (Resend, Formspree, an API route, etc.).
    setSent(true);
  };

  const field =
    "w-full border-b border-canvas/20 bg-transparent py-4 text-lg text-canvas placeholder:text-canvas/40 outline-none transition-colors duration-300 focus:border-canvas";

  return (
    <section id="contact" className="relative bg-ink py-28 text-canvas lg:py-40">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Left — pitch + meta */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow text-canvas/50">10 — Contact</span>
          </Reveal>
          <AnimatedHeading
            text="Let’s make / something / unforgettable."
            className="mt-5 font-display text-5xl font-medium leading-[0.98] tracking-tight text-canvas sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-canvas/65">
              Tell us about your brand and your ambition. We reply to every
              serious enquiry within two business days.
            </p>
          </Reveal>

          <div className="mt-12 space-y-5">
            {[
              { icon: Mail, label: contactMeta.email, href: `mailto:${contactMeta.email}` },
              { icon: Phone, label: contactMeta.phone, href: `tel:${contactMeta.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: contactMeta.location, href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <Reveal key={label} delay={0.1}>
                <a
                  href={href}
                  className="group flex items-center gap-4 text-canvas/80 transition-colors hover:text-canvas"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-canvas/20 transition-colors group-hover:border-accent group-hover:bg-accent">
                    <Icon size={17} />
                  </span>
                  <span className="text-base">{label}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10 flex gap-6 text-sm">
              <a href="#" className="text-canvas/60 transition-colors hover:text-canvas">
                Instagram {contactMeta.instagram}
              </a>
              <a href="#" className="text-canvas/60 transition-colors hover:text-canvas">
                LinkedIn — {contactMeta.linkedin}
              </a>
            </div>
          </Reveal>

          {/* Map placeholder */}
          <Reveal delay={0.2}>
            <div className="relative mt-12 h-52 overflow-hidden rounded-2xl border border-canvas/10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(180,71,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,71,46,0.06) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <MapPin size={26} className="text-accent" />
                <p className="text-sm text-canvas/70">{contactMeta.location}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-canvas/40">
                  Google Map embed goes here
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <Reveal>
              <div className="flex h-full min-h-[400px] flex-col items-start justify-center">
                <span className="font-display text-6xl text-accent">✦</span>
                <h3 className="mt-6 font-display text-4xl font-medium tracking-tight">
                  Thank you.
                </h3>
                <p className="mt-4 max-w-sm text-lg text-canvas/65">
                  Your message is on its way. We&apos;ll be in touch shortly —
                  keep an eye on your inbox.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form onSubmit={onSubmit} className="space-y-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <input required name="name" placeholder="Your name" className={field} />
                  <input required type="email" name="email" placeholder="Email address" className={field} />
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <input name="company" placeholder="Company (optional)" className={field} />
                  <input type="tel" name="phone" placeholder="Phone number" className={field} />
                </div>

                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project"
                  className={`${field} resize-none`}
                />

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 rounded-full bg-canvas px-9 py-4 text-sm font-medium text-ink transition-all duration-500 ease-expo hover:bg-accent hover:text-canvas"
                >
                  Send enquiry
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
