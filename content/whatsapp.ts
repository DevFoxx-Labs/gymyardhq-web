/**
 * Copy for the WhatsApp chat widget (components/whatsapp/whatsapp-widget.tsx).
 * The widget's "auto replies" are instant answers shown in the browser; nothing is sent
 * anywhere until the visitor taps "Continue on WhatsApp". Every answer must match the
 * app and the home page FAQ (app/page.tsx). Keep EN and HI in step.
 * Matching WhatsApp Business greeting/away/quick replies: docs/whatsapp-business-setup.md.
 */

export type ChatLang = "en" | "hi";

export type ChatTopic = {
  id: string;
  /** Quick-reply chip, also shown as the visitor's bubble. */
  label: string;
  /** Instant answer shown in the widget. */
  answer: string;
  /** Optional page that explains more. */
  link?: { href: string; label: string };
  /** Prefilled WhatsApp message if the visitor continues from this topic. */
  prefill: string;
};

type ChatCopy = {
  teamName: string;
  launcherLabel: string;
  closeLabel: string;
  teaser: string;
  teaserDismiss: string;
  greeting: string[];
  topicsIntro: string;
  statusOnline: string;
  statusDefault: string;
  /** {time} {day} */
  statusAway: string;
  awayNote: string;
  today: string;
  tomorrow: string;
  weekdays: string[];
  followUp: string;
  continueCta: string;
  inputLabel: string;
  inputPlaceholder: string;
  sendLabel: string;
  genericPrefill: string;
  /** {page} */
  pageSuffix: string;
  privacyNote: string;
  privacyLink: string;
  langSwitch: string;
  langSwitchLabel: string;
  topics: ChatTopic[];
};

