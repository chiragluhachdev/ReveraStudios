"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { checkSession, login } from "@/lib/api";

export default function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    checkSession().then((ok) => {
      setAuthed(ok);
      setReady(true);
    });
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const ok = await login(value);
    setBusy(false);
    if (ok) setAuthed(true);
    else setError(true);
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <span className="text-sm text-stone">Loading…</span>
      </div>
    );
  }

  if (authed) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white/70 p-8 backdrop-blur-xl"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-canvas">
          <Lock size={20} />
        </span>
        <h1 className="mt-6 font-display text-3xl tracking-tight text-ink">
          Rêvera<span className="text-accent">.</span> Admin
        </h1>
        <p className="mt-2 text-sm text-stone">
          Enter your access key to continue.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Access key"
          className="mt-6 w-full border-b border-ink/15 bg-transparent py-3 text-lg text-ink outline-none transition-colors focus:border-ink"
        />
        {error && (
          <p className="mt-3 text-sm text-accent">Incorrect access key.</p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-canvas transition-colors duration-500 ease-expo hover:bg-accent disabled:opacity-60"
        >
          {busy ? "Checking…" : "Enter Dashboard"}
        </button>
      </form>
    </div>
  );
}
