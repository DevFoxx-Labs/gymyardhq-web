import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalEntry, legalRegistry, resolveLegalDoc } from "@/content/legal";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return legalRegistry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  if (!entry) return {};
  return {
    title: entry.en.title,
    description: entry.en.summary,
    alternates: {
      canonical: `/legal/${slug}`,
      languages: entry.hi ? { "en-IN": `/legal/${slug}`, "hi-IN": `/legal/${slug}/hi` } : undefined,
    },
  };
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  const doc = entry && resolveLegalDoc(entry, "en");
  if (!entry || !doc) notFound();
  return <LegalDocument entry={entry} doc={doc} lang="en" />;
}
