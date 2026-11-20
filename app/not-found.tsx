import Link from "next/link";
import notFoundScene from "@/assets/scenes/not-found.webp";
import { BlendedScene } from "@/components/scene/blended-scene";

export default function NotFound() {
  return (
    <BlendedScene image={notFoundScene} focus="75% 45%" minHeight="clamp(520px, 46vw, 760px)">
      <p className="font-wide text-7xl font-black text-lime sm:text-8xl">404</p>
      <h1 className="font-wide mt-4 text-4xl font-extrabold">Skipped leg day?</h1>
      <p className="mt-3 text-lg text-white/70">This page doesn&apos;t exist — but your gains still do.</p>
      <Link href="/" className="mt-8 inline-block rounded-xl bg-lime px-5 py-3 font-semibold text-ink hover:bg-white">
        Back to home
      </Link>
    </BlendedScene>
  );
}
