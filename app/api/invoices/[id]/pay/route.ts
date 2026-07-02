import { NextResponse } from "next/server";
import { guard } from "@/lib/server/auth";
import { markPaid } from "@/lib/server/repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await params;
  const record = await markPaid(id);
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(record);
}
