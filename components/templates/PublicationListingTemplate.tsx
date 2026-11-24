"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import PublicationCard from "@/components/posts/PublicationCard";
import Berlangganan from "@/components/sections/Berlangganan";
import type { PublikasiItem } from "@/lib/content";
import type { FooterPartner } from "@/components/layout/Footer";

type Props = {
  items: PublikasiItem[];
  partnerLogos?: FooterPartner[];
};

export default function PublicationListingTemplate({ items, partnerLogos }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return items;

    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const authorMatch = item.authors.some((a) => a.toLowerCase().includes(q));
      const pubMatch = item.publicationName.toLowerCase().includes(q);
      const abstractMatch = item.abstract.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(q));

      return titleMatch || authorMatch || pubMatch || abstractMatch || keywordMatch;
    });
  }, [items, searchQuery]);

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
              src="/images/koleksi/kitab.jpg"
              alt=""
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-medium text-muted">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
                >
                  Beranda
                </Link>
                <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
                <span aria-current="page" className="text-gold">Publikasi & Penelitian</span>
              </nav>

              <h1 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
                Publikasi & Penelitian
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                Kumpulan artikel jurnal ilmiah, buku monograf, dan laporan penelitian arkeologis oleh PUI Seni Budaya Majapahitan UNESA yang terhubung langsung ke repositori e-library resmi.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. SEARCH TOOLBAR (Clean, without Type Filter Pills)
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <SectionHeading title="Daftar Publikasi" size="sm" />

            <div className="relative mt-6 w-full md:w-96 lg:w-[420px]">
              <label htmlFor="cari-publikasi" className="sr-only">
                Cari publikasi
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id="cari-publikasi"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul, peneliti, jurnal, atau kata kunci..."
                className="min-h-11 w-full rounded-sm border border-muted/60 bg-panel py-2.5 pl-10 pr-11 text-base text-cream placeholder:text-muted transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-muted hover:text-cream"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
            </div>

            <p aria-live="polite" className="mt-4 text-sm text-muted">
              Menampilkan {filteredItems.length} dari {items.length} publikasi.
            </p>

            {/* A bibliography reads as a list, not a card grid: one entry per row, hairline between. */}
            {filteredItems.length > 0 ? (
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <PublicationCard item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-16">
                <p className="text-sm text-muted sm:text-base">
                  Tidak ada publikasi yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Reset pencarian
                </button>
              </div>
            )}
          </section>

        </div>

        {/* =========================================================================
            4. NEWSLETTER SUBSCRIPTION
        ========================================================================= */}
        <Berlangganan />
      </main>
      <Footer partnerLogos={partnerLogos} />
    </>
  );
}
