"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import PostFilterBar from "@/components/posts/PostFilterBar";
import BeritaCard from "@/components/berita/BeritaCard";
import Berlangganan from "@/components/sections/Berlangganan";
import type { BeritaItem } from "@/lib/payload";


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

  const [searchQuery, setSearchQuery] = useState<string>(currentQuery);

  const beritaHref = (next: { page?: number; q?: string }) => {
    const params = new URLSearchParams();
    const q = next.q ?? currentQuery;
    if (q) params.set("q", q);
    if (next.page && next.page > 1) params.set("page", String(next.page));
    const qs = params.toString();
    return qs ? `/berita?${qs}` : "/berita";
  };

  // Newest story leads on the first unsearched page and is not repeated in the list.
  const isFirstPage = !currentQuery && (pagination?.page ?? 1) === 1;
  const featuredBerita = isFirstPage ? beritaList[0] : undefined;
  const listItems = featuredBerita ? beritaList.slice(1) : beritaList;

  const handleSearchSubmit = () => {
    router.push(beritaHref({ q: searchQuery.trim() }));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value && currentQuery) router.push(beritaHref({ q: "" }));
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
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
                >
                  Beranda
                </Link>
                <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
                <span aria-current="page" className="text-gold">Warta & Berita</span>
              </nav>

              <h1 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
                Warta & Berita Terkini
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                Pemberitaan resmi, catatan kuratorial, rekam ekskavasi konservasi, dan laporan agenda PUI Seni Budaya Majapahitan UNESA.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. FEATURED BERITA HERO
          ========================================================================= */}
          {featuredBerita ? (
            <section className="mt-12 sm:mt-16">
              <article className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
                <Link
                  href={`/berita/${featuredBerita.slug}`}
                  tabIndex={-1}
                  aria-hidden
                  className="group relative block aspect-[16/10] overflow-hidden rounded-md ring-1 ring-hairline lg:col-span-7"
                >
                  <ImageSlot
                    src={featuredBerita.coverImage || featuredBerita.image}
                    alt=""
                    label={featuredBerita.title}
                    position="absolute"
                    className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </Link>

                <div className="lg:col-span-5">
                  <p className="text-sm text-muted">
                    <time className="tabular-nums">{featuredBerita.publishedAt}</time> · {featuredBerita.readingTime}
                    {featuredBerita.subcategory ? (
                      <span className="text-gold-soft"> · {featuredBerita.subcategory}</span>
                    ) : null}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-snug text-cream sm:text-3xl">
                    <Link href={`/berita/${featuredBerita.slug}`} className="transition-colors hover:text-gold">
                      {featuredBerita.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">{featuredBerita.excerpt}</p>
                  <p className="mt-4 text-sm text-muted">
                    Penulis: <span className="font-semibold text-cream/90">{featuredBerita.author}</span>
                  </p>
                  <Link
                    href={`/berita/${featuredBerita.slug}`}
                    className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                  >
                    Baca selengkapnya
                    <ArrowRight
                      className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                      aria-hidden
                    />
                    <span className="sr-only">: {featuredBerita.title}</span>
                  </Link>
                </div>
              </article>
            </section>
          ) : null}

          {/* =========================================================================
              3. TOOLBAR FILTER & SEARCH
          ========================================================================= */}
          <section className="mt-16 border-t border-hairline pt-14">
            <SectionHeading title="Semua Berita" size="sm" className="mb-6" />
            <PostFilterBar
              categories={[]}
              activeCategory=""
              onSelectCategory={() => {}}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              totalCount={pagination?.totalDocs ?? beritaList.length}
              filteredCount={beritaList.length}
              noun="berita"
              searchPlaceholder="Cari judul atau topik berita..."
            />

            {isFallback && process.env.NODE_ENV === "development" ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-gold/40 bg-ink-2 px-4 py-2.5 text-xs text-gold">
                <span><strong>CMS Diagnostic:</strong> Menampilkan data cadangan berita.</span>
                <span className="text-muted">{fallbackReason}</span>
              </div>
            ) : null}

            {/* Same list language as the home page's "Berita Terbaru": gold rule on top, hairline rows. */}
            {listItems.length > 0 ? (
              <ul className="mt-8 divide-y divide-hairline border-y border-hairline border-t-gold/30">
                {listItems.map((berita) => (
                  <li key={berita.id}>
                    <BeritaCard berita={berita} />
                  </li>
                ))}
              </ul>
            ) : !featuredBerita ? (
              <div className="py-16">
                <p className="text-base text-cream">Belum ada berita yang sesuai dengan pencarian.</p>
                <Link
                  href="/berita"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Tampilkan semua berita
                </Link>
              </div>
            ) : null}

            {/* =========================================================================
                5. PAGINATION
            ========================================================================= */}
            {pagination && pagination.totalPages > 1 ? (
              <nav aria-label="Halaman berita" className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-hairline pt-8">
                {pagination.hasPrevPage ? (
                  <Link
                    href={beritaHref({ page: pagination.page - 1 })}
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
                        href={beritaHref({ page: p })}
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
                    href={beritaHref({ page: pagination.page + 1 })}
                    className="inline-flex min-h-11 items-center gap-1 rounded-sm border border-hairline bg-panel px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </section>

        </div>

        {/* =========================================================================
            6. NEWSLETTER SUBSCRIPTION
        ========================================================================= */}
        <Berlangganan />
      </main>
      <Footer />
    </>
  );
}
