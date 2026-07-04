"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook up your error reporting here if desired.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <p className="eyebrow">Error 500</p>
      <h1 className="mt-6 font-display text-7xl font-medium tracking-tight text-ink sm:text-8xl">
        Something <span className="italic">broke.</span>
      </h1>
      <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-stone">
        An unexpected error occurred on our end. Please try again — if it
        persists, reach us at studios.revera@gmail.com.
      </p>
      <div className="mt-10 flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-accent"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-3 rounded-full border border-ink/15 px-8 py-4 text-sm font-medium text-ink transition-all duration-500 ease-expo hover:bg-ink hover:text-canvas"
        >
          Back home
        </a>
      </div>
    </main>
  );
}
