import { getImageProps } from "next/image";
import ownerTall from "@/assets/scenes/owner-mascot-tall.webp";
import ownerWide from "@/assets/scenes/owner-mascot-wide.webp";

/**
 * "Built for gym owners" — the owner and the mascot as one cinematic band.
 * Copy sits above; the wide group shot dissolves into the page at the top and
 * bottom (tall crop on phones). No box, no frame.
 */
export function OwnerSection() {
  const common = { alt: "A gym owner and the GymYardHQ lion mascot fist-bumping in a gym", sizes: "100vw" };
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, src: ownerWide });
  const {
    props: { srcSet: tallSet, ...img },
  } = getImageProps({ ...common, src: ownerTall });

  return (
    <section aria-labelledby="owners-title" className="relative isolate overflow-hidden pt-16 md:pt-24">
      <div className="reveal relative z-10 mx-auto max-w-3xl px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">For gym owners</p>
        <h2 id="owners-title" className="font-wide mt-3 text-4xl font-black tracking-tight sm:text-6xl">
          You run the gym. <span className="text-lime">We&apos;ve got your back.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
          Fees, members and reminders handled in minutes — so you spend less time at the desk and more time on the floor.
        </p>
      </div>

      <div className="scene-fade-y relative mt-2 aspect-[941/1672] w-full overflow-hidden md:mt-4 md:aspect-[1672/941]">
        <picture>
          <source media="(min-width: 768px)" srcSet={wideSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...img} srcSet={tallSet} loading="lazy" className="parallax absolute inset-0 h-full w-full object-cover md:object-[60%_50%]" />
        </picture>
      </div>
    </section>
  );
}
