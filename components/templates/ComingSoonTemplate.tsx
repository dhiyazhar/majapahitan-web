import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Landmark,
  Palette,
  BookOpen,
  Newspaper,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export type ComingSoonProps = {
  title?: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: string;
};

const liveSections = [
  {
    title: "Galeri Seni & Partisipasi",
    description: "Koleksi karya otentik, karya kontemporer, dan galeri kiriman publik.",
    href: "/galeri",
    icon: Palette,
  },
  {
    title: "Warisan & Konservasi",
    description: "Eksplorasi data arkeologis situs candi dan katalog artefak Majapahit.",
    href: "/konservasi",
    icon: Landmark,
  },
  {
    title: "Publikasi & Riset Ilmiah",
    description: "Repositori jurnal, monograf, dan laporan penelitian kebudayaan.",
    href: "/publikasi",
    icon: BookOpen,
  },
  {
    title: "Warta & Agenda Kegiatan",
    description: "Kabar terbaru, agenda pameran, workshop, dan siaran pers museum.",
    href: "/berita",
    icon: Newspaper,
  },
];

export default function ComingSoonTemplate({
  title = "Ruang Sedang Dalam Pengembangan",
  subtitle = "Ruang digital ini sedang dalam tahap pemindaian visual 3D, verifikasi filologis naskah, atau penyusunan katalog kuratorial oleh tim peneliti Pusat Unggulan Ipteks Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya.",
  badge = "Tahap Preservasi & Digitalisasi",
  breadcrumb = "Tahap Pengembangan",
}: ComingSoonProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-muted">
            <Link href="/" className="hover:text-gold transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3 text-hairline" />
            <span className="text-gold">{breadcrumb}</span>
          </nav>

          {/* Main Hero Card */}
          <section className="relative overflow-hidden rounded-2xl bg-panel border border-hairline p-8 sm:p-14 text-center shadow-2xl ring-gold-frame">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

            {/* Emblem / Icon Badge */}
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ink border border-gold-deep shadow-inner ring-8 ring-panel">
              <Compass className="h-9 w-9 text-gold animate-pulse" />
            </div>

            {/* Curatorial Status Tag */}
            <p className="mt-6 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              {badge}
            </p>

            {/* Headline */}
            <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-cream sm:text-3xl lg:text-4xl">
              {title}
            </h1>

            {/* Curatorial Explanation */}
            <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-cream/75">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-sm bg-maroon px-6 py-3 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:bg-maroon-2 shadow-md"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-ink-2/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gold-soft transition-all hover:border-gold hover:text-gold"
              >
                Jelajahi Galeri Virtual
              </Link>
            </div>
          </section>

          {/* Quick Access to Live Wings */}
          <section className="mt-12 sm:mt-16">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Destinasi Tersedia
              </p>
              <h2 className="mt-1 font-display text-lg font-bold uppercase tracking-wide text-cream sm:text-xl">
                Jelajahi Ruang Pameran Aktif
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {liveSections.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-xl border border-hairline bg-panel p-5 transition-all duration-300 hover:border-gold/50 hover:bg-panel-2"
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink border border-hairline text-gold group-hover:border-gold/40">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3.5 font-display text-sm font-semibold uppercase tracking-wide text-cream group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-gold-soft group-hover:text-gold">
                      <span>Buka Ruang</span>
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
