import Image from "next/image";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import duoCutout from "@/assets/cutouts/owner-mascot-cutout.webp";
import downloadScene from "@/assets/scenes/download.webp";
import { site } from "@/config/site";
import { Icon } from "../icon";
import { CelebrationSparkles } from "../motion/sparkles";
import { PlayStoreButton } from "../play-store-button";

/**
 * Download — lime, pinned, full height (view timeline "--dl"), same text
 * behaviour as the Finale: "STRONGER" sweeps in from the left behind the art,
 * "EVERY DAY." from the right in front of it. The owner × mascot high-five
 * slides in on the left (sparks burst where the hands meet), the flexing
 * lion scene slides in on the right and keeps swaying gently left–right.
 * Static composition when motion is reduced or scroll timelines are missing.
 */
export function DownloadFinale() {
  return (
    <section id="download" aria-labelledby="download-title" className="dl relative scroll-mt-16 bg-lime-scene text-ink">
      <div className="dl-stage relative h-dvh min-h-[600px] overflow-hidden">
        <h2 id="download-title" className="sr-only">
          Stronger every day — download {site.name}
        </h2>

        {/* line 1 — behind the art */}
        <p
          aria-hidden
          className="dl-line1 font-wide absolute inset-x-0 top-[11vh] z-0 whitespace-nowrap text-center text-[12.8vw] font-black uppercase leading-none tracking-tight md:top-[9vh]"
        >
          Stronger
        </p>

        {/* right: flexing lion scene, swaying */}
        <div aria-hidden className="dl-scene absolute bottom-0 right-0 z-10 hidden md:block md:h-[86%] md:w-[58%]">
          <div className="scene-fade-l absolute inset-0">
            <div className="dl-sway absolute inset-0">
              <Image src={downloadScene} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-[80%_20%]" />
            </div>
          </div>
        </div>

        {/* left: owner × mascot high five */}
        <div className="dl-duo absolute bottom-0 left-1/2 z-10 h-[50%] -translate-x-1/2 md:left-[1vw] md:h-[64%] md:translate-x-0">
          <Image
            src={duoCutout}
            alt="A gym owner and the GymYardHQ lion giving each other a high five"
            sizes="(min-width: 768px) 40vw, 50vw"
            className="h-full w-auto max-w-none drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]"
          />
          {/* sparks where the hands meet */}
          <CelebrationSparkles scale={1.7} top="4%" />
        </div>

        {/* call to action — centre */}
        <div className="dl-cta absolute inset-x-0 top-[26vh] z-20 mx-auto max-w-sm px-5 text-center md:left-[37vw] md:right-auto md:top-[29vh] md:w-[23vw] md:max-w-none md:px-0 md:text-left">
          <p className="text-lg font-medium leading-relaxed text-ink/80">
            Download {site.name} and take control of your gym today — free, offline and private.
          </p>
          <PlayStoreButton size="lg" tone="dark" className="mt-6" />
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-ink/70 md:justify-start">
            <Icon icon={Calendar03Icon} size={16} /> Android {site.app.minAndroid.replace("Android ", "")}+ · English & हिन्दी
          </p>
        </div>

        {/* line 2 — in front of the art */}
        <p
          aria-hidden
          className="dl-line2 font-wide absolute inset-x-0 bottom-[3vh] z-20 whitespace-nowrap text-center text-[12.2vw] font-black uppercase leading-none tracking-tight text-beige drop-shadow-[0_6px_18px_color-mix(in_oklab,var(--color-ink)_55%,transparent)]"
        >
          Every day.
        </p>
      </div>
    </section>
  );
}
