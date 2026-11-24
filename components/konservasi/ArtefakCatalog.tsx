"use client";

import { useState, useMemo } from "react";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import { artefakList as defaultList, artefakCategories, type ArtefakItem } from "@/lib/content";

type Props = {
  items?: ArtefakItem[];
};

export default function ArtefakCatalog({ items = defaultList }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const filteredItems = useMemo(() => {
    if (activeCategory === "Semua") return items;
    return items.filter((a) => a.category === activeCategory);
  }, [activeCategory, items]);

  const countFor = (cat: string) =>
    cat === "Semua" ? items.length : items.filter((a) => a.category === cat).length;

  return (
    <section className="mt-12 sm:mt-16">
      <SectionHeading title="Koleksi Benda Autentik" size="sm" />

      {/* Below sm the filters scroll sideways in one row instead of wrapping into three. */}
      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {artefakCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={isActive}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm px-3.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gold font-semibold text-ink"
                  : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat}
              <span className={isActive ? "text-ink/70" : "text-muted"}>{countFor(cat)}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        Menampilkan {filteredItems.length} dari {items.length} artefak.
      </p>

      {filteredItems.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          Belum ada artefak terdigitalisasi pada kategori {activeCategory}. Pilih
          kategori lain atau kembali ke Semua.
        </p>
      ) : (
        /* Same treatment as the Situs catalogue: bare image, text on the page, no hover (no detail pages yet). */
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((artefak) => (
            <li key={artefak.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-hairline">
                <ImageSlot
                  src={artefak.image}
                  alt=""
                  label={artefak.name}
                  position="absolute"
                  className="inset-0 h-full w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-gold">
                {artefak.name}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {artefak.material} · {artefak.era}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                {artefak.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
