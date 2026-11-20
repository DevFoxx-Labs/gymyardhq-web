import Image from "next/image";
import Link from "next/link";

/** Logo lock-up: the G symbol + wordmark. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="GymYardHQ home">
      <Image src="/images/g-symbol.webp" alt="" width={32} height={32} className="h-8 w-8" />
      <span className="font-wide text-lg font-extrabold tracking-tight">
        GymYard<span className="text-lime">HQ</span>
      </span>
    </Link>
  );
}
