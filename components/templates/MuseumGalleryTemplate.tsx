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
import type { FooterPartner } from "@/components/layout/Footer";

export type MuseumFilter = "all" | "otentik" | "kontemporer";

type Props = {
  items: KaryaItem[];
  /** From ?kategori= so links like /galeri/museum?kategori=otentik open pre-filtered. */
  initialCategory?: MuseumFilter;
  partnerLogos?: FooterPartner[];
};

const FILTERS: { key: MuseumFilter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "otentik", label: "Karya Otentik" },
  { key: "kontemporer", label: "Seni Kontemporer" },
];

export default function MuseumGalleryTemplate({ items, initialCategory = "all", partnerLogos }: Props) {
  const [activeTab, setActiveTab] = useState<MuseumFilter>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchTab = activeTab === "all" || item.category === activeTab;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.creator.toLowerCase().includes(q) ||
        (item.institution && item.institution.toLowerCase().includes(q)) ||
        (item.material && item.material.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [items, activeTab, searchQuery]);

  const countFor = (key: MuseumFilter) =>
    key === "all" ? items.length : items.filter((item) => item.category === key).length;

  const selectTab = (key: MuseumFilter) => {
    setActiveTab(key);
    setSelectedArtworkIndex(null);
    // Keep the URL shareable without a navigation or re-render.
    const url = new URL(window.location.href);
    if (key === "all") url.searchParams.delete("kategori");
    else url.searchParams.set("kategori", key);
    window.history.replaceState(null, "", url);
  };

  const activeArtwork =
    selectedArtworkIndex !== null && filteredItems[selectedArtworkIndex]
      ? filteredItems[selectedArtworkIndex]
      : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO & BREADCRUMB (same structure as /galeri and /galeri/publik)
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src="/images/pameran/arsitektur.jpg"
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
              <span aria-current="page" className="text-gold">Galeri Virtual Museum</span>
            </nav>
            <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              Galeri Virtual Museum
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Ruang pameran visual resmi koleksi internal PUI Seni Budaya Majapahitan UNESA yang memadukan keagungan peninggalan sejarah otentik dengan daya cipta seni rupa kontemporer.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. KOLEKSI MUSEUM: one page for both Otentik and Kontemporer
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <SectionHeading title="Koleksi Museum" size="sm" />

            <div className="relative mt-6 w-full md:w-96 lg:w-[420px]">
              <label htmlFor="cari-koleksi-museum" className="sr-only">
                Cari koleksi museum
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id="cari-koleksi-museum"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama koleksi, pusaka, seniman, atau bahan..."
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
              {FILTERS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectTab(tab.key)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm px-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gold font-semibold text-ink"
                        : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {tab.label}
                    <span className={isActive ? "text-ink/70" : "text-muted"}>{countFor(tab.key)}</span>
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="mt-4 text-sm text-muted">
              Menampilkan {filteredItems.length} dari {items.length} koleksi.
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
                  Tidak ada koleksi museum yang cocok dengan pencarian atau kategori yang dipilih.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    selectTab("all");
                  }}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Reset filter dan pencarian
                </button>
              </div>
            )}
          </section>

          {/* =========================================================================
              3. TUR VIRTUAL CARD (same cream card as the other gallery pages)
          ========================================================================= */}
          <section className="mt-16 sm:mt-20">
            <div className="rounded-xl bg-cream p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-6">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-maroon sm:text-3xl">
                    Jelajahi Ruang Pamer Interaktif 3D
                  </h2>
                  <p className="mt-3.5 text-sm leading-relaxed text-cream-ink/80 sm:text-base">
                    Nikmati pengalaman tur imersif 360 derajat mengelilingi replika ruang pamer candi dan koleksi museum secara virtual dari peramban Anda.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href="/program/majapahit-dalam-arsitektur"
                      className="inline-flex min-h-11 items-center rounded-sm bg-maroon px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-2 focus-visible:outline-maroon"
                    >
                      Buka Tur Virtual 3D
                    </Link>
                    <Link
                      href="/galeri"
                      className="inline-flex min-h-11 items-center rounded-sm border border-maroon/60 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-maroon transition-colors hover:bg-maroon hover:text-cream focus-visible:outline-maroon"
                    >
                      Kembali ke Galeri Utama
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-6 lg:border-l lg:border-cream-ink/15 lg:pl-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                    KEISTIMEWAAN GALERI VIRTUAL PUI
                  </p>
                  <ol className="mt-4 space-y-3.5 text-sm leading-relaxed text-cream-ink/80">
                    {[
                      "Model 3D fotogrametri dengan akurasi terestrial beresolusi tinggi.",
                      "Catatan kuratorial mendalam oleh pakar sejarah dan arkeologi UNESA.",
                      "Dukungan lintas perangkat (desktop, tablet, dan smartphone).",
                      "Akses terbuka bebas biaya untuk edukasi masyarakat dan akademisi.",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-semibold text-maroon">{i + 1}.</span>
                        <span>{point}</span>
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
      <Footer partnerLogos={partnerLogos} />

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
