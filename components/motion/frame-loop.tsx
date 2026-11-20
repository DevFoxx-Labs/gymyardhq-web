import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

type Props = {
  /** First frame — also the static image when motion is reduced. */
  a: StaticImageData;
  /** Second frame, same scale as `a` (cut from the same canvas size). */
  b: StaticImageData;
  /** Which point of the two frames lines up (feet for push-ups, centre for standing poses). */
  anchor?: "bottom-center" | "bottom-left";
  /** One full A→B cycle. */
  duration?: string;
  sizes?: string;
  alt?: string;
  className?: string;
};

/**
 * Two-frame mascot animation (wave, push-up, curl). Frames are stacked and
 * swapped with a stepped opacity keyframe — no JS, no layout shift.
 */
export function FrameLoop({ a, b, anchor = "bottom-center", duration = "1s", sizes = "240px", alt = "", className = "" }: Props) {
  const widthPct = (b.width / a.width) * 100;
  const pos = anchor === "bottom-left" ? "left-0" : "left-1/2 -translate-x-1/2";
  return (
    <div className={`relative ${className}`} style={{ "--frame-dur": duration } as CSSProperties}>
      <Image src={a} alt={alt} sizes={sizes} className="frame-a block h-auto w-full" />
      <Image
        src={b}
        alt=""
        aria-hidden
        sizes={sizes}
        className={`frame-b absolute bottom-0 h-auto max-w-none ${pos}`}
        style={{ width: `${widthPct}%` }}
      />
    </div>
  );
}
