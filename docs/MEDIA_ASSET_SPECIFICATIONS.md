# Panduan Spesifikasi Resolusi Media & Aset Visual
### Museum Virtual Majapahitan (PUI Seni Budaya Majapahitan — UNESA)

Dokumen ini memetakan seluruh penempatan media/gambar pada antarmuka frontend situs (*desktop*, *tablet*, dan *mobile*), rasio aspek kontainer CSS, rekomendasi resolusi unggahan optimal (mempertimbangkan layar Retina/HiDPI 2x), format berkas, serta batas ukuran berkas maksimum.

---

## 1. Tabel Ringkasan Cepat (Cheat Sheet)

| Kategori Aset | Rasio Aspek | Resolusi Optimal (Px) | Format Utama | Batas Maks. | Contoh Penempatan |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Hero Carousel Utama** | 16:9 / 21:9 | **1920 × 1080** | WebP / AVIF | 400 KB | Beranda Slider (`Hero.tsx`) |
| **Hero Banner Halaman** | ~21:9 Ultra-wide | **1920 × 800** | WebP / JPG | 300 KB | Header Berita, Galeri, Konservasi |
| **Kartu Karya & Koleksi** | 4:3 | **1200 × 900** | WebP / JPG | 250 KB | Galeri Publik, Museum, Artefak, Situs |
| **Lightbox / Modal Karya** | Fleksibel / Bebas | **1600 × 1200** (s/d 2048px) | WebP / PNG | 800 KB | Detail Zoom Karya Publik (`ArtworkLightbox.tsx`) |
| **Cover Detail Artikel/Berita** | 16:9 | **1600 × 900** | WebP / JPG | 350 KB | Halaman Baca Berita (`[slug]/page.tsx`) |
| **Cover Program & Agenda** | 16:10 / 16:9 | **1600 × 1000** | WebP / JPG | 300 KB | Featured Program & Detail Agenda |
| **Pilar Konservasi** | 2:1 Panorama | **1200 × 600** | WebP / JPG | 250 KB | Kartu Situs & Artefak (`/konservasi`) |
| **Highlight Koleksi Beranda** | 4:5 Vertikal | **800 × 1000** | WebP / JPG | 200 KB | Grid Koleksi Unggulan Beranda |
| **Thumbnail List Berita** | 16:10 / 3:2 | **400 × 250** | WebP / JPG | 100 KB | Baris List Berita Ringkas |
| **Foto Profil Tim Ahli** | 4:5 Pasfoto | **400 × 500** | WebP / JPG | 120 KB | Anggota Tim & Kurator (`/tentang`) |
| **Logo Mitra & Institusi** | 1:1 Persegi | **400 × 400** | SVG / PNG Transparan | 80 KB | Logo Kerja Sama (`Footer` & `/tentang`) |
| **Favicon / Logo Navbar** | 1:1 Persegi | **200 × 200** | SVG / PNG Transparan | 50 KB | Sudut Kiri Atas Navbar |

---

## 2. Rincian Spesifikasi per Modul Antarmuka

### A. Beranda (Landing Page `/`)

#### 1. Slider Hero Utama (`components/sections/Hero.tsx`)
- **Fungsi**: Banner visual sinematik pembuka situs.
- **Kontainer CSS**: `relative h-[520px] sm:h-[620px] lg:h-[720px] w-full` dengan `object-cover`.
- **Rasio Aspek**: 16:9 (Desktop) s/d 21:9 (Ultrawide).
- **Resolusi Unggahan Optimal**: **1920 × 1080 px** (Minimal: 1440 × 810 px).
- **Format Rekomendasi**: WebP (Quality 85), JPG.
- **Catatan**: Objek visual utama (fokus) wajib berada di tengah atau 60% sisi kanan agar tidak tertutup teks *headline* di sisi kiri.

#### 2. Sorotan Koleksi Unggulan (`components/sections/KoleksiHighlight.tsx`)
- **Fungsi**: Kartu *showcase* arca, prasasti, dan naskah kuno beranda.
- **Kontainer CSS**: Kartu pertama `aspect-[4/3] sm:aspect-[4/5]`, kartu lainnya `aspect-[4/5]`.
- **Rasio Aspek**: 4:5 (Vertikal Portrait).
- **Resolusi Unggahan Optimal**: **800 × 1000 px**.
- **Format Rekomendasi**: WebP / JPG (Maks. 250 KB).

#### 3. Cuplikan Pameran & Program (`components/sections/PameranProgramClient.tsx`)
- **Fungsi**: Kartu geser horizontal (*carousel*) kegiatan pameran di beranda.
- **Kontainer CSS**: `h-40 w-[270px] sm:w-[275px]` dengan `object-cover`.
- **Rasio Aspek**: ~16:9.
- **Resolusi Unggahan Optimal**: **800 × 480 px**.

