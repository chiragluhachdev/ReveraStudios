"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import {
  DocType,
  Invoice,
  InvoiceItem,
  ProjectRequest,
  defaultBreakdown,
  defaultTerms,
  formatINR,
  invoiceTotal,
  planLabel,
} from "@/lib/agency";
import { createDocument, updateRequest } from "@/lib/api";

const todayISO = () => new Date().toISOString().slice(0, 10);
const plusDaysISO = (days: number) =>
  new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

const input =
  "w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-ink";
const label = "mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-stone";

export default function InvoiceEditor({
  request,
  docType,
  onClose,
  onGenerated,
}: {
  request: ProjectRequest;
  docType: Exclude<DocType, "Receipt">;
  onClose: () => void;
  onGenerated: (inv: Invoice) => void;
}) {
  const [client, setClient] = useState({
    name: request.fullName,
    organization: request.organization ?? "",
    email: request.email,
    phone: request.phone,
    address: "",
  });
  const [projectName, setProjectName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState(plusDaysISO(3));
  const [items, setItems] = useState<InvoiceItem[]>(
    defaultBreakdown(request.planId)
  );
  const [notes, setNotes] = useState(
    request.quotedAmount ? "" : `Prepared for ${request.businessName}.`
  );
  const [terms] = useState(defaultTerms);
  const [generating, setGenerating] = useState(false);

  const total = invoiceTotal(items);

  const setItem = (id: string, patch: Partial<InvoiceItem>) =>
    setItems((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addItem = () =>
    setItems((rows) => [
      ...rows,
      { id: `${Date.now()}`, category: "", value: 0 },
    ]);
  const removeItem = (id: string) =>
    setItems((rows) => rows.filter((r) => r.id !== id));

  const generate = async () => {
    setGenerating(true);
    try {
      const inv = await createDocument(docType, {
        requestId: request.id,
        invoiceDate,
        dueDate,
        client: {
          name: client.name,
          organization: client.organization || undefined,
          email: client.email,
          phone: client.phone,
          address: client.address,
        },
        planLabel: planLabel(request.planId),
        projectName: projectName.trim() || undefined,
        items,
        notes,
        terms,
      });
      await updateRequest(request.id, {
        status: docType === "Invoice" ? "Invoice Generated" : "Awaiting Approval",
        quotedAmount: total,
      });
      onGenerated(inv);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[92] flex items-stretch justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-canvas shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div>
            <p className="eyebrow">Generate {docType}</p>
            <p className="mt-1 font-display text-xl tracking-tight text-ink">
              {planLabel(request.planId)} · {request.businessName}
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

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-7">
          {/* Client */}
          <div>
            <p className="mb-4 text-sm font-medium text-ink">Client Details</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Client Name</label>
                <input
                  className={input}
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                />
              </div>
              <div>
                <label className={label}>Organization</label>
                <input
                  className={input}
                  value={client.organization}
                  onChange={(e) =>
                    setClient({ ...client, organization: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={label}>Email</label>
                <input
                  className={input}
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                />
              </div>
              <div>
                <label className={label}>Phone</label>
                <input
                  className={input}
                  value={client.phone}
                  onChange={(e) => setClient({ ...client, phone: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Billing Address</label>
                <input
                  className={input}
                  value={client.address}
                  onChange={(e) =>
                    setClient({ ...client, address: e.target.value })
                  }
                  placeholder="Street, City, State – PIN"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Project Name</label>
                <input
                  className={input}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. MR Bites – Campus Food Pre-Ordering Platform"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Invoice Date</label>
              <input
                type="date"
                className={input}
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Due Date</label>
              <input
                type="date"
                className={input}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Service breakdown */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">Service Breakdown</p>
              <button
                onClick={addItem}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent"
              >
                <Plus size={14} /> Add item
              </button>
            </div>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <input
                    className={`${input} flex-1`}
                    value={item.category}
                    placeholder="Service category"
                    onChange={(e) => setItem(item.id, { category: e.target.value })}
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-stone">₹</span>
                    <input
                      type="number"
                      className={`${input} w-28 text-right`}
                      value={item.value}
                      onChange={(e) =>
                        setItem(item.id, { value: Number(e.target.value) })
                      }
                    />
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="text-stone transition-colors hover:text-accent"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="text-sm uppercase tracking-[0.15em] text-stone">
                Total
              </span>
              <span className="font-display text-2xl font-medium tracking-tight text-ink">
                {formatINR(total)}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={label}>Notes</label>
            <textarea
              rows={2}
              className={`${input} resize-none`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional note shown on the document"
            />
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
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-canvas transition-colors duration-500 ease-expo hover:bg-accent disabled:opacity-60"
          >
            {generating ? "Generating…" : `Generate ${docType}`}
          </button>
        </div>
      </div>
    </div>
  );
}
