/**
 * Event timing for programs: status, time-of-day and registration window.
 * Everything is derived from the start/end timestamps at render time, so it
 * never goes stale. Times are shown in WIB (Asia/Jakarta) regardless of the
 * server's timezone. No 'server-only' import: safe for client components too.
 */

export type ProgramStatus = "akan-datang" | "berlangsung" | "selesai";

export const PROGRAM_STATUS_LABEL: Record<ProgramStatus, string> = {
  "akan-datang": "Akan datang",
  berlangsung: "Berlangsung",
  selesai: "Selesai",
};

const TZ = "Asia/Jakarta";

type JakartaParts = { year: number; month: number; day: number; hour: number; minute: number };

function jakartaParts(date: Date): JakartaParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute") };
}

function parse(value?: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/** 00:00 WIB means the editor picked a day, not a time: treat it as all-day. */
function isMidnight(date: Date): boolean {
  const p = jakartaParts(date);
  return p.hour === 0 && p.minute === 0;
}

/** Last moment of the given date's calendar day in WIB. */
function endOfJakartaDay(date: Date): Date {
  const p = jakartaParts(date);
  // WIB is UTC+7 with no daylight saving, so 23:59:59.999 WIB is 16:59:59.999 UTC.
  return new Date(Date.UTC(p.year, p.month - 1, p.day, 16, 59, 59, 999));
}

/**
 * When the event is over. No end date: end of the start day. An end date given
 * without a time (00:00) covers that whole day.
 */
function effectiveEnd(start: Date, end: Date | null): Date {
  if (!end) return endOfJakartaDay(start);
  return isMidnight(end) ? endOfJakartaDay(end) : end;
}

export function getProgramStatus(
  startsAt?: string | null,
  endsAt?: string | null,
  now: Date = new Date(),
): ProgramStatus | undefined {
  const start = parse(startsAt);
  if (!start) return undefined; // "Segera Hadir": no schedule yet
  if (now < start) return "akan-datang";
  if (now <= effectiveEnd(start, parse(endsAt))) return "berlangsung";
  return "selesai";
}

/** Open while a link exists, the event is not over, and the deadline (or else the start) has not passed. */
export function isRegistrationOpen(
  registrationUrl: string | null | undefined,
  startsAt?: string | null,
  endsAt?: string | null,
  registrationDeadline?: string | null,
  now: Date = new Date(),
): boolean {
  if (!registrationUrl) return false;
  if (getProgramStatus(startsAt, endsAt, now) === "selesai") return false;
  const deadline = parse(registrationDeadline);
  if (deadline) return now <= deadline;
  const start = parse(startsAt);
  return start ? now < start : true;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "09.00 WIB" or "09.00–12.00 WIB"; undefined for all-day events. */
export function formatProgramTime(startsAt?: string | null, endsAt?: string | null): string | undefined {
  const start = parse(startsAt);
  if (!start || isMidnight(start)) return undefined;
  const s = jakartaParts(start);
  const end = parse(endsAt);
  if (end && !isMidnight(end)) {
    const e = jakartaParts(end);
    const sameDay = s.year === e.year && s.month === e.month && s.day === e.day;
    if (sameDay) return `${pad(s.hour)}.${pad(s.minute)}–${pad(e.hour)}.${pad(e.minute)} WIB`;
  }
  return `${pad(s.hour)}.${pad(s.minute)} WIB`;
}

const INDO_MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** Date range in WIB, e.g. "12 Okt 2026", "12 – 14 Oktober 2026", "Segera Hadir". */
export function formatProgramDateRange(startsAt?: string | null, endsAt?: string | null): string {
  const start = parse(startsAt);
  if (!start) return startsAt ? String(startsAt) : "Segera Hadir";
  const s = jakartaParts(start);
  const fmt = (p: JakartaParts) => `${p.day} ${INDO_MONTHS[p.month - 1]} ${p.year}`;
  const end = parse(endsAt);
  if (!end) return fmt(s);
  const e = jakartaParts(end);
  if (s.year === e.year && s.month === e.month && s.day === e.day) return fmt(s);
  if (s.year === e.year && s.month === e.month) return `${s.day} – ${e.day} ${INDO_MONTHS[s.month - 1]} ${s.year}`;
  if (s.year === e.year) return `${s.day} ${INDO_MONTHS[s.month - 1]} – ${e.day} ${INDO_MONTHS[e.month - 1]} ${s.year}`;
  return `${fmt(s)} – ${fmt(e)}`;
}

/**
 * Button label when the editor left ctaLabel empty: says what actually happens
 * for this event right now.
 */
export function resolveProgramCtaLabel(opts: {
  ctaLabel?: string | null;
  programType?: string | null;
  status?: ProgramStatus;
  registrationOpen: boolean;
}): string {
  if (opts.ctaLabel) return opts.ctaLabel;
  if (opts.status === "selesai") return "Lihat dokumentasi";
  if (opts.registrationOpen) return "Daftar sekarang";
  if (opts.programType?.startsWith("Pameran")) return "Kunjungi pameran";
  return "Lihat detail program";
}
