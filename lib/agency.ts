// ─────────────────────────────────────────────────────────────
// Rêvera Studio — Agency workflow shared types, constants & helpers.
//
// Persistence lives in MongoDB (see lib/server/repo.ts) and is reached
// from the client through /api routes (see lib/api.ts). This module is
// safe to import from both server and client — it holds no I/O.
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: "Rêvera Studio",
  type: "Technology & Digital Agency",
  address: "Faridabad, Haryana – 121001, India",
  udyam: "UDYAM-HR-03-0157904",
  email: "studios.revera@gmail.com",
  phone: "+91 8796657504",
};

export const UPI = {
  accountHolder: "Ms. MUKESH",
  id: "8920545623@axl",
};

// ── Onboarding constants ─────────────────────────────────────
export const INDUSTRIES = [
  "Restaurant",
  "Café",
  "Jewellery",
  "Fashion",
  "Healthcare",
  "Startup",
  "SaaS",
  "Education",
  "Personal Brand",
  "Other",
] as const;

export const SERVICE_OPTIONS = [
  "Brand Strategy",
  "Website",
  "Mobile App",
  "AI Automation",
  "Social Media",
  "Photography",
  "Videography",
  "API Integration",
  "Google Play Launch",
  "Apple App Store Launch",
] as const;

export const EXISTING_ASSETS = [
  "Logo",
  "Website",
  "Mobile App",
  "Domain",
  "Hosting",
] as const;

export const TIMELINES = [
  "ASAP",
  "Within 2 Weeks",
  "Within 1 Month",
  "Flexible",
] as const;

export const PLAN_OPTIONS = [
  { id: "starter", label: "Starter Brand" },
  { id: "growth", label: "Growth Brand" },
  { id: "launch", label: "Launch Brand" },
  { id: "custom", label: "Custom" },
] as const;

export type PlanId = (typeof PLAN_OPTIONS)[number]["id"];

export const planLabel = (id: PlanId) =>
  PLAN_OPTIONS.find((p) => p.id === id)?.label ?? "Custom";

// ── Statuses ─────────────────────────────────────────────────
export const PROJECT_STATUSES = [
  "New",
  "Contacted",
  "Discussion Scheduled",
  "Awaiting Approval",
  "Approved",
  "Invoice Generated",
  "Paid",
  "In Progress",
  "Completed",
] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type PaymentStatus = "Pending" | "Paid" | "Expired";
export type DocType = "Invoice" | "Quotation" | "Receipt";

// ── Records ──────────────────────────────────────────────────
export type UploadedFileMeta = { name: string; size: number; type: string };

export type AdminNote = { at: string; text: string };

export type ProjectRequest = {
  id: string;
  createdAt: string;
  status: ProjectStatus;
  // Step 1 — Personal
  fullName: string;
  email: string;
  phone: string;
  // Step 2 — Business
  businessName: string;
  organization?: string;
  website?: string;
  industry: string;
  // Step 3 / 4 / 5
  services: string[];
  existingAssets: string[];
  brief: string;
  // Step 6 / 7 / 8
  planId: PlanId;
  timeline: string;
  files: UploadedFileMeta[];
  // Admin
  notes: AdminNote[];
  quotedAmount?: number;
};

export type InvoiceItem = { id: string; category: string; value: number };

export type Invoice = {
  id: string;
  docType: DocType;
  requestId?: string;
  createdAt: string;
  invoiceDate: string; // yyyy-mm-dd
  dueDate: string; // yyyy-mm-dd
  status: PaymentStatus;
  client: {
    name: string;
    organization?: string;
    email: string;
    phone: string;
    address: string;
  };
  planLabel: string;
  /** Optional project / engagement name shown on the document. */
  projectName?: string;
  items: InvoiceItem[];
  notes: string;
  terms: string[];
  paidAt?: string;
  receiptId?: string;
};

// ── Plan → editable service breakdown defaults ───────────────
export function defaultBreakdown(planId: PlanId): InvoiceItem[] {
  const rows: Record<PlanId, [string, number][]> = {
    starter: [
      ["Brand Foundation & Identity Guidance", 3000],
      ["Website Design & Development (up to 5 pages)", 9000],
      ["Technical Setup & Deployment", 2000],
      ["Launch Support & Training", 1000],
    ],
    growth: [
      ["Brand Strategy & Creative Direction", 5000],
      ["Digital Presence Management & Maintenance", 7000],
      ["Professional Content Production (Photo & Reels)", 7000],
      ["Social Media Management & Creatives", 4000],
      ["Support & Monthly Strategy", 2000],
    ],
    launch: [
      ["Brand Strategy, UI/UX & Product Planning", 8000],
      ["Website Development, Digital Presence & Deployment", 8000],
      ["Google Play & Apple App Store Launch", 12000],
      ["API Integrations & Business Automation", 7000],
      ["Professional Content, Launch Assets & Premium Support", 5000],
    ],
    custom: [["Project scope — to be defined", 0]],
  };
  return rows[planId].map(([category, value], i) => ({
    id: `${Date.now()}-${i}`,
    category,
    value,
  }));
}

export const defaultTerms = [
  "Payment is due within 3 calendar days from the invoice date.",
  "Project work will commence once the payment has been successfully confirmed.",
  "Timelines are estimated and may vary depending on project complexity and client feedback.",
  "The client is responsible for providing all required content, assets, and approvals in a timely manner.",
];

// ── Number → Indian words ────────────────────────────────────
export function amountInWords(num: number): string {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
    "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
    "Eighty", "Ninety",
  ];
  const twoDigits = (n: number): string =>
    n < 20 ? a[n] : `${b[Math.floor(n / 10)]}${n % 10 ? " " + a[n % 10] : ""}`;
  const threeDigits = (n: number): string =>
    n >= 100
      ? `${a[Math.floor(n / 100)]} Hundred${n % 100 ? " " + twoDigits(n % 100) : ""}`
      : twoDigits(n);

  const n = Math.floor(Math.abs(num));
  if (n === 0) return "Zero Rupees Only";

  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;

  const parts: string[] = [];
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  return `${parts.join(" ")} Rupees Only`;
}

export const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export const invoiceTotal = (items: InvoiceItem[]) =>
  items.reduce((sum, i) => sum + (Number(i.value) || 0), 0);

// Convenience: build a receipt "invoice" view-model from a paid invoice.
export function toReceipt(inv: Invoice): Invoice {
  return { ...inv, docType: "Receipt", id: inv.receiptId ?? inv.id };
}
