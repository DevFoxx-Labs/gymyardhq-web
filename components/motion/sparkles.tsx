import type { CSSProperties } from "react";

type Spark = {
  /** Direction: 0° = straight up, negative = left, positive = right. */
  rot: number;
  /** How far it flies from the burst origin, in px. */
  dist: number;
  /** Size in px. */
  s: number;
  tone: "lime" | "white" | "gold";
  shape: "star" | "dot";
  /** Small extra delay so the burst comes in two waves, in ms. */
  lag?: number;
};

const TONE: Record<Spark["tone"], string> = {
  lime: "#b5f63d",
  white: "#ffffff",
  gold: "#ffd54a",
};

const TONES: Spark["tone"][] = ["lime", "white", "gold"];

/**
 * Upper arc only (−120° … +120°), so nothing flies down across the body.
 * Stars in the first wave, dots slightly later and further out.
 */
const SPARKS: Spark[] = [
  ...[-120, -84, -48, -14, 18, 52, 88, 120].map((rot, i) => ({
    rot,
    dist: 62 + (i % 3) * 8,
    s: 13 + (i % 2) * 4,
    tone: TONES[i % 3],
    shape: "star" as const,
  })),
  ...[-102, -66, -32, 2, 34, 70, 104].map((rot, i) => ({
    rot,
    dist: 92 + (i % 2) * 12,
    s: 6 + (i % 2) * 2,
    tone: TONES[(i + 1) % 3],
    shape: "dot" as const,
    lag: 60,
  })),
];

/**
 * Firecracker-style celebration burst (same idea as the astrogaon "How it
 * works" cracker): a flash at one fixed point, then sparkles fly outward along
 * their own angle and fade. The origin does NOT move with the mascot; the
 * burst is timed to the top of the jump (jump peaks at 45% of 1.6 s).
 * Decorative only; hidden when the visitor prefers reduced motion.
 */
export function CelebrationSparkles({ scale = 1, top = "22%" }: { scale?: number; top?: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 z-10 h-0 w-0"
      style={{ top, transform: scale === 1 ? undefined : `scale(${scale})` }}
    >
      <span className="burst-flash absolute left-0 top-0 h-16 w-16 rounded-full" />
      {SPARKS.map((p, i) => (
        <span
          key={i}
          className="burst-spark absolute left-0 top-0"
          style={
            {
              width: p.s,
              height: p.s,
              "--rot": `${p.rot}deg`,
              "--dist": `${p.dist}px`,
              "--lag": `${p.lag ?? 0}ms`,
              filter: `drop-shadow(0 0 4px ${TONE[p.tone]})`,
            } as CSSProperties
          }
        >
          <span
            className={`block h-full w-full ${p.shape === "dot" ? "rounded-full" : "sparkle-star"}`}
            style={{ background: TONE[p.tone] }}
          />
        </span>
      ))}
    </span>
  );
}
