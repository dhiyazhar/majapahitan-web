import { createRequire } from 'node:module'
import { getPayload } from 'payload'

const require = createRequire(import.meta.url)
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

const { default: configPromise } = await import('../payload.config')

const formatSlug = (v: string): string =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

type LexicalNode = Record<string, unknown>

const textNode = (text: string): LexicalNode => ({
  type: 'text',
  text,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = (type: string, children: LexicalNode[]): LexicalNode => ({
  type,
  format: '',
  indent: 0,
  direction: 'ltr',
  version: 1,
  children,
})

const paragraph = (text: string): LexicalNode => block('paragraph', [textNode(text)])
const heading = (text: string): LexicalNode => ({ ...block('heading', [textNode(text)]), tag: 'h2' })

type ProgramSeed = {
  title: string
  excerpt: string
  programType: string
  eventDate: string
  eventEndDate?: string
  location: string
  registrationUrl?: string
  publishedAt: string
  lead: string
  paragraphs: string[]
  subheading?: string
  extra?: string[]
}

function toLexical(p: ProgramSeed) {
  const children: LexicalNode[] = [paragraph(p.lead)]
  for (const t of p.paragraphs) children.push(paragraph(t))
  if (p.subheading) children.push(heading(p.subheading))
  for (const t of p.extra ?? []) children.push(paragraph(t))
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } }
}

