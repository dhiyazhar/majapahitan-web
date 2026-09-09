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
  - **Plus Jakarta Sans (`font-sans`)**: Semua judul berita/publikasi/karya/program, teks narasi, dan antarmuka artikel.
- **Content Management**: Payload CMS 3+ (Integrated Next.js App Router, PostgreSQL / Local API, Cloudflare R2 untuk media)
- **Status Kompilasi**: **26 Rute Statis & SSG Aktif** (`npm run build` sukses kode 0 tanpa error).

---

## ✅ 2. Matriks Status Implementasi Fitur

| Modul / Rute | Status | Komponen & Template Terkait | Fitur Kunci & Keputusan Desain |
|---|---|---|---|
| **Beranda** (`/`) | Selesai | `app/(website)/page.tsx`<br>`components/sections/*` | Hero Carousel, Akses Cepat, Pameran Slider (`getProgramPosts`), Koleksi, Warta Terbaru (`getBeritaPosts`), Partisipasi Publik, Newsletter. |
| **Tentang Museum** (`/tentang`) | Selesai | `app/(website)/tentang/page.tsx` | Visi & Misi (garis tengah dead-center), Sejarah, Tim Ahli, Mitra, Kontak & Peta 2-kolom tanpa kartu bertumpuk (*no nested card*). |
| **Konservasi Index** (`/konservasi`) | Selesai | `app/(website)/konservasi/page.tsx` | Dua Pilar Konservasi, 4 Tahapan Ilmiah dengan angka emas `01–04` & vertical dividers. |
| **Situs & Arsitektur** (`/konservasi/situs`) | Selesai | `app/(website)/konservasi/situs/page.tsx` | Katalog 6 situs sejarah dengan metadata era, peta sebaran, dan CTA seamless. |
| **Artefak & Benda Budaya** (`/konservasi/artefak`) | Selesai | `app/(website)/konservasi/artefak/page.tsx` | Filter kategori bahan/material, katalog 6 artefak dengan era & material. |
| **Warta Berita** (`/berita` & `/berita/[slug]`) | Selesai | `components/templates/BeritaListingTemplate.tsx`<br>`components/templates/BeritaDetailTemplate.tsx`<br>`components/berita/BeritaCard.tsx` | Koleksi mandiri `collections/Berita.ts`, hero warta utama, filter kategori, pagination, metadata lengkap (penulis, tanggal terbit, waktu baca), body artikel AAA contrast, tombol share. |
| **Publikasi Ilmiah** (`/publikasi` & `/publikasi/[slug]`) | Selesai | `components/templates/PublicationListingTemplate.tsx`<br>`components/templates/PublicationDetailTemplate.tsx`<br>`components/posts/PublicationCard.tsx` | Koleksi mandiri `collections/Publikasi.ts`, gateway E-Library eksternal, badge SINTA putih, DOI, generator sitasi otomatis APA 7th, pencarian naskah riset. |
| **Program & Kegiatan** (`/program` & `/program/[slug]`) | Selesai | `components/templates/ProgramListingTemplate.tsx`<br>`components/templates/ProgramDetailTemplate.tsx`<br>`components/programs/ProgramCard.tsx`<br>`components/programs/FeaturedProgramHero.tsx` | Koleksi mandiri `collections/Programs.ts`. Desain non-blog (tanpa estimasi waktu baca). Alur hierarki: `breadcrumb → badge → judul → subjudul text (date · location) → hero image → info card (Jadwal, Tempat, CTA) → konten`. Info Card ramping tanpa judul duplikasi dengan divider vertikal & tombol aksi `Yuk Ikut →` warna tema emas (`bg-gold`). |
| **Portal Hub Galeri** (`/galeri`) | Selesai | `components/templates/GalleryHubTemplate.tsx` | 3 Gerbang galeri visual, filter tab kategori, sorotan karya pilihan dengan **Modal Lightbox Interaktif**. |
| **Galeri Karya Publik** (`/galeri/publik`) | Selesai | `components/templates/PublicGalleryTemplate.tsx` | Ruang apresiasi karya kiriman masyarakat, filter sub-kategori, alur kurasi 2-kolom rapi, modal Lightbox. |
| **Galeri Virtual Museum** (`/galeri/museum`) | Selesai | `components/templates/MuseumGalleryTemplate.tsx` | Portal koleksi internal PUI dengan gerbang sayap Otentik & Kontemporer, pencarian real-time, dan banner 3D tour. |
| **Koleksi Otentik** (`/galeri/museum/otentik`) | Selesai | `app/(website)/galeri/museum/otentik/page.tsx` | Arsip foto pusaka tosan aji, arca andesit, makro relief Kala, terakota kuno, dan pemodelan 3D. |
| **Karya Kontemporer** (`/galeri/museum/kontemporer`) | Selesai | `app/(website)/galeri/museum/kontemporer/page.tsx` | Pameran seni rupa modern: relief Surya emas, kain modern motif candi Penataran, instalasi digital Kawi. |
| **Form Submisi Karya** (`/partisipasi/kirim-karya`) | Selesai | `components/forms/KirimKaryaForm.tsx` | Form pengiriman karya publik dengan validasi client-side, drag-and-drop preview, dan accordion panduan kuratorial. |
| **Komponen Lightbox** | Selesai | `components/gallery/ArtworkLightbox.tsx` | Penampil layar penuh (*accessible modal*), metadata kuratorial, keyboard nav (<kbd>←</kbd> <kbd>→</kbd> <kbd>ESC</kbd>), body scroll lock. |
| **Payload CMS Schema & Auth** | Selesai | `payload.config.ts`<br>`collections/*`<br>`lib/payload.ts` | 8 Collections terpisah (`Berita`, `Publikasi`, `Programs`, `KaryaMuseum`, `KaryaPublik`, `Situs`, `Artefak`, `Pages`, `Users`, `Media`). Registrasi user pertama otomatis menjadi `admin` secara permanen dengan field role disembunyikan pada formulir pendaftaran awal. |

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

