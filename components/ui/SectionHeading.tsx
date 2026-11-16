import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  /** "gold" for sandstone sections, "maroon" for cream sections. */
  tone?: "gold" | "maroon";
  /** Heading weight in the page: "lg" for the page's peak section, "sm" for supporting ones. */
  size?: "lg" | "md" | "sm";
  className?: string;
};

const sizes = {
  lg: "text-3xl sm:text-4xl",
  md: "text-2xl sm:text-3xl",
  sm: "text-xl sm:text-2xl",
};

export default function SectionHeading({
  title,
  seeAllHref,
  seeAllLabel = "Lihat Semua",
  tone = "gold",
  size = "md",
  className = "",
}: Props) {
  const titleColor = tone === "gold" ? "text-gold" : "text-maroon";
  const linkColor =
    tone === "gold"
      ? "text-gold-soft hover:text-gold"
      : "text-maroon hover:text-maroon-2";

  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-4 gap-y-2 ${className}`}>
      <h2 className={`font-display font-semibold ${sizes[size]} ${titleColor}`}>
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
