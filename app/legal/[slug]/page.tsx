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

export function generateStaticParams() {
  return legalRegistry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  if (!entry) return {};
  return pageMeta({
    title: entry.en.title,
    description: entry.en.summary,
    path: `/legal/${slug}`,
    languages: entry.hi ? { "en-IN": `/legal/${slug}`, "hi-IN": `/legal/${slug}/hi` } : undefined,
  });
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  const doc = entry && resolveLegalDoc(entry, "en");
  if (!entry || !doc) notFound();
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Legal", path: "/legal" },
            { name: entry.en.title, path: `/legal/${slug}` },
          ]),
        )}
      />
      <LegalDocument entry={entry} doc={doc} lang="en" />
    </>
  );
}
