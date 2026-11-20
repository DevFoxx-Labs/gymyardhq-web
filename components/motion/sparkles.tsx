import type { CSSProperties } from "react";

type Sparkle = {
  /** Position inside the parent box, in % (left, top). */
  x: number;
  y: number;
  /** Size in px. */
  s: number;
  /** Drift while fading out, in px. */
  dx: number;
  dy: number;
  /** Delay inside the 1.6 s jump cycle, in ms. */
  d: number;
  tone: "lime" | "white" | "gold";
  shape?: "star" | "dot";
};

/** Around the head, shoulders and raised fists (upper ~55% of the cutout). */
const SPARKLES: Sparkle[] = [
  { x: 8, y: 6, s: 16, dx: -14, dy: -16, d: 0, tone: "lime" },
  { x: 92, y: 4, s: 18, dx: 14, dy: -18, d: 60, tone: "gold" },
  { x: 50, y: -6, s: 14, dx: 0, dy: -20, d: 120, tone: "white" },
  { x: -4, y: 30, s: 12, dx: -18, dy: -4, d: 180, tone: "white" },
  { x: 104, y: 28, s: 14, dx: 18, dy: -6, d: 90, tone: "lime" },
  { x: 24, y: -2, s: 9, dx: -8, dy: -14, d: 220, tone: "gold", shape: "dot" },
  { x: 76, y: -4, s: 8, dx: 8, dy: -14, d: 30, tone: "lime", shape: "dot" },
  { x: 2, y: 50, s: 7, dx: -14, dy: 4, d: 260, tone: "lime", shape: "dot" },
  { x: 98, y: 50, s: 7, dx: 14, dy: 4, d: 150, tone: "white", shape: "dot" },
  { x: 66, y: 14, s: 10, dx: 10, dy: -10, d: 300, tone: "white" },
];

const TONE: Record<Sparkle["tone"], string> = {
  lime: "#b5f63d",
  white: "#ffffff",
  gold: "#ffd54a",
};

/**
 * Celebration sparkles that burst around the mascot's upper body at the top
 * of each jump. Pure CSS (clip-path stars + dots), decorative only; hidden
 * when the visitor prefers reduced motion.
 */
export function CelebrationSparkles() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {SPARKLES.map((p, i) => (
        <span
          key={i}
          className="sparkle absolute"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--d": `${p.d}ms`,
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
