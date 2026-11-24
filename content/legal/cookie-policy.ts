import type { LegalEntry } from "./types";

/**
 * Cookie Policy. The site currently sets NO cookies and NO local/session
 * storage. If that ever changes, list every key here (name, purpose,
 * category, lifetime) and add a consent banner BEFORE shipping the tracker.
 */
export const cookiePolicy: LegalEntry = {
  slug: "cookie-policy",
  version: "2026-11-24",
  lastUpdated: "2026-11-24",
  en: {
    title: "Cookie Policy",
    summary: "This website does not use cookies, browser storage, analytics or trackers.",
    sections: [
      {
        id: "none",
        heading: "We use no cookies",
        blocks: [
          "This website does not set any cookies and does not store anything in your browser (no local storage or session storage). It loads no analytics, advertising pixels, session recording, third-party chat widgets or social-media embeds. That is why you do not see a cookie banner.",
          "Fonts and images are served from this website itself, not from third-party servers.",
          "The WhatsApp chat button is built into this website. It loads nothing from WhatsApp, sets no cookies and stores nothing in your browser. It only opens WhatsApp (wa.me) when you tap \"Continue on WhatsApp\" or send; from then on WhatsApp's own privacy policy applies.",
        ],
      },
      {
        id: "hosting",
        heading: "Hosting",
        blocks: [
          "Our hosting provider, {{websiteHost}}, records technical logs to deliver and protect the website (see section 6 of our Privacy Policy). If it ever needs to set a strictly necessary security cookie, we will list it here.",
        ],
      },
      {
        id: "app",
        heading: "The GymYardHQ app",
        blocks: [
          "The app does not use cookies, advertising IDs or tracking SDKs. See the Privacy Policy for what it stores on your device.",
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        blocks: [
          "If we ever add optional cookies such as analytics, we will list each one here — name, purpose, category and lifetime — and ask for your consent first, with \"Reject all\" as easy as \"Accept all\". Nothing optional will load before you agree.",
        ],
      },
    ],
  },
};
