// ─────────────────────────────────────────────────────────────
// Rêvera Studio — Pricing configuration.xx
// Everything the /pricing page renders is driven from this file.
// ─────────────────────────────────────────────────────────────

export type FeatureGroup = {
  title: string;
  items: string[];
  note?: string;
};

export type Plan = {
  id: string;
  name: string;
  price: string;
  /** Shows a small "from" before the price (starting price). */
  startingFrom?: boolean;
  cadence?: string;
  tagline: string;
  highlights: string[];
  featured?: boolean;
  badge?: string;
  cta: { label: string; href: string };
  details: {
    intro: string;
    groups: FeatureGroup[];
    timeline: string;
    ideal: string;
  };
};

export const webPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹6,999",
    startingFrom: true,
    cadence: "one-time",
    tagline: "A professional website to get you online",
    highlights: [
      "Custom website design",
      "Responsive development",
      "Up to 5 pages",
      "Contact / enquiry form",
      "WhatsApp integration",
      "Basic SEO setup",
      "Social media links",
      "Deployment & configuration"
    ],
    cta: { label: "Start Building", href: "/#contact" },
    details: {
      intro: "Everything you need to get online: a custom, responsive website with an enquiry form, WhatsApp integration and basic SEO, deployed and configured for you.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Custom website design",
            "Responsive development",
            "Up to 5 pages",
            "Contact / enquiry form",
            "WhatsApp integration",
            "Basic SEO setup",
            "Social media links",
            "Deployment & configuration"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "Individuals & small businesses"
    }
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹14,999",
    startingFrom: true,
    cadence: "one-time",
    tagline: "A stronger digital presence built to grow",
    featured: true,
    badge: "Recommended",
    highlights: [
      "Everything in Starter",
      "Premium custom design",
      "Up to 10 pages",
      "Advanced sections & interactions",
      "CMS / dynamic content",
      "Advanced forms & integrations",
      "SEO optimization",
      "Google Search Console setup",
      "Analytics integration",
      "Performance optimization"
    ],
    cta: { label: "Grow Your Brand", href: "/#contact" },
    details: {
      intro: "Get found. Get noticed. A premium custom website with dynamic content, analytics and SEO, built for businesses and brands that are growing.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Everything in Starter",
            "Premium custom design",
            "Up to 10 pages",
            "Advanced sections & interactions",
            "CMS / dynamic content",
            "Advanced forms & integrations",
            "SEO optimization",
            "Google Search Console setup",
            "Analytics integration",
            "Performance optimization"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "Growing businesses & brands"
    }
  },
  {
    id: "scale",
    name: "Scale",
    price: "₹19,999",
    startingFrom: true,
    cadence: "one-time",
    tagline: "Advanced websites & platforms for ambitious businesses",
    highlights: [
      "Everything in Growth",
      "Custom functionality",
      "Dynamic dashboards / portals",
      "Advanced API integrations",
      "Database integration",
      "Authentication / user accounts",
      "Conversion-focused landing pages",
      "Advanced SEO",
      "Payment gateway integration",
      "Custom automation"
    ],
    cta: { label: "Scale Up", href: "/#contact" },
    details: {
      intro: "A complete digital platform: custom functionality, dashboards, user accounts, payments and integrations, built around how your business works.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Everything in Growth",
            "Custom functionality",
            "Dynamic dashboards / portals",
            "Advanced API integrations",
            "Database integration",
            "Authentication / user accounts",
            "Conversion-focused landing pages",
            "Advanced SEO",
            "Payment gateway integration",
            "Custom automation"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "Businesses that need a complete digital platform"
    }
  }
];

