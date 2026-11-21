import Image from "next/image";
import celebrateCutout from "@/assets/cutouts/celebrate.webp";
import logoOfficial from "@/assets/cutouts/logo-official.webp";
import { CelebrationSparkles } from "../motion/sparkles";
import { PlayStoreButton } from "../play-store-button";

/**
 * "That's it. You're ready." — the finish line after How it works.
 * A full-height pinned stage (view timeline "--finale"): the mascot rises to
 * full screen height and keeps jumping with a firecracker burst at each peak,
 * the two giant lines sweep in from opposite sides (one behind the mascot,
 * one in front of it), the official GymYardHQ plate logo and the download
 * call-to-action slide in at their own depths. Static composition when scroll
 * timelines are unavailable or motion is reduced.
 */
export function Finale() {
  return (
    <section aria-labelledby="finale-title" className="finale relative">
      <div className="finale-stage relative h-dvh min-h-[560px] overflow-hidden">
        {/* depth: glow + plate rings */}
        <div aria-hidden className="fn-glow pointer-events-none absolute left-1/2 top-[55%] h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-[120px]" />
        <div aria-hidden className="bg-plate pointer-events-none absolute left-1/2 top-[55%] h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />

        <h2 id="finale-title" className="sr-only">
          That&apos;s it. You&apos;re ready.
        </h2>

        {/* line 1 — behind the mascot */}
        <p
          aria-hidden
          className="fn-line1 font-wide absolute inset-x-0 top-[13vh] z-0 whitespace-nowrap text-center text-[11.5vw] font-black uppercase leading-none tracking-tight text-white/90 md:top-[11vh]"
        >
          That&apos;s it.
        </p>

        {/* the mascot — full screen height, jumping */}
        <div className="fn-mascot absolute bottom-[4vh] left-1/2 z-10 h-[56dvh] -translate-x-1/2 md:h-[84dvh]">
          <div className="motion-jump relative h-full">
            <Image
              src={celebrateCutout}
              alt="The GymYardHQ lion jumping in celebration"
              sizes="(min-width: 768px) 60vh, 45vh"
              className="h-full w-auto max-w-none drop-shadow-[0_40px_60px_rgb(0_0_0/0.6)]"
            />
          </div>
          <CelebrationSparkles scale={2.6} top="20%" />
          <span aria-hidden className="absolute -bottom-3 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-full bg-lime/30 blur-2xl" />
        </div>

        {/* line 2 — in front of the mascot */}
        <p
          aria-hidden
          className="fn-line2 font-wide absolute inset-x-0 bottom-[5vh] z-20 whitespace-nowrap text-center text-[9.4vw] font-black uppercase leading-none tracking-tight text-lime drop-shadow-[0_10px_30px_rgb(0_0_0/0.7)]"
        >
          You&apos;re ready.
        </p>

        {/* official logo — left side */}
        <div className="fn-logo absolute left-1/2 top-[19vh] z-0 w-[34vw] max-w-[180px] -translate-x-1/2 md:left-[4vw] md:top-[34vh] md:w-[24vw] md:max-w-[420px] md:translate-x-0">
          <Image src={logoOfficial} alt="GymYardHQ logo — Stronger Everyday Together" sizes="(min-width: 768px) 24vw, 34vw" className="h-auto w-full" />
        </div>

        {/* call to action — right side */}
        <div className="fn-cta absolute right-[4vw] top-[38vh] z-20 hidden max-w-[22vw] text-left md:block">
          <p className="font-wide text-2xl font-black leading-tight xl:text-3xl">
            Stronger every day.
            <br />
            <span className="text-lime">Together.</span>
          </p>
          <p className="mt-3 text-white/70">Free. Offline. Private. Made for gym owners in India.</p>
          <PlayStoreButton className="mt-6" />
        </div>
      </div>
    </section>
  );
}
