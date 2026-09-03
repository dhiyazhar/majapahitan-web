import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import { Instagram, Youtube } from "@/components/ui/BrandIcons";
import {
  tentangPage,
  contactInfo,
  kerjasamaLogos,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Tentang Museum — Museum Virtual Majapahitan",
  description:
    "Mengenal Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya, visi misi, sejarah, tim ahli, serta mitra pelestarian budaya.",
};

export default function TentangPage() {
  const { hero, visiMisi, sejarah, tim, mitra, kontak, galeri } = tentangPage;

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
              alt="Latar belakang Museum Virtual Majapahitan"
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
              2. VISI & MISI
          ========================================================================= */}
          <section className="mt-16 sm:mt-24">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {visiMisi.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl lg:text-4xl">
                {visiMisi.title}
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-start">
              {/* Kolom Visi */}
              <div className="md:pr-10 lg:pr-14 space-y-4">
                <h3 className="font-display text-lg sm:text-xl font-semibold uppercase tracking-wider text-gold">
                  Visi
                </h3>
                <blockquote className="font-display text-xl font-medium leading-relaxed text-cream sm:text-2xl sm:leading-relaxed text-left">
                  &ldquo;{visiMisi.visi}&rdquo;
                </blockquote>
              </div>

              {/* Kolom Misi */}
              <div className="mt-8 md:mt-0 md:border-l md:border-hairline md:pl-10 lg:pl-14 space-y-6">
                <h3 className="font-display text-lg sm:text-xl font-semibold uppercase tracking-wider text-gold">
                  Misi
                </h3>

                <ol className="space-y-4 sm:space-y-5">
                  {visiMisi.misi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-sm text-cream/85 sm:text-base text-left">
                      <span className="font-display text-sm font-bold text-gold shrink-0 pt-0.5">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed text-cream/80 text-left">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. SEJARAH / LATAR BELAKANG
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Image Column */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-xl bg-panel p-2 ring-gold-frame">
                  <ImageSlot
                    src={sejarah.image}
                    alt="Peninggalan Sejarah Majapahit"
                    label="Dokumentasi Sejarah"
                    className="h-80 w-full rounded-lg sm:h-96 lg:h-[440px]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="p-3 text-center">
                    <span className="text-xs uppercase tracking-widest text-muted">
                      Artefak Koleksi PUI Seni Budaya Majapahitan
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {sejarah.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight text-cream sm:text-3xl lg:text-4xl">
                  {sejarah.title}
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-cream/80 sm:text-base">
                  {sejarah.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. TIM & STRUKTUR ORGANISASI
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {tim.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
                {tim.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
                {tim.subtitle}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {tim.members.map((member) => (
                <div
                  key={member.id}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative mb-4 h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-2 border-gold/30 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-gold">
                    <ImageSlot
                      src={member.photo}
                      alt={member.name}
                      label={member.name.split(" ")[0]}
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="font-display text-base font-semibold text-cream transition-colors group-hover:text-gold">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed max-w-[220px]">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              5. MITRA KERJA SAMA (Clean Logo Row Without Cards)
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {mitra.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
                {mitra.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
                {mitra.subtitle}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10 items-center">
              {kerjasamaLogos.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col items-center justify-center text-center"
                >
                  <div className="h-16 w-full flex items-center justify-center opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                    <ImageSlot
                      src={item.logo}
                      alt={item.name}
                      label={item.name}
                      className="h-14 w-full"
                      imgClassName="object-contain"
                    />
                  </div>
                  <span className="mt-3 text-center text-xs text-muted/80 transition-colors group-hover:text-cream">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              6. KONTAK & LOKASI (Cream Card Contrast Section)
          ========================================================================= */}
          <section className="mt-20 sm:mt-24">
            <div className="overflow-hidden rounded-xl bg-cream p-7 text-cream-ink sm:p-10 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Contact Details */}
                <div className="lg:col-span-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                    {kontak.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight text-cream-ink sm:text-3xl">
                    {kontak.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream-ink/75">
                    {kontak.description}
                  </p>

                  <div className="mt-8 space-y-4 text-sm text-cream-ink/85">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-maroon" />
                      <div>
                        <strong className="block text-cream-ink">{contactInfo.org}</strong>
                        <span>
                          {contactInfo.office}, {contactInfo.university}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 shrink-0 text-maroon" />
                      <span>{contactInfo.operatingHours}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 shrink-0 text-maroon" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="font-medium text-maroon underline transition-colors hover:text-maroon-2"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Social media links */}
                  <div className="mt-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cream-ink/70">
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
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-ink/20 text-cream-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
                            aria-label={s.label}
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Google Maps / Location Box (No inner card box, matching skeleton) */}
                <div className="flex flex-col justify-between lg:col-span-6 lg:border-l lg:border-cream-ink/20 lg:pl-10">
                  <div>
                    <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                      Peta Lokasi Kantor
                    </h3>
                    <p className="mt-1 text-xs text-cream-ink/75">
                      Gedung Laboratorium Anti Doping Lt. 4, UNESA Kampus Lidah Wetan
                    </p>
                  </div>

                  {/* Maps placeholder / iframe container */}
                  <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg border border-cream-ink/20 bg-cream-ink/5">
                    <iframe
                      title="Lokasi PUI Seni Budaya Majapahitan - Gedung Laboratorium Anti Doping UNESA"
                      src="https://maps.google.com/maps?q=Gedung+Laboratorium+Anti+Doping+Universitas+Negeri+Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="h-full w-full border-0"
                      loading="lazy"
                      aria-hidden="false"
                    />
                  </div>

                  <div className="mt-4 text-right">
                    <a
                      href={contactInfo.googleMaps.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon hover:underline"
                    >
                      Buka di Google Maps
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              7. GALERI DOKUMENTASI FOTO
          ========================================================================= */}
          <section className="mt-20 border-t border-hairline pt-16 sm:mt-24 sm:pt-20">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {galeri.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-cream sm:text-3xl">
                  {galeri.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted">
                  {galeri.subtitle}
                </p>
              </div>
              <Link
                href="/galeri"
                className="inline-flex shrink-0 items-center justify-center rounded-sm border border-gold-deep px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Lihat Semua Koleksi
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galeri.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl bg-panel ring-gold-frame transition-transform duration-300 hover:-translate-y-1"
                >
                  <ImageSlot
                    src={item.image}
                    alt={item.title}
                    label={item.title}
                    className="h-60 w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-soft">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-display text-base font-semibold text-cream transition-colors group-hover:text-gold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
