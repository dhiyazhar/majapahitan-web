"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, BookOpen, Users, Copy, Check, ArrowLeft, Award, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PublicationCard from "@/components/posts/PublicationCard";
import type { PublikasiItem } from "@/lib/content";

type Props = {
  item: PublikasiItem;
  relatedItems: PublikasiItem[];
};

export default function PublicationDetailTemplate({ item, relatedItems }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(item.citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. BREADCRUMB & HEADER
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <Link href="/publikasi" className="transition-colors hover:text-gold">
                Publikasi & Penelitian
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="truncate max-w-[200px] sm:max-w-xs text-gold">
                {item.title}
              </span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {item.sintaBadge ? (
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-maroon px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  <Award className="h-3.5 w-3.5 text-white" aria-hidden />
                  {item.sintaBadge}
                </span>
              ) : null}
              <span className="rounded-sm border border-hairline bg-panel px-2.5 py-1 text-[11px] font-semibold text-gold-soft">
                Tahun {item.year}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 font-sans text-2xl font-bold leading-snug text-cream sm:text-3xl lg:text-4xl">
              {item.title}
            </h1>

            {/* Authors & Publisher Meta */}
            <div className="mt-6 space-y-2 border-t border-hairline/60 pt-4 text-xs sm:text-sm text-muted">
              <div className="flex items-start gap-2.5">
                <Users className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                <div>
                  <span className="text-muted">Peneliti / Penulis: </span>
                  <span className="text-cream font-medium">
                    {item.authors.join(", ")}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <BookOpen className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                <div>
                  <span className="text-muted">Penerbit / Jurnal: </span>
                  <span className="text-cream/90">{item.publicationName}</span>
                </div>
              </div>

              {item.doi ? (
                <div className="flex items-start gap-2.5 text-xs">
                  <FileText className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                  <div>
                    <span className="text-muted">Digital Object Identifier (DOI): </span>
                    <span className="font-mono text-gold-soft">{item.doi}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* =========================================================================
              2. PRIMARY E-LIBRARY ACTION BOX (Direct Hyperlink Callout)
          ========================================================================= */}
          <section className="mt-8 rounded-xl border border-gold/40 bg-panel p-6 shadow-lg ring-gold-frame sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Akses Naskah Utuh
                </p>
                <h3 className="mt-1 font-sans text-lg font-bold text-cream sm:text-xl">
                  Tersedia di Repositori E-Library Resmi
                </h3>
                <p className="mt-1.5 text-xs text-cream/75 sm:text-sm">
                  Kunjungi laman jurnal / perpustakaan digital resmi untuk membaca dan mengunduh berkas lengkap naskah ini.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/10"
                >
                  <span>Buka di E-Library</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. ABSTRAK LENGKAP
          ========================================================================= */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-gold sm:text-2xl">
              Abstrak
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/95 sm:text-lg sm:leading-8">
              {item.abstract}
            </p>

            {/* Kata Kunci */}
            {item.keywords && item.keywords.length > 0 ? (
              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                  Kata Kunci (Keywords):
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-sm border border-hairline bg-panel px-3 py-1 text-xs text-cream/80"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          {/* =========================================================================
              4. CITATION BOX (APA 7th Format)
          ========================================================================= */}
          <section className="mt-12 rounded-xl border border-hairline bg-panel p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gold">
                Format Sitasi Akademis (APA 7th Edition)
              </h3>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-ink px-3 py-1.5 text-xs font-medium text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted" />
                    <span>Salin Sitasi</span>
                  </>
                )}
              </button>
            </div>
            <p className="rounded-md border border-hairline/60 bg-ink/70 p-4 font-mono text-xs leading-relaxed text-cream/90 select-all sm:text-sm">
              {item.citation}
            </p>
          </section>

          {/* =========================================================================
              5. BACK LINK CTA
          ========================================================================= */}
          <div className="mt-12 flex items-center justify-between border-t border-hairline pt-6">
            <Link
              href="/publikasi"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-soft"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Semua Publikasi</span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            6. RELATED PUBLICATIONS
        ========================================================================= */}
        {relatedItems.length > 0 ? (
          <section className="mx-auto mt-20 max-w-7xl border-t border-hairline px-4 pt-16 sm:mt-24 sm:px-6 sm:pt-20">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  KARYA TERKAIT
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl">
                  Publikasi & Riset Lainnya
                </h2>
              </div>
              <Link
                href="/publikasi"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gold-soft transition-colors hover:text-gold"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {relatedItems.map((relItem) => (
                <PublicationCard key={relItem.id} item={relItem} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
