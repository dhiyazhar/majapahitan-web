"use client";

import ImageSlot from "@/components/ui/ImageSlot";
import type { KaryaItem } from "@/lib/content";

type Props = {
  item: KaryaItem;
  onClick: () => void;
  className?: string;
};

/** Same treatment as the home page's KoleksiHighlight: bare image, text on the page. Opens the lightbox. */
export default function ArtworkCard({ item, onClick, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={`group block w-full self-start text-left ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-hairline">
        <ImageSlot
          src={item.image}
          alt=""
          label={item.title}
          position="absolute"
          className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-gold transition-colors group-hover:text-gold-soft">
        {item.title}
      </h3>
      <p className="mt-1 text-sm text-muted">
        {item.categoryLabel} · {item.creator} · {item.year}
      </p>
    </button>
  );
}
