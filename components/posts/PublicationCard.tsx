import Link from "next/link";
import { ExternalLink, BookOpen, Users, ArrowRight, Award } from "lucide-react";
import type { PublikasiItem } from "@/lib/content";

type Props = {
  item: PublikasiItem;
  className?: string;
};

export default function PublicationCard({ item, className = "" }: Props) {
  return (
    <article
      className={`group flex flex-col justify-between overflow-hidden rounded-xl bg-panel p-6 ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1 sm:p-7 ${className}`}
    >
      <div>
        {/* Header Badge (SINTA) & Year */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
          <div>
            {item.sintaBadge ? (
              <span className="inline-flex items-center gap-1.5 rounded-sm bg-maroon px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <Award className="h-3.5 w-3.5 text-white" aria-hidden />
                {item.sintaBadge}
              </span>
            ) : null}
          </div>
          <span className="text-xs font-semibold text-gold-soft">
            Tahun {item.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-sans text-base font-bold leading-snug text-cream transition-colors group-hover:text-gold sm:text-lg">
          <Link href={`/publikasi/${item.slug}`}>{item.title}</Link>
        </h3>

        {/* Authors & Publisher Meta */}
        <div className="mt-3.5 space-y-1.5 text-xs text-muted">
          <div className="flex items-start gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-gold pt-0.5" />
            <span className="text-cream/90 font-medium">
              {item.authors.join(", ")}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-gold pt-0.5" />
            <span className="text-cream/75">{item.publicationName}</span>
          </div>
          {item.doi ? (
            <div className="text-[11px] text-muted">
              <span>DOI: </span>
              <span className="font-mono text-gold-soft">{item.doi}</span>
            </div>
          ) : null}
        </div>

        {/* Abstract */}
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-cream/85">
          {item.abstract}
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline/60 pt-4">
        {/* Direct Link to E-Library */}
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-gold-soft hover:shadow-md"
        >
          <span>Buka di E-Library</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        {/* View Details Link */}
        <Link
          href={`/publikasi/${item.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gold-soft hover:text-gold transition-colors"
        >
          <span>Detail Naskah</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
