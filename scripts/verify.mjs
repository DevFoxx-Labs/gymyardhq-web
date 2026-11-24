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
  "/features/gym-fee-reminders",
  "/features/upi-gym-billing",
  "/features/gym-receipt-app",
  "/features/gym-member-management",
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

console.log("\nSEO");
for (const path of pages) {
  const html = await (await get(path)).text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1] ?? "";
  check(Boolean(canonical) && canonical === ogUrl, `${path} og:url equals canonical`);
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${path} has exactly one <h1>`);
  check(/<script type="application\/ld\+json">/.test(html), `${path} has JSON-LD`);
}
{
  const hi = await (await get("/legal/privacy-policy/hi")).text();
  check(/hrefLang="x-default"/.test(hi) && /og:locale" content="hi_IN"/.test(hi), "Hindi page: x-default hreflang + og:locale hi_IN");
  const home = await (await get("/")).text();
  check(/"MobileApplication"/.test(home) && /"Organization"/.test(home), "home has MobileApplication + Organization schema");
  check((await get("/llms.txt")).status === 200, "/llms.txt → 200");
  if (process.env.EXPECT_SITE_URL) {
    const canonical = home.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
    check(canonical.startsWith(process.env.EXPECT_SITE_URL), `canonical starts with EXPECT_SITE_URL (${canonical})`);
  }
}

console.log("\nWhatsApp widget");
{
  // Build with WHATSAPP_WIDGET_LIVE=true + a number and run with EXPECT_WHATSAPP=1 to check the on state.
  const expectOn = process.env.EXPECT_WHATSAPP === "1";
  const home = await (await get("/")).text();
  const contact = await (await get("/contact")).text();
  const legal = await (await get("/legal/privacy-policy")).text();
  check(/data-whatsapp-widget/.test(home) === expectOn, `widget ${expectOn ? "present" : "absent (flag off)"} on /`);
  check(/data-whatsapp-widget/.test(legal) === expectOn, `widget ${expectOn ? "present" : "absent"} on legal pages`);
  const links = [...contact.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)].map((m) => m[1]);
  check(expectOn ? links.length === 1 && /^https:\/\/wa\.me\/[1-9]\d{9,14}\?text=/.test(links[0]) : links.length === 0, `/contact WhatsApp link ${expectOn ? "is a valid wa.me click-to-chat link" : "hidden"}`);
  check(!/<script[^>]+src="[^"]*(whatsapp|wa\.me|facebook|fbcdn)/i.test(home), "no WhatsApp/Meta script is loaded");
  check(/WhatsApp/.test(legal), "Privacy Policy discloses WhatsApp");
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
  ["/manifest.webmanifest", "application/manifest+json"],
]) {
  const res = await get(path);
  check(res.status === 200 && (res.headers.get("content-type") ?? "").includes(type), `${path} → ${type}`);
}

console.log("\nPerformance guards");
{
  /*
   * Inter/Archivo ship only Google's "latin" range + ₹ (design/tools/build_fonts.py).
   * A character from the dropped subsets (latin-ext, cyrillic, greek, vietnamese) would now
   * render in the Arial fallback instead of the brand font — fail so the font build is
   * extended (add the range there and in app/layout.tsx) rather than shipping a silent change.
   * Devanagari is fine: Hind covers it and the Inter stack never had it.
   */
  const dropped = /[Ā-İĲ-őŔ-ʺʽ-˅ˇ-˙˛˝-˿Ͱ-ԯᴀ-ᶿḀ-῿₠-₫₭-₸₺-⃏ℓⱠ-Ɀⷠ-ⷿꙀ-ꚟ꜠-ꟿ]/gu;
  const visibleText = (html) =>
    html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
  for (const path of pages) {
    const found = [...new Set(visibleText(await (await get(path)).text()).match(dropped) ?? [])];
    check(found.length === 0, `${path} uses only characters the self-hosted fonts cover${found.length ? ` (found: ${found.join(" ")})` : ""}`);
  }
  // Every image srcset width must exist in next.config deviceSizes/imageSizes; the largest
  // device size must stay ≥ the widest source image (1913 px today), or wide screens get softer art.
  const home = await (await get("/")).text();
  const widths = [...home.matchAll(/\/_next\/image\?url=[^"\s,]*?(?:&amp;|&|\\u0026)w=(\d+)/g)].map((m) => Number(m[1]));
  check(widths.length > 0 && Math.max(...widths) <= 1920, `home srcset tops out at ${Math.max(...widths)} px (no 2048/3840 duplicates)`);

  const { existsSync, readdirSync, readFileSync } = await import("node:fs");
  const webpWidth = (buf) => {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return 1 + buf.readUIntLE(24, 3);
    if (chunk === "VP8 ") return buf.readUInt16LE(26) & 0x3fff;
    if (chunk === "VP8L") return 1 + (buf.readUInt32LE(21) & 0x3fff);
    return 0;
  };
  const tooWide = [];
  for (const dir of ["assets/scenes", "assets/cutouts", "public/images"].filter((d) => existsSync(d))) {
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".webp"))) {
      const w = webpWidth(readFileSync(`${dir}/${f}`));
      if (w > 1920) tooWide.push(`${dir}/${f} (${w}px)`);
    }
  }
  check(tooWide.length === 0, `no source image wider than the largest deviceSize 1920${tooWide.length ? ` — ${tooWide.join(", ")}` : ""}`);
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