export const appPlans: Plan[] = [
  {
    id: "app-deployment",
    name: "App Deployment",
    price: "₹24,999",
    cadence: "one-time",
    tagline: "We design, build and launch your app on iOS & Android.",
    highlights: [
      "Custom app design (UI/UX)",
      "iOS & Android app development",
      "Backend & database setup",
      "iOS App Store deployment",
      "Google Play Store deployment",
      "Store listing setup",
      "App signing & certificates"
    ],
    cta: { label: "Deploy App", href: "/#contact" },
    details: {
      intro: "We take your idea from concept to the stores: designing and developing your app, then publishing it on the Apple App Store and Google Play Store.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Custom app design (UI/UX)",
            "iOS & Android app development",
            "Backend & database setup",
            "iOS App Store deployment",
            "Google Play Store deployment",
            "Store listing setup",
            "App signing & certificates",
            "Build & release management",
            "Submission support"
          ]
        }
      ],
      timeline: "Depends on scope",
      ideal: "Founders and businesses ready to launch their own app."
    }
  },
  {
    id: "deployment-care",
    name: "Deployment + Care",
    price: "₹24,999",
    cadence: "one-time + ₹999 / mo",
    tagline: "We build and launch your app, then keep it running.",
    featured: true,
    badge: "Recommended",
    highlights: [
      "Everything in App Deployment",
      "Bug fixes",
      "App updates",
      "Backend maintenance",
      "Database maintenance",
      "Store update management"
    ],
    cta: { label: "Deploy & Maintain", href: "/#contact" },
    details: {
      intro: "The complete package. We design, build and launch your app on the stores, then provide ongoing technical care, updates and backend maintenance for a full year.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Everything in App Deployment",
            "Bug fixes",
            "App updates",
            "Backend maintenance",
            "Database maintenance",
            "Content updates",
            "Store update management",
            "Technical support"
          ]
        }
      ],
      timeline: "Ongoing",
      ideal: "Businesses wanting complete peace of mind for their app infrastructure."
    }
  },
  {
    id: "app-maintenance",
    name: "App Maintenance",
    price: "₹1,499",
    cadence: "month",
    tagline: "Ongoing technical care to keep your app secure, updated and running smoothly.",
    highlights: [
      "Bug fixes",
      "Backend maintenance",
      "Content updates",
      "Performance monitoring",
      "Technical support",
      "Store update assistance"
    ],
    cta: { label: "Maintain App", href: "/#contact" },
    details: {
      intro: "A dedicated maintenance plan to keep your mobile app secure, updated and flawless after launch.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Bug fixes",
            "Backend maintenance",
            "Content updates",
            "Performance monitoring",
            "Technical support",
            "Store update assistance"
          ]
        }
      ],
      timeline: "Ongoing",
      ideal: "Businesses that want reliable ongoing technical support for their app."
    }
  }
];

export const partnershipPlans: Plan[] = [
  {
    id: "social-presence",
    name: "Social Presence",
    price: "₹24,999",
    cadence: "month",
    tagline: "Your complete social media team, handled by Rêvera.",
    highlights: [
      "Social media strategy",
      "Content planning & monthly calendar",
      "Post & carousel design",
      "Reels / short-form content",
      "Captions & copywriting",
      "Posting & scheduling",
      "Hashtag & trend research",
      "Ads & campaign management"
    ],
    cta: { label: "Start Social Management", href: "/#contact" },
    details: {
      intro: "A dedicated partnership where our team handles your social media presence from top to bottom.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Social media strategy",
            "Content planning & monthly calendar",
            "Post & carousel design",
            "Reels / short-form content",
            "Captions & copywriting",
            "Posting & scheduling",
            "Hashtag & trend research",
            "Ads & campaign management",
            "Profile optimization",
            "Community / comment management",
            "Monthly performance insights",
            "Creative direction"
          ]
        }
      ],
      timeline: "Ongoing",
      ideal: "Brands that want to stay active, consistent and professionally presented online."
    }
  },
  {
    id: "digital-partner",
    name: "Digital Growth Partner",
    price: "₹34,999",
    cadence: "month",
    tagline: "Your website, web application & social presence — managed together.",
    featured: true,
    badge: "RECOMMENDED",
    highlights: [
      "Everything in Social Presence",
      "Website management",
      "Web application maintenance",
      "Content & UI updates",
      "Bug fixes & technical support",
      "Performance monitoring"
    ],
    cta: { label: "Become a Digital Partner", href: "/#contact" },
    details: {
      intro: "The ultimate retainer for businesses that want one expert team handling their entire digital presence, from social media to application support.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Everything in Social Presence",
            "Website management",
            "Web application maintenance",
            "Content & UI updates",
            "Bug fixes & technical support",
            "Performance monitoring",
            "Security & maintenance",
            "Hosting / deployment support",
            "New sections & minor features",
            "Social content & publishing",
            "Monthly digital performance review"
          ]
        }
      ],
      timeline: "Ongoing",
      ideal: "Businesses that want one team handling their entire digital presence."
    }
  }
];

export const oneTimeProjects = [
  { name: "Landing Website", price: "₹5K+" },
  { name: "Business Website", price: "₹15K+" },
  { name: "E-commerce", price: "₹15K+" },
  { name: "Web App", price: "₹20K+" },
  { name: "Custom Software", price: "₹50K+" },
];

export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "What does the yearly maintenance plan cover?",
    a: "Our yearly plans cover everything needed to keep your product alive: hosting, domains, regular security updates, bug fixes, and minor content or feature updates."
  },
  {
    q: "Do I have to pay for the build separately?",
    a: "Yes. Our one-time development costs cover the initial build of your product. The yearly maintenance plans ensure it stays online, secure, and updated."
  },
  {
    q: "Can I cancel my maintenance plan?",
    a: "Yes, you can cancel at any time. If you do, we will package up your codebase and assets so you can self-host and maintain it yourself."
  },
  {
    q: "What is included in 'content updates'?",
    a: "Content updates include text changes, swapping images, adding a new standard section, or tweaking colors. Major structural changes or entirely new features may be billed as custom development."
  }
];
