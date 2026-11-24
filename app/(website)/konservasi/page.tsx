import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, HandHeart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import Rail from "@/components/ui/Rail";
import { getPageKonservasiData, getPartnerLogos } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Museum Konservasi — Museum Virtual Majapahitan",
  description:
    "Pusat konservasi digital warisan Kerajaan Majapahit: dokumentasi arsitektur candi, gapura, prasasti, arca, dan artefak autentik oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default async function KonservasiPage() {
  const [konservasiData, partnerLogos] = await Promise.all([
    getPageKonservasiData(),
    getPartnerLogos(),
  ]);

  const { hero, pengantar, pilar, proses, cta } = konservasiData;

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO BANNER
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src={hero.image}
              alt=""
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
            <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              {hero.subtitle}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. DUA PINTU: SITUS & ARTEFAK
              The page's job is routing into the two catalogues, so they come first.
          ========================================================================= */}
          <nav aria-label="Katalog konservasi" className="mt-10 sm:mt-12">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
              {pilar.map((item) => (
                <li key={item.id} className="flex">
                  <Link href={item.href} className="group flex w-full flex-col">
                    <div className="relative aspect-[2/1] overflow-hidden rounded-md ring-1 ring-hairline">
                      <ImageSlot
                        src={item.image}
                        alt=""
                        label={item.title}
                        position="absolute"
                        className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="mt-5 flex flex-1 flex-col">
                      <h2 className="font-display text-2xl font-semibold text-gold transition-colors group-hover:text-gold-soft sm:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-3 mb-6 max-w-prose text-sm leading-relaxed text-cream/80 sm:text-base">
                        {item.description}
                      </p>
                      <span className="mt-auto inline-flex min-h-11 items-center self-start rounded-sm border border-gold-deep px-6 py-3 text-sm font-semibold text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                        {item.cta}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* =========================================================================
              3. NARASI PENGANTAR
          ========================================================================= */}
          <Rail title={pengantar.title}>
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-cream/80 sm:text-base">
              {pengantar.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </Rail>

          {/* =========================================================================
              4. EMPAT TAHAPAN ILMIAH KONSERVASI
          ========================================================================= */}
          <Rail title={proses.title} subtitle={proses.subtitle}>
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {proses.steps.map((step) => (
                <li
                  key={step.id}
                  className="flex flex-col justify-between border-t border-hairline pt-5"
                >
                  <div>
                    <span className="font-display text-2xl font-bold tracking-tight text-gold sm:text-3xl">
                      {step.number}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug text-cream">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Rail>

          {/* =========================================================================
              5. AJAKAN KOLABORASI & DUKUNGAN
          ========================================================================= */}
          <section className="mt-4">
            <div className="overflow-hidden rounded-xl bg-cream p-7 text-cream-ink shadow-xl sm:p-10 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-bold tracking-widest text-maroon uppercase">
                  {cta.eyebrow}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-maroon sm:text-3xl">
                  {cta.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream-ink/75 sm:text-base">
                  {cta.body}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/tentang#kontak"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-maroon px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-soft focus-visible:outline-maroon"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    Hubungi Tim Konservasi
                  </Link>
                  <Link
                    href="/partisipasi/kirim-karya"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold-deep px-6 py-3 text-xs font-semibold uppercase tracking-wider text-maroon transition-colors hover:bg-gold hover:text-ink focus-visible:outline-maroon"
                  >
                    Kirim Informasi / Karya
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/donasi"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-cream-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream-ink/80 transition-colors hover:border-maroon hover:text-maroon focus-visible:outline-maroon"
                  >
                    <HandHeart className="h-4 w-4" aria-hidden />
                    Dukungan Konservasi
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer partnerLogos={partnerLogos} />
    </>
  );
}
