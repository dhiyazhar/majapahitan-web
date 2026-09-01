import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, HandHeart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import { konservasiPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Museum Konservasi — Museum Virtual Majapahitan",
  description:
    "Pusat konservasi digital warisan Kerajaan Majapahit: dokumentasi arsitektur candi, gapura, prasasti, arca, dan artefak autentik oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function KonservasiPage() {
  const { hero, pengantar, pilar, proses, cta } = konservasiPage;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO BANNER
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-20 sm:py-28 lg:py-32">
          {/* Background image & gradient overlays */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src={hero.image}
              alt="Latar belakang Museum Konservasi Majapahit"
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              {hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              {hero.subtitle}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. PENGANTAR MISI KONSERVASI
          ========================================================================= */}
          <section className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {pengantar.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
                {pengantar.title}
              </h2>
              <div className="mt-6 space-y-4 text-left text-sm leading-relaxed text-cream/80 sm:text-base">
                {pengantar.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. DUA PILAR KONSERVASI (Situs & Artefak)
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                FOKUS PRESERVASI
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
                Dua Pilar Konservasi
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
                Peninggalan sejarah dikelompokkan ke dalam dua ranah preservasi utama untuk memudahkan dokumentasi ilmiah dan penelusuran publik.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
              {pilar.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-panel p-6 ring-gold-frame transition-all duration-300 hover:bg-panel-2 sm:p-8"
                >
                  <div>
                    {/* Image preview */}
                    <div className="relative h-60 w-full overflow-hidden rounded-lg sm:h-72">
                      <ImageSlot
                        src={item.image}
                        alt={item.title}
                        label={item.title}
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                      {/* Content */}
                      <h3 className="mt-6 font-display text-2xl font-semibold text-gold transition-colors group-hover:text-gold-soft">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-cream/80">
                        {item.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-4 border-t border-hairline/60">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 rounded-sm border border-gold-deep px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
                      >
                        {item.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
          </section>

          {/* =========================================================================
              4. TAHAPAN PROSES KONSERVASI
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {proses.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
                {proses.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
                Metodologi ilmiah terstandar untuk memastikan keaslian, ketelitian data, dan keberlanjutan pemeliharaan warisan budaya.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {proses.steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`flex flex-col justify-start lg:px-8 first:lg:pl-0 last:lg:pr-0 ${
                    idx !== proses.steps.length - 1
                      ? "lg:border-r lg:border-hairline/70"
                      : ""
                  }`}
                >
                  <span className="font-display text-4xl sm:text-5xl font-bold text-gold select-none">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-cream/70 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              5. CTA PENUTUP (Cream Card Contrast Section)
          ========================================================================= */}
          <section className="mt-20 sm:mt-24">
            <div className="overflow-hidden rounded-xl bg-cream p-7 text-cream-ink shadow-xl sm:p-10 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                  {cta.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight text-cream-ink sm:text-3xl lg:text-4xl">
                  {cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-ink/80 sm:text-base">
                  {cta.body}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/tentang"
                    className="inline-flex items-center gap-2 rounded-sm bg-maroon px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Hubungi Tim Kurator
                  </Link>
                  <Link
                    href="/partisipasi/kirim-karya"
                    className="inline-flex items-center gap-2 rounded-sm border border-gold-deep px-6 py-3 text-xs font-semibold uppercase tracking-wider text-maroon transition-colors hover:bg-gold hover:text-ink"
                  >
                    Kirim Informasi / Karya
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/donasi"
                    className="inline-flex items-center gap-2 rounded-sm border border-cream-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream-ink/80 transition-colors hover:border-maroon hover:text-maroon"
                  >
                    <HandHeart className="h-4 w-4" />
                    Dukungan Konservasi
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
