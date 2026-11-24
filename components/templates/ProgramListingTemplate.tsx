"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import PostFilterBar from "@/components/posts/PostFilterBar";
import FeaturedProgramHero from "@/components/programs/FeaturedProgramHero";
import ProgramCard from "@/components/programs/ProgramCard";
import Berlangganan from "@/components/sections/Berlangganan";
import type { ProgramItem, PartnerLogoItem } from "@/lib/payload";

/** Must match the `programType` select values in collections/Programs.ts. */
const PROGRAM_CATEGORIES = [
  "Semua",
  "Pameran Virtual",
  "Pameran Karya",
  "Program Edukasi",
  "Pertunjukan Budaya",
  "Workshop & Pelatihan",
  "Seminar & Simposium",
];

type Props = {
  programs: ProgramItem[];
  partnerLogos?: PartnerLogoItem[];
  /** Category from ?kategori=, filtered on the server. */
  activeType?: string;
  pagination?: {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  isFallback?: boolean;
  fallbackReason?: string;
};

export default function ProgramListingTemplate({
  programs,
  partnerLogos,
  activeType = "Semua",
  pagination,
  isFallback,
  fallbackReason,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(currentQuery);

  /** Build /program URLs that keep search and category together. */
  const programHref = (next: { page?: number; q?: string; kategori?: string }) => {
    const params = new URLSearchParams();
    const q = next.q ?? currentQuery;
    const kategori = next.kategori ?? activeType;
    if (q) params.set("q", q);
    if (kategori && kategori !== "Semua") params.set("kategori", kategori);
    if (next.page && next.page > 1) params.set("page", String(next.page));
    const qs = params.toString();
    return qs ? `/program?${qs}` : "/program";
  };

  const handleSearchSubmit = () => {
    router.push(programHref({ q: searchQuery.trim() }));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value && currentQuery) router.push(programHref({ q: "" }));
  };

  // Lead with the event happening now, else the next upcoming one; only on the
  // first unfiltered page so it never repeats or hides a filtered result.
  const isFirstUnfiltered = activeType === "Semua" && !currentQuery && (pagination?.page ?? 1) === 1;
  const featuredProgram = isFirstUnfiltered
    ? programs.find((p) => p.status === "berlangsung") ??
      [...programs]
        .filter((p) => p.status === "akan-datang" && p.startsAt)
        .sort((a, b) => a.startsAt!.localeCompare(b.startsAt!))[0]
    : undefined;

  const rest = programs.filter((p) => p !== featuredProgram);
  const current = rest.filter((p) => p.status !== "selesai");
  const archive = rest.filter((p) => p.status === "selesai");

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO & BREADCRUMB
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-24">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
            <ImageSlot
              src="/images/hero/pameran-bg.jpg"
              alt=""
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl">
              <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-medium text-muted">
                <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                  Beranda
                </Link>
                <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
                <span aria-current="page" className="text-gold">Program & Kegiatan</span>
              </nav>

              <h1 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
                Program & Kegiatan
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                Rangkaian pameran virtual 3D, workshop kurasi, webinar kebudayaan, dan simposium riset peradaban Majapahit yang dapat diikuti oleh publik.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. FEATURED: the event on now, or the next one
          ========================================================================= */}
          {featuredProgram ? (
            <section className="mt-12 sm:mt-16">
              <FeaturedProgramHero program={featuredProgram} />
            </section>
          ) : null}

          {/* =========================================================================
              3. AGENDA: filters and current/upcoming events
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <SectionHeading title="Agenda Kegiatan" size="sm" className="mb-6" />
            <PostFilterBar
              categories={PROGRAM_CATEGORIES}
              activeCategory={activeType}
              onSelectCategory={(cat) => router.push(programHref({ kategori: cat }))}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              totalCount={pagination?.totalDocs ?? programs.length}
              filteredCount={programs.length}
              noun="program"
              searchPlaceholder="Cari judul atau topik program..."
            />

            {isFallback && process.env.NODE_ENV === "development" ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-gold/40 bg-ink-2 px-4 py-2.5 text-xs text-gold">
                <span><strong>CMS Diagnostic:</strong> Menampilkan data cadangan program.</span>
                <span className="text-muted">{fallbackReason}</span>
              </div>
            ) : null}

            {programs.length === 0 ? (
              <div className="py-16">
                <p className="text-base text-cream">
                  Belum ada agenda kegiatan yang sesuai dengan kriteria pencarian.
                </p>
                <Link
                  href="/program"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Tampilkan semua program
                </Link>
              </div>
            ) : current.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {current.map((program) => (
                  <li key={program.id}>
                    <ProgramCard program={program} />
                  </li>
                ))}
              </ul>
            ) : !featuredProgram ? (
              <p className="mt-8 text-sm text-muted">Belum ada agenda yang akan datang untuk pilihan ini.</p>
            ) : null}
          </section>

          {/* =========================================================================
              4. ARSIP: events that have ended
          ========================================================================= */}
          {archive.length > 0 ? (
            <section className="mt-16 border-t border-hairline pt-14">
              <SectionHeading title="Arsip Program" size="sm" />
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {archive.map((program) => (
                  <li key={program.id}>
                    <ProgramCard program={program} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* =========================================================================
              5. PAGINATION
          ========================================================================= */}
          {pagination && pagination.totalPages > 1 ? (
            <nav
              aria-label="Halaman program"
              className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-hairline pt-8"
            >
              {pagination.hasPrevPage ? (
                <Link
                  href={programHref({ page: pagination.page - 1 })}
                  className="inline-flex min-h-11 items-center gap-1 rounded-sm border border-hairline bg-panel px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  <span>Sebelumnya</span>
                </Link>
              ) : null}

              <div className="flex flex-wrap items-center gap-1.5 px-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => {
                  const isCurrent = p === pagination.page;
                  return (
                    <Link
                      key={p}
                      href={programHref({ page: p })}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex h-11 w-11 items-center justify-center rounded-sm text-sm font-semibold transition-colors ${
                        isCurrent
                          ? "bg-gold font-bold text-ink"
                          : "border border-hairline bg-panel text-cream hover:border-gold hover:text-gold"
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>

              {pagination.hasNextPage ? (
                <Link
                  href={programHref({ page: pagination.page + 1 })}
                  className="inline-flex min-h-11 items-center gap-1 rounded-sm border border-hairline bg-panel px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        <Berlangganan />
      </main>
      <Footer partnerLogos={partnerLogos} />
    </>
  );
}