#### 4. Pengantar Tentang Museum Beranda (`components/sections/TentangMuseum.tsx`)
- **Fungsi**: Foto arca/artefak pendamping narasi pengantar museum.
- **Kontainer CSS**: `h-56 md:min-h-[320px] w-full rounded-xl`.
- **Rasio Aspek**: 4:3 atau 5:4.
- **Resolusi Unggahan Optimal**: **1000 × 800 px**.

---

### B. Galeri Seni & Partisipasi Publik (`/galeri`, `/galeri/museum`, `/galeri/publik`)

#### 1. Gerbang Hub Galeri (`components/templates/GalleryHubTemplate.tsx`)
- **Fungsi**: 3 pintu masuk galeri (Koleksi Otentik, Kontemporer, Galeri Publik).
- **Kontainer CSS**: `aspect-[3/2] overflow-hidden rounded-md ring-1`.
- **Rasio Aspek**: 3:2.
- **Resolusi Unggahan Optimal**: **1200 × 800 px**.

#### 2. Kartu Karya Grid Galeri (`components/gallery/ArtworkCard.tsx`)
- **Fungsi**: Item lukisan, model 3D, foto budaya di grid galeri.
- **Kontainer CSS**: `aspect-[4/3] overflow-hidden rounded-md`.
- **Rasio Aspek**: 4:3.
- **Resolusi Unggahan Optimal**: **1200 × 900 px**.
- **Catatan**: Format unggahan kontributor publik otomatis disesuaikan dengan kontainer *crop* 4:3 seragam.

#### 3. Tampilan Lightbox / Modal Zoom Karya (`components/gallery/ArtworkLightbox.tsx`)
- **Fungsi**: Tampilan pembesaran resolusi tinggi saat karya diklik pengunjung.
- **Kontainer CSS**: `h-[280px] sm:h-[400px] lg:h-[500px] w-full flex items-center justify-center`.
- **Rasio Aspek**: Bebas / Original (menggunakan *contain* atau *cover* di dalam bingkai).
- **Resolusi Unggahan Optimal**: **1600 × 1200 px** hingga **2048 × 1536 px**.
- **Batas Ukuran**: Maksimal 5 MB saat pengiriman melalui `/partisipasi/kirim-karya`.

---

### C. Warisan & Konservasi (`/konservasi`, `/konservasi/situs`, `/konservasi/artefak`)

#### 1. Kartu Pilar Konservasi (`app/(website)/konservasi/page.tsx`)
- **Fungsi**: 2 kartu pembagi (Pilar Situs Candi & Pilar Artefak).
- **Kontainer CSS**: `aspect-[2/1] overflow-hidden rounded-md`.
- **Rasio Aspek**: 2:1 (Landscape Panorama).
- **Resolusi Unggahan Optimal**: **1200 × 600 px**.

#### 2. Katalog Situs & Candi Majapahit (`app/(website)/konservasi/situs/page.tsx`)
- **Fungsi**: Kartu foto dokumentasi situs (Candi Brahu, Bajang Ratu, Kolam Segaran).
- **Kontainer CSS**: `aspect-[4/3] overflow-hidden rounded-md`.
- **Rasio Aspek**: 4:3.
- **Resolusi Unggahan Optimal**: **1200 × 900 px**.

#### 3. Katalog Artefak & Benda Pusaka (`components/konservasi/ArtefakCatalog.tsx`)
- **Fungsi**: Foto artefak (Prasasti, Terakota, Surya Majapahit, Koin Gobog).
- **Kontainer CSS**: `aspect-[4/3] overflow-hidden rounded-md`.
- **Rasio Aspek**: 4:3.
- **Resolusi Unggahan Optimal**: **1200 × 900 px**.
- **Tip Visual**: Latar belakang foto artefak sebaiknya memiliki pencahayaan studio netral (*dark slate* atau krem hangat).

---

### D. Warta & Publikasi Riset (`/berita`, `/publikasi`)

#### 1. Berita Utama / Pilihan (`components/templates/BeritaListingTemplate.tsx`, `components/posts/FeaturedPostHero.tsx`)
- **Fungsi**: Sorotan warta utama di bagian atas halaman berita.
- **Kontainer CSS**: `aspect-[16/10] overflow-hidden rounded-md` (Desktop ~60% lebar layar).
- **Rasio Aspek**: 16:10.
- **Resolusi Unggahan Optimal**: **1600 × 1000 px**.

#### 2. Cover Banner Detail Berita (`components/templates/BeritaDetailTemplate.tsx`)
- **Fungsi**: Foto tajuk artikel berita lengkap.
- **Kontainer CSS**: `h-72 sm:h-96 lg:h-[460px] w-full rounded-xl`.
- **Rasio Aspek**: 16:9.
- **Resolusi Unggahan Optimal**: **1920 × 1080 px**.