export const chatCopy: Record<ChatLang, ChatCopy> = {
  en: {
    teamName: "GymYardHQ Team",
    launcherLabel: "Chat with GymYardHQ on WhatsApp",
    closeLabel: "Close chat",
    teaser: "Running a gym? Ask us anything about GymYardHQ.",
    teaserDismiss: "Dismiss message",
    greeting: ["Namaste! Welcome to GymYardHQ.", "Pick a question for an instant answer, or type your own and we'll reply on WhatsApp."],
    topicsIntro: "Popular questions",
    statusOnline: "Online now",
    statusDefault: "Replies on WhatsApp",
    statusAway: "Away · back {day} at {time} IST",
    awayNote: "We're offline right now, but message us anyway. We'll reply {day} from {time} IST.",
    today: "today",
    tomorrow: "tomorrow",
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    followUp: "Want to talk to a person? Your message is ready. Just tap below.",
    continueCta: "Continue on WhatsApp",
    inputLabel: "Your message",
    inputPlaceholder: "Type your question…",
    sendLabel: "Send on WhatsApp",
    genericPrefill: "Hi GymYardHQ team! I have a question about the app.",
    pageSuffix: "(from the website: {page})",
    privacyNote: "Opens WhatsApp. Nothing is sent until you press send there.",
    privacyLink: "Privacy",
    langSwitch: "हिंदी",
    langSwitchLabel: "हिंदी में बात करें",
    topics: [
      {
        id: "free",
        label: "Is GymYardHQ free?",
        answer: "Yes. There is no monthly subscription and no ads. It runs on Android 7.0 and newer.",
        prefill: "Hi GymYardHQ team! Is the app really free? I run a gym and want to know more.",
      },
      {
        id: "offline",
        label: "Does it work without internet?",
        answer:
          "Yes. GymYardHQ is offline-first, so everything works without internet and your gym's data stays on your phone, protected by your MPIN.",
        prefill: "Hi! I want to know how GymYardHQ works offline and where my gym's data is stored.",
      },
      {
        id: "fees",
        label: "Fees, UPI bills & reminders",
        answer:
          "Create bills with a UPI QR code for your own UPI ID, record payments, share numbered PDF receipts on WhatsApp, and get fee-due and membership-expiry reminders on your phone.",
        link: { href: "/features/upi-gym-billing", label: "See UPI billing" },
        prefill: "Hi! I'd like to know more about UPI bills, receipts and fee reminders in GymYardHQ.",
      },
      {
        id: "setup",
        label: "Help me get started",
        answer:
          "Happy to help you set up your gym: members, plans, trainers and your UPI ID. Tell us a little about your gym on WhatsApp and we'll guide you step by step.",
        prefill: "Hi! I'd like help setting up GymYardHQ for my gym.\nGym name: \nCity: \nNumber of members (approx.): ",
      },
      {
        id: "support",
        label: "I need help with the app",
        answer:
          "Tell us what's happening and which phone you use. Please never send your MPIN, backup password or database connection string. We will never ask for them.",
        prefill: "Hi! I need help with the GymYardHQ app.\nPhone model: \nWhat's happening: ",
      },
      {
        id: "privacy",
        label: "Privacy or deleting my data",
        answer:
          "You can delete all app data yourself in Settings → Reset Application Data. For a privacy request or grievance, our Grievance Officer replies by email.",
        link: { href: "/contact", label: "Contact & Grievance Officer" },
        prefill: "Hi! I have a question about privacy / my data in GymYardHQ.",
      },
    ],
  },
  hi: {
    teamName: "GymYardHQ टीम",
    launcherLabel: "WhatsApp पर GymYardHQ से बात करें",
    closeLabel: "चैट बंद करें",
    teaser: "जिम चलाते हैं? GymYardHQ के बारे में कुछ भी पूछें।",
    teaserDismiss: "संदेश हटाएँ",
    greeting: ["नमस्ते! GymYardHQ में आपका स्वागत है।", "तुरंत जवाब के लिए कोई सवाल चुनें, या अपना सवाल लिखें — हम WhatsApp पर जवाब देंगे।"],
    topicsIntro: "अक्सर पूछे जाने वाले सवाल",
    statusOnline: "अभी ऑनलाइन",
    statusDefault: "WhatsApp पर जवाब",
    statusAway: "अभी दूर · {day} {time} IST से उपलब्ध",
    awayNote: "अभी हम ऑफ़लाइन हैं, फिर भी संदेश भेजें। हम {day} {time} IST से जवाब देंगे।",
    today: "आज",
    tomorrow: "कल",
    weekdays: ["सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "रविवार"],
    followUp: "किसी व्यक्ति से बात करनी है? आपका संदेश तैयार है — बस नीचे टैप करें।",
    continueCta: "WhatsApp पर आगे बढ़ें",
    inputLabel: "आपका संदेश",
    inputPlaceholder: "अपना सवाल लिखें…",
    sendLabel: "WhatsApp पर भेजें",
    genericPrefill: "नमस्ते GymYardHQ टीम! मुझे ऐप के बारे में एक सवाल पूछना है।",
    pageSuffix: "(वेबसाइट से: {page})",
    privacyNote: "WhatsApp खुलेगा। वहाँ भेजें दबाने तक कुछ नहीं जाता।",
    privacyLink: "गोपनीयता",
    langSwitch: "EN",
    langSwitchLabel: "Switch to English",
    topics: [
      {
        id: "free",
        label: "क्या GymYardHQ फ़्री है?",
        answer: "हाँ। कोई मासिक सब्सक्रिप्शन नहीं और कोई विज्ञापन नहीं। यह Android 7.0 और नए फ़ोन पर चलता है।",
        prefill: "नमस्ते GymYardHQ टीम! क्या ऐप सच में फ़्री है? मैं जिम चलाता/चलाती हूँ और ज़्यादा जानना चाहता/चाहती हूँ।",
      },
      {
        id: "offline",
        label: "क्या यह बिना इंटरनेट चलता है?",
        answer:
          "हाँ। GymYardHQ ऑफ़लाइन-फ़र्स्ट है — सब कुछ बिना इंटरनेट चलता है और आपके जिम का डेटा आपके फ़ोन में, आपके MPIN से सुरक्षित रहता है।",
        prefill: "नमस्ते! मैं जानना चाहता/चाहती हूँ कि GymYardHQ ऑफ़लाइन कैसे चलता है और मेरा डेटा कहाँ रहता है।",
      },
      {
        id: "fees",
        label: "फ़ीस, UPI बिल और रिमाइंडर",
        answer:
          "अपने UPI ID के QR कोड के साथ बिल बनाएँ, पेमेंट दर्ज करें, नंबर वाली PDF रसीदें WhatsApp पर भेजें, और फ़ीस बाकी व मेंबरशिप खत्म होने के रिमाइंडर अपने फ़ोन पर पाएँ।",
        link: { href: "/features/upi-gym-billing", label: "UPI बिलिंग देखें" },
        prefill: "नमस्ते! मैं GymYardHQ में UPI बिल, रसीद और फ़ीस रिमाइंडर के बारे में जानना चाहता/चाहती हूँ।",
      },
      {
        id: "setup",
        label: "शुरू करने में मदद चाहिए",
        answer:
          "हम आपका जिम सेट करने में मदद करेंगे — मेंबर, प्लान, ट्रेनर और आपका UPI ID। WhatsApp पर अपने जिम के बारे में थोड़ा बताइए, हम कदम-दर-कदम मदद करेंगे।",
        prefill: "नमस्ते! मुझे अपने जिम के लिए GymYardHQ सेट करने में मदद चाहिए।\nजिम का नाम: \nशहर: \nलगभग मेंबर: ",
      },
      {
        id: "support",
        label: "ऐप में मदद चाहिए",
        answer:
          "बताइए क्या हो रहा है और आपका फ़ोन कौन-सा है। अपना MPIN, बैकअप पासवर्ड या डेटाबेस कनेक्शन स्ट्रिंग कभी न भेजें — हम कभी नहीं माँगेंगे।",
        prefill: "नमस्ते! मुझे GymYardHQ ऐप में मदद चाहिए।\nफ़ोन मॉडल: \nसमस्या: ",
      },
      {
        id: "privacy",
        label: "गोपनीयता या डेटा मिटाना",
        answer:
          "ऐप का सारा डेटा आप खुद Settings → Reset Application Data से मिटा सकते हैं। गोपनीयता अनुरोध या शिकायत के लिए हमारे शिकायत अधिकारी ईमेल से जवाब देते हैं।",
        link: { href: "/contact", label: "संपर्क और शिकायत अधिकारी" },
        prefill: "नमस्ते! GymYardHQ में गोपनीयता / मेरे डेटा के बारे में एक सवाल है।",
      },
    ],
  },
};
