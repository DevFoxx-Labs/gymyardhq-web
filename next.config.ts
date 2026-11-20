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
    return [{ source: "/:path*", headers: securityHeaders }];
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
