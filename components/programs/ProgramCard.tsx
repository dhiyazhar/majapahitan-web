import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { ProgramItem } from "@/lib/payload";
import { ProgramStatusBadge, programAction } from "@/components/programs/ProgramStatusBadge";

type Props = {
  program: ProgramItem;
  className?: string;
};

/**
 * Event card on the dark page, following the home page's PameranProgram card:
 * bare image with the type chip, title, when and where, then the action.
 */
export default function ProgramCard({ program, className = "" }: Props) {
  const programHref = `/program/${program.slug}`;
  const action = programAction(program);

  return (
    <article className={`flex h-full flex-col ${className}`}>
      <Link
        href={programHref}
        tabIndex={-1}
        aria-hidden
        className="group relative block aspect-[4/3] overflow-hidden rounded-md ring-1 ring-hairline"
      >
        <ImageSlot
          src={program.coverImage || program.image}
          alt=""
          label={program.title}
          position="absolute"
          className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {program.programType ? (
          <span className="absolute bottom-2 left-2 rounded-sm bg-maroon px-2.5 py-1 text-xs font-semibold text-cream">
            {program.programType}
          </span>
        ) : null}
      </Link>

      <h3 className="mt-4 text-lg font-bold leading-snug text-cream">
        <Link href={programHref} className="transition-colors hover:text-gold">
          {program.title}
        </Link>
      </h3>

      <div className="mt-2 space-y-1 text-sm">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-cream/90">
          <ProgramStatusBadge status={program.status} />
          <span>{program.eventDate}</span>
          {program.eventTime ? <span className="text-muted">· {program.eventTime}</span> : null}
        </p>
        {program.location ? (
          <p className="flex items-start gap-1.5 text-muted">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
            <span>{program.location}</span>
          </p>
        ) : null}
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/75">{program.excerpt}</p>

      <Link
        href={action.href}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noopener noreferrer" : undefined}
        className="group mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-3 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
      >
        {action.label}
        <ArrowRight
          className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
          aria-hidden
        />
        {action.external ? <span className="sr-only">(membuka tab baru)</span> : null}
      </Link>
    </article>
  );
}
