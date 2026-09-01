# Museum Virtual Majapahitan — Roadmap & Technical Handover Spec

Dokumen spesifikasi teknis dan panduan serah-terima (*handover specification*) untuk agen AI atau pengembang berikutnya yang melanjutkan pengembangan website **Museum Virtual Majapahitan** (PUISBM – Universitas Negeri Surabaya).

---

## 📌 1. Ringkasan Proyek & Tech Stack

- **Lokasi Workspace**: `C:\Users\Lenovo LOQ\Code\sbm-majapahitan`
- **Dokumentasi & Brainstorming**: `C:\Users\Lenovo LOQ\Code\brainstorming-sbm`
- **Framework Frontend**: Next.js 16.2 (App Router, Turbopack) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS v4 (`@theme` tokens di `app/globals.css`, panduan di `docs/UI_GUIDE.md`)
- **Icons**: Lucide React + Custom Brand SVG (`components/ui/BrandIcons.tsx`)
- **Target CMS**: Payload CMS 3+ (self-hosted, terintegrasi langsung di dalam Next.js, database PostgreSQL, media Cloudflare R2 — sesuai `brainstorming-sbm/docs/adr/0001-payload-cms-over-headless-wordpress.md`)
- **Bahasa Copywriting**: Bahasa Indonesia baku, formal, dan berorientasi edukasi/kebudayaan.

---

## ✅ 2. Checkpoint Saat Ini (Yang Sudah Selesai)

| Fitur / Halaman | Status | Lokasi File | Catatan |
|---|---|---|---|
| **Landing Page** (`/`) | Selesai | `app/page.tsx` | Hero slider, Akses Cepat, Pameran, Koleksi, Tentang preview, Berita, Partisipasi, Berlangganan |
| **Tentang Museum** (`/tentang`) | Selesai | `app/tentang/page.tsx` | Hero, Visi & Misi (tanpa card, dead-center line, align-left), Sejarah, Tim Ahli (floating portraits), Mitra (clean logo cloud), Kontak & Google Maps resmi UNESA, Galeri |
| **Museum Konservasi Index** (`/konservasi`) | Selesai | `app/konservasi/page.tsx` | Hero banner, Pengantar misi (lebar optimal `max-w-2xl` align-left), Dua Pilar preservasi, Tahapan proses ilmiah (angka emas `01–04`, vertical dividers, tanpa card), CTA Kerjasama |
| **Situs & Arsitektur** (`/konservasi/situs`) | Selesai | `app/konservasi/situs/page.tsx` | Breadcrumb hero, katalog 6 situs Majapahit dengan lokasi & era, peta sebaran, seamless CTA ke Artefak |
| **Artefak & Benda Budaya** (`/konservasi/artefak`) | Selesai | `app/konservasi/artefak/page.tsx` | Breadcrumb hero, kategori filter pills, katalog 6 artefak dengan material & era, seamless CTA ke Situs |
| **Ruang Partisipasi Karya** (`/partisipasi/kirim-karya`) | Selesai | `app/partisipasi/kirim-karya/page.tsx`<br>`components/forms/KirimKaryaForm.tsx` | Layout Centered Focus, accordion panduan kuratorial (timeline terhubung dengan garis horizontal, tanpa card dalam card, tanpa ikon checklist), formulir kurasi interaktif dengan drag-drop preview & success state |
| **Navigasi Navbar** | Selesai | `components/layout/Navbar.tsx` | Dropdown 3-level flyout desktop (`group/sub`), drawer mobile berjenjang, `usePathname` active route |
| **Footer Informasi** | Selesai | `components/layout/Footer.tsx` | Detail alamat resmi Lab Anti Doping UNESA, tautan media sosial, navigasi legal & sitemap |
| **Data Mock Seam** | Selesai | `lib/content.ts` | Single source of truth untuk semua data statis sebelum Payload CMS aktif |
| **UI Design Guide** | Selesai | `docs/UI_GUIDE.md` | Panduan token warna, tipografi Cinzel + Plus Jakarta Sans, tombol, dan komponen UI |
| **Build Status** | Verified | — | Seluruh 7 rute ter-prerender statis sempurna (`npm run build` sukses tanpa error) |

---

## 🎯 3. Target Roadmap & Milestone Berikutnya

```
[FASE 1] Fondasi Desain & Landing Page               [✅ SELESAI]
   ├── Design System, Token Tailwind v4, ImageSlot
   └── Landing Page lengkap (/), Navbar & Footer

[FASE 2A] Halaman Statis & Formulir Unik             [✅ SELESAI]
   ├── /tentang (Visi-Misi, Tim Ahli, Mitra, Maps)
   ├── /konservasi (Index Museum Konservasi)
   ├── /konservasi/situs (Katalog Situs & Arsitektur)
   ├── /konservasi/artefak (Katalog Artefak & Benda Budaya)
   └── /partisipasi/kirim-karya (Form Pengiriman Karya Publik)
          │
          ▼
[FASE 2B] Template Reusable Listing & Detail          [⏳ BERIKUTNYA]
   ├── Template Warta & Artikel (PostListingTemplate & PostDetailTemplate)
   │     ├── /berita & /berita/[slug]
   │     ├── /publikasi & /publikasi/[slug]
   │     └── /program & /program/[slug]
   └── Template Galeri Visual (GalleryTemplate)
         ├── /galeri/publik (Showcase Karya Masyarakat Terkurasi)
         ├── /galeri/museum/otentik (Showcase Benda Bersejarah)
         └── /galeri/museum/kontemporer (Showcase Seni Kontemporer)
          │
          ▼
[FASE 3] Payload CMS 3+ Setup & Backend Database      [🎯 TARGET CMS]
   ├── Target 1: Instalasi Payload 3, adapter PostgreSQL, admin panel (/admin)
   ├── Target 2: Koleksi `Posts` & migrasi data listing/detail ke CMS
   ├── Target 3: Koleksi `KaryaMuseum` & workflow submission `KaryaPublik`
   └── Target 4: Integrasi Cloudflare R2 untuk penyimpanan aset media upload
```

