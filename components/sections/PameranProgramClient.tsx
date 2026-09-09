"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { ProgramItem } from "@/lib/payload";
import { pamerans } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageSlot from "@/components/ui/ImageSlot";

type Props = {
  posts?: ProgramItem[];
};

export default function PameranProgramClient({ posts }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // If dynamic programs are available from Payload, map them. Otherwise fallback to static pamerans.
  const displayItems =
    posts && posts.length > 0
      ? posts.map((p) => ({
          id: p.id,
          category: p.programType || "Program Museum",
          title: p.title,
          date: p.eventDate || p.publishedAt,
          location: p.location,
          image: p.coverImage || p.image,
          cta: {
            label: p.ctaLabel || "Masuk Galeri",
            href: p.ctaUrl && p.ctaUrl.startsWith("http") ? p.ctaUrl : `/program/${p.slug}`,
            isExternal: Boolean(p.ctaUrl && p.ctaUrl.startsWith("http")),
          },
        }))
      : pamerans.map((p) => ({
          ...p,
          location: undefined as string | undefined,
          cta: { ...p.cta, isExternal: false },
        }));

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="rounded-xl bg-cream p-5 shadow-sm sm:p-7">
        <SectionHeading
          title="Pameran & Program Aktif"
          seeAllHref="/program"
          tone="maroon"
        />

        <div className="relative mt-6">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayItems.map((p) => (
              <article
                key={p.id}
                data-card
                className="w-[270px] shrink-0 snap-start sm:w-[275px] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden rounded-md">
                    <ImageSlot
                      src={p.image}
                      alt={p.title}
                      label={p.category}
                      position="absolute"
                      className="inset-0 h-full w-full"
                      sizes="275px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-sm bg-maroon px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug text-cream-ink line-clamp-2">
                    {p.title}
                  </h3>
                  <div className="mt-1 flex flex-col gap-0.5 text-xs text-cream-ink/70">
                    <p>{p.date}</p>
                    {p.location ? (
                      <p className="flex items-center gap-1 text-[11px] text-maroon truncate">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
                <Link
                  href={p.cta.href}
                  target={p.cta.isExternal ? "_blank" : undefined}
                  rel={p.cta.isExternal ? "noopener noreferrer" : undefined}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon transition-colors hover:text-maroon-2"
                >
                  {p.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </article>
            ))}
          </div>

          {/* Arrows */}
          <button
            aria-label="Sebelumnya"
            onClick={() => scroll(-1)}
            className="absolute -left-3 top-16 hidden h-9 w-9 items-center justify-center rounded-full bg-cream text-cream-ink shadow-md ring-1 ring-black/5 transition-colors hover:bg-white sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Berikutnya"
            onClick={() => scroll(1)}
            className="absolute -right-3 top-16 hidden h-9 w-9 items-center justify-center rounded-full bg-cream text-cream-ink shadow-md ring-1 ring-black/5 transition-colors hover:bg-white sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
