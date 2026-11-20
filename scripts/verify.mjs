#!/usr/bin/env node
/**
 * Smoke + guard checks against a running build (no extra dependencies).
 *   pnpm build && pnpm start -p 3417   # in one terminal
 *   BASE_URL=http://localhost:3417 pnpm verify
 *
 * Covers: every public/legal route renders, Hindi notices exist, unknown
 * slugs 404, Play Console short links redirect, security headers present,
 * no cookies set, and no third-party script/style/font/iframe on any page
 * (no tracker can load before consent because none is allowed at all).
 */
const BASE = (process.env.BASE_URL ?? "http://localhost:3417").replace(/\/+$/, "");
let failures = 0;

function check(ok, message) {
  if (ok) console.log(`  ✓ ${message}`);
  else {
    failures++;
    console.error(`  ✗ ${message}`);
  }
}

async function get(path, init) {
  return fetch(`${BASE}${path}`, { redirect: "manual", ...init });
}

const pages = [
  "/",
  "/legal",
  "/legal/privacy-policy",
  "/legal/privacy-policy/hi",
  "/legal/terms",
  "/legal/data-deletion",
  "/legal/data-deletion/hi",
  "/legal/cookie-policy",
  "/contact",
];

const thirdParty = [
  /<script[^>]+src="(?:https?:)?\/\/(?!localhost)/i,
  /<link[^>]+href="(?:https?:)?\/\/(?!localhost)[^"]+"[^>]*rel="(?:stylesheet|preload|preconnect)"/i,
  /<link[^>]+rel="(?:stylesheet|preload|preconnect|dns-prefetch)"[^>]*href="(?:https?:)?\/\/(?!localhost)/i,
  /<iframe/i,
  /googletagmanager|google-analytics|gtag\(|fbq\(|clarity\.ms|hotjar/i,
];

console.log(`Verifying ${BASE}\n\nPages`);
for (const path of pages) {
  const res = await get(path);
  const html = await res.text();
  check(res.status === 200, `${path} → 200 (got ${res.status})`);
  check(!res.headers.get("set-cookie"), `${path} sets no cookie`);
  check(!thirdParty.some((re) => re.test(html)), `${path} loads no third-party script/style/iframe`);
  if (path.startsWith("/legal/")) {
    check(/Version|संस्करण/.test(html) && /2026-\d\d-\d\d/.test(html), `${path} shows version + date`);
  }
  if (path.endsWith("/hi")) check(/lang="hi"/.test(html), `${path} is marked lang="hi"`);
}

console.log("\nNot found");
for (const path of ["/legal/does-not-exist", "/legal/terms/hi", "/api/legal/does-not-exist"]) {
  const res = await get(path);
  check(res.status === 404, `${path} → 404 (got ${res.status})`);
}

console.log("\nPlay Console short links");
for (const [from, to] of [
  ["/privacy", "/legal/privacy-policy"],
  ["/terms", "/legal/terms"],
  ["/delete-account", "/legal/data-deletion"],
  ["/support", "/contact"],
]) {
  const res = await get(from);
  check([301, 308].includes(res.status) && res.headers.get("location")?.endsWith(to), `${from} → ${to}`);
}

console.log("\nSecurity headers");
{
  const res = await get("/");
  const h = (k) => res.headers.get(k) ?? "";
  check(h("content-security-policy").includes("frame-ancestors 'none'"), "CSP with frame-ancestors 'none'");
  check(h("content-security-policy").includes("object-src 'none'"), "CSP with object-src 'none'");
  check(h("x-content-type-options") === "nosniff", "X-Content-Type-Options: nosniff");
  check(h("x-frame-options") === "DENY", "X-Frame-Options: DENY");
  check(h("strict-transport-security").includes("max-age="), "Strict-Transport-Security");
  check(Boolean(h("referrer-policy")), "Referrer-Policy");
  check(Boolean(h("permissions-policy")), "Permissions-Policy");
  check(!h("x-powered-by"), "No X-Powered-By");
}

console.log("\nLegal API (shared with the app)");
{
  const res = await get("/api/legal");
  const json = await res.json();
  check(res.status === 200 && Array.isArray(json.documents), "/api/legal lists documents");
  for (const slug of ["privacy-policy", "terms", "data-deletion", "cookie-policy"]) {
    check(json.noticeVersions?.includes(`${slug}@`), `noticeVersions includes ${slug}`);
    const doc = await (await get(`/api/legal/${slug}`)).json();
    check(doc.en?.sections?.length > 0 && !JSON.stringify(doc).includes("{{"), `/api/legal/${slug} resolved, no raw {{tokens}}`);
  }
}

console.log("\nImages, SEO");
{
  const html = await (await get("/")).text();
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  check(Boolean(og), "home page has og:image");
  if (og) {
    const res = await fetch(og.replace(/^https?:\/\/[^/]+/, BASE));
    check(res.status === 200 && (res.headers.get("content-type") ?? "").startsWith("image/"), `og:image serves an image`);
  }
}
for (const [path, type] of [
  ["/sitemap.xml", "xml"],
  ["/robots.txt", "text/plain"],
]) {
  const res = await get(path);
  check(res.status === 200 && (res.headers.get("content-type") ?? "").includes(type), `${path} → ${type}`);
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
