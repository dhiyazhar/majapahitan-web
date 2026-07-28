import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  contactInfo,
  footerLinks,
  kerjasamaLogos,
  legalLinks,
} from "@/lib/content";
import ImageSlot from "@/components/ui/ImageSlot";
import {
  Facebook,
  Instagram,
  TikTok,
  Youtube,
} from "@/components/ui/BrandIcons";

type BrandIcon = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

const socialIcons: Record<string, BrandIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  music: TikTok,
};

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* Hubungi Kami */}
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-gold">
            Hubungi Kami
          </h3>
          <p className="mt-4 text-sm font-semibold text-cream">
            {contactInfo.org}
          </p>
          <p className="mt-1 flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {contactInfo.address}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted">
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            <a href={`mailto:${contactInfo.email}`} className="hover:text-gold">
              {contactInfo.email}
            </a>
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="hover:text-gold"
            >
              {contactInfo.phone}
            </a>
          </p>

          <div className="mt-5 flex gap-3">
            {contactInfo.socials.map((s) => {
              const Icon = socialIcons[s.icon] ?? TikTok;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Tautan Cepat */}
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-gold">
            {footerLinks.title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kerja Sama */}
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-gold">
            Kerja Sama
          </h3>
          <div className="mt-4 grid max-w-[220px] grid-cols-2 gap-4">
            {kerjasamaLogos.map((p) => (
              <ImageSlot
                key={p.id}
                src={p.logo}
                alt={p.name}
                label="Logo"
                className="flex h-20 w-full items-center justify-center rounded-md bg-ink/60"
                imgClassName="object-contain p-2"
                sizes="110px"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6">
          <p>© 2026 Museum Virtual Majapahitan. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
