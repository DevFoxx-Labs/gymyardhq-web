import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { featurePages } from "@/content/features";
import { legalRegistry } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const legal = legalRegistry.flatMap((entry) => {
    const en = `${site.url}/legal/${entry.slug}`;
    const hi = `${site.url}/legal/${entry.slug}/hi`;
    const alternates = entry.hi ? { languages: { "en-IN": en, "hi-IN": hi } } : undefined;
    return [
      { url: en, lastModified: entry.lastUpdated, alternates },
      ...(entry.hi ? [{ url: hi, lastModified: entry.lastUpdated, alternates }] : []),
    ];
  });
  const features = featurePages.map((f) => ({
    url: `${site.url}/features/${f.slug}`,
    lastModified: site.contentUpdated,
    priority: 0.8,
  }));
  return [
    { url: site.url, lastModified: site.contentUpdated, priority: 1 },
    ...features,
    { url: `${site.url}/contact`, lastModified: site.contentUpdated },
    { url: `${site.url}/legal`, lastModified: site.contentUpdated },
    ...legal,
  ];
}
