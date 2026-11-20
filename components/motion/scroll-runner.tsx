import run from "@/assets/cutouts/run.webp";
import runB from "@/assets/cutouts/run-b.webp";
import { FrameLoop } from "./frame-loop";

/**
 * Page-progress runner: the mascot runs along a thin lime track at the
 * bottom of the screen as you scroll. Two frames (arms swap) + a small bob
 * make the stride; position follows the page scroll (CSS scroll timeline).
 * Hidden on phones, with reduced motion, and in browsers without scroll
 * timelines.
 */
export function ScrollRunner() {
  return (
    <div aria-hidden className="run-track pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="max-md:hidden">
        {/* soft dark band so the runner never sits on bare text */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/85 to-transparent" />
        <div className="run-progress absolute bottom-[3px] left-3 w-12">
          <div className="motion-run-bob drop-shadow-[0_4px_8px_rgb(0_0_0/0.5)]">
            <FrameLoop a={run} b={runB} duration="0.42s" sizes="48px" />
          </div>
        </div>
        <div className="h-[3px] w-full bg-white/10">
          <div className="run-fill h-full w-full bg-lime" />
        </div>
      </div>
    </div>
  );
}
