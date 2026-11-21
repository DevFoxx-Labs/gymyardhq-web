import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/legal-document";
import { breadcrumbSchema, graph, JsonLd } from "@/components/seo/json-ld";
import { getLegalEntry, legalRegistry, resolveLegalDoc } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const ensureStatic = "navigation";

/**
 * The whole page depends on the slug (URL data), so it cannot be part of a
 * shared App Shell. Every slug is still fully prerendered at build
 * (generateStaticParams + ensureStatic) and unknown slugs keep a real 404 —
 * wrapping it in <Suspense> instead would risk 200 "soft 404s".
 */
export const instant = false;

/** Only documents that have a Hindi version get a /hi page. */
export function generateStaticParams() {
  return legalRegistry.filter((entry) => entry.hi).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]/hi">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  if (!entry?.hi) return {};
  return pageMeta({
    title: entry.hi.title,
    description: entry.hi.summary,
    path: `/legal/${slug}/hi`,
    locale: "hi_IN",
    languages: { "en-IN": `/legal/${slug}`, "hi-IN": `/legal/${slug}/hi` },
    xDefault: `/legal/${slug}`,
  });
}

export default async function LegalPageHindi({ params }: PageProps<"/legal/[slug]/hi">) {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  const doc = entry && resolveLegalDoc(entry, "hi");
  if (!entry || !doc) notFound();
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "होम", path: "/" },
            { name: "कानूनी", path: "/legal" },
            { name: entry.hi?.title ?? entry.en.title, path: `/legal/${slug}/hi` },
          ]),
        )}
      />
      <LegalDocument entry={entry} doc={doc} lang="hi" />
    </>
  );
}
