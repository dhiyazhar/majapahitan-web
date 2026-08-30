import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
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
      <main className="flex-1 pb-16 pt-6 sm:pb-24 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              BREADCRUMB RINGKAS
          ========================================================================= */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-gold transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3 text-hairline" />
            <span className="text-muted">Partisipasi</span>
            <ChevronRight className="h-3 w-3 text-hairline" />
            <span className="text-gold">Ruang Partisipasi Karya</span>
          </nav>

          {/* =========================================================================
              SPLIT-SCREEN STUDIO LAYOUT
              Kiri: Sticky Sidecar (Identitas, Alur, & Panduan Kuratorial)
              Kanan: Formulir Pengiriman Utama (Langsung Terlihat di Layar Pertama)
          ========================================================================= */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
            {/* SISI KIRI — STICKY SIDECAR (5 COLS) */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
              {/* Kartu Utama: Info & Panduan */}
              <div className="relative overflow-hidden rounded-xl bg-panel p-6 sm:p-8 ring-gold-frame">
                {/* Ambient glow accent */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/10 blur-2xl" />

                {/* Header Judul Portal */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                    <Sparkles className="h-3 w-3" />
                    <span>{hero.eyebrow}</span>
                  </div>

                  <h1 className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-cream sm:text-3xl">
                    {hero.title}
                  </h1>

                  <p className="mt-3 text-xs leading-relaxed text-cream/75 sm:text-sm">
                    {hero.subtitle}
                  </p>
                </div>

                {/* 3 Langkah Alur Kurasi */}
                <div className="mt-6 border-t border-hairline/70 pt-6">
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="h-4 w-4" />
                    <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
                      {panduan.alurTitle}
                    </h2>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {panduan.alurSteps.map((step) => (
                      <div key={step.step} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold ring-1 ring-gold/30">
                          {step.step}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-cream">
                            {step.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panduan Ringkas & Ketentuan Berkas */}
                <div className="mt-6 border-t border-hairline/70 pt-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-gold mb-2.5">
                      <BookOpen className="h-4 w-4" />
                      <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
                        {panduan.kriteriaTitle}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {panduan.kriteriaList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-cream/75">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-soft" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-hairline bg-ink-2/60 p-3.5">
                    <div className="flex items-center gap-2 text-gold mb-1.5">
                      <FileCheck className="h-3.5 w-3.5" />
                      <h4 className="text-xs font-semibold text-cream">
                        {panduan.teknisTitle}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted">
                      JPG, PNG, atau WebP • Maks. 5 MB • Resolusi disarankan min. 1200×800 px.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-lg border border-hairline bg-ink/40 p-3.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-[11px] leading-relaxed text-muted">
                      {panduan.hakCipta}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tautan Cepat ke Galeri Publik */}
              <div className="rounded-xl border border-hairline bg-panel p-4 ring-gold-frame flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="font-semibold text-cream block">
                    Galeri Karya Publik
                  </span>
                  <span className="text-muted text-[11px]">
                    Lihat karya-karya yang sudah disetujui kurator.
                  </span>
                </div>
                <Link
                  href="/galeri/publik"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-gold-soft hover:text-gold transition-colors"
                >
                  Buka Galeri
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>

            {/* SISI KANAN — KANVAS FORMULIR PENGIRIMAN (7 COLS) */}
            <section className="lg:col-span-7">
              <KirimKaryaForm />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
