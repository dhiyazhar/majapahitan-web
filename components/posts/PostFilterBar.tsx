"use client";

import { Search, X } from "lucide-react";

type Props = {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: () => void;
  totalCount: number;
  filteredCount: number;
  /** What is being counted, e.g. "warta" or "program". */
  noun?: string;
  searchPlaceholder?: string;
};

export default function PostFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalCount,
  filteredCount,
  noun = "warta",
  searchPlaceholder = "Cari judul atau topik warta...",
}: Props) {
  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit?.();
        }}
        className="relative w-full md:w-96 lg:w-[420px]"
      >
        <label htmlFor={`cari-${noun}`} className="sr-only">
          Cari {noun}
        </label>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id={`cari-${noun}`}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="min-h-11 w-full rounded-sm border border-muted/60 bg-panel py-2.5 pl-10 pr-11 text-base text-cream placeholder:text-muted transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Bersihkan pencarian"
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-muted hover:text-cream"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </form>

      {/* Below sm the filters scroll sideways in one row instead of wrapping. */}
      {categories.length > 1 ? (
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectCategory(cat)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-sm px-3.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gold font-semibold text-ink"
                  : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
      ) : null}

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        Menampilkan {filteredCount} dari {totalCount} {noun}.
      </p>
    </div>
  );
}
