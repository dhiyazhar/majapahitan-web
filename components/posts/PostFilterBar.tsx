"use client";

import { Search, X } from "lucide-react";

type Props = {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
};

export default function PostFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}: Props) {
  return (
    <div className="flex flex-col gap-5 border-b border-hairline pb-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari judul atau topik warta..."
            className="w-full rounded-md border border-hairline bg-panel py-2.5 pl-10 pr-9 text-xs text-cream placeholder:text-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        {/* Counter Info */}
        <p className="text-xs text-muted">
          Menampilkan <span className="font-semibold text-gold">{filteredCount}</span> dari {totalCount} warta
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-gold text-ink font-semibold shadow-sm"
                  : "border border-hairline bg-panel text-cream/80 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