#### 3. Thumbnail Baris Berita (`components/berita/BeritaCard.tsx`, `components/sections/BeritaTerbaru.tsx`)
- **Fungsi**: Gambar kecil pendamping judul artikel pada daftar berita.
- **Kontainer CSS**: `h-20 w-32` (128 × 80 px) atau `h-16 w-24` (96 × 64 px).
- **Rasio Aspek**: 16:10 atau 3:2.
- **Resolusi Unggahan Optimal**: **400 × 250 px**.

#### 4. Sampul Publikasi & Laporan Riset (`components/posts/PostCard.tsx`, `components/templates/PublicationListingTemplate.tsx`)
- **Fungsi**: Sampul visual monograf riset, jurnal arkeologi, dan e-book.
- **Kontainer CSS**: `h-52 sm:h-56 w-full`.
- **Rasio Aspek**: 16:9 horizontal atau cover buku vertikal 3:4.
- **Resolusi Unggahan Optimal**: **1000 × 600 px** (atau **600 × 800 px** untuk sampul buku).

---

### E. Program & Agenda Museum (`/program`)

#### 1. Featured Program Card (`components/programs/FeaturedProgramHero.tsx`)
- **Fungsi**: Banner agenda workshop/webinar utama.
- **Kontainer CSS**: `aspect-[16/10] overflow-hidden rounded-md`.
- **Rasio Aspek**: 16:10.
- **Resolusi Unggahan Optimal**: **1600 × 1000 px**.

#### 2. Kartu Grid Program (`components/programs/ProgramCard.tsx`)
- **Fungsi**: Poster acara reguler museum.
- **Kontainer CSS**: `aspect-[4/3] overflow-hidden rounded-md`.
- **Rasio Aspek**: 4:3.
- **Resolusi Unggahan Optimal**: **1200 × 900 px**.

#### 3. Banner Detail Agenda (`components/templates/ProgramDetailTemplate.tsx`)
- **Fungsi**: Header detail deskripsi program dan pendaftaran.
- **Kontainer CSS**: `aspect-[16/9] w-full rounded-md`.
- **Rasio Aspek**: 16:9.
- **Resolusi Unggahan Optimal**: **1920 × 1080 px**.

---

### F. Identitas, Tim & Kemitraan (`/tentang`, Header, Footer)

#### 1. Logo Brand Navbar (`components/layout/Navbar.tsx`)
- **Fungsi**: Lambang Surya Majapahit / identitas museum di navigasi atas.
- **Kontainer CSS**: `h-11 w-11` (44 × 44 px).
- **Rasio Aspek**: 1:1 Persegi.
- **Resolusi Unggahan Optimal**: **200 × 200 px** (Format: SVG atau PNG transparan).

#### 2. Foto Tim Ahli & Kurator (`app/(website)/tentang/page.tsx`)
- **Fungsi**: Pasfoto ketua, kurator, dan peneliti kebudayaan.
- **Kontainer CSS**: `h-20 w-16 sm:h-24 sm:w-20` (Rasio 4:5).
- **Rasio Aspek**: 4:5 Pasfoto tegak.
- **Resolusi Unggahan Optimal**: **400 × 500 px**.

#### 3. Logo Mitra & Institusi (`components/layout/Footer.tsx`, `/tentang`)
- **Fungsi**: Logo UNESA, Kemendikbudristek, BPCB Jatim, dsb.
- **Kontainer CSS**: `h-24 w-24` (`/tentang`) atau `max-w-[220px]` grid 2-kolom (`Footer`).
- **Rasio Aspek**: 1:1 Persegi / Kanvas Transparan.
- **Resolusi Unggahan Optimal**: **400 × 400 px** (Format: SVG atau PNG transparan monokrom/warna).

---

## 3. Rekomendasi Format & Kompresi Berkas

1. **Format Web Modern**:
   - Selalu prioritaskan format **WebP** untuk foto fotografi, relief candi, dan karya seni karena menghasilkan ukuran 30–40% lebih kecil dibanding JPEG tanpa penurunan kualitas visual.
   - Gunakan format **SVG** atau **PNG 32-bit (transparan)** untuk logo institusi, ikon, dan stempel lambang Majapahit.
2. **Kerapatan Piksel (2x HiDPI Rule)**:
   - Resolusi optimal di atas sudah menghitung faktor pengali 2x (*Retina Display*) sehingga teks dan detail ukiran tidak akan buram pada layar MacBook, iPhone, maupun monitor 4K.
3. **Kompresi Target**:
   - Foto Lanskap / Hero: **250 KB – 400 KB**.
   - Foto Kartu / Katalog: **100 KB – 200 KB**.
   - Logo / Ikon: **< 50 KB**.
