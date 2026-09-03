"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, X, Upload, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import ArtworkLightbox from "@/components/gallery/ArtworkLightbox";
import Berlangganan from "@/components/sections/Berlangganan";
import type { KaryaItem } from "@/lib/content";

type Props = {
  items: KaryaItem[];
};

const subcategories = [
  "Semua",
  "Lukisan & Gambar",
  "Patung & Seni Kriya",
  "Seni Digital & 3D",
  "Fotografi Arsitektur",
];

export default function PublicGalleryTemplate({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "Semua" || item.subcategory === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.creator.toLowerCase().includes(q) ||
        (item.institution && item.institution.toLowerCase().includes(q)) ||
        (item.material && item.material.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const activeArtwork =
    selectedArtworkIndex !== null && filteredItems[selectedArtworkIndex]
      ? filteredItems[selectedArtworkIndex]
      : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO & BREADCRUMB
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-24">
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src="/images/hero/slide-1.jpg"
              alt="Galeri Karya Publik Majapahit"
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
              <Link href="/galeri" className="transition-colors hover:text-gold">
                Galeri Karya
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">Karya Publik</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              KONTRIBUSI & PARTISIPASI MASYARAKAT
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Galeri Karya Publik
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Ruang apresiasi karya seni bertema Majapahit kiriman seniman, mahasiswa, budayawan, dan masyarakat luas di seluruh Nusantara yang telah lolos proses kurasi resmi PUI Seni Budaya Majapahitan UNESA.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/partisipasi/kirim-karya"
                className="inline-flex items-center gap-2 rounded-sm bg-maroon px-6 py-3 text-xs font-bold uppercase tracking-wider text-cream shadow-md transition-all hover:bg-maroon-2 hover:shadow-lg"
              >
                <Upload className="h-4 w-4" />
                <span>Kirim Karyamu Sekarang</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. FILTER BAR & SEARCH TOOLBAR
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <div className="flex flex-col gap-5 border-b border-hairline pb-6">
              {/* Top Row: Search & Counter */}
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="relative w-full md:w-96 lg:w-[420px]">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul karya, nama seniman, atau media..."
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

                <p className="text-xs text-muted">
                  Menampilkan <span className="font-semibold text-gold">{filteredItems.length}</span> dari {items.length} karya publik terkurasi
                </p>
              </div>

              {/* Bottom Row: Subcategory Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {subcategories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isActive
                          ? "bg-gold text-ink shadow-sm"
                          : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =========================================================================
                3. ARTWORK CARDS GRID
            ========================================================================= */}
            {filteredItems.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <ArtworkCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelectedArtworkIndex(index)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-muted sm:text-base">
                  Tidak ada karya publik yang cocok dengan kriteria pencarian &ldquo;{searchQuery || activeCategory}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Semua");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                >
                  <span>Reset Filter & Pencarian</span>
                </button>
              </div>
            )}
          </section>

          {/* =========================================================================
              4. PUBLIC SUBMISSION CALLOUT BANNER (Skeleton Matching)
          ========================================================================= */}
          <section className="mt-20 sm:mt-28">
            <div className="relative overflow-hidden rounded-xl border border-hairline bg-panel p-8 shadow-xl ring-gold-frame sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
                {/* Left Column */}
                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                    Ingin Karyamu Dipamerkan di Galeri Publik?
                  </h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-cream/85 sm:text-base">
                    PUI Seni Budaya Majapahitan UNESA membuka kesempatan seluas-luasnya bagi perupa, pematung, fotografer, dan kreator digital.
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/partisipasi/kirim-karya"
                      className="inline-flex items-center rounded-sm bg-maroon px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:bg-maroon-2 hover:shadow-lg"
                    >
                      Buka Formulir Pengiriman Karya
                    </Link>
                  </div>
                </div>

                {/* Right Column (No inner card box) */}
                <div className="lg:col-span-6 lg:border-l lg:border-hairline/80 lg:pl-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    ALUR KURASI PUBLIK
                  </p>
                  <ol className="mt-4 space-y-3.5 text-xs leading-relaxed text-cream/90 sm:text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">1.</span>
                      <span>Kirim formulir online & unggah foto karya resolusi tinggi.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">2.</span>
                      <span>Evaluasi kesesuaian tema & orisinalitas oleh Tim Kurator PUI.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">3.</span>
                      <span>Notifikasi status kurasi via email pengirim.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">4.</span>
                      <span>Karya terbit resmi di Galeri Publik Museum Virtual.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              5. NEWSLETTER SUBSCRIPTION
          ========================================================================= */}
          <div className="mt-20 sm:mt-24">
            <Berlangganan />
          </div>
        </div>
      </main>
      <Footer />

      {/* =========================================================================
          INTERACTIVE LIGHTBOX MODAL
      ========================================================================= */}
      <ArtworkLightbox
        artwork={activeArtwork}
        items={filteredItems}
        currentIndex={selectedArtworkIndex ?? 0}
        isOpen={selectedArtworkIndex !== null}
        onClose={() => setSelectedArtworkIndex(null)}
        onSelectIndex={(index) => setSelectedArtworkIndex(index)}
      />
    </>
  );
}
