"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Paperclip,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import {
  EXISTING_ASSETS,
  INDUSTRIES,
  PLAN_OPTIONS,
  PlanId,
  SERVICE_OPTIONS,
  TIMELINES,
  planLabel,
} from "@/lib/agency";
import { createRequest } from "@/lib/api";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  organization: string;
  website: string;
  industry: string;
  services: string[];
  existingAssets: string[];
  brief: string;
  planId: PlanId;
  timeline: string;
  files: File[];
};

const emptyForm = (plan: PlanId): FormState => ({
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  organization: "",
  website: "",
  industry: "",
  services: [],
  existingAssets: [],
  brief: "",
  planId: plan,
  timeline: "",
  files: [],
});

const STEPS = [
  "Personal Information",
  "Business Information",
  "Required Services",
  "Existing Assets",
  "Project Brief",
  "Plan",
  "Expected Timeline",
  "Attach Files",
  "Review",
];

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
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm(initialPlan));
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  // Reset each time the modal is (re)opened, seeding the entry plan.
  useEffect(() => {
    if (open) {
      setStep(0);
      setForm(emptyForm(initialPlan));
      setSubmittedId(null);
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

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggle = (key: "services" | "existingAssets", value: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));

  const canProceed = useMemo(() => {
    if (step === 0)
      return (
        form.fullName.trim() &&
        /.+@.+\..+/.test(form.email) &&
        form.phone.trim().length >= 6
      );
    if (step === 1) return form.businessName.trim() && form.industry;
    return true;
  }, [step, form]);

  const submit = async () => {
    setSubmitting(true);
    setError(false);
    try {
      const record = await createRequest({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        businessName: form.businessName.trim(),
        organization: form.organization.trim() || undefined,
        website: form.website.trim() || undefined,
        industry: form.industry,
        services: form.services,
        existingAssets: form.existingAssets,
        brief: form.brief.trim(),
        planId: form.planId,
        timeline: form.timeline,
        files: form.files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      });
      setSubmittedId(record.id);
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
            className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden bg-canvas shadow-2xl sm:h-auto sm:max-h-[88vh] sm:rounded-2xl"
          >
            {submittedId ? (
              <Success id={submittedId} onClose={onClose} />
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-10">
                  <div>
                    <p className="eyebrow">
                      Project Onboarding · {planLabel(form.planId)}
                    </p>
                    <p className="mt-1 font-display text-xl tracking-tight text-ink">
                      {STEPS[step]}
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

                {/* Progress */}
                <div className="h-px w-full bg-ink/10">
                  <motion.div
                    className="h-px bg-accent"
                    initial={false}
                    animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <StepBody
                        step={step}
                        form={form}
                        set={set}
                        toggle={toggle}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-6 py-5 sm:px-10">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-opacity disabled:pointer-events-none disabled:opacity-0"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>

                  <span className="text-xs uppercase tracking-[0.2em] text-stone">
                    {step + 1} / {STEPS.length}
                  </span>

                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={() => canProceed && setStep((s) => s + 1)}
                      disabled={!canProceed}
                      className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink"
                    >
                      Continue
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
                      />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      {error && (
                        <span className="text-sm text-accent">
                          Something went wrong — try again.
                        </span>
                      )}
                      <button
                        onClick={submit}
                        disabled={submitting}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-ink disabled:opacity-60"
                      >
                        {submitting ? "Submitting…" : "Submit Project Request"}
                        <Sparkles size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Step bodies ──────────────────────────────────────────────
function StepBody({
  step,
  form,
  set,
  toggle,
}: {
  step: number;
  form: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  toggle: (k: "services" | "existingAssets", v: string) => void;
}) {
  switch (step) {
    case 0:
      return (
        <div className="space-y-8">
          <Intro text="Let's start with the essentials so we know who we're speaking with." />
          <div>
            <label className={labelCls}>Full Name *</label>
            <input
              className={inputCls}
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Email Address *</label>
              <input
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@brand.com"
              />
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input
                className={inputCls}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 …"
              />
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="space-y-8">
          <Intro text="Tell us about the brand we'll be building for." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Business / Brand Name *</label>
              <input
                className={inputCls}
                value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)}
                placeholder="Brand name"
              />
            </div>
            <div>
              <label className={labelCls}>Organization Name (Optional)</label>
              <input
                className={inputCls}
                value={form.organization}
                onChange={(e) => set("organization", e.target.value)}
                placeholder="Legal / org name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Website (Optional)</label>
              <input
                className={inputCls}
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://"
              />
            </div>
            <div>
              <label className={labelCls}>Industry *</label>
              <select
                className={`${inputCls} appearance-none`}
                value={form.industry}
                onChange={(e) => set("industry", e.target.value)}
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-6">
          <Intro text="Which services do you need? Select all that apply." />
          <div className="flex flex-wrap gap-3">
            {SERVICE_OPTIONS.map((s) => (
              <Chip
                key={s}
                active={form.services.includes(s)}
                onClick={() => toggle("services", s)}
                label={s}
              />
            ))}
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-6">
          <Intro text="What do you already have? This helps us scope accurately." />
          <div className="flex flex-wrap gap-3">
            {EXISTING_ASSETS.map((s) => (
              <Chip
                key={s}
                active={form.existingAssets.includes(s)}
                onClick={() => toggle("existingAssets", s)}
                label={s}
              />
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="space-y-6">
          <Intro text="Paint us a picture." />
          <textarea
            rows={7}
            className={`${inputCls} resize-none`}
            value={form.brief}
            onChange={(e) => set("brief", e.target.value)}
            placeholder="Tell us about your business, your vision, and what you'd like Rêvera Studio to build."
          />
        </div>
      );
    case 5:
      return (
        <div className="space-y-6">
          <Intro text="This is the plan you're starting from — change it if you'd like." />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PLAN_OPTIONS.map((p) => (
              <button
                key={p.id}
                onClick={() => set("planId", p.id)}
                className={`rounded-xl border px-5 py-4 text-left transition-all duration-300 ease-expo ${
                  form.planId === p.id
                    ? "border-accent bg-accent/[0.05]"
                    : "border-ink/12 hover:border-ink/30"
                }`}
              >
                <span className="font-display text-lg tracking-tight text-ink">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    case 6:
      return (
        <div className="space-y-6">
          <Intro text="When would you like to launch?" />
          <div className="flex flex-wrap gap-3">
            {TIMELINES.map((t) => (
              <Chip
                key={t}
                active={form.timeline === t}
                onClick={() => set("timeline", t)}
                label={t}
              />
            ))}
          </div>
        </div>
      );
    case 7:
      return (
        <div className="space-y-6">
          <Intro text="Attach anything useful — logo, brand guidelines, screenshots, inspiration." />
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/25 px-6 py-12 text-center transition-colors hover:border-ink/50">
            <Upload size={26} className="text-stone" />
            <span className="text-sm text-ink/70">
              Click to upload files
            </span>
            <span className="text-xs text-stone">
              Logo · Brand Guidelines · Screenshots · Documents · Inspiration
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) =>
                set("files", [...form.files, ...Array.from(e.target.files ?? [])])
              }
            />
          </label>
          {form.files.length > 0 && (
            <ul className="space-y-2">
              {form.files.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-ink/10 bg-white/50 px-4 py-3"
                >
                  <span className="flex items-center gap-3 text-sm text-ink/80">
                    <Paperclip size={14} className="text-stone" />
                    {f.name}
                  </span>
                  <button
                    onClick={() =>
                      set(
                        "files",
                        form.files.filter((_, idx) => idx !== i)
                      )
                    }
                    className="text-stone transition-colors hover:text-accent"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case 8:
      return <Review form={form} />;
    default:
      return null;
  }
}

function Review({ form }: { form: FormState }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Selected Plan", value: planLabel(form.planId) },
    {
      label: "Personal Details",
      value: `${form.fullName} · ${form.email} · ${form.phone}`,
    },
    {
      label: "Business Details",
      value: [
        form.businessName,
        form.organization,
        form.industry,
        form.website,
      ]
        .filter(Boolean)
        .join(" · "),
    },
    {
      label: "Services Requested",
      value: form.services.length ? form.services.join(", ") : "—",
    },
    { label: "Timeline", value: form.timeline || "—" },
    {
      label: "Uploaded Files",
      value: form.files.length ? form.files.map((f) => f.name).join(", ") : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <Intro text="Here's everything we've captured. Review, then submit." />
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-ink">
              <Check size={15} className="text-accent" />
              {r.label}
            </div>
            <div className="text-pretty text-sm leading-relaxed text-stone sm:col-span-2">
              {r.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Success({ id, onClose }: { id: string; onClose: () => void }) {
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

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone">
        Your Project Request ID
      </p>
      <p className="mt-2 font-display text-2xl tracking-tight text-accent">{id}</p>

      <p className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-ink/70">
        Our team has successfully received your project request. A member of the
        Rêvera Team will contact you within 24 hours via Call, WhatsApp, or Email
        to understand your requirements, discuss the project scope, and finalize
        the engagement. Once the project details are confirmed, an official
        quotation/invoice will be prepared and shared with you.
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

// ── Small shared bits ────────────────────────────────────────
function Intro({ text }: { text: string }) {
  return <p className="max-w-lg text-pretty text-base leading-relaxed text-stone">{text}</p>;
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ease-expo ${
        active
          ? "border-accent bg-accent text-canvas"
          : "border-ink/15 text-ink/70 hover:border-ink/40"
      }`}
    >
      {active && <Check size={14} />}
      {label}
    </button>
  );
}
