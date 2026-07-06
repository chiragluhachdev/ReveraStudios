"use client";

import { CheckCircle2 } from "lucide-react";
import {
  BRAND,
  Invoice,
  UPI,
  amountInWords,
  formatINR,
  invoiceTotal,
} from "@/lib/agency";

/**
 * Premium, print-ready Payment Receipt. Same document family as the
 * Invoice — minimal, editorial, A4. Driven entirely by the paid invoice.
 */
export default function ReceiptDocument({ doc }: { doc: Invoice }) {
  const total = invoiceTotal(doc.items);

  return (
    <div className="invoice-print mx-auto w-full max-w-[820px] bg-white p-8 font-sans text-ink sm:p-12">
      {/* Header */}
      <header className="flex items-start justify-between gap-6 border-b border-ink/10 pb-8">
        <div>
          <p className="font-display text-3xl tracking-tight text-ink">
            Rêvera<span className="text-accent">.</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone">
            {BRAND.type}
          </p>
          <div className="mt-4 space-y-0.5 text-xs leading-relaxed text-stone">
            <p>{BRAND.address}</p>
            <p>MSME (UDYAM): {BRAND.udyam}</p>
            <p>
              {BRAND.email} · {BRAND.phone}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl tracking-[0.1em] text-ink">RECEIPT</p>
          <p className="mt-2 text-sm font-medium text-ink">
            {doc.receiptId ?? doc.id}
          </p>
          <span className="mt-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-700">
            Paid
          </span>
        </div>
      </header>

      {/* Meta */}
      <section className="grid grid-cols-2 gap-8 border-b border-ink/10 py-8 sm:grid-cols-4">
        <Meta label="Receipt No." value={doc.receiptId ?? "—"} />
        <Meta label="Receipt Date" value={fmtDate(doc.paidAt ?? doc.invoiceDate)} />
        <Meta label="Invoice Ref." value={doc.id} />
        <Meta label="Status" value="Paid" />
      </section>

      {/* Client + Project */}
      <section className="grid grid-cols-1 gap-8 border-b border-ink/10 py-8 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">
            Received From
          </p>
          <p className="font-display text-xl tracking-tight text-ink">
            {doc.client.name}
          </p>
          {doc.client.organization && (
            <p className="mt-1 text-sm text-ink/70">
              <span className="text-stone">Organization: </span>
              {doc.client.organization}
            </p>
          )}
          <p className="mt-2 text-sm text-stone">
            {[doc.client.email, doc.client.phone].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">
            Project
          </p>
          <p className="font-display text-lg tracking-tight text-ink">
            {doc.projectName ?? "—"}
          </p>
          <p className="mt-2 text-sm text-stone">Plan: {doc.planLabel}</p>
        </div>
      </section>

      {/* Payment summary */}
      <section className="border-b border-ink/10 py-8">
        <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone">
          Payment Summary
        </p>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/15">
              <th className="pb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                Description
              </th>
              <th className="pb-3 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {doc.items.map((item) => (
              <tr key={item.id} className="border-b border-ink/8">
                <td className="py-4 pr-4 text-sm text-ink/90">{item.category}</td>
                <td className="py-4 text-right text-sm font-medium text-ink">
                  {formatINR(item.value)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="pt-5 text-right text-sm font-medium uppercase tracking-[0.15em] text-stone">
                Total Amount Received
              </td>
              <td className="pt-5 text-right font-display text-2xl font-medium tracking-tight text-emerald-700">
                {formatINR(total)}
              </td>
            </tr>
          </tfoot>
        </table>
        <p className="mt-3 text-right text-xs italic leading-relaxed text-stone">
          {amountInWords(total)}
        </p>
      </section>

      {/* Payment details */}
      <section className="grid grid-cols-1 gap-8 border-b border-ink/10 py-8 sm:grid-cols-2 [break-inside:avoid]">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone">
            Payment Details
          </p>
          <Row label="Payment Method" value={doc.paymentMethod || "UPI"} />
          <Row label="Payment Date" value={fmtDate(doc.paidAt ?? doc.invoiceDate)} />
          <Row label="UPI Transaction ID" value={doc.upiTxnId || "—"} />
        </div>
        <div className="space-y-3 sm:text-right">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone">
            Paid To
          </p>
          <Row label="Account Holder" value={UPI.accountHolder} align="right" />
          <Row label="UPI ID" value={UPI.id} align="right" />
        </div>
      </section>

      {/* Confirmation */}
      <section className="py-8 [break-inside:avoid]">
        <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-6">
          <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-emerald-700" />
          <div>
            <p className="font-display text-lg tracking-tight text-ink">
              Payment Confirmed
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/75">
              Payment has been successfully received and verified by Rêvera
              Studio. The project is now officially active and development
              activities have commenced.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 pt-6 text-center [break-inside:avoid]">
        <p className="font-display text-lg tracking-tight text-ink">
          Thank you for choosing Rêvera Studio.
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-stone">
          This is a computer-generated receipt and does not require a physical
          signature.
        </p>
      </footer>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-stone">{label}</p>
      <p className="mt-1.5 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function Row({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-stone">{label}</p>
      <p className={`mt-0.5 text-sm text-ink ${align === "right" ? "sm:text-right" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function fmtDate(d: string) {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
