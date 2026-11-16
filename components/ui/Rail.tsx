import SectionHeading from "@/components/ui/SectionHeading";

type Props = {
  title: string;
  subtitle?: string;
  /** Drops the top hairline, for a rail that directly follows a bordered hero. */
  first?: boolean;
  id?: string;
  children: React.ReactNode;
};

/** Heading on the left, content on the right; stacks below lg. Same band logic as the home page's Partisipasi and Berlangganan. */
export default function Rail({ title, subtitle, first = false, id, children }: Props) {
  return (
    <section
      id={id}
      className={`grid gap-8 py-14 sm:py-16 lg:grid-cols-[16rem_1fr] lg:gap-12 ${
        first ? "" : "border-t border-hairline"
      }`}
    >
      <div>
        <SectionHeading title={title} />
        {subtitle ? <p className="mt-3 text-sm text-muted">{subtitle}</p> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
