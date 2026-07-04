import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-7xl font-medium tracking-tight text-ink sm:text-8xl">
        Lost the <span className="italic">thread.</span>
      </h1>
      <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-stone">
        The page you're looking for doesn't exist or has moved. Let's get you
        back to something beautiful.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-canvas transition-all duration-500 ease-expo hover:bg-accent"
      >
        Back to Rêvera Studio
      </Link>
    </main>
  );
}
