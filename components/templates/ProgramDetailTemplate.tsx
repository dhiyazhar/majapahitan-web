import Link from "next/link";
import { ChevronRight, ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticleContent from "@/components/posts/ArticleContent";
import ShareButtons from "@/components/posts/ShareButtons";
import ProgramCard from "@/components/programs/ProgramCard";
import { ProgramStatusBadge, programAction } from "@/components/programs/ProgramStatusBadge";
import { formatProgramDateRange, formatProgramTime } from "@/lib/program-status";
import type { ProgramItem, PartnerLogoItem } from "@/lib/payload";

type Props = {
  program: ProgramItem;
  relatedPrograms: ProgramItem[];
  partnerLogos?: PartnerLogoItem[];
};

/** "16 Oktober 2026, 23.59 WIB" */
function formatMoment(iso?: string) {
  if (!iso) return undefined;
  const time = formatProgramTime(iso);
  return time ? `${formatProgramDateRange(iso)}, ${time}` : formatProgramDateRange(iso);
}

export default function ProgramDetailTemplate({
  program,
  relatedPrograms,
  partnerLogos,
}: Props) {
  const action = programAction(program);
  // The button leads somewhere new only when it opens registration or an external link.
  const showAction = action.href !== `/program/${program.slug}`;
  const deadline = formatMoment(program.registrationDeadline);
  const registrationClosed =
    Boolean(program.registrationUrl) && !program.registrationOpen && program.status !== "selesai";

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            HEADER
        ========================================================================= */}
        <section className="border-b border-hairline bg-ink-2 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
              <Link href="/program" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                Program & Kegiatan
              </Link>
              <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
              <span aria-current="page" className="max-w-[200px] truncate text-gold sm:max-w-xs">
                {program.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              {program.programType ? (
                <span className="rounded-sm bg-maroon px-2.5 py-1 text-xs font-semibold text-cream">
                  {program.programType}
                </span>
              ) : null}
              <ProgramStatusBadge status={program.status} />
            </div>

            <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
              {program.title}
            </h1>
            <p className="mt-3 text-base text-cream/85">
              {program.eventDate}
              {program.eventTime ? <span className="text-muted"> · {program.eventTime}</span> : null}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-md ring-1 ring-hairline sm:mt-10">
            <ImageSlot
              src={program.coverImage || program.image}
              alt=""
              label={program.title}
              position="absolute"
              className="inset-0 h-full w-full"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
          </div>

          {/* =========================================================================
              BODY + EVENT FACTS
              Facts come first on mobile (they answer "when, where, how to join"),
              and sit beside the article from lg up.
          ========================================================================= */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <aside aria-labelledby="info-acara" className="lg:order-2">
              <div className="rounded-md border border-hairline p-6 lg:sticky lg:top-24">
                <h2 id="info-acara" className="font-display text-xl font-semibold text-gold">
                  Info Acara
                </h2>

                <dl className="mt-4 divide-y divide-hairline text-sm">
                  {program.status ? (
                    <div className="py-3">
                      <dt className="text-muted">Status</dt>
                      <dd className="mt-1.5">
                        <ProgramStatusBadge status={program.status} />
                      </dd>
                    </div>
                  ) : null}
                  <div className="py-3">
                    <dt className="text-muted">Tanggal</dt>
                    <dd className="mt-1 font-semibold text-cream">{program.eventDate}</dd>
                  </div>
                  {program.eventTime ? (
                    <div className="py-3">
                      <dt className="text-muted">Waktu</dt>
                      <dd className="mt-1 font-semibold text-cream">{program.eventTime}</dd>
                    </div>
                  ) : null}
                  <div className="py-3">
                    <dt className="text-muted">Tempat</dt>
                    <dd className="mt-1 font-semibold text-cream">{program.location || "Museum Virtual (Daring)"}</dd>
                  </div>
                  {program.registrationUrl ? (
                    <div className="py-3">
                      <dt className="text-muted">Pendaftaran</dt>
                      <dd className="mt-1 font-semibold text-cream">
                        {program.registrationOpen
                          ? deadline
                            ? `Dibuka sampai ${deadline}`
                            : "Dibuka sampai acara dimulai"
                          : "Ditutup"}
                      </dd>
                    </div>
                  ) : null}
                  <div className="py-3">
                    <dt className="text-muted">Penyelenggara</dt>
                    <dd className="mt-1 font-semibold text-cream">PUI Seni Budaya Majapahitan UNESA</dd>
                  </div>
                </dl>

                {showAction ? (
                  <a
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
                  >
                    {action.label}
                    {action.external ? (
                      <>
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        <span className="sr-only">(membuka tab baru)</span>
                      </>
                    ) : null}
                  </a>
                ) : null}

                {registrationClosed ? (
                  <p className="mt-4 text-sm text-muted">Pendaftaran untuk acara ini sudah ditutup.</p>
                ) : null}
                {program.status === "selesai" ? (
                  <p className="mt-4 text-sm text-muted">
                    Acara ini telah selesai. Catatan dan dokumentasinya ada di halaman ini.
                  </p>
                ) : null}
              </div>
            </aside>

            <div className="min-w-0 lg:order-1">
              <ArticleContent content={program.content} tags={["Majapahit", "Program", program.programType]} />

              <div className="mt-8">
                <ShareButtons title={program.title} label="Bagikan program ini" />
              </div>

              <div className="mt-10 border-t border-hairline pt-6">
                <Link
                  href="/program"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Kembali ke semua program
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RELATED PROGRAMS
          ========================================================================= */}
          {relatedPrograms.length > 0 ? (
            <section className="mt-16 border-t border-hairline pt-14 sm:mt-20">
              <SectionHeading title="Agenda Program Lainnya" seeAllHref="/program" size="sm" />
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPrograms.map((relProgram) => (
                  <li key={relProgram.id}>
                    <ProgramCard program={relProgram} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <Footer partnerLogos={partnerLogos} />
    </>
  );
}
