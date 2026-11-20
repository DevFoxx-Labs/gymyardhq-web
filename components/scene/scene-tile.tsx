import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type Props = {
  image: StaticImageData;
  alt?: string;
  sizes?: string;
  /** Square scenes (steps) vs 4:3 scenes (features). */
  ratio?: "square" | "landscape";
  children: ReactNode;
};

/**
 * Artwork that dissolves into the page on every side (radial mask), with the
 * copy sitting in the faded lower part — reads as one scene, not a card.
 */
export function SceneTile({ image, alt = "", sizes = "(min-width: 768px) 50vw, 100vw", ratio = "landscape", children }: Props) {
  return (
    <div className="reveal relative">
      <div className={`scene-vignette relative w-full ${ratio === "square" ? "aspect-square" : "aspect-[4/3]"}`}>
        <Image src={image} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
      </div>
      <div className="relative -mt-[14%] px-6 [text-shadow:0_2px_12px_rgb(11_12_16/0.9)] sm:px-8">{children}</div>
    </div>
  );
}
