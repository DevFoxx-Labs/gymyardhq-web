import Link from "next/link";
import { isPlaceholder, site } from "@/config/site";
import { legalRegistry } from "@/content/legal";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="border-t border-line">
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
