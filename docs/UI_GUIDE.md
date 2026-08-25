# Museum Virtual Majapahitan — UI Design Guide & Cheatsheet

Design system reference and UI token guide for the **Museum Virtual Majapahitan** frontend (PUISBM – Universitas Negeri Surabaya).

> **Source of truth:** Color tokens live in [`app/globals.css`](../app/globals.css), fonts in [`app/layout.tsx`](../app/layout.tsx), reusable components in [`components/ui/`](../components/ui/).

---

## 1. Design Philosophy

The site uses a **classical Majapahit museum aesthetic** — dark, warm, and regal:
- Near-black brown backgrounds with gold and maroon accents
- Cream-colored contrast sections for visual breathing room
- Serif display headings (Cinzel) for a historical/monumental feel
- Clean sans-serif body text (Plus Jakarta Sans) for readability

---

## 2. Color Palette

All colors are defined as CSS custom properties in `globals.css` via Tailwind v4 `@theme`, making them available as standard Tailwind classes (`bg-ink`, `text-gold`, `border-hairline`, etc.).

### Dark Surfaces (page backgrounds & cards)
| Token | Hex | Tailwind Classes | Usage |
|---|---|---|---|
| `ink` | `#17110b` | `bg-ink` `text-ink` | Main page background (deep brown-black) |
| `ink-2` | `#1e1710` | `bg-ink-2` | Slightly elevated surface |
| `panel` | `#241b11` | `bg-panel` | Card backgrounds, dropdown menus, nav bar |
| `panel-2` | `#2c2115` | `bg-panel-2` | Hover state on panels / dropdown items |

### Gold (primary accent)
| Token | Hex | Tailwind Classes | Usage |
|---|---|---|---|
| `gold` | `#c9a24a` | `text-gold` `bg-gold` `border-gold` | Active links, headings, logo text, key borders |
| `gold-soft` | `#d9b871` | `text-gold-soft` | Softer gold for secondary links, hover states |
| `gold-deep` | `#a97f2f` | `border-gold-deep` `text-gold-deep` | Button outlines, decorative borders |

### Maroon (CTAs & emphasis)
| Token | Hex | Tailwind Classes | Usage |
|---|---|---|---|
| `maroon` | `#6d1414` | `bg-maroon` `text-maroon` | Primary CTA buttons, donation accents, headings on cream cards |
| `maroon-2` | `#7d1a1a` | `bg-maroon-2` | Hover state for maroon elements |

### Cream (light contrast sections)
| Token | Hex | Tailwind Classes | Usage |
|---|---|---|---|
| `cream` | `#efe4cd` | `bg-cream` `text-cream` | Default text color on dark; light card/section background |
| `cream-2` | `#e7d8b8` | `bg-cream-2` | Secondary cream surface |
| `cream-ink` | `#2a2118` | `text-cream-ink` | Dark text color **inside** cream cards |

### Muted & Dividers
| Token | Hex | Tailwind Classes | Usage |
|---|---|---|---|
| `muted` | `#b7a684` | `text-muted` | Captions, dates, subtitles on dark backgrounds |
| `hairline` | `#3a2e1e` | `border-hairline` `divide-hairline` | Thin dividers and borders on dark surfaces |

### Choosing text colors
| Background | Headings | Body text | Captions |
|---|---|---|---|
| Dark (`ink`, `panel`) | `text-gold` | `text-cream` or `text-cream/80` | `text-muted` |
| Light (`cream`) | `text-maroon` | `text-cream-ink` or `text-cream-ink/75` | `text-cream-ink/60` |

---

## 3. Typography

Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables.

| Role | Font Family | CSS Variable | Tailwind Class | Weights Loaded |
|---|---|---|---|---|
| **Display / Headings** | **Cinzel** (serif) | `--font-cinzel` | `font-display` | 400, 500, 600, 700 |
| **Body / UI** | **Plus Jakarta Sans** (sans-serif) | `--font-jakarta` | `font-sans` (default) | 300, 400, 500, 600, 700 |

### Standard text patterns

**Eyebrow label** (small uppercase marker above a heading):
```tsx
<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
  TENTANG MUSEUM
</p>
// On cream backgrounds, use text-maroon instead of text-gold
```

**Section heading** (Cinzel display):
```tsx
<h2 className="font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl text-gold">
  Section Title
</h2>
```

**Body paragraph** (on dark):
```tsx
<p className="text-sm leading-relaxed text-cream/80 max-w-prose">
  Body text content...
</p>
```

