"use client";

import { Eye, User } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { KaryaItem } from "@/lib/content";

type Props = {
  item: KaryaItem;
  onClick: () => void;
  className?: string;
};

export default function ArtworkCard({ item, onClick, className = "" }: Props) {
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Buka detail karya: ${item.title}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-panel p-4 ring-gold-frame transition-all duration-300 hover:-translate-y-1 hover:bg-panel-2 hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold ${className}`}
    >
      {/* Visual Image Viewport */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/40">
        <ImageSlot
          src={item.image}
          alt={item.title}
          label={item.title}
          position="absolute"
          className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category Badge Top Left */}
        <span
          className={`absolute top-2.5 left-2.5 rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${
            item.category === "publik"
              ? "bg-maroon text-cream"
              : item.category === "otentik"
              ? "bg-gold text-ink"
              : "bg-black/80 border border-gold/40 text-gold"
          }`}
        >
          {item.categoryLabel}
        </span>

        {/* Hover Inspect Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-gold shadow-lg backdrop-blur">
            <Eye className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-sans text-base font-bold leading-snug text-cream transition-colors group-hover:text-gold">
            {item.title}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <User className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="truncate">{item.creator}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3 text-[11px] text-muted">
          <span>{item.year}</span>
          <span className="font-semibold text-gold group-hover:underline">
            Buka Pratinjau
          </span>
        </div>
      </div>
    </article>
  );
}
