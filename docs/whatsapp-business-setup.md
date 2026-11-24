# WhatsApp — widget + WhatsApp Business auto-replies

Two layers work together:

1. **On the website** (`components/whatsapp/whatsapp-widget.tsx`, copy in `content/whatsapp.ts`):
   a chat box with a proactive nudge (after 15 s or half the page, once per visit, never on legal
   pages), a typed greeting, instant answers to 6 common questions (EN + हिंदी), an away note
   outside business hours, and a "Continue on WhatsApp" button. The button opens WhatsApp with a
   ready message for that topic and the page the visitor came from. Everything runs in the browser.
   No third-party script, no cookies, no storage, nothing sent to us.
2. **Inside WhatsApp** (this document): auto-replies that the visitor gets after they press send.
   You set these up once in the free **WhatsApp Business** app on the business phone.

## 1. Turn the widget on

In the hosting environment (see `.env.example`), then redeploy:

```
WHATSAPP_WIDGET_LIVE=true
WHATSAPP_NUMBER=91XXXXXXXXXX     # the WhatsApp Business number, country code first
WHATSAPP_HOURS=10:00-19:00       # optional, IST; must match the hours in step 2
WHATSAPP_DAYS=1-6                # optional, Mon–Sat
```

## 2. WhatsApp Business app: auto-replies

WhatsApp Business → **Settings → Business tools**.

### Business profile
- Name: GymYardHQ, category: Software / App, description from the website tagline, website URL,
  business hours = `WHATSAPP_HOURS`/`WHATSAPP_DAYS` (keep them identical so the widget and
  WhatsApp say the same thing).
- Do **not** put the Grievance Officer's details here. Grievances stay on email (`/contact`).

### Greeting message (Business tools → Greeting message → on, "Everyone not in address book")

```
Namaste 🙏 Thanks for contacting GymYardHQ — the offline gym management app for gym owners.

Reply with a number:
1 – Is it free?
2 – Help me set up my gym
3 – Fees, UPI bills & reminders
4 – Problem with the app

A team member will reply soon. Please never send your MPIN, backup password or database connection string.
```

Hindi (WhatsApp Business allows one greeting. Use the bilingual version if most of your leads write in Hindi):

```
नमस्ते 🙏 GymYardHQ से संपर्क करने के लिए धन्यवाद।
1 – क्या ऐप फ़्री है?  2 – जिम सेट करने में मदद  3 – फ़ीस, UPI बिल, रिमाइंडर  4 – ऐप में समस्या
हमारी टीम जल्द जवाब देगी। अपना MPIN या बैकअप पासवर्ड कभी न भेजें।
```

### Away message (Business tools → Away message → "Outside of business hours")

```
Thanks for your message! We're offline right now. Our hours are [Mon–Sat, 10 AM – 7 PM IST], and we'll reply as soon as we're back.
Meanwhile: https://<domain>/features
```

### Quick replies (Business tools → Quick replies). Type `/` in a chat to use them

| Shortcut | Message |
|---|---|
| `/free` | Yes, GymYardHQ is free. No monthly subscription and no ads. It works on Android 7.0 and newer. |
| `/offline` | GymYardHQ is offline-first: everything works without internet and your data stays on your phone, protected by your MPIN. |
| `/setup` | Great! Please share your gym name, city and roughly how many members you have. We'll guide you step by step. |
| `/upi` | Bills show a UPI QR code for your own UPI ID. Members pay you directly, and the app records the payment and makes a PDF receipt. https://<domain>/features/upi-gym-billing |
| `/backup` | Before changing phones, export an encrypted backup from the app with a password you choose, then restore it on the new phone. We can't recover a forgotten backup password. |
| `/privacy` | You can delete all app data in Settings → Reset Application Data. For privacy requests or grievances, email our Grievance Officer: https://<domain>/contact |

Keep these in step with `content/whatsapp.ts` and the home-page FAQ. Every claim must match the app.

### Labels
Create labels **New lead**, **Setup help**, **Support**, **Resolved**. Each prefilled message ends
with `(from the website: /page)`, so you can see which page brought the lead.

## 3. Rules (DPDP + WhatsApp policy)

- A visitor who messages you has asked for an **answer**, not for marketing. Don't add them to a
  broadcast list or send offers unless they ask for it in the chat (write down when and what).
  Stop at once when they say stop.
- Delete chats after the retention period in the Privacy Policy (`RETENTION_SUPPORT_EMAILS`, used
  for WhatsApp too). Turn off chat backup to Google Drive on the business phone, or accept that
  the backup is covered by that retention.
- Turn on **two-step verification** in WhatsApp (Settings → Account) and a screen lock on the
  business phone. Anyone holding that phone can read every lead's chat.
- Never ask for, or accept, MPINs, backup passwords or MongoDB connection strings.

## 4. Later: a real chatbot (WhatsApp Business Platform / Cloud API)

Automated replies that understand free text, or lead capture into a CRM, need the Cloud API, a
backend with a webhook (signature-verified, rate-limited), approved message templates and a
Business Solution Provider or Meta app. That adds Meta as a processor with a server-side data
store, so the Privacy Policy, retention schedule and threat model must be updated first. This is
logged as an option in `docs/known-gaps.md` and not built.
