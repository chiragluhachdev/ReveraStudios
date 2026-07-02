# Rêvera Studio

**Where Ideas Become Experiences.**

A premium, editorial marketing site for a creative technology studio — built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Sections

Hero · Showreel · Featured Projects · Services · Process · Why Rêvera · Client Logos · Testimonials · Stats · Team · Instagram · Contact · Footer.

## Editing content

All copy, projects, services, team and imagery live in **`lib/data.ts`**. Change it there — every section reads from it.

## Media

- **Hero video** — drop a muted loop at `public/videos/hero.mp4`. Until then the poster image is shown. The `<VideoEmbed>` component (used by the Showreel lightbox) also supports **YouTube** and **Vimeo** — set `video: { type: "youtube" | "vimeo" | "mp4", src }` per item in `lib/data.ts`.
- **Images** — currently Unsplash placeholders. Swap the URLs in `lib/data.ts` (allowed remote hosts are configured in `next.config.mjs`) or move to local files in `/public`.

## Design system

- Colours, fonts and motion easings live in `tailwind.config.ts`.
- Fonts: **Playfair Display** (display) + **Inter** (body) via `next/font`.
- Reusable motion primitives: `components/ui/Reveal.tsx` and `components/ui/AnimatedHeading.tsx`. All animation respects `prefers-reduced-motion`.

## Agency workflow (onboarding · admin · invoicing)

The pricing plan CTAs open a premium **multi-step Project Onboarding** flow (not a checkout). On submit it mints a Project Request ID (`REV-REQ-2026-0001`) and shows the "we'll contact you within 24 hours" confirmation — no payment is taken.

- **Admin dashboard:** `/admin` (server-auth gated). Sections: Project Requests, Clients, Quotations, Invoices, Payments, Completed Projects.
- **Flow:** open a request → edit services / pricing / timeline / status, add internal notes → **Generate Invoice/Quotation** (editable service breakdown auto-populated per plan) → view the document → **Download PDF** (`window.print()` → A4), **Email** (`mailto:`), **WhatsApp** (`wa.me`) → **Mark as Paid** mints a Receipt (`REV-RCP-2026-001`) and flips the project to Paid.
- **Documents:** one reusable template (`components/documents/InvoiceDocument.tsx`) renders Invoice / Quotation / Receipt — minimal, editorial, A4, with a dynamic UPI **Scan & Pay** QR. No GST/tax fields, no signature block, per Rêvera's setup.

### Backend & data

- **MongoDB** (Atlas). Collections: `requests`, `invoices`, `counters` (atomic per-year ID sequences). Server access is in `lib/server/` (`mongodb.ts`, `repo.ts`); the browser only talks to `/api/*` route handlers via `lib/api.ts`. Shared types/helpers live in `lib/agency.ts` (no I/O).
- **Auth:** `POST /api/admin/login` verifies `ADMIN_PASSWORD` and sets an httpOnly, HMAC-signed session cookie (`lib/server/auth.ts`). Every admin API route calls `guard()`; the onboarding `POST /api/requests` is the only public write.
- **Env (`.env.local`, gitignored):** `MONGODB_URI`, `MONGODB_DB`, `ADMIN_PASSWORD`, `ADMIN_SECRET`. See `.env.example`. The default admin password is `revera-admin` — change it.

## Notes on performance & a11y

- Fully static (SSG), code-split, `next/image` with AVIF/WebP.
- Semantic landmarks, keyboard-operable menu/lightbox, focus-visible defaults, reduced-motion support.
- The contact form is front-end only — wire `onSubmit` in `components/Contact.tsx` to your provider (Resend, Formspree, an API route, etc.).
# ReveraStudios
