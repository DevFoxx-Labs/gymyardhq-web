import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** Desktop (md+) image. */
  image: StaticImageData;
  /** Optional different crop for phones; defaults to `image`. */
  mobileImage?: StaticImageData;
  /** Which side of the section the mascot/image occupies on desktop. Text goes on the other side. */
  imageSide?: "left" | "right";
  /**
   * `wide`: image fills ~68% of the section on its side and dissolves into the page.
   * `full`: image covers the whole section; a gradient darkens the text side.
   */
  layout?: "wide" | "full";
  /** CSS object-position for the desktop image, e.g. "70% 40%". */
  focus?: string;
  /** Background the image dissolves into (must match the section). */
  tone?: "ink" | "lime";
  id?: string;
  /** Accessible description; leave empty when the image is decorative. */
  alt?: string;
  minHeight?: string;
  /** Pull the copy up over the faded bottom of the phone artwork (default) or keep it below. */
  mobileOverlap?: "default" | "small";
  className?: string;
  children: ReactNode;
};

/**
 * A section whose artwork dissolves into the page on every edge — no boxes,
 * no hard borders. Desktop: art on one side, copy on the other. Phones: art on
 * top fading into the copy below it.
 */
export function BlendedScene({
  image,
  mobileImage,
  imageSide = "right",
  layout = "wide",
  focus = "50% 50%",
  tone = "ink",
  id,
  alt = "",
  minHeight = "clamp(560px, 50vw, 820px)",
  mobileOverlap = "default",
  className = "",
  children,
}: Props) {
  const mobile = mobileImage ?? image;
  const right = imageSide === "right";
  const bg = tone === "lime" ? "bg-lime-scene text-ink" : "bg-ink";
  const sceneBg = tone === "lime" ? "var(--color-lime-scene)" : "var(--color-ink)";

  const desktopMask = layout === "full" ? "scene-fade-y" : right ? "scene-fade-l" : "scene-fade-r";
  const desktopBox =
    layout === "full" ? "inset-0" : `inset-y-0 w-[68%] ${right ? "right-0" : "left-0"}`;

  return (
    <section id={id} className={`relative isolate overflow-hidden ${bg} ${id ? "scroll-mt-16" : ""} ${className}`}>
      {/* Phones: stacked artwork that fades into the copy */}
      <div
        className="scene-fade-b relative w-full md:hidden"
        style={{ aspectRatio: `${mobile.width} / ${mobile.height}` }}
      >
        <Image src={mobile} alt={alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
      </div>

      {/* Desktop: artwork dissolving into the page on its inner edge */}
      <div className={`absolute hidden md:block ${desktopBox} ${desktopMask}`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={layout === "full" ? "100vw" : "70vw"}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
      {layout === "full" && (
        <div
          aria-hidden
          className={`absolute inset-y-0 hidden w-[64%] md:block ${right ? "left-0" : "right-0"}`}
          style={{
            backgroundImage: `linear-gradient(to ${right ? "right" : "left"}, ${sceneBg} 0%, ${sceneBg} 28%, color-mix(in oklab, ${sceneBg} 65%, transparent) 62%, transparent 100%)`,
          }}
        />
      )}

      <div
        className={`relative mx-auto max-w-6xl px-5 pb-16 md:mt-0 ${mobileOverlap === "small" ? "-mt-6 sm:-mt-10" : "-mt-24 sm:-mt-32"} md:flex md:min-h-(--scene-h) md:items-center md:py-20`}
        style={{ "--scene-h": minHeight } as CSSProperties}
      >
        <div className={`md:w-[46%] lg:w-[42%] ${right ? "" : "md:ml-auto"}`}>{children}</div>
      </div>
    </section>
  );
}
