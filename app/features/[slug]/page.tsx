import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import feesScene from "@/assets/scenes/fees.webp";
import membersScene from "@/assets/scenes/members.webp";
import receiptsScene from "@/assets/scenes/receipts.webp";
import remindersScene from "@/assets/scenes/reminders.webp";
import { Icon } from "@/components/icon";
import { PlayStoreButton } from "@/components/play-store-button";
import { BlendedScene } from "@/components/scene/blended-scene";
import { appSchema, breadcrumbSchema, graph, JsonLd } from "@/components/seo/json-ld";
import { featurePages, getFeaturePage } from "@/content/features";
import { pageMeta } from "@/lib/seo";

export const ensureStatic = "navigation";

/**
 * The whole page depends on the slug (URL data), so it cannot be part of a
 * shared App Shell. Every slug is still fully prerendered at build
 * (generateStaticParams + ensureStatic) and unknown slugs keep a real 404 —
 * wrapping it in <Suspense> instead would risk 200 "soft 404s".
 */
export const instant = false;

const scenes = { fees: feesScene, members: membersScene, receipts: receiptsScene, reminders: remindersScene };

export function generateStaticParams() {
  return featurePages.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = getFeaturePage(slug);
  if (!f) return {};
  return pageMeta({ title: f.title, description: f.description, path: `/features/${f.slug}` });
}

export default async function FeaturePageView({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const f = getFeaturePage(slug);
  if (!f) notFound();
  const others = featurePages.filter((o) => o.slug !== f.slug);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Features", path: "/#features" },
            { name: f.eyebrow, path: `/features/${f.slug}` },
          ]),
          appSchema(),
        )}
      />

      <BlendedScene eager image={scenes[f.scene]} alt={f.sceneAlt} focus="65% 45%" minHeight="clamp(520px, 46vw, 720px)">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">{f.eyebrow}</p>
        <h1 className="font-wide mt-3 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">{f.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-white/70">{f.intro}</p>
        <PlayStoreButton size="lg" className="mt-8" />
      </BlendedScene>

      <div className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {f.sections.map((s) => (
            <section key={s.heading} className="reveal rounded-3xl border border-line bg-surface p-7">
              <h2 className="text-xl font-bold">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-white/70">{s.body}</p>
              {s.points && (
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Icon icon={CheckmarkBadge01Icon} size={16} className="mt-0.5 shrink-0 text-lime" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section aria-labelledby="feature-faq" className="mt-16 max-w-3xl">
          <h2 id="feature-faq" className="font-wide text-3xl font-black tracking-tight">Common questions</h2>
          <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {f.faqs.map((q) => (
              <div key={q.q} className="py-5">
                <dt className="font-semibold">{q.q}</dt>
                <dd className="mt-2 leading-relaxed text-white/70">{q.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="More features" className="mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">More GymYardHQ features</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/features/${o.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-5 py-4 transition hover:border-lime/50"
                >
                  <span className="font-semibold">{o.eyebrow}</span>
                  <Icon icon={ArrowRight01Icon} size={18} className="text-muted transition group-hover:translate-x-1 group-hover:text-lime" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
