import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Calendar03Icon,
  ChartLineData01Icon,
  CheckmarkBadge01Icon,
  CloudSavingDone01Icon,
  Coins01Icon,
  Notification03Icon,
  SecurityLockIcon,
  UserGroupIcon,
  WifiOff01Icon,
} from "@hugeicons/core-free-icons";
import downloadScene from "@/assets/scenes/download.webp";
import downloadMobileScene from "@/assets/scenes/download-mobile.webp";
import faqScene from "@/assets/scenes/faq.webp";
import feesScene from "@/assets/scenes/fees.webp";
import languageScene from "@/assets/scenes/language.webp";
import membersScene from "@/assets/scenes/members.webp";
import privacyScene from "@/assets/scenes/privacy.webp";
import receiptsScene from "@/assets/scenes/receipts.webp";
import remindersScene from "@/assets/scenes/reminders.webp";
import reportsScene from "@/assets/scenes/reports.webp";
import securityScene from "@/assets/scenes/security.webp";
import step1Scene from "@/assets/scenes/step-1.webp";
import step2Scene from "@/assets/scenes/step-2.webp";
import step3Scene from "@/assets/scenes/step-3.webp";
import trainersScene from "@/assets/scenes/trainers.webp";
import { Hero } from "@/components/home/hero";
import { Icon } from "@/components/icon";
import { PlayStoreButton } from "@/components/play-store-button";
import { BlendedScene } from "@/components/scene/blended-scene";
import { SceneTile } from "@/components/scene/scene-tile";
import { site } from "@/config/site";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const marquee = ["Members", "Fees", "UPI Bills", "PDF Receipts", "QR Verify", "Reminders", "Reports", "Trainers", "Expenses", "Backups"];

const highlights = [
  { value: "100%", label: "Works offline" },
  { value: "₹0", label: "Monthly subscription" },
  { value: "0", label: "Ads or trackers" },
  { value: "2", label: "Languages — English & हिन्दी" },
];

type Chapter = {
  id?: string;
  image: typeof membersScene;
  focus: string;
  eyebrow: string;
  icon: IconSvgElement;
  title: string;
  body: string;
  points: string[];
};

const chapters: Chapter[] = [
  {
    id: "features",
    image: membersScene,
    focus: "60% 50%",
    eyebrow: "Members",
    icon: UserGroupIcon,
    title: "Every member, one tap away.",
    body: "Photo, phone, plan, trainer and full change history for every member — with call, SMS and WhatsApp a tap away.",
    points: ["Plans & packages", "Plan and trainer history", "Archive & restore", "Save to contacts"],
  },
  {
    image: feesScene,
    focus: "60% 50%",
    eyebrow: "Fees & UPI",
    icon: Coins01Icon,
    title: "Collect fees the way India pays.",
    body: "Record a payment and share a bill with a UPI QR — members pay with GPay, PhonePe, Paytm or BHIM straight to your account. Then send a numbered PDF receipt.",
    points: ["UPI QR on every bill", "Auto receipt numbers", "Thermal & A4 print", "Share on WhatsApp"],
  },
  {
    image: remindersScene,
    focus: "55% 45%",
    eyebrow: "Reminders",
    icon: Notification03Icon,
    title: "Dues don't slip anymore.",
    body: "Automatic due-today, due-soon and expiry alerts on your phone, plus ready-made SMS and WhatsApp messages to send in one tap.",
    points: ["Due today & due soon", "Membership expiry", "Message templates", "Works after restart"],
  },
  {
    image: reportsScene,
    focus: "70% 50%",
    eyebrow: "Dashboard & reports",
    icon: ChartLineData01Icon,
    title: "Know your numbers.",
    body: "See active, due and overdue members at a glance. Track revenue, expenses and trainer payouts with clear charts.",
    points: ["Live member status", "Revenue vs expenses", "Trainer payouts", "Month-on-month trends"],
  },
];

