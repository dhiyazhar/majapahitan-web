"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroSlides } from "@/lib/content";
import ImageSlot from "@/components/ui/ImageSlot";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  // `choice` is the visitor's explicit play/pause (null until they press it);
  // `held` is a temporary hover/focus pause.
  const [choice, setChoice] = useState<boolean | null>(null);
  const [held, setHeld] = useState(false);
  const count = heroSlides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // Visitors who ask for reduced motion start with the slideshow stopped.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const stopped = choice ?? reducedMotion;

  // Auto-advance
  useEffect(() => {
    if (stopped || held) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [count, stopped, held]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sorotan museum"
      className="relative h-[560px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <h1 className="sr-only">Museum Virtual Majapahitan</h1>

      {/* Slides track */}
      <div
        className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {heroSlides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${count}`}
              aria-hidden={!active}
              inert={!active}
              className="relative h-full w-full shrink-0"
            >
              <ImageSlot
                src={slide.image}
                alt=""
                label={`Hero ${i + 1}`}
                position="absolute"
                className="inset-0 h-full w-full"
                priority={i === 0}
                sizes="100vw"
              />
              {/* Readability scrim for text over the photo */}
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />

              {/* Content */}
              <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
                <div className="max-w-xl">
                  <h2 className="whitespace-pre-line font-display text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-[52px]">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-cream/90">
                    {slide.subtitle}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={slide.primary.href}
                      className="inline-flex min-h-12 items-center rounded-sm bg-maroon px-6 text-sm font-semibold text-cream ring-1 ring-inset ring-gold/30 transition-colors hover:bg-maroon-2"
                    >
                      {slide.primary.label}
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-gold underline decoration-gold/40 underline-offset-[6px] transition-colors hover:decoration-gold"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls sit together below the copy, so the headline keeps the sections' left edge
          and phones get previous/next too. */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1">
        <button
          type="button"
          aria-label="Slide sebelumnya"
          onClick={() => go(-1)}
          className="mr-1 flex h-11 w-11 items-center justify-center text-cream/75 transition-colors hover:text-gold"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Tampilkan slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
            className="group flex h-11 w-8 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-2 bg-cream/50 group-hover:bg-cream/80"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          aria-label="Slide berikutnya"
          onClick={() => go(1)}
          className="ml-1 flex h-11 w-11 items-center justify-center text-cream/75 transition-colors hover:text-gold"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={stopped ? "Putar slide otomatis" : "Hentikan slide otomatis"}
          onClick={() => setChoice(!stopped)}
          className="flex h-11 w-11 items-center justify-center text-cream/75 transition-colors hover:text-gold"
        >
          {stopped ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
        </button>
      </div>
    </section>
  );
}
