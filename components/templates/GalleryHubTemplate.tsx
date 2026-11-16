"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import ArtworkLightbox from "@/components/gallery/ArtworkLightbox";
import Berlangganan from "@/components/sections/Berlangganan";
import type { KaryaItem, KaryaCategory } from "@/lib/content";

type Props = {
  items: KaryaItem[];
};

const GATEWAYS = [
  {
    href: "/galeri/publik",
    image: "/images/hero/slide-1.jpg",
    title: "Galeri Karya Publik",
    description:
      "Ruang pamer terbuka bagi karya seni lukis, patung, fotografi, dan seni digital bertema Majapahit kiriman seniman serta masyarakat luas.",
    cta: "Jelajahi Galeri",
  },
  {
    href: "/galeri/museum?kategori=otentik",
    image: "/images/koleksi/gapura.jpg",
    title: "Koleksi Peninggalan Otentik",
    description:
      "Katalog visual benda cagar budaya asli, arca batu andesit, prasasti tembaga, dan terakota kuno peninggalan era keemasan Majapahit.",
    cta: "Jelajahi Koleksi",
  },
  {
    href: "/galeri/museum?kategori=kontemporer",
    image: "/images/pameran/rupa.jpg",
    title: "Seni Rupa Kontemporer",
    description:
      "Pameran karya kreasi seni rupa modern, lukisan kanvas ekspresif, dan instalasi visual yang terinspirasi oleh mitologi dan keagungan Majapahit.",
    cta: "Jelajahi Karya",
  },
];

const FILTERS: { key: "all" | KaryaCategory; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "publik", label: "Karya Publik" },
  { key: "otentik", label: "Koleksi Otentik" },
  { key: "kontemporer", label: "Seni Kontemporer" },
];

export default function GalleryHubTemplate({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<"all" | KaryaCategory>("all");
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const countFor = (key: "all" | KaryaCategory) =>
    key === "all" ? items.length : items.filter((item) => item.category === key).length;

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
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src="/images/pameran/rupa.jpg"
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
              <span aria-current="page" className="text-gold">Galeri Karya</span>
            </nav>
            <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              Galeri Virtual Majapahitan
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Jelajahi perbendaharaan visual warisan agung Majapahit melalui peninggalan bersejarah otentik, kreasi seni rupa kontemporer, dan karya kurasi masyarakat.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. TIGA SAYAP GALERI: doors, same treatment as the /konservasi doors
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <SectionHeading title="Tiga Sayap Galeri Visual" size="sm" />

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-y-0">
              {GATEWAYS.map((door) => (
                <li key={door.href} className="md:row-span-4 md:grid md:grid-rows-subgrid">
                  {/* Subgrid rows (image, title, description, button) line up across all three doors,
                      however many lines a title wraps to. Stacks as a plain column on mobile. */}
                  <Link href={door.href} className="group flex flex-col md:row-span-4 md:grid md:grid-rows-subgrid">
                    <div className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-hairline">
                      <ImageSlot
                        src={door.image}
                        alt=""
                        label={door.title}
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-gold transition-colors group-hover:text-gold-soft">
                      {door.title}
                    </h3>
                    <p className="mt-3 mb-6 text-sm leading-relaxed text-cream/80">{door.description}</p>
                    <span className="inline-flex min-h-11 items-center self-start justify-self-start rounded-sm border border-gold-deep px-6 py-3 text-sm font-semibold text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                      {door.cta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* =========================================================================
              3. KOLEKSI VISUAL PILIHAN (cards open the lightbox)
          ========================================================================= */}
          <section className="mt-16 border-t border-hairline pt-14 sm:mt-20">
            <SectionHeading title="Koleksi Visual Pilihan" size="sm" />

            {/* Below sm the filters scroll sideways in one row instead of wrapping. */}
            <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {FILTERS.map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveCategory(tab.key);
                      setSelectedArtworkIndex(null);
                    }}
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
              Menampilkan {filteredItems.length} dari {items.length} karya.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => (
                <li key={item.id}>
                  <ArtworkCard item={item} onClick={() => setSelectedArtworkIndex(index)} />
                </li>
              ))}
            </ul>
          </section>

          {/* =========================================================================
              4. PUBLIC SUBMISSION CTA BANNER (Skeleton Matching)
          ========================================================================= */}
          <section className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-xl bg-cream p-8 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
                {/* Left Column */}
                <div className="lg:col-span-6">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-maroon sm:text-3xl">
                    Ingin Karyamu Dipamerkan di Galeri Publik?
                  </h2>
                  <p className="mt-3.5 text-sm leading-relaxed text-cream-ink/80 sm:text-base">
                    PUI Seni Budaya Majapahitan UNESA membuka kesempatan seluas-luasnya bagi perupa, pematung, fotografer, dan kreator digital.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link
                      href="/partisipasi/kirim-karya"
                      className="inline-flex min-h-11 items-center rounded-sm bg-maroon px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-2 focus-visible:outline-maroon"
                    >
                      Buka Formulir Pengiriman Karya
                    </Link>
                    <Link
                      href="/galeri/publik"
                      className="inline-flex min-h-11 items-center rounded-sm border border-maroon/60 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-maroon transition-colors hover:bg-maroon hover:text-cream focus-visible:outline-maroon"
                    >
                      Lihat Kurasi Publik
                    </Link>
                  </div>
                </div>

                {/* Right Column (No inner card box) */}
                <div className="lg:col-span-6 lg:border-l lg:border-cream-ink/15 lg:pl-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                    ALUR KURASI PUBLIK
                  </p>
                  <ol className="mt-4 space-y-3.5 text-xs leading-relaxed text-cream-ink/80 sm:text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-maroon">1.</span>
                      <span>Kirim formulir online & unggah foto karya resolusi tinggi.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-maroon">2.</span>
                      <span>Evaluasi kesesuaian tema & orisinalitas oleh Tim Kurator PUI.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-maroon">3.</span>
                      <span>Notifikasi status kurasi via email pengirim.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold text-maroon">4.</span>
                      <span>Karya terbit resmi di Galeri Publik Museum Virtual.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* =========================================================================
            5. NEWSLETTER SUBSCRIPTION
            Sits outside the page container: Berlangganan carries its own
            mx-auto max-w-7xl px-4 sm:px-6, the same as on the home page.
        ========================================================================= */}
        <Berlangganan />
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
