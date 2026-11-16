import Link from "next/link";
import { tentang } from "@/lib/content";
import ImageSlot from "@/components/ui/ImageSlot";

export default function TentangMuseum() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="grid overflow-hidden rounded-xl bg-cream shadow-sm md:grid-cols-[1.15fr_1fr]">
        {/* Text */}
        <div className="order-2 p-7 sm:p-10 md:order-1">
          <h2 className="font-display text-2xl font-semibold leading-tight text-maroon sm:text-3xl">
            {tentang.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream-ink/85">
            {tentang.body}
          </p>
          <Link
            href={tentang.cta.href}
            className="mt-7 inline-flex items-center rounded-sm border border-gold-deep px-6 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-gold hover:text-ink"
          >
            {tentang.cta.label}
          </Link>
        </div>

        {/* Image */}
        <ImageSlot
          src={tentang.image}
          alt="Arca peninggalan Majapahit"
          label="Foto Arca"
          className="order-1 h-56 w-full md:order-2 md:h-auto md:min-h-[320px]"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    </section>
  );
}
