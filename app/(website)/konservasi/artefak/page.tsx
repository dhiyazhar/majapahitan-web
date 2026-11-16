import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ArtefakCatalog from "@/components/konservasi/ArtefakCatalog";

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
              <Link href="/" className="hover:text-gold transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
              <Link href="/konservasi" className="hover:text-gold transition-colors">
                Museum Konservasi
              </Link>
              <ChevronRight className="h-3 w-3 text-muted/60" aria-hidden />
              <span aria-current="page" className="text-gold">Artefak & Benda Budaya</span>
            </nav>

            <h1 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              Artefak & Benda Budaya
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">
              Koleksi digital prasasti, arca, keramik, perhiasan, dan benda-benda budaya autentik dari masa kejayaan Kerajaan Majapahit.
            </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ArtefakCatalog />

          {/* =========================================================================
              4. CROSS-LINK KE SITUS & ARSITEKTUR (Seamless CTA Layout)
          ========================================================================= */}
          <section className="mt-16 sm:mt-20">
            <div className="rounded-xl bg-cream p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                    Eksplorasi Lanjutan
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-maroon">
                    Jelajahi Situs & Arsitektur
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-cream-ink/80 leading-relaxed">
                    Kunjungi candi-candi megah, gapura bersejarah, dan kompleks petirtaan kuno yang telah terdokumentasi secara digital.
                  </p>
                </div>
                <Link
                  href="/konservasi/situs"
                  className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-sm border border-maroon/60 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-maroon transition-colors hover:bg-maroon hover:text-cream focus-visible:outline-maroon"
                >
                  <span>Lihat Situs</span>
                  <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
