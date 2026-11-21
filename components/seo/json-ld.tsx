import { site } from "@/config/site";
import { absUrl } from "@/lib/seo";

/**
 * Renders schema.org JSON-LD. Serialised with `<`, `>` and `&` hex-escaped so
 * no value can close the script tag (security rule: JSON in <script> is
 * escaped). Data is static and server-rendered.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const APP_ID = `${site.url}/#app`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.company.brand,
    url: site.company.website,
    logo: absUrl("/icon.png"),
    ...(site.app.isLive ? { sameAs: [site.app.playStoreUrl] } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absUrl("/"),
    name: site.name,
    description: site.seoDescription,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": ORG_ID },
  };
}

/** The Android app itself — what Google should understand this site is about. */
export function appSchema() {
  return {
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: site.name,
    description: site.seoDescription,
    url: absUrl("/"),
    image: absUrl("/opengraph-image.jpg"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Gym management",
    operatingSystem: `Android ${site.app.minAndroid.replace("Android ", "")} or later`,
    softwareVersion: site.app.version,
    inLanguage: ["en", "hi"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    featureList: [
      "Member management with plans, packages and trainers",
      "Fee collection with UPI QR bills",
      "Numbered PDF receipts with tamper-check QR verification",
      "Fee-due and membership-expiry reminders",
      "SMS and WhatsApp message templates",
      "Revenue, expense and trainer payout reports",
      "Works offline; MPIN and fingerprint lock; encrypted backups",
      "English and Hindi",
    ],
    publisher: { "@id": ORG_ID },
    ...(site.app.isLive ? { downloadUrl: site.app.playStoreUrl, installUrl: site.app.playStoreUrl } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
