import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import { artefakList, artefakCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Artefak & Benda Budaya Majapahit — Museum Konservasi",
  description:
    "Katalog digital prasasti, arca, keramik, perhiasan, dan naskah kuno peninggalan masa Kerajaan Majapahit yang dikonservasi oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function ArtefakKonservasiPage() {
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
              src="/images/koleksi/prasasti.jpg"
              alt="Latar belakang Artefak Majapahit"
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
              <span className="text-gold">Artefak & Benda Budaya</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              MUSEUM KONSERVASI
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              Artefak & Benda Budaya
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Koleksi digital prasasti, arca, keramik, perhiasan, dan benda-benda budaya autentik dari masa kejayaan Kerajaan Majapahit.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. KATEGORI FILTER BAR (Visual Filter Pills)
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <div className="flex flex-col items-center justify-between gap-4 border-b border-hairline pb-6 sm:flex-row">
              <div>
                <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-gold sm:text-2xl">
                  Koleksi Benda Autentik
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Menampilkan {artefakList.length} artefak terdigitalisasi dengan data kuratorial lengkap.
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                {artefakCategories.map((cat, idx) => (
                  <span
                    key={cat}
                    className={`cursor-pointer rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                      idx === 0
                        ? "bg-gold text-ink font-semibold shadow-sm"
                        : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* =========================================================================
                3. KATALOG GRID ARTEFAK (3 Columns)
            ========================================================================= */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artefakList.map((artefak) => (
                <article
                  key={artefak.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1"
                >
                  <div>
                    {/* Image slot */}
                    <div className="relative h-64 w-full overflow-hidden bg-ink">
                      <ImageSlot
                        src={artefak.image}
                        alt={artefak.name}
                        label={artefak.name}
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 rounded-sm bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                        {artefak.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-cream transition-colors group-hover:text-gold">
                        {artefak.name}
                      </h3>

                      {/* Meta chips */}
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted">
                        <span className="rounded-sm border border-hairline bg-ink/60 px-2 py-0.5">
                          Era: <span className="text-cream/90">{artefak.era}</span>
                        </span>
                        <span className="rounded-sm border border-hairline bg-ink/60 px-2 py-0.5">
                          Material: <span className="text-cream/90">{artefak.material}</span>
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-cream/75 sm:text-sm">
                        {artefak.description}
                      </p>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="border-t border-hairline/50 p-6 pt-4 flex items-center justify-end text-xs">
                    <span className="font-semibold text-gold-soft group-hover:text-gold inline-flex items-center gap-1">
                      Detail Artefak
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =========================================================================
              4. CROSS-LINK KE SITUS & ARSITEKTUR (Seamless CTA Layout)
          ========================================================================= */}
          <section className="mt-16 sm:mt-24 border-t border-hairline pt-12 sm:pt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Eksplorasi Lanjutan
                </p>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-cream">
                  Jelajahi Situs & Arsitektur
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-cream/70 leading-relaxed">
                  Kunjungi candi-candi megah, gapura bersejarah, dan kompleks petirtaan kuno yang telah terdokumentasi secara digital.
                </p>
              </div>
              <Link
                href="/konservasi/situs"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-sm border border-gold-deep px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-lg hover:shadow-gold/10 group"
              >
                <span>Lihat Situs</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
