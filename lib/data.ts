// Centralised content for Rêvera Studio.
// Images use Unsplash placeholders — swap freely with your own assets.

export type ShowreelItem = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  poster: string;
  // A YouTube id, Vimeo id, or local mp4 path.
  video: { type: "youtube" | "vimeo" | "mp4"; src: string };
};

export const showreel: ShowreelItem[] = [
  {
    id: "aurelia",
    title: "Aurelia — Fine Jewellery",
    client: "Aurelia Maison",
    category: "Film / Direction",
    year: "2025",
    poster:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80",
    video: { type: "youtube", src: "ScMzIvxBSi4" },
  },
  {
    id: "no: nord",
    title: "Nord — Architectural Living",
    client: "Nord Studios",
    category: "Commercial",
    year: "2025",
    poster:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
    video: { type: "vimeo", src: "76979871" },
  },
  {
    id: "seed",
    title: "Botanica — Slow Dining",
    client: "Botanica",
    category: "Cinematography",
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    video: { type: "youtube", src: "aqz-KE-bpKQ" },
  },
  {
    id: "atlas",
    title: "Atlas — Future of Mobility",
    client: "Atlas Motors",
    category: "Brand Film",
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    video: { type: "vimeo", src: "108650530" },
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  image: string;
  story: string;
  services: string[];
  results: { value: string; label: string }[];
  href: string;
};

export const projects: Project[] = [
  {
    id: "maison-lume",
    index: "01",
    title: "Maison Lumé",
    client: "Maison Lumé",
    sector: "Fine Dining · Hospitality",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80",
    story:
      "A Michelin-aspiring restaurant needed an identity as considered as its tasting menu. We built a warm, tactile brand world — from monogram to menu — and a reservation platform that feels like an invitation.",
    services: ["Brand Identity", "Photography", "Web Development", "Art Direction"],
    results: [
      { value: "3.4×", label: "Reservations" },
      { value: "+62%", label: "Avg. spend" },
      { value: "1", label: "Design award" },
    ],
    href: "#",
  },
  {
    id: "orla-fine",
    index: "02",
    title: "Orla Fine Jewellery",
    client: "Orla",
    sector: "Luxury Retail · Jewellery",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80",
    story:
      "Heritage craftsmanship, reimagined for a new generation of collectors. A cinematic campaign and editorial e-commerce experience that lets each piece breathe under gallery lighting.",
    services: ["Creative Strategy", "Videography", "E-Commerce", "Campaign"],
    results: [
      { value: "5.1×", label: "Online sales" },
      { value: "+180%", label: "Time on site" },
      { value: "42", label: "Countries" },
    ],
    href: "#",
  },
  {
    id: "vault-fashion",
    index: "03",
    title: "VAULT Atelier",
    client: "VAULT",
    sector: "Fashion · Direct-to-Consumer",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    story:
      "A fashion label with a cult following and no digital home. We shot the seasonal lookbook, defined the tone of voice, and shipped a headless storefront that loads in under a second.",
    services: ["Photography", "Brand Identity", "Web Development", "Social Media"],
    results: [
      { value: "0.8s", label: "Load time" },
      { value: "+95%", label: "Conversion" },
      { value: "240k", label: "New followers" },
    ],
    href: "#",
  },
  {
    id: "meridian-corp",
    index: "04",
    title: "Meridian Group",
    client: "Meridian",
    sector: "Corporate · Enterprise",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    story:
      "A 40-year-old holding company needed to speak to a modern market without losing its authority. We delivered a restrained rebrand and a corporate platform architected for scale.",
    services: ["Branding", "Creative Strategy", "Web Development", "AI Automation"],
    results: [
      { value: "+3", label: "Enterprise deals" },
      { value: "−48%", label: "Bounce rate" },
      { value: "AA", label: "Accessibility" },
    ],
    href: "#",
  },
  {
    id: "pulse-app",
    index: "05",
    title: "Pulse — Wellness App",
    client: "Pulse",
    sector: "Technology · Mobile App",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    story:
      "A wellness startup with a bold vision and a Series A to earn it. We designed and built a mobile app with an AI coaching layer that feels calm, personal, and effortless.",
    services: ["Mobile App", "AI Automation", "Brand Identity", "Product Design"],
    results: [
      { value: "4.9★", label: "App Store" },
      { value: "120k", label: "Installs / mo" },
      { value: "$14M", label: "Series A" },
    ],
    href: "#",
  },
];

export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  image: string;
};

