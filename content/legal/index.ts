import { legalTokens } from "@/config/site";
import { cookiePolicy } from "./cookie-policy";
import { dataDeletion } from "./data-deletion";
import { privacyPolicy } from "./privacy-policy";
import { terms } from "./terms";
import type { LegalBlock, LegalDoc, LegalEntry, LegalLang } from "./types";

export type { LegalBlock, LegalDoc, LegalEntry, LegalLang } from "./types";

/** One source for every notice — the website pages and /api/legal both read this. */
export const legalRegistry: readonly LegalEntry[] = [privacyPolicy, terms, dataDeletion, cookiePolicy];

export function getLegalEntry(slug: string): LegalEntry | undefined {
  return legalRegistry.find((entry) => entry.slug === slug);
}

/** e.g. "privacy-policy@2026-11-20;terms@2026-11-20;…" — for consent records. */
export const noticeVersions = legalRegistry.map((e) => `${e.slug}@${e.version}`).join(";");

function fill(text: string): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => legalTokens[key] ?? match);
}

function fillBlock(block: LegalBlock): LegalBlock {
  if (typeof block === "string") return fill(block);
  if ("list" in block) return { list: block.list.map(fill) };
  if ("steps" in block) return { steps: block.steps.map(fill) };
  return { note: fill(block.note) };
}

/** Returns the document in the requested language with config values filled in. */
export function resolveLegalDoc(entry: LegalEntry, lang: LegalLang): LegalDoc | undefined {
  const doc = lang === "hi" ? entry.hi : entry.en;
  if (!doc) return undefined;
  return {
    title: fill(doc.title),
    summary: fill(doc.summary),
    sections: doc.sections.map((s) => ({ ...s, heading: fill(s.heading), blocks: s.blocks.map(fillBlock) })),
  };
}
