"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { contactMeta } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);
  const reduce = useReducedMotion();

  const toggleNeed = (n: string) =>
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    // Add the Web3Forms access key and professional formatting
    formData.append("access_key", "ddd62bd8-d371-4fe5-8b1a-950647809c6d");
    formData.append("subject", "✨ New Project Enquiry | Revera Studios");
    formData.append("from_name", "Revera Studios Website");
    if (needs.length) formData.append("services", needs.join(", "));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
      } else {
        console.error("Web3Forms Error", data);
        alert("Something went wrong sending your message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const field =
    "w-full rounded-2xl border border-canvas/10 bg-canvas/[0.04] px-4 py-3.5 text-base text-canvas placeholder:text-canvas/40 outline-none transition-colors duration-300 focus:border-lime/60 focus:bg-canvas/[0.07] sm:py-4";

  const instaUrl = `https://instagram.com/${contactMeta.instagram.replace("@", "")}`;
  const tiles = [
    { icon: Mail, label: "Email", value: contactMeta.email, href: `mailto:${contactMeta.email}`, iconCls: "bg-lime", wide: true },
    { icon: Phone, label: "Call", value: contactMeta.phone, href: `tel:${contactMeta.phone.replace(/\s/g, "")}`, iconCls: "bg-sky" },
    { icon: Instagram, label: "Instagram", value: contactMeta.instagram, href: instaUrl, iconCls: "bg-pink" },
  ];
  const needOptions = ["Website", "Mobile App", "Branding", "Social Media", "AI Automation", "Films", "Something else"];
  // Selected chips each take their own pop colour.
  const needColors = ["bg-lime", "bg-lilac", "bg-sky", "bg-pink"];

  return (
    <section id="contact" className="relative bg-[#151515] py-16 text-canvas lg:py-36">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left — pitch + quick contact */}
        <div className="lg:col-span-5">
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-canvas/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              Contact
            </span>
            <span className="rounded-full border border-canvas/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-canvas/60">
              Open for projects
            </span>
          </Reveal>
          <AnimatedHeading
            text="Let’s make / something / unforgettable."
            className="mt-5 font-sans text-[11vw] font-normal leading-[0.98] tracking-[-0.055em] text-canvas sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-canvas/60 sm:text-lg">
              Tell us about your brand and your ambition. We reply to every
              serious enquiry within two business days.
            </p>
          </Reveal>

          {/* Quick-contact tiles */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {tiles.map(({ icon: Icon, label, value, href, iconCls, wide }, i) => (
              <Reveal key={label} delay={0.08 + i * 0.05} className={wide ? "col-span-2" : ""}>
                <motion.a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  whileHover={reduce ? {} : { y: -3 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="group flex h-full items-center justify-between gap-3 rounded-[1.25rem] bg-canvas/[0.04] p-4 text-canvas ring-1 ring-canvas/10 transition-colors duration-300 hover:bg-canvas/[0.07] sm:p-5"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-canvas/45">{label}</span>
                    <span className="mt-1 block truncate text-sm font-semibold tracking-[-0.01em] sm:text-base">{value}</span>
                  </span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${iconCls}`}>
                    <Icon size={16} />
                  </span>
                </motion.a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-6 flex items-center gap-2 text-sm text-canvas/50">
              <MapPin size={14} />
              {contactMeta.location}
            </p>
          </Reveal>
        </div>

        {/* Right — form card */}
        <div className="lg:col-span-7">
          <Reveal className="h-full">
            <div className="h-full rounded-[1.75rem] bg-canvas/[0.03] p-5 ring-1 ring-canvas/10 sm:p-8 lg:p-10">
              {sent ? (
                <div className="flex h-full min-h-[320px] flex-col items-start justify-center">
                  <motion.span
                    initial={reduce ? false : { scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-lime/10 font-display text-2xl text-lime"
                  >
                    ✦
                  </motion.span>
                  <h3 className="mt-6 font-sans text-4xl font-semibold tracking-[-0.04em]">Thank you.</h3>
                  <p className="mt-3 max-w-sm text-base text-canvas/65">
                    Your message is on its way. We&apos;ll be in touch shortly —
                    keep an eye on your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-canvas/50">
                      What do you need?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {needOptions.map((n, i) => {
                        const on = needs.includes(n);
                        return (
                          <button
                            key={n}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleNeed(n)}
                            className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                              on ? `${needColors[i % needColors.length]} text-ink` : "bg-canvas/[0.05] text-canvas/65 ring-1 ring-canvas/10 hover:text-canvas"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <input required name="name" placeholder="Your name" className={field} />
                    <input required type="email" name="email" placeholder="Email address" className={field} />
                    <input type="tel" name="phone" placeholder="Phone number" className={field} />
                    <input name="company" placeholder="Company (optional)" className={field} />
                  </div>

                  <textarea
                    required
                    name="message"
                    rows={3}
                    placeholder="Tell us about your project"
                    className={`${field} resize-none`}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-canvas py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-lime disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-9"
                  >
                    {isSubmitting ? "Sending..." : "Send enquiry"}
                    {!isSubmitting && (
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
