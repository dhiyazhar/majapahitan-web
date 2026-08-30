import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  FileCheck,
  Clock,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
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

            {/* Eyebrow badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                <Sparkles className="h-3 w-3" />
                {hero.eyebrow}
              </span>
            </div>

            {/* Judul Halaman */}
            <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-cream sm:text-4xl lg:text-5xl">
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
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 sm:p-6 transition-colors hover:bg-panel-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/30">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-cream sm:text-base">
                      Panduan & Kriteria Kurasi Karya
                    </h2>
                    <p className="text-[11px] text-muted sm:text-xs">
                      Ketentuan berkas, tahapan peninjauan kurator, dan hak cipta.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gold-soft">
                  <span className="hidden sm:inline font-medium">
                    Buka / Tutup
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180 text-gold" />
                </div>
              </summary>

              <div className="border-t border-hairline/80 p-5 sm:p-7 space-y-6 bg-ink-2/40">
                {/* 3 Langkah Alur */}
                <div>
                  <div className="flex items-center gap-2 text-gold mb-3">
                    <Clock className="h-4 w-4" />
                    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream sm:text-sm">
                      {panduan.alurTitle}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {panduan.alurSteps.map((step) => (
                      <div
                        key={step.step}
                        className="rounded-lg border border-hairline bg-panel p-3.5"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold ring-1 ring-gold/30">
                          {step.step}
                        </span>
                        <p className="mt-2 text-xs font-semibold text-cream">
                          {step.title}
                        </p>
                        <p className="mt-1 text-[11px] text-muted leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kriteria & Ketentuan File (2 Kolom di Tablet/Desktop) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2 border-t border-hairline/50">
                  {/* Kriteria */}
                  <div>
                    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-cream sm:text-sm mb-3">
                      {panduan.kriteriaTitle}
                    </h3>
                    <ul className="space-y-2.5">
                      {panduan.kriteriaList.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/75"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-soft" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ketentuan Berkas & Hak Cipta */}
                  <div className="space-y-3.5">
                    <div className="rounded-lg border border-hairline bg-panel p-3.5">
                      <div className="flex items-center gap-2 text-gold mb-1.5">
                        <FileCheck className="h-4 w-4" />
                        <h4 className="text-xs font-semibold text-cream">
                          {panduan.teknisTitle}
                        </h4>
                      </div>
                      <p className="text-[11px] leading-relaxed text-muted">
                        Format berkas JPG, PNG, atau WebP • Maksimal 5 MB • Resolusi disarankan minimal 1200 × 800 piksel.
                      </p>
                    </div>

                    <div className="rounded-lg border border-hairline bg-ink/50 p-3.5 flex items-start gap-2.5">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <p className="text-[11px] leading-relaxed text-muted">
                        {panduan.hakCipta}
                      </p>
                    </div>
                  </div>
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
