import { PlayStoreIcon } from "@hugeicons/core-free-icons";
import { site } from "@/config/site";
import { Icon } from "./icon";

type Props = { size?: "md" | "lg"; tone?: "lime" | "dark"; className?: string };

/**
 * Google Play call-to-action. While the listing is not public
 * (PLAY_STORE_LIVE !== "true") it renders a non-clickable "coming soon" pill
 * instead of a link that would 404.
 */
export function PlayStoreButton({ size = "md", tone = "lime", className = "" }: Props) {
  const pad = size === "lg" ? "h-14 px-6 gap-3" : "h-12 px-5 gap-2.5";
  const base = `inline-flex items-center rounded-2xl font-semibold transition ${pad} ${className}`;

  const content = (
    <>
      <Icon icon={PlayStoreIcon} size={size === "lg" ? 26 : 22} />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] opacity-70">
          {site.app.isLive ? "Get it on" : "Coming soon on"}
        </span>
        <span className={size === "lg" ? "text-lg" : "text-base"}>Google Play</span>
      </span>
    </>
  );

  if (!site.app.isLive) {
    return (
      <span className={`${base} cursor-default border ${tone === "dark" ? "border-ink bg-ink" : "border-line-strong bg-surface"} text-white`}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={site.app.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${tone === "dark" ? "bg-ink text-white hover:bg-white hover:text-ink" : "bg-lime text-ink hover:bg-white"}`}
    >
      {content}
    </a>
  );
}
