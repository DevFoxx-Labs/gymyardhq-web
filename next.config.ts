import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Static site → no per-request nonce is possible, so inline scripts that
 * Next.js emits need 'unsafe-inline'. Everything else is locked to 'self';
 * no third-party origin is allowed (no analytics/trackers by design).
 * See docs/known-gaps.md.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    /**
     * Default minus 2048/3840: no source image is wider than 1913 px and next/image never
     * upscales, so those entries only returned the 1920 file again while adding two srcset
     * candidates to every image in the HTML and RSC payload. Keep the top entry ≥ the widest
     * source; if a wider image is added, add a matching width here.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  /** Lets a verification build run beside `pnpm dev` without sharing (and corrupting) `.next`. */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      /** Video file names carry a version (-v1); a new cut gets a new name, so they can be cached for a year. */
      { source: "/videos/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  /** Short, stable URLs to paste into Google Play Console. */
  async redirects() {
    return [
      { source: "/privacy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/privacy-policy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      { source: "/delete-account", destination: "/legal/data-deletion", permanent: true },
      { source: "/delete-data", destination: "/legal/data-deletion", permanent: true },
      { source: "/cookies", destination: "/legal/cookie-policy", permanent: true },
      { source: "/support", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