const programs: ProgramSeed[] = [
  {
    title: 'Tur Virtual Rekonstruksi Candi Bajang Ratu',
    excerpt:
      'Jelajahi rekonstruksi digital gapura paduraksa Candi Bajang Ratu beserta narasi sejarah dan detail reliefnya.',
    programType: 'Pameran Virtual',
    eventDate: '2026-11-20T09:00:00+07:00',
    eventEndDate: '2027-01-20T23:59:00+07:00',
    location: 'Museum Virtual (Daring)',
    publishedAt: '2026-11-01T08:00:00.000Z',
    lead:
      'Museum Virtual Majapahitan menghadirkan tur virtual rekonstruksi Candi Bajang Ratu yang memungkinkan pengunjung menjelajahi gapura paduraksa secara tiga dimensi.',
    paragraphs: [
      'Setiap titik pandang dilengkapi anotasi yang menjelaskan fungsi arsitektur, ragam hias, dan keterkaitan bangunan dengan sejarah penobatan penguasa Majapahit.',
      'Tur dapat diakses langsung melalui peramban, baik dari komputer maupun perangkat seluler, tanpa memerlukan perangkat khusus.',
    ],
    subheading: 'Panduan Jelajah',
    extra: ['Pengunjung disarankan menelusuri urutan titik pandang dari gerbang masuk hingga bagian atap untuk memahami alur narasi rekonstruksi.'],
  },
  {
    title: 'Workshop Fotografi Dokumentasi Cagar Budaya',
    excerpt:
      'Pelatihan teknik fotografi standar untuk mendokumentasikan situs dan artefak cagar budaya secara tepat dan konsisten.',
    programType: 'Workshop & Pelatihan',
    eventDate: '2026-11-28T08:30:00+07:00',
    eventEndDate: '2026-11-28T15:00:00+07:00',
    location: 'Auditorium FBS UNESA, Surabaya',
    registrationUrl: 'https://forms.gle/contoh-pendaftaran',
    publishedAt: '2026-10-25T08:00:00.000Z',
    lead:
      'Workshop ini membekali peserta dengan teknik fotografi dokumentasi yang sesuai standar pelestarian cagar budaya, dari pencahayaan hingga pencatatan metadata.',
    paragraphs: [
      'Peserta akan mempraktikkan pengambilan gambar objek berukuran kecil hingga struktur bangunan, dengan pendampingan langsung dari tim dokumentasi PUISBM.',
      'Hasil dokumentasi terbaik akan menjadi bagian dari arsip visual Museum Virtual Majapahitan.',
    ],
    subheading: 'Peserta dan Sarana',
    extra: ['Kegiatan terbuka bagi pengelola museum, mahasiswa, dan komunitas pelestari. Peserta diminta membawa kamera atau ponsel dengan resolusi memadai.'],
  },
  {
    title: 'Kelas Online Sejarah Majapahit untuk Guru Sejarah',
    excerpt:
      'Kelas daring bagi guru untuk memperkaya bahan ajar sejarah Majapahit dengan sumber dan media digital terkini.',
    programType: 'Program Edukasi',
    eventDate: '2026-12-05T09:00:00+07:00',
    eventEndDate: '2026-12-05T12:00:00+07:00',
    location: 'Daring (Zoom)',
    registrationUrl: 'https://forms.gle/contoh-pendaftaran',
    publishedAt: '2026-10-28T08:00:00.000Z',
    lead:
      'Kelas online ini dirancang untuk guru sejarah agar dapat memanfaatkan sumber digital dan rekonstruksi virtual dalam pembelajaran sejarah Majapahit.',
    paragraphs: [
      'Materi mencakup pengenalan sumber primer, pemanfaatan peta interaktif, dan cara memandu siswa menelusuri koleksi Museum Virtual Majapahit.',
      'Peserta memperoleh modul pembelajaran yang dapat langsung digunakan di kelas.',
    ],
  },
  {
    title: 'Gelar Karya Tari Panji Warisan Majapahit',
    excerpt:
      'Pertunjukan tari berbasis cerita Panji yang direkonstruksi dari relief dan tradisi lisan warisan Majapahit.',
    programType: 'Pertunjukan Budaya',
    eventDate: '2026-12-18T19:00:00+07:00',
    eventEndDate: '2026-12-18T21:30:00+07:00',
    location: 'Gedung Kesenian Surabaya',
    publishedAt: '2026-11-05T08:00:00.000Z',
    lead:
      'Laboratorium Seni Pertunjukan UNESA bersama sanggar tari menghadirkan gelar karya yang merekonstruksi gerak tari Panji dari warisan Majapahit.',
    paragraphs: [
      'Pementasan menggabungkan gerak klasik dengan iringan gamelan yang disusun berdasarkan kajian relief pemusik pada candi di Jawa Timur.',
      'Gelar ini menjadi ruang apresiasi sekaligus dokumentasi hidup atas kesenian yang berakar pada tradisi Majapahit.',
    ],
    subheading: 'Tiket dan Akses',
    extra: ['Acara terbuka untuk umum dengan kapasitas terbatas. Dokumentasi video akan diunggah pada portal Museum Virtual untuk penonton yang tidak dapat hadir.'],
  },
  {
    title: 'Simposium Nasional Arkeologi Digital Nusantara',
    excerpt:
      'Forum ilmiah yang menghimpun peneliti arkeologi dan warisan digital untuk berbagi metode dokumentasi dan kajian terkini.',
    programType: 'Seminar & Simposium',
    eventDate: '2027-01-22T08:00:00+07:00',
    eventEndDate: '2027-01-23T16:00:00+07:00',
    location: 'Aula Rektorat UNESA, Surabaya',
    registrationUrl: 'https://forms.gle/contoh-pendaftaran',
    publishedAt: '2026-11-06T08:00:00.000Z',
    lead:
      'Simposium nasional ini menghadirkan peneliti arkeologi dan warisan digital untuk membahas metode dokumentasi, pemodelan, serta publikasi situs Nusantara.',
    paragraphs: [
      'Sesi paralel mencakup fotogrametri, pemodelan tiga dimensi, hingga kajian arsitektur bata merah peninggalan kerajaan klasik.',
      'Makalah terpilih akan direkomendasikan untuk publikasi pada repositori penelitian terbuka museum.',
    ],
  },
  {
    title: 'Pameran Ilustrasi Digital Surya Majapahit',
    excerpt:
      'Kurasi ilustrasi digital bertema lambang Surya Majapahit karya seniman dan mahasiswa desain.',
    programType: 'Pameran Karya',
    eventDate: '2027-02-01T00:00:00+07:00',
    eventEndDate: '2027-03-01T00:00:00+07:00',
    location: 'Galeri Utama Museum Virtual',
    publishedAt: '2026-11-07T08:00:00.000Z',
    lead:
      'Pameran ini menampilkan karya ilustrasi digital yang menggali makna lambang Surya Majapahit dalam bahasa visual kontemporer.',
    paragraphs: [
      'Karya yang ditampilkan merupakan hasil kurasi dari kiriman seniman dan mahasiswa desain komunikasi visual.',
      'Setiap karya disertai catatan kuratorial yang menjelaskan interpretasi simbol dalam konteks budaya masa kini.',
    ],
  },
  {
    title: 'Pelatihan Pemodelan 3D Sederhana untuk Kurator Muda',
    excerpt:
      'Pelatihan praktis membuat model tiga dimensi sederhana dari artefak untuk kebutuhan digitalisasi museum.',
    programType: 'Workshop & Pelatihan',
    eventDate: '2026-12-12T08:30:00+07:00',
    eventEndDate: '2026-12-13T15:00:00+07:00',
    location: 'Aula PUI Seni Budaya UNESA',
    registrationUrl: 'https://forms.gle/contoh-pendaftaran',
    publishedAt: '2026-11-02T08:00:00.000Z',
    lead:
      'Kurator muda dan pegiat museum diajak mempelajari alur pemodelan tiga dimensi sederhana menggunakan perangkat yang mudah diakses.',
    paragraphs: [
      'Materi mencakup pemotretan multisudut, pengolahan model, hingga penyiapan berkas untuk tampilan web.',
      'Peserta akan menghasilkan satu model digital artefak pilihan yang siap dipresentasikan pada akhir pelatihan.',
    ],
  },
  {
    title: 'Webinar Membaca Relief Candi sebagai Sumber Sejarah',
    excerpt:
      'Webinar pengenalan cara membaca relief candi sebagai sumber penulisan sejarah dan kajian budaya.',
    programType: 'Program Edukasi',
    eventDate: '2026-11-25T09:00:00+07:00',
    eventEndDate: '2026-11-25T11:30:00+07:00',
    location: 'Daring (Zoom)',
    registrationUrl: 'https://forms.gle/contoh-pendaftaran',
    publishedAt: '2026-10-30T08:00:00.000Z',
    lead:
      'Webinar ini membuka wawasan tentang cara membaca relief candi sebagai sumber sejarah yang kaya akan narasi dan simbol.',
    paragraphs: [
      'Narasumber memandu peserta mengenali motif relief, membaca adegan, serta menghubungkannya dengan konteks sejarah Majapahit.',
      'Sesi ditutup dengan telaah langsung pada relief pilihan dari koleksi digital museum.',
    ],
  },
  {
    title: 'Pameran Virtual Masterpiece Keramik Majapahit',
    excerpt:
      'Jelajahi koleksi keramik dan gerabah pilihan dari kawasan Trowulan dalam sajian pameran virtual.',
    programType: 'Pameran Virtual',
    eventDate: '2026-10-20T00:00:00+07:00',
    eventEndDate: '2026-12-20T00:00:00+07:00',
    location: 'Museum Virtual (Daring)',
    publishedAt: '2026-10-15T08:00:00.000Z',
    lead:
      'Pameran virtual ini menyuguhkan koleksi keramik dan gerabah pilihan dari kawasan Trowulan yang sedang berlangsung hingga akhir tahun.',
    paragraphs: [
      'Pengunjung dapat memperbesar detail setiap objek, membaca asal temuan, serta menyimak keterangan material dan fungsi.',
      'Koleksi mencakup temuan lokal hingga keramik mancanegara yang menunjukkan jaringan perdagangan Majapahit.',
    ],
  },
  {
    title: 'Konser Gamelan Kontemporer Bertema Wilwatikta',
    excerpt:
      'Konser yang memadukan gamelan tradisi dengan aransemen kontemporer bertema kejayaan Wilwatikta.',
    programType: 'Pertunjukan Budaya',
    eventDate: '2027-02-20T19:00:00+07:00',
    eventEndDate: '2027-02-20T21:30:00+07:00',
    location: 'Gedung Kesenian Surabaya',
    publishedAt: '2026-11-08T08:00:00.000Z',
    lead:
      'Konser gamelan kontemporer ini mengangkat tema kejayaan Wilwatikta melalui perpaduan instrumen tradisi dan aransemen baru.',
    paragraphs: [
      'Komposisi disusun dari kajian instrumen musik yang tergambar pada relief candi, dipadukan dengan sentuhan kontemporer.',
      'Konser menjadi bukti bahwa warisan musik Majapahit dapat terus hidup dan dinikmati generasi kini.',
    ],
  },
  {
    title: 'Seminar Pelestarian Naskah Lontar di Era Digital',
    excerpt:
      'Seminar tentang tantangan dan strategi pelestarian naskah lontar melalui digitalisasi dan akses terbuka.',
    programType: 'Seminar & Simposium',
    eventDate: '2026-09-15T08:00:00+07:00',
    eventEndDate: '2026-09-15T16:00:00+07:00',
    location: 'Aula PUI Seni Budaya UNESA',
    publishedAt: '2026-09-01T08:00:00.000Z',
    lead:
      'Seminar ini membahas tantangan pelestarian naskah lontar serta strategi digitalisasi yang menjaga keutuhan fisik dan akses keilmuan.',
    paragraphs: [
      'Pembicara memaparkan penanganan naskah rapuh, standar pemindaian, dan pentingnya metadata filologis yang akurat.',
      'Hasil diskusi menjadi rujukan bagi program preservasi naskah yang berjalan di PUI Seni Budaya Majapahitan.',
    ],
  },
  {
    title: 'Pameran Batik Motif Surya Wilwatikta',
    excerpt:
      'Pameran kain batik tulis dengan motif Surya Wilwatikta karya perajin kawasan Trowulan.',
    programType: 'Pameran Karya',
    eventDate: '2026-08-01T00:00:00+07:00',
    eventEndDate: '2026-09-15T00:00:00+07:00',
    location: 'Galeri Utama Museum Virtual',
    publishedAt: '2026-07-20T08:00:00.000Z',
    lead:
      'Pameran ini menampilkan kain batik tulis bermotif Surya Wilwatikta hasil karya perajin di kawasan Trowulan dan sekitarnya.',
    paragraphs: [
      'Setiap lembar kain dikurasi dari segi motif, pewarnaan alami, dan keterkaitannya dengan ragam hias candi.',
      'Pameran menegaskan keterhubungan antara warisan arsitektur klasik dengan seni tekstil tradisional yang terus berkembang.',
    ],
  },
  {
    title: 'Workshop Konservasi Preventif Koleksi Museum',
    excerpt:
      'Pelatihan teknik konservasi preventif untuk menjaga kondisi koleksi museum dari kerusakan lingkungan.',
    programType: 'Workshop & Pelatihan',
    eventDate: '2026-06-18T08:30:00+07:00',
    eventEndDate: '2026-06-18T15:00:00+07:00',
    location: 'Museum Negeri Jawa Timur',
    publishedAt: '2026-06-01T08:00:00.000Z',
    lead:
      'Workshop konservasi preventif ini membekali pengelola museum dengan teknik menjaga koleksi dari faktor perusak lingkungan.',
    paragraphs: [
      'Materi mencakup pengendalian suhu dan kelembapan, penanganan hama, serta tata letak penyimpanan koleksi yang aman.',
      'Peserta mendapatkan panduan praktis yang dapat diterapkan pada koleksi di museum masing-masing.',
    ],
  },
  {
    title: 'Kunjungan Edukasi Virtual Situs Trowulan untuk Sekolah',
    excerpt:
      'Program kunjungan edukasi virtual kawasan Trowulan bagi siswa sekolah dengan pendampingan narator.',
    programType: 'Program Edukasi',
    eventDate: '2026-10-01T00:00:00+07:00',
    eventEndDate: '2026-12-31T00:00:00+07:00',
    location: 'Museum Virtual (Daring)',
    publishedAt: '2026-09-25T08:00:00.000Z',
    lead:
      'Program kunjungan edukasi virtual ini mengajak siswa sekolah menelusuri kawasan Trowulan dengan pendampingan narator.',
    paragraphs: [
      'Siswa dipandu mengenal situs utama, memahami fungsi candi dan gapura, serta menjawab kuis interaktif di akhir sesi.',
      'Program berlangsung hingga akhir tahun dan terbuka untuk sekolah dengan pendaftaran kolektif.',
    ],
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })
  let created = 0
  let skipped = 0

  for (const p of programs) {
    const slug = formatSlug(p.title)
    const existing = await payload.find({
      collection: 'programs',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      skipped += 1
      continue
    }
    await payload.create({
      collection: 'programs',
      data: {
        slug,
        title: p.title,
        excerpt: p.excerpt,
        content: toLexical(p),
        status: 'published',
        programType: p.programType,
        eventDate: p.eventDate,
        eventEndDate: p.eventEndDate,
        location: p.location,
        registrationUrl: p.registrationUrl,
        publishedAt: p.publishedAt,
      },
      overrideAccess: true,
    })
    created += 1
  }

  console.log(`\nPrograms extra: ${created} created, ${skipped} skipped`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})