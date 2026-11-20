import { legalRegistry, noticeVersions } from "@/content/legal";

/** Index of all notices — lets the app show the same versioned texts as the website. */
export function GET() {
  return Response.json(
    {
      noticeVersions,
      documents: legalRegistry.map((entry) => ({
        slug: entry.slug,
        title: entry.en.title,
        version: entry.version,
        lastUpdated: entry.lastUpdated,
        languages: entry.hi ? ["en", "hi"] : ["en"],
        url: `/legal/${entry.slug}`,
        api: `/api/legal/${entry.slug}`,
      })),
    },
    { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=86400" } },
  );
}