---

## 📋 4. Spesifikasi Teknis Rinci Per Target

### 🎯 TARGET 1: Payload CMS 3+ Integration

#### 1.1 Kebutuhan Package
```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
npm install graphql # jika diperlukan oleh dependencies payload
```

#### 1.2 Konfigurasi Environment (`.env.local`)
```env
DATABASE_URI=postgresql://postgres:password@localhost:5432/majapahitan_db
PAYLOAD_SECRET=YOUR_SECRET_KEY_MIN_32_CHARS
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

#### 1.3 Struktur File Payload 3 di Next.js
- `payload.config.ts` di root `sbm-majapahitan/`
- `app/(payload)/admin/[[...segments]]/page.tsx`
- `app/(payload)/api/[...slug]/route.ts`
- Koleksi disimpan di folder `collections/` (e.g. `collections/Posts.ts`, `collections/Media.ts`, `collections/Users.ts`).

---

### 🎯 TARGET 2: Unified `Posts` Collection & Templates

Sesuai konsep di `CONTEXT.md`, jenis konten warta disatukan dalam satu entitas `Post`:

#### 2.1 Schema `collections/Posts.ts`
```typescript
import { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: () => true, // Publik bisa membaca post yang berstatus published
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Berita', value: 'berita' },
        { label: 'Publikasi & Penelitian', value: 'publikasi' },
        { label: 'Program & Kegiatan', value: 'program' },
      ],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: false },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'publishedAt', type: 'date', defaultValue: () => new Date().toISOString() },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
};
```

#### 2.2 Template Halaman Listing & Detail
Buat komponen template yang dapat dipakai ulang:
- **`components/templates/PostListingTemplate.tsx`**: Menampilkan hero/header kategori, filter tahun/kategori, grid kartu post (`PostCard`), dan pagination.
- **`components/templates/PostDetailTemplate.tsx`**: Menampilkan breadcrumb, judul (Cinzel), metadata tanggal/kategori, cover image, rich text body renderer, dan seksi "Berita/Artikel Terkait".

Routing yang menggunakan template ini:
- `app/berita/page.tsx` & `app/berita/[slug]/page.tsx`
- `app/publikasi/page.tsx` & `app/publikasi/[slug]/page.tsx`
- `app/program/page.tsx` & `app/program/[slug]/page.tsx`

---

### 🎯 TARGET 3: Galeri Karya & Submission Workflow

Sesuai arahan mentor dan hasil interview:

#### 3.1 Schema `collections/KaryaMuseum.ts` (Kurasi Internal PUI)
- `title` (text, required)
- `slug` (text, required, unique)
- `category` (select: `otentik` / `kontemporer`)
- `image` (upload relationTo: `media`, required)
- `description` (richText / textarea)
- `era` / `tahun` (text, e.g. "Abad ke-14 Masehi" / "2024")
- `dimensi` / `material` (text)
- `status` (draft / published)

#### 3.2 Schema `collections/KaryaPublik.ts` (Kontribusi Masyarakat)
- `contributorName` (text, required)
- `contributorEmail` (email, required)
- `contributorAffiliation` (text, e.g. "Mahasiswa / Umum")
- `title` (text, required)
- `description` (textarea, required)
- `image` (upload relationTo: `media`, required)
- `status` (select: `pending` [default saat submit], `approved`, `published`, `rejected`)
- `moderationNotes` (textarea, catatan internal reviewer)

#### 3.3 Halaman & Alur Partisipasi Publik (`/partisipasi/kirim-karya`)
1. Pengunjung mengisi form: Nama, Email, Institusi, Judul Karya, Deskripsi, Unggah Foto Karya.
2. Form mengirim data ke Next.js Server Action / API Route yang memanggil Payload Local API untuk membuat dokumen di `KaryaPublik` dengan `status: 'pending'`.
3. Notifikasi sukses muncul: *"Karya Anda berhasil dikirim dan sedang dalam proses kurasi oleh tim kurator PUI Seni Budaya Majapahitan."*
4. Content Maintainer membuka `/admin` -> `KaryaPublik` -> meninjau karya -> mengubah status ke `published`.
5. Halaman `/galeri/publik` otomatis menampilkan karya yang berstatus `published`.

---

## 🛠️ 5. Checklist Instruksi untuk Agen / Developer Pengembang

1. **Persiapan Database**:
   - Pastikan database PostgreSQL aktif atau buat connection string di `.env.local`.
2. **Inisialisasi Payload 3**:
   - Install dependencies.
   - Buat `payload.config.ts`.
   - Setup folder `app/(payload)`.
   - Verifikasi akses ke `http://localhost:3000/admin`.
3. **Migrasi Data**:
   - Pindahkan data mock dari `lib/content.ts` ke Payload database via seeder script atau admin panel.
   - Update server components untuk mengambil data langsung dari Payload Local API (`getPayload({ config })`).
4. **Verifikasi Build**:
   - Selalu jalankan `npm run build` sebelum menyelesaikan tugas untuk memastikan kompatibilitas TypeScript dan Turbopack.

---
*Dokumen ini dibuat otomatis sebagai checkpoint handover resmi proyek Museum Virtual Majapahitan.*
