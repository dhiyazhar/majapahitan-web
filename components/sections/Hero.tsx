"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Glasses } from "lucide-react";
import { heroSlides } from "@/lib/content";
import ImageSlot from "@/components/ui/ImageSlot";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-ink">
      {/* Slides track */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className="relative h-full w-full shrink-0">
            <ImageSlot
              src={slide.image}
              alt={slide.title.replace(/\n/g, " ")}
              label={`Hero ${i + 1}`}
              position="absolute"
              className="inset-0 h-full w-full"
              priority={i === 0}
              sizes="100vw"
            />
            {/* Readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
              <div className="max-w-xl">
                <h1 className="whitespace-pre-line font-display text-4xl font-bold uppercase leading-tight text-cream drop-shadow sm:text-5xl lg:text-[52px]">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/85 sm:text-base">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={slide.primary.href}
                    className="inline-flex items-center gap-2.5 rounded-sm bg-maroon px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-cream shadow-lg transition-colors hover:bg-maroon-2"
                  >
                    <Glasses className="h-4.5 w-4.5" aria-hidden />
                    {slide.primary.label}
                  </Link>
                  <Link
                    href={slide.secondary.href}
                    className="inline-flex items-center rounded-sm border border-gold/70 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
                  >
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Sebelumnya"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-cream/70 transition-colors hover:text-gold sm:left-4"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        aria-label="Berikutnya"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-cream/70 transition-colors hover:text-gold sm:right-4"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-gold" : "w-2 bg-cream/50 hover:bg-cream/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
