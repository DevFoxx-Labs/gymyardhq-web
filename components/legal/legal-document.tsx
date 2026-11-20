import Image from "next/image";
import Link from "next/link";
import legalScene from "@/assets/scenes/legal.webp";
import type { ReactNode } from "react";
import { ArrowLeft01Icon, LegalDocument01Icon } from "@hugeicons/core-free-icons";
import type { LegalBlock, LegalDoc, LegalEntry, LegalLang } from "@/content/legal";
import { Icon } from "../icon";

const PLACEHOLDER = /(\[[^\]]+— to be confirmed\])/;
const LINKABLE = /([\w.+-]+@[\w-]+\.[\w.-]+|https?:\/\/[^\s,)]+)/;

/** Renders plain text with emails/URLs as links and placeholders highlighted — no raw HTML. */
function RichText({ text }: { text: string }) {
  const parts = text.split(new RegExp(`${PLACEHOLDER.source}|${LINKABLE.source}`, "g")).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (PLACEHOLDER.test(part)) {
          return (
            <mark key={i} className="rounded bg-due/15 px-1 text-due">
              {part}
            </mark>
          );
        }
        if (LINKABLE.test(part)) {
          const isEmail = !part.startsWith("http");
          const clean = part.replace(/[.;।]+$/, "");
          const href = isEmail ? `mailto:${clean}` : clean;
          return (
            <a
              key={i}
              href={href}
              className="text-lime underline-offset-4 hover:underline"
              {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p>
        <RichText text={block} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2.5">
        {block.list.map((item, i) => (
          <li key={i} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-lime">
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if ("steps" in block) {
    return (
      <ol className="space-y-3">
        {block.steps.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-bold text-ink">
              {i + 1}
            </span>
            <span>
              <RichText text={item} />
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <p className="rounded-2xl border border-lime/30 bg-lime/5 p-4">
      <RichText text={block.note} />
    </p>
  );
}

type Props = { entry: LegalEntry; doc: LegalDoc; lang: LegalLang };

const labels = {
  en: { back: "All legal documents", version: "Version", updated: "Last updated", contents: "On this page", other: "हिन्दी में पढ़ें" },
  hi: { back: "सभी कानूनी दस्तावेज़", version: "संस्करण", updated: "अंतिम अपडेट", contents: "इस पेज पर", other: "Read in English" },
};

export function LegalDocument({ entry, doc, lang }: Props) {
  const t = labels[lang];
  const otherHref = lang === "en" ? (entry.hi ? `/legal/${entry.slug}/hi` : null) : `/legal/${entry.slug}`;

  return (
    <div lang={lang} className={lang === "hi" ? "font-deva" : undefined}>
      <section className="relative isolate overflow-hidden">
        {/* Scene dissolves into the page: right-anchored, masked on the left/top/bottom */}
        <div aria-hidden className="scene-fade-l absolute inset-y-0 right-0 -z-10 hidden w-[72%] md:block">
          <Image src={legalScene} alt="" fill sizes="72vw" placeholder="blur" className="object-cover object-[80%_45%]" />
        </div>
        <div aria-hidden className="scene-fade-b absolute inset-x-0 top-0 -z-10 aspect-[1913/822] w-full opacity-60 md:hidden">
          <Image src={legalScene} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[85%_50%]" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-ink md:hidden" />
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-10 sm:pt-14 md:flex md:min-h-[clamp(380px,30vw,500px)] md:flex-col md:justify-center">
          <div className="md:max-w-[58%]">
            <Link href="/legal" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white">
              <Icon icon={ArrowLeft01Icon} size={16} /> {t.back}
            </Link>
            <div className="mt-6 flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime text-ink sm:flex">
                <Icon icon={LegalDocument01Icon} size={24} />
              </span>
              <div className="min-w-0">
                <h1 className={`${lang === "hi" ? "font-deva font-bold" : "font-wide font-extrabold"} text-3xl tracking-tight sm:text-5xl`}>
                  {doc.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">{doc.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-line-strong px-3 py-1 text-muted">
                    {t.version} {entry.version}
                  </span>
                  <span className="rounded-full border border-line-strong px-3 py-1 text-muted">
                    {t.updated}: <time dateTime={entry.lastUpdated}>{entry.lastUpdated}</time>
                  </span>
                  {otherHref && (
                    <Link
                      href={otherHref}
                      lang={lang === "en" ? "hi" : "en"}
                      className={`rounded-full bg-surface px-3 py-1 text-lime hover:bg-card ${lang === "en" ? "font-deva" : "font-sans"}`}
                    >
                      {t.other}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label={t.contents} className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{t.contents}</p>
            <ul className="space-y-1.5 border-l border-line text-sm">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-0.5 pl-4 text-muted hover:border-lime hover:text-white">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="legal min-w-0 max-w-3xl space-y-12 text-[15px] leading-7 text-white/80">
          {doc.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="mb-4 text-xl font-bold tracking-tight text-white">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
