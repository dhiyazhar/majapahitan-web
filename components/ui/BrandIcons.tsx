/** Inline brand glyphs (lucide-react dropped brand icons). currentColor-aware. */
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function Facebook(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export function Instagram(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function Youtube(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 12s0-3.2-.4-4.72a2.5 2.5 0 0 0-1.77-1.77C19.3 5.34 12 5.34 12 5.34s-7.3 0-8.83.37A2.5 2.5 0 0 0 1.4 7.48C1 9 1 12 1 12s0 3.2.4 4.72a2.5 2.5 0 0 0 1.77 1.77c1.53.37 8.83.37 8.83.37s7.3 0 8.83-.37a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12ZM9.8 15.3V8.7l6 3.3-6 3.3Z" />
    </svg>
  );
}

export function TikTok(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.5 3c.3 2.1 1.5 3.7 3.5 4v2.6c-1.3 0-2.5-.4-3.5-1v5.9a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.7a3.2 3.2 0 1 0 2.3 3V3h2.7Z" />
    </svg>
  );
}
