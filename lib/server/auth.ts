import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const COOKIE_NAME = "revera_admin";
const secret = process.env.ADMIN_SECRET || "dev-only-secret";

/** Deterministic session token derived from the server secret. */
export function sessionToken(): string {
  return crypto
    .createHmac("sha256", secret)
    .update("revera-admin@v1")
    .digest("hex");
}

export function checkPassword(pw: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !pw) return false;
  // Constant-time comparison.
  const a = Buffer.from(pw);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const expected = sessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Returns a 401 response when the caller is not an authenticated admin. */
export async function guard(): Promise<NextResponse | null> {
  if (await isAuthed()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
