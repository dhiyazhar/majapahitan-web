import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { PostItem } from "@/lib/content";

type Props = {
  post: PostItem;
  className?: string;
};

export default function PostCard({ post, className = "" }: Props) {
  const postHref = `/${post.category}/${post.slug}`;

  return (
    <article
      className={`group flex flex-col justify-between overflow-hidden rounded-xl bg-panel ring-gold-frame transition-all duration-300 hover:bg-panel-2 hover:-translate-y-1 ${className}`}
    >
      <div>
        {/* Cover Image */}
        <Link href={postHref} className="relative block h-52 w-full overflow-hidden bg-ink sm:h-56">
          <ImageSlot
            src={post.image}
            alt={post.title}
            label={post.title}
            position="absolute"
            className="inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-80" />
          
          {/* Subcategory Badge */}
          {post.subcategory ? (
            <span className="absolute top-3 left-3 rounded-sm bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
              {post.subcategory}
            </span>
          ) : null}
        </Link>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gold" />
              {post.publishedAt}
            </span>
            <span className="text-hairline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 font-sans text-base font-bold leading-snug text-cream transition-colors group-hover:text-gold sm:text-lg">
            <Link href={postHref}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-cream/85">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="border-t border-hairline/50 p-5 pt-3 sm:p-6 sm:pt-3">
        <Link
          href={postHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-soft transition-colors group-hover:text-gold"
        >
          <span>Baca Selengkapnya</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
