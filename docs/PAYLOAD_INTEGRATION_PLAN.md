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
| **Posts** | `posts` | Artikel warta, riset, dan kegiatan | Untuk `/berita`, `/publikasi`, `/program` — *field minimal & fleksibel* |
| **Situs** | `situs` | Data situs arkeologi & arsitektur | Untuk `/konservasi/situs` |
| **Artefak** | `artefak` | Data benda budaya & naskah | Untuk `/konservasi/artefak` |
| **Karya Masuk** | `karya-publik` | Submisi karya dari masyarakat | Menampung hasil form `/partisipasi/kirim-karya` |
| **Pages** | `pages` | Halaman dinamis baru (Page Builder) | Catch-all route `app/(website)/[...slug]` |
| **Users** | `users` | Akun tim pengelola & kurator | ✅ Sudah terpasang |
| **Media** | `media` | Manajemen upload gambar & dokumen | ✅ Sudah terpasang |

---

## 🔌 2. Wiring: Halaman Frontend ↔ Payload CMS

| Halaman Frontend | Sumber Data di Payload | Metode Pemanggilan |
|---|---|---|
| **Navbar & Footer** | `Global: navigation` & `site-settings` | Local API + Cache Agresif |
| **`/`** (Beranda) | `Global: page-beranda` | `payload.findGlobal({ slug: 'page-beranda' })` |
| **`/tentang`** | `Global: page-tentang` | `payload.findGlobal({ slug: 'page-tentang' })` |
| **`/konservasi`** | `Global: page-konservasi` | `payload.findGlobal({ slug: 'page-konservasi' })` |
| **`/konservasi/situs`** | `Collection: situs` | `payload.find({ collection: 'situs' })` |
| **`/konservasi/artefak`** | `Collection: artefak` | `payload.find({ collection: 'artefak' })` |
| **`/berita`** (Listing) | `Collection: posts` | `payload.find({ collection: 'posts', where: { category: 'berita' } })` |
| **`/berita/[slug]`** (Detail) | `Collection: posts` | `payload.find({ collection: 'posts', where: { slug } })` |
| **`/partisipasi/kirim-karya`** | `Collection: karya-publik` | `payload.create({ collection: 'karya-publik', data })` |
| **`/[...slug]`** (Halaman Baru) | `Collection: pages` | `payload.find({ collection: 'pages', where: { slug } })` |

---

## 🗺️ 3. Rencana Eksekusi Bertahap

```
FASE 3A — Scaffolding (Bangun Kerangka)                    [LANGKAH 1]
───────────────────────────────────────────────────────────
  1. Buat file schema untuk setiap Collection & Global
     → Field-nya MINIMAL & clean (nama, slug, basic content)
     → Siap di-expand kapan saja tanpa perlu migrasi besar
  2. Daftarkan semua schema ke payload.config.ts
     → Pengelompokan rapi di sidebar admin (admin.group)
  3. Verifikasi build & generate types TypeScript (payload-types.ts)
  
  HASIL:
  → Dashboard Payload langsung terisi menu lengkap dan rapi.
  → Maintainer bisa melihat semua ruangan rumah yang siap diisi.
───────────────────────────────────────────────────────────

FASE 3B — Wiring (Koneksi ke Halaman)                     [LANGKAH 2]
───────────────────────────────────────────────────────────
  1. Buat helper getPayload() & cached fetchers di lib/payload.ts
  2. Sambungkan halaman statis (Tentang, Konservasi, Beranda) ke Globals
  3. Sambungkan katalog Situs & Artefak ke Collections
  4. Bangun template reusable untuk Posts (/berita, /publikasi, /program)
  5. Sambungkan form /partisipasi/kirim-karya ke Collection Karya Masuk
  6. Pensiunkan lib/content.ts
───────────────────────────────────────────────────────────

FASE 3C — Page Builder (Fleksibilitas Halaman Baru)       [LANGKAH 3]
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
