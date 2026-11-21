import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight01Icon, CustomerSupportIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { legalRegistry } from "@/content/legal";
import { breadcrumbSchema, graph, JsonLd } from "@/components/seo/json-ld";
import { pageMeta } from "@/lib/seo";

export const ensureStatic = "navigation";

export const metadata: Metadata = pageMeta({
  title: "Legal & Privacy",
  description: "Privacy Policy, Terms of Service, data deletion steps and Cookie Policy for the GymYardHQ gym management app and website.",
  path: "/legal",
});

export default function LegalIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Legal", path: "/legal" }]))} />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Legal &amp; Privacy</p>
      <h1 className="font-wide mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Plain-language policies</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Every document is versioned and dated. The same text is available to the app at{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-white">/api/legal</code>.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {legalRegistry.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/legal/${entry.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition hover:border-lime/50"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-bold">{entry.en.title}</span>
                <Icon icon={ArrowRight01Icon} className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-lime" />
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{entry.en.summary}</span>
              <span className="mt-4 text-xs text-muted">
                v{entry.version}
                {entry.hi ? " · English, हिन्दी" : " · English"}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            className="group flex h-full flex-col rounded-3xl border border-lime/30 bg-lime/5 p-6 transition hover:border-lime"
          >
            <span className="flex items-center gap-3 text-lg font-bold">
              <Icon icon={CustomerSupportIcon} className="text-lime" /> Contact &amp; Grievance Officer
            </span>
            <span className="mt-2 text-sm leading-relaxed text-muted">
              Questions, privacy requests or complaints — free of charge, with fixed response times.
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
