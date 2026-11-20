/**
 * A paragraph is a plain string. Strings may contain {{token}} placeholders
 * (see config/site.ts → legalTokens), resolved when the document is served.
 */
export type LegalBlock =
  | string
  | { list: string[] }
  | { note: string }
  | { steps: string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalLang = "en" | "hi";

export type LegalDoc = {
  title: string;
  summary: string;
  sections: LegalSection[];
};

export type LegalEntry = {
  slug: string;
  /** Bump on every material change (date-based, YYYY-MM-DD). */
  version: string;
  lastUpdated: string;
  en: LegalDoc;
  hi?: LegalDoc;
};
