import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { BeritaItem } from "@/lib/payload";

type Props = {
  berita: BeritaItem;
  className?: string;
};

/**
 * One news row, same structure as the home page's "Berita Terbaru" list:
 * date on the left, thumbnail and headline in the middle, arrow on the right.
 * The whole row is one link. Meant to sit in a `divide-y` list.
 */
export default function BeritaCard({ berita, className = "" }: Props) {
  return (
    <Link
      href={`/berita/${berita.slug}`}
      className={`group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-2 py-6 sm:grid-cols-[9rem_minmax(0,1fr)_auto] ${className}`}
    >
      <p className="col-span-2 text-sm text-muted sm:col-span-1">
        <time className="tabular-nums">{berita.publishedAt}</time>
        <span className="sm:block">
          <span className="sm:hidden"> · </span>
          {berita.readingTime}
        </span>
      </p>

      <span className="flex min-w-0 items-start gap-5">
        <ImageSlot
          src={berita.coverImage || berita.image}
          alt=""
          className="hidden h-20 w-32 shrink-0 overflow-hidden rounded-sm ring-1 ring-hairline sm:block"
          sizes="128px"
        />
        <span className="min-w-0">
          {berita.subcategory ? (
            <span className="block text-sm text-gold-soft">{berita.subcategory}</span>
          ) : null}
          <span className="mt-0.5 block text-lg font-semibold leading-snug text-cream transition-colors group-hover:text-gold">
            {berita.title}
          </span>
          <span className="mt-2 line-clamp-2 block max-w-prose text-sm leading-relaxed text-cream/75">
            {berita.excerpt}
          </span>
        </span>
      </span>

      <ArrowRight
        className="mt-1.5 h-4 w-4 shrink-0 text-gold/70 group-hover:text-gold motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
