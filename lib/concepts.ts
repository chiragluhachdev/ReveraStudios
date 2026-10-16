// ─────────────────────────────────────────────────────────────
// Rêvera Studios — Concept Showcase content.
// Fictional brands created by Rêvera to show what we build for each
// industry. None of these are real clients.
// ─────────────────────────────────────────────────────────────

export const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export type ConceptSlug = "interior-design" | "real-estate" | "academy" | "saas" | "shopify";

export type SocialPost =
  | { kind: "photo"; image: string; overlay?: string; caption: string }
  | { kind: "type"; text: string; tone: number; caption: string }
  | { kind: "stat"; value: string; label: string; tone: number; caption: string };

export type Concept = {
  slug: ConceptSlug;
  category: string;
  /** Short line on the landing card. */
  pitch: string;
  cover: string;
  brand: {
    name: string;
    /** Wordmark text as it appears in the logo lockup. */
    wordmark: string;
    descriptor: string;
    positioning: string;
    voice: string[];
    /** CSS font-family values (variables are set in app/concepts/layout.tsx). */
    displayFont: string;
    bodyFont: string;
    displayName: string;
    bodyName: string;
    /** [background, ink, accent, support, soft] */
    palette: { name: string; hex: string }[];
    handle: string;
  };
  website: { domain: string; pages: string[] };
  social: { bio: string; followers: string; posts: SocialPost[] };
  strategy: {
    goal: string;
    points: { title: string; body: string }[];
    metrics: string[];
  };
  automation: {
    title: string;
    steps: { title: string; detail: string }[];
  };
};

