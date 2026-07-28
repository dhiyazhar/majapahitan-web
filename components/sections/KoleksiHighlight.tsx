import Link from "next/link";
import { HandHeart } from "lucide-react";
import { koleksis } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageSlot from "@/components/ui/ImageSlot";

export default function KoleksiHighlight() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <SectionHeading
        title="Koleksi Highlight"
        seeAllHref="/koleksi"
        tone="gold"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Collection cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {koleksis.map((k) => (
            <Link key={k.id} href={k.href} className="group block">
              <div className="relative h-32 overflow-hidden rounded-md ring-1 ring-hairline">
                <ImageSlot
                  src={k.image}
                  alt={k.title}
                  label={k.category}
                  position="absolute"
                  className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 200px"
                />
              </div>
              <h3 className="mt-2.5 text-sm font-semibold leading-snug text-gold">
                {k.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted">{k.category}</p>
            </Link>
          ))}
        </div>

        {/* Dukung Kami */}
        <div className="ring-gold-frame relative flex flex-col justify-center overflow-hidden rounded-lg bg-gradient-to-br from-maroon-2 to-maroon p-6 text-center">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/10 blur-xl" />
          <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-gold">
            Dukung Kami
          </h3>
          <p className="mx-auto mt-2 max-w-[220px] text-sm leading-relaxed text-cream/85">
            Bantu konservasi &amp; pengembangan warisan budaya Majapahit
          </p>
          <Link
            href="/donasi"
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-gold-soft"
          >
            Donasi Sekarang
            <HandHeart className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
