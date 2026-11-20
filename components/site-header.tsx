import Link from "next/link";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { BrandMark } from "./brand-mark";
import { Icon } from "./icon";

const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Support" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <BrandMark />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition hover:bg-surface hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#download"
            className="ml-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Get the app
          </Link>
        </nav>

        {/* Mobile menu — <details> works without JavaScript. */}
        <details className="group relative md:hidden">
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-line-strong [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <Icon icon={Menu01Icon} size={20} />
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 mt-2 w-56 rounded-2xl border border-line-strong bg-surface p-2 shadow-2xl"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-card hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#download"
              className="mt-1 block rounded-xl bg-lime px-3 py-2.5 text-center text-sm font-semibold text-ink"
            >
              Get the app
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
