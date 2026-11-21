/**
 * Single source for every business / legal fact shown on the website and in
 * the legal notices. Values come from environment variables (server-only —
 * never prefix these with NEXT_PUBLIC_). Until the owner supplies the real
 * values, clearly marked "[... — to be confirmed]" placeholders are rendered
 * so nothing is invented. See docs/owner-todo.md.
 */

const PLACEHOLDER_PREFIX = "[";

function env(key: string, placeholder: string): string {
  const value = process.env[key]?.trim();
  return value ? value : placeholder;
}

/** Feature flags fail closed: on only when the variable is exactly "true". */
function flag(key: string): boolean {
  return process.env[key]?.trim() === "true";
}

export function isPlaceholder(value: string): boolean {
  return value.startsWith(PLACEHOLDER_PREFIX);
}

const packageId = "com.devfoxxlabs.gymyardhq";

/**
 * Public origin of the site. Fails closed: a production build/start without
 * SITE_URL would publish localhost canonicals, sitemap and OG URLs, so it
 * throws instead. Dev falls back to localhost.
 */
function siteUrl(): string {
  const value = process.env.SITE_URL?.trim().replace(/\/+$/, "");
  if (value) return value;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SITE_URL is not set. Set it to the public origin (e.g. https://gymyardhq.com) before building.");
  }
  return "http://localhost:3000";
}

export const site = {
  name: "GymYardHQ",
  tagline: "Run your gym like a pro",
  description:
    "GymYardHQ is an offline-first gym management app for gym owners in India — members, fees, UPI bills, PDF receipts with QR verification, reminders and reports. Your data stays on your phone.",
  /** <title> of the home page (≤ 60 chars) and the default SEO description (≤ 155 chars). */
  seoTitle: "GymYardHQ: Gym Management App for Gym Owners in India",
  seoDescription:
    "Free gym management app for India. Track members, collect fees with UPI bills, send PDF receipts and fee reminders. Works offline, in English and Hindi.",
  url: siteUrl(),
  /** Last meaningful change to the marketing pages (sitemap lastmod). */
  contentUpdated: "2026-11-21",
  copyrightYear: 2026,

  company: {
    brand: "DevFoxx Labs",
    legalName: env("COMPANY_LEGAL_NAME", "[Registered legal name of DevFoxx Labs — to be confirmed]"),
    address: env("COMPANY_ADDRESS", "[Registered address, India — to be confirmed]"),
    website: "https://devfoxxlabs.com",
  },

  supportEmail: env("SUPPORT_EMAIL", "[support email — to be confirmed]"),

  grievance: {
    name: env("GRIEVANCE_OFFICER_NAME", "[Grievance Officer name — to be confirmed]"),
    email: env("GRIEVANCE_OFFICER_EMAIL", "[Grievance Officer email — to be confirmed]"),
    /** Proposed defaults — confirm with your lawyer (docs/owner-todo.md). */
    acknowledgeWithin: env("GRIEVANCE_ACK_WITHIN", "48 hours"),
    resolveWithin: env("GRIEVANCE_RESOLVE_WITHIN", "30 days"),
  },

  legal: {
    jurisdictionCity: env("JURISDICTION_CITY", "[City, State — to be confirmed]"),
    websiteHost: env("WEBSITE_HOSTING_PROVIDER", "[Website hosting provider — to be confirmed]"),
    emailProvider: env("EMAIL_PROVIDER", "[Email service provider — to be confirmed]"),
    /** Proposed defaults — confirm with your lawyer (docs/owner-todo.md). */
    supportRetention: env("RETENTION_SUPPORT_EMAILS", "3 years after the request is closed"),
    logRetention: env("RETENTION_SERVER_LOGS", "30 days"),
  },

  app: {
    packageId,
    version: "1.0.0",
    playStoreUrl: `https://play.google.com/store/apps/details?id=${packageId}`,
    /** Shows "Get it on Google Play" only once the listing is public. */
    isLive: flag("PLAY_STORE_LIVE"),
    minAndroid: "Android 7.0",
    languages: ["English", "हिन्दी"],
  },
} as const;

/** Tokens usable inside legal texts as {{token}}; resolved at render time. */
export const legalTokens: Record<string, string> = {
  appName: site.name,
  companyBrand: site.company.brand,
  companyLegalName: site.company.legalName,
  companyAddress: site.company.address,
  companyWebsite: site.company.website,
  siteUrl: site.url,
  supportEmail: site.supportEmail,
  grievanceName: site.grievance.name,
  grievanceEmail: site.grievance.email,
  grievanceAck: site.grievance.acknowledgeWithin,
  grievanceResolve: site.grievance.resolveWithin,
  jurisdictionCity: site.legal.jurisdictionCity,
  websiteHost: site.legal.websiteHost,
  emailProvider: site.legal.emailProvider,
  supportRetention: site.legal.supportRetention,
  logRetention: site.legal.logRetention,
  packageId: site.app.packageId,
};
