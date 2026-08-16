// ─────────────────────────────────────────────────────────────
// Rêvera Studio — Pricing configuration.
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
    price: "₹2,499",
    cadence: "month",
    tagline: "For simple digital presence.",
    highlights: [
      "Domain included",
      "Business email",
      "Custom website design",
      "Monthly maintenance",
      "Content updates",
      "Technical support"
    ],
    cta: { label: "Start Building", href: "/#contact" },
    details: {
      intro: "Perfect for a simple digital presence. We build your website, host it, and maintain it for you.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Domain setup",
            "Business email",
            "Hosting",
            "Custom website design",
            "Monthly maintenance",
            "Content updates",
            "Technical support"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "Freelancers, creators, local shops"
    }
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹4,999",
    cadence: "month",
    tagline: "For growing businesses.",
    featured: true,
    badge: "Recommended",
    highlights: [
      "Everything in Starter",
      "Premium custom design",
      "Advanced sections & features",
      "Regular updates",
      "Performance & security maintenance",
      "Priority support"
    ],
    cta: { label: "Grow Your Brand", href: "/#contact" },
    details: {
      intro: "For growing businesses that need a custom online presence with regular updates and advanced features.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Everything in Starter",
            "Premium custom website design",
            "Advanced sections & features",
            "Regular content updates",
            "Performance & security maintenance",
            "Priority support"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "Growing startups, restaurants, agencies"
    }
  },
  {
    id: "scale",
    name: "Scale",
    price: "₹8,999",
    cadence: "month",
    tagline: "For businesses needing more.",
    highlights: [
      "Everything in Growth",
      "CMS / dynamic functionality",
      "Advanced integrations",
      "Ongoing improvements",
      "More frequent updates",
      "Priority technical support"
    ],
    cta: { label: "Scale Up", href: "/#contact" },
    details: {
      intro: "For businesses needing complex, dynamic functionality, advanced integrations, and continuous improvements.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "Everything in Growth",
            "CMS / dynamic functionality",
            "Advanced integrations",
            "Ongoing improvements",
            "More frequent updates",
            "Priority technical support"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "E-commerce, dynamic portals, scale-ups"
    }
  }
];

export const appPlans: Plan[] = [
  {
    id: "app-deployment",
    name: "App Deployment",
    price: "₹24,999",
    cadence: "one-time",
    tagline: "For clients who already have an app and simply need it published.",
    highlights: [
      "iOS App Store deployment",
      "Google Play Store deployment",
      "Store listing setup",
      "App signing & certificates",
      "Build & release management",
      "Submission support"
    ],
    cta: { label: "Deploy App", href: "/#contact" },
    details: {
      intro: "A dedicated service to take your finished app source code and successfully publish it to the Apple App Store and Google Play Store.",
      groups: [
        {
          title: "Inclusions",
          items: [
            "iOS App Store deployment",
            "Google Play Store deployment",
            "Store listing setup",
            "App signing & certificates",
            "Build & release management",
            "Submission support"
          ]
        }
      ],
      timeline: "1-2 weeks",
      ideal: "Founders who have built an app but need expert help launching it."
    }
  },
  {
    id: "deployment-care",
    name: "Deployment + Care",
    price: "₹49,999",
    cadence: "year",
    tagline: "For clients who want Rêvera to keep their app running.",
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
      intro: "The complete package. We will deploy your app to the stores and provide ongoing technical care, updates, and backend maintenance for a full year.",
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
    price: "₹29,999",
    cadence: "year",
    tagline: "For apps already deployed and needing ongoing technical care.",
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
      intro: "A dedicated maintenance plan to ensure your already-deployed mobile application stays secure, updated, and flawless.",
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
      ideal: "Founders with an active app looking for reliable ongoing technical support."
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
  { name: "Landing Website", price: "₹15K+" },
  { name: "Business Website", price: "₹25K+" },
  { name: "E-commerce", price: "₹25K+" },
  { name: "Web App", price: "₹30K+" },
  { name: "SaaS MVP", price: "₹30K+" },
  { name: "Mobile App", price: "₹30K+" },
  { name: "Custom Software", price: "₹75K+" },
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
