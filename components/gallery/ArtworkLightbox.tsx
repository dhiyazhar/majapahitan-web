"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, User, Landmark, Calendar, Palette, Maximize2 } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { KaryaItem } from "@/lib/content";

type Props = {
  artwork: KaryaItem | null;
  items: KaryaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
};

export default function ArtworkLightbox({
  artwork,
  items,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: Props) {
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    } else {
      onSelectIndex(items.length - 1); // loop to end
    }
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onSelectIndex(0); // loop to start
    }
  }, [currentIndex, items.length, onSelectIndex]);

  // Keyboard navigation & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !artwork) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau karya: ${artwork.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6 lg:p-10"
    >
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-cream sm:top-6 sm:left-6 sm:right-6">
        <span className="rounded-full bg-ink/80 px-3.5 py-1 text-xs font-semibold text-gold shadow-md backdrop-blur">
          {currentIndex + 1} / {items.length}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau (Escape)"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-cream transition-colors hover:bg-gold hover:text-ink focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Prev Navigation Button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Karya sebelumnya (Panah Kiri)"
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream shadow-lg transition-colors hover:bg-gold hover:text-ink sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next Navigation Button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Karya berikutnya (Panah Kanan)"
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream shadow-lg transition-colors hover:bg-gold hover:text-ink sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Lightbox Content Box */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-panel ring-gold-frame shadow-2xl lg:flex-row">
        {/* Left Side: Image Viewport */}
        <div className="relative flex min-h-[300px] flex-1 items-center justify-center bg-black/60 p-4 sm:p-6 lg:min-h-[550px] lg:p-8">
          <div className="relative h-[280px] w-full sm:h-[400px] lg:h-[500px]">
            <ImageSlot
              src={artwork.image}
              alt={artwork.title}
              label={artwork.title}
              position="absolute"
              className="inset-0 h-full w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Side: Curatorial Metadata Panel */}
        <div className="flex w-full flex-col justify-between overflow-y-auto bg-panel p-6 sm:p-8 lg:w-[420px] lg:max-h-[600px]">
          <div>
            {/* Category Badge & Year */}
            <div className="flex items-center justify-between gap-2 border-b border-hairline pb-4">
              <span
                className={`rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  artwork.category === "publik"
                    ? "bg-maroon text-cream"
                    : artwork.category === "otentik"
                    ? "bg-gold text-ink"
                    : "bg-panel-2 border border-gold/40 text-gold"
                }`}
              >
                {artwork.categoryLabel}
              </span>
              <span className="text-xs font-semibold text-gold-soft">
                {artwork.year}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-4 font-sans text-xl font-bold leading-snug text-cream sm:text-2xl">
              {artwork.title}
            </h2>

            {/* Metadata Fields */}
            <div className="mt-4 space-y-2.5 text-xs text-muted">
              <div className="flex items-start gap-2.5">
                <User className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                <div>
                  <span className="text-muted">Kreator / Seniman: </span>
                  <span className="font-semibold text-cream">{artwork.creator}</span>
                </div>
              </div>

              {artwork.institution ? (
                <div className="flex items-start gap-2.5">
                  <Landmark className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                  <div>
                    <span className="text-muted">Asal / Institusi: </span>
                    <span className="text-cream/90">{artwork.institution}</span>
                  </div>
                </div>
              ) : null}

              {artwork.material ? (
                <div className="flex items-start gap-2.5">
                  <Palette className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                  <div>
                    <span className="text-muted">Media / Bahan: </span>
                    <span className="text-cream/90">{artwork.material}</span>
                  </div>
                </div>
              ) : null}

              {artwork.dimensions ? (
                <div className="flex items-start gap-2.5">
                  <Maximize2 className="h-4 w-4 shrink-0 text-gold pt-0.5" />
                  <div>
                    <span className="text-muted">Dimensi Ukuran: </span>
                    <span className="text-cream/90">{artwork.dimensions}</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Description & Curatorial Meaning */}
            <div className="mt-6 border-t border-hairline/60 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold">
                Deskripsi & Makna Filosofis
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/90">
                {artwork.description}
              </p>
            </div>
          </div>

          {/* Modal Footer Note */}
          <div className="mt-8 border-t border-hairline/60 pt-4 text-center">
            <p className="text-[11px] text-muted">
              Gunakan tombol panah keyboard <kbd className="rounded bg-ink px-1.5 py-0.5 font-mono text-gold">←</kbd> <kbd className="rounded bg-ink px-1.5 py-0.5 font-mono text-gold">→</kbd> untuk menelusuri karya lain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
