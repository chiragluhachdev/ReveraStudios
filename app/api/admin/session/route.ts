import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ authed: await isAuthed() });
}
