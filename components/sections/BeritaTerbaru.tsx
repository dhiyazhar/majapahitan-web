import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageSlot from "@/components/ui/ImageSlot";
import { getBeritaPosts } from "@/lib/payload";

/** A thumbnail earns its column only when the picture exists; a placeholder per row is noise. */
function hasImage(src?: string) {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  return existsSync(path.join(process.cwd(), "public", src));
}

export default async function BeritaTerbaru() {
  const { docs } = await getBeritaPosts({ limit: 3 });

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <SectionHeading title="Berita Terbaru" seeAllHref="/berita" tone="gold" size="sm" />

      {docs.length === 0 ? (
        <p className="mt-6 border-y border-hairline py-6 text-base text-muted">
          Belum ada berita yang diterbitkan. Kabar kegiatan museum akan tampil di sini.
        </p>
      ) : null}

      <ul className="mt-6 border-t border-gold/30 empty:hidden">
        {docs.map((b) => {
          const thumb = hasImage(b.image);
          return (
            <li key={b.id} className="border-b border-hairline">
              <Link
                href={`/berita/${b.slug}`}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 py-5 sm:grid-cols-[9rem_minmax(0,1fr)_auto]"
              >
                <time className="col-span-2 text-sm tabular-nums text-muted sm:col-span-1">
                  {b.publishedAt}
                </time>
                <span className="flex min-w-0 items-center gap-4">
                  {thumb ? (
                    <ImageSlot
                      src={b.image}
                      alt=""
                      className="hidden h-16 w-24 shrink-0 rounded-sm sm:block"
                      sizes="96px"
                    />
                  ) : null}
                  <span className="text-base font-semibold leading-snug text-cream transition-colors group-hover:text-gold sm:text-lg">
                    {b.title}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-gold/70 transition-transform group-hover:translate-x-1 group-hover:text-gold"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
