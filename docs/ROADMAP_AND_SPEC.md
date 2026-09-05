# Museum Virtual Majapahitan — Roadmap & Technical Handover Spec

Dokumen spesifikasi teknis dan panduan serah-terima (*handover specification*) untuk pengembang dan agen AI dalam pengembangan website **Museum Virtual Majapahitan** (PUISBM – Universitas Negeri Surabaya).

---

## 📌 1. Ringkasan Proyek & Tech Stack

- **Lokasi Workspace**: `C:\Users\Lenovo LOQ\Code\sbm-majapahitan`
- **Framework Frontend**: Next.js 16.2.11 (App Router, Turbopack) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 (`@theme` tokens di `app/globals.css`, panduan di `docs/UI_GUIDE.md`)
- **Icons**: Lucide React + Custom Brand SVG
- **Tipografi**:
  - **Cinzel (`font-display`)**: Judul pameran, heading seksi, dan teks *eyebrow*.
  - **Plus Jakarta Sans (`font-sans`)**: Semua judul berita/publikasi/karya, teks narasi, dan antarmuka artikel.
- **Content Management**: Payload CMS 3+ (Integrated Next.js App Router, PostgreSQL / Local API, Cloudflare R2 untuk media)
- **Status Kompilasi**: **36 Rute Statis & SSG Aktif** (`npm run build` sukses kode 0).

---

## ✅ 2. Matriks Status Implementasi Fitur

| Modul / Rute | Status | Komponen & Template Terkait | Fitur Kunci & Keputusan Desain |
|---|---|---|---|
| **Beranda** (`/`) | Selesai | `app/(website)/page.tsx`<br>`components/sections/*` | Hero Carousel, Akses Cepat, Pameran Slider, Koleksi, Warta Terbaru, Partisipasi Publik, Newsletter. |
| **Tentang Museum** (`/tentang`) | Selesai | `app/(website)/tentang/page.tsx` | Visi & Misi (garis tengah dead-center), Sejarah, Tim Ahli, Mitra, Kontak & Peta 2-kolom tanpa kartu bertumpuk (*no nested card*). |
| **Konservasi Index** (`/konservasi`) | Selesai | `app/(website)/konservasi/page.tsx` | Dua Pilar Konservasi, 4 Tahapan Ilmiah dengan angka emas `01–04` & vertical dividers. |
| **Situs & Arsitektur** (`/konservasi/situs`) | Selesai | `app/(website)/konservasi/situs/page.tsx` | Katalog 6 situs sejarah dengan metadata era, peta sebaran, dan CTA seamless. |
| **Artefak & Benda Budaya** (`/konservasi/artefak`) | Selesai | `app/(website)/konservasi/artefak/page.tsx` | Filter kategori bahan/material, katalog 6 artefak dengan era & material. |
| **Warta Berita** (`/berita` & `/berita/[slug]`) | Selesai | `components/templates/PostListingTemplate.tsx`<br>`components/templates/PostDetailTemplate.tsx` | Hero warta utama (Plus Jakarta Sans), filter kategori, pagination, body artikel uniform AAA contrast, tombol share. |
| **Publikasi Ilmiah** (`/publikasi` & `/publikasi/[slug]`) | Selesai | `components/templates/PublicationListingTemplate.tsx`<br>`components/templates/PublicationDetailTemplate.tsx`<br>`components/posts/PublicationCard.tsx` | Gateway E-Library eksternal, badge SINTA putih, DOI, generator sitasi otomatis APA 7th, pencarian naskah. |
| **Program & Kegiatan** (`/program` & `/program/[slug]`) | Selesai | `app/(website)/program/page.tsx`<br>`app/(website)/program/[slug]/page.tsx` | Agenda pameran virtual, lokakarya, seminar, dan webinar kebudayaan. |
| **Portal Hub Galeri** (`/galeri`) | Selesai | `components/templates/GalleryHubTemplate.tsx` | 3 Gerbang galeri visual, filter tab kategori, sorotan karya pilihan dengan **Modal Lightbox Interaktif**. |
| **Galeri Karya Publik** (`/galeri/publik`) | Selesai | `components/templates/PublicGalleryTemplate.tsx` | Ruang apresiasi karya kiriman masyarakat, filter sub-kategori, alur kurasi 2-kolom rapi, modal Lightbox. |
| **Galeri Virtual Museum** (`/galeri/museum`) | Selesai | `components/templates/MuseumGalleryTemplate.tsx` | Portal koleksi internal PUI dengan gerbang sayap Otentik & Kontemporer, pencarian real-time, dan banner 3D tour. |
| **Koleksi Otentik** (`/galeri/museum/otentik`) | Selesai | `app/(website)/galeri/museum/otentik/page.tsx` | Arsip foto pusaka tosan aji, arca andesit, makro relief Kala, terakota kuno, dan pemodelan 3D. |
| **Karya Kontemporer** (`/galeri/museum/kontemporer`) | Selesai | `app/(website)/galeri/museum/kontemporer/page.tsx` | Pameran seni rupa modern: relief Surya emas, kain modern motif candi Penataran, instalasi digital Kawi. |
| **Form Submisi Karya** (`/partisipasi/kirim-karya`) | Selesai | `components/forms/KirimKaryaForm.tsx` | Form pengiriman karya publik dengan validasi client-side, drag-and-drop preview, dan accordion panduan kuratorial. |
| **Komponen Lightbox** | Selesai | `components/gallery/ArtworkLightbox.tsx` | Penampil layar penuh (*accessible modal*), metadata kuratorial, keyboard nav (<kbd>←</kbd> <kbd>→</kbd> <kbd>ESC</kbd>), body scroll lock. |
| **Payload CMS Schema** | Selesai | `payload.config.ts`<br>`collections/*`<br>`globals/*` | 6 Collections (`Posts`, `KaryaMuseum`, `KaryaPublik`, `Situs`, `Artefak`, `Pages`), 5 Globals, `importMap.js` (53 entries). |

