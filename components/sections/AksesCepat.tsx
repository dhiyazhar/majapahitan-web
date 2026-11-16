import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aksesCepat } from "@/lib/content";

export default function AksesCepat() {
  return (
    <nav aria-label="Akses cepat" className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
      <ul className="grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
        {aksesCepat.map((item, i) => (
          <li
            key={item.id}
            className={`border-hairline max-sm:[&:not(:last-child)]:border-b sm:max-lg:[&:nth-child(-n+2)]:border-b ${
              i % 2 === 1 ? "sm:border-l" : ""
            } ${i > 0 ? "lg:border-l" : ""}`}
          >
            <Link
              href={item.href}
              className="group flex h-full items-start justify-between gap-4 px-1 py-5 sm:px-5"
            >
              <span>
                <span className="block text-base font-bold text-cream transition-colors group-hover:text-gold">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm text-muted">{item.subtitle}</span>
              </span>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-gold/80 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
