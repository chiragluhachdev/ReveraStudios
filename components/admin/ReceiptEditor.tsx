"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Invoice, UPI, formatINR, invoiceTotal } from "@/lib/agency";
import { markPaid } from "@/lib/api";

const todayISO = () => new Date().toISOString().slice(0, 10);

const input =
  "w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-ink";
const label = "mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-stone";

export default function ReceiptEditor({
  invoice,
  onClose,
  onGenerated,
}: {
  invoice: Invoice;
  onClose: () => void;
  onGenerated: (inv: Invoice) => void;
}) {
  const [upiTxnId, setUpiTxnId] = useState(invoice.upiTxnId ?? "");
  const [paymentMethod, setPaymentMethod] = useState(invoice.paymentMethod ?? "UPI");
  const [paymentDate, setPaymentDate] = useState(
    invoice.paidAt ? invoice.paidAt.slice(0, 10) : todayISO()
  );
  const [generating, setGenerating] = useState(false);

  const total = invoiceTotal(invoice.items);

  const generate = async () => {
    setGenerating(true);
    try {
      const updated = await markPaid(invoice.id, {
        upiTxnId: upiTxnId.trim(),
        paymentMethod,
        paidAt: new Date(paymentDate).toISOString(),
      });
      onGenerated(updated);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[97] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-canvas shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div>
            <p className="eyebrow">Verify Payment</p>
            <p className="mt-1 font-display text-xl tracking-tight text-ink">
              Generate Receipt
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="flex items-baseline justify-between rounded-xl border border-ink/10 bg-white/50 px-4 py-3">
            <span className="text-sm text-stone">Amount received</span>
            <span className="font-display text-2xl font-medium tracking-tight text-emerald-700">
              {formatINR(total)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={label}>Payment Method</label>
              <input
                className={input}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Payment Date</label>
              <input
                type="date"
                className={input}
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>UPI Transaction ID</label>
            <input
              className={input}
              value={upiTxnId}
              onChange={(e) => setUpiTxnId(e.target.value)}
              placeholder="e.g. 4312 9087 6654"
              autoFocus
            />
          </div>

          <div className="rounded-xl border border-ink/10 bg-white/50 px-4 py-3 text-xs text-stone">
            Paid to <span className="text-ink">{UPI.accountHolder}</span> · A/c{" "}
            <span className="text-ink">{UPI.accountNumber}</span> ·{" "}
            <span className="text-ink">{UPI.ifsc}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-6 py-5">
          <button
            onClick={onClose}
            className="text-sm font-medium text-stone transition-colors hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={generate}
            disabled={generating}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-medium text-white transition-colors duration-500 ease-expo hover:bg-ink disabled:opacity-60"
          >
            {generating ? "Generating…" : "Confirm & Generate Receipt"}
          </button>
        </div>
      </div>
    </div>
  );
}
