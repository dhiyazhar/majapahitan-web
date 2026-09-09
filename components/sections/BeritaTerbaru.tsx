import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageSlot from "@/components/ui/ImageSlot";
import { getBeritaPosts } from "@/lib/payload";

export default async function BeritaTerbaru() {
  const { docs } = await getBeritaPosts({ limit: 3 });

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
      <div className="rounded-xl border border-maroon/60 bg-ink-2 p-6 sm:p-8">
        <SectionHeading title="Berita Terbaru" seeAllHref="/berita" tone="gold" />

        <ul className="mt-5 divide-y divide-hairline">
          {docs.map((b) => (
            <li key={b.id}>
              <Link
                href={`/berita/${b.slug}`}
                className="group flex items-center gap-4 py-4"
              >
                <ImageSlot
                  src={b.image}
                  alt={b.title}
                  label="Berita"
                  className="h-16 w-24 shrink-0 rounded-md sm:h-[70px] sm:w-28"
                  sizes="112px"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug text-cream transition-colors group-hover:text-gold sm:text-base">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{b.publishedAt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

