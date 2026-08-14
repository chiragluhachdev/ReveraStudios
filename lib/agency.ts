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
  pan: "BQRPH8890K",
  email: "studios.revera@gmail.com",
  phone: "+91 8130809374",
};

// Payee / bank details shown on invoices and receipts.
export const UPI = {
  accountHolder: "Mr. Harshit",
  accountNumber: "0747950965",
  ifsc: "KKBK0000286",
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
  { id: "starter", label: "Starter" },
  { id: "growth", label: "Growth" },
  { id: "scale", label: "Scale" },
  { id: "app-deployment", label: "App Deployment" },
  { id: "deployment-care", label: "Deployment + Care" },
  { id: "app-maintenance", label: "App Maintenance" },
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
  // Payment / receipt details (set when the receipt is generated).
  paymentMethod?: string;
  upiTxnId?: string;
};

// ── Plan → editable service breakdown defaults ───────────────
export function defaultBreakdown(planId: PlanId): InvoiceItem[] {
  const rows: Record<PlanId, [string, number][]> = {
    starter: [
      ["Website Design & Development", 10000],
      ["Domain & Hosting Setup", 3000],
      ["Basic Maintenance & Support", 2000],
    ],
    growth: [
      ["Premium Custom Website Design", 20000],
      ["Performance & Security Optimization", 5000],
      ["Monthly Maintenance & Updates", 5000],
    ],
    scale: [
      ["Advanced CMS & Integrations", 25000],
      ["Priority Technical Support", 10000],
      ["Continuous Improvement & Maintenance", 5000],
    ],
    "app-deployment": [
      ["App Store & Play Store Deployment", 12000],
      ["Build & Release Management", 3000],
    ],
    "deployment-care": [
      ["App Deployment", 12000],
      ["Backend & Database Maintenance", 8000],
      ["Bug Fixes & Updates", 5000],
    ],
    "app-maintenance": [
      ["Backend & Database Maintenance", 8000],
      ["Performance Monitoring & Bug Fixes", 7000],
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
