"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { PlanId, planLabel, PLAN_OPTIONS } from "@/lib/agency";

const inputCls =
  "w-full border-b border-ink/15 bg-transparent py-3 text-lg text-ink placeholder:text-ink/35 outline-none transition-colors duration-300 focus:border-ink";
const labelCls = "mb-2 block text-xs uppercase tracking-[0.18em] text-stone";

export default function OnboardingModal({
  open,
  initialPlan,
  onClose,
}: {
  open: boolean;
  initialPlan: PlanId;
  onClose: () => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlan);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // Reset each time the modal is (re)opened
  useEffect(() => {
    if (open) {
      setSelectedPlan(initialPlan);
      setSubmitted(false);
      setSubmitting(false);
      setError(false);
    }
  }, [open, initialPlan]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "ddd62bd8-d371-4fe5-8b1a-950647809c6d");
    formData.append("subject", `✨ New Onboarding Request: ${planLabel(selectedPlan)}`);
    formData.append("from_name", "Revera Studios Website");
    // Append actual label to web3forms payload if they don't capture the <select> automatically.
    // Since we named the select "plan_selected", Web3Forms will capture it, but we can override it with the clean label.
    formData.set("plan_selected", planLabel(selectedPlan));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex items-stretch justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-canvas shadow-2xl sm:h-auto sm:max-h-[88vh] sm:rounded-2xl"
          >
            {submitted ? (
              <Success onClose={onClose} />
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-10">
                  <div>
                    <p className="eyebrow">
                      Project Onboarding · {planLabel(initialPlan)}
                    </p>
                    <p className="mt-1 font-display text-2xl tracking-tight text-ink">
                      Project Details
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-canvas"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body / Form */}
                <form id="onboarding-form" onSubmit={submit} className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
                  <div className="space-y-8">
                    <p className="max-w-lg text-pretty text-base leading-relaxed text-stone">
                      Let's start with the essentials. Drop your details below and we will get back to you immediately.
                    </p>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                          name="name"
                          required
                          className={inputCls}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input
                          name="phone"
                          required
                          className={inputCls}
                          placeholder="+91 …"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Email Address *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          className={inputCls}
                          placeholder="you@brand.com"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Selected Package</label>
                        <select
                          name="plan_selected"
                          value={selectedPlan}
                          onChange={(e) => setSelectedPlan(e.target.value as PlanId)}
                          className={`${inputCls} appearance-none cursor-pointer`}
                        >
                          {PLAN_OPTIONS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Project Brief (Optional)</label>
                      <textarea
                        name="brief"
                        rows={4}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell us a little bit about what you'd like Rêvera Studio to build..."
                      />
                    </div>
                  </div>
                </form>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-6 py-5 sm:px-10">
                  <div className="text-sm text-stone">
                    {error && <span className="text-accent">Something went wrong — try again.</span>}
                  </div>
                  
                  <button
                    form="onboarding-form"
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-accent disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit Request"}
                    <Sparkles size={15} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Success({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-16 sm:py-24">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-canvas"
      >
        <Check size={30} />
      </motion.span>
      <h3 className="mt-8 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        Thank you for choosing
        <br />
        <span className="italic">Rêvera Studio.</span>
      </h3>

      <p className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-ink/70">
        Our team has successfully received your project request. A member of the
        Rêvera Team will contact you soon via Call or WhatsApp to discuss the project scope and finalize your engagement!
      </p>
      <p className="mt-6 font-display text-lg italic text-ink">Stay tuned.</p>

      <button
        onClick={onClose}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/15 px-8 py-3.5 text-sm font-medium text-ink transition-all duration-500 ease-expo hover:bg-ink hover:text-canvas"
      >
        Close
      </button>
    </div>
  );
}
