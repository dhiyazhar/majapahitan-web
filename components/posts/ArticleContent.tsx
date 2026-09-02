import { Tag, Quote } from "lucide-react";
import type { PostContent } from "@/lib/content";

type Props = {
  content: PostContent;
  tags?: string[];
};

export default function ArticleContent({ content, tags = [] }: Props) {
  // Combine lead and paragraphs into one unified stream of paragraphs
  const allParagraphs = [
    ...(content.lead ? [content.lead] : []),
    ...content.paragraphs,
  ];

  return (
    <article className="mx-auto max-w-3xl">
      {/* Article Body Paragraphs - Uniform, Accessible, High-Contrast */}
      <div className="space-y-6 text-base leading-relaxed text-cream/95 sm:text-lg sm:leading-8">
        {allParagraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Editorial Blockquote Callout */}
      {content.quote ? (
        <figure
          role="region"
          aria-label="Kutipan narasumber"
          className="relative my-10 overflow-hidden rounded-r-xl border-l-4 border-gold bg-panel/70 p-6 sm:my-12 sm:p-8"
        >
          <Quote className="absolute -right-2 -top-2 h-20 w-20 text-gold/10" aria-hidden />
          <blockquote className="relative font-sans text-lg font-medium italic leading-relaxed text-cream sm:text-xl sm:leading-relaxed">
            &ldquo;{content.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex flex-col text-xs text-muted sm:text-sm">
            <span className="font-semibold text-gold">{content.quote.author}</span>
            {content.quote.role ? (
              <span className="text-cream/80">{content.quote.role}</span>
            ) : null}
          </figcaption>
        </figure>
      ) : null}

      {/* Subheading & Secondary Paragraphs */}
      {content.subheading ? (
        <div className="mt-12">
          <h2 className="font-sans text-xl font-bold tracking-tight text-gold sm:text-2xl">
            {content.subheading}
          </h2>
          {content.secondaryParagraphs && content.secondaryParagraphs.length > 0 ? (
            <div className="mt-6 space-y-6 text-base leading-relaxed text-cream/95 sm:text-lg sm:leading-8">
              {content.secondaryParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Article Tags - High Contrast & Accessible */}
      {tags.length > 0 ? (
        <nav
          aria-label="Topik terkait artikel"
          className="mt-12 border-t border-hairline pt-6"
        >
          <div className="mb-3 flex items-center gap-2 text-xs text-muted">
            <Tag className="h-3.5 w-3.5 text-gold" aria-hidden />
            <span className="font-semibold uppercase tracking-wider">Topik Terkait:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-sm border border-hairline bg-panel px-3 py-1 text-xs font-medium text-cream transition-colors hover:border-gold hover:text-gold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </nav>
      ) : null}
    </article>
  );
}
