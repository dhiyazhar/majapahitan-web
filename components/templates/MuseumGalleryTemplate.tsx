"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Search, X, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import ArtworkLightbox from "@/components/gallery/ArtworkLightbox";
import Berlangganan from "@/components/sections/Berlangganan";
import type { KaryaItem, KaryaCategory } from "@/lib/content";

type Props = {
  items: KaryaItem[];
  mode?: "all-museum" | "otentik" | "kontemporer";
};

export default function MuseumGalleryTemplate({ items, mode = "all-museum" }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | KaryaCategory>(
    mode === "otentik" ? "otentik" : mode === "kontemporer" ? "kontemporer" : "all"
  );
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

  const activeArtwork =
    selectedArtworkIndex !== null && filteredItems[selectedArtworkIndex]
      ? filteredItems[selectedArtworkIndex]
      : null;

  // Title & Metadata based on mode
  const pageMeta = useMemo(() => {
    if (mode === "otentik") {
      return {
        eyebrow: "PENINGGALAN SEJARAH ASLI",
        title: "Koleksi Peninggalan Otentik",
        description:
          "Arsip visual kuratorial peninggalan bersejarah asli era Majapahit abad ke-14: arca andesit, foto ornamen relief candi, pusaka tosan aji kerajaan, dan prasasti tembaga.",
        breadcrumb: "Karya Otentik",
        heroImage: "/images/koleksi/gapura.jpg",
      };
    }
    if (mode === "kontemporer") {
      return {
        eyebrow: "SENI RUPA MODERN MAJAPAHITAN",
        title: "Karya Seni Rupa Kontemporer",
        description:
          "Eksplorasi kreasi seni rupa modern, lukisan ekspresif, kain tenun/batik modern berpola ornamen candi, dan instalasi digital yang terinspirasi oleh mitologi dan keagungan Majapahit.",
        breadcrumb: "Karya Kontemporer",
        heroImage: "/images/pameran/rupa.jpg",
      };
    }
    return {
      eyebrow: "KOLEKSI ARSIP & KURASI INTERNAL PUI",
      title: "Galeri Virtual Museum",
      description:
        "Ruang pameran visual resmi koleksi internal PUI Seni Budaya Majapahitan UNESA yang memadukan keagungan peninggalan sejarah otentik dengan daya cipta seni rupa kontemporer.",
      breadcrumb: "Galeri Virtual Museum",
      heroImage: "/images/pameran/arsitektur.jpg",
    };
  }, [mode]);

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
              src={pageMeta.heroImage}
              alt={pageMeta.title}
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <Link href="/galeri" className="transition-colors hover:text-gold">
                Galeri Karya
              </Link>
              {mode !== "all-museum" ? (
                <>
                  <ChevronRight className="h-3 w-3 text-hairline" />
                  <Link href="/galeri/museum" className="transition-colors hover:text-gold">
                    Galeri Virtual Museum
                  </Link>
                </>
              ) : null}
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">{pageMeta.breadcrumb}</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              {pageMeta.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              {pageMeta.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              {pageMeta.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. TWO WINGS GATEWAY (Only shown on /galeri/museum main portal)
          ========================================================================= */}
          {mode === "all-museum" ? (
            <section className="mt-14 sm:mt-20">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  DUA SAYAP KURASI
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                  Klasifikasi Koleksi Museum
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Wing 1: Koleksi Otentik */}
                <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1">
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-black/40">
                      <ImageSlot
                        src="/images/koleksi/gapura.jpg"
                        alt="Karya & Peninggalan Otentik"
                        label="Koleksi Otentik"
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="font-sans text-xl font-bold text-cream group-hover:text-gold transition-colors">
                        Karya & Peninggalan Otentik
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                        Dokumentasi visual artefak asli, pusaka kerajaan, foto makro ornamen candi, arca andesit, dan prasasti tembaga abad ke-14.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-hairline/60 p-6 pt-4">
                    <Link
                      href="/galeri/museum/otentik"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                    >
                      <span>Masuk Sayap Otentik</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Wing 2: Seni Rupa Kontemporer */}
                <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1">
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-black/40">
                      <ImageSlot
                        src="/images/pameran/rupa.jpg"
                        alt="Karya Seni Rupa Kontemporer"
                        label="Seni Kontemporer"
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="font-sans text-xl font-bold text-cream group-hover:text-gold transition-colors">
                        Karya Seni Rupa Kontemporer
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                        Koleksi seni rupa modern, lukisan ekspresi, kain/batik modern berpola relief candi, dan instalasi media baru bernafaskan Majapahit.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-hairline/60 p-6 pt-4">
                    <Link
                      href="/galeri/museum/kontemporer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                    >
                      <span>Masuk Sayap Kontemporer</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {/* =========================================================================
              3. FILTER & SEARCH TOOLBAR
          ========================================================================= */}
          <section className="mt-14 sm:mt-20">
            <div className="flex flex-col gap-5 border-b border-hairline pb-6">
              {/* Top Row: Search & Counter */}
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="relative w-full md:w-96 lg:w-[420px]">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama koleksi, pusaka, seniman, atau bahan..."
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
                  Menampilkan <span className="font-semibold text-gold">{filteredItems.length}</span> dari {items.length} koleksi museum
                </p>
              </div>

              {/* Bottom Row: Category Tabs (Only on all-museum mode) */}
              {mode === "all-museum" ? (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {[
                    { key: "all", label: "Semua Koleksi Museum" },
                    { key: "otentik", label: "Karya Otentik" },
                    { key: "kontemporer", label: "Seni Kontemporer" },
                  ].map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as "all" | KaryaCategory)}
                        className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                          isActive
                            ? "bg-gold text-ink shadow-sm"
                            : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* =========================================================================
                4. ARTWORK CARDS GRID
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
                  Tidak ada koleksi museum yang cocok dengan kriteria pencarian &ldquo;{searchQuery}&rdquo;.
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
              5. 3D VIRTUAL EXPLORATION BANNER (Skeleton Matching)
          ========================================================================= */}
          <section className="mt-20 sm:mt-28">
            <div className="relative overflow-hidden rounded-xl border border-hairline bg-panel p-8 shadow-xl ring-gold-frame sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
                {/* Left Column */}
                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                    Jelajahi Ruang Pamer Interaktif 3D
                  </h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-cream/85 sm:text-base">
                    Nikmati pengalaman tur imersif 360 derajat mengelilingi replika ruang pamer candi dan koleksi museum secara virtual dari peramban Anda.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href="/program/majapahit-dalam-arsitektur"
                      className="inline-flex items-center rounded-sm bg-maroon px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:bg-maroon-2 hover:shadow-lg"
                    >
                      Buka Tur Virtual 3D
                    </Link>
                    <Link
                      href="/galeri"
                      className="inline-flex items-center rounded-sm border border-gold-deep px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
                    >
                      Kembali ke Galeri Utama
                    </Link>
                  </div>
                </div>

                {/* Right Column (No inner card box) */}
                <div className="lg:col-span-6 lg:border-l lg:border-hairline/80 lg:pl-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    KEISTIMEWAAN GALERI VIRTUAL PUI
                  </p>
                  <ol className="mt-4 space-y-3.5 text-xs leading-relaxed text-cream/90 sm:text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">1.</span>
                      <span>Model 3D fotogrametri dengan akurasi terestrial beresolusi tinggi.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">2.</span>
                      <span>Catatan kuratorial mendalam oleh pakar sejarah dan arkeologi UNESA.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">3.</span>
                      <span>Dukungan lintas perangkat (desktop, tablet, dan smartphone).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-gold">4.</span>
                      <span>Akses terbuka bebas biaya untuk edukasi masyarakat dan akademisi.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
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
