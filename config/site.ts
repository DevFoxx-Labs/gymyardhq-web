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

export type WhatsAppHours = {
  /** Minutes after midnight IST, e.g. 600 = 10:00. `end` is exclusive. */
  start: number;
  end: number;
  /** ISO weekdays the team replies on: 1 = Monday … 7 = Sunday. */
  days: number[];
};

function parseClock(value: string): number | null {
  const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

function parseDays(value: string): number[] | null {
  const days = new Set<number>();
  for (const part of value.split(",").map((p) => p.trim()).filter(Boolean)) {
    const range = /^([1-7])(?:-([1-7]))?$/.exec(part);
    if (!range) return null;
    const from = Number(range[1]);
    const to = Number(range[2] ?? range[1]);
    if (to < from) return null;
    for (let d = from; d <= to; d++) days.add(d);
  }
  return days.size ? [...days].sort((a, b) => a - b) : null;
}

/**
 * WhatsApp chat widget. Fails closed: shown only when WHATSAPP_WIDGET_LIVE is exactly "true".
 * When it is on, a missing/invalid number or malformed hours stop the build instead of
 * publishing a broken chat button. The number is public by design (it is a contact channel).
 */
function whatsApp() {
  const isLive = flag("WHATSAPP_WIDGET_LIVE");
  const rawNumber = process.env.WHATSAPP_NUMBER?.trim() ?? "";
  const digits = rawNumber.replace(/[\s()+-]/g, "");
  const validNumber = /^[1-9]\d{9,14}$/.test(digits);

  const rawHours = process.env.WHATSAPP_HOURS?.trim() ?? "";
  const rawDays = process.env.WHATSAPP_DAYS?.trim() || "1-7";
  let hours: WhatsAppHours | null = null;
  if (rawHours) {
    const [s, e] = rawHours.split("-");
    const start = s ? parseClock(s) : null;
    const end = e ? parseClock(e) : null;
    const days = parseDays(rawDays);
    if (start === null || end === null || end <= start || !days) {
      if (isLive) throw new Error('WHATSAPP_HOURS must look like "10:00-19:00" and WHATSAPP_DAYS like "1-6" or "1,2,3".');
    } else {
      hours = { start, end, days };
    }
  }

  if (isLive && !validNumber) {
    throw new Error("WHATSAPP_WIDGET_LIVE=true needs WHATSAPP_NUMBER with country code, digits only (e.g. 919876543210).");
  }

  return {
    isLive: isLive && validNumber,
    /** Digits only, with country code — the format wa.me expects. Empty when not configured. */
    number: validNumber ? digits : "",
    /** Business hours in IST; null = the widget makes no online/away claim. */
    hours,
  };
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

  whatsapp: whatsApp(),
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
