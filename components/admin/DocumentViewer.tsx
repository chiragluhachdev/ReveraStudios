"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Download, Mail, MessageCircle, Receipt, Trash2, X } from "lucide-react";
import {
  Invoice,
  UPI,
  formatINR,
  invoiceTotal,
  toReceipt,
} from "@/lib/agency";
import { deleteInvoice } from "@/lib/api";
import InvoiceDocument from "@/components/documents/InvoiceDocument";
import ReceiptDocument from "@/components/documents/ReceiptDocument";
import ReceiptEditor from "@/components/admin/ReceiptEditor";

export default function DocumentViewer({
  invoice,
  onClose,
  onChanged,
}: {
  invoice: Invoice;
  onClose: () => void;
  onChanged?: () => void;
}) {
  const [current, setCurrent] = useState<Invoice>(invoice);
  const [showReceipt, setShowReceipt] = useState(invoice.docType === "Receipt");
  const [editorOpen, setEditorOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // `doc` drives the toolbar label + share text (receipt id vs invoice id).
  const doc = showReceipt ? toReceipt(current) : current;
  const total = invoiceTotal(doc.items);
  const paid = current.status === "Paid";

  const shareText = `Hi ${doc.client.name}, here is your ${doc.docType} ${doc.id} from Rêvera Studio. Amount: ${formatINR(
    total
  )}. Pay to ${UPI.accountHolder}, A/c ${UPI.accountNumber}, IFSC ${UPI.ifsc}. Thank you for choosing Rêvera Studio.`;

  const waHref = `https://wa.me/${doc.client.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    shareText
  )}`;
  const mailHref = `mailto:${doc.client.email}?subject=${encodeURIComponent(
    `Rêvera Studio — ${doc.docType} ${doc.id}`
  )}&body=${encodeURIComponent(shareText)}`;

  const remove = async () => {
    if (
      !window.confirm(
        `Delete ${current.docType} ${current.id}? This permanently removes it and cannot be undone.`
      )
    )
      return;
    await deleteInvoice(current.id);
    onChanged?.();
    onClose();
  };

  // The "Receipt" render uses the dedicated ReceiptDocument; everything
  // else uses the InvoiceDocument. Both take the live `current` record.
  const DocBody = showReceipt ? (
    <ReceiptDocument doc={current} />
  ) : (
    <InvoiceDocument doc={current} />
  );

  return (
    <>
    <div className="fixed inset-0 z-[95] flex flex-col bg-ink/50 backdrop-blur-sm">
      {/* Toolbar */}
      <div className="no-print flex items-center justify-between gap-3 border-b border-canvas/10 bg-ink px-5 py-4 text-canvas">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg tracking-tight">
            {doc.docType} · {doc.id}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.15em] ${
              paid ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-200"
            }`}
          >
            {paid ? "Paid" : current.status}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Action onClick={() => window.print()} icon={<Download size={15} />} label="Download PDF" />
          <Action href={mailHref} icon={<Mail size={15} />} label="Email" />
          <Action href={waHref} icon={<MessageCircle size={15} />} label="WhatsApp" />
          {current.docType === "Invoice" && (
            <Action
              onClick={() => setEditorOpen(true)}
              icon={<BadgeCheck size={15} />}
              label={paid ? "Regenerate Receipt" : "Generate Receipt"}
              solid={!paid}
            />
          )}
          {paid && (
            <Action
              onClick={() => setShowReceipt((s) => !s)}
              icon={<Receipt size={15} />}
              label={showReceipt ? "View Invoice" : "View Receipt"}
            />
          )}
          <button
            onClick={remove}
            aria-label="Delete document"
            title="Delete"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/40 text-red-300 transition-colors hover:bg-red-500 hover:text-canvas"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-canvas/25 text-canvas transition-colors hover:bg-canvas hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8" data-lenis-prevent>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[820px] rounded-xl bg-white shadow-2xl"
        >
          {DocBody}
        </motion.div>
      </div>
    </div>

    {/* Body-level portal used only when printing, so the document flows
        across A4 pages instead of being clipped by the modal's scroll box. */}
    {mounted &&
      createPortal(
        <div className="print-portal">{DocBody}</div>,
        document.body
      )}

    {/* Verify-payment step: edit the UPI transaction ID before generating. */}
    {editorOpen && (
      <ReceiptEditor
        invoice={current}
        onClose={() => setEditorOpen(false)}
        onGenerated={(updated) => {
          setCurrent(updated);
          setShowReceipt(true);
          setEditorOpen(false);
          onChanged?.();
        }}
      />
    )}
    </>
  );
}

function Action({
  onClick,
  href,
  icon,
  label,
  solid,
}: {
  onClick?: () => void;
  href?: string;
  icon: React.ReactNode;
  label: string;
  solid?: boolean;
}) {
  const cls = `inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 ${
    solid
      ? "bg-accent text-canvas hover:bg-canvas hover:text-ink"
      : "border border-canvas/25 text-canvas hover:bg-canvas hover:text-ink"
  }`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon}
        {label}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {icon}
      {label}
    </button>
  );
}
