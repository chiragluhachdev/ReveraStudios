"use client";

import {
  BRAND,
  Invoice,
  UPI,
  amountInWords,
  formatINR,
  invoiceTotal,
} from "@/lib/agency";

const statusStyles: Record<string, string> = {
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-700",
  Paid: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
  Expired: "border-red-500/30 bg-red-500/10 text-red-700",
};

/**
 * Reusable, print-ready A4 document for Invoice / Quotation / Receipt.
 * Purely presentational — all content is driven by the `doc` prop.
 */
export default function InvoiceDocument({ doc }: { doc: Invoice }) {
  const total = invoiceTotal(doc.items);
  const isReceipt = doc.docType === "Receipt";
  const title = doc.docType.toUpperCase();

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
            <p>Udyam Registration No.: {BRAND.udyam}</p>
            <p>PAN: {BRAND.pan}</p>
            <p>
              {BRAND.email} · {BRAND.phone}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl tracking-[0.1em] text-ink">{title}</p>
          <p className="mt-2 text-sm font-medium text-ink">{doc.id}</p>
          <span
            className={`mt-3 inline-block rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] ${
              statusStyles[isReceipt ? "Paid" : doc.status] ?? statusStyles.Pending
            }`}
          >
            {isReceipt ? "Paid" : doc.status}
          </span>
        </div>
      </header>

      {/* Meta row */}
      <section className="grid grid-cols-2 gap-8 border-b border-ink/10 py-8 sm:grid-cols-4">
        <Meta label="Invoice Date" value={fmtDate(doc.invoiceDate)} />
        {isReceipt ? (
          <Meta label="Payment Date" value={fmtDate(doc.paidAt ?? doc.invoiceDate)} />
        ) : (
          <Meta label="Due Date" value={fmtDate(doc.dueDate)} />
        )}
        <Meta label="Plan" value={doc.planLabel} />
        <Meta label="Payment Due" value={isReceipt ? "Received" : "Within 3 Days"} />
      </section>

      {/* Project */}
      {doc.projectName && (
        <section className="border-b border-ink/10 py-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone">
            Project
          </p>
          <p className="mt-1.5 font-display text-lg tracking-tight text-ink">
            {doc.projectName}
          </p>
        </section>
      )}

      {/* Billed to */}
      <section className="grid grid-cols-1 gap-8 border-b border-ink/10 py-8 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">
            {isReceipt ? "Received From" : "Billed To"}
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
          {doc.client.address && (
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone">
              {doc.client.address}
            </p>
          )}
          <p className="mt-2 text-sm text-stone">
            {[doc.client.email, doc.client.phone].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">
            Amount {isReceipt ? "Paid" : "Payable"}
          </p>
          <p className="font-display text-4xl font-medium tracking-tight text-ink">
            {formatINR(total)}
          </p>
          <p className="mt-2 text-xs italic leading-relaxed text-stone">
            {amountInWords(total)}
          </p>
        </div>
      </section>

      {/* Service breakdown */}
      <section className="py-8">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/15">
              <th className="pb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                Service Category
              </th>
              <th className="pb-3 text-right text-[11px] font-medium uppercase tracking-[0.18em] text-stone">
                Service Value
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
                Total
              </td>
              <td className="pt-5 text-right font-display text-2xl font-medium tracking-tight text-ink">
                {formatINR(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* Need assistance? */}
      {!isReceipt && (
        <section className="border-t border-ink/10 py-6 [break-inside:avoid]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone">
            Need assistance?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            Contact us at{" "}
            <span className="text-ink">{BRAND.email}</span> or{" "}
            <span className="text-ink">{BRAND.phone}</span> for any questions
            regarding this {doc.docType.toLowerCase()}.
          </p>
        </section>
      )}

      {/* Payment + notes */}
      <section className="grid grid-cols-1 gap-8 border-t border-ink/10 py-8 sm:grid-cols-2 [break-inside:avoid]">
        {!isReceipt ? (
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone">
              Scan &amp; Pay
            </p>
            <div className="flex items-center gap-5">
              <div className="flex h-[132px] w-[132px] items-center justify-center rounded-lg border border-ink/10 bg-white p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/videos/xpayment.png"
                  alt="Scan & Pay UPI QR code"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-stone">Account Holder</p>
                <p className="font-medium text-ink">{UPI.accountHolder}</p>
                <p className="pt-2 text-stone">UPI ID</p>
                <p className="font-medium text-ink">{UPI.id}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-stone">
              Please mention Invoice No.{" "}
              <span className="text-ink">({doc.id})</span> while making the
              payment.
            </p>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone">
              Payment
            </p>
            <p className="font-display text-xl tracking-tight text-emerald-700">
              Payment Received in Full
            </p>
            <p className="mt-2 text-sm text-stone">Paid via UPI · {UPI.id}</p>
            <p className="mt-1 text-sm text-stone">Account Holder: {UPI.accountHolder}</p>
          </div>
        )}

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-stone">
            Terms &amp; Conditions
          </p>
          <ul className="space-y-1.5 text-xs leading-relaxed text-stone">
            {doc.terms.map((t, i) => (
              <li key={i}>· {t}</li>
            ))}
          </ul>
          {doc.notes && (
            <>
              <p className="mb-2 mt-5 text-[11px] uppercase tracking-[0.2em] text-stone">
                Notes
              </p>
              <p className="text-xs leading-relaxed text-stone">{doc.notes}</p>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 pt-6 text-center [break-inside:avoid]">
        <p className="font-display text-lg tracking-tight text-ink">
          Thank you for choosing Rêvera Studio.
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-stone">
          This is a computer-generated {doc.docType.toLowerCase()} and does not
          require a physical signature.
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
