import { PROGRAM_STATUS_LABEL, type ProgramStatus } from "@/lib/program-status";
import type { ProgramItem } from "@/lib/payload";

const STYLES: Record<"dark" | "cream", Record<ProgramStatus, string>> = {
  dark: {
    berlangsung: "bg-gold text-ink",
    "akan-datang": "border border-gold/60 text-gold",
    selesai: "border border-hairline text-muted",
  },
  cream: {
    berlangsung: "bg-maroon text-cream",
    "akan-datang": "border border-maroon/60 text-maroon",
    selesai: "border border-cream-ink/25 text-cream-ink/70",
  },
};

/** Akan datang / Berlangsung / Selesai. Renders nothing for unscheduled programs. */
export function ProgramStatusBadge({
  status,
  tone = "dark",
}: {
  status?: ProgramStatus;
  tone?: "dark" | "cream";
}) {
  if (!status) return null;
  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold ${STYLES[tone][status]}`}>
      {PROGRAM_STATUS_LABEL[status]}
    </span>
  );
}

/**
 * Where the card's button goes: the registration form while it is open, else an
 * editor-set external link, else the program's own page.
 */
export function programAction(program: ProgramItem) {
  if (program.registrationOpen && program.registrationUrl) {
    return { href: program.registrationUrl, external: true, label: program.ctaLabel };
  }
  const external = Boolean(program.ctaUrl && program.ctaUrl.startsWith("http"));
  return {
    href: external ? program.ctaUrl! : `/program/${program.slug}`,
    external,
    label: program.ctaLabel,
  };
}
