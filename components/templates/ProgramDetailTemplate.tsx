import Link from "next/link";
import { ChevronRight, Calendar, MapPin, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ArticleContent from "@/components/posts/ArticleContent";
import ShareButtons from "@/components/posts/ShareButtons";
import ProgramCard from "@/components/programs/ProgramCard";
import type { ProgramItem } from "@/lib/payload";

type Props = {
  program: ProgramItem;
  relatedPrograms: ProgramItem[];
};

export default function ProgramDetailTemplate({
  program,
  relatedPrograms,
}: Props) {
  const isExternal = Boolean(program.ctaUrl && program.ctaUrl.startsWith("http"));
  const actionHref = isExternal ? program.ctaUrl! : program.ctaUrl || "#panduan-kegiatan";

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            HEADER: BREADCRUMB → BADGE → JUDUL
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-10 sm:py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* 1. Breadcrumb */}
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <Link href="/program" className="transition-colors hover:text-gold">
                Program & Kegiatan
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="truncate max-w-[200px] sm:max-w-xs text-gold">
                {program.title}
              </span>
            </nav>

            {/* 2. Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-sm bg-maroon px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
                Program & Kegiatan
              </span>
              {program.programType ? (
                <span className="inline-block rounded-sm border border-hairline bg-panel px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {program.programType}
                </span>
              ) : null}
            </div>

            {/* 3. Judul */}
            <h1 className="mt-4 font-sans text-2xl font-bold leading-snug text-cream sm:text-3xl lg:text-4xl">
              {program.title}
            </h1>

            {/* Subjudul: Tanggal & Lokasi (Text-only) */}
            {(program.eventDate || program.location) && (
              <p className="mt-2 text-sm text-muted sm:text-base">
                {[program.eventDate, program.location].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* =========================================================================
              4. GAMBAR (HERO)
          ========================================================================= */}
          <div className="mt-8 sm:mt-10">
            <div className="relative h-72 w-full overflow-hidden rounded-xl bg-ink ring-gold-frame sm:h-96 lg:h-[460px]">
              <ImageSlot
                src={program.coverImage || program.image}
                alt={program.title}
                label={program.title}
                position="absolute"
                className="inset-0 h-full w-full"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          </div>

          {/* =========================================================================
              5. INFO CARD (Jadwal, Tempat, CTA)
          ========================================================================= */}
          <div className="mt-8 rounded-xl border border-hairline bg-panel px-6 py-5 shadow-lg shadow-black/20 sm:px-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
                {/* Jadwal */}
                <div className="space-y-1">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
                    JADWAL
                  </span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-cream">
                    <Calendar className="h-4 w-4 text-gold shrink-0" />
                    <span>{program.eventDate}</span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden h-9 w-px bg-hairline sm:block" />

                {/* Tempat / Media */}
                <div className="space-y-1">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
                    TEMPAT / MEDIA
                  </span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-cream">
                    <MapPin className="h-4 w-4 text-gold shrink-0" />
                    <span>{program.location || "Museum Virtual (Daring)"}</span>
                  </div>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="shrink-0">
                <Link
                  href={actionHref}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-all hover:bg-gold-soft hover:shadow-md hover:shadow-gold/20"
                >
                  <span>{program.ctaLabel || "Yuk Ikut"}</span>
                  {isExternal ? (
                    <ExternalLink className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================================
              6. BODY KONTEN
          ========================================================================= */}
          <div id="panduan-kegiatan" className="mt-10 sm:mt-14 scroll-mt-24">
            <ArticleContent content={program.content} tags={["Majapahit", "Program", program.programType]} />
          </div>

          {/* =========================================================================
              7. SOCIAL SHARING WIDGET
          ========================================================================= */}
          <div className="mt-8">
            <ShareButtons title={program.title} />
          </div>

          {/* =========================================================================
              9. BACK LINK CTA
          ========================================================================= */}
          <div className="mt-10 flex items-center justify-between border-t border-hairline pt-6">
            <Link
              href="/program"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-soft"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Indeks Program</span>
            </Link>
          </div>

          {/* =========================================================================
              10. RELATED PROGRAMS
          ========================================================================= */}
          {relatedPrograms.length > 0 ? (
            <section className="mt-16 sm:mt-20 border-t border-hairline pt-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-cream sm:text-lg">
                  Agenda Program Lainnya
                </h3>
                <Link
                  href="/program"
                  className="text-xs font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPrograms.map((relProgram) => (
                  <ProgramCard key={relProgram.id} program={relProgram} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
