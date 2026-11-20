import type { LegalEntry } from "./types";

/**
 * Data deletion instructions — the URL given to Google Play in
 * Data safety → "Delete data" / "Delete account". Steps match the app's
 * Settings and member-profile screens (verified 2026-11-20).
 */
export const dataDeletion: LegalEntry = {
  slug: "data-deletion",
  version: "2026-11-20",
  lastUpdated: "2026-11-20",
  en: {
    title: "Delete Your Data",
    summary:
      "GymYardHQ has no online account with us — your data lives on your phone (or in your own database), so you can delete it yourself at any time. Here is how.",
    sections: [
      {
        id: "no-account",
        heading: "No account to close",
        blocks: [
          "GymYardHQ does not create an account on our servers. {{companyBrand}} does not store the gym, member or payment data you record, so there is nothing for us to delete on your behalf. You are in full control.",
        ],
      },
      {
        id: "delete-everything",
        heading: "1. Delete all app data",
        blocks: [
          {
            steps: [
              "Open GymYardHQ and unlock it with your MPIN or fingerprint.",
              "Open Settings.",
              "Tap \"Reset Application Data\".",
              "Confirm with \"Wipe Everything\".",
            ],
          },
          "All members, payments, receipts, trainers, events and settings are permanently removed from the phone. This cannot be undone, so export a backup first if you might need the data later.",
        ],
      },
      {
        id: "delete-member",
        heading: "2. Delete a single member",
        blocks: [
          {
            steps: [
              "Open the member's profile.",
              "Open the menu and tap \"Delete\", then confirm.",
              "If the member has bills or payments, the app asks you to archive them first to protect your financial history. You can permanently delete archived members from Settings → Archived Members.",
            ],
          },
        ],
      },
      {
        id: "uninstall",
        heading: "3. Uninstall the app",
        blocks: [
          "Uninstalling GymYardHQ (Android Settings → Apps → GymYardHQ → Uninstall) deletes its database and secure storage from the phone. If Android's device backup is on in your phone settings, also delete the GymYardHQ backup from your Google account (Google Drive → Backups).",
        ],
      },
      {
        id: "backups",
        heading: "4. Backup files and Online mode",
        blocks: [
          {
            list: [
              "Backup files (.gymbackup) you exported stay wherever you saved them. Delete them from that folder, drive or chat.",
              "If you used Online mode, your data is also in your own MongoDB database. Delete it there, or ask your database provider.",
            ],
          },
        ],
      },
      {
        id: "members",
        heading: "Are you a gym member?",
        blocks: [
          "Your gym holds your membership data on its own device. Please ask your gym to delete it. We cannot access it.",
        ],
      },
      {
        id: "our-data",
        heading: "Data we hold about you",
        blocks: [
          "If you have emailed us, we hold your email and messages. To have them deleted, email {{grievanceEmail}} with the subject \"Delete my data\" from the same address. We acknowledge within {{grievanceAck}} and complete the deletion within {{grievanceResolve}}, except where a law requires us to keep a record. The request is free.",
        ],
      },
    ],
  },
  hi: {
    title: "अपना डेटा मिटाएँ",
    summary:
      "GymYardHQ में हमारे पास कोई ऑनलाइन खाता नहीं बनता — आपका डेटा आपके फ़ोन (या आपके अपने डेटाबेस) में रहता है, इसलिए आप उसे कभी भी खुद मिटा सकते हैं। तरीका नीचे है।",
    sections: [
      {
        id: "no-account",
        heading: "बंद करने के लिए कोई खाता नहीं",
        blocks: [
          "GymYardHQ हमारे सर्वर पर कोई खाता नहीं बनाता। {{companyBrand}} आपका दर्ज किया जिम, मेंबर या पेमेंट डेटा नहीं रखता, इसलिए हमें आपकी ओर से कुछ मिटाना नहीं पड़ता। पूरा नियंत्रण आपके पास है।",
        ],
      },
      {
        id: "delete-everything",
        heading: "1. ऐप का सारा डेटा मिटाएँ",
        blocks: [
          {
            steps: [
              "GymYardHQ खोलें और MPIN या फिंगरप्रिंट से अनलॉक करें।",
              "Settings खोलें।",
              "\"Reset Application Data\" (एप्लिकेशन डेटा रीसेट करें) पर टैप करें।",
              "\"Wipe Everything\" (सब कुछ मिटाएं) से पुष्टि करें।",
            ],
          },
          "सभी मेंबर, पेमेंट, रसीदें, ट्रेनर, इवेंट्स और सेटिंग्स फ़ोन से स्थायी रूप से मिट जाती हैं। इसे वापस नहीं लाया जा सकता, इसलिए ज़रूरत हो तो पहले बैकअप एक्सपोर्ट कर लें।",
        ],
      },
      {
        id: "delete-member",
        heading: "2. किसी एक मेंबर को मिटाएँ",
        blocks: [
          {
            steps: [
              "मेंबर की प्रोफ़ाइल खोलें।",
              "मेनू खोलकर \"Delete\" (हटाएं) पर टैप करें और पुष्टि करें।",
              "अगर मेंबर के बिल या पेमेंट हैं, तो वित्तीय इतिहास बचाने के लिए ऐप पहले आर्काइव करने को कहता है। आर्काइव मेंबर्स को Settings → Archived Members से स्थायी रूप से मिटाया जा सकता है।",
            ],
          },
        ],
      },
      {
        id: "uninstall",
        heading: "3. ऐप अनइंस्टॉल करें",
        blocks: [
          "GymYardHQ अनइंस्टॉल करने पर (Android Settings → Apps → GymYardHQ → Uninstall) उसका डेटाबेस और सुरक्षित स्टोरेज फ़ोन से मिट जाता है। अगर आपकी फ़ोन सेटिंग्स में Android डिवाइस बैकअप चालू है, तो अपने Google खाते से GymYardHQ का बैकअप भी मिटाएँ (Google Drive → Backups)।",
        ],
      },
      {
        id: "backups",
        heading: "4. बैकअप फ़ाइलें और ऑनलाइन मोड",
        blocks: [
          {
            list: [
              "आपकी एक्सपोर्ट की गई बैकअप फ़ाइलें (.gymbackup) जहाँ आपने सेव कीं वहीं रहती हैं। उन्हें उस फ़ोल्डर, ड्राइव या चैट से मिटाएँ।",
              "अगर आपने ऑनलाइन मोड इस्तेमाल किया है, तो आपका डेटा आपके अपने MongoDB डेटाबेस में भी है। उसे वहाँ से मिटाएँ या अपने डेटाबेस प्रोवाइडर से कहें।",
            ],
          },
        ],
      },
      {
        id: "members",
        heading: "क्या आप जिम मेंबर हैं?",
        blocks: [
          "आपका मेंबरशिप डेटा आपके जिम के अपने डिवाइस पर रहता है। कृपया उसे मिटाने के लिए अपने जिम से कहें। हम उसे देख नहीं सकते।",
        ],
      },
      {
        id: "our-data",
        heading: "आपके बारे में हमारे पास मौजूद डेटा",
        blocks: [
          "अगर आपने हमें ईमेल किया है, तो हमारे पास आपका ईमेल और संदेश हैं। उन्हें मिटवाने के लिए उसी पते से {{grievanceEmail}} पर \"Delete my data\" विषय के साथ ईमेल करें। हम {{grievanceAck}} के भीतर पावती देते हैं और {{grievanceResolve}} के भीतर डेटा मिटा देते हैं, सिवाय उसके जिसे कोई कानून रखना ज़रूरी बनाता है। यह अनुरोध निःशुल्क है।",
        ],
      },
    ],
  },
};
