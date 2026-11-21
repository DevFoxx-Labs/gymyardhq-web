import Link from "next/link";
import { isPlaceholder, site } from "@/config/site";
import { featurePages } from "@/content/features";
import { legalRegistry } from "@/content/legal";
import pushupA from "@/assets/cutouts/pushup-a.webp";
import pushupB from "@/assets/cutouts/pushup-b.webp";
import { BrandMark } from "./brand-mark";
import { FrameLoop } from "./motion/frame-loop";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <BrandMark />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Offline-first gym management for gym owners in India. Members, fees, receipts and
            reminders — your data stays on your phone.
          </p>
          <p className="text-xs text-muted">
            A product of{" "}
            <a
              href={site.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline-offset-4 hover:underline"
            >
              {site.company.brand}
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Features</h2>
          <ul className="space-y-2.5 text-sm">
            {featurePages.map((f) => (
              <li key={f.slug}>
                <Link href={`/features/${f.slug}`} className="text-white/80 hover:text-lime">
                  {f.eyebrow}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Legal</h2>
          <ul className="space-y-2.5 text-sm">
            {legalRegistry.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/legal/${entry.slug}`} className="text-white/80 hover:text-lime">
                  {entry.en.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/legal/privacy-policy/hi" className="font-deva text-white/80 hover:text-lime" lang="hi">
                गोपनीयता नीति (हिन्दी)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Support</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/contact" className="text-white/80 hover:text-lime">
                Contact &amp; Grievance Officer
              </Link>
            </li>
            <li>
              <Link href="/legal/data-deletion" className="text-white/80 hover:text-lime">
                Delete your data
              </Link>
            </li>
            <li className="break-all text-muted">
              {isPlaceholder(site.supportEmail) ? (
                site.supportEmail
              ) : (
                <a href={`mailto:${site.supportEmail}`} className="hover:text-lime">
                  {site.supportEmail}
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-line">
        {/* Mascot doing push-ups on the footer line */}
        <div aria-hidden className="pointer-events-none absolute bottom-full right-5 mb-px w-28 sm:right-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] sm:w-36">
          <FrameLoop a={pushupA} b={pushupB} anchor="bottom-left" duration="1.3s" sizes="144px" />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.company.brand}. All rights reserved.
          </p>
          <p>This website uses no cookies, analytics or trackers.</p>
        </div>
      </div>
    </footer>
  );
}
