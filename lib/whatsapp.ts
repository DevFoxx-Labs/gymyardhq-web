import type { WhatsAppHours } from "@/config/site";

/** Longest prefilled message we hand to WhatsApp (keeps the URL well under browser limits). */
export const MAX_WHATSAPP_TEXT = 600;

/**
 * Click-to-chat link. `number` is digits only with country code (validated in config/site.ts).
 * The text is URL-encoded; control characters are dropped and the length capped, so whatever a
 * visitor types can only ever become the prefilled text of their own WhatsApp message.
 */
export function whatsAppUrl(number: string, text?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  const clean = (text ?? "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .trim()
    .slice(0, MAX_WHATSAPP_TEXT);
  return clean ? `${base}?text=${encodeURIComponent(clean)}` : base;
}

export type WhatsAppStatus =
  | { known: false }
  | { known: true; open: true }
  | { known: true; open: false; /** ISO weekday 1–7 */ nextDay: number; nextMinutes: number; nextIsToday: boolean; nextIsTomorrow: boolean };

const IST_OFFSET_MIN = 330;

/** Online/away from the configured business hours, evaluated in India Standard Time. */
export function whatsAppStatus(hours: WhatsAppHours | null, now: Date = new Date()): WhatsAppStatus {
  if (!hours) return { known: false };
  const ist = new Date(now.getTime() + IST_OFFSET_MIN * 60_000);
  const jsDay = ist.getUTCDay();
  const today = jsDay === 0 ? 7 : jsDay;
  const minutes = ist.getUTCHours() * 60 + ist.getUTCMinutes();

  if (hours.days.includes(today) && minutes >= hours.start && minutes < hours.end) {
    return { known: true, open: true };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = ((today - 1 + offset) % 7) + 1;
    if (!hours.days.includes(day)) continue;
    if (offset === 0 && minutes >= hours.start) continue; // today's window already passed
    return {
      known: true,
      open: false,
      nextDay: day,
      nextMinutes: hours.start,
      nextIsToday: offset === 0,
      nextIsTomorrow: offset === 1,
    };
  }
  return { known: false };
}

/** "10:00 AM" style clock for a minutes-after-midnight value. */
export function formatClock(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
