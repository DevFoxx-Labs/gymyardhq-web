import Link from "next/link";
import curlA from "@/assets/cutouts/curl-a.webp";
import curlB from "@/assets/cutouts/curl-b.webp";
import { FrameLoop } from "@/components/motion/frame-loop";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-plate absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 py-16 text-center md:flex-row md:justify-center md:gap-16 md:py-24 md:text-left">
        <FrameLoop a={curlA} b={curlB} duration="1.6s" sizes="(min-width: 768px) 260px, 200px" className="w-48 md:w-64" />
        <div className="reveal">
          <p className="font-wide text-7xl font-black text-lime sm:text-8xl">404</p>
          <h1 className="font-wide mt-4 text-4xl font-extrabold">Skipped leg day?</h1>
          <p className="mt-3 text-lg text-white/70">This page doesn&apos;t exist — but your gains still do.</p>
          <Link href="/" className="mt-8 inline-block rounded-xl bg-lime px-5 py-3 font-semibold text-ink hover:bg-white">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
