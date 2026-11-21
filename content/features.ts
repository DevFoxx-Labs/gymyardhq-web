/**
 * Feature landing pages (/features/[slug]). Each targets one search intent.
 * Every claim matches the GymYardHQ Flutter app (verified against its source,
 * 2026-11-20). Do not add features the app does not have.
 */
export type FeaturePage = {
  slug: string;
  /** <title> (≤ 60 chars incl. " · GymYardHQ"). */
  title: string;
  /** Meta description (≤ 155 chars). */
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string; points?: string[] }[];
  faqs: { q: string; a: string }[];
  /** Scene image key in assets/scenes. */
  scene: "fees" | "reminders" | "members" | "receipts";
  sceneAlt: string;
};

export const featurePages: FeaturePage[] = [
  {
    slug: "gym-fee-reminders",
    title: "Gym Fee Reminder App",
    description:
      "Automatic gym fee-due and membership-expiry reminders on your phone, with ready SMS and WhatsApp messages. Free, offline gym app for India.",
    eyebrow: "Gym fee reminders",
    h1: "Gym fee reminders that collect dues for you.",
    intro:
      "Most gyms lose money not because members refuse to pay, but because nobody reminds them on time. GymYardHQ watches every membership and tells you who is due today, who is due soon and whose membership is about to expire — then gives you the message to send.",
    sections: [
      {
        heading: "Automatic due and expiry alerts",
        body: "Reminders are scheduled on your phone from each member's plan and expiry date. You see them as notifications and on the dashboard, so you start every day knowing exactly whom to follow up with.",
        points: ["Due today and due soon", "Overdue members", "Membership expiring soon", "Re-scheduled automatically after the phone restarts"],
      },
      {
        heading: "Ready-made SMS and WhatsApp messages",
        body: "Open a member and send a polite fee reminder by SMS or WhatsApp in one tap. The message is pre-filled with the member's name and dues, and it goes from your own phone and number.",
      },
      {
        heading: "Works without internet",
        body: "Reminders run on the phone itself, so they keep working in basements, small towns and anywhere the network is weak. There is no server and no monthly fee.",
      },
    ],
    faqs: [
      { q: "Does GymYardHQ send SMS automatically?", a: "No. It reminds you and prepares the SMS or WhatsApp message; you send it from your phone with one tap, so members always hear from your own number." },
      { q: "Do reminders work offline?", a: "Yes. Reminders are scheduled on your phone and do not need internet." },
    ],
    scene: "reminders",
    sceneAlt: "GymYardHQ lion mascot checking fee reminders on a phone in a gym",
  },
  {
    slug: "upi-gym-billing",
    title: "Gym Billing App with UPI QR",
    description:
      "Create gym bills with a UPI QR code for GPay, PhonePe, Paytm or BHIM, record payments and share numbered PDF receipts on WhatsApp. Free for gym owners.",
    eyebrow: "UPI gym billing",
    h1: "Gym billing with UPI QR — paid in seconds.",
    intro:
      "Members in India pay by UPI. GymYardHQ puts a UPI QR code with your own UPI ID on every bill, so members scan and pay straight into your bank account — then you record the payment and send a professional receipt.",
    sections: [
      {
        heading: "A UPI QR on every bill",
        body: "Generate a bill for any member and share it. The QR works with GPay, PhonePe, Paytm, BHIM and every other UPI app. Money goes directly to you; the app never touches it.",
        points: ["Your own UPI ID", "Plan, package and amount on the bill", "Your gym logo and details", "Share as PDF on WhatsApp"],
      },
      {
        heading: "Record payments and track dues",
        body: "Mark the payment once it reaches your account. GymYardHQ keeps every member's payment history and updates what is still due, so your accounts are always current.",
      },
      {
        heading: "Print or share",
        body: "Print bills and receipts on A4 or a thermal printer, or share them as PDF files from your phone.",
      },
    ],
    faqs: [
      { q: "Does GymYardHQ take a commission on payments?", a: "No. GymYardHQ is not a payment gateway. Members pay you directly by UPI; the app only shows the QR and records the payment." },
      { q: "Which UPI apps work with the bill QR?", a: "Any UPI app, including Google Pay, PhonePe, Paytm and BHIM." },
    ],
    scene: "fees",
    sceneAlt: "GymYardHQ lion mascot collecting gym fees by UPI on a smartphone",
  },
  {
    slug: "gym-receipt-app",
    title: "Gym Receipt App with QR Verification",
    description:
      "Professional PDF gym receipts with automatic numbers and a tamper-check QR you can verify offline. Print or share on WhatsApp. Free gym app.",
    eyebrow: "Gym receipts",
    h1: "Professional gym receipts members can trust.",
    intro:
      "Handwritten receipt books get lost and are easy to fake. GymYardHQ creates a clean PDF receipt for every payment, numbers it automatically and adds a QR code that proves it has not been changed.",
    sections: [
      {
        heading: "Automatic receipt numbers",
        body: "Every receipt gets the next number in sequence, so your records have no gaps or duplicates.",
        points: ["Sequential receipt numbers", "Member, plan and amount", "Your gym logo and address", "PDF, ready to share or print"],
      },
      {
        heading: "Tamper-check QR, verified offline",
        body: "Each receipt carries a QR code built from its details. Scan it with the app's built-in scanner to confirm the receipt is genuine — no internet needed.",
      },
      {
        heading: "Thermal or A4",
        body: "Choose a print format that suits your counter: thermal printer roll or a full A4 page.",
      },
    ],
    faqs: [
      { q: "Can a member check that a receipt is real?", a: "Yes. The gym can scan the receipt's QR code in GymYardHQ to verify it has not been edited." },
      { q: "Can I send receipts on WhatsApp?", a: "Yes. Every receipt is a PDF you can share on WhatsApp or any other app." },
    ],
    scene: "receipts",
    sceneAlt: "GymYardHQ lion mascot scanning a gym receipt QR code with a phone",
  },
  {
    slug: "gym-member-management",
    title: "Gym Member Management App",
    description:
      "Manage gym members, plans, packages and trainers in one app. Photos, history, archive and one-tap call, SMS or WhatsApp. Free and offline.",
    eyebrow: "Gym member management",
    h1: "Every gym member, organised in one app.",
    intro:
      "Registers and spreadsheets fall apart as a gym grows. GymYardHQ keeps every member's details, plan, trainer and history together on your phone, with the dashboard showing who is active, due or overdue.",
    sections: [
      {
        heading: "Complete member profiles",
        body: "Add members with photo, phone, email, gender and date of birth, then assign a plan or package and a trainer.",
        points: ["Monthly, quarterly and yearly plans", "Packages", "Trainer assignment", "Plan and trainer change history"],
      },
      {
        heading: "Archive instead of losing history",
        body: "Members who leave can be archived and restored later, so their payment history stays intact. Members without payment records can be deleted permanently.",
      },
      {
        heading: "Contact members in one tap",
        body: "Call, SMS or WhatsApp any member directly from their profile, or save their number to your phone contacts.",
      },
    ],
    faqs: [
      { q: "Is my members' data uploaded anywhere?", a: "No. Member data is stored on your phone. An optional Online mode can sync to a MongoDB database that you own." },
      { q: "Can I use GymYardHQ in Hindi?", a: "Yes. The whole app can be switched to Hindi in Settings." },
    ],
    scene: "members",
    sceneAlt: "GymYardHQ lion mascot welcoming gym members at the front desk",
  },
];

export function getFeaturePage(slug: string) {
  return featurePages.find((f) => f.slug === slug);
}
