import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import Rail from "@/components/ui/Rail";
import SectionHeading from "@/components/ui/SectionHeading";
import { situsList } from "@/lib/content";

export const metadata: Metadata = {
  title: "Situs & Arsitektur Majapahit — Museum Konservasi",
  description:
    "Katalog dokumentasi candi, gapura, petirtaan, dan peninggalan arsitektur Kerajaan Majapahit di Jawa Timur oleh PUI Seni Budaya Majapahitan UNESA.",
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
              <span aria-current="page" className="text-gold">Situs & Arsitektur</span>
            </nav>

            <h1 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              Situs & Arsitektur Majapahit
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-cream/80 sm:text-base">
              Dokumentasi digital candi, gapura, petirtaan, dan kompleks bangunan peninggalan Kerajaan Majapahit yang tersebar di wilayah Jawa Timur.
            </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. KATALOG SITUS
              Same treatment as the hub doors and home KoleksiHighlight: bare image, text on the page.
              No hover effects: sites have no detail pages yet.
          ========================================================================= */}
          <section className="mt-12 sm:mt-16">
            <SectionHeading title="Daftar Situs Peninggalan" size="sm" />

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {situsList.map((situs) => (
                <li key={situs.id}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-hairline">
                    <ImageSlot
                      src={situs.image}
                      alt=""
                      label={situs.name}
                      position="absolute"
                      className="inset-0 h-full w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-gold">
                    {situs.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {situs.location} · {situs.era}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/80">
                    {situs.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* =========================================================================
              3. PETA SEBARAN SITUS (no map yet, so no map image)
          ========================================================================= */}
          <div className="mt-16">
            <Rail title="Sebaran Situs">
              <div className="max-w-prose space-y-3 text-sm leading-relaxed text-cream/80 sm:text-base">
                <p>
                  Mayoritas peninggalan arsitektur monumental terkonsentrasi di kawasan Trowulan, Kabupaten Mojokerto — wilayah seluas ±100 km² yang diyakini sebagai bekas pusat ibukota Kemaharajaan Majapahit.
                </p>
                <p className="text-muted">Peta sebaran interaktif belum tersedia.</p>
              </div>
            </Rail>
          </div>

          {/* =========================================================================
              4. CROSS-LINK KE ARTEFAK & BENDA BUDAYA (Seamless CTA Layout)
          ========================================================================= */}
          <section className="mt-2">
            <div className="rounded-xl bg-cream p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                    Eksplorasi Lanjutan
                  </p>
                  <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-maroon">
                    Jelajahi Artefak & Benda Budaya
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-cream-ink/80 leading-relaxed">
                    Telusuri koleksi prasasti berharga, arca andesit, gerabah, dan perhiasan peninggalan Majapahit yang telah terdokumentasi secara digital.
                  </p>
                </div>
                <Link
                  href="/konservasi/artefak"
                  className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-sm border border-maroon/60 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-maroon transition-colors hover:bg-maroon hover:text-cream focus-visible:outline-maroon"
                >
                  <span>Lihat Artefak</span>
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
