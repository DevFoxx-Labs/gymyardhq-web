import type { Metadata } from "next";
import Link from "next/link";
import {
  CustomerSupportIcon,
  Delete02Icon,
  Mail01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import supportScene from "@/assets/scenes/support.webp";
import { Icon } from "@/components/icon";
import { BlendedScene } from "@/components/scene/blended-scene";
import { isPlaceholder, site } from "@/config/site";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "Contact & Grievance Officer",
  description: "Get help with GymYardHQ, make a privacy request or raise a grievance under India's DPDP Act.",
  alternates: { canonical: "/contact" },
};

function Email({ value, subject }: { value: string; subject?: string }) {
  if (isPlaceholder(value)) {
    return <mark className="rounded bg-due/15 px-1 text-due">{value}</mark>;
  }
  const href = `mailto:${value}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a href={href} className="break-all text-lime underline-offset-4 hover:underline">
      {value}
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <BlendedScene image={supportScene} focus="70% 40%" minHeight="clamp(460px, 40vw, 640px)">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">Support</p>
        <h1 className="font-wide mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">We&apos;re here to help</h1>
        <p className="mt-4 text-lg leading-relaxed text-white/70">
          Most answers are in the app&apos;s built-in Help Center. For anything else, email us — there&apos;s no
          form and nothing is tracked on this page.
        </p>
      </BlendedScene>

    <div className="mx-auto max-w-6xl px-5 pb-14 sm:pb-20">
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-line bg-surface p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-card text-lime">
            <Icon icon={CustomerSupportIcon} size={22} />
          </span>
          <h2 className="mt-5 text-xl font-bold">App support</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Questions about features, backups, printing or reminders. Please never send your MPIN, backup
            password or database connection string.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm">
            <Icon icon={Mail01Icon} size={18} className="text-muted" />
            <Email value={site.supportEmail} subject="GymYardHQ support" />
          </p>
        </section>

        <section className="rounded-3xl border border-lime/30 bg-lime/5 p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-ink">
            <Icon icon={Shield01Icon} size={22} />
          </span>
          <h2 className="mt-5 text-xl font-bold">Grievance Officer (DPDP Act)</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted">Name:</dt>
              <dd>{isPlaceholder(site.grievance.name) ? <mark className="rounded bg-due/15 px-1 text-due">{site.grievance.name}</mark> : site.grievance.name}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted">Email:</dt>
              <dd><Email value={site.grievance.email} subject="Privacy request / grievance" /></dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-muted">Address:</dt>
              <dd>{isPlaceholder(site.company.address) ? <mark className="rounded bg-due/15 px-1 text-due">{site.company.address}</mark> : site.company.address}</dd>
            </div>
          </dl>
          <ul className="mt-5 space-y-1.5 text-sm text-white/80">
            <li>Acknowledgement within {site.grievance.acknowledgeWithin}</li>
            <li>Resolution within {site.grievance.resolveWithin}</li>
            <li>Free of charge; we may ask you to confirm your identity</li>
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted">
            Not satisfied after this process? You may complain to the Data Protection Board of India (DPDP Act,
            section 13).
          </p>
        </section>
      </div>

      <section className="mt-5 rounded-3xl border border-line bg-surface p-7">
        <h2 className="text-xl font-bold">What to write in a privacy request</h2>
        <ul className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
          <li>• What you want: access, correction, erasure, withdrawal of consent, nomination, or a complaint</li>
          <li>• The email address you used to contact us before (if any)</li>
          <li>• Gym members: please contact your gym first — it holds your data, not us</li>
          <li>• Want to delete app data? You can do it yourself in seconds</li>
        </ul>
        <Link
          href="/legal/data-deletion"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-semibold hover:border-lime hover:text-lime"
        >
          <Icon icon={Delete02Icon} size={18} /> How to delete your data
        </Link>
      </section>
    </div>
    </>
  );
}
