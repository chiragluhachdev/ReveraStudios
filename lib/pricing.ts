// ─────────────────────────────────────────────────────────────
// Rêvera Studio — Pricing configuration.
// Everything the /pricing page renders is driven from this file.
// ─────────────────────────────────────────────────────────────

export type FeatureGroup = {
  title: string;
  items: string[];
  /** Optional fine-print shown beneath the group's items. */
  note?: string;
};

export type Plan = {
  id: string;
  name: string;
  /** Card summary price, e.g. "₹15,000" or "Custom". */
  price: string;
  /** Small qualifier under the price, e.g. "one-time". Optional. */
  cadence?: string;
  /** One-line description shown on the card. */
  tagline: string;
  /** 4–6 highlighted features shown on the card (summary only). */
  highlights: string[];
  /** Subtle gold emphasis for the recommended plan. */
  featured?: boolean;
  /** Badge label for the featured plan. */
  badge?: string;
  /** Primary call-to-action. */
  cta: { label: string; href: string };
  /** Full plan structure — revealed inside the "View Details" panel. */
  details: {
    intro: string;
    groups: FeatureGroup[];
    timeline: string;
    ideal: string;
  };
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Brand",
    price: "₹15,000",
    tagline: "Get your brand online, professionally — from day one.",
    highlights: [
      "Brand identity guidance",
      "Custom responsive website (up to 5 pages)",
      "Mobile optimized & fast-loading",
      "Basic SEO setup",
      "15 days of launch support",
    ],
    cta: { label: "Start Your Brand", href: "/#contact" },
    details: {
      intro:
        "Perfect for freelancers, students, creators, local businesses, cafés and startups just getting online. A considered foundation that looks intentional from the first impression.",
      groups: [
        {
          title: "Brand Foundation",
          items: [
            "Brand consultation (1 session)",
            "Basic brand identity guidance",
            "Colour palette selection",
            "Typography selection",
          ],
        },
        {
          title: "Website",
          items: [
            "Custom responsive website (up to 5 pages)",
            "Premium modern UI",
            "Mobile optimized",
            "Contact form",
            "Basic SEO setup",
            "Fast loading & performance optimized",
          ],
        },
        {
          title: "Technical Setup",
          items: [
            "Domain connection (domain cost not included)",
            "SSL configuration",
            "Website deployment",
            "Basic analytics integration",
          ],
        },
        {
          title: "Launch Support",
          items: [
            "15 days of technical support",
            "Minor content updates",
            "Training on basic website management",
          ],
        },
      ],
      timeline: "7–10 business days",
      ideal:
        "Personal portfolios, restaurants & cafés, salons, coaches & consultants, small businesses, student startups, interior designers and local shops.",
    },
  },
  {
    id: "growth",
    name: "Growth Brand",
    price: "₹25,000",
    tagline:
      "Build a stronger digital presence with branding and growth features.",
    highlights: [
      "Brand strategy & identity refinement",
      "Website growth & ongoing maintenance",
      "Monthly photo & reel production",
      "Social media management",
      "Monthly strategy & performance reports",
    ],
    cta: { label: "Grow Your Brand", href: "/#contact" },
    details: {
      intro:
        "Perfect for businesses looking to strengthen their digital presence and consistently engage their audience — brand, content and platform working together.",
      groups: [
        {
          title: "Brand Presence",
          items: [
            "Brand strategy consultation",
            "Brand consistency across digital platforms",
            "Creative direction for campaigns",
            "Visual identity refinement",
          ],
        },
        {
          title: "Digital Presence Management",
          items: [
            "Website growth & ongoing maintenance",
            "Landing page creation & optimization",
            "Performance improvements",
            "SEO health monitoring",
            "Content updates & feature enhancements",
          ],
        },
        {
          title: "Content Production",
          items: [
            "Professional photo shoot (1 session / month)",
            "Cinematic reel/video shoot (up to 4 short-form reels)",
            "Professional editing & colour grading",
            "Platform-ready exports (Instagram, Facebook, YouTube Shorts)",
          ],
        },
        {
          title: "Social Media",
          items: [
            "Profile optimization",
            "Content planning",
            "Caption & hashtag guidance",
            "Content scheduling support",
            "Monthly content calendar",
          ],
        },
        {
          title: "Technical Support",
          items: [
            "Domain & hosting management",
            "Website monitoring",
            "Security & backup checks",
            "Analytics monitoring",
            "Monthly performance report",
          ],
        },
        {
          title: "Creative Design",
          items: [
            "Social media creatives",
            "Promotional banners",
            "Event posters",
            "Story templates",
            "Marketing assets",
          ],
        },
        {
          title: "Consultation",
          items: [
            "Monthly strategy session",
            "Growth recommendations",
            "Technical & marketing guidance",
          ],
        },
        {
          title: "Support",
          items: [
            "Priority support",
            "Monthly revisions",
            "30 days of continuous assistance",
          ],
        },
      ],
      timeline: "2–4 weeks (initial setup)",
      ideal:
        "Cafés & restaurants, cloud kitchens, fashion brands, jewellery stores, salons & spas, fitness studios, interior designers, clinics and growing startups.",
    },
  },
  {
    id: "launch",
    name: "Launch Brand",
    price: "₹40,000",
    tagline:
      "Everything we do, in one engagement — for brands serious about scaling.",
    highlights: [
      "Brand strategy & positioning",
      "Website & digital presence",
      "Mobile app store launch",
      "Professional content creation",
      "Integrations & automation (SMS, notifications, Meta API)",
      "90 days premium support",
    ],
    featured: true,
    cta: { label: "Launch With Rêvera", href: "/#contact" },
    details: {
      intro:
        "This is everything Rêvera does, in a single engagement. Built for founders who are serious about their business — brand, website, mobile apps, content, integrations and automation, all under one roof. If you're ready to treat your brand as real infrastructure, this is the package you want.",
      groups: [
        {
          title: "Brand Strategy",
          items: [
            "Brand discovery & positioning workshop",
            "Complete visual identity refinement",
            "Brand guidelines",
            "Creative direction for digital campaigns",
            "Digital growth roadmap",
          ],
        },
        {
          title: "Digital Infrastructure",
          items: [
            "Website development, enhancements & ongoing maintenance",
            "Landing page creation & optimization",
            "Performance optimization",
            "SEO foundation & monitoring",
            "Security, backups & regular updates",
          ],
        },
        {
          title: "Mobile App Launch",
          items: [
            "Android app deployment",
            "iOS app deployment",
            "Google Play Console setup & publishing",
            "Apple Developer enrollment & App Store publishing",
            "Store listing optimization",
            "App submission support",
            "Version management guidance",
          ],
          note: "Google Play Console and Apple Developer Program fees can be included in the project scope when agreed.",
        },
        {
          title: "Professional Content Production",
          items: [
            "Professional brand photo shoot",
            "Cinematic promotional video",
            "Up to 8 edited short-form reels",
            "Product photography",
            "Colour grading & professional editing",
            "Platform-ready exports",
          ],
        },
        {
          title: "Social Media Presence",
          items: [
            "Profile optimization",
            "Content strategy",
            "Monthly content calendar",
            "Creative assets",
            "Captions & hashtag strategy",
            "Launch campaign support",
          ],
        },
        {
          title: "Business Essentials",
          items: [
            "Domain consultation & configuration",
            "Hosting deployment",
            "Professional email setup",
            "Google Business Profile optimization",
            "Google Analytics & Search Console",
            "Performance tracking",
          ],
        },
        {
          title: "Integrations & Automation",
          items: [
            "Fast2SMS integration (transactional SMS & OTP)",
            "Push notifications (web & mobile app)",
            "Meta API integration (WhatsApp Business, Instagram & Facebook)",
            "WhatsApp Business API setup",
            "Payment gateway integration",
            "Automated alerts & lead notifications",
          ],
          note: "Third-party service fees (SMS credits, WhatsApp/Meta and payment gateway charges) are billed at cost and can be included in the project scope when agreed.",
        },
        {
          title: "Creative Design",
          items: [
            "Marketing creatives",
            "Event posters",
            "Promotional banners",
            "Story templates",
            "Website graphics",
            "Brand presentation deck",
          ],
        },
        {
          title: "Consultation",
          items: [
            "Dedicated strategy sessions",
            "Product planning",
            "Technical consulting",
            "Marketing guidance",
            "Digital transformation recommendations",
          ],
        },
        {
          title: "Priority Support",
          items: [
            "90 days of premium support",
            "Priority response time",
            "Ongoing improvements",
            "Monthly performance review",
            "Technical assistance",
          ],
        },
      ],
      timeline: "4–8 weeks (depending on project scope)",
      ideal:
        "Startups, restaurants & cloud kitchens, SaaS products, healthcare, educational institutions, fashion & lifestyle brands, jewellery businesses, real estate and growing enterprises.",
    },
  },
];

