"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  /** The still scene (server-rendered image with the same framing as the video). Stays as the fallback. */
  children: ReactNode;
  /** Video sources in order of preference (WebM first, MP4 fallback). */
  sources: { src: string; type: string }[];
  /** Classes for the <video>; match the still's object-fit / object-position so they line up. */
  videoClassName?: string;
  /** Only play when this media query matches (e.g. "(min-width: 768px)"); otherwise nothing downloads. */
  media?: string;
  /** Extra wait after the page load event before the video may start, in ms. */
  startDelayMs?: number;
};

/**
 * A scene image that turns into its looping video. The still renders first
 * (server HTML, no layout shift, stays the LCP element). The video downloads
 * only after the page has finished loading and once the scene is near the
 * viewport, then fades in on its first played frame and pauses off-screen.
 * No video with prefers-reduced-motion, Data Saver, a non-matching `media`, or
 * when the element is hidden (display:none never intersects).
 * Decorative: muted, no controls, hidden from assistive tech.
 */
export function SceneVideo({ children, sources, videoClassName = "", media, startDelayMs = 0 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (media && !window.matchMedia(media).matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let io: IntersectionObserver | undefined;
    const start = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoad(true);
            video.play().catch(() => {
              /* autoplay refused: the still image stays */
            });
          } else {
            video.pause();
          }
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(wrap);
    };

    // Never compete with the LCP image: wait for the window load event (+ optional delay,
    // e.g. until the still's own entrance animation has finished).
    let timer: number | undefined;
    const afterLoad = () => {
      timer = window.setTimeout(start, startDelayMs);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    return () => {
      window.removeEventListener("load", afterLoad);
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [media, startDelayMs]);

  // Sources are attached on first intersection; load() then picks one.
  useEffect(() => {
    if (!load) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [load]);

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0">
      {children}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        onPlaying={() => setReady(true)}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"} ${videoClassName}`}
      >
        {load && sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
    </div>
  );
}
