import Link from "next/link";
import { ChevronRight, Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import ArticleContent from "@/components/posts/ArticleContent";
import ShareButtons from "@/components/posts/ShareButtons";
import BeritaCard from "@/components/berita/BeritaCard";
import type { BeritaItem } from "@/lib/payload";

type Props = {
  berita: BeritaItem;
  relatedBerita: BeritaItem[];
};

export default function BeritaDetailTemplate({
  berita,
  relatedBerita,
}: Props) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. BREADCRUMB & HEADER
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <Link href="/berita" className="transition-colors hover:text-gold">
                Warta & Berita
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="truncate max-w-[200px] sm:max-w-xs text-gold">
                {berita.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-sm bg-maroon px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream">
                Warta Kebudayaan
              </span>
              {berita.subcategory ? (
                <span className="inline-block rounded-sm border border-hairline bg-panel px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {berita.subcategory}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 font-sans text-2xl font-bold leading-snug text-cream sm:text-3xl lg:text-4xl">
              {berita.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-hairline/60 pt-4 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-gold" />
                <span className="text-cream/90">{berita.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gold" />
                <span>{berita.publishedAt}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold" />
                <span>{berita.readingTime}</span>
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* =========================================================================
              2. FEATURED COVER IMAGE
          ========================================================================= */}
          <div className="mt-8 sm:mt-10">
            <div className="relative h-72 w-full overflow-hidden rounded-xl bg-ink ring-gold-frame sm:h-96 lg:h-[460px]">
              <ImageSlot
                src={berita.coverImage || berita.image}
                alt={berita.title}
                label={berita.title}
                position="absolute"
                className="inset-0 h-full w-full"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          </div>

          {/* =========================================================================
              3. ARTICLE EDITORIAL CONTENT
          ========================================================================= */}
          <div className="mt-10 sm:mt-14">
            <ArticleContent content={berita.content} tags={berita.tags} />
          </div>

          {/* =========================================================================
              4. AUTHOR BIO / CURATORIAL ATTRIBUTION BOX
          ========================================================================= */}
          <div className="mt-12 rounded-xl border border-hairline bg-panel p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/30">
                <User className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Lembaga Penerbit & Kurasi
                </p>
                <h4 className="font-display text-base font-bold text-cream">
                  {berita.author}
                </h4>
                <p className="text-xs text-cream/70">
                  Pusat Unggulan IPTEK Seni Budaya Majapahitan, Universitas Negeri Surabaya. Berkomitmen dalam preservasi, riset ilmiah, dan publikasi kebudayaan Nusantara.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              5. SOCIAL SHARING WIDGET
          ========================================================================= */}
          <div className="mt-8">
            <ShareButtons title={berita.title} />
          </div>

          {/* =========================================================================
              6. BACK LINK CTA
          ========================================================================= */}
          <div className="mt-10 flex items-center justify-between border-t border-hairline pt-6">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-soft"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Indeks Berita</span>
            </Link>
          </div>

          {/* =========================================================================
              7. RELATED ARTICLES
          ========================================================================= */}
          {relatedBerita.length > 0 ? (
            <section className="mt-16 sm:mt-20 border-t border-hairline pt-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-cream sm:text-lg">
                  Warta Berita Terkait
                </h3>
                <Link
                  href="/berita"
                  className="text-xs font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Lihat Semua
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBerita.map((relBerita) => (
                  <BeritaCard key={relBerita.id} berita={relBerita} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
