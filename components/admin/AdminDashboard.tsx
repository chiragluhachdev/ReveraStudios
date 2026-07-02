"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  FileText,
  LayoutGrid,
  LogOut,
  ReceiptText,
  Users,
  Wallet,
} from "lucide-react";
import {
  DocType,
  Invoice,
  ProjectRequest,
  formatINR,
  planLabel,
} from "@/lib/agency";
import { logout as apiLogout } from "@/lib/api";
import { useAgencyData } from "./useAgencyData";
import RequestDrawer from "./RequestDrawer";
import InvoiceEditor from "./InvoiceEditor";
import DocumentViewer from "./DocumentViewer";

const TABS = [
  { id: "requests", label: "Project Requests", icon: LayoutGrid },
  { id: "clients", label: "Clients", icon: Users },
  { id: "quotations", label: "Quotations", icon: FileText },
  { id: "invoices", label: "Invoices", icon: ReceiptText },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "completed", label: "Completed Projects", icon: CheckCircle2 },
] as const;

type TabId = (typeof TABS)[number]["id"];

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Paid"
      ? "bg-emerald-500/10 text-emerald-700"
      : status === "Completed"
      ? "bg-ink/10 text-ink"
      : status === "New"
      ? "bg-accent/10 text-accent"
      : "bg-ink/[0.06] text-stone";
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${tone}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const { requests, invoices, refresh } = useAgencyData();
  const [tab, setTab] = useState<TabId>("requests");
  const [drawer, setDrawer] = useState<ProjectRequest | null>(null);
  const [editor, setEditor] = useState<{
    request: ProjectRequest;
    docType: Exclude<DocType, "Receipt">;
  } | null>(null);
  const [viewer, setViewer] = useState<Invoice | null>(null);

  const clients = useMemo(() => {
    const map = new Map<string, ProjectRequest>();
    requests.forEach((r) => {
      if (!map.has(r.email)) map.set(r.email, r);
    });
    return Array.from(map.values());
  }, [requests]);

  const quotations = invoices.filter((i) => i.docType === "Quotation");
  const invoiceDocs = invoices.filter((i) => i.docType === "Invoice");
  const payments = invoices.filter((i) => i.status === "Paid");
  const completed = requests.filter((r) => r.status === "Completed");

  const logout = async () => {
    await apiLogout();
    window.location.reload();
  };

  const stats = [
    { label: "Requests", value: requests.length, icon: LayoutGrid },
    { label: "Invoices", value: invoiceDocs.length, icon: ReceiptText },
    { label: "Paid", value: payments.length, icon: Wallet },
    {
      label: "Revenue",
      value: formatINR(
        payments.reduce((s, i) => s + i.items.reduce((a, b) => a + b.value, 0), 0)
      ),
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-tight text-ink">
              Rêvera<span className="text-accent">.</span>
            </span>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-stone sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-stone transition-colors hover:text-ink">
              View site
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-ink/10 bg-white/50 p-5">
              <s.icon size={18} className="text-stone" />
              <p className="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-ink/10 pb-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                tab === t.id
                  ? "bg-ink text-canvas"
                  : "text-stone hover:bg-ink/[0.06] hover:text-ink"
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {tab === "requests" && (
          <Table
            head={["Request ID", "Client", "Business", "Plan", "Services", "Date", "Status"]}
            empty="No project requests yet. Submit one from the pricing page."
            rows={requests.map((r) => ({
              key: r.id,
              onClick: () => setDrawer(r),
              cells: [
                <span key="id" className="font-medium text-ink">{r.id}</span>,
                r.fullName,
                r.businessName,
                planLabel(r.planId),
                <span key="s" className="text-stone">{r.services.length} selected</span>,
                fmtDate(r.createdAt),
                <StatusPill key="st" status={r.status} />,
              ],
            }))}
          />
        )}

        {tab === "clients" && (
          <Table
            head={["Client", "Business", "Email", "Phone", "Industry"]}
            empty="No clients yet."
            rows={clients.map((c) => ({
              key: c.email,
              cells: [c.fullName, c.businessName, c.email, c.phone, c.industry],
            }))}
          />
        )}

        {(tab === "quotations" || tab === "invoices") && (
          <Table
            head={["Document", "Client", "Plan", "Amount", "Date", "Status"]}
            empty={`No ${tab} yet. Generate one from a project request.`}
            rows={(tab === "quotations" ? quotations : invoiceDocs).map((i) => ({
              key: i.id,
              onClick: () => setViewer(i),
              cells: [
                <span key="id" className="font-medium text-ink">{i.id}</span>,
                i.client.name,
                i.planLabel,
                formatINR(i.items.reduce((a, b) => a + b.value, 0)),
                fmtDate(i.createdAt),
                <StatusPill key="st" status={i.status} />,
              ],
            }))}
          />
        )}

        {tab === "payments" && (
          <Table
            head={["Invoice", "Receipt", "Client", "Amount", "Paid On", "Status"]}
            empty="No payments recorded yet."
            rows={payments.map((i) => ({
              key: i.id,
              onClick: () => setViewer(i),
              cells: [
                <span key="id" className="font-medium text-ink">{i.id}</span>,
                i.receiptId ?? "—",
                i.client.name,
                formatINR(i.items.reduce((a, b) => a + b.value, 0)),
                i.paidAt ? fmtDate(i.paidAt) : "—",
                <StatusPill key="st" status="Paid" />,
              ],
            }))}
          />
        )}

        {tab === "completed" && (
          <Table
            head={["Request ID", "Client", "Business", "Plan", "Date"]}
            empty="No completed projects yet."
            rows={completed.map((r) => ({
              key: r.id,
              onClick: () => setDrawer(r),
              cells: [r.id, r.fullName, r.businessName, planLabel(r.planId), fmtDate(r.createdAt)],
            }))}
          />
        )}
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {drawer && (
          <RequestDrawer
            request={drawer}
            onClose={() => setDrawer(null)}
            onRefresh={refresh}
            onGenerate={(request, docType) => {
              setDrawer(null);
              setEditor({ request, docType });
            }}
          />
        )}
      </AnimatePresence>

      {editor && (
        <InvoiceEditor
          request={editor.request}
          docType={editor.docType}
          onClose={() => setEditor(null)}
          onGenerated={(inv) => {
            setEditor(null);
            setViewer(inv);
            refresh();
          }}
        />
      )}

      {viewer && (
        <DocumentViewer
          invoice={viewer}
          onClose={() => setViewer(null)}
          onChanged={refresh}
        />
      )}
    </div>
  );
}

// ── Reusable table ───────────────────────────────────────────
type Row = { key: string; onClick?: () => void; cells: React.ReactNode[] };

function Table({
  head,
  rows,
  empty,
}: {
  head: string[];
  rows: Row[];
  empty: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 py-20 text-center">
        <p className="text-sm text-stone">{empty}</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 bg-white/40">
            {head.map((h) => (
              <th
                key={h}
                className="px-5 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-stone"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.key}
              onClick={r.onClick}
              className={`border-b border-ink/[0.06] last:border-0 ${
                r.onClick ? "cursor-pointer transition-colors hover:bg-ivory/60" : ""
              }`}
            >
              {r.cells.map((c, i) => (
                <td key={i} className="px-5 py-4 text-ink/80">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
