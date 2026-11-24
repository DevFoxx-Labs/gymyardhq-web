"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon, Cancel01Icon, SentIcon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import type { WhatsAppHours } from "@/config/site";
import { chatCopy, type ChatLang } from "@/content/whatsapp";
import { formatClock, MAX_WHATSAPP_TEXT, whatsAppStatus, whatsAppUrl, type WhatsAppStatus } from "@/lib/whatsapp";

/*
 * WhatsApp chat widget — first-party, no third-party script, no cookies, no storage.
 * The "auto messages" (greeting, instant answers, away note, follow-up) run only in the
 * browser from content/whatsapp.ts. Nothing reaches us or WhatsApp until the visitor taps
 * "Continue on WhatsApp", which opens wa.me with a prefilled message they still send themselves.
 * State lives in memory, so the proactive nudge shows at most once per visit (the root layout
 * stays mounted across client-side navigations).
 */

type Msg =
  | { id: number; kind: "greet"; index: number }
  | { id: number; kind: "away" }
  | { id: number; kind: "user"; topicId: string }
  | { id: number; kind: "answer"; topicId: string }
  | { id: number; kind: "followup" };

type Step = { kind: "greet"; index: number } | { kind: "away" } | { kind: "answer"; topicId: string } | { kind: "followup" };

type Teaser = "idle" | "typing" | "shown" | "done";

