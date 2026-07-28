import Link from "next/link";
import {
  ClipboardList,
  HeartHandshake,
  MessageSquareQuote,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import { partisipasis, type Partisipasi } from "@/lib/content";

const icons: Record<Partisipasi["icon"], LucideIcon> = {
  "pen-line": PenLine,
  users: Users,
  "clipboard-list": ClipboardList,
  "message-square-quote": MessageSquareQuote,
  "heart-handshake": HeartHandshake,
};

export default function PartisipasiPublik() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="rounded-xl bg-cream p-7 sm:p-9">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-maroon sm:text-3xl">
          Partisipasi Publik
        </h2>

        <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {partisipasis.map((p) => {
            const Icon = icons[p.icon];
            return (
              <Link
                key={p.id}
                href={p.href}
                className="group flex flex-col items-center text-center"
              >
                <Icon
                  className="h-9 w-9 text-maroon transition-transform group-hover:-translate-y-0.5"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <span className="mt-3 text-sm font-semibold text-cream-ink">
                  {p.title}
                </span>
                <span className="mt-0.5 text-xs text-cream-ink/60">
                  {p.subtitle}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
