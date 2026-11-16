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
import SectionHeading from "@/components/ui/SectionHeading";

const icons: Record<Partisipasi["icon"], LucideIcon> = {
  "pen-line": PenLine,
  users: Users,
  "clipboard-list": ClipboardList,
  "message-square-quote": MessageSquareQuote,
  "heart-handshake": HeartHandshake,
};

export default function PartisipasiPublik() {
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
      {/* On desktop the heading sits beside the items as one band; below lg it stacks on top. */}
      <div className="rounded-xl bg-cream px-5 py-8 sm:px-10 sm:py-10 lg:flex lg:items-center lg:gap-10">
        <SectionHeading
          title="Partisipasi Publik"
          tone="maroon"
          size="sm"
          className="lg:w-44 lg:shrink-0"
        />

        {/* Flex-wrap instead of grid so a short last row centres instead of hanging left. */}
        <ul className="mt-8 flex flex-wrap justify-center gap-y-6 lg:mt-0 lg:flex-1 lg:gap-y-0">
          {partisipasis.map((p) => {
            const Icon = icons[p.icon];
            return (
              <li
                key={p.id}
                className="basis-1/2 sm:basis-1/3 lg:basis-0 lg:flex-1 lg:border-l lg:border-cream-ink/15"
              >
                <Link
                  href={p.href}
                  className="group flex h-full flex-col items-center px-2 py-1 text-center focus-visible:outline-maroon"
                >
                  <Icon
                    className="h-8 w-8 text-maroon motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="mt-3 text-sm font-semibold text-cream-ink transition-colors group-hover:text-maroon">
                    {p.title}
                  </span>
                  <span className="mt-0.5 text-[13px] text-cream-ink/75">
                    {p.subtitle}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
