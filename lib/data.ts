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
  /** Optional custom label for the visit link (defaults to "Visit Project"). */
  cta?: string;
  /** Optional client / attribution line shown under the sector. */
  clientLabel?: string;
};

export const projects: Project[] = [
  {
    id: "ark-kidoid",
    index: "01",
    title: "ARK Kidoid | MKP",
    client: "Masti Ki Paathshaala",
    sector: "Education • App & Web Platform",
    year: "2026",
    image: "/videos/mkpx.png",
    story:
      "A dedicated application and website built for Masti Ki Paathshaala, an organization focused on teaching new skills to kids and adults in a joyful, engaging environment.",
    services: [
      "Product Design",
      "UI/UX Design",
      "App Development",
      "Web Development"
    ],
    results: [
      { value: "Web, iOS & Android", label: "Platform" },
      { value: "Kids & Adults", label: "Audience" }
    ],
    href: "https://www.mastikipaathshaala.org/",
    cta: "Visit Website",
  },
  {
    id: "mr-bites",
    index: "02",
    title: "MR BITES",
    client: "MR BITES",
    sector: "Foodtech • Campus Ordering App",
    year: "2026",
    image: "/videos/mrbitesx.png",
    story:
      "A dedicated campus food ordering platform designed for students and teachers. By allowing users to place orders early through the mobile app, MR BITES eliminates long queues and waiting times, ensuring a seamless and efficient dining experience.",
    services: [
      "Product Strategy",
      "UI/UX Design",
      "Mobile App Development"
    ],
    results: [
      { value: "Zero Wait", label: "Queue Time" },
      { value: "iOS & Android", label: "Platform" }
    ],
    href: "#",
    cta: "Coming Soon",
  },
  {
    id: "presnag",
    index: "03",
    title: "PreSnag",
    client: "PreSnag",
    sector: "Restaurant SaaS • Ordering Platform",
    year: "2026",
    image: "/videos/presnag2.png",
    story:
      "PreSnag reimagines how modern restaurants connect with customers through seamless digital ordering. From QR-powered experiences to intelligent order management, every interaction was crafted to be effortless, fast, and memorable.",
    services: [
      "Product Design",
      "UI/UX Design",
      "Web Development",
      "Mobile App",
      "Backend Engineering",
      "Brand Identity",
    ],
    results: [
      { value: "Web + Mobile", label: "Platform" },
      { value: "Production", label: "Ready" },
      { value: "End-to-End", label: "Design → Deployment" },
    ],
    href: "https://presnag.com",
    cta: "Visit Platform",
  },
  /*
  {
    id: "ss-fine-jewellery",
    index: "04",
    title: "SS Fine Jewellery",
    client: "SS Fine Jewellery",
    sector: "Luxury Jewellery E-Commerce • Premium Brand Experience",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80",
    story:
      "A premium luxury e-commerce experience for SS Fine Jewellery — sophisticated visuals, immersive product presentation and seamless shopping. Every interaction highlights timeless craftsmanship across desktop and mobile.",
    services: [
      "Brand Identity",
      "Luxury UI/UX",
      "E-Commerce",
      "Responsive Development",
      "Product Showcase",
      "Performance Optimization",
    ],
    results: [
      { value: "Luxury", label: "Design system" },
      { value: "Desktop + Mobile", label: "Responsive store" },
      { value: "End-to-End", label: "Premium build" },
    ],
    href: "https://ss-jewellery.vercel.app",
    cta: "Visit Store",
  },
  */
  {
    id: "miyaabi",
    index: "04",
    title: "Miyaabi",
    client: "Miyaabi",
    sector: "Fashion E-Commerce • Lifestyle Brand Experience",
    year: "2026",
    image: "/videos/miyaabix2.png",
    story:
      "A modern fashion commerce platform for a contemporary clothing brand built on elevated everyday essentials. Minimal design, immersive storytelling and seamless shopping showcase curated collections and timeless wardrobe staples.",
    services: [
      "Brand Identity",
      "Fashion UI/UX",
      "E-Commerce Development",
      "Responsive Design",
      "Product Experience",
    ],
    results: [
      { value: "Fashion", label: "Design-led" },
      { value: "Desktop + Mobile", label: "Responsive store" },
      { value: "End-to-End", label: "Design → Build" },
    ],
    href: "https://miyaabi.vercel.app/",
    cta: "Visit Store",
  },
  {
    id: "geoenergys",
    index: "05",
    title: "GeoEnergys",
    client: "Sanchit Chugh",
    clientLabel: "Sanchit Chugh · Independent Research / Energy Analytics",
    sector: "Energy Intelligence Platform • Data Analytics",
    year: "2026",
    image: "/videos/GeoEnergys.png",
    story:
      "An interactive energy intelligence platform that turns global energy trade into clean, explorable data. Compare major economies and analyse petroleum, gas, coal and electricity flows — powered by official U.S. EIA datasets.",
    services: [
      "Research",
      "UI/UX Design",
      "Dashboard Design",
      "Data Visualization",
      "Frontend Development",
      "API Integration",
      "Responsive Development",
    ],
    results: [
      { value: "10", label: "Major economies" },
      { value: "4", label: "Energy types" },
      { value: "EIA.gov", label: "Official data source" },
      { value: "Multiple", label: "Interactive dashboards" },
    ],
    href: "https://geo-energys.vercel.app/",
    cta: "View Live Project",
  }
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
  { value: 8, suffix: "", label: "Disciplines in-house" },
  { value: 100, suffix: "%", label: "Founder-led delivery" },
  { value: 24, suffix: "h", label: "Response time" },
  { value: 10, suffix: "+", label: "Flagship platforms" },
];

export const testimonials = [
  {
    quote:
      "They transformed our vision into a joyful, engaging platform that our students absolutely love.",
    name: "Kartthik Reddy",
    role: "Founder, ARK Kidoid | MKP",
  },
  {
    quote:
      "The website was something I wanted for a long time and they made it happen.",
    name: "Sanchit Chugh",
    role: "Student, GeoEnergys",
  },
  {
    quote:
      "The most considered team I've worked with. Every detail felt intentional, every deadline respected.",
    name: "Chirag Luhach",
    role: "Founder, PreSnag",
  },
];

export const clients = [
  "SSJ",
  "PRESNAG",
  "MIYAABI",
  "MKP",
  "GEO ENERGYS",
  "SSJ",
  "PRESNAG",
  "MIYAABI",
  "MKP",
  "GEO ENERGYS",
];

export const team = [
  {
    name: "Chirag",
    role: "Founder · Technologist",
    image: "",
  },
  {
    name: "Kanhaiya",
    role: "Director · Cinematographer",
    image: "/videos/kanhiyax.png",
  },
  {
    name: "Harshit",
    role: "Business Development",
    image: "/videos/harshit.png",
  },
  {
    name: "Sara",
    role: "Visual Artist · Model",
    image: "",
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
  email: "studios.revera@gmail.com",
  phone: "+91 87966 57504",
  instagram: "@reverastudios.co",
  facebook: "@reverastudio",
  location: "Faridabad, 121001, Haryana",
};
