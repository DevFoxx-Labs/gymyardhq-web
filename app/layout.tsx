import type { Metadata, Viewport } from "next";
import { Hind } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppWidget } from "@/components/whatsapp/whatsapp-widget";
import { site } from "@/config/site";
import "./globals.css";

/*
 * Inter + Archivo: the same Google Fonts files as before, trimmed by
 * design/tools/build_fonts.py (see its header). Faces mirror Google's split
 * exactly — "latin" range in one file, the rupee sign in a 1 KB file that loads
 * only when a page shows ₹ — instead of an 83 KB latin-ext file per family.
 * The "… Fallback" faces live in app/globals.css with next/font's original values.
 * Font loader options must be literals, so the latin range (Google's, verbatim) is repeated.
 */

const inter = localFont({
  src: "../assets/fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Inter Fallback"],
  declarations: [
    { prop: "font-family", value: "Inter" },
    { prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" },
  ],
});
// Rupee faces: same family name, own unicode-range. Their (unused) variable on <html> keeps the CSS in the bundle.
const interRupee = localFont({
  src: "../assets/fonts/inter-rupee.woff2",
  variable: "--font-inter-rupee",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "Inter" },
    { prop: "unicode-range", value: "U+20B9" },
  ],
});
// Archivo is pinned at width 125 — the only width the site uses (`font-wide`).
const archivo = localFont({
  src: "../assets/fonts/archivo-latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Archivo Fallback"],
  declarations: [
    { prop: "font-family", value: "Archivo" },
    { prop: "font-stretch", value: "125%" },
    { prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" },
  ],
});
const archivoRupee = localFont({
  src: "../assets/fonts/archivo-rupee.woff2",
  variable: "--font-archivo-rupee",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "Archivo" },
    { prop: "font-stretch", value: "125%" },
    { prop: "unicode-range", value: "U+20B9" },
  ],
});
const hind = Hind({
  variable: "--font-hind",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false, // only Hindi pages use it
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `%s · ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: site.name,
  keywords: [
    "gym management app",
    "gym software India",
    "gym fee reminder",
    "gym billing app",
    "gym receipt app",
    "offline gym app",
    "जिम मैनेजमेंट ऐप",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${interRupee.variable} ${archivo.variable} ${archivoRupee.variable} ${hind.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {site.whatsapp.isLive ? <WhatsAppWidget number={site.whatsapp.number} hours={site.whatsapp.hours} /> : null}
      </body>
    </html>
  );
}
