"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import PostFilterBar from "@/components/posts/PostFilterBar";
import FeaturedProgramHero from "@/components/programs/FeaturedProgramHero";
import ProgramCard from "@/components/programs/ProgramCard";
import Berlangganan from "@/components/sections/Berlangganan";
import type { ProgramItem } from "@/lib/payload";

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
  pagination,
  isFallback,
  fallbackReason,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>(currentQuery);

  const isServerDriven = Boolean(pagination);

  const programsToRender = useMemo(() => {
    let list = programs;

    // Filter by category client-side
    if (activeCategory !== "Semua") {
      list = list.filter((p) => {
        const type = p.programType.toLowerCase();
        const cat = activeCategory.toLowerCase();
        return type.includes(cat) || cat.includes(type);
      });
    }

    // Client-side text search if not server-paginated
    if (!isServerDriven && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    return list;
  }, [programs, activeCategory, searchQuery, isServerDriven]);

  const featuredProgram = programsToRender[0] || programs[0];
  const listItems = programsToRender;

  const handleSearchSubmit = () => {
    if (isServerDriven) {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
      } else {
        params.delete("q");
      }
      params.set("page", "1");
      router.push(`/program?${params.toString()}`);
    }
  };

  const handleSearchClear = (newVal: string) => {
    setSearchQuery(newVal);
    if (isServerDriven && !newVal) {
      router.push("/program");
    }
  };

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
              alt="Program & Kegiatan"
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
            <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">Program & Kegiatan</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              Agenda Museum & Partisipasi Publik
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Program & Kegiatan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Rangkaian pameran virtual 3D, workshop kurasi, webinar kebudayaan, dan simposium riset peradaban Majapahit yang dapat diikuti oleh publik.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. FEATURED PROGRAM HERO (Sorotan Terkini)
          ========================================================================= */}
          {featuredProgram ? (
            <section className="mt-12 sm:mt-16">
              <FeaturedProgramHero program={featuredProgram} />
            </section>
          ) : null}

          {/* =========================================================================
              3. TOOLBAR FILTER & SEARCH
          ========================================================================= */}
          <section className="mt-14 sm:mt-18">
            <PostFilterBar
              categories={PROGRAM_CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={handleSearchClear}
              onSearchSubmit={handleSearchSubmit}
              totalCount={pagination?.totalDocs ?? programs.length}
              filteredCount={programsToRender.length}
            />

            {isFallback && process.env.NODE_ENV === "development" ? (
              <div className="mt-4 rounded-md border border-gold/40 bg-ink-2 px-4 py-2.5 text-xs text-gold flex flex-wrap items-center justify-between gap-2">
                <span>🟡 <strong>CMS Diagnostic:</strong> Menampilkan data cadangan program.</span>
                <span className="text-[10px] text-muted">{fallbackReason}</span>
              </div>
            ) : null}

            {/* =========================================================================
                4. PROGRAM GRID CARDS
            ========================================================================= */}
            {listItems.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listItems.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-xl border border-hairline bg-panel p-12 text-center">
                <p className="font-serif text-lg text-cream">
                  Belum ada agenda kegiatan yang sesuai dengan kriteria pencarian.
                </p>
                <p className="mt-2 text-xs text-muted">
                  Coba ubah kata kunci atau pilih kategori agenda lainnya.
                </p>
              </div>
            )}

            {/* =========================================================================
                5. PAGINATION
            ========================================================================= */}
            {pagination && pagination.totalPages > 1 ? (
              <nav className="mt-14 flex items-center justify-center gap-2 border-t border-hairline pt-8">
                {pagination.hasPrevPage ? (
                  <Link
                    href={`/program?page=${pagination.page - 1}${currentQuery ? `&q=${currentQuery}` : ""}`}
                    className="inline-flex items-center gap-1 rounded-md border border-hairline bg-panel px-3 py-2 text-xs font-semibold text-cream hover:border-gold hover:text-gold transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Sebelumnya</span>
                  </Link>
                ) : null}

                <div className="flex items-center gap-1.5 px-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => {
                    const isCurrent = p === pagination.page;
                    return (
                      <Link
                        key={p}
                        href={`/program?page=${p}${currentQuery ? `&q=${currentQuery}` : ""}`}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
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
                    href={`/program?page=${pagination.page + 1}${currentQuery ? `&q=${currentQuery}` : ""}`}
                    className="inline-flex items-center gap-1 rounded-md border border-hairline bg-panel px-3 py-2 text-xs font-semibold text-cream hover:border-gold hover:text-gold transition-colors"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </section>

          {/* =========================================================================
              6. NEWSLETTER SUBSCRIPTION
          ========================================================================= */}
          <div className="mt-20 sm:mt-24">
            <Berlangganan />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
