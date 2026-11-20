import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

type IconProps = {
  icon: IconSvgElement;
  size?: number;
  className?: string;
  strokeWidth?: number;
  /** Give a label only for meaningful standalone icons; decorative icons stay hidden. */
  label?: string;
};

/** The only icon component on the site — Hugeicons free (Stroke Rounded). */
export function Icon({ icon, size = 20, className, strokeWidth = 1.75, label }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
