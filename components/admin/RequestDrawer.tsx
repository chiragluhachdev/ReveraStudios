"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, ReceiptText, X } from "lucide-react";
import {
  DocType,
  PROJECT_STATUSES,
  ProjectRequest,
  SERVICE_OPTIONS,
  TIMELINES,
  planLabel,
} from "@/lib/agency";
import { updateRequest } from "@/lib/api";

const selectCls =
  "w-full rounded-lg border border-ink/15 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink";
const label = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-stone";

export default function RequestDrawer({
  request: initial,
  onClose,
  onRefresh,
  onGenerate,
}: {
  request: ProjectRequest;
  onClose: () => void;
  onRefresh: () => void;
  onGenerate: (request: ProjectRequest, docType: Exclude<DocType, "Receipt">) => void;
}) {
  // Local, optimistic copy — persisted to MongoDB on each edit.
  const [request, setRequest] = useState<ProjectRequest>(initial);
  const [note, setNote] = useState("");

  const patch = async (p: Partial<ProjectRequest>) => {
    setRequest((r) => ({ ...r, ...p })); // optimistic
    try {
      const updated = await updateRequest(request.id, p);
      setRequest(updated);
    } finally {
      onRefresh();
    }
  };

  const toggleService = (svc: string) => {
    const services = request.services.includes(svc)
      ? request.services.filter((s) => s !== svc)
      : [...request.services, svc];
    patch({ services });
  };

  const addNote = () => {
    if (!note.trim()) return;
    patch({
      notes: [...request.notes, { at: new Date().toISOString(), text: note.trim() }],
    });
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-[88] flex justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-canvas shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink/10 bg-canvas/85 px-6 py-5 backdrop-blur-xl">
          <div>
            <p className="eyebrow">{planLabel(request.planId)}</p>
            <h3 className="mt-1 font-display text-2xl tracking-tight text-ink">
              {request.businessName}
            </h3>
            <p className="mt-1 text-xs text-stone">{request.id}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-8 px-6 py-6">
          {/* Client */}
          <Block title="Client">
            <Detail label="Name" value={request.fullName} />
            <Detail label="Email" value={request.email} />
            <Detail label="Phone" value={request.phone} />
            {request.organization && (
              <Detail label="Organization" value={request.organization} />
            )}
            {request.website && <Detail label="Website" value={request.website} />}
            <Detail label="Industry" value={request.industry} />
          </Block>

          {/* Brief */}
          {request.brief && (
            <Block title="Project Brief">
              <p className="text-pretty text-sm leading-relaxed text-ink/75">
                {request.brief}
              </p>
            </Block>
          )}

          {/* Services (editable) */}
          <Block title="Requested Services">
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((s) => {
                const on = request.services.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleService(s)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300 ${
                      on
                        ? "border-accent bg-accent text-canvas"
                        : "border-ink/15 text-ink/60 hover:border-ink/40"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </Block>

          {/* Existing assets + files */}
          {request.existingAssets.length > 0 && (
            <Block title="Existing Assets">
              <p className="text-sm text-ink/75">
                {request.existingAssets.join(", ")}
              </p>
            </Block>
          )}
          {request.files.length > 0 && (
            <Block title="Attached Files">
              <ul className="space-y-1.5">
                {request.files.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-ink/75">
                    <FileText size={14} className="text-stone" />
                    {f.name}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {/* Controls */}
          <Block title="Engagement">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={label}>Status</label>
                <select
                  className={selectCls}
                  value={request.status}
                  onChange={(e) =>
                    patch({ status: e.target.value as ProjectRequest["status"] })
                  }
                >
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>Timeline</label>
                <select
                  className={selectCls}
                  value={request.timeline || ""}
                  onChange={(e) => patch({ timeline: e.target.value })}
                >
                  <option value="">—</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className={label}>Quoted Amount (₹)</label>
                <input
                  type="number"
                  className={selectCls}
                  value={request.quotedAmount ?? ""}
                  placeholder="Set during discussion"
                  onChange={(e) =>
                    patch({
                      quotedAmount: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                />
              </div>
            </div>
          </Block>

          {/* Internal notes */}
          <Block title="Internal Notes">
            {request.notes.length > 0 && (
              <ul className="mb-4 space-y-3">
                {request.notes.map((n, i) => (
                  <li key={i} className="rounded-lg border border-ink/10 bg-white/50 p-3">
                    <p className="text-sm text-ink/80">{n.text}</p>
                    <p className="mt-1 text-[11px] text-stone">
                      {new Date(n.at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-end gap-2">
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a private note…"
                className={`${selectCls} resize-none`}
              />
              <button
                onClick={addNote}
                aria-label="Add note"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-colors hover:bg-accent"
              >
                <Plus size={18} />
              </button>
            </div>
          </Block>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 flex gap-3 border-t border-ink/10 bg-canvas/85 px-6 py-4 backdrop-blur-xl">
          <button
            onClick={() => onGenerate(request, "Quotation")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
          >
            <FileText size={15} /> Quotation
          </button>
          <button
            onClick={() => onGenerate(request, "Invoice")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent"
          >
            <ReceiptText size={15} /> Generate Invoice
          </button>
        </div>
      </motion.aside>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone">{title}</p>
      {children}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink/8 py-2 last:border-0">
      <span className="text-sm text-stone">{label}</span>
      <span className="text-right text-sm text-ink">{value}</span>
    </div>
  );
}
