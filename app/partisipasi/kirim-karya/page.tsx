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
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
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
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO & BREADCRUMB
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-24">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
            <ImageSlot
              src={hero.image}
              alt="Latar belakang Kirim Karya Majapahitan"
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
              <span className="text-muted">Partisipasi</span>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">Kirim Karya</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              {hero.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              {hero.subtitle}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. KONTEN DUA KOLOM: PANDUAN DULUAN, KEMUDIAN FORMULIR
          ========================================================================= */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            {/* KOLOM PANDUAN & INFORMASI (5 Cols di Desktop, Muncul Pertama di Mobile) */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-xl bg-panel p-6 sm:p-8 ring-gold-frame space-y-8">
                {/* 1. Kriteria Karya */}
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <BookOpen className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                      {panduan.kriteriaEyebrow}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-cream">
                    {panduan.kriteriaTitle}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {panduan.kriteriaList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-cream/80 sm:text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Ketentuan Teknis Berkas */}
                <div className="border-t border-hairline pt-6">
                  <div className="flex items-center gap-2 text-gold">
                    <FileCheck className="h-4 w-4" />
                    <h4 className="font-display text-base font-semibold text-cream">
                      {panduan.teknisTitle}
                    </h4>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-cream/75 sm:text-sm">
                    {panduan.teknisList.map((teknis, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span>{teknis}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Alur Proses Kurasi */}
                <div className="border-t border-hairline pt-6">
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="h-4 w-4" />
                    <h4 className="font-display text-base font-semibold text-cream">
                      {panduan.alurTitle}
                    </h4>
                  </div>

                  <div className="mt-4 space-y-4">
                    {panduan.alurSteps.map((step) => (
                      <div key={step.step} className="flex items-start gap-3.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold ring-1 ring-gold/30">
                          {step.step}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-cream sm:text-sm">
                            {step.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Hak Cipta & Etika */}
                <div className="border-t border-hairline pt-6">
                  <div className="flex items-start gap-3 rounded-lg border border-hairline bg-ink-2/60 p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p className="text-xs leading-relaxed text-muted">
                      {panduan.hakCipta}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seksi Cross-link ke Galeri Publik */}
              <div className="rounded-xl border border-hairline bg-panel p-5 ring-gold-frame flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-sm font-semibold text-cream">
                    Lihat Karya yang Sudah Terkurasi
                  </h4>
                  <p className="text-xs text-muted">
                    Telusuri karya-karya publik yang telah lolos peninjauan kuratorial.
                  </p>
                </div>
                <Link
                  href="/galeri/publik"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-gold-soft hover:text-gold"
                >
                  Galeri Publik
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>

            {/* KOLOM FORMULIR PENGIRIMAN (7 Cols di Desktop) */}
            <div className="lg:col-span-7">
              <KirimKaryaForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
