import type { Metadata } from "next";
import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import Rail from "@/components/ui/Rail";
import { Instagram, Youtube } from "@/components/ui/BrandIcons";
import { contactInfo } from "@/lib/content";
import { getPageTentangData } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Tentang Museum — Museum Virtual Majapahitan",
  description:
    "Mengenal Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya, visi misi, sejarah, tim ahli, serta mitra pelestarian budaya.",
};

export default async function TentangPage() {
  const { hero, visiMisi, sejarah, tim, mitra, kontak } = await getPageTentangData();

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO BANNER
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-20 lg:py-24">
          {/* Background image & gradient overlays */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <ImageSlot
              src={hero.image}
              alt="Latar belakang Museum Virtual Majapahitan"
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />

          {/* Hero Content: left-aligned on the same edge as the section headings below */}
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
              2. VISI & MISI
          ========================================================================= */}
          <Rail title={visiMisi.title} first>
            <div className="grid grid-cols-1 items-start md:grid-cols-2">
              {/* Kolom Visi */}
              <div className="space-y-4 md:pr-10">
                <h3 className="font-display text-lg font-semibold text-gold sm:text-xl">
                  Visi
                </h3>
                <blockquote className="font-display text-xl font-medium leading-relaxed text-cream sm:text-2xl sm:leading-relaxed">
                  &ldquo;{visiMisi.visi}&rdquo;
                </blockquote>
              </div>

              {/* Kolom Misi */}
              <div className="mt-8 space-y-6 md:mt-0 md:border-l md:border-hairline md:pl-10">
                <h3 className="font-display text-lg font-semibold text-gold sm:text-xl">
                  Misi
                </h3>
                <ol className="space-y-4 sm:space-y-5">
                  {visiMisi.misi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-sm sm:text-base">
                      <span className="shrink-0 pt-0.5 font-display text-sm font-bold text-gold">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="leading-relaxed text-cream/80">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Rail>

          {/* =========================================================================
              3. SEJARAH / LATAR BELAKANG
          ========================================================================= */}
          <Rail title={sejarah.title}>
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
              <figure className="overflow-hidden rounded-xl bg-panel p-2 ring-gold-frame">
                <ImageSlot
                  src={sejarah.image}
                  alt="Peninggalan Sejarah Majapahit"
                  label="Dokumentasi Sejarah"
                  className="h-64 w-full rounded-lg sm:h-80"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <figcaption className="p-3 text-center text-xs text-muted">
                  {sejarah.caption}
                </figcaption>
              </figure>
              <div className="space-y-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                {sejarah.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </Rail>

          {/* =========================================================================
              4. TIM & STRUKTUR ORGANISASI
          ========================================================================= */}
          <Rail title={tim.title} subtitle={tim.subtitle}>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {tim.members.map((member) => (
                <li key={member.id} className="flex items-center gap-4 py-4 sm:gap-6">
                  <ImageSlot
                    src={member.photo}
                    alt={member.name}
                    label="Foto"
                    className="h-20 w-16 shrink-0 overflow-hidden rounded-sm ring-gold-frame sm:h-24 sm:w-20"
                    sizes="80px"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-display text-base font-semibold text-cream sm:text-lg">
                      {member.name}
                    </span>
                    <span className="text-sm text-muted sm:text-right">{member.role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Rail>

          {/* =========================================================================
              5. MITRA KERJA SAMA
          ========================================================================= */}
          <Rail title={mitra.title} subtitle={mitra.subtitle}>
            <ul className="grid grid-cols-2 items-start gap-8 sm:grid-cols-4">
              {mitra.items.map((item) => {
                const content = (
                  <>
                    <ImageSlot
                      src={item.logo}
                      alt={item.name}
                      label="Logo"
                      className="h-24 w-24 rounded-sm"
                      imgClassName="object-contain"
                      sizes="96px"
                    />
                    <span className="mt-3 text-xs text-muted group-hover:text-cream transition-colors">
                      {item.name}
                    </span>
                  </>
                );

                return (
                  <li key={item.id} className="flex flex-col items-center text-center">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center focus-visible:outline-gold"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex flex-col items-center">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Rail>

          {/* =========================================================================
              6. KONTAK & LOKASI (Cream Card Contrast Section)
          ========================================================================= */}
          <section id="kontak" className="mt-4 scroll-mt-24">
            <div className="overflow-hidden rounded-xl bg-cream p-7 text-cream-ink sm:p-10 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Contact Details */}
                <div className="lg:col-span-6">
                  <SectionHeading title={kontak.title} tone="maroon" />
                  <p className="mt-3 text-sm leading-relaxed text-cream-ink/75">
                    {kontak.description}
                  </p>

                  <div className="mt-8 space-y-4 text-sm text-cream-ink/85">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-maroon" />
                      <div>
                        <strong className="block text-cream-ink">{contactInfo.org}</strong>
                        <span>{kontak.office}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 shrink-0 text-maroon" />
                      <span>{kontak.operatingHours}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 shrink-0 text-maroon" />
                      <a
                        href={`mailto:${kontak.email}`}
                        className="font-medium text-maroon underline transition-colors hover:text-maroon-2 focus-visible:outline-maroon"
                      >
                        {kontak.email}
                      </a>
                    </div>
                  </div>

                  {/* Social media links */}
                  <div className="mt-8">
                    <span className="text-xs font-semibold text-cream-ink/70">
                      Media Sosial Kami:
                    </span>
                    <div className="mt-3 flex gap-3">
                      {contactInfo.socials.map((s) => {
                        const Icon = s.icon === "instagram" ? Instagram : Youtube;
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-ink/20 text-cream-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream focus-visible:outline-maroon"
                            aria-label={s.label}
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Google Maps / Location Box */}
                <div className="flex flex-col justify-between lg:col-span-6 lg:border-l lg:border-cream-ink/20 lg:pl-10">
                  <div>
                    <h3 className="font-display text-base font-semibold text-maroon">
                      Peta Lokasi Kantor
                    </h3>
                    <p className="mt-1 text-xs text-cream-ink/75">
                      {kontak.office}
                    </p>
                  </div>

                  {/* Maps placeholder / iframe container */}
                  <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg border border-cream-ink/20 bg-cream-ink/5">
                    <iframe
                      title="Lokasi PUI Seni Budaya Majapahitan - Gedung Laboratorium Anti Doping UNESA"
                      src={kontak.mapsEmbedUrl}
                      className="h-full w-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-4 text-right">
                    <a
                      href={kontak.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-maroon hover:underline focus-visible:outline-maroon"
                    >
                      Buka di Google Maps
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
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
