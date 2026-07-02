import { NextResponse } from "next/server";
import { guard } from "@/lib/server/auth";
import { createRequest, listRequests } from "@/lib/server/repo";
import type { ProjectRequest } from "@/lib/agency";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Admin: list all requests.
export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json(await listRequests());
}

// Public: create a new onboarding request.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<ProjectRequest> | null;
  if (!body || !body.fullName || !body.email) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const record = await createRequest({
    fullName: String(body.fullName),
    email: String(body.email),
    phone: String(body.phone ?? ""),
    businessName: String(body.businessName ?? ""),
    organization: body.organization ? String(body.organization) : undefined,
    website: body.website ? String(body.website) : undefined,
    industry: String(body.industry ?? ""),
    services: Array.isArray(body.services) ? body.services : [],
    existingAssets: Array.isArray(body.existingAssets) ? body.existingAssets : [],
    brief: String(body.brief ?? ""),
    planId: (body.planId ?? "custom") as ProjectRequest["planId"],
    timeline: String(body.timeline ?? ""),
    files: Array.isArray(body.files) ? body.files : [],
  });
  return NextResponse.json(record, { status: 201 });
}
