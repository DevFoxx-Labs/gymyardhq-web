import { getLegalEntry, legalRegistry, resolveLegalDoc } from "@/content/legal";

export function generateStaticParams() {
  return legalRegistry.map((entry) => ({ slug: entry.slug }));
}

/** One notice in every available language, with config values filled in. */
export async function GET(_request: Request, { params }: RouteContext<"/api/legal/[slug]">) {
  const { slug } = await params;
  const entry = getLegalEntry(slug);
  if (!entry) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }
  return Response.json(
    {
      slug: entry.slug,
      version: entry.version,
      lastUpdated: entry.lastUpdated,
      en: resolveLegalDoc(entry, "en"),
      hi: resolveLegalDoc(entry, "hi") ?? null,
    },
    { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=86400" } },
  );
}
