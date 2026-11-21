import { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight01Icon, CheckmarkBadge01Icon, Invoice01Icon } from "@hugeicons/core-free-icons";
import heroDesktop from "@/assets/scenes/hero-desktop.webp";
import heroMobile from "@/assets/scenes/hero-mobile.webp";
import { Icon } from "../icon";
import { PlayStoreButton } from "../play-store-button";
import { PhoneMockup } from "./phone-mockup";

/**
 * Full-bleed hero. Art direction: a wide scene on desktop (mascot right),
 * a tall scene on phones (mascot below the copy). The artwork is the LCP
 * element, so it is server-rendered with fetchPriority="high".
 */
export function Hero() {
  const common = { alt: "", sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: heroDesktop });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: heroMobile });

  return (
    <section className="relative isolate overflow-hidden">
      {/* depth layer: slowest — zooms gently as the hero scrolls away */}
      <div aria-hidden className="depth-bg absolute inset-0 -z-10">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" comes from getImageProps (decorative) */}
        <img
          {...img}
          srcSet={mobileSet}
          className="motion-kenburns absolute bottom-0 left-0 h-auto w-full md:inset-0 md:h-full md:object-cover md:object-[72%_40%]"
        />
      </picture>
      </div>

      {/* Blend: header seam, text side, and the section below */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[65%] bg-gradient-to-b from-ink via-ink/85 to-transparent md:hidden" />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-[70%] md:block"
        style={{ backgroundImage: "linear-gradient(to right, var(--color-ink) 0%, var(--color-ink) 22%, color-mix(in oklab, var(--color-ink) 70%, transparent) 55%, transparent 100%)" }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 pt-12 sm:pt-16 md:flex md:min-h-[clamp(620px,52vw,860px)] md:items-center md:py-20">
        {/* depth layer: fastest — copy rises and fades first */}
        <div className="depth-copy max-w-xl">
          <p className="motion-rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-xs text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Gym management app · Made for India
          </p>

          <h1 className="motion-rise-soft font-wide mt-6 text-[2.6rem] font-black leading-[0.95] tracking-tight sm:text-6xl xl:text-[4.1rem]">
            <span className="sm:whitespace-nowrap">Run your gym</span>
            <br />
            <span className="text-lime">like a pro.</span>
          </h1>

          <p className="motion-rise mt-6 max-w-lg text-lg leading-relaxed text-white/70" style={{ "--d": "120ms" } as CSSProperties}>
            Members, fees, UPI bills, receipts and reminders — in one app that works{" "}
            <span className="text-white">without internet</span> and keeps your data{" "}
            <span className="text-white">on your phone</span>.
          </p>

          <div className="motion-rise mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "220ms" } as CSSProperties}>
            <PlayStoreButton size="lg" />
            <Link
              href="#features"
              className="inline-flex h-14 items-center gap-2 rounded-2xl border border-white/15 bg-ink/40 px-6 font-semibold backdrop-blur transition hover:border-lime hover:text-lime"
            >
              See features <Icon icon={ArrowRight01Icon} size={18} />
            </Link>
          </div>

          <ul className="motion-rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70" style={{ "--d": "320ms" } as CSSProperties}>
            {["No subscription", "No ads", "English & हिन्दी"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Icon icon={CheckmarkBadge01Icon} size={16} className="text-lime" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* App preview floats between the copy and the mascot on wide screens */}
        <div className="pointer-events-none absolute left-[52%] top-[56%] hidden -translate-y-1/2 xl:block">
          <div className="depth-phone">
          <div className="motion-rise relative origin-left scale-[0.8]" style={{ "--d": "400ms" } as CSSProperties}>
            <PhoneMockup className="animate-float" />
            <div className="absolute -left-14 bottom-28 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-surface/90 px-3.5 py-2.5 shadow-2xl backdrop-blur" aria-hidden>
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime text-ink">
                <Icon icon={Invoice01Icon} size={18} />
              </span>
              <span>
                <span className="block text-[11px] text-muted">Receipt sent</span>
                <span className="block text-sm font-bold">GYM-2026-00042</span>
              </span>
            </div>
          </div>
          </div>
        </div>

        {/* Phones: room for the mascot below the copy */}
        <div aria-hidden className="h-[96vw] md:hidden" />
      </div>
    </section>
  );
}
