import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  /** "gold" for dark sections, "maroon" for cream sections. */
  tone?: "gold" | "maroon";
  className?: string;
};

export default function SectionHeading({
  title,
  seeAllHref,
  seeAllLabel = "Lihat Semua",
  tone = "gold",
  className = "",
}: Props) {
  const titleColor = tone === "gold" ? "text-gold" : "text-maroon";
  const linkColor =
    tone === "gold"
      ? "text-gold-soft hover:text-gold"
      : "text-maroon hover:text-maroon-2";

  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <h2
        className={`font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl ${titleColor}`}
      >
        {title}
      </h2>
      {seeAllHref ? (
        <Link
          href={seeAllHref}
          className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors ${linkColor}`}
        >
          {seeAllLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