const tiles = [
  {
    image: receiptsScene,
    title: "Tamper-proof receipts",
    body: "Every receipt carries a tamper-check QR code. Scan it in the app to verify — even offline.",
  },
  {
    image: trainersScene,
    title: "Trainers & expenses",
    body: "Assign trainers, track their payouts, and keep every gym expense in one place.",
  },
  {
    image: securityScene,
    title: "Locked like a vault",
    body: "MPIN plus fingerprint or face unlock. Encrypted backups you can restore on a new phone.",
  },
  {
    image: languageScene,
    title: "English & हिन्दी",
    body: "Switch the whole app to Hindi in Settings. Your gym logo and details on every bill and receipt.",
  },
];

const steps = [
  { image: step1Scene, title: "Set up in 2 minutes", body: "Add your gym name and logo, create an MPIN and turn on fingerprint unlock. No sign-up, no server." },
  { image: step2Scene, title: "Add plans & members", body: "Create monthly, quarterly or yearly plans and packages, then add members with their photo and trainer." },
  { image: step3Scene, title: "Collect & remind", body: "Share a bill with a UPI QR, issue a PDF receipt, and let reminders chase the dues for you." },
];

const faqs = [
  { q: "Is GymYardHQ free?", a: "Yes. There is no monthly subscription and no ads." },
  {
    q: "Does it need internet?",
    a: "No. GymYardHQ is offline-first — everything works without internet. Internet is only needed if you choose the optional Online mode with your own MongoDB database.",
  },
  {
    q: "Where is my gym's data stored?",
    a: "On your phone, in a local database protected by your MPIN. We do not run a server for the app and never receive your members' or payment data.",
  },
  {
    q: "Does the app take payments from members?",
    a: "No. Bills show a UPI QR code with your own UPI ID; members pay you directly from any UPI app. The app records the payment and creates the receipt.",
  },
  { q: "What happens if I change my phone?", a: "Export an encrypted backup (protected by a password you choose) and restore it on the new phone." },
  { q: "Which phones does it support?", a: `GymYardHQ is available for Android (${site.app.minAndroid} and newer).` },
];

