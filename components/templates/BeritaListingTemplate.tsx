"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import PostFilterBar from "@/components/posts/PostFilterBar";
import BeritaCard from "@/components/berita/BeritaCard";
import Berlangganan from "@/components/sections/Berlangganan";
import type { BeritaItem } from "@/lib/payload";

const BERITA_CATEGORIES = [
  "Semua",
  "Warta Kebudayaan",
  "Konservasi & Arkeologi",
  "Riset & Akademik",
  "Kegiatan Museum",
];

type Props = {
  beritaList: BeritaItem[];
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

export default function BeritaListingTemplate({
  beritaList,
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

  const itemsToRender = useMemo(() => {
    let list = beritaList;

    if (activeCategory !== "Semua") {
      list = list.filter((b) => {
        const sub = (b.subcategory || "").toLowerCase();
        const cat = activeCategory.toLowerCase();
        return sub.includes(cat) || cat.includes(sub);
      });
    }

    if (!isServerDriven && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [beritaList, activeCategory, searchQuery, isServerDriven]);

  const featuredBerita = itemsToRender[0] || beritaList[0];
  const listItems = itemsToRender;

  const handleSearchSubmit = () => {
    if (isServerDriven) {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
      } else {
        params.delete("q");
      }
      params.set("page", "1");
      router.push(`/berita?${params.toString()}`);
    }
  };

  const handleSearchClear = (newVal: string) => {
    setSearchQuery(newVal);
    if (isServerDriven && !newVal) {
      router.push("/berita");
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
              src="/images/hero/warta-bg.jpg"
              alt="Warta & Berita Terkini"
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
              <span className="text-gold">Warta & Berita</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              Kabar & Publikasi Berita
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Warta & Berita Terkini
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Pemberitaan resmi, catatan kuratorial, rekam ekskavasi konservasi, dan laporan agenda PUI Seni Budaya Majapahitan UNESA.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. FEATURED BERITA HERO
          ========================================================================= */}
          {featuredBerita ? (
            <section className="mt-12 sm:mt-16">
              <article className="group overflow-hidden rounded-xl bg-panel p-5 ring-gold-frame transition-all duration-300 hover:bg-panel-2 sm:p-8">
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <Link href={`/berita/${featuredBerita.slug}`} className="relative block h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-[380px]">
                      <ImageSlot
                        src={featuredBerita.coverImage || featuredBerita.image}
                        alt={featuredBerita.title}
                        label={featuredBerita.title}
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-sm bg-maroon px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream shadow-md">
                          Warta Utama
                        </span>
                        {featuredBerita.subcategory ? (
                          <span className="rounded-sm bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                            {featuredBerita.subcategory}
                          </span>
                        ) : null}
                      </div>
                    </Link>
                  </div>

                  <div className="flex flex-col justify-between lg:col-span-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          {featuredBerita.publishedAt}
                        </span>
                        <span className="text-hairline">•</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold" />
                          {featuredBerita.readingTime}
                        </span>
                      </div>

                      <h2 className="mt-3 font-sans text-xl font-bold leading-snug text-cream transition-colors group-hover:text-gold sm:text-2xl lg:text-3xl">
                        <Link href={`/berita/${featuredBerita.slug}`}>{featuredBerita.title}</Link>
                      </h2>

                      <p className="mt-4 text-sm leading-relaxed text-cream/90 sm:text-base sm:leading-relaxed">
                        {featuredBerita.excerpt}
                      </p>

                      <div className="mt-5 border-t border-hairline/60 pt-3 text-xs text-muted">
                        <span>Penulis: </span>
                        <span className="font-semibold text-cream/90">{featuredBerita.author}</span>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                      <Link
                        href={`/berita/${featuredBerita.slug}`}
                        className="inline-flex items-center gap-2 rounded-sm border border-gold-deep px-5 py-3 text-xs font-bold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-lg hover:shadow-gold/10"
                      >
                        <span>Baca Artikel Lengkap</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          ) : null}

          {/* =========================================================================
              3. TOOLBAR FILTER & SEARCH
          ========================================================================= */}
          <section className="mt-14 sm:mt-18">
            <PostFilterBar
              categories={BERITA_CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={handleSearchClear}
              onSearchSubmit={handleSearchSubmit}
              totalCount={pagination?.totalDocs ?? beritaList.length}
              filteredCount={itemsToRender.length}
            />

            {isFallback && process.env.NODE_ENV === "development" ? (
              <div className="mt-4 rounded-md border border-gold/40 bg-ink-2 px-4 py-2.5 text-xs text-gold flex flex-wrap items-center justify-between gap-2">
                <span>🟡 <strong>CMS Diagnostic:</strong> Menampilkan data cadangan berita.</span>
                <span className="text-[10px] text-muted">{fallbackReason}</span>
              </div>
            ) : null}

            {/* =========================================================================
                4. BERITA GRID CARDS
            ========================================================================= */}
            {listItems.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listItems.map((berita) => (
                  <BeritaCard key={berita.id} berita={berita} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-xl border border-hairline bg-panel p-12 text-center">
                <p className="font-serif text-lg text-cream">
                  Belum ada warta berita yang sesuai dengan kriteria pencarian.
                </p>
                <p className="mt-2 text-xs text-muted">
                  Coba ubah kata kunci atau pilih kategori warta lainnya.
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
                    href={`/berita?page=${pagination.page - 1}${currentQuery ? `&q=${currentQuery}` : ""}`}
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
                        href={`/berita?page=${p}${currentQuery ? `&q=${currentQuery}` : ""}`}
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
                    href={`/berita?page=${pagination.page + 1}${currentQuery ? `&q=${currentQuery}` : ""}`}
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
