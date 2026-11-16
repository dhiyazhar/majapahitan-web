"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
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

  const countFor = (cat: string) =>
    cat === "Semua" ? items.length : items.filter((item) => item.subcategory === cat).length;

  const activeArtwork =
    selectedArtworkIndex !== null && filteredItems[selectedArtworkIndex]
      ? filteredItems[selectedArtworkIndex]
      : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO & BREADCRUMB (same structure as the /galeri hub)
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src="/images/hero/slide-1.jpg"
              alt=""
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
              <Link href="/galeri" className="transition-colors hover:text-gold">
                Galeri Karya
              </Link>
              <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
              <span aria-current="page" className="text-gold">Karya Publik</span>
            </nav>
            <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              Galeri Karya Publik
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Ruang apresiasi karya seni bertema Majapahit kiriman seniman, mahasiswa, budayawan, dan masyarakat luas di seluruh Nusantara yang telah lolos proses kurasi resmi PUI Seni Budaya Majapahitan UNESA.
            </p>
            <Link
              href="/partisipasi/kirim-karya"
              className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-maroon-2"
            >
              Kirim Karya
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. KARYA TERKURASI: search, filters, grid
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <SectionHeading title="Karya Terkurasi" size="sm" />

            <div className="relative mt-6 w-full md:w-96 lg:w-[420px]">
              <label htmlFor="cari-karya-publik" className="sr-only">
                Cari karya publik
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id="cari-karya-publik"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul karya, nama seniman, atau media..."
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

            {/* Below sm the filters scroll sideways in one row instead of wrapping. */}
            <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {subcategories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveCategory(cat);
                      setSelectedArtworkIndex(null);
                    }}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm px-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gold font-semibold text-ink"
                        : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {cat}
                    <span className={isActive ? "text-ink/70" : "text-muted"}>{countFor(cat)}</span>
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="mt-4 text-sm text-muted">
              Menampilkan {filteredItems.length} dari {items.length} karya.
            </p>

            {filteredItems.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item, index) => (
                  <li key={item.id}>
                    <ArtworkCard item={item} onClick={() => setSelectedArtworkIndex(index)} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-16">
                <p className="text-sm text-muted sm:text-base">
                  Tidak ada karya publik yang cocok dengan pencarian atau kategori yang dipilih.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Semua");
                  }}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Reset filter dan pencarian
                </button>
              </div>
            )}
          </section>

          {/* =========================================================================
              3. SUBMISSION CARD (same cream card as the /galeri hub)
          ========================================================================= */}
          <section id="kirim" className="mt-16 sm:mt-20">
            <div className="rounded-xl bg-cream p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-6">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-maroon sm:text-3xl">
                    Ingin Karyamu Dipamerkan di Galeri Publik?
                  </h2>
                  <p className="mt-3.5 text-sm leading-relaxed text-cream-ink/80 sm:text-base">
                    PUI Seni Budaya Majapahitan UNESA membuka kesempatan seluas-luasnya bagi perupa, pematung, fotografer, dan kreator digital.
                  </p>
                  <Link
                    href="/partisipasi/kirim-karya"
                    className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-maroon px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-2 focus-visible:outline-maroon"
                  >
                    Buka Formulir Pengiriman Karya
                  </Link>
                </div>

                <div className="lg:col-span-6 lg:border-l lg:border-cream-ink/15 lg:pl-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                    ALUR KURASI PUBLIK
                  </p>
                  <ol className="mt-4 space-y-3.5 text-sm leading-relaxed text-cream-ink/80">
                    {[
                      "Kirim formulir online & unggah foto karya resolusi tinggi.",
                      "Evaluasi kesesuaian tema & orisinalitas oleh Tim Kurator PUI.",
                      "Notifikasi status kurasi via email pengirim.",
                      "Karya terbit resmi di Galeri Publik Museum Virtual.",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-semibold text-maroon">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Berlangganan carries its own mx-auto max-w-7xl px-4 sm:px-6 and top margin, as on the hub. */}
        <Berlangganan />
      </main>
      <Footer />

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