[FASE 2B] Pemisahan Koleksi & Template Khusus        [✅ SELESAI]
   ├── Dekomposisi Posts Monolitik -> 3 Koleksi Terpisah (Berita, Publikasi, Program)
   ├── /berita & /berita/[slug] (BeritaListingTemplate, BeritaDetailTemplate, BeritaCard)
   ├── /publikasi & /publikasi/[slug] (PublicationListingTemplate, PublicationDetailTemplate, SINTA, APA-7)
   └── /program & /program/[slug] (ProgramListingTemplate, ProgramDetailTemplate, FeaturedHero, Info Card)

[FASE 2C] Modul Galeri & Lightbox Showcase           [✅ SELESAI]
   ├── /galeri (Portal Hub Galeri Virtual)
   ├── /galeri/publik (Galeri Karya Publik)
   ├── /galeri/museum (Galeri Virtual Museum)
   ├── /galeri/museum/otentik & /galeri/museum/kontemporer
   └── ArtworkLightbox (Navigasi Keyboard, Metadata Kurator, Scroll Lock)

[FASE 3] Integrasi Payload CMS 3+ Local API          [⚡ SEDANG BERJALAN]
   ├── Fase 3A: Skema Collections Mandiri & Globals  [✅ SELESAI]
   ├── Fase 3B: Autentikasi & RBAC Pengguna Pertama [✅ SELESAI]
   │     └── Auto-assign Admin & Hide Role Field pada pendaftaran pertama
   ├── Fase 3C: Local API Wire-up & Fallback Seam   [✅ SELESAI]
   │     ├── lib/payload.ts (getBeritaPosts, getProgramPosts, getPublicationPosts)
   │     └── Mock Seam transparan saat koleksi database kosong [CMS_FALLBACK_ACTIVE]
   ├── Fase 3D: Database Seeding & Konten Riil       [⏳ TAHAP SEKARANG]
   └── Fase 3E: Cloudflare R2 Media Storage Adapter untuk Upload Produksi

[FASE 4] Fitur Interaktif Lanjutan & Multibahasa     [🚀 TAHAP MENDATANG]
   ├── /partisipasi lanjutan (Buku Tamu Digital, Relawan Virtual)
   ├── Tur Virtual 3D / 360° Interactive Canvas Viewer
   └── Sakelar Bahasa ID / EN (i18n Localization)
```

---

## 🛠️ 4. Panduan & Aturan Desain Penting (*User Rules*)

1. **Aturan Hirarki Tipografi**:
   - **Cinzel (`font-display`)**: Khusus untuk *Hero Title*, *Section Heading*, dan *Eyebrow*.
   - **Plus Jakarta Sans (`font-sans font-bold`)**: Untuk semua judul berita, judul publikasi, judul program/agenda, dan judul karya seni agar keterbacaan maksimal.
   - **Ukuran Body Paragraf**: Wajib 100% seragam (`text-base sm:text-lg sm:leading-8 text-cream/95`), tanpa *lead paragraph* berukuran raksasa.
2. **Aturan Halaman Program & Kegiatan**:
   - **Bukan Format Blog**: Dilarang menampilkan estimasi waktu baca ("1 mnt baca").
   - **Urutan Elemen**: `Breadcrumb → Badge Kategori → Judul H1 → Subjudul Teks (Tanggal · Tempat) → Gambar Hero → Info Card (Jadwal, Tempat, CTA) → Body Konten → Tombol Bagikan → Tautan Kembali → Agenda Terkait`.
   - **Info Card Agenda**: Tanpa judul duplikasi "Informasi & Pelaksanaan Agenda", menggunakan tata letak dua kolom terbagi garis pemisah vertikal (`bg-hairline`), ikon `text-gold`, dan tombol aksi `Yuk Ikut →` dengan palet emas tema (`bg-gold text-ink hover:bg-gold-soft`). Dilarang menduplikasi kotak ajakan partisipasi di bawah jika sudah terwakili di Info Card atas.
3. **Aturan Tata Letak Kartu (*No Nested Cards*)**:
   - Hindari membuat kotak kartu di dalam kotak kartu (*card inside a card*). Gunakan tata letak 2-kolom bersih dengan garis vertikal pemisah (`lg:border-l lg:border-hairline/80 lg:pl-10`).
4. **Pemberian Lencana (*Badges*)**:
   - Jangan menambahkan lencana/tag berlebihan yang menutupi gambar sampul karya.
   - Badge SINTA pada kartu publikasi wajib menggunakan warna putih bersih (`text-white`).
5. **Autentikasi & Hak Akses Admin**:
   - Pengguna pertama pada database baru secara otomatis ditetapkan sebagai `admin` dan tidak dapat diubah dari form pendaftaran awal.
6. **Data Seam Pattern**:
   - Pemanggilan data melalui helper `lib/payload.ts` yang secara transparan mengalirkan data dari PostgreSQL via Local API `getPayload()`, dengan fallback aman ke data seam jika koleksi basis data masih kosong.

---

*Dokumen ini telah diperbarui per 8 September 2026 sebagai acuan resmi kelanjutan proyek Museum Virtual Majapahitan.*
