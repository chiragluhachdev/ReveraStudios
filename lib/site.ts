// ─────────────────────────────────────────────────────────────
// Rêvera Studio — central site / SEO configuration.
//
// Single source of truth for metadata, structured data and brand
// facts. Keeping copy consistent here (title, description, contact)
// is what lets both search engines and AI systems describe the
// business accurately. Add new pages/sections without duplicating
// metadata logic by extending `pages` and the schema builders below.
// ─────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.reverastudios.com";

export const site = {
  url: SITE_URL,
  name: "Rêvera Studio",
  legalName: "Rêvera Studio",
  titleDefault: "Rêvera Studio | Creative Technology & Digital Agency",
  titleTemplate: "%s | Rêvera Studio",
  tagline: "Where Ideas Become Experiences",

  // The canonical long-form description — reused verbatim across
  // metadata, Organization schema and on-page About copy so search
  // and AI systems get one consistent story.
  description:
    "Rêvera Studio is a creative technology and digital agency based in Faridabad, India, specializing in premium websites, mobile applications, branding, digital marketing, cinematic content creation, AI integrations, and end-to-end digital experiences for modern businesses.",

  // Short homepage <meta description> (~155 chars) — kept separate from
  // the long `description` used in structured data / manifest.
  metaDescription:
    "Rêvera Studio is a creative technology & digital agency in Faridabad, India, building premium websites, mobile apps, branding, content and AI experiences.",

  // Short description for Open Graph / social cards.
  ogDescription:
    "Premium creative technology studio building websites, mobile apps, digital brands and cinematic experiences.",

  keywords: [
    "Rêvera Studio",
    "Revera Studio",
    "Revera",
    "reverastudios",
    "Creative Agency",
    "Digital Agency India",
    "Web Development",
    "App Development",
    "Branding",
    "UI UX",
    "Photography",
    "Videography",
    "Digital Marketing",
    "Next.js Agency",
    "React Native Development",
    "Creative Studio",
    "AI Automation",
    "Business Websites",
    "App Store Deployment",
    "Google Play Publishing",
  ],

  email: "studios.revera@gmail.com",
  phone: "+91 87966 57504",

  address: {
    locality: "Faridabad",
    region: "Haryana",
    postalCode: "121001",
    country: "India",
    countryCode: "IN",
  },

  // Public social profiles (drives Organization `sameAs`).
  sameAs: [
    "https://instagram.com/reverastudios.co",
    "https://facebook.com/reverastudio",
  ],

  // Logo used in structured data (must be an absolute URL at runtime).
  logoPath: "/videos/reveralogo.png",
  ogImagePath: "/opengraph-image",

  services: [
    "Website Development",
    "Mobile App Development",
    "Branding",
    "UI/UX Design",
    "Digital Marketing",
    "Photography",
    "Videography",
    "AI Integrations",
    "API Development",
    "App Store Deployment",
  ],

  industries: [
    "Startups",
    "Restaurants",
    "Educational Institutions",
    "Healthcare",
    "Fashion",
    "Jewellery",
  ],
};

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

import type { Metadata } from "next";

// Builds a COMPLETE per-page metadata object (canonical + full Open
// Graph + Twitter, always including the OG image). Use this for every
// new page so no page ever ships with missing/partial social tags.
// `title` is the segment title; the root layout's template appends
// " | Rêvera Studio" to the <title>, while og/twitter get the full form.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Rêvera Studio — Creative Technology & Digital Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}

// ── Public pages (drives the sitemap; extend to add routes) ──
export const pages: {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
];

// ─────────────────────────────────────────────────────────────
// Structured data (Schema.org / JSON-LD) builders
// ─────────────────────────────────────────────────────────────

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    logo: absoluteUrl(site.logoPath),
    image: absoluteUrl(site.logoPath),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "Branding",
      "UI/UX Design",
      "Digital Marketing",
      "AI Integrations",
      "Cinematic Content Creation",
    ],
    sameAs: site.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: site.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: { "@id": ORG_ID },
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: SITE_URL,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
