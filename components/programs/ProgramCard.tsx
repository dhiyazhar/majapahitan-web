import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { ProgramItem } from "@/lib/payload";

type Props = {
  program: ProgramItem;
  className?: string;
};

export default function ProgramCard({ program, className = "" }: Props) {
  const programHref = `/program/${program.slug}`;
  const actionHref = program.ctaUrl && program.ctaUrl.startsWith("http") ? program.ctaUrl : programHref;
  const isExternal = program.ctaUrl && program.ctaUrl.startsWith("http");

  return (
    <article
      className={`group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1 ${className}`}
    >
      <div>
        {/* Cover Image */}
        <Link href={programHref} className="relative block h-52 w-full overflow-hidden bg-ink sm:h-56">
          <ImageSlot
            src={program.coverImage || program.image}
            alt={program.title}
            label={program.title}
            position="absolute"
            className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80" />

          {/* Program Type Badge */}
          {program.programType ? (
            <span className="absolute top-3 left-3 rounded-sm bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
              {program.programType}
            </span>
          ) : null}
        </Link>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Metadata Row: Date & Venue */}
          <div className="flex flex-col gap-1.5 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="font-medium text-cream/90">{program.eventDate}</span>
            </div>
            {program.location ? (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="truncate text-cream/80">{program.location}</span>
              </div>
            ) : null}
          </div>

          {/* Title */}
          <h3 className="mt-3 font-sans text-base font-bold leading-snug text-cream transition-colors group-hover:text-gold sm:text-lg">
            <Link href={programHref}>{program.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-cream/85">
            {program.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="border-t border-hairline/50 p-5 pt-3 sm:p-6 sm:pt-3 flex items-center justify-between">
        <Link
          href={actionHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-soft transition-colors group-hover:text-gold"
        >
          <span>{program.ctaLabel || "Lihat Detail Program"}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