export const concepts: Concept[] = [
  {
    slug: "interior-design",
    category: "Interior Design",
    pitch:
      "Portfolio-led studios: before/after reveals, style discovery, moodboards and consultation bookings.",
    cover: unsplash("1618220179428-22790b461013"),
    brand: {
      name: "Oriel Atelier",
      wordmark: "oriel",
      descriptor: "Interior Atelier",
      positioning:
        "A Bengaluru interior atelier for homes that feel collected, not decorated. Oriel is warm, tactile and quietly confident — it lets materials and light lead, and talks like a designer you'd trust with your keys.",
      voice: ["Tactile", "Considered", "Warm"],
      displayFont: "var(--font-instrument), serif",
      bodyFont: "var(--font-jost), sans-serif",
      displayName: "Instrument Serif",
      bodyName: "Jost",
      palette: [
        { name: "Plaster", hex: "#F1ECE5" },
        { name: "Graphite", hex: "#1F1D1A" },
        { name: "Ochre", hex: "#BF8B3E" },
        { name: "Fern", hex: "#4D5C45" },
        { name: "Rose Clay", hex: "#DCC0B0" },
      ],
      handle: "oriel.atelier",
    },
    website: { domain: "orielatelier.com", pages: ["Home", "Projects", "Style quiz", "Consult"] },
    social: {
      bio: "Interior atelier · Bengaluru\nHomes that feel collected, not decorated ✦",
      followers: "31.2K",
      posts: [
        { kind: "photo", image: unsplash("1618220179428-22790b461013", 600), overlay: "Ochre Flat — revealed", caption: "Ochre Flat, revealed. A 2BHK reworked around one rule: every chair should face the light." },
        { kind: "type", text: "Rooms that hold you.", tone: 1, caption: "What we design for, every time." },
        { kind: "photo", image: unsplash("1631679706909-1844bbd07221", 600), caption: "Rattan, linen and a single round mirror — Japandi without the cliché." },
        { kind: "stat", value: "38", label: "Homes delivered", tone: 2, caption: "38 homes delivered, each one built around the people living in it." },
        { kind: "photo", image: unsplash("1615874959474-d609969a20ed", 600), overlay: "Before → After", caption: "Casa Tera's bedroom: same walls, entirely new mood. Swipe for the before." },
        { kind: "photo", image: unsplash("1618219908412-a29a1bb7b86e", 600), caption: "The entry is the first sentence of a home. Make it a good one." },
        { kind: "type", text: "Design for how you live, not how it photographs.", tone: 3, caption: "A reminder pinned above every desk in the studio." },
        { kind: "photo", image: unsplash("1600494603989-9650cf6ddd3d", 600), overlay: "Workspace edit", caption: "A fern-green study for a novelist who needed to stop working from the bed." },
        { kind: "photo", image: unsplash("1617806118233-18e1de247200", 600), caption: "Dining for eight, built to host on a Tuesday, not just at Diwali." },
      ],
    },
    strategy: {
      goal: "Turn admiration into consultations — show the work beautifully, then make booking effortless.",
      points: [
        { title: "A portfolio that sells", body: "Projects filter by room and style, with before/after reveals and materials listed, so visitors picture their own home in the work." },
        { title: "Style discovery", body: "A 30-second style quiz turns “I don't know what I like” into a moodboard — and a reason to book." },
        { title: "Qualified consultations", body: "The booking form captures area, budget and timeline upfront, with a live estimate, so first calls are real conversations." },
        { title: "Local search", body: "Project pages are written for “interior designer in Bengaluru”-style searches, with area, locality and scope on every page." },
      ],
      metrics: ["Consultations booked", "Quiz → enquiry rate", "Cost per qualified lead", "Portfolio time on page"],
    },
    automation: {
      title: "Enquiry to signed design brief",
      steps: [
        { title: "Consult requested", detail: "Area, budget & style captured" },
        { title: "Instant welcome", detail: "Portfolio + questionnaire sent" },
        { title: "Moodboard prepared", detail: "Quiz result attached for the designer" },
        { title: "Site measure booked", detail: "Calendar invite + reminder" },
      ],
    },
  },
  {
    slug: "real-estate",
    category: "Real Estate",
    pitch:
      "Premium property brands, project showcases, lead generation and site-visit enquiries.",
    cover: unsplash("1600596542815-ffad4c1539a9"),
    brand: {
      name: "Halden Residences",
      wordmark: "HALDEN",
      descriptor: "Residences",
      positioning:
        "Architect-led homes for people who notice the light. Halden is quiet luxury — stone, timber and space, sold with calm confidence instead of loud offers.",
      voice: ["Calm", "Architectural", "Assured"],
      displayFont: "var(--font-cormorant), serif",
      bodyFont: "var(--font-manrope), sans-serif",
      displayName: "Cormorant Garamond",
      bodyName: "Manrope",
      palette: [
        { name: "Limestone", hex: "#EDE8E0" },
        { name: "Charcoal", hex: "#1E1E1C" },
        { name: "Bronze", hex: "#A9825A" },
        { name: "Sage", hex: "#8A9A86" },
        { name: "Ivory", hex: "#F8F5EF" },
      ],
      handle: "haldenresidences",
    },
    website: { domain: "haldenresidences.com", pages: ["Home", "Projects", "Book a visit"] },
    social: {
      bio: "Architect-led residences · Gurugram & Goa\nSite visits by appointment ↓",
      followers: "18.4K",
      posts: [
        { kind: "photo", image: unsplash("1600585154340-be6161a56a0c", 600), overlay: "The Ridge — now selling", caption: "The Ridge. Twelve homes cut into the hillside, each with its own horizon. Site visits open this weekend." },
        { kind: "type", text: "Space is the first luxury.", tone: 1, caption: "We design around light first, walls second." },
        { kind: "photo", image: unsplash("1600607687939-ce8a6c25118c", 600), caption: "Double-height living, north light, oak floors. Residence 04 at The Ridge." },
        { kind: "stat", value: "68%", label: "Sold in phase one", tone: 2, caption: "Phase one of The Ridge is 68% sold. Phase two releases next month." },
        { kind: "photo", image: unsplash("1613490493576-7fde63acd811", 600), overlay: "Casa Alva · Goa", caption: "Casa Alva — six courtyard villas, ten minutes from the sea." },
        { kind: "photo", image: unsplash("1600566753190-17f0baa2a6c3", 600), caption: "Materials, up close: limestone, linen, smoked oak." },
        { kind: "photo", image: unsplash("1512917774080-9991f1c4c750", 600), overlay: "Twilight tour · Sat 6pm", caption: "Join a twilight walkthrough of The Ridge. Limited slots — link in bio." },
        { kind: "type", text: "Built slowly. Lived in for generations.", tone: 3, caption: "Our promise, in one line." },
        { kind: "photo", image: unsplash("1600210492486-724fe5c67fb0", 600), caption: "Kitchens designed around the table, not the appliance." },
      ],
    },
    strategy: {
      goal: "Turn browsers into booked site visits — without the pressure of a sales pitch.",
      points: [
        { title: "Project discovery", body: "Filters by city, type and budget surface the right project in two taps, with status (ready / under construction) always visible." },
        { title: "Qualified enquiries", body: "Every enquiry captures project, budget and timeline, so the sales team only calls people who are ready to talk." },
        { title: "Site-visit booking", body: "A three-step booking flow (project → date → time) replaces back-and-forth calls and sends instant confirmations." },
        { title: "Local search & speed", body: "Project pages are built for “3 BHK in Gurugram”-style searches and load fast on 4G at the actual site." },
      ],
      metrics: ["Site visits booked", "Cost per qualified lead", "Enquiry → visit rate", "Time to first response"],
    },
    automation: {
      title: "Enquiry to site visit, on autopilot",
      steps: [
        { title: "Enquiry received", detail: "Form or WhatsApp click" },
        { title: "Lead scored & routed", detail: "Budget + timeline → right advisor" },
        { title: "Instant WhatsApp reply", detail: "Brochure + visit slots sent" },
        { title: "Visit reminder", detail: "24h before, with directions" },
      ],
    },
  },
  {
    slug: "academy",
    category: "Academies & Education",
    pitch:
      "Course discovery, admissions, faculty profiles and student-focused branding that feels alive.",
    cover: unsplash("1522202176988-66273c2fd55f"),
    brand: {
      name: "Brightpath Academy",
      wordmark: "brightpath",
      descriptor: "Academy",
      positioning:
        "A creative-skills academy for ambitious 16–25 year olds. Brightpath is energetic and direct — it talks like a mentor, not a brochure, and shows real student work everywhere.",
      voice: ["Bold", "Encouraging", "Hands-on"],
      displayFont: "var(--font-bricolage), sans-serif",
      bodyFont: "var(--font-bricolage), sans-serif",
      displayName: "Bricolage Grotesque",
      bodyName: "Bricolage Grotesque",
      palette: [
        { name: "Paper", hex: "#FFF8EC" },
        { name: "Deep Ink", hex: "#141433" },
        { name: "Cobalt", hex: "#2F3BDB" },
        { name: "Sunbeam", hex: "#FFC93C" },
        { name: "Coral", hex: "#FF6F59" },
      ],
      handle: "brightpath.academy",
    },
    website: { domain: "brightpath.academy", pages: ["Home", "Courses", "Admissions"] },
    social: {
      bio: "Design · Code · Film · Music 🎓\nAdmissions open for the spring batch",
      followers: "42.1K",
      posts: [
        { kind: "type", text: "Learn it by making it.", tone: 2, caption: "Every Brightpath course ends with a real portfolio project." },
        { kind: "photo", image: unsplash("1522202176988-66273c2fd55f", 600), overlay: "Spring batch · Apply now", caption: "Spring admissions are open. 40 seats per track — apply before the 20th." },
        { kind: "stat", value: "92%", label: "Placed within 6 months", tone: 3, caption: "Our latest batch: 92% placed or freelancing within six months." },
        { kind: "photo", image: unsplash("1524178232363-1fb2b075b655", 600), caption: "Masterclass Friday: storytelling with Ananya, lead designer at a top studio." },
        { kind: "photo", image: unsplash("1531297484001-80022131f5a1", 600), overlay: "Student work", caption: "Rhea built this booking app in week 6 of Product Design. 👏" },
        { kind: "type", text: "No boring lectures. Promise.", tone: 4, caption: "Small cohorts, live critiques, real briefs." },
        { kind: "photo", image: unsplash("1427504494785-3a9ca7044f45", 600), caption: "Demo day energy is unmatched." },
        { kind: "photo", image: unsplash("1503676260728-1c00da094a0b", 600), overlay: "Free workshop · Sat", caption: "Free Saturday workshop: build your first website in 3 hours." },
        { kind: "stat", value: "12", label: "Weeks to job-ready", tone: 2, caption: "Twelve focused weeks. One portfolio. Zero fluff." },
      ],
    },
    strategy: {
      goal: "Help students find the right course fast — and make applying feel like the easy part.",
      points: [
        { title: "Course discovery", body: "Courses filter by track, duration and mode, each with outcomes, projects and fees upfront — no “contact us for details”." },
        { title: "Admissions clarity", body: "A visible four-step admissions timeline answers “what happens next?” before a student has to ask." },
        { title: "Social proof", body: "Student work, placement stats and mentor profiles sit next to every call to action, where decisions get made." },
        { title: "Parent-ready", body: "A calm, detailed fee and curriculum view that students can forward to the people paying." },
      ],
      metrics: ["Applications started", "Application completion rate", "Counselling calls booked", "Cost per enrolment"],
    },
    automation: {
      title: "Application to enrolment, without the chasing",
      steps: [
        { title: "Application submitted", detail: "Course + background captured" },
        { title: "Instant confirmation", detail: "Email + WhatsApp with next steps" },
        { title: "Counsellor assigned", detail: "Calendar link sent automatically" },
        { title: "Follow-up nudges", detail: "Reminders until fee is paid" },
      ],
    },
  },
  {
    slug: "saas",
    category: "SaaS & Technology",
    pitch:
      "Software product branding, SaaS landing pages, dashboards and product demos with clarity.",
    cover: unsplash("1551288049-bebda4e38f71"),
    brand: {
      name: "Flowline",
      wordmark: "flowline",
      descriptor: "Operations software",
      positioning:
        "Workflow automation for operations teams of 10–200. Flowline is precise and calm — it explains exactly what the product does, then gets out of the way.",
      voice: ["Precise", "Confident", "Plain-spoken"],
      displayFont: "var(--font-space), sans-serif",
      bodyFont: "var(--font-inter), sans-serif",
      displayName: "Space Grotesk",
      bodyName: "Inter",
      palette: [
        { name: "Mist", hex: "#F3F4F8" },
        { name: "Night", hex: "#0B0D12" },
        { name: "Electric", hex: "#5B5BF7" },
        { name: "Signal", hex: "#3DDC97" },
        { name: "Haze", hex: "#E6E6FF" },
      ],
      handle: "flowline.app",
    },
    website: { domain: "flowline.app", pages: ["Product", "Features", "Pricing"] },
    social: {
      bio: "Operations on autopilot ⚡\nFree 14-day trial · No card needed",
      followers: "9.7K",
      posts: [
        { kind: "type", text: "Your ops team, minus the busywork.", tone: 2, caption: "Flowline automates the 40% of ops work nobody enjoys." },
        { kind: "photo", image: unsplash("1551288049-bebda4e38f71", 600), overlay: "New: live dashboards", caption: "Live dashboards just shipped. Every workflow, one screen." },
        { kind: "stat", value: "11h", label: "Saved per person, weekly", tone: 3, caption: "Teams on Flowline save an average of 11 hours per person, every week." },
        { kind: "photo", image: unsplash("1460925895917-afdab827c52f", 600), caption: "From spreadsheet chaos to one clean workflow." },
        { kind: "type", text: "If it repeats, automate it.", tone: 1, caption: "Our one rule." },
        { kind: "photo", image: unsplash("1553877522-43269d4ea984", 600), overlay: "Customer story", caption: "How a 40-person logistics team cut handoffs in half." },
        { kind: "stat", value: "4.9", label: "Average review rating", tone: 2, caption: "4.9 average across 600+ reviews. Thank you 💜" },
        { kind: "photo", image: unsplash("1517694712202-14dd9538aa97", 600), caption: "Built by engineers who hated manual ops too." },
        { kind: "photo", image: unsplash("1551434678-e076c223a692", 600), overlay: "Live demo · Thu", caption: "Live product demo this Thursday. Bring your messiest workflow." },
      ],
    },
    strategy: {
      goal: "Make the product obvious in 10 seconds, then turn interest into trials and demo calls.",
      points: [
        { title: "Product clarity", body: "The hero shows the actual product — a live dashboard — next to a one-line promise, so visitors understand it before they scroll." },
        { title: "Feature discovery", body: "Interactive feature tabs let each role (ops lead, finance, founder) jump to what matters to them." },
        { title: "Transparent pricing", body: "Monthly/yearly toggle and a clear “who it’s for” per plan removes the biggest objection before sales gets involved." },
        { title: "Two paths to convert", body: "Self-serve trial for small teams, “Book a demo” for larger ones — both visible on every page." },
      ],
      metrics: ["Trial sign-ups", "Demo bookings", "Trial → paid conversion", "Activation in first 7 days"],
    },
    automation: {
      title: "Sign-up to activated customer",
      steps: [
        { title: "Trial sign-up", detail: "Workspace created instantly" },
        { title: "Onboarding email series", detail: "Day 0, 2 and 5 — role-based" },
        { title: "In-app checklist", detail: "First workflow in 10 minutes" },
        { title: "Sales hand-off", detail: "Active teams flagged for a call" },
      ],
    },
  },
  {
    slug: "shopify",
    category: "Shopify & E-commerce",
    pitch:
      "Branded online stores, product storytelling, collections and conversion-focused shopping.",
    cover: unsplash("1556228578-8c89e6adf883"),
    brand: {
      name: "Solenne",
      wordmark: "Solenne",
      descriptor: "Botanical skincare",
      positioning:
        "Small-batch botanical skincare for slow mornings. Solenne is warm, tactile and unhurried — product photography does the talking, copy stays short and sensory.",
      voice: ["Warm", "Sensory", "Honest"],
      displayFont: "var(--font-fraunces), serif",
      bodyFont: "var(--font-manrope), sans-serif",
      displayName: "Fraunces",
      bodyName: "Manrope",
      palette: [
        { name: "Cream", hex: "#FBF6EE" },
        { name: "Espresso", hex: "#2B1D16" },
        { name: "Terracotta", hex: "#C86B4A" },
        { name: "Olive", hex: "#6B7442" },
        { name: "Sand", hex: "#EADBC8" },
      ],
      handle: "solenne.skin",
    },
    website: { domain: "solenne.skin", pages: ["Home", "Shop", "Product"] },
    social: {
      bio: "Botanical skincare, made in small batches 🌿\nFree shipping over ₹999",
      followers: "26.8K",
      posts: [
        { kind: "photo", image: unsplash("1556228578-8c89e6adf883", 600), overlay: "The Morning Ritual", caption: "The Morning Ritual set: cleanse, mist, glow. Now 15% off." },
        { kind: "type", text: "Slow mornings, soft skin.", tone: 2, caption: "Ritual over routine." },
        { kind: "photo", image: unsplash("1608571423902-eed4a5ad8108", 600), caption: "Rosehip Facial Oil — cold-pressed, 12 ingredients, nothing hidden." },
        { kind: "photo", image: unsplash("1620916566398-39f1143ab7be", 600), overlay: "New · Neroli Mist", caption: "Meet Neroli Mist. A morning reset in a bottle." },
        { kind: "stat", value: "12k+", label: "Five-star reviews", tone: 3, caption: "12,000+ five-star reviews and counting. Thank you." },
        { kind: "photo", image: unsplash("1598440947619-2c35fc9aa908", 600), caption: "Whipped Shea Balm. Texture you can feel through the screen." },
        { kind: "photo", image: unsplash("1617897903246-719242758050", 600), overlay: "Back in stock", caption: "Vitamin C Serum is back in stock. It sold out in 4 days last time." },
        { kind: "type", text: "Nothing hidden. Ever.", tone: 4, caption: "Full ingredient lists on every product page." },
        { kind: "photo", image: unsplash("1611930022073-b7a4ba5fcccd", 600), caption: "Behind the batch: hand-filled in our studio." },
      ],
    },
    strategy: {
      goal: "Make browsing feel like a boutique, and buying feel effortless on a phone.",
      points: [
        { title: "Product discovery", body: "Shop by concern (glow, hydrate, calm) as well as by category, so people find products by the problem they have." },
        { title: "Collection storytelling", body: "Rituals and sets bundle products into a story, lifting average order value without discount spam." },
        { title: "Mobile-first shopping", body: "Thumb-friendly product pages, sticky add-to-bag and a one-page cart built for the 80% who shop on phones." },
        { title: "Checkout conversion", body: "Trust cues (ingredients, reviews, free-shipping bar) sit right where hesitation happens — before checkout." },
      ],
      metrics: ["Conversion rate", "Average order value", "Cart abandonment", "Repeat purchase rate"],
    },
    automation: {
      title: "Order to repeat customer",
      steps: [
        { title: "Order placed", detail: "Shopify checkout complete" },
        { title: "Confirmation sent", detail: "Email + WhatsApp, branded" },
        { title: "Fulfilment updates", detail: "Packed → shipped → delivered" },
        { title: "Refill reminder", detail: "Day 30: “Running low?”" },
      ],
    },
  },
];

export const getConcept = (slug: string) => concepts.find((c) => c.slug === slug);

/** Sections on every concept page, in order (drives numbering and the floating nav). */
export const conceptSections = [
  { id: "brand", label: "Brand" },
  { id: "website", label: "Website" },
  { id: "social", label: "Social" },
  { id: "strategy", label: "Strategy" },
  { id: "automation", label: "Automation" },
];
