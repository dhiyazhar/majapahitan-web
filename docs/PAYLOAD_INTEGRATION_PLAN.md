# Payload CMS Integration — Lean Plan & Architecture Spec

> **Prinsip Utama:** Bangun rumahnya (infrastruktur, koneksi, routing). Jangan isi perabotnya dulu (detail field, enum, konten spesifik). Struktur konten bisa berubah — dan Payload memang dirancang untuk fleksibilitas tersebut.

---

## 🏛️ 1. Peta Kerangka Data (The House Structure)

### A. GLOBALS (Dokumen Tunggal — Untuk Halaman Statis & Pengaturan)

| Global | Slug | Fungsi | Catatan |
|---|---|---|---|
| **Navigasi** | `navigation` | Struktur menu navbar & link footer | Array of links, bisa bertingkat |
| **Pengaturan Situs** | `site-settings` | Kontak, Google Maps, sosmed, legal | Info organisasi & footer |
| **Halaman Beranda** | `page-beranda` | Konten landing page `/` | Hero slides, preview pameran & koleksi |
| **Halaman Tentang** | `page-tentang` | Konten `/tentang` | Visi, misi, sejarah, tim ahli, mitra |
| **Halaman Konservasi** | `page-konservasi` | Konten `/konservasi` | Teks pengantar, 2 pilar, 4 tahapan proses |

---

### B. COLLECTIONS (Data Jamak / Berulang)

| Collection | Slug | Fungsi | Catatan |
|---|---|---|---|
| **Berita** | `berita` | Warta, liputan, dan kabar kebudayaan | Menggantikan monolithic `posts` |
| **Publikasi** | `publikasi` | Jurnal ilmiah, kajian, dan arsip naskah | Dilengkapi DOI, SINTA, sitasi otomatis APA 7 |
| **Programs** | `programs` | Agenda pameran, workshop, seminar | Dilengkapi `eventDate`, `location`, `ctaLabel`, `ctaUrl` |
| **Situs** | `situs` | Data situs arkeologi & arsitektur | Untuk `/konservasi/situs` |
| **Artefak** | `artefak` | Data benda budaya & naskah | Untuk `/konservasi/artefak` |
| **Karya Masuk** | `karya-publik` | Submisi karya dari masyarakat | Menampung hasil form `/partisipasi/kirim-karya` |
| **Pages** | `pages` | Halaman dinamis baru (Page Builder) | Catch-all route `app/(website)/[...slug]` |
| **Users** | `users` | Akun tim pengelola & kurator | ✅ First user auto-admin |
| **Media** | `media` | Manajemen upload gambar & dokumen | ✅ Terpasang & terintegrasi |

---

## 🔌 2. Wiring: Halaman Frontend ↔ Payload CMS

| Halaman Frontend | Sumber Data di Payload | Metode Pemanggilan | Status |
|---|---|---|---|
| **Navbar & Footer** | `Global: navigation` & `site-settings` | Local API + Cache Agresif | Terencana |
| **`/`** (Beranda) | `Global: page-beranda` + `programs` & `berita` | `getProgramPosts()` & `getBeritaPosts()` via Local API | ✅ Terpasang |
| **`/tentang`** | `Global: page-tentang` | `payload.findGlobal({ slug: 'page-tentang' })` | Terencana |
| **`/konservasi`** | `Global: page-konservasi` | `payload.findGlobal({ slug: 'page-konservasi' })` | Terencana |
| **`/konservasi/situs`** | `Collection: situs` | `payload.find({ collection: 'situs' })` | Dalam proses |
| **`/konservasi/artefak`** | `Collection: artefak` | `payload.find({ collection: 'artefak' })` | Dalam proses |
| **`/berita`** (Listing) | `Collection: berita` | `getBeritaPosts()` di `lib/payload.ts` | ✅ Terpasang |
| **`/berita/[slug]`** (Detail) | `Collection: berita` | `getBeritaBySlug(slug)` di `lib/payload.ts` | ✅ Terpasang |
| **`/publikasi`** (Listing) | `Collection: publikasi` | `getPublicationPosts()` di `lib/payload.ts` | ✅ Terpasang |
| **`/publikasi/[slug]`** (Detail) | `Collection: publikasi` | `getPublicationBySlug(slug)` di `lib/payload.ts` | ✅ Terpasang |
| **`/program`** (Listing) | `Collection: programs` | `getProgramPosts()` di `lib/payload.ts` | ✅ Terpasang |
| **`/program/[slug]`** (Detail) | `Collection: programs` | `getProgramBySlug(slug)` di `lib/payload.ts` | ✅ Terpasang |
| **`/partisipasi/kirim-karya`** | `Collection: karya-publik` | `payload.create({ collection: 'karya-publik', data })` | Terencana |
| **`/[...slug]`** (Halaman Baru) | `Collection: pages` | `payload.find({ collection: 'pages', where: { slug } })` | Terencana |

---

## 🗺️ 3. Rencana Eksekusi Bertahap

```
FASE 3A — Scaffolding (Bangun Kerangka)                    [✅ SELESAI]
───────────────────────────────────────────────────────────
  1. Buat file schema untuk setiap Collection & Global
     → Pemisahan tuntas: Berita, Publikasi, dan Programs mandiri
  2. Daftarkan semua schema ke payload.config.ts
     → Pengelompokan rapi di sidebar admin (admin.group)
  3. Autentikasi Pengguna Pertama otomatis Admin (Users.ts)
  4. Verifikasi build & generate types TypeScript (payload-types.ts)
───────────────────────────────────────────────────────────

FASE 3B — Wiring (Koneksi ke Halaman)                     [⚡ SEBAGIAN BESAR SELESAI]
───────────────────────────────────────────────────────────
  1. Helper getPayload() & cached fetchers di lib/payload.ts [✅ SELESAI]
  2. Dekomposisi template: Berita, Publikasi, Program       [✅ SELESAI]
  3. Sambungkan halaman statis (Tentang, Konservasi) ke Globals [⏳ TAHAP SEKARANG]
  4. Sambungkan katalog Situs & Artefak ke Collections        [⏳ TAHAP SEKARANG]
  5. Sambungkan form /partisipasi/kirim-karya ke Collection Karya Masuk
  6. Pensiunkan sepenuhnya data seam statis
───────────────────────────────────────────────────────────

FASE 3C — Page Builder (Fleksibilitas Halaman Baru)       [LANGKAH BERIKUTNYA]
───────────────────────────────────────────────────────────
  1. Siapkan block types dasar di Collection Pages (Hero, RichText, Image, CTA)
  2. Buat catch-all route app/(website)/[...slug]/page.tsx
  3. Maintainer bisa buat halaman baru (misal: /faq, /kerjasama) langsung dari CMS
───────────────────────────────────────────────────────────
```

---

## 🚫 4. Hal yang Sengaja TIDAK Dikerjakan Sekarang (Menghindari Over-Engineering)

1. **Detail Enum Kategori Berita/Blog**: Dibiarkan sebagai text/select terbuka agar tidak kaku jika klasifikasi artikel berubah.
2. **Kustomisasi UI Text ke Database**: Teks label tombol tetap dipertahankan di file kode / kamus i18n karena jarang berubah.
3. **Workflow Persetujuan Kompleks**: Status dibuat sederhana (`draft` / `published`, dan `pending` / `approved` untuk karya masuk).
4. **Cloud Storage Eksternal (R2)**: Menggunakan penyimpanan lokal bawaan Payload terlebih dahulu sampai siap *deployment* produksi.