---

## 🗺️ 3. Roadmap Milestone & Rencana Tahapan

```
[FASE 1] Fondasi Desain & Landing Page               [✅ SELESAI]
   ├── Design Tokens Tailwind v4 (@theme di globals.css)
   ├── Komponen Dasar: ImageSlot, Navbar 3-Level, Footer
   └── Halaman Beranda (/) lengkap 8 section

[FASE 2A] Halaman Statis Inti & Form Kurasi           [✅ SELESAI]
   ├── /tentang (Visi-Misi, Tim Ahli, Kontak 2-kolom)
   ├── /konservasi, /konservasi/situs, /konservasi/artefak
   └── /partisipasi/kirim-karya (Formulir Kurasi Terbuka)

[FASE 2B] Modul Artikel, Publikasi & Program         [✅ SELESAI]
   ├── /berita & 6 dynamic routes /berita/[slug]
   ├── /publikasi & 6 dynamic routes /publikasi/[slug] (E-Library & APA 7)
   └── /program & 6 dynamic routes /program/[slug]

[FASE 2C] Modul Galeri & Lightbox Showcase           [✅ SELESAI]
   ├── /galeri (Portal Hub Galeri Virtual)
   ├── /galeri/publik (Galeri Karya Publik)
   ├── /galeri/museum (Galeri Virtual Museum)
   ├── /galeri/museum/otentik & /galeri/museum/kontemporer
   └── ArtworkLightbox (Navigasi Keyboard, Metadata Kurator, Scroll Lock)

[FASE 2D] Modul Partisipasi Publik Lanjutan          [⏳ TAHAP SEKARANG]
   ├── /partisipasi/relawan (Formulir Pendaftaran Relawan Virtual)
   ├── /partisipasi/buku-tamu (Buku Tamu Digital Pengunjung)
   └── /partisipasi/testimoni (Kesan & Testimoni Apresiasi Pengunjung)
          │
          ▼
[FASE 3] Integrasi Payload CMS 3+ Local API          [🎯 TARGET BACKEND]
   ├── Fase 3A: Skema Collections & Globals          [✅ SELESAI]
   ├── Fase 3B: Migrasi Data & Database PostgreSQL Seed
   ├── Fase 3C: Local API Wire-up (Mengganti lib/content.ts seam ke getPayload())
   └── Fase 3D: Cloudflare R2 Media Storage Adapter untuk Upload Foto Karya

[FASE 4] Fitur Interaktif Lanjutan & Multibahasa     [🚀 FINALISASI]
   ├── Tur Virtual 3D / 360° Interactive Canvas Viewer
   └── Sakelar Bahasa ID / EN (i18n Localization)
```

---

## 🛠️ 4. Panduan & Aturan Desain Penting (*User Rules*)

1. **Aturan Hirarki Tipografi**:
   - **Cinzel (`font-display`)**: Khusus untuk *Hero Title*, *Section Heading*, dan *Eyebrow*.
   - **Plus Jakarta Sans (`font-sans font-bold`)**: Untuk semua judul berita, judul publikasi, dan judul karya seni agar mudah dibaca.
   - **Ukuran Body Paragraf**: Wajib 100% seragam (`text-base sm:text-lg sm:leading-8 text-cream/95`), tanpa *lead paragraph* berukuran raksasa.
2. **Aturan Tata Letak Kartu (*No Nested Cards*)**:
   - Hindari membuat kotak kartu di dalam kotak kartu (*card inside a card*). Gunakan tata letak 2-kolom bersih dengan garis vertikal pemisah (`lg:border-l lg:border-hairline/80 lg:pl-10`).
3. **Pemberian Lencana (*Badges*)**:
   - Jangan menambahkan lencana/tag berlebihan yang menutupi gambar sampul karya.
   - Badge SINTA pada kartu publikasi wajib menggunakan warna putih bersih (`text-white`).
4. **Data Seam Pattern**:
   - `lib/content.ts` adalah satu-satunya mock data seam. Saat Payload Local API dihubungkan di Fase 3B, komponen tidak perlu diubah struktur props-nya.

---

*Dokumen ini telah diperbarui per 3 September 2026 sebagai acuan resmi kelanjutan proyek Museum Virtual Majapahitan.*
