"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Upload } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import ArtworkLightbox from "@/components/gallery/ArtworkLightbox";
import Berlangganan from "@/components/sections/Berlangganan";
import type { KaryaItem, KaryaCategory } from "@/lib/content";

type Props = {
  items: KaryaItem[];
};

export default function GalleryHubTemplate({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<"all" | KaryaCategory>("all");
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

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
              src="/images/pameran/rupa.jpg"
              alt="Galeri Seni & Visual Majapahitan"
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
              <span className="text-gold">Galeri Karya</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              RUANG PAMER & APRESIASI SENI
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Galeri Virtual Majapahitan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Jelajahi perbendaharaan visual warisan agung Majapahit melalui peninggalan bersejarah otentik, kreasi seni rupa kontemporer, dan karya kurasi masyarakat.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. THE 3 MAIN GALLERY GATEWAYS (Kategori Galeri)
          ========================================================================= */}
          <section className="mt-14 sm:mt-20">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                JELAJAH RUANG PAMER
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                Tiga Sayap Galeri Visual
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Gateway 1: Galeri Karya Publik */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <ImageSlot
                      src="/images/hero/slide-1.jpg"
                      alt="Galeri Karya Publik"
                      label="Karya Publik"
                      position="absolute"
                      className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-sans text-lg font-bold text-cream group-hover:text-gold transition-colors">
                      Galeri Karya Publik
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                      Ruang pamer terbuka bagi karya seni lukis, patung, fotografi, dan seni digital bertema Majapahit kiriman seniman serta masyarakat luas.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-hairline/60 p-6 pt-4">
                  <Link
                    href="/galeri/publik"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                  >
                    <span>Jelajahi Galeri</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/partisipasi/kirim-karya"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-cream/60 hover:text-gold transition-colors"
                  >
                    <Upload className="h-3 w-3" />
                    <span>Kirim Karya</span>
                  </Link>
                </div>
              </div>

              {/* Gateway 2: Galeri Koleksi Otentik */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <ImageSlot
                      src="/images/koleksi/gapura.jpg"
                      alt="Galeri Koleksi Otentik"
                      label="Koleksi Otentik"
                      position="absolute"
                      className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-sans text-lg font-bold text-cream group-hover:text-gold transition-colors">
                      Koleksi Peninggalan Otentik
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                      Katalog visual benda cagar budaya asli, arca batu andesit, prasasti tembaga, dan terakota kuno peninggalan era keemasan Majapahit.
                    </p>
                  </div>
                </div>

                <div className="border-t border-hairline/60 p-6 pt-4">
                  <Link
                    href="/galeri/museum/otentik"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                  >
                    <span>Jelajahi Koleksi</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Gateway 3: Galeri Seni Kontemporer */}
              <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <ImageSlot
                      src="/images/pameran/rupa.jpg"
                      alt="Galeri Seni Kontemporer"
                      label="Seni Kontemporer"
                      position="absolute"
                      className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-sans text-lg font-bold text-cream group-hover:text-gold transition-colors">
                      Seni Rupa Kontemporer
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
                      Pameran karya kreasi seni rupa modern, lukisan kanvas ekspresif, dan instalasi visual yang terinspirasi oleh mitologi dan keagungan Majapahit.
                    </p>
                  </div>
                </div>

                <div className="border-t border-hairline/60 p-6 pt-4">
                  <Link
                    href="/galeri/museum/kontemporer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-soft transition-colors"
                  >
                    <span>Jelajahi Karya</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. INTERACTIVE CURATED SHOWCASE (With Lightbox Modal)
          ========================================================================= */}
          <section className="mt-20 sm:mt-28">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-hairline pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  PRATINJAU INTERAKTIF
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                  Koleksi Visual Pilihan
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Klik pada karya mana saja untuk membuka tampilan layar penuh (*Lightbox*) dan membaca makna kuratorialnya.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "Semua Koleksi" },
                  { key: "publik", label: "Karya Publik" },
                  { key: "otentik", label: "Koleksi Otentik" },
                  { key: "kontemporer", label: "Seni Kontemporer" },
                ].map((tab) => {
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveCategory(tab.key as "all" | KaryaCategory)}
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
            </div>

            {/* Artwork Cards Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredItems.map((item, index) => (
                <ArtworkCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedArtworkIndex(index)}
                />
              ))}
            </div>
          </section>

          {/* =========================================================================
              4. PUBLIC SUBMISSION CTA BANNER (Skeleton Matching)
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

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href="/partisipasi/kirim-karya"
                      className="inline-flex items-center rounded-sm bg-maroon px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:bg-maroon-2 hover:shadow-lg"
                    >
                      Buka Formulir Pengiriman Karya
                    </Link>
                    <Link
                      href="/galeri/publik"
                      className="inline-flex items-center rounded-sm border border-gold-deep px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
                    >
                      Lihat Kurasi Publik
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