export const services: Service[] = [
  {
    id: "brand-identity",
    title: "Brand Identity",
    summary: "Names, marks and systems built to last a decade.",
    detail:
      "We craft complete identity systems — logotype, typography, colour, motion and voice — engineered to feel inevitable and scale across every surface.",
    deliverables: ["Logo & Monogram", "Type System", "Guidelines", "Art Direction"],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "photography",
    title: "Cinematic Photography",
    summary: "Editorial imagery with the weight of a gallery print.",
    detail:
      "Product, portrait and campaign photography directed for tone and light. We shoot for the story, not the grid.",
    deliverables: ["Campaign", "Product", "Editorial", "Retouching"],
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "videography",
    title: "Commercial Videography",
    summary: "Films that move at the pace of feeling.",
    detail:
      "From concept to colour grade — brand films, launch spots and social cutdowns produced to broadcast standard.",
    deliverables: ["Brand Film", "Commercial", "Motion", "Colour"],
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "social",
    title: "Social Media",
    summary: "Presence with a point of view.",
    detail:
      "Content systems, calendars and community management that treat every post as part of a larger editorial narrative.",
    deliverables: ["Strategy", "Content", "Community", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "web",
    title: "Web Development",
    summary: "Sites that load fast and feel expensive.",
    detail:
      "Design-led, performance-obsessed websites built on modern stacks — accessible, animated, and effortless to manage.",
    deliverables: ["Design", "Next.js", "CMS", "Performance"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    summary: "Products people keep on the home screen.",
    detail:
      "Native-feeling iOS and Android apps designed and engineered end to end — from first sketch to store launch.",
    deliverables: ["Product Design", "iOS", "Android", "Prototyping"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ai",
    title: "AI Automation",
    summary: "Intelligence woven quietly into the workflow.",
    detail:
      "Custom AI systems and automations that remove friction — from content pipelines to personalised customer experiences.",
    deliverables: ["Strategy", "Integration", "Agents", "Ops"],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "strategy",
    title: "Creative Strategy",
    summary: "The thinking behind the beautiful.",
    detail:
      "Positioning, narrative and go-to-market strategy that give the craft a reason to exist and a market to win.",
    deliverables: ["Positioning", "Narrative", "Naming", "GTM"],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
];

export const processSteps = [
  {
    no: "01",
    title: "Discover",
    body: "We listen, audit and research until the problem is unmistakably clear. Strategy before pixels, always.",
  },
  {
    no: "02",
    title: "Create",
    body: "Concepts become craft. We design, shoot, write and build in tight, obsessive loops.",
  },
  {
    no: "03",
    title: "Launch",
    body: "We ship with precision — QA'd, optimised and staged for the moment it matters most.",
  },
  {
    no: "04",
    title: "Scale",
    body: "The work is never done. We measure, iterate and grow the brand long after go-live.",
  },
];

export const stats = [
  { value: 240, suffix: "+", label: "Projects delivered" },
  { value: 90, suffix: "+", label: "Happy clients" },
  { value: 320, suffix: "", label: "Campaigns launched" },
  { value: 11, suffix: "", label: "Years of craft" },
];

export const testimonials = [
  {
    quote:
      "Rêvera didn't just redesign our brand — they gave us a point of view. Everything since has been easier to sell.",
    name: "Isabelle Moreau",
    role: "Founder, Maison Lumé",
  },
  {
    quote:
      "The most considered studio we've worked with. Every detail felt intentional, every deadline respected.",
    name: "Daniel Osei",
    role: "CMO, Meridian Group",
  },
  {
    quote:
      "They shot our collection like it belonged in a museum. Sales doubled in a quarter. Enough said.",
    name: "Lena Fischer",
    role: "Creative Director, VAULT",
  },
];

export const clients = [
  "AURELIA",
  "MERIDIAN",
  "VAULT",
  "NORD",
  "BOTANICA",
  "ATLAS",
  "ORLA",
  "PULSE",
  "MAISON LUMÉ",
  "SEED",
];

export const team = [
  {
    name: "Chirag Luhach",
    role: "Founder · Technologist",
    image: "/videos/chirag.png",
  },
  {
    name: "Kanhiya",
    role: "Director · Cinematographer",
    image: "/videos/kanhiyax.png",
  },
  {
    name: "Harshit",
    role: "Business Development",
    image: "/videos/harshit.png",
  },
  {
    name: "Kanhiya.",
    role: "Visual Artist · Model",
    image: "/videos/kanhiyax.png",
  },
];

export const instagram = [
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "#contact" },
];

export const contactMeta = {
  email: "hello@reverastudio.com",
  phone: "+1 (415) 555-0117",
  instagram: "@reverastudio",
  linkedin: "Rêvera Studio",
  location: "San Francisco · London · Dubai",
};