const TEASER_AFTER_MS = 15_000;
const TEASER_SCROLL_RATIO = 0.45;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function WhatsAppWidget({ number, hours }: { number: string; hours: WhatsAppHours | null }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<ChatLang>("en");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<WhatsAppStatus>({ known: false });
  const [page, setPage] = useState("/");
  const [teaser, setTeaser] = useState<Teaser>("idle");

  const t = chatCopy[lang];
  const panelId = useId();
  const titleId = useId();
  const inputId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const nextId = useRef(1);
  const greeted = useRef(false);
  const langChosen = useRef(false);

  const later = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        timers.current.push(window.setTimeout(resolve, ms));
      }),
    [],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  /** Bot messages appear one by one behind a short "typing…" indicator. */
  const playBot = useCallback(
    async (steps: Step[]) => {
      const reduce = prefersReducedMotion();
      for (const step of steps) {
        setTyping(true);
        await later(reduce ? 120 : step.kind === "answer" ? 1100 : 750);
        setTyping(false);
        setMessages((list) => [...list, { ...step, id: nextId.current++ } as Msg]);
        await later(reduce ? 0 : 250);
      }
    },
    [later],
  );

  // Proactive nudge: once per visit, after 15 s or ~half the page, never on legal pages.
  useEffect(() => {
    if (window.location.pathname.startsWith("/legal")) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      cleanup();
      setTeaser((s) => (s === "idle" ? "typing" : s));
      later(prefersReducedMotion() ? 0 : 1200).then(() => setTeaser((s) => (s === "typing" ? "shown" : s)));
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > TEASER_SCROLL_RATIO) fire();
    };
    const timer = window.setTimeout(fire, TEASER_AFTER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, [later]);

  const openPanel = useCallback(() => {
    const path = window.location.pathname;
    const current = whatsAppStatus(hours);
    setPage(path);
    setStatus(current);
    setTeaser("done");
    if (!langChosen.current && path.endsWith("/hi")) setLang("hi");
    setOpen(true);
    if (!greeted.current) {
      greeted.current = true;
      const steps: Step[] = [
        { kind: "greet", index: 0 },
        { kind: "greet", index: 1 },
      ];
      if (current.known && !current.open) steps.push({ kind: "away" });
      void playBot(steps);
    }
  }, [hours, playBot]);

  const closePanel = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) titleRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTo({ top: body.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [messages.length, typing, open]);

  const askTopic = (id: string) => {
    if (typing) return;
    setTopicId(id);
    setPage(window.location.pathname);
    setMessages((list) => [...list, { id: nextId.current++, kind: "user", topicId: id }]);
    void playBot([{ kind: "answer", topicId: id }, { kind: "followup" }]);
  };

  const topic = t.topics.find((x) => x.id === topicId) ?? null;
  const asked = new Set(messages.flatMap((m) => (m.kind === "user" ? [m.topicId] : [])));
  const remaining = t.topics.filter((x) => !asked.has(x.id));
  const greetingDone = messages.filter((m) => m.kind === "greet").length === t.greeting.length;

  const messageText = (body: string) => `${body.trim()}\n\n${t.pageSuffix.replace("{page}", page)}`;
  const ctaUrl = whatsAppUrl(number, messageText(draft.trim() || topic?.prefill || t.genericPrefill));

  const send = (e?: FormEvent) => {
    e?.preventDefault();
    window.open(ctaUrl, "_blank", "noopener,noreferrer");
    setDraft("");
  };

  const onInputKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) send(e);
  };

  const awayParts = () => {
    if (!status.known || status.open) return { day: "", time: "" };
    const day = status.nextIsToday ? t.today : status.nextIsTomorrow ? t.tomorrow : t.weekdays[status.nextDay - 1];
    return { day, time: formatClock(status.nextMinutes) };
  };
  const away = awayParts();
  const statusLine = !status.known
    ? t.statusDefault
    : status.open
      ? t.statusOnline
      : t.statusAway.replace("{day}", away.day).replace("{time}", away.time);

  const renderMessage = (m: Msg) => {
    switch (m.kind) {
      case "greet":
        return <BotBubble key={m.id}>{t.greeting[m.index]}</BotBubble>;
      case "away":
        return (
          <BotBubble key={m.id} tone="note">
            {t.awayNote.replace("{day}", away.day).replace("{time}", away.time)}
          </BotBubble>
        );
      case "user": {
        const label = t.topics.find((x) => x.id === m.topicId)?.label;
        return (
          <div key={m.id} className="wa-msg flex justify-end">
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[#005c4b] px-3.5 py-2 text-sm leading-relaxed text-white">{label}</p>
          </div>
        );
      }
      case "answer": {
        const a = t.topics.find((x) => x.id === m.topicId);
        if (!a) return null;
        return (
          <BotBubble key={m.id}>
            {a.answer}
            {a.link ? (
              <Link
                href={a.link.href}
                onClick={() => closePanel(false)}
                className="mt-2 flex items-center gap-1 font-semibold text-lime underline-offset-4 hover:underline"
              >
                {a.link.label} <Icon icon={ArrowUpRight01Icon} size={14} />
              </Link>
            ) : null}
          </BotBubble>
        );
      }
      case "followup":
        return (
          <div key={m.id} className="wa-msg space-y-2">
            <BotBubble>{t.followUp}</BotBubble>
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-9 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-ink transition-transform hover:-translate-y-px"
            >
              <Icon icon={WhatsappIcon} size={18} /> {t.continueCta}
            </a>
          </div>
        );
    }
  };

  return (
    <div data-whatsapp-widget className={lang === "hi" ? "font-deva" : undefined} lang={lang}>
      {/* Proactive auto-message */}
      {teaser !== "idle" && teaser !== "done" && !open ? (
        <div
          role="status"
          className="wa-teaser fixed bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] right-4 z-[45] flex max-w-[min(18rem,calc(100vw-2rem))] items-start gap-2 rounded-2xl rounded-br-md border border-line-strong bg-card py-3 pl-4 pr-2 shadow-[0_16px_40px_rgb(0_0_0/0.45)] md:bottom-[8.5rem] md:right-6"
        >
          <button type="button" onClick={openPanel} className="min-w-0 flex-1 text-left text-sm leading-relaxed text-white">
            {teaser === "typing" ? (
              <TypingDots label="GymYardHQ is typing" />
            ) : (
              <>
                <span className="block text-xs font-semibold text-[#25D366]">{t.teamName}</span>
                {t.teaser}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setTeaser("done")}
            aria-label={t.teaserDismiss}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white/10 hover:text-white"
          >
            <Icon icon={Cancel01Icon} size={14} />
          </button>
        </div>
      ) : null}

      {/* Chat panel */}
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          onKeyDown={(e) => {
            if (e.key === "Escape") closePanel();
          }}
          className="wa-panel fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] z-[45] flex max-h-[min(38rem,calc(100dvh-10rem-env(safe-area-inset-bottom)))] flex-col overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-[0_24px_60px_rgb(0_0_0/0.55)] sm:left-auto sm:right-6 sm:w-[23rem] md:bottom-[8.5rem] md:max-h-[min(38rem,calc(100dvh-13rem))]"
        >
          <header className="flex items-center gap-3 border-b border-line bg-card px-4 py-3">
            <span className="relative shrink-0">
              <Image src="/images/g-symbol.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-ink p-1" />
              <span
                aria-hidden
                className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                  status.known && !status.open ? "bg-due" : "bg-[#25D366]"
                }`}
              />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} ref={titleRef} tabIndex={-1} className="truncate text-sm font-bold text-white outline-none">
                {t.teamName}
              </h2>
              <p className="truncate text-xs text-muted">{statusLine}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                langChosen.current = true;
                setLang(lang === "en" ? "hi" : "en");
              }}
              aria-label={t.langSwitchLabel}
              className={`shrink-0 rounded-lg border border-line-strong px-2 py-1 text-xs font-semibold text-white/80 hover:border-lime hover:text-lime ${lang === "en" ? "font-deva" : "font-sans"}`}
              lang={lang === "en" ? "hi" : "en"}
            >
              {t.langSwitch}
            </button>
            <button
              type="button"
              onClick={() => closePanel()}
              aria-label={t.closeLabel}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white/10 hover:text-white"
            >
              <Icon icon={Cancel01Icon} size={18} />
            </button>
          </header>

          <div ref={bodyRef} role="log" aria-live="polite" className="wa-wall min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {messages.map(renderMessage)}
            {typing ? (
              <div className="flex items-end gap-2">
                <BotAvatar />
                <span className="rounded-2xl rounded-bl-md bg-card px-3.5 py-3">
                  <TypingDots label="GymYardHQ is typing" />
                </span>
              </div>
            ) : null}
            {greetingDone && !typing && remaining.length > 0 ? (
              <div className="wa-msg pt-1">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{t.topicsIntro}</p>
                <div className="flex flex-wrap gap-2">
                  {remaining.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => askTopic(x.id)}
                      className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-left text-xs font-semibold text-white hover:border-[#25D366] hover:bg-[#25D366]/20"
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <form onSubmit={send} className="border-t border-line bg-card px-3 pb-3 pt-3">
            <div className="flex items-end gap-2">
              <label htmlFor={inputId} className="sr-only">
                {t.inputLabel}
              </label>
              <textarea
                id={inputId}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onInputKey}
                rows={1}
                maxLength={MAX_WHATSAPP_TEXT - 80}
                placeholder={t.inputPlaceholder}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-line-strong bg-ink px-3.5 py-2.5 text-base leading-snug text-white placeholder:text-muted focus:border-[#25D366] focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                aria-label={t.sendLabel}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-ink hover:brightness-110"
              >
                <Icon icon={SentIcon} size={20} />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11px] leading-snug text-muted">
              {t.privacyNote}{" "}
              <Link href="/legal/privacy-policy#data-we-receive" onClick={() => closePanel(false)} className="underline underline-offset-2 hover:text-white">
                {t.privacyLink}
              </Link>
            </p>
          </form>
        </section>
      ) : null}

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? closePanel(false) : openPanel())}
        aria-label={open ? t.closeLabel : t.launcherLabel}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="wa-launcher fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-[0_10px_30px_rgb(37_211_102/0.35)] transition-transform hover:scale-105 md:bottom-16 md:right-6"
      >
        {teaser === "shown" && !open ? <span aria-hidden className="wa-ring absolute inset-0 rounded-full border-2 border-[#25D366]" /> : null}
        <Icon icon={open ? Cancel01Icon : WhatsappIcon} size={open ? 24 : 28} strokeWidth={open ? 2 : 1.75} />
        {teaser === "shown" && !open ? (
          <span aria-hidden className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-overdue text-[10px] font-bold text-white">
            1
          </span>
        ) : null}
      </button>
    </div>
  );
}

function BotAvatar() {
  return (
    <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink">
      <Image src="/images/g-symbol.webp" alt="" width={20} height={20} className="h-5 w-5" />
    </span>
  );
}

function BotBubble({ children, tone }: { children: ReactNode; tone?: "note" }) {
  return (
    <div className="wa-msg flex items-end gap-2">
      <BotAvatar />
      <div
        className={`max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2 text-sm leading-relaxed ${
          tone === "note" ? "border border-due/30 bg-due/10 text-white" : "bg-card text-white/90"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="wa-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: `${i * 160}ms` }} />
      ))}
    </span>
  );
}
