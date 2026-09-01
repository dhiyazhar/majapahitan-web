import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KirimKaryaForm from "@/components/forms/KirimKaryaForm";
import { kirimKaryaPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ruang Partisipasi Karya — Museum Virtual Majapahitan",
  description:
    "Formulir pengiriman dan kurasi karya seni rupa, ilustrasi, fotografi, dan karya kreatif publik terinspirasi kebudayaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function KirimKaryaPage() {
  const { hero, panduan } = kirimKaryaPage;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 pt-8 sm:pt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* =========================================================================
              1. BREADCRUMB & HEADER TERPUSAT (CENTERED FOCUS)
          ========================================================================= */}
          <div className="text-center">
            {/* Breadcrumb */}
            <nav className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-muted">Partisipasi</span>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">Ruang Karya</span>
            </nav>

            {/* Judul Halaman */}
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-cream sm:text-4xl lg:text-5xl">
              {hero.title}
            </h1>

            {/* Deskripsi Pengantar */}
            <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-cream/80 sm:text-sm md:text-base">
              {hero.subtitle}
            </p>
          </div>

          {/* =========================================================================
              2. KARTU PANDUAN & ALUR KURASI (ACCORDION / DRAWER RINGKAS)
          ========================================================================= */}
          <section className="mt-8 sm:mt-10">
            <details
              className="group overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300"
              open
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 sm:p-7 transition-colors hover:bg-panel-2">
                <div>
                  <h2 className="font-display text-base font-semibold uppercase tracking-wider text-cream sm:text-lg">
                    Panduan & Kriteria Kurasi
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Alur peninjauan karya, kriteria materi, dan ketentuan berkas digital.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gold-soft">
                  <span className="hidden sm:inline">Buka / Tutup</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180 text-gold" />
                </div>
              </summary>

              <div className="border-t border-hairline p-6 sm:p-8 space-y-8 bg-ink-2/30">
                {/* 1. Alur Proses Kurasi — Horizontal Connected Timeline */}
                <div>
                  <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
                    {panduan.alurTitle}
                  </h3>

                  <div className="relative mt-6">
                    {/* Connecting Line Track */}
                    <div className="absolute top-4 left-6 right-6 hidden sm:block h-[1px] bg-gradient-to-r from-gold/30 via-gold/60 to-gold/30" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6">
                      {panduan.alurSteps.map((step) => (
                        <div
                          key={step.step}
                          className="relative z-10 flex flex-col items-start"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink border border-gold-deep font-display text-xs font-bold text-gold ring-4 ring-panel">
                            {step.step}
                          </span>
                          <h4 className="mt-3.5 font-display text-xs font-semibold uppercase tracking-wide text-cream sm:text-sm">
                            {step.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Kriteria & Ketentuan Berkas (Editorial Clean List — Tanpa Kotak & Tanpa Ikon Checkmark) */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 pt-6 border-t border-hairline/60">
                  {/* Kriteria Karya */}
                  <div>
                    <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
                      {panduan.kriteriaTitle}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {panduan.kriteriaList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs leading-relaxed text-cream/80"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ketentuan Berkas */}
                  <div>
                    <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
                      {panduan.teknisTitle}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {panduan.teknisList.map((teknis, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs leading-relaxed text-cream/80"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                          <span>{teknis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3. Catatan Hak Cipta & Etika (Clean Editorial Note Tanpa Box) */}
                <div className="pt-4 border-t border-hairline/60">
                  <p className="text-xs text-muted leading-relaxed">
                    <span className="font-semibold text-cream/90">Ketentuan Hak Cipta: </span>
                    {panduan.hakCipta}
                  </p>
                </div>
              </div>
            </details>
          </section>

          {/* =========================================================================
              3. FORMULIR PENGIRIMAN UTAMA (NASKAH KURATORIAL TERPUSAT)
          ========================================================================= */}
          <section className="mt-8 sm:mt-10">
            <KirimKaryaForm />
          </section>

          {/* =========================================================================
              4. FOOTER TAUTAN GALERI PUBLIK
          ========================================================================= */}
          <div className="mt-10 text-center">
            <p className="text-xs text-muted">
              Ingin melihat karya publik yang telah disetujui kurator?{" "}
              <Link
                href="/galeri/publik"
                className="font-semibold text-gold-soft hover:text-gold inline-flex items-center gap-1 transition-colors underline"
              >
                Kunjungi Galeri Karya Publik
                <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
