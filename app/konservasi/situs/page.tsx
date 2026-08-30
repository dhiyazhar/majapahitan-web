import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Calendar, ArrowRight, Layers, Gem } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import { situsList, type SitusItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "Situs & Arsitektur Majapahit — Museum Konservasi",
  description:
    "Katalog dokumentasi candi, gapura, petirtaan, dan peninggalan arsitektur Kerajaan Majapahit di Jawa Timur oleh PUI Seni Budaya Majapahitan UNESA.",
};

const statusBadgeStyles: Record<SitusItem["status"], string> = {
  "Terdokumentasi": "bg-gold/15 text-gold border-gold/30",
  "Pemindaian 3D": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Dalam Proses": "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

export default function SitusKonservasiPage() {
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
              src="/images/koleksi/gapura.jpg"
              alt="Latar belakang Situs Majapahit"
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <Link href="/konservasi" className="hover:text-gold transition-colors">
                Museum Konservasi
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">Situs & Arsitektur</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              MUSEUM KONSERVASI
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Situs & Arsitektur Majapahit
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Dokumentasi digital candi, gapura, petirtaan, dan kompleks bangunan peninggalan Kerajaan Majapahit yang tersebar di wilayah Jawa Timur.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. KATALOG GRID SITUS
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <div className="flex flex-col justify-between gap-4 border-b border-hairline pb-5 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-gold sm:text-2xl">
                  Daftar Situs Peninggalan
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Menampilkan {situsList.length} situs bersejarah yang telah melalui proses survei dan dokumentasi.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {situsList.map((situs) => (
                <article
                  key={situs.id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 sm:flex-row"
                >
                  {/* Photo container */}
                  <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56 md:w-64">
                    <ImageSlot
                      src={situs.image}
                      alt={situs.name}
                      label={situs.name}
                      position="absolute"
                      className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
                    <span
                      className={`absolute top-3 left-3 rounded-sm border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur sm:bottom-auto ${
                        statusBadgeStyles[situs.status]
                      }`}
                    >
                      {situs.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream transition-colors group-hover:text-gold sm:text-xl">
                        {situs.name}
                      </h3>

                      {/* Metadata tags */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gold" />
                          {situs.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          {situs.era}
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-cream/75 sm:text-sm">
                        {situs.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-hairline/50 flex items-center justify-between text-xs">
                      <span className="text-muted text-[11px]">PUI-PT Seni Budaya Majapahitan</span>
                      <span className="font-semibold text-gold-soft group-hover:text-gold inline-flex items-center gap-1">
                        Lihat Rekam Digital
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =========================================================================
              3. PETA SEBARAN SITUS (Placeholder Section)
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="overflow-hidden rounded-xl bg-panel p-6 ring-gold-frame sm:p-10">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    PETA ARKEOLOGI
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight text-cream sm:text-3xl">
                    Sebaran Situs Majapahit di Jawa Timur
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-cream/80">
                    Mayoritas peninggalan arsitektur monumental terkonsentrasi di kawasan Trowulan, Kabupaten Mojokerto — wilayah seluas ±100 km² yang diyakini sebagai bekas pusat ibukota Kemaharajaan Majapahit.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    Fitur peta sebaran interaktif dengan koordinat GPS dan model 3D spasial sedang dalam tahap integrasi kuratorial digital.
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80">
                    <ImageSlot
                      src="/images/koleksi/peta.jpg"
                      alt="Peta Sebaran Situs Majapahit"
                      label="Peta Spasial Situs Trowulan"
                      position="absolute"
                      className="inset-0 h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 right-3 rounded-sm bg-black/70 px-3 py-1 text-xs text-muted backdrop-blur">
                      Kawasan Percandian & Pemukiman Kuno
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. CROSS-LINK KE ARTEFAK & BENDA BUDAYA
          ========================================================================= */}
          <section className="mt-16 sm:mt-20">
            <div className="rounded-xl border border-hairline bg-gradient-to-r from-ink-2 to-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/30">
                  <Gem className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-cream">
                    Jelajahi Artefak & Benda Budaya
                  </h3>
                  <p className="text-xs text-muted sm:text-sm">
                    Telusuri koleksi prasasti berharga, arca andesit, gerabah, dan perhiasan peninggalan Majapahit.
                  </p>
                </div>
              </div>
              <Link
                href="/konservasi/artefak"
                className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-gold-deep px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Lihat Artefak
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
