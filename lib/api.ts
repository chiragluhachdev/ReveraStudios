"use client";

import { DocType, Invoice, ProjectRequest } from "./agency";

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json() as Promise<T>;
}

// ── Onboarding (public) ──────────────────────────────────────
export function createRequest(
  data: Omit<ProjectRequest, "id" | "createdAt" | "status" | "notes">
): Promise<ProjectRequest> {
  return fetch("/api/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => json<ProjectRequest>(r));
}

// ── Admin: requests ──────────────────────────────────────────
export function listRequests(): Promise<ProjectRequest[]> {
  return fetch("/api/requests", { cache: "no-store" }).then((r) =>
    json<ProjectRequest[]>(r)
  );
}

export function updateRequest(
  id: string,
  patch: Partial<ProjectRequest>
): Promise<ProjectRequest> {
  return fetch(`/api/requests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  }).then((r) => json<ProjectRequest>(r));
}

// ── Admin: invoices / quotations ─────────────────────────────
export function listInvoices(): Promise<Invoice[]> {
  return fetch("/api/invoices", { cache: "no-store" }).then((r) =>
    json<Invoice[]>(r)
  );
}

export function getInvoice(id: string): Promise<Invoice> {
  return fetch(`/api/invoices/${id}`, { cache: "no-store" }).then((r) =>
    json<Invoice>(r)
  );
}

export function createDocument(
  docType: Exclude<DocType, "Receipt">,
  payload: Omit<Invoice, "id" | "createdAt" | "docType" | "status">
): Promise<Invoice> {
  return fetch("/api/invoices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docType, payload }),
  }).then((r) => json<Invoice>(r));
}

export function markPaid(id: string): Promise<Invoice> {
  return fetch(`/api/invoices/${id}/pay`, { method: "POST" }).then((r) =>
    json<Invoice>(r)
  );
}

// ── Admin: auth ──────────────────────────────────────────────
export function login(password: string): Promise<boolean> {
  return fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  }).then((r) => r.ok);
}

export function checkSession(): Promise<boolean> {
  return fetch("/api/admin/session", { cache: "no-store" })
    .then((r) => json<{ authed: boolean }>(r))
    .then((d) => d.authed)
    .catch(() => false);
}

export function logout(): Promise<void> {
  return fetch("/api/admin/logout", { method: "POST" }).then(() => undefined);
}
