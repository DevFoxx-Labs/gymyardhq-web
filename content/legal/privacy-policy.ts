import type { LegalEntry } from "./types";

/**
 * Privacy Notice — DPDP Act 2023 s.5 + DPDP Rules 2025.
 * Facts verified against the Flutter app source (GymYardHQ repo) on 2026-11-20.
 * Draft for lawyer review — not legal advice.
 */
export const privacyPolicy: LegalEntry = {
  slug: "privacy-policy",
  version: "2026-11-24",
  lastUpdated: "2026-11-24",
  en: {
    title: "Privacy Policy",
    summary:
      "How the GymYardHQ app and this website handle personal data, who is responsible for it, and how you can use your rights under India's Digital Personal Data Protection Act, 2023.",
    sections: [
      {
        id: "summary",
        heading: "The short version",
        blocks: [
          {
            list: [
              "GymYardHQ works offline. Everything you record in the app is stored on your own phone.",
              "{{companyBrand}} does not run a server for the app and does not receive, sell or share the gym, member or payment data you record.",
              "The app has no advertising, no analytics, no tracking SDKs and does not use the Advertising ID.",
              "This website sets no cookies and loads no analytics or trackers.",
              "You can delete everything at any time from inside the app (Settings → Reset Application Data) or by uninstalling it.",
            ],
          },
        ],
      },
      {
        id: "who-we-are",
        heading: "1. Who we are and what this policy covers",
        blocks: [
          "This policy is issued by {{companyLegalName}} (\"{{companyBrand}}\", \"we\", \"us\"), {{companyAddress}}. It covers the GymYardHQ mobile app (package {{packageId}}) and the website at {{siteUrl}}.",
          "Under the Digital Personal Data Protection Act, 2023 (\"DPDP Act\"), a \"Data Fiduciary\" is whoever decides why and how personal data is processed. Because of how GymYardHQ is built, there are two different situations, explained in section 2.",
        ],
      },
      {
        id: "roles",
        heading: "2. Who is responsible for which data",
        blocks: [
          "Data you record in the app (gym owners): when a gym owner or staff member uses GymYardHQ to record details of the gym's members, trainers and payments, the gym decides why that data is collected and how it is used. The gym is the Data Fiduciary for that data. It is stored on the gym's device (or in a database the gym controls — see section 5) and never reaches us.",
          "If you run a gym: you are responsible for giving your members a privacy notice, obtaining their consent where the DPDP Act requires it (including verifiable parental consent for members under 18), keeping their data accurate, and answering their requests to access, correct or erase their data. The app gives you the tools to edit, archive and permanently delete records.",
          "If you are a gym member: please contact your gym about the data it holds about you. We cannot see, change or delete it because we never receive it.",
          "Data we receive ourselves: {{companyBrand}} is the Data Fiduciary only for the small amount of personal data that actually reaches us — the messages you send us and the technical logs of this website (section 6).",
        ],
      },
      {
        id: "app-data",
        heading: "3. What the app stores on your device, and why",
        blocks: [
          {
            list: [
              "Gym and owner details — gym name, owner/admin name, phone number, address, website, logo and UPI ID: to print them on bills and receipts and to set up the app.",
              "Member details — name, phone number, email (optional), gender, date of birth, photo, membership plan, package, trainer, joining and expiry dates, notes: to manage memberships and send reminders.",
              "Payments and billing — payments, dues, bills, receipts (with a tamper-check QR code), expenses and trainer payouts: to keep the gym's accounts and generate receipts and reports.",
              "Trainers — name, phone number, assignments and payouts: to manage staff.",
              "Announcements and events: to plan the gym's calendar.",
              "Security data — your MPIN, stored only as a salted hash in the device's secure storage, and whether fingerprint/face unlock is on. Fingerprint and face data are handled by Android and are never accessible to the app.",
              "Preferences — language, accent colour, list style, print format and reminder settings.",
            ],
          },
          "None of this data is sent to us. The app does not collect your location, browsing history, call logs, SMS messages or health data.",
        ],
      },
      {
        id: "permissions",
        heading: "4. Device permissions",
        blocks: [
          "The app asks for a permission only when you use the feature that needs it. You can turn any permission off in Android Settings → Apps → GymYardHQ → Permissions.",
          {
            list: [
              "Camera — to scan receipt QR codes and take member photos or a gym logo.",
              "Contacts — only when you tap \"Save to contacts\" to save a member's number to your phone's address book. Contacts are never uploaded.",
              "Notifications, exact alarms and start-up — to show fee-due and membership-expiry reminders at the time you choose, including after the phone restarts.",
              "Biometrics — for optional fingerprint/face unlock.",
              "Photos and files — to pick member photos, the gym logo and backup files that you choose.",
            ],
          },
        ],
      },
      {
        id: "online-mode",
        heading: "5. Optional Online mode (your own database)",
        blocks: [
          "Online mode is off by default. If you turn it on, you enter the connection details of a MongoDB database that you own or rent. The app then stores your gym data in that database instead of only on the phone.",
          "That database is controlled by you, not by us. The provider, the country where it is hosted, its encryption and its retention are your choice and your responsibility. We never receive the connection details or the data; the connection details are kept in encrypted secure storage on your device. Use a provider that encrypts connections (TLS).",
        ],
      },
      {
        id: "data-we-receive",
        heading: "6. Personal data we receive, why, and our legal basis",
        blocks: [
          {
            list: [
              "Messages you send us (support, privacy requests, grievances) — your name, email address and what you write. Purpose: to reply and resolve your request. Basis: you provide it voluntarily for this purpose (DPDP Act s.7(a)). Kept for {{supportRetention}}, then deleted, unless a law requires us to keep it longer.",
              "WhatsApp messages you choose to send us — your WhatsApp phone number, WhatsApp profile name and photo (as WhatsApp shows them to us), what you write and the website page you wrote from. Purpose: to answer your questions about the app and help you get started. Basis: you start the chat voluntarily for this purpose (DPDP Act s.7(a)). Kept for {{supportRetention}}, then deleted, unless a law requires us to keep it longer. We do not add you to broadcast lists or send you marketing messages unless you separately ask for them, and you can stop at any time by telling us or blocking the chat.",
              "The chat button on this website — the instant answers in the chat box run only in your browser. They store nothing and send nothing to us or to WhatsApp. Data reaches us only if you tap \"Continue on WhatsApp\" (or the send button) and then send the message yourself in WhatsApp.",
              "Website technical logs — IP address, browser type, page requested and time, recorded by our hosting provider when you visit this website. Purpose: to deliver the website and protect it against abuse. Kept for {{logRetention}}.",
              "Google Play statistics — Google may give us aggregated install numbers and anonymous crash and performance reports. We do not receive your name, email or the data you record in the app.",
            ],
          },
          "We do not use your data for advertising, profiling or automated decisions, and we do not sell it.",
        ],
      },
      {
        id: "sharing",
        heading: "7. Who data is shared with",
        blocks: [
          "We share the limited data we receive only with service providers who process it for us under contract, for the purposes above:",
          {
            list: [
              "{{websiteHost}} — hosts this website.",
              "{{emailProvider}} — delivers and stores our support email.",
              "WhatsApp (WhatsApp LLC / Meta Platforms) — carries the WhatsApp messages you choose to send us, under WhatsApp's own terms and privacy policy.",
              "Google (Google Play) — distributes the app under Google's own privacy policy.",
            ],
          },
          "Inside the app, when you choose to send an SMS or WhatsApp message, or share or print a PDF bill or receipt, the content goes to the app or printer you select, and that service's own terms and privacy policy apply. We may disclose data if a law, court or government authority lawfully requires it.",
        ],
      },
      {
        id: "transfers",
        heading: "8. Transfers outside India",
        blocks: [
          "We do not transfer the data you record in the app anywhere. Our website host, email provider and WhatsApp may process the limited data in section 6 outside India. We will not transfer personal data to any country that the Government of India restricts under section 16 of the DPDP Act.",
        ],
      },
      {
        id: "retention",
        heading: "9. How long data is kept",
        blocks: [
          {
            list: [
              "App data on your phone — until you delete it, reset the app or uninstall it.",
              "Backup files you export — as long as you keep the file.",
              "Online-mode data — as long as you keep it in your own database.",
              "Support and grievance messages, including WhatsApp chats — {{supportRetention}}.",
              "Website logs — {{logRetention}}.",
            ],
          },
          "Depending on your Android settings, Android's own device backup may also copy app data to your Google account. That backup is controlled by Google and your device settings.",
        ],
      },
      {
        id: "security",
        heading: "10. How data is protected",
        blocks: [
          {
            list: [
              "App access is protected by an MPIN (stored only as a salted hash) and optional fingerprint/face unlock.",
              "Backup files are encrypted with AES-256-GCM using a key derived from a password you choose (PBKDF2, 100,000 iterations). We cannot recover a forgotten backup password.",
              "Online-mode connection details are kept in Android's encrypted secure storage.",
              "This website is served only over HTTPS with modern security headers.",
            ],
          },
          "No method of storage or transmission is completely secure. Keep your phone locked, your MPIN private and your backup password safe.",
        ],
      },
      {
        id: "rights",
        heading: "11. Your rights",
        blocks: [
          "Under sections 11 to 14 of the DPDP Act you have the right to:",
          {
            list: [
              "access a summary of your personal data, how it is processed and who it was shared with;",
              "have it corrected, completed or updated;",
              "have it erased when it is no longer needed for the purpose or you withdraw consent, unless a law requires us to keep it;",
              "withdraw consent at any time, as easily as you gave it;",
              "have your grievance answered; and",
              "nominate another person to exercise your rights if you die or become incapable.",
            ],
          },
          "For data recorded in the app, you can do all of this yourself: edit or delete records, turn Online mode off, revoke permissions, or reset the app. Gym members should contact their gym.",
          "For data we hold (section 6), email our Grievance Officer (section 12). It is free. We may ask you to confirm your identity before acting on a request.",
        ],
      },
      {
        id: "grievance",
        heading: "12. Grievance Officer",
        blocks: [
          "Name: {{grievanceName}}",
          "Email: {{grievanceEmail}}",
          "Address: {{companyAddress}}",
          "We acknowledge every grievance within {{grievanceAck}} and aim to resolve it within {{grievanceResolve}}. If you are not satisfied with our response, you may complain to the Data Protection Board of India after using this grievance process, as provided in section 13 of the DPDP Act.",
        ],
      },
      {
        id: "children",
        heading: "13. Children",
        blocks: [
          "GymYardHQ is a business tool meant for adults (18+) who run or work at a gym. We do not knowingly receive personal data of children. Gyms that record members under 18 must obtain verifiable consent from a parent or lawful guardian as required by section 9 of the DPDP Act.",
        ],
      },
      {
        id: "breach",
        heading: "14. Personal data breach",
        blocks: [
          "If a breach affects personal data we hold, we will inform the Data Protection Board of India and every affected person without delay, and send the Board a detailed report within 72 hours, as the DPDP Rules require. We will tell you what happened, the likely impact, what we are doing and what you can do to protect yourself.",
        ],
      },
      {
        id: "changes",
        heading: "15. Changes to this policy",
        blocks: [
          "When this policy changes, we update the version and date at the top of this page. For material changes we will also say so on this website and in the app's release notes.",
        ],
      },
      {
        id: "contact",
        heading: "16. Contact",
        blocks: [
          "{{companyLegalName}}, {{companyAddress}}. Email: {{supportEmail}}. Privacy requests and grievances: {{grievanceEmail}}.",
        ],
      },
    ],
  },
  hi: {
    title: "गोपनीयता नीति",
    summary:
      "GymYardHQ ऐप और यह वेबसाइट व्यक्तिगत डेटा को कैसे संभालते हैं, उसकी ज़िम्मेदारी किसकी है, और डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत आप अपने अधिकारों का उपयोग कैसे कर सकते हैं।",
    sections: [
      {
        id: "summary",
        heading: "संक्षेप में",
        blocks: [
          {
            list: [
              "GymYardHQ ऑफलाइन काम करता है। ऐप में दर्ज सब कुछ आपके अपने फ़ोन में रहता है।",
              "{{companyBrand}} ऐप के लिए कोई सर्वर नहीं चलाता और आपके जिम, मेंबर या पेमेंट डेटा को न प्राप्त करता है, न बेचता है, न साझा करता है।",
              "ऐप में कोई विज्ञापन, एनालिटिक्स या ट्रैकिंग SDK नहीं है और यह Advertising ID का उपयोग नहीं करता।",
              "यह वेबसाइट कोई कुकी सेट नहीं करती और कोई एनालिटिक्स या ट्रैकर लोड नहीं करती।",
              "आप कभी भी ऐप के अंदर से (Settings → Reset Application Data) या ऐप अनइंस्टॉल करके सब कुछ मिटा सकते हैं।",
            ],
          },
        ],
      },
      {
        id: "who-we-are",
        heading: "1. हम कौन हैं और यह नीति किस पर लागू है",
        blocks: [
          "यह नीति {{companyLegalName}} (\"{{companyBrand}}\", \"हम\"), {{companyAddress}} द्वारा जारी की गई है। यह GymYardHQ मोबाइल ऐप (पैकेज {{packageId}}) और वेबसाइट {{siteUrl}} पर लागू है।",
          "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (\"DPDP अधिनियम\") के अनुसार \"डेटा फिड्यूशियरी\" वह है जो तय करता है कि व्यक्तिगत डेटा क्यों और कैसे प्रोसेस होगा। GymYardHQ की बनावट के कारण दो अलग स्थितियाँ हैं, जो सेक्शन 2 में बताई गई हैं।",
        ],
      },
      {
        id: "roles",
        heading: "2. किस डेटा की ज़िम्मेदारी किसकी है",
        blocks: [
          "ऐप में दर्ज डेटा (जिम मालिक): जब कोई जिम मालिक या स्टाफ GymYardHQ में जिम के मेंबर्स, ट्रेनर्स और पेमेंट्स का डेटा दर्ज करता है, तो वह डेटा क्यों लिया जाए और कैसे इस्तेमाल हो, यह जिम तय करता है। उस डेटा का डेटा फिड्यूशियरी जिम है। यह जिम के डिवाइस पर (या जिम के अपने डेटाबेस में — सेक्शन 5) रहता है और हम तक कभी नहीं पहुँचता।",
          "अगर आप जिम चलाते हैं: अपने मेंबर्स को गोपनीयता सूचना देना, जहाँ DPDP अधिनियम ज़रूरी बनाता है वहाँ उनकी सहमति लेना (18 वर्ष से कम मेंबर्स के लिए माता-पिता/अभिभावक की सत्यापन योग्य सहमति सहित), डेटा सही रखना, और उनके डेटा देखने, सुधारने या मिटाने के अनुरोधों का जवाब देना आपकी ज़िम्मेदारी है। ऐप में रिकॉर्ड एडिट, आर्काइव और स्थायी रूप से डिलीट करने के टूल मौजूद हैं।",
          "अगर आप जिम मेंबर हैं: आपके बारे में जिम के पास जो डेटा है, उसके लिए कृपया अपने जिम से संपर्क करें। हम उसे देख, बदल या मिटा नहीं सकते क्योंकि वह हमें मिलता ही नहीं।",
          "जो डेटा हमें मिलता है: {{companyBrand}} केवल उस थोड़े से डेटा का डेटा फिड्यूशियरी है जो वास्तव में हम तक पहुँचता है — आपके भेजे संदेश और इस वेबसाइट के तकनीकी लॉग (सेक्शन 6)।",
        ],
      },
      {
        id: "app-data",
        heading: "3. ऐप आपके डिवाइस पर क्या रखता है और क्यों",
        blocks: [
          {
            list: [
              "जिम और मालिक की जानकारी — जिम का नाम, मालिक/एडमिन का नाम, फ़ोन नंबर, पता, वेबसाइट, लोगो और UPI ID: बिल और रसीद पर छापने और ऐप सेटअप के लिए।",
              "मेंबर की जानकारी — नाम, फ़ोन नंबर, ईमेल (वैकल्पिक), लिंग, जन्मतिथि, फोटो, मेंबरशिप प्लान, पैकेज, ट्रेनर, जॉइनिंग और एक्सपायरी तारीख, नोट्स: मेंबरशिप मैनेज करने और रिमाइंडर भेजने के लिए।",
              "पेमेंट और बिलिंग — पेमेंट, बकाया, बिल, रसीदें (छेड़छाड़-जाँच QR कोड के साथ), खर्च और ट्रेनर पेआउट: जिम का हिसाब रखने, रसीद और रिपोर्ट बनाने के लिए।",
              "ट्रेनर — नाम, फ़ोन नंबर, असाइनमेंट और पेआउट: स्टाफ मैनेज करने के लिए।",
              "घोषणाएँ और इवेंट्स: जिम का कैलेंडर प्लान करने के लिए।",
              "सुरक्षा डेटा — आपका MPIN, जो डिवाइस के सुरक्षित स्टोरेज में केवल salted hash के रूप में रखा जाता है, और फिंगरप्रिंट/फेस अनलॉक चालू है या नहीं। फिंगरप्रिंट और चेहरे का डेटा Android संभालता है; ऐप उसे कभी नहीं देख सकता।",
              "प्राथमिकताएँ — भाषा, एक्सेंट रंग, लिस्ट स्टाइल, प्रिंट फॉर्मेट और रिमाइंडर सेटिंग्स।",
            ],
          },
          "यह कोई भी डेटा हमें नहीं भेजा जाता। ऐप आपकी लोकेशन, ब्राउज़िंग हिस्ट्री, कॉल लॉग, SMS या स्वास्थ्य डेटा नहीं लेता।",
        ],
      },
      {
        id: "permissions",
        heading: "4. डिवाइस अनुमतियाँ",
        blocks: [
          "ऐप कोई अनुमति तभी माँगता है जब आप वह फ़ीचर इस्तेमाल करते हैं जिसे उसकी ज़रूरत है। आप Android Settings → Apps → GymYardHQ → Permissions में कोई भी अनुमति बंद कर सकते हैं।",
          {
            list: [
              "कैमरा — रसीद के QR कोड स्कैन करने और मेंबर फोटो या जिम लोगो लेने के लिए।",
              "कॉन्टैक्ट्स — केवल तब जब आप किसी मेंबर का नंबर फ़ोन की एड्रेस बुक में सेव करने के लिए \"Save to contacts\" दबाते हैं। कॉन्टैक्ट्स कभी अपलोड नहीं होते।",
              "नोटिफ़िकेशन, exact alarm और स्टार्ट-अप — आपके चुने समय पर फीस-ड्यू और मेंबरशिप-एक्सपायरी रिमाइंडर दिखाने के लिए, फ़ोन रीस्टार्ट होने के बाद भी।",
              "बायोमेट्रिक — वैकल्पिक फिंगरप्रिंट/फेस अनलॉक के लिए।",
              "फोटो और फ़ाइलें — आपके चुने मेंबर फोटो, जिम लोगो और बैकअप फ़ाइलें चुनने के लिए।",
            ],
          },
        ],
      },
      {
        id: "online-mode",
        heading: "5. वैकल्पिक ऑनलाइन मोड (आपका अपना डेटाबेस)",
        blocks: [
          "ऑनलाइन मोड डिफ़ॉल्ट रूप से बंद है। इसे चालू करने पर आप अपने स्वामित्व या किराए के MongoDB डेटाबेस का कनेक्शन विवरण डालते हैं, और ऐप आपका जिम डेटा उस डेटाबेस में रखता है।",
          "वह डेटाबेस आपके नियंत्रण में है, हमारे नहीं। प्रोवाइडर, होस्टिंग का देश, एन्क्रिप्शन और रिटेंशन आपकी पसंद और ज़िम्मेदारी है। कनेक्शन विवरण या डेटा हमें कभी नहीं मिलता; कनेक्शन विवरण आपके डिवाइस के एन्क्रिप्टेड सुरक्षित स्टोरेज में रहता है। ऐसा प्रोवाइडर चुनें जो कनेक्शन एन्क्रिप्ट (TLS) करता हो।",
        ],
      },
      {
        id: "data-we-receive",
        heading: "6. हमें मिलने वाला व्यक्तिगत डेटा, उद्देश्य और कानूनी आधार",
        blocks: [
          {
            list: [
              "आपके भेजे संदेश (सपोर्ट, गोपनीयता अनुरोध, शिकायतें) — आपका नाम, ईमेल पता और आपका लिखा संदेश। उद्देश्य: जवाब देना और अनुरोध हल करना। आधार: आप इसी उद्देश्य के लिए स्वेच्छा से देते हैं (DPDP अधिनियम धारा 7(a))। {{supportRetention}} तक रखा जाता है, फिर मिटा दिया जाता है, जब तक कोई कानून इसे अधिक समय तक रखना ज़रूरी न बनाए।",
              "WhatsApp पर आपके भेजे संदेश — आपका WhatsApp फ़ोन नंबर, WhatsApp प्रोफ़ाइल नाम और फ़ोटो (जैसा WhatsApp हमें दिखाता है), आपका लिखा संदेश और वह वेबसाइट पेज जहाँ से आपने लिखा। उद्देश्य: ऐप के बारे में आपके सवालों का जवाब देना और शुरू करने में मदद करना। आधार: आप इसी उद्देश्य के लिए स्वेच्छा से चैट शुरू करते हैं (DPDP अधिनियम धारा 7(a))। {{supportRetention}} तक रखा जाता है, फिर मिटा दिया जाता है, जब तक कोई कानून इसे अधिक समय तक रखना ज़रूरी न बनाए। जब तक आप अलग से न माँगें, हम आपको ब्रॉडकास्ट सूची में नहीं जोड़ते और मार्केटिंग संदेश नहीं भेजते; आप हमें बताकर या चैट ब्लॉक करके कभी भी रोक सकते हैं।",
              "इस वेबसाइट का चैट बटन — चैट बॉक्स के तुरंत जवाब केवल आपके ब्राउज़र में चलते हैं। वे कुछ भी सेव नहीं करते और हमें या WhatsApp को कुछ नहीं भेजते। डेटा हम तक तभी पहुँचता है जब आप \"WhatsApp पर आगे बढ़ें\" (या भेजें बटन) दबाकर WhatsApp में खुद संदेश भेजते हैं।",
              "वेबसाइट तकनीकी लॉग — IP पता, ब्राउज़र प्रकार, माँगा गया पेज और समय, जो वेबसाइट देखने पर हमारा होस्टिंग प्रोवाइडर दर्ज करता है। उद्देश्य: वेबसाइट दिखाना और दुरुपयोग से बचाना। {{logRetention}} तक रखा जाता है।",
              "Google Play आँकड़े — Google हमें कुल इंस्टॉल संख्या और अनाम क्रैश व परफ़ॉर्मेंस रिपोर्ट दे सकता है। हमें आपका नाम, ईमेल या ऐप में दर्ज डेटा नहीं मिलता।",
            ],
          },
          "हम आपके डेटा का उपयोग विज्ञापन, प्रोफ़ाइलिंग या स्वचालित निर्णयों के लिए नहीं करते, और इसे बेचते नहीं हैं।",
        ],
      },
      {
        id: "sharing",
        heading: "7. डेटा किसके साथ साझा होता है",
        blocks: [
          "हमें मिलने वाला सीमित डेटा हम केवल उन सेवा प्रदाताओं के साथ साझा करते हैं जो अनुबंध के तहत ऊपर बताए उद्देश्यों के लिए हमारे लिए प्रोसेस करते हैं:",
          {
            list: [
              "{{websiteHost}} — यह वेबसाइट होस्ट करता है।",
              "{{emailProvider}} — हमारा सपोर्ट ईमेल पहुँचाता और रखता है।",
              "WhatsApp (WhatsApp LLC / Meta Platforms) — WhatsApp की अपनी शर्तों और गोपनीयता नीति के तहत आपके भेजे WhatsApp संदेश हम तक पहुँचाता है।",
              "Google (Google Play) — Google की अपनी गोपनीयता नीति के तहत ऐप वितरित करता है।",
            ],
          },
          "ऐप में जब आप SMS या WhatsApp संदेश भेजते हैं, या PDF बिल/रसीद शेयर या प्रिंट करते हैं, तो सामग्री आपके चुने ऐप या प्रिंटर को जाती है और उस सेवा की अपनी शर्तें व गोपनीयता नीति लागू होती हैं। कोई कानून, न्यायालय या सरकारी प्राधिकरण विधिवत माँगे तो हम डेटा प्रकट कर सकते हैं।",
        ],
      },
      {
        id: "transfers",
        heading: "8. भारत से बाहर ट्रांसफ़र",
        blocks: [
          "ऐप में दर्ज डेटा को हम कहीं ट्रांसफ़र नहीं करते। हमारा वेबसाइट होस्ट, ईमेल प्रोवाइडर और WhatsApp सेक्शन 6 का सीमित डेटा भारत से बाहर प्रोसेस कर सकते हैं। DPDP अधिनियम की धारा 16 के तहत भारत सरकार द्वारा प्रतिबंधित किसी देश में हम व्यक्तिगत डेटा ट्रांसफ़र नहीं करेंगे।",
        ],
      },
      {
        id: "retention",
        heading: "9. डेटा कितने समय तक रखा जाता है",
        blocks: [
          {
            list: [
              "आपके फ़ोन पर ऐप डेटा — जब तक आप उसे मिटाते, ऐप रीसेट या अनइंस्टॉल नहीं करते।",
              "आपकी एक्सपोर्ट की गई बैकअप फ़ाइलें — जब तक आप फ़ाइल रखते हैं।",
              "ऑनलाइन-मोड डेटा — जब तक आप उसे अपने डेटाबेस में रखते हैं।",
              "सपोर्ट और शिकायत संदेश, WhatsApp चैट सहित — {{supportRetention}}।",
              "वेबसाइट लॉग — {{logRetention}}।",
            ],
          },
          "आपकी Android सेटिंग्स के अनुसार, Android का अपना डिवाइस बैकअप भी ऐप डेटा को आपके Google खाते में कॉपी कर सकता है। वह बैकअप Google और आपकी डिवाइस सेटिंग्स के नियंत्रण में है।",
        ],
      },
      {
        id: "security",
        heading: "10. डेटा की सुरक्षा कैसे होती है",
        blocks: [
          {
            list: [
              "ऐप MPIN (केवल salted hash के रूप में रखा जाता है) और वैकल्पिक फिंगरप्रिंट/फेस अनलॉक से सुरक्षित है।",
              "बैकअप फ़ाइलें आपके चुने पासवर्ड से बनी key (PBKDF2, 1,00,000 iterations) से AES-256-GCM द्वारा एन्क्रिप्ट होती हैं। भूला हुआ बैकअप पासवर्ड हम वापस नहीं ला सकते।",
              "ऑनलाइन-मोड कनेक्शन विवरण Android के एन्क्रिप्टेड सुरक्षित स्टोरेज में रहता है।",
              "यह वेबसाइट केवल HTTPS पर, आधुनिक सुरक्षा हेडर्स के साथ चलती है।",
            ],
          },
          "स्टोरेज या ट्रांसमिशन का कोई भी तरीका पूरी तरह सुरक्षित नहीं है। अपना फ़ोन लॉक रखें, MPIN निजी रखें और बैकअप पासवर्ड सुरक्षित रखें।",
        ],
      },
      {
        id: "rights",
        heading: "11. आपके अधिकार",
        blocks: [
          "DPDP अधिनियम की धारा 11 से 14 के तहत आपको अधिकार है कि आप:",
          {
            list: [
              "अपने व्यक्तिगत डेटा, उसकी प्रोसेसिंग और जिनके साथ वह साझा हुआ, उसका सारांश प्राप्त करें;",
              "उसे सुधरवाएँ, पूरा करवाएँ या अपडेट करवाएँ;",
              "जब उद्देश्य के लिए ज़रूरत न रहे या आप सहमति वापस लें, तो उसे मिटवाएँ — जब तक कोई कानून उसे रखना ज़रूरी न बनाए;",
              "कभी भी सहमति वापस लें, उतनी ही आसानी से जितनी आसानी से दी थी;",
              "अपनी शिकायत का जवाब पाएँ; और",
              "मृत्यु या अक्षमता की स्थिति में अपने अधिकारों के उपयोग के लिए किसी अन्य व्यक्ति को नामित करें।",
            ],
          },
          "ऐप में दर्ज डेटा के लिए आप यह सब खुद कर सकते हैं: रिकॉर्ड एडिट या डिलीट करें, ऑनलाइन मोड बंद करें, अनुमतियाँ हटाएँ या ऐप रीसेट करें। जिम मेंबर अपने जिम से संपर्क करें।",
          "हमारे पास मौजूद डेटा (सेक्शन 6) के लिए हमारे शिकायत अधिकारी (सेक्शन 12) को ईमेल करें। यह निःशुल्क है। अनुरोध पर कार्रवाई से पहले हम आपकी पहचान की पुष्टि माँग सकते हैं।",
        ],
      },
      {
        id: "grievance",
        heading: "12. शिकायत अधिकारी",
        blocks: [
          "नाम: {{grievanceName}}",
          "ईमेल: {{grievanceEmail}}",
          "पता: {{companyAddress}}",
          "हम हर शिकायत की पावती {{grievanceAck}} के भीतर देते हैं और {{grievanceResolve}} के भीतर उसे हल करने का प्रयास करते हैं। हमारे जवाब से संतुष्ट न होने पर, इस शिकायत प्रक्रिया का उपयोग करने के बाद, आप DPDP अधिनियम की धारा 13 के अनुसार भारत के डेटा संरक्षण बोर्ड (Data Protection Board of India) में शिकायत कर सकते हैं।",
        ],
      },
      {
        id: "children",
        heading: "13. बच्चे",
        blocks: [
          "GymYardHQ एक बिज़नेस टूल है जो जिम चलाने या वहाँ काम करने वाले वयस्कों (18+) के लिए है। हम जानबूझकर बच्चों का व्यक्तिगत डेटा प्राप्त नहीं करते। 18 वर्ष से कम मेंबर्स का डेटा दर्ज करने वाले जिम को DPDP अधिनियम की धारा 9 के अनुसार माता-पिता या कानूनी अभिभावक की सत्यापन योग्य सहमति लेनी होगी।",
        ],
      },
      {
        id: "breach",
        heading: "14. व्यक्तिगत डेटा उल्लंघन (ब्रीच)",
        blocks: [
          "यदि किसी उल्लंघन से हमारे पास मौजूद व्यक्तिगत डेटा प्रभावित होता है, तो हम DPDP नियमों के अनुसार बिना देरी के भारत के डेटा संरक्षण बोर्ड और हर प्रभावित व्यक्ति को सूचित करेंगे, और 72 घंटे के भीतर बोर्ड को विस्तृत रिपोर्ट भेजेंगे। हम बताएँगे कि क्या हुआ, संभावित प्रभाव क्या है, हम क्या कर रहे हैं और आप खुद को बचाने के लिए क्या कर सकते हैं।",
        ],
      },
      {
        id: "changes",
        heading: "15. इस नीति में बदलाव",
        blocks: [
          "नीति बदलने पर हम इस पेज के ऊपर संस्करण और तारीख अपडेट करते हैं। महत्वपूर्ण बदलावों की जानकारी हम इस वेबसाइट पर और ऐप के रिलीज़ नोट्स में भी देंगे।",
        ],
      },
      {
        id: "contact",
        heading: "16. संपर्क",
        blocks: [
          "{{companyLegalName}}, {{companyAddress}}। ईमेल: {{supportEmail}}। गोपनीयता अनुरोध और शिकायतें: {{grievanceEmail}}।",
        ],
      },
    ],
  },
};