// ── Comparison table ─────────────────────────────────────────
// Cell values: `true`/`false` render as check/dash; strings render as text.
export type CompareRow = {
  label: string;
  values: (boolean | string)[];
};

export const comparison: {
  plans: string[];
  featuredIndex: number;
  rows: CompareRow[];
} = {
  plans: ["Starter", "Growth", "Launch"],
  featuredIndex: 2,
  rows: [
    { label: "Brand identity", values: ["Guidance", "Strategy + refinement", "Full strategy"] },
    { label: "Website", values: ["Up to 5 pages", "Growth & maintenance", "Full + maintenance"] },
    { label: "SEO", values: ["Basic setup", "Health monitoring", "Foundation + monitoring"] },
    { label: "Photo & video production", values: [false, true, true] },
    { label: "Social media management", values: [false, true, true] },
    { label: "Monthly content calendar", values: [false, true, true] },
    { label: "Mobile app store launch", values: [false, false, true] },
    { label: "Integrations & automation", values: [false, false, true] },
    { label: "Google Business & email setup", values: [false, false, true] },
    { label: "Brand guidelines & deck", values: [false, false, true] },
    { label: "Strategy sessions", values: ["1 session", "Monthly", "Dedicated"] },
    { label: "Support window", values: ["15 days", "30 days", "90 days"] },
  ],
};

// ── FAQ ──────────────────────────────────────────────────────
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "How long does a project take?",
    a: "It depends on scope. A Starter Brand typically goes live in 7–10 business days, Growth takes 2–4 weeks for initial setup, and a full Launch Brand runs 4–8 weeks. We agree a precise schedule before any work begins.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. Every plan includes a post-launch support window — 15 days on Starter, 30 days on Growth and 90 days of premium support on Launch — with ongoing maintenance built into the higher tiers.",
  },
  {
    q: "Can I upgrade later?",
    a: "Absolutely. The plans are designed as a natural progression, so you can start with Starter and move up to Growth or Launch as your brand scales — we carry your work forward.",
  },
  {
    q: "Do you work with startups?",
    a: "Often. We partner with early-stage founders, local businesses and growing enterprises alike, and tailor the engagement to your stage and goals.",
  },
  {
    q: "Can I request a custom quotation?",
    a: "Yes. If none of the plans fit precisely — or you need an enterprise-level partnership — we'll craft a bespoke proposal built around your goals and budget.",
  },
];
