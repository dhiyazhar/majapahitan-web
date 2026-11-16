import Link from "next/link";
import { HandHeart } from "lucide-react";
import { koleksis } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageSlot from "@/components/ui/ImageSlot";

export default function KoleksiHighlight() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <SectionHeading
        title="Koleksi Highlight"
        seeAllHref="/koleksi"
        tone="gold"
        size="lg"
      />

      {/* One even row: five objects, then the donation tile at the same size. */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-6 xl:gap-x-5">
        {koleksis.map((k, i) => (
          <Link
            key={k.id}
            href={k.href}
            className={`group block ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <div
              className={`relative overflow-hidden rounded-md ring-1 ring-hairline ${
                i === 0 ? "aspect-[4/3] sm:aspect-[4/5]" : "aspect-[4/5]"
              }`}
            >
              <ImageSlot
                src={k.image}
                alt={k.title}
                label={k.category}
                position="absolute"
                className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 200px"
              />
            </div>
            <h3 className="mt-3 text-base font-semibold leading-snug text-gold transition-colors group-hover:text-gold-soft">
              {k.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted">{k.category}</p>
          </Link>
        ))}

        <div className="col-span-2 flex flex-col justify-between gap-6 rounded-md bg-maroon p-5 ring-1 xl:gap-3 xl:p-4 ring-gold/30 sm:col-span-1 sm:aspect-[4/5]">
          <div>
            <h3 className="font-display text-xl font-semibold leading-tight text-gold xl:text-lg">
              Dukung Kami
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/90 xl:leading-snug">
              Bantu konservasi &amp; pengembangan warisan budaya Majapahit
            </p>
          </div>
          <Link
            href="/donasi"
            className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-gold px-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
          >
            Donasi Sekarang
            <HandHeart className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
