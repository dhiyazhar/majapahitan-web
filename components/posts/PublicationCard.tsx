import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { PublikasiItem } from "@/lib/content";

type Props = {
  item: PublikasiItem;
  className?: string;
};

/**
 * One bibliography entry: a text row, not a boxed card. Meant to sit in a
 * `divide-y` list. Year and type on the left, citation details on the right.
 */
export default function PublicationCard({ item, className = "" }: Props) {
  const issue = [
    item.volume ? `Vol. ${item.volume}` : null,
    item.issue ? `No. ${item.issue}` : null,
    item.pages ? `hlm. ${item.pages}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className={`grid gap-3 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 ${className}`}>
      <div className="flex items-baseline gap-3 sm:block">
        <p className="font-display text-2xl font-semibold text-gold">{item.year}</p>
        <p className="text-sm text-muted sm:mt-1">{item.typeBadge}</p>
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-bold leading-snug text-cream">
          <Link
            href={`/publikasi/${item.slug}`}
            className="transition-colors hover:text-gold"
          >
            {item.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-cream/90">{item.authors.join(", ")}</p>
        <p className="mt-1 text-sm text-muted">
          <span className="italic">{item.publicationName}</span>
          {issue ? `, ${issue}` : null}
          {item.sintaBadge ? (
            <span className="ml-2 rounded-sm border border-gold/40 px-1.5 py-0.5 text-xs font-semibold text-gold-soft">
              {item.sintaBadge}
            </span>
          ) : null}
        </p>
        {item.doi ? (
          <p className="mt-1 text-sm text-muted">
            DOI:{" "}
            <a
              href={`https://doi.org/${item.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-gold-soft underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
            >
              {item.doi}
            </a>
          </p>
        ) : null}

        <p className="mt-4 line-clamp-2 max-w-prose text-sm leading-relaxed text-cream/80">
          {item.abstract}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-gold-deep px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Buka di E-Library
            <ExternalLink className="h-4 w-4" aria-hidden />
            <span className="sr-only">(membuka tab baru)</span>
          </a>
          <Link
            href={`/publikasi/${item.slug}`}
            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-soft transition-colors hover:text-gold"
          >
            Detail naskah
            <ArrowRight
              className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
              aria-hidden
            />
            <span className="sr-only">: {item.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
