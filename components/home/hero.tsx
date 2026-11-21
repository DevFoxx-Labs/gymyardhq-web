import { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight01Icon, CheckmarkBadge01Icon, Invoice01Icon } from "@hugeicons/core-free-icons";
import heroDesktop from "@/assets/scenes/hero-desktop.webp";
import heroMobile from "@/assets/scenes/hero-mobile.webp";
import { Icon } from "../icon";
import { SceneVideo } from "../motion/scene-video";
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
        {/* desktop: the still turns into a looping video after page load (mobile keeps the image) */}
        <SceneVideo
          media="(min-width: 768px)"
          startDelayMs={1500}
          sources={[
            { src: "/videos/hero-lion-v1.webm", type: "video/webm" },
            { src: "/videos/hero-lion-v1.mp4", type: "video/mp4" },
          ]}
          videoClassName="hidden object-cover object-[72%_40%] md:block"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSet} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" comes from getImageProps (decorative) */}
            <img
              {...img}
              srcSet={mobileSet}
              className="motion-kenburns absolute bottom-0 left-0 h-auto w-full md:inset-0 md:h-full md:object-cover md:object-[72%_40%]"
            />
          </picture>
        </SceneVideo>
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

      {/* Same look as "STRONGER / EVERY DAY.": full-width display lines (sized to fill
          ~93vw, capped by height), sweeping in from opposite sides with a blur on load and
          splitting apart again as the hero scrolls away. Outer span = scroll exit, inner
          span = load entrance, so the transforms never clash. Visual lines are aria-hidden;
          the h1 carries the same words for assistive tech and search. */}
      <h1 className="sr-only">Run your gym like a pro. Gym management app.</h1>

      <div className="relative flex min-h-[calc(100svh-4rem)] flex-col md:min-h-[max(640px,calc(100dvh-4rem))]">
        {/* top: eyebrow + line 1 */}
        <div aria-hidden className="pt-8 text-center md:pt-[4vh]">
          <p className="hero-out-l whitespace-nowrap">
            <span className="hero-in-l font-wide inline-flex items-center gap-[0.55em] text-[min(3.6vw,6.2vh)] font-bold uppercase tracking-[0.3em] text-white/75">
              <span className="h-[0.42em] w-[0.42em] shrink-0 rounded-full bg-lime" />
              Gym management app
            </span>
          </p>
          {/* Line 1 crosses the mascot's face on wide screens. Like the finale's line that
              sits behind the mascot, it turns to glass there: the solid fill fades out over
              the scene (.hero-ghost) and a thin outline takes over (.hero-ghost-stroke),
              so the face stays visible through the letters. */}
          <p className="hero-out-l mt-[1.2vh] whitespace-nowrap">
            <span
              className="hero-in-l font-wide relative block text-[min(9.2vw,15.8vh)] font-black uppercase leading-[0.9] tracking-tight"
              style={{ "--d": "120ms" } as CSSProperties}
            >
              <span className="hero-ghost block drop-shadow-[0_6px_18px_rgb(0_0_0/0.55)]">Run your gym</span>
              <span className="hero-ghost-stroke absolute inset-0 hidden text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.7)] md:block">
                Run your gym
              </span>
            </span>
          </p>
        </div>

        {/* middle: supporting copy (desktop: left, over the dark side of the scene) */}
        <div className="relative mx-auto w-full max-w-6xl flex-1 px-5 max-md:order-2 md:flex md:items-center">
        {/* depth layer: fastest — copy rises and fades first */}
        <div className="depth-copy max-w-md py-6 md:py-0">
          <p className="motion-rise text-lg leading-relaxed text-white/70" style={{ "--d": "520ms" } as CSSProperties}>
            Members, fees, UPI bills, receipts and reminders — in one app that works{" "}
            <span className="text-white">without internet</span> and keeps your data{" "}
            <span className="text-white">on your phone</span>.
          </p>

          <div className="motion-rise mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "620ms" } as CSSProperties}>
            <PlayStoreButton size="lg" />
            <Link
              href="#features"
              className="inline-flex h-14 items-center gap-2 rounded-2xl border border-white/15 bg-ink/40 px-6 font-semibold backdrop-blur transition hover:border-lime hover:text-lime"
            >
              See features <Icon icon={ArrowRight01Icon} size={18} />
            </Link>
          </div>

          <ul className="motion-rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70" style={{ "--d": "720ms" } as CSSProperties}>
            {["No subscription", "No ads", "English & हिन्दी"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Icon icon={CheckmarkBadge01Icon} size={16} className="text-lime" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* App preview floats between the copy and the mascot on wide screens (behind line 2) */}
        <div className="pointer-events-none absolute left-[48%] top-1/2 hidden -translate-y-1/2 xl:block">
          <div className="depth-phone">
          <div className="motion-rise relative origin-left scale-[0.62]" style={{ "--d": "800ms" } as CSSProperties}>
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

        </div>

        {/* Phones: room for the mascot between the copy and line 2 */}
        <div aria-hidden className="h-[85vw] md:hidden max-md:order-3" />

        {/* bottom: line 2, in front of the scene (phones: right under line 1, so both are on the first screen) */}
        <p aria-hidden className="hero-out-r relative z-10 whitespace-nowrap text-center max-md:order-1 max-md:mt-[0.8vh] md:pb-[3vh]">
          <span
            className="hero-in-r font-wide block text-[min(12.4vw,21.3vh)] font-black uppercase leading-[0.9] tracking-tight text-lime drop-shadow-[0_6px_18px_rgb(0_0_0/0.55)]"
            style={{ "--d": "300ms" } as CSSProperties}
          >
            Like a pro.
          </span>
        </p>
      </div>
    </section>
  );
}
