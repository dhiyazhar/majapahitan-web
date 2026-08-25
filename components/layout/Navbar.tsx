"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import { navItems, type NavItem } from "@/lib/content";
import ImageSlot from "@/components/ui/ImageSlot";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[76px]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <ImageSlot
            src="/images/logos/brand-mark.png"
            alt="Lambang Museum Virtual Majapahitan"
            label="Logo"
            className="h-11 w-11 shrink-0 rounded-sm"
          />
          <span className="leading-tight">
            <span className="flex w-max flex-col font-display font-bold uppercase leading-[1.1] tracking-wide text-gold">
              <span className="flex justify-between gap-x-[0.25em] text-[13px] sm:text-sm">
                <span>Museum</span>
                <span>Virtual</span>
              </span>
              <span className="text-[17px] sm:text-[19px]">Majapahitan</span>
            </span>
            <span className="mt-1 block whitespace-nowrap text-[9px] uppercase tracking-[0.08em] text-muted sm:text-[10px]">
              PUISBM – Universitas Negeri Surabaya
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="ml-auto hidden items-center gap-4 xl:flex 2xl:gap-6">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap py-2 text-sm font-medium transition-colors ${
                    active ? "text-gold" : "text-cream/85 hover:text-gold"
                  }`}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                  ) : null}
                </Link>
                {active ? (
                  <span className="absolute -bottom-px left-0 h-0.5 w-full bg-gold" />
                ) : null}

                {/* Level 2 dropdown */}
                {item.children ? (
                  <ul className="invisible absolute left-0 top-full z-10 w-60 translate-y-1 rounded-md border border-hairline bg-panel py-1.5 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href} className="group/sub relative">
                        <Link
                          href={child.href}
                          className="flex items-center justify-between px-4 py-2 text-sm text-cream/80 transition-colors hover:bg-panel-2 hover:text-gold"
                        >
                          <span>{child.label}</span>
                          {child.children ? (
                            <ChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden />
                          ) : null}
                        </Link>

                        {/* Level 3 flyout dropdown */}
                        {child.children ? (
                          <ul className="invisible absolute left-full top-0 z-20 -ml-1 w-56 translate-x-1 rounded-md border border-hairline bg-panel py-1.5 opacity-0 shadow-xl transition-all group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100">
                            {child.children.map((subChild) => (
                              <li key={subChild.href}>
                                <Link
                                  href={subChild.href}
                                  className="block px-4 py-2 text-sm text-cream/80 transition-colors hover:bg-panel-2 hover:text-gold"
                                >
                                  {subChild.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3 xl:ml-4">
          <div className="hidden items-center text-sm font-medium text-muted sm:flex">
            <button
              onClick={() => setLang("ID")}
              className={lang === "ID" ? "text-gold" : "hover:text-cream"}
            >
              ID
            </button>
            <span className="mx-1.5 text-hairline">|</span>
            <button
              onClick={() => setLang("EN")}
              className={lang === "EN" ? "text-gold" : "hover:text-cream"}
            >
              EN
            </button>
          </div>
          <button
            aria-label="Cari"
            className="text-cream/80 transition-colors hover:text-gold"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
            className="text-cream/80 transition-colors hover:text-gold xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open ? (
        <div className="border-t border-hairline bg-panel xl:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href} className="border-b border-hairline/60 last:border-none">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm font-medium ${
                      active ? "text-gold" : "text-cream/85"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Level 2 children */}
                  {item.children ? (
                    <ul className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href} className="py-1">
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 text-sm font-medium text-muted hover:text-gold"
                          >
                            {child.label}
                          </Link>

                          {/* Level 3 children */}
                          {child.children ? (
                            <ul className="pb-1 pl-3">
                              {child.children.map((subChild) => (
                                <li key={subChild.href}>
                                  <Link
                                    href={subChild.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-1 text-xs text-muted/80 hover:text-gold"
                                  >
                                    • {subChild.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

