import type { MetadataRoute } from "next";
import { absoluteUrl, pages } from "@/lib/site";

// Dynamic sitemap — driven by `pages` in lib/site.ts, so adding a
// route there (blog, case study, service page) updates the sitemap
// automatically with no changes here.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
