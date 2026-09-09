import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { ProgramItem } from "@/lib/payload";

type Props = {
  program: ProgramItem;
};

export default function FeaturedProgramHero({ program }: Props) {
  const programHref = `/program/${program.slug}`;
  const actionHref = program.ctaUrl && program.ctaUrl.startsWith("http") ? program.ctaUrl : programHref;
  const isExternal = program.ctaUrl && program.ctaUrl.startsWith("http");

  return (
    <article className="group overflow-hidden rounded-xl bg-panel p-5 ring-gold-frame transition-all duration-300 hover:bg-panel-2 sm:p-8">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Big Poster */}
        <div className="lg:col-span-7">
          <Link href={programHref} className="relative block h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-[380px]">
            <ImageSlot
              src={program.coverImage || program.image}
              alt={program.title}
              label={program.title}
              position="absolute"
              className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span className="inline-flex items-center rounded-sm bg-maroon px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream shadow-md">
                Agenda Utama
              </span>
              {program.programType ? (
                <span className="rounded-sm bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                  {program.programType}
                </span>
              ) : null}
            </div>
          </Link>
        </div>

        {/* Right Column: Event Narrative & Call-to-Action */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            {/* Meta Tags: Date & Venue */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 text-cream/90 font-medium">
                <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
                {program.eventDate}
              </span>
              {program.location ? (
                <>
                  <span className="text-hairline">•</span>
                  <span className="inline-flex items-center gap-1.5 text-gold-soft font-medium">
                    <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                    {program.location}
                  </span>
                </>
              ) : null}
            </div>

            {/* Title */}
            <h2 className="mt-3 font-sans text-xl font-bold leading-snug text-cream transition-colors group-hover:text-gold sm:text-2xl lg:text-3xl">
              <Link href={programHref}>{program.title}</Link>
            </h2>

            {/* Excerpt */}
            <p className="mt-4 text-sm leading-relaxed text-cream/90 sm:text-base sm:leading-relaxed">
              {program.excerpt}
            </p>

            {/* Organizer Info */}
            <div className="mt-5 border-t border-hairline/60 pt-3 text-xs text-muted">
              <span>Penyelenggara: </span>
              <span className="font-semibold text-cream/90">PUI Seni Budaya Majapahitan UNESA</span>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="mt-6 sm:mt-8">
            <Link
              href={actionHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-sm border border-gold-deep px-5 py-3 text-xs font-bold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-lg hover:shadow-gold/10"
            >
              <span>{program.ctaLabel || "Daftar / Ikuti Program"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