function Eyebrow({ children, className = "text-lime" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>{children}</p>;
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ───────────── MARQUEE ───────────── */}
      <div className="relative z-10 overflow-hidden py-3" aria-hidden>
        <div className="relative -mx-4 -rotate-1 border-y border-ink bg-lime py-3.5 text-ink">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {marquee.map((word) => (
                  <span key={word} className="font-wide flex items-center whitespace-nowrap px-6 text-lg font-black uppercase tracking-tight">
                    {word}
                    <span className="ml-12 inline-block h-2 w-2 rotate-45 bg-ink" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────── HIGHLIGHTS ───────────── */}
      <section aria-label="Highlights">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-16 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="border-l border-line pl-5">
              <dd className="font-wide text-4xl font-black text-white sm:text-5xl">{h.value}</dd>
              <dt className="mt-2 text-sm text-muted">{h.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────────── FEATURE CHAPTERS (full-bleed, blended) ───────────── */}
      <div className="mx-auto max-w-6xl px-5 pt-10 text-center md:pt-16">
        <Eyebrow>Features</Eyebrow>
        <h2 className="font-wide mx-auto mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          Less paperwork. <span className="text-lime">More reps.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">Everything a gym owner does at the front desk — on the phone you already carry.</p>
      </div>

      {chapters.map((c) => (
        <BlendedScene key={c.title} id={c.id} image={c.image} focus={c.focus} imageSide="right">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime text-ink">
            <Icon icon={c.icon} size={22} />
          </span>
          <Eyebrow className="mt-6 text-lime">{c.eyebrow}</Eyebrow>
          <h3 className="font-wide mt-3 text-3xl font-black leading-[1.02] tracking-tight sm:text-5xl">{c.title}</h3>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{c.body}</p>
          <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/85">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Icon icon={CheckmarkBadge01Icon} size={16} className="mt-0.5 shrink-0 text-lime" />
                {p}
              </li>
            ))}
          </ul>
        </BlendedScene>
      ))}

      {/* ───────────── MORE FEATURES (dissolving scenes) ───────────── */}
      <section aria-labelledby="more-features" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>And there&apos;s more</Eyebrow>
          <h2 id="more-features" className="font-wide mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Built for the whole gym.
          </h2>
        </div>
        <div className="mt-6 grid gap-x-4 gap-y-10 md:grid-cols-2">
          {tiles.map((t) => (
            <SceneTile key={t.title} image={t.image}>
              <h3 className="text-2xl font-bold">{t.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-white/70">{t.body}</p>
            </SceneTile>
          ))}
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section id="how-it-works" className="relative scroll-mt-16 overflow-hidden py-16 md:py-24">
        <div aria-hidden className="bg-plate absolute left-1/2 top-1/3 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-wide mt-3 text-4xl font-black tracking-tight sm:text-6xl">Three sets. Done.</h2>
          </div>
          <ol className="mt-4 grid gap-y-12 md:grid-cols-3 md:gap-x-2">
            {steps.map((s, i) => (
              <li key={s.title}>
                <SceneTile image={s.image} ratio="square" sizes="(min-width: 768px) 34vw, 100vw">
                  <span className="font-wide flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-xl font-black text-ink">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/70">{s.body}</p>
                </SceneTile>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── PRIVACY ───────────── */}
      <BlendedScene id="privacy" image={privacyScene} layout="full" focus="80% 50%" minHeight="clamp(600px, 52vw, 860px)">
        <Eyebrow>Privacy by design</Eyebrow>
        <h2 className="font-wide mt-3 text-3xl font-black leading-[1.02] tracking-tight sm:text-5xl">
          Your gym&apos;s data stays in your gym.
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {[
            { icon: WifiOff01Icon, t: "Offline-first", d: "Stored on your phone, not on our servers." },
            { icon: SecurityLockIcon, t: "MPIN & biometrics", d: "Only you can open your gym's books." },
            { icon: CloudSavingDone01Icon, t: "Encrypted backups", d: "AES-256, protected by your password." },
            { icon: CheckmarkBadge01Icon, t: "No ads, no tracking", d: "No analytics SDKs, no Advertising ID." },
          ].map((p) => (
            <li key={p.t} className="flex gap-3">
              <Icon icon={p.icon} size={22} className="mt-0.5 shrink-0 text-lime" />
              <span>
                <span className="block font-semibold">{p.t}</span>
                <span className="block text-sm text-white/65">{p.d}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/legal/privacy-policy" className="rounded-xl bg-white px-4 py-2.5 font-semibold text-ink hover:bg-lime">
            Read the Privacy Policy
          </Link>
          <Link href="/legal/data-deletion" className="rounded-xl border border-white/20 bg-ink/40 px-4 py-2.5 font-semibold backdrop-blur hover:border-lime hover:text-lime">
            How to delete your data
          </Link>
        </div>
      </BlendedScene>

      {/* ───────────── FAQ ───────────── */}
      <BlendedScene id="faq" image={faqScene} imageSide="left" focus="20% 50%" mobileOverlap="small" minHeight="clamp(620px, 54vw, 880px)">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="font-wide mt-3 text-4xl font-black tracking-tight">Questions, answered.</h2>
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg leading-none text-lime transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 pr-10 leading-relaxed text-white/65">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/65">
          Still stuck?{" "}
          <Link href="/contact" className="text-white underline underline-offset-4 hover:text-lime">
            Contact support
          </Link>
          .
        </p>
      </BlendedScene>

      {/* ───────────── DOWNLOAD (lime, full-bleed) ───────────── */}
      <BlendedScene
        id="download"
        image={downloadScene}
        mobileImage={downloadMobileScene}
        tone="lime"
        layout="full"
        focus="78% 0%"
        minHeight="clamp(520px, 46vw, 760px)"
        mobileOverlap="small"
      >
        <h2 className="font-wide text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl">
          Stronger
          <br />
          every day.
        </h2>
        <p className="mt-5 max-w-md text-lg text-ink/75">
          Download GymYardHQ and take control of your gym today — free, offline and private.
        </p>
        <PlayStoreButton size="lg" tone="dark" className="mt-8" />
        <p className="mt-6 flex items-center gap-2 text-sm text-ink/70">
          <Icon icon={Calendar03Icon} size={16} /> Android {site.app.minAndroid.replace("Android ", "")}+ · English & हिन्दी
        </p>
      </BlendedScene>
    </>
  );
}