**Body paragraph** (on cream):
```tsx
<p className="text-sm leading-relaxed text-cream-ink/75">
  Body text content on light card...
</p>
```

---

## 4. Layout & Spacing

| Rule | Classes | Notes |
|---|---|---|
| Page container | `mx-auto max-w-7xl px-4 sm:px-6` | All sections wrap in this |
| Section vertical gap | `mt-16` or `mt-20` | Between major page sections |
| Large card corners | `rounded-xl` | Cards, containers, image frames |
| Small element corners | `rounded-sm` | Buttons, badges |
| Circular elements | `rounded-full` | Avatars, icon circles |
| Gold frame border | `.ring-gold-frame` class | Adds `box-shadow: inset 0 0 0 1px rgba(201, 162, 74, 0.35)` |

---

## 5. Layout Components (`components/layout/`)

These wrap every page — import them in each route's `page.tsx`.

### `Navbar` (`components/layout/Navbar.tsx`)
Sticky top navigation bar with desktop dropdown menus, mobile hamburger drawer, language toggle (ID/EN), and search icon. Reads navigation links from `navItems` in `lib/content.ts`.

```tsx
import Navbar from "@/components/layout/Navbar";

// In your page:
<>
  <Navbar />
  <main className="flex-1">
    {/* page content */}
  </main>
  <Footer />
</>
```

### `Footer` (`components/layout/Footer.tsx`)
Site-wide footer with 3-column grid: contact info (address, email, social icons), quick links, and partner logos. Reads data from `contactInfo`, `footerLinks`, `kerjasamaLogos`, and `legalLinks` in `lib/content.ts`.

```tsx
import Footer from "@/components/layout/Footer";
```

### Standard page skeleton
Every page should follow this structure:
```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PageName() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* sections go here */}
      </main>
      <Footer />
    </>
  );
}
```

---

## 6. Reusable UI Components (`components/ui/`)

### `ImageSlot`
Smart image wrapper using `next/image`. Shows a labeled gradient placeholder when the image file doesn't exist yet — no layout shift when the real file is added later.

```tsx
import ImageSlot from "@/components/ui/ImageSlot";

<ImageSlot
  src="/images/tentang/sejarah.jpg"
  alt="Museum history"
  label="Foto Sejarah"           // shown on placeholder
  className="h-64 w-full rounded-xl"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### `SectionHeading`
Standardized section header with optional "See All" link. Has two tones: `"gold"` for dark sections, `"maroon"` for cream sections.

```tsx
import SectionHeading from "@/components/ui/SectionHeading";

<SectionHeading
  title="Program & Kegiatan"
  tone="gold"
  seeAllHref="/program"
  seeAllLabel="Lihat Semua"
/>
```

### `BrandIcons`
SVG social media icons that inherit `currentColor`: `Instagram`, `Youtube`, `Facebook`, `TikTok`.

```tsx
import { Instagram, Youtube } from "@/components/ui/BrandIcons";

<Instagram className="h-5 w-5" />
```

---

## 7. Button Styles

### Gold outline button (default CTA on dark)
```tsx
<Link
  href="/link"
  className="inline-flex items-center rounded-sm border border-gold-deep px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-ink"
>
  Label
</Link>
```

### Maroon filled button (donation / strong CTA)
```tsx
<Link
  href="/donasi"
  className="inline-flex items-center rounded-sm bg-maroon px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-2"
>
  Donasi Sekarang
</Link>
```

### Outline button on cream card
```tsx
<Link
  href="/tentang"
  className="inline-flex items-center rounded-sm border border-gold-deep px-6 py-3 text-xs font-semibold uppercase tracking-wider text-maroon transition-colors hover:bg-gold hover:text-ink"
>
  Selengkapnya
</Link>
```

---

## 8. Image Assets (`public/images/`)

All image paths are referenced from `lib/content.ts`. Until a file is physically placed in the directory, `ImageSlot` renders a labeled placeholder.

| Directory | Content | Suggested Size |
|---|---|---|
| `logos/` | University & partner logos | Transparent PNG, square |
| `hero/` | Hero banner slides | ~1920×760, landscape |
| `koleksi/` | Artifact & collection photos | ~400×260 |
| `pameran/` | Exhibition banners | ~560×320 |
| `tentang/` | About page photos | ~800×640 |
| `berita/` | News article thumbnails | ~224×140 |

Full spec table: [`public/images/README.md`](../public/images/README.md).
