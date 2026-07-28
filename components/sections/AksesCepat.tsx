import Link from "next/link";
import { Box, Images, Map, Newspaper, type LucideIcon } from "lucide-react";
import { aksesCepat, type QuickAccess } from "@/lib/content";

const icons: Record<QuickAccess["icon"], LucideIcon> = {
  cube: Box,
  images: Images,
  newspaper: Newspaper,
  map: Map,
};

export default function AksesCepat() {
  return (
    <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
      <div className="ring-gold-frame grid grid-cols-1 gap-y-6 rounded-lg bg-panel/95 p-6 backdrop-blur sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0 lg:p-4">
        {/* Label */}
        <div className="flex items-center gap-3 lg:border-r lg:border-hairline lg:pr-4">
          <span className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-gold">
            Akses
            <br />
            Cepat
          </span>
        </div>

        {aksesCepat.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-center gap-3 px-1 lg:px-4 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-hairline"
            >
              <Icon
                className="h-8 w-8 shrink-0 text-gold/80 transition-colors group-hover:text-gold"
                strokeWidth={1.25}
                aria-hidden
              />
              <span className="leading-tight">
                <span className="block text-sm font-semibold uppercase tracking-wide text-cream transition-colors group-hover:text-gold">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {item.subtitle}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
