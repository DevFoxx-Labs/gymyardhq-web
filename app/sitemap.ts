import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { legalRegistry } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const legal = legalRegistry.flatMap((entry) => [
    { url: `${site.url}/legal/${entry.slug}`, lastModified: entry.lastUpdated },
    ...(entry.hi ? [{ url: `${site.url}/legal/${entry.slug}/hi`, lastModified: entry.lastUpdated }] : []),
  ]);
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/legal` },
    { url: `${site.url}/contact` },
    ...legal,
  ];
}
