import { NextResponse } from "next/server";
import { guard } from "@/lib/server/auth";
import { getInvoice, updateInvoice } from "@/lib/server/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  const record = await getInvoice(id);
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  const patch = await req.json().catch(() => ({}));
  const record = await updateInvoice(id, patch);
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}
