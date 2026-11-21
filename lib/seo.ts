import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetaInput = {
  title?: string;
  description: string;
  /** Path of this page, e.g. "/legal/terms". Used for canonical + og:url. */
  path: string;
  locale?: "en_IN" | "hi_IN";
  /** Language versions of this page: { "en-IN": "/x", "hi-IN": "/x/hi" }. */
  languages?: Record<string, string>;
  /** Fallback version for hreflang x-default (defaults to the en-IN path). */
  xDefault?: string;
};

/**
 * One place that builds per-page metadata, so every page gets its own
 * canonical, og:url, og:title/description and hreflang set (incl. x-default).
 * The OG image comes from app/opengraph-image.jpg (file convention).
 */
export function pageMeta({ title, description, path, locale = "en_IN", languages, xDefault }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.seoTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
      ...(languages
        ? { languages: { ...languages, "x-default": xDefault ?? languages["en-IN"] ?? path } }
        : {}),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale,
      alternateLocale: locale === "en_IN" ? ["hi_IN"] : ["en_IN"],
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Absolute URL for structured data. */
export function absUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}
