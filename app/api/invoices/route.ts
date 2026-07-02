import { NextResponse } from "next/server";
import { guard } from "@/lib/server/auth";
import { createDocument, listInvoices } from "@/lib/server/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json(await listInvoices());
}

export async function POST(req: Request) {
  const denied = await guard();
  if (denied) return denied;
  const { docType, payload } = await req.json().catch(() => ({}));
  if (docType !== "Invoice" && docType !== "Quotation") {
    return NextResponse.json({ error: "Invalid docType" }, { status: 400 });
  }
  const record = await createDocument(docType, payload);
  return NextResponse.json(record, { status: 201 });
}
