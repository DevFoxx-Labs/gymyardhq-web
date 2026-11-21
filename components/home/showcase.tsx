import Image from "next/image";
import type { CSSProperties } from "react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  CalendarCheckIn01Icon,
  FingerPrintIcon,
  Invoice01Icon,
  Notification03Icon,
  SecurityLockIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import flexCutout from "@/assets/cutouts/flex-biceps.webp";
import { Icon } from "../icon";
import { PhoneMockup } from "./phone-mockup";

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
  icon: IconSvgElement;
  /** Callout that pops next to the phone while this chapter is on screen. */
  chip: { icon: IconSvgElement; label: string; value: string; pos: string };
};

const chapters: Chapter[] = [
  {
    eyebrow: "Dashboard",
    title: "Your gym at a glance.",
    body: "Active, due today, due soon and overdue members — the moment you open the app.",
    icon: Notification03Icon,
    chip: { icon: CalendarCheckIn01Icon, label: "Due today", value: "6 members", pos: "-right-44 top-20" },
  },
  {
    eyebrow: "Billing",
    title: "Bill. Receipt. Done.",
    body: "A UPI QR bill and a numbered PDF receipt, shared on WhatsApp in seconds.",
    icon: Invoice01Icon,
    chip: { icon: WhatsappIcon, label: "Receipt sent", value: "GYM-2026-00042", pos: "-right-48 top-[46%]" },
  },
  {
    eyebrow: "Privacy",
    title: "Locked to your phone.",
    body: "MPIN and fingerprint lock. Works offline. No ads, no trackers — ever.",
    icon: SecurityLockIcon,
    chip: { icon: FingerPrintIcon, label: "Unlocked", value: "Fingerprint", pos: "-right-40 bottom-24" },
  },
];

/**
 * Apple-style pinned showcase. The stage sticks to the screen while you scroll
 * through a tall section: the phone rises and untilts into place, the mascot
 * drifts behind it at a slower depth, and three chapters + callouts take turns.
 * Pure CSS scroll-driven animation (view timeline "--showcase"); without
 * support or with reduced motion it renders as a normal, static section.
 */
export function Showcase() {
  return (
    <section aria-labelledby="showcase-title" className="showcase relative">
      <div className="showcase-stage relative overflow-hidden">
        {/* depth layer 1: glow */}
        <div aria-hidden className="sc-glow pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-[110px]" />
        {/* depth layer 2: mascot far behind, moving slower than the phone */}
        <div aria-hidden className="sc-mascot pointer-events-none absolute -right-10 bottom-0 hidden w-[420px] opacity-90 lg:block xl:right-[4%]">
          <Image src={flexCutout} alt="" sizes="420px" className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
        </div>

        <div className="relative mx-auto grid h-full max-w-6xl items-center gap-6 px-5 pb-10 pt-20 md:grid-cols-[1fr_auto] md:gap-12 lg:grid-cols-[1.35fr_auto_0.65fr]">
          {/* chapters */}
          <div className="order-2 md:order-1">
            <h2 id="showcase-title" className="sc-title font-wide text-3xl font-black leading-[1] tracking-tight sm:text-5xl">
              Your whole gym.
              <br />
              <span className="text-lime">In your pocket.</span>
            </h2>
            <ol className="sc-caps mt-6 grid gap-6 md:mt-10">
              {chapters.map((c, i) => (
                <li key={c.title} className="sc-cap" style={{ "--n": i } as CSSProperties}>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                    <Icon icon={c.icon} size={16} /> {c.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{c.title}</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-white/70">{c.body}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* the phone (depth layer 3, nearest) */}
          <div className="order-1 mx-auto h-[440px] w-[208px] sm:h-[500px] sm:w-[237px] md:order-2 md:h-[591px] md:w-[280px]">
            <div className="origin-top scale-[0.743] sm:scale-[0.846] md:scale-100">
              <div className="sc-phone relative w-[280px]">
                <PhoneMockup />
                {chapters.map((c, i) => (
                  <div
                    key={c.chip.label}
                    aria-hidden
                    className={`sc-chip absolute hidden items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/10 bg-surface/90 px-3.5 py-2.5 shadow-2xl backdrop-blur md:flex ${c.chip.pos}`}
                    style={{ "--n": i } as CSSProperties}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime text-ink">
                      <Icon icon={c.chip.icon} size={18} />
                    </span>
                    <span>
                      <span className="block text-[11px] text-muted">{c.chip.label}</span>
                      <span className="block text-sm font-bold">{c.chip.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:order-3 lg:block" />
        </div>
      </div>
    </section>
  );
}
