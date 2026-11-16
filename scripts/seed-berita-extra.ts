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
const quote = (text: string): LexicalNode => block('quote', [textNode(text)])

type Article = {
  title: string
  excerpt: string
  date: string
  author: string
  lead: string
  paragraphs: string[]
  subheading?: string
  extra?: string[]
  quote?: { text: string; author: string; role?: string }
}

function toLexical(a: Article) {
  const children: LexicalNode[] = [paragraph(a.lead)]
  for (const p of a.paragraphs) children.push(paragraph(p))
  if (a.subheading) children.push(heading(a.subheading))
  if (a.quote) {
    const attribution = [a.quote.author, a.quote.role].filter(Boolean).join(', ')
    children.push(quote(attribution ? `${a.quote.text}\n\n${attribution}` : a.quote.text))
  }
  for (const p of a.extra ?? []) children.push(paragraph(p))
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } }
}

const articles: Article[] = [
  {
    title: 'Pelatihan Kurasi Digital Artefak Bersama Museum Daerah se-Jawa Timur',
    excerpt:
      'PUI Seni Budaya Majapahitan UNESA menggelar pelatihan kurasi digital artefak bagi pengelola museum daerah untuk menyamakan standar dokumentasi benda cagar budaya.',
    date: '2026-11-03T08:00:00.000Z',
    author: 'Humas PUI Seni Budaya',
    lead:
      'Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya menyelenggarakan pelatihan kurasi digital artefak yang diikuti pengelola museum daerah dari berbagai kabupaten di Jawa Timur.',
    paragraphs: [
      'Pelatihan berdurasi tiga hari ini memandu peserta melalui tahapan dokumentasi fotografi standar, pencatatan metadata, hingga penyusunan narasi kuratorial untuk benda cagar budaya koleksi masing-masing museum.',
      'Peserta juga diperkenalkan pada alur pemindaian 3D sederhana menggunakan perangkat yang tersedia, sebagai langkah awal menyiapkan museum daerah menuju digitalisasi koleksi.',
    ],
    subheading: 'Standar Baru Dokumentasi Museum Daerah',
    extra: [
      'Output pelatihan berupa panduan dokumentasi bersama diharapkan menjadi acuan museum daerah dalam menjaga konsistensi data koleksi, sehingga kelak dapat diintegrasikan dengan basis data Museum Virtual Majapahitan.',
    ],
    quote: {
      text: 'Konsistensi data adalah fondasi museum digital. Tanpa standar yang sama, koleksi hanya menjadi tumpukan foto tanpa makna.',
      author: 'Dr. Trisakti, M.Si.',
      role: 'Koordinator Riset & Kurasi',
    },
  },
  {
    title: 'Pameran Arsip Foto Lawas Trowulan Hadirkan Jejak Peradaban Majapahit',
    excerpt:
      'Puluhan arsip foto dokumentasi situs Trowulan dari berbagai dekade dipamerkan secara digital untuk memperlihatkan perubahan lanskap cagar budaya.',
    date: '2026-10-21T08:00:00.000Z',
    author: 'Divisi Kurasi Seni Rupa PUISBM',
    lead:
      'Museum Virtual Majapahitan menghadirkan pameran arsip foto lawas kawasan Trowulan yang merekam perjalanan dokumentasi situs sejak beberapa dekade silam.',
    paragraphs: [
      'Arsip yang dipamerkan menampilkan kondisi candi, gapura, dan petirtaan pada berbagai periode waktu, memberi pengunjung gambaran nyata tentang proses pemugaran dan pelestarian yang telah berlangsung.',
      'Pameran ini disusun dari koleksi dokumentasi milik peneliti, komunitas sejarah, serta arsip institusi yang telah melalui kurasi tim PUISBM.',
    ],
    quote: {
      text: 'Foto lama bukan sekadar nostalgia. Ia adalah bukti bahwa pelestarian situs adalah kerja panjang lintas generasi.',
      author: 'Welly Suryandoko, S.Pd., M.Pd.',
      role: 'Divisi Konservasi & Sejarah',
    },
  },
  {
    title: 'Riset Kolaboratif UNESA dan BRIN Petakan Jalur Pelayaran Sungai Brantas Era Majapahit',
    excerpt:
      'Penelitian bersama memetakan jaringan pelayaran dan titik penyeberangan kuno di sepanjang Sungai Brantas berdasarkan bukti arkeologis.',
    date: '2026-10-08T08:00:00.000Z',
    author: 'Tim Riset Arkeologi Maritim',
    lead:
      'Tim peneliti PUISBM UNESA bekerja sama dengan peneliti muda dari badan riset nasional untuk memetakan jalur pelayaran serta titian penyeberangan kuno di sepanjang aliran Sungai Brantas.',
    paragraphs: [
      'Studi ini menyatukan catatan prasasti, temuan keramik asing, dan analisis geomorfologi sungai untuk merekonstruksi bagaimana transportasi air menopang perekonomian Majapahit.',
      'Hasil awal menunjukkan sejumlah titik penyeberangan strategis yang selaras dengan simpul perdagangan dan kawasan permukiman di Trowulan dan sekitarnya.',
    ],
    subheading: 'Menuju Peta Digital Interaktif',
    extra: [
      'Data hasil pemetaan akan dirangkum menjadi peta digital interaktif yang dapat diakses publik melalui portal Museum Virtual Majapahit pada tahap berikutnya.',
    ],
  },
  {
    title: 'Sosialisasi Pelestarian Situs Cagar Budaya Digelar untuk Pelajar SMA Surabaya',
    excerpt:
      'Ratusan pelajar SMA mengikuti sosialisasi kepedulian cagar budaya dan pengenalan dokumentasi digital situs Majapahit.',
    date: '2026-09-18T08:00:00.000Z',
    author: 'Tim Edukasi & Publikasi PUISBM',
    lead:
      'PUISBM UNESA membuka rangkaian sosialisasi pelestarian cagar budaya bagi pelajar tingkat SMA di Surabaya sebagai bagian dari program edukasi museum.',
    paragraphs: [
      'Kegiatan ini mengajak pelajar mengenal nilai penting situs dan artefak Majapahit, sekaligus memperkenalkan peran dokumentasi digital dalam menjaga warisan budaya.',
      'Para peserta diajak mencoba antarmuka Museum Virtual Majapahitan dan berdiskusi tentang peran generasi muda dalam pelestarian benda cagar budaya.',
    ],
  },
  {
    title: 'Museum Virtual Majapahitan Jalin Kerja Sama Pertukaran Data dengan Perguruan Tinggi Mitra',
    excerpt:
      'Kerja sama pertukaran data dan sumber daya riset ditandatangani bersama perguruan tinggi mitra untuk memperluas basis dokumentasi.',
    date: '2026-09-02T08:00:00.000Z',
    author: 'Humas PUI Seni Budaya',
    lead:
      'PUISBM UNESA menandatangani kesepakatan kerja sama pertukaran data dan sumber daya penelitian dengan beberapa perguruan tinggi mitra yang memiliki fokus kajian arkeologi dan seni budaya.',
    paragraphs: [
      'Kesepakatan ini mencakup pertukaran data arsip penelitian, kolaborasi kuratorial, serta akses bersama terhadap dokumentasi digital situs dan artefak kawasan Nusantara.',
      'Dengan sinergi ini, Museum Virtual Majapahitan diharapkan tumbuh menjadi rujukan yang lebih lengkap dan terbuka bagi peneliti dan publik.',
    ],
  },
  {
    title: 'Workshop Alih Aksara Aksara Jawa Kuno untuk Komunitas Filologi Nusantara',
    excerpt:
      'Pelatihan alih aksara dan transliterasi aksara Jawa Kuno digelar untuk memperkuat kapasitas komunitas pelestari naskah.',
    date: '2026-08-25T08:00:00.000Z',
    author: 'Tim Riset Filologi PUISBM',
    lead:
      'PUISBM UNESA mengadakan workshop alih aksara aksara Jawa Kuno yang ditujukan bagi komunitas filologi dan pegiat naskah dari berbagai wilayah Nusantara.',
    paragraphs: [
      'Workshop ini memadukan pengenalan kaidah aksara Jawa Kuno dengan praktik transliterasi menggunakan rujukan prasasti dan kakawin era Majapahit.',
      'Peserta juga dibekali pemahaman dasar tentang preservasi naskah lontar dan dokumentasi digital sebagai bagian dari upaya penyelamatan sumber sejarah.',
    ],
    quote: {
      text: 'Kemampuan membaca aksara leluhur adalah kunci untuk menjaga makna yang tersimpan di balik prasasti dan naskah kuno.',
      author: 'Prof. Dr. Djodjok Soepardjo, M.Hum.',
      role: 'Ketua PUI Seni Budaya Majapahitan UNESA',
    },
  },
  {
    title: 'Dokumentasi 360 Derajat Candi Surawana Rampung, Siap Dinikmati Publik',
    excerpt:
      'Perekaman panorama 360 derajat Candi Surawana selesai dikerjakan dan segera dihadirkan pada portal tur virtual museum.',
    date: '2026-08-11T08:00:00.000Z',
    author: 'Tim Teknologi Konservasi PUISBM',
    lead:
      'Tim dokumentasi PUISBM UNESA merampungkan perekaman panorama 360 derajat Candi Surawana, salah satu candi bata merah peninggalan era Majapahit awal.',
    paragraphs: [
      'Perekaman meliputi bagian luar struktur candi hingga detail relief pada dindingnya, dengan resolusi yang memadai untuk eksplorasi virtual jarak dekat.',
      'Hasil dokumentasi akan ditata menjadi tur virtual interaktif dengan anotasi narasi sejarah pada setiap titik pandang.',
    ],
  },
  {
    title: 'Seminar Nasional Konservasi Digital Cagar Budaya Digelar Hibrida di Unesa',
    excerpt:
      'Seminar konservasi digital menghadirkan praktisi dan akademisi membahas tantangan serta peluang pelestarian cagar budaya berbasis teknologi.',
    date: '2026-07-30T08:00:00.000Z',
    author: 'Panitia Seminar Konservasi PUISBM',
    lead:
      'PUISBM UNESA menggelar seminar nasional konservasi digital cagar budaya secara hibrida, mempertemukan akademisi, praktisi pelestarian, dan perwakilan instansi kebudayaan.',
    paragraphs: [
      'Diskusi menyoroti pemanfaatan pemindaian spasial, fotogrametri, dan museum virtual sebagai instrumen dokumentasi sekaligus sarana edukasi publik yang menjangkau khalayak luas.',
      'Para pembicara juga berbagi praktik baik dari berbagai daerah dalam menangani tantangan keterbatasan akses terhadap situs dan koleksi benda cagar budaya.',
    ],
  },
  {
    title: 'Tim Kurasi Seleksi Karya Publik untuk Pameran Kontemporer Akhir Tahun',
    excerpt:
      'Kurator menyeleksi kiriman karya masyarakat untuk ditampilkan pada pameran seni kontemporer bertema Majapahitan.',
    date: '2026-07-15T08:00:00.000Z',
    author: 'Divisi Kurasi Seni PUISBM',
    lead:
      'Tim kurasi Museum Virtual Majapahitan tengah menyeleksi sejumlah karya kiriman masyarakat untuk pameran seni kontemporer bertema Majapahitan yang direncanakan akhir tahun.',
    paragraphs: [
      'Karya yang masuk dinilai dari kesesuaian tema, orisinalitas, dan kualitas artistik sebelum diputuskan untuk ditampilkan di Galeri Karya Publik.',
      'Kurator menekankan bahwa proses seleksi mengedepankan dialog antara ekspresi kekinian dan nilai estetika warisan Majapahit.',
    ],
  },
  {
    title: 'Peluncuran Repositori Penelitian Terbuka Majapahit untuk Akses Akademisi',
    excerpt:
      'Repositori penelitian terbuka diluncurkan untuk memudahkan akademisi mengakses hasil kajian dan data dokumentasi Majapahit.',
    date: '2026-06-27T08:00:00.000Z',
    author: 'Humas PUI Seni Budaya',
    lead:
      'PUISBM UNESA meluncurkan repositori penelitian terbuka bertema Majapahit yang menghimpun hasil kajian, laporan riset, dan data dokumentasi untuk diakses akademisi.',
    paragraphs: [
      'Repositori ini dirancang sebagai kanal akses terbuka guna mendukung studi sejarah, arkeologi, seni, dan budaya Majapahit oleh peneliti di berbagai institusi.',
      'Kehadirannya melengkapi publikasi ilmiah museum dan mempermudah pelacakan sumber yang dapat dirujuk dalam penelitian lanjutan.',
    ],
  },
  {
    title: 'Dialog Kebudayaan Jawa Timur dan Bali Bahas Jejak Majapahit dalam Tradisi Lokal',
    excerpt:
      'Dialog kebudayaan lintas daerah menelusuri warisan Majapahit yang masih hidup dalam praktik budaya dan upacara tradisional.',
    date: '2026-06-10T08:00:00.000Z',
    author: 'Divisi Konservasi & Sejarah',
    lead:
      'PUISBM UNESA memfasilitasi dialog kebudayaan antara pegiat budaya Jawa Timur dan Bali untuk menelusuri jejak Majapahit yang tetap hidup dalam tradisi lokal.',
    paragraphs: [
      'Pembahasan menyentuh kesinambungan bahasa, motif seni, hingga nilai filosofis yang diwariskan Majapahit dan masih dipraktikkan dalam upacara tradisional di kedua daerah.',
      'Dialog ini menegaskan pentingnya memandang warisan Majapahit sebagai tradisi yang hidup, bukan sekadar peninggalan masa lampau.',
    ],
    quote: {
      text: 'Warisan Majapahit tidak berhenti pada batu dan logam. Ia berlanjut dalam cara kita merawat nilai-nilai leluhur hari ini.',
      author: 'Welly Suryandoko, S.Pd., M.Pd.',
      role: 'Divisi Konservasi & Sejarah',
    },
  },
  {
    title: 'Mahasiswa Unesa Presentasikan Rekonstruksi Virtual Candi Tikus di Ajang Internasional',
    excerpt:
      'Karya rekonstruksi virtual Candi Tikus hasil pemodelan mahasiswa dipresentasikan pada forum internasional bidang warisan digital.',
    date: '2026-05-22T08:00:00.000Z',
    author: 'Tim Teknologi Konservasi PUISBM',
    lead:
      'Tim mahasiswa Universitas Negeri Surabaya mempresentasikan karya rekonstruksi virtual Candi Tikus pada forum internasional yang membahas warisan budaya digital.',
    paragraphs: [
      'Karya ini merupakan hasil pengembangan pemodelan tiga dimensi petirtaan Candi Tikus yang disusun dari data dokumentasi lapangan dan studi perbandingan arsitektur.',
      'Partisipasi ini menunjukkan kapasitas sivitas akademika UNESA dalam mengolah data warisan budaya menjadi sajian digital yang bernilai ilmiah.',
    ],
  },
  {
    title: 'Panduan Jelajah Digital Situs Trowulan Dirilis untuk Wisata Edukasi Keluarga',
    excerpt:
      'Panduan jelajah digital kawasan Trowulan dirilis untuk memandu keluarga mengenal situs Majapahit secara atraktif dan edukatif.',
    date: '2026-05-05T08:00:00.000Z',
    author: 'Tim Edukasi & Publikasi PUISBM',
    lead:
      'Museum Virtual Majapahitan merilis panduan jelajah digital kawasan Trowulan yang disusun untuk mendukung wisata edukasi keluarga.',
    paragraphs: [
      'Panduan ini memuat peta titik situs utama, ringkasan sejarah yang ringkas, serta saran rute kunjungan yang mudah diikuti pengunjung umum.',
      'Dengan bahasa yang mudah dipahami, panduan ini menjembatani keluarga yang ingin mengenal warisan Majapahit tanpa latar belakang sejarah formal.',
    ],
  },
  {
    title: 'Diskusi Publik Peran Museum Virtual dalam Pendidikan Sejarah Digelar di Unesa',
    excerpt:
      'Diskusi publik membahas potensi museum virtual sebagai media pembelajaran sejarah yang inklusif dan menjangkau sekolah.',
    date: '2026-03-19T08:00:00.000Z',
    author: 'Humas PUI Seni Budaya',
    lead:
      'PUISBM UNESA menyelenggarakan diskusi publik tentang peran museum virtual dalam mendukung pendidikan sejarah di sekolah dan perguruan tinggi.',
    paragraphs: [
      'Para pendidik berbagi pengalaman memanfaatkan konten digital museum sebagai bahan ajar yang memperkaya pembelajaran sejarah lokal secara visual.',
      'Diskusi menyimpulkan bahwa museum virtual membuka akses yang lebih adil terhadap sumber belajar warisan budaya, terutama bagi sekolah di luar kawasan situs.',
    ],
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })
  let created = 0
  let skipped = 0

  for (const a of articles) {
    const slug = formatSlug(a.title)
    const existing = await payload.find({
      collection: 'berita',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      skipped += 1
      continue
    }
    await payload.create({
      collection: 'berita',
      data: {
        slug,
        title: a.title,
        excerpt: a.excerpt,
        content: toLexical(a),
        status: 'published',
        publishedAt: a.date,
        author: a.author,
      },
      overrideAccess: true,
    })
    created += 1
  }

  console.log(`\nBerita extra: ${created} created, ${skipped} skipped`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})