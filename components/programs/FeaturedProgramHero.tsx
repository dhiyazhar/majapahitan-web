import Link from "next/link";
import { MapPin } from "lucide-react";
import ImageSlot from "@/components/ui/ImageSlot";
import type { ProgramItem } from "@/lib/payload";
import { ProgramStatusBadge, programAction } from "@/components/programs/ProgramStatusBadge";

type Props = {
  program: ProgramItem;
};

/** The lead event, in the same cream panel the home page uses for programs. */
export default function FeaturedProgramHero({ program }: Props) {
  const programHref = `/program/${program.slug}`;
  const action = programAction(program);

  return (
    <article className="rounded-xl bg-cream p-5 sm:p-8">
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <Link
          href={programHref}
          tabIndex={-1}
          aria-hidden
          className="group relative block aspect-[16/10] overflow-hidden rounded-md lg:col-span-7"
        >
          <ImageSlot
            src={program.coverImage || program.image}
            alt=""
            label={program.title}
            position="absolute"
            className="inset-0 h-full w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          {program.programType ? (
            <span className="absolute bottom-3 left-3 rounded-sm bg-maroon px-2.5 py-1 text-xs font-semibold text-cream">
              {program.programType}
            </span>
          ) : null}
        </Link>

        <div className="lg:col-span-5">
          <h2 className="text-2xl font-bold leading-snug text-cream-ink sm:text-3xl">
            <Link href={programHref} className="transition-colors hover:text-maroon focus-visible:outline-maroon">
              {program.title}
            </Link>
          </h2>

          <div className="mt-3 space-y-1 text-sm">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-cream-ink">
              <ProgramStatusBadge status={program.status} tone="cream" />
              <span>{program.eventDate}</span>
              {program.eventTime ? <span className="font-normal text-cream-ink/70">· {program.eventTime}</span> : null}
            </p>
            {program.location ? (
              <p className="flex items-start gap-1.5 text-maroon">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>{program.location}</span>
              </p>
            ) : null}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-cream-ink/80 sm:text-base">{program.excerpt}</p>

          <p className="mt-5 border-t border-cream-ink/15 pt-3 text-sm text-cream-ink/70">
            Penyelenggara: <span className="font-semibold text-cream-ink">PUI Seni Budaya Majapahitan UNESA</span>
          </p>

          <Link
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-maroon-2 focus-visible:outline-maroon"
          >
            {action.label}
            {action.external ? <span className="sr-only"> (membuka tab baru)</span> : null}
          </Link>
        </div>
      </div>
    </article>
  );
}
