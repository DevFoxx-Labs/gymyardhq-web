import { site } from "@/config/site";
import { featurePages } from "@/content/features";
import { legalRegistry } from "@/content/legal";

/** Plain-text site summary for AI assistants (llms.txt convention). Static. */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.seoDescription}`,
    "",
    "GymYardHQ is an Android app for gym owners and staff in India. It stores data on the phone (offline-first), has no ads or trackers, costs nothing and works in English and Hindi. Members pay the gym directly by UPI; the app does not process payments.",
    "",
    "## Features",
    ...featurePages.map((f) => `- [${f.eyebrow}](${site.url}/features/${f.slug}): ${f.description}`),
    "",
    "## Legal and support",
    ...legalRegistry.map((e) => `- [${e.en.title}](${site.url}/legal/${e.slug}): ${e.en.summary}`),
    `- [Contact & Grievance Officer](${site.url}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
