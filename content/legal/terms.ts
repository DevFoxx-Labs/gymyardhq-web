import type { LegalEntry } from "./types";

/** Terms of Service — draft for lawyer review, not legal advice. */
export const terms: LegalEntry = {
  slug: "terms",
  version: "2026-11-20",
  lastUpdated: "2026-11-20",
  en: {
    title: "Terms of Service",
    summary:
      "The rules for using the GymYardHQ app and this website — what you can expect from us, and what we expect from you as a gym owner or staff member.",
    sections: [
      {
        id: "agreement",
        heading: "1. Agreement",
        blocks: [
          "These Terms are an agreement between you and {{companyLegalName}} (\"{{companyBrand}}\", \"we\", \"us\"), {{companyAddress}}. By downloading, installing or using the GymYardHQ app (\"App\") or this website, you agree to these Terms and to our Privacy Policy. If you do not agree, do not use the App.",
          "The App is a business tool for gym owners, fitness studios, trainers and their staff. You must be at least 18 years old and able to enter into a binding contract under Indian law. If you use the App for a business, you confirm that you are authorised to accept these Terms for it.",
        ],
      },
      {
        id: "service",
        heading: "2. The service",
        blocks: [
          "GymYardHQ helps you manage members, plans, packages, trainers, payments, bills, receipts, expenses, reminders, announcements and reports. It works offline and stores data on your device. You do not create an account with us.",
          "Online mode is optional: it lets you connect a MongoDB database that you own or rent. That database and its provider are your responsibility.",
          "The App is currently free. If we ever introduce paid features, we will show the price and terms clearly before you pay, and a Refund & Cancellation Policy will apply.",
        ],
      },
      {
        id: "licence",
        heading: "3. Your licence to use the App",
        blocks: [
          "We give you a personal, non-exclusive, non-transferable, revocable licence to install and use the App for running your gym, in line with these Terms and the Google Play terms. You must not:",
          {
            list: [
              "copy, modify, resell, rent or distribute the App, or remove our brand or notices;",
              "reverse engineer or decompile the App, except as far as the law allows despite this restriction;",
              "use the App for anything unlawful, fraudulent, or to harass, spam or harm anyone;",
              "try to break or bypass the App's security, such as the MPIN, receipt QR verification or backup encryption.",
            ],
          },
        ],
      },
      {
        id: "your-data",
        heading: "4. Your data and your responsibilities",
        blocks: [
          "You own the data you record in the App. We do not receive it. Because you decide what to record about your members and staff, you are the Data Fiduciary for that data under the Digital Personal Data Protection Act, 2023. You are responsible for:",
          {
            list: [
              "giving your members a privacy notice and getting their consent where the law requires it — including verifiable consent of a parent or guardian for members under 18;",
              "recording only what you need, keeping it accurate, and correcting or erasing it when a member asks and the law allows;",
              "keeping your phone, MPIN and backup password secure;",
              "making regular backups. We cannot recover data from a lost or reset phone, or a backup whose password is forgotten;",
              "the security and lawful use of any database you connect in Online mode.",
            ],
          },
        ],
      },
      {
        id: "payments",
        heading: "5. Payments, bills and receipts",
        blocks: [
          "The App does not process, hold or transfer money. A bill's UPI QR code only contains the UPI ID you entered; any payment happens between your member and you through their own UPI app and bank. We are not a bank, payment aggregator or payment gateway.",
          "Check that money has actually reached your account before you mark a payment as received or issue a receipt. Receipts and reports are records you create. You are responsible for their accuracy and for your own tax and accounting obligations, such as GST where it applies. The App does not give accounting, tax or legal advice.",
        ],
      },
      {
        id: "messages",
        heading: "6. Reminders and messages",
        blocks: [
          "SMS and WhatsApp messages are sent through the apps on your phone, by you. Send messages only to members who expect them, and follow the laws and platform rules that apply to business messages.",
          "Reminders are scheduled on your phone. Android battery settings, permissions or device restarts can delay or block them; do not rely on them as your only record of dues.",
        ],
      },
      {
        id: "third-party",
        heading: "7. Third-party services",
        blocks: [
          "The App works with services we do not control, such as Google Play, UPI apps, SMS and WhatsApp, printers and MongoDB providers. Their own terms and privacy policies apply, and we are not responsible for them.",
        ],
      },
      {
        id: "ip",
        heading: "8. Intellectual property",
        blocks: [
          "The App, its code, design, the GymYardHQ name, logo and mascot belong to {{companyBrand}} or its licensors. These Terms do not give you any right to use them except to use the App as allowed above.",
        ],
      },
      {
        id: "changes-to-app",
        heading: "9. Updates and availability",
        blocks: [
          "We may update, change or remove features to improve the App, fix problems or follow the law. We try to keep the App working well but do not promise that it will always be available, error-free or compatible with every device.",
        ],
      },
      {
        id: "disclaimer",
        heading: "10. Disclaimer",
        blocks: [
          "To the extent the law allows, the App and website are provided \"as is\" and \"as available\", without warranties of any kind beyond those that cannot be excluded under Indian law.",
        ],
      },
      {
        id: "liability",
        heading: "11. Limitation of liability",
        blocks: [
          "To the extent the law allows, we are not liable for indirect or consequential losses, lost profits, or loss of data caused by device loss, reset, uninstalling, forgotten passwords or third-party services. Our total liability for any claim relating to the App is limited to the amount you paid us for the App in the 12 months before the claim. Nothing in these Terms limits liability that cannot be limited by law.",
        ],
      },
      {
        id: "indemnity",
        heading: "12. Indemnity",
        blocks: [
          "You agree to compensate us for claims by third parties, including your members, that arise from your breach of these Terms or of the law in how you use the App or the data you record.",
        ],
      },
      {
        id: "termination",
        heading: "13. Ending these Terms",
        blocks: [
          "You can stop using the App at any time by uninstalling it. We may suspend or end your licence if you seriously breach these Terms. Sections 4, 5, 8, 10, 11, 12 and 14 continue after the Terms end.",
        ],
      },
      {
        id: "law",
        heading: "14. Governing law and disputes",
        blocks: [
          "These Terms are governed by the laws of India. Subject to any consumer-protection rights you have, the courts at {{jurisdictionCity}} have exclusive jurisdiction. Please contact us first — most problems can be solved quickly.",
        ],
      },
      {
        id: "changes",
        heading: "15. Changes to these Terms",
        blocks: [
          "When these Terms change, we update the version and date at the top of this page. If a change is material, we will say so on this website and in the App's release notes. Continuing to use the App after a change means you accept the new Terms.",
        ],
      },
      {
        id: "contact",
        heading: "16. Contact and grievances",
        blocks: [
          "Support: {{supportEmail}}. Grievance Officer: {{grievanceName}}, {{grievanceEmail}}. We acknowledge grievances within {{grievanceAck}} and aim to resolve them within {{grievanceResolve}}.",
        ],
      },
    ],
  },
};
