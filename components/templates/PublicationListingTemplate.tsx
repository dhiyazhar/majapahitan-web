"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import PublicationCard from "@/components/posts/PublicationCard";
import Berlangganan from "@/components/sections/Berlangganan";
import type { PublikasiItem } from "@/lib/content";

type Props = {
  items: PublikasiItem[];
};

export default function PublicationListingTemplate({ items }: Props) {
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
              alt="Publikasi & Penelitian Ilmiah Majapahit"
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">Publikasi & Penelitian</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              PUSAT RISET & ARSIP ILMIAH
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Publikasi & Penelitian
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Kumpulan artikel jurnal ilmiah, buku monograf, dan laporan penelitian arkeologis oleh PUI Seni Budaya Majapahitan UNESA yang terhubung langsung ke repositori e-library resmi.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. SEARCH TOOLBAR (Clean, without Type Filter Pills)
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-hairline pb-6 md:flex-row md:items-center">
              {/* Search Bar */}
              <div className="relative w-full md:w-96 lg:w-[420px]">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul publikasi, nama peneliti, atau jurnal..."
                  className="w-full rounded-md border border-hairline bg-panel py-2.5 pl-10 pr-9 text-xs text-cream placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Bersihkan pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>

              {/* Counter Info */}
              <p className="text-xs text-muted">
                Menampilkan <span className="font-semibold text-gold">{filteredItems.length}</span> dari {items.length} karya publikasi
              </p>
            </div>

            {/* =========================================================================
                3. PUBLICATION CARDS GRID (2 Columns for spacious academic metadata)
            ========================================================================= */}
            {filteredItems.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredItems.map((item) => (
                  <PublicationCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-muted sm:text-base">
                  Tidak ada naskah atau jurnal yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                >
                  <span>Reset Pencarian</span>
                </button>
              </div>
            )}
          </section>

          {/* =========================================================================
              4. NEWSLETTER SUBSCRIPTION
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
