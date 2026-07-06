import { getDb } from "./mongodb";
import {
  DocType,
  Invoice,
  ProjectRequest,
} from "@/lib/agency";

const pad = (n: number, len: number) => String(n).padStart(len, "0");
const year = () => new Date().getFullYear();

// Atomic per-type sequence via the `counters` collection.
async function nextSeq(name: string): Promise<number> {
  const db = await getDb();
  const res = await db
    .collection<{ _id: string; seq: number }>("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );
  return res?.seq ?? 1;
}

// Strip Mongo's _id from returned documents.
function clean<T>(doc: unknown): T {
  if (!doc) return doc as T;
  const { _id, ...rest } = doc as Record<string, unknown>;
  void _id;
  return rest as T;
}

// ── Requests ─────────────────────────────────────────────────
export async function createRequest(
  data: Omit<ProjectRequest, "id" | "createdAt" | "status" | "notes">
): Promise<ProjectRequest> {
  const db = await getDb();
  const seq = await nextSeq(`request-${year()}`);
  const record: ProjectRequest = {
    ...data,
    id: `REV-REQ-${year()}-${pad(seq, 4)}`,
    createdAt: new Date().toISOString(),
    status: "New",
    notes: [],
  };
  await db.collection("requests").insertOne({ _id: record.id, ...record } as never);
  return record;
}

export async function listRequests(): Promise<ProjectRequest[]> {
  const db = await getDb();
  const docs = await db
    .collection("requests")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((d) => clean<ProjectRequest>(d));
}

export async function getRequest(id: string): Promise<ProjectRequest | null> {
  const db = await getDb();
  const doc = await db.collection("requests").findOne({ _id: id as never });
  return doc ? clean<ProjectRequest>(doc) : null;
}

export async function updateRequest(
  id: string,
  patch: Partial<ProjectRequest>
): Promise<ProjectRequest | null> {
  const db = await getDb();
  const { id: _omit, ...rest } = patch;
  void _omit;
  await db.collection("requests").updateOne({ _id: id as never }, { $set: rest });
  return getRequest(id);
}

// ── Invoices / Quotations ────────────────────────────────────
export async function createDocument(
  docType: Exclude<DocType, "Receipt">,
  payload: Omit<Invoice, "id" | "createdAt" | "docType" | "status">
): Promise<Invoice> {
  const db = await getDb();
  let id: string;
  if (docType === "Quotation") {
    const seq = await nextSeq(`quotation-${year()}`);
    id = `REV-QUO-${year()}-${pad(seq, 3)}`;
  } else {
    const seq = await nextSeq(`invoice-${year()}`);
    id = `REV-${year()}-${pad(seq, 3)}`;
  }
  const record: Invoice = {
    ...payload,
    id,
    docType,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  await db.collection("invoices").insertOne({ _id: record.id, ...record } as never);
  return record;
}

export async function listInvoices(): Promise<Invoice[]> {
  const db = await getDb();
  const docs = await db
    .collection("invoices")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((d) => clean<Invoice>(d));
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const db = await getDb();
  const doc = await db.collection("invoices").findOne({ _id: id as never });
  return doc ? clean<Invoice>(doc) : null;
}

export async function updateInvoice(
  id: string,
  patch: Partial<Invoice>
): Promise<Invoice | null> {
  const db = await getDb();
  const { id: _omit, ...rest } = patch;
  void _omit;
  await db.collection("invoices").updateOne({ _id: id as never }, { $set: rest });
  return getInvoice(id);
}

// Mark an invoice paid, mint a receipt id, and flip the request to Paid.
export async function markPaid(
  id: string,
  details?: { upiTxnId?: string; paymentMethod?: string; paidAt?: string }
): Promise<Invoice | null> {
  const db = await getDb();
  const invoice = await getInvoice(id);
  if (!invoice) return null;

  // Preserve an existing receipt id if the invoice was already paid.
  let receiptId = invoice.receiptId;
  if (!receiptId) {
    const seq = await nextSeq(`receipt-${year()}`);
    receiptId = `REV-RCP-${year()}-${pad(seq, 3)}`;
  }

  await db.collection("invoices").updateOne(
    { _id: id as never },
    {
      $set: {
        status: "Paid",
        paidAt: details?.paidAt || invoice.paidAt || new Date().toISOString(),
        receiptId,
        paymentMethod: details?.paymentMethod || invoice.paymentMethod || "UPI",
        upiTxnId: details?.upiTxnId ?? invoice.upiTxnId ?? "",
      },
    }
  );

  if (invoice.requestId) {
    await db
      .collection("requests")
      .updateOne({ _id: invoice.requestId as never }, { $set: { status: "Paid" } });
  }

  return getInvoice(id);
}
