import {
  CreditCardIcon,
  DashboardSquare01Icon,
  Megaphone01Icon,
  Notification01Icon,
  Settings01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../icon";

/** Demo data only — fictional gym and members. */
const stats = [
  { label: "Total Members", value: "248", tone: "text-white" },
  { label: "Active", value: "212", tone: "text-active" },
  { label: "Due Today", value: "6", tone: "text-due" },
  { label: "Due Soon", value: "14", tone: "text-due" },
  { label: "Overdue", value: "9", tone: "text-overdue" },
  { label: "Expiring Soon", value: "11", tone: "text-lime" },
];

const payments = [
  { initials: "RS", name: "Rahul S.", plan: "Quarterly", amount: "₹4,500", status: "Paid", tone: "bg-active/15 text-active" },
  { initials: "AK", name: "Aman K.", plan: "Monthly", amount: "₹1,500", status: "Due", tone: "bg-due/15 text-due" },
];

const nav = [
  { icon: DashboardSquare01Icon, label: "Dashboard", active: true },
  { icon: UserGroupIcon, label: "Members" },
  { icon: CreditCardIcon, label: "Payments" },
  { icon: Megaphone01Icon, label: "News" },
  { icon: Settings01Icon, label: "Settings" },
];

/**
 * A pure HTML/CSS rendering of the app's dashboard — sharp at every size,
 * no image request, and fixed dimensions so it never shifts layout.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="GymYardHQ dashboard showing member counts, dues and recent payments"
      className={`relative aspect-[9/19] w-[280px] rounded-[2.75rem] border border-white/10 bg-[#050608] p-2.5 shadow-[0_40px_120px_-20px_rgba(181,246,61,0.25)] ${className}`}
    >
      <div aria-hidden className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] bg-ink">
        {/* status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[10px] font-semibold text-white/70">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-black" />
          <span>100%</span>
        </div>

        {/* app bar */}
        <div className="flex items-center justify-between px-4 pb-3 pt-2">
          <div className="min-w-0">
            <p className="text-[10px] text-muted">Good morning, Coach</p>
            <p className="truncate text-[15px] font-black tracking-wide">IRON YARD FITNESS</p>
          </div>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-surface">
            <Icon icon={Notification01Icon} size={16} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
        </div>

        {/* summary cards */}
        <div className="grid grid-cols-2 gap-2 px-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-surface px-3 py-2.5">
              <p className={`text-xl font-black leading-none ${s.tone}`}>{s.value}</p>
              <p className="mt-1 truncate text-[9.5px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* revenue strip */}
        <div className="mx-4 mt-2.5 flex items-end justify-between rounded-2xl bg-lime px-3 py-2.5 text-ink">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider opacity-70">This month</p>
            <p className="text-lg font-black leading-tight">₹1,84,500</p>
          </div>
          <div className="flex h-7 items-end gap-[3px]">
            {[40, 65, 45, 80, 60, 95, 75].map((h, i) => (
              <span key={i} className="w-1.5 rounded-sm bg-ink/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* recent payments */}
        <p className="px-4 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted">Recent payments</p>
        <ul className="space-y-1.5 px-4">
          {payments.map((p) => (
            <li key={p.name} className="flex items-center gap-2.5 rounded-xl bg-surface px-2.5 py-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-[9px] font-bold text-lime">
                {p.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold">{p.name}</span>
                <span className="block text-[9px] text-muted">{p.plan}</span>
              </span>
              <span className="text-right">
                <span className="block text-[11px] font-bold">{p.amount}</span>
                <span className={`mt-0.5 inline-block rounded-full px-1.5 text-[8px] font-semibold ${p.tone}`}>{p.status}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* bottom nav */}
        <div className="mt-auto grid grid-cols-5 border-t border-line bg-surface px-1 pb-4 pt-2">
          {nav.map((n) => (
            <span key={n.label} className={`flex flex-col items-center gap-0.5 ${n.active ? "text-lime" : "text-muted"}`}>
              <Icon icon={n.icon} size={16} />
              <span className="text-[8px] font-semibold">{n.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
