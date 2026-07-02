"use client";

import { useCallback, useEffect, useState } from "react";
import { Invoice, ProjectRequest } from "@/lib/agency";
import { listInvoices, listRequests } from "@/lib/api";

/**
 * Loads admin data from the API and exposes a `refresh` to re-pull after
 * a mutation. Backed by MongoDB via /api routes.
 */
export function useAgencyData() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [r, i] = await Promise.all([listRequests(), listInvoices()]);
      setRequests(r);
      setInvoices(i);
    } catch {
      /* keep prior data on transient failure */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { requests, invoices, loading, refresh };
}
