import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalEntry, legalRegistry, resolveLegalDoc } from "@/content/legal";

export const ensureStatic = "navigation";

/** Only documents that have a Hindi version get a /hi page. */
export function generateStaticParams() {
  return legalRegistry.filter((entry) => entry.hi).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]/hi">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  if (!entry?.hi) return {};
  return {
    title: entry.hi.title,
    description: entry.hi.summary,
    alternates: {
      canonical: `/legal/${slug}/hi`,
      languages: { "en-IN": `/legal/${slug}`, "hi-IN": `/legal/${slug}/hi` },
    },
  };
}

export default async function LegalPageHindi({ params }: PageProps<"/legal/[slug]/hi">) {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  const doc = entry && resolveLegalDoc(entry, "hi");
  if (!entry || !doc) notFound();
  return <LegalDocument entry={entry} doc={doc} lang="hi" />;
}
