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

type PubSeed = {
  title: string
  abstract: string
  year: string
  publicationName: string
  typeBadge: string
  sintaBadge?: string
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  externalUrl: string
  authors: string[]
  keywords: string[]
}

const publikasi: PubSeed[] = [
  {
    title: 'Analisis Morfologi dan Kronologi Batu Bata Kuno pada Struktur Candi Trowulan',
    abstract:
      'Penelitian ini mengkaji morfologi dan dimensi batu bata kuno pada sejumlah struktur candi di Trowulan untuk menyusun kerangka kronologi relatif pembangunan bangunan suci masa Majapahit.',
    year: '2026',
    publicationName: 'Jurnal Reksa Budaya UNESA',
    typeBadge: 'Jurnal Ilmiah Nasional',
    sintaBadge: 'SINTA 3',
    volume: '10',
    issue: '1',
    pages: '44-61',
    doi: '10.26740/reksabudaya.v10n1.p44-61',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Dr. Trisakti, M.Si.', 'Welly Suryandoko, S.Pd., M.Pd.'],
    keywords: ['Morfologi', 'Batu Bata Kuno', 'Trowulan', 'Kronologi', 'Majapahit'],
  },
  {
    title: 'Kajian Ikonografi Relief Kala pada Gapura Paduraksa Masa Majapahit Akhir',
    abstract:
      'Kajian ini menelaah bentuk dan fungsi ikonografi relief kepala Kala pada gapura paduraksa untuk memahami perkembangan gaya seni pahat pada masa Majapahit akhir.',
    year: '2026',
    publicationName: 'Jurnal Seni Rupa dan Desain Nusantara',
    typeBadge: 'Jurnal Terakreditasi',
    sintaBadge: 'SINTA 2',
    volume: '13',
    issue: '1',
    pages: '88-104',
    doi: '10.26740/jsrdn.v13n1.p88-104',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Prof. Dr. Djodjok Soepardjo, M.Hum.', 'Dr. Trisakti, M.Si.'],
    keywords: ['Ikonografi', 'Relief Kala', 'Paduraksa', 'Seni Pahat', 'Majapahit'],
  },
  {
    title: 'Dinamika Perdagangan Keramik di Pelabuhan Sungai Brantas Abad XIV',
    abstract:
      'Artikel ini merekonstruksi dinamika perdagangan keramik di pelabuhan sungai Brantas pada abad XIV melalui analisis temuan keramik asing dan catatan pelayaran.',
    year: '2025',
    publicationName: 'Journal of Maritime Archaeology',
    typeBadge: 'Jurnal Internasional',
    sintaBadge: 'Scopus',
    volume: '18',
    issue: '2',
    pages: '210-231',
    doi: '10.1007/s11457-025-09341-7',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Welly Suryandoko, S.Pd., M.Pd.', 'Dr. Trisakti, M.Si.'],
    keywords: ['Perdagangan Maritim', 'Keramik', 'Sungai Brantas', 'Majapahit'],
  },
  {
    title: 'Metode Fotogrametri Jarak Dekat untuk Dokumentasi Arca Andesit Beresolusi Tinggi',
    abstract:
      'Studi ini menguji penerapan fotogrametri jarak dekat dalam mendokumentasikan arca andesit hingga detail permukaan beresolusi tinggi sebagai dasar pelestarian digital.',
    year: '2026',
    publicationName: 'Jurnal Teknologi Konservasi',
    typeBadge: 'Jurnal Ilmiah Nasional',
    sintaBadge: 'SINTA 2',
    volume: '5',
    issue: '1',
    pages: '33-50',
    doi: '10.26740/jtk.v5n1.p33-50',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Tim Teknologi Konservasi PUISBM UNESA'],
    keywords: ['Fotogrametri', 'Arca Andesit', 'Dokumentasi Digital', 'Konservasi'],
  },
  {
    title: 'Preservasi Preventif Koleksi Naskah Lontar di Iklim Tropis',
    abstract:
      'Makalah ini memaparkan strategi preservasi preventif naskah lontar yang disesuaikan dengan tantangan kelembapan dan suhu iklim tropis Indonesia.',
    year: '2025',
    publicationName: 'Prosiding Simposium Internasional Pernaskahan Nusantara',
    typeBadge: 'Prosiding Simposium',
    sintaBadge: 'Non-SINTA',
    pages: '175-190',
    externalUrl: 'https://repository.unesa.ac.id',
    authors: ['Tim Peneliti Filologi PUISBM UNESA'],
    keywords: ['Preservasi Preventif', 'Naskah Lontar', 'Iklim Tropis', 'Filologi'],
  },
  {
    title: 'Rekonstruksi Tata Air Petirtaan Candi Tikus Berbasis Data Lapangan',
    abstract:
      'Penelitian ini merekonstruksi sistem tata air petirtaan Candi Tikus menggunakan data pengukuran lapangan untuk memahami fungsi struktur kolam kuno.',
    year: '2026',
    publicationName: 'Jurnal Kajian Arkeologi',
    typeBadge: 'Jurnal Terakreditasi',
    sintaBadge: 'SINTA 3',
    volume: '9',
    issue: '2',
    pages: '122-139',
    doi: '10.1234/jka.v9n2.p122-139',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Welly Suryandoko, S.Pd., M.Pd.'],
    keywords: ['Petirtaan', 'Candi Tikus', 'Tata Air', 'Rekonstruksi'],
  },
  {
    title: 'Surya Majapahit sebagai Simbol Kosmologi dalam Seni Relief',
    abstract:
      'Artikel ini menganalisis lambang Surya Majapahit sebagai representasi kosmologi yang memadukan arah mata angin dan dewa Lokapala dalam seni relief.',
    year: '2026',
    publicationName: 'Jurnal Estetika dan Filsafat Seni',
    typeBadge: 'Jurnal Ilmiah Nasional',
    sintaBadge: 'SINTA 2',
    volume: '7',
    issue: '1',
    pages: '55-72',
    doi: '10.26740/jefs.v7n1.p55-72',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Dr. Trisakti, M.Si.'],
    keywords: ['Surya Majapahit', 'Kosmologi', 'Relief', 'Simbolisme'],
  },
  {
    title: 'Peran Museum Virtual dalam Literasi Budaya Generasi Muda',
    abstract:
      'Kajian ini membahas kontribusi museum virtual dalam membangun literasi budaya generasi muda melalui pendekatan pembelajaran berbasis media digital.',
    year: '2026',
    publicationName: 'International Journal of Digital Heritage',
    typeBadge: 'Jurnal Internasional',
    sintaBadge: 'SINTA 1',
    volume: '3',
    issue: '2',
    pages: '98-117',
    doi: '10.5678/ijdh.v3n2.p98-117',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Prof. Dr. Djodjok Soepardjo, M.Hum.', 'Dr. Trisakti, M.Si.'],
    keywords: ['Museum Virtual', 'Literasi Budaya', 'Generasi Muda', 'Media Digital'],
  },
  {
    title: 'Tipologi Gerabah Kawasan Trowulan dan Implikasinya bagi Kronologi',
    abstract:
      'Laporan ini menyajikan tipologi gerabah hasil survei kawasan Trowulan serta implikasinya terhadap penyusunan kronologi permukiman kuno.',
    year: '2026',
    publicationName: 'Laporan Riset Terbuka PUISBM UNESA',
    typeBadge: 'Laporan Arkeologis',
    sintaBadge: 'Non-SINTA',
    externalUrl: 'https://repository.unesa.ac.id',
    authors: ['Tim Arkeologi Lapangan PUISBM UNESA'],
    keywords: ['Gerabah', 'Tipologi', 'Trowulan', 'Kronologi'],
  },
  {
    title: 'Alih Aksara Prasasti Canggu dan Kajian Struktur Sosial Masyarakat Penyeberangan',
    abstract:
      'Studi ini menyajikan alih aksara Prasasti Canggu dan mengkaji struktur sosial masyarakat penyeberangan di sepanjang sungai era Majapahit.',
    year: '2025',
    publicationName: 'Jurnal Filologi Nusantara',
    typeBadge: 'Jurnal Ilmiah Nasional',
    sintaBadge: 'SINTA 2',
    volume: '12',
    issue: '2',
    pages: '67-84',
    doi: '10.26740/jfn.v12n2.p67-84',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Tim Peneliti Filologi PUISBM UNESA'],
    keywords: ['Prasasti Canggu', 'Alih Aksara', 'Struktur Sosial', 'Majapahit'],
  },
  {
    title: 'Monograf: Estetika Arsitektur Bata Merah Kerajaan Majapahit',
    abstract:
      'Buku monograf ini menguraikan estetika arsitektur bata merah Majapahit, menelaah proporsi, teknik konstruksi, dan nilai filosofis bangunan suci.',
    year: '2025',
    publicationName: 'UNESA University Press',
    typeBadge: 'Buku & Monograf',
    sintaBadge: 'Non-SINTA',
    externalUrl: 'https://repository.unesa.ac.id',
    authors: ['Prof. Dr. Djodjok Soepardjo, M.Hum.'],
    keywords: ['Arsitektur', 'Bata Merah', 'Majapahit', 'Monograf'],
  },
  {
    title: 'Model Digital Elevation untuk Pemetaan Kawasan Situs Percandian',
    abstract:
      'Artikel ini memaparkan penggunaan model elevasi digital untuk memetakan kawasan situs percandian dan mendukung analisis tata ruang kuno.',
    year: '2026',
    publicationName: 'Jurnal Geospasial dan Warisan',
    typeBadge: 'Jurnal Terakreditasi',
    sintaBadge: 'SINTA 4',
    volume: '2',
    issue: '1',
    pages: '10-25',
    doi: '10.26740/jgw.v2n1.p10-25',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Tim Teknologi Konservasi PUISBM UNESA'],
    keywords: ['Model Elevasi Digital', 'Pemetaan', 'Situs Percandian'],
  },
  {
    title: 'Diplomasi Budaya Nusantara dalam Sejarah Maritim Majapahit',
    abstract:
      'Makalah ini meninjau diplomasi budaya yang terjalin melalui jalur maritim Majapahit dan dampaknya bagi hubungan antarbangsa di Asia Tenggara.',
    year: '2025',
    publicationName: 'Prosiding Simposium Internasional Kebudayaan',
    typeBadge: 'Prosiding Simposium',
    sintaBadge: 'Scopus',
    pages: '240-258',
    doi: '10.1007/978-981-19-4567-8_29',
    externalUrl: 'https://repository.unesa.ac.id',
    authors: ['Prof. Dr. Djodjok Soepardjo, M.Hum.', 'Welly Suryandoko, S.Pd., M.Pd.'],
    keywords: ['Diplomasi Budaya', 'Maritim', 'Majapahit', 'Asia Tenggara'],
  },
  {
    title: 'Konservasi Berbasis Masyarakat pada Situs Cagar Budaya Jawa Timur',
    abstract:
      'Penelitian ini mengevaluasi model konservasi berbasis masyarakat pada sejumlah situs cagar budaya di Jawa Timur serta faktor pendukung keberhasilannya.',
    year: '2026',
    publicationName: 'Jurnal Konservasi dan Cagar Budaya',
    typeBadge: 'Jurnal Ilmiah Nasional',
    sintaBadge: 'SINTA 3',
    volume: '14',
    issue: '1',
    pages: '79-96',
    doi: '10.26740/jkcb.v14n1.p79-96',
    externalUrl: 'https://ejournal.unesa.ac.id',
    authors: ['Dr. Trisakti, M.Si.', 'Welly Suryandoko, S.Pd., M.Pd.'],
    keywords: ['Konservasi Berbasis Masyarakat', 'Cagar Budaya', 'Jawa Timur'],
  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })
  let created = 0
  let skipped = 0

  for (const p of publikasi) {
    const slug = formatSlug(p.title)
    const existing = await payload.find({
      collection: 'publikasi',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      skipped += 1
      continue
    }
    await payload.create({
      collection: 'publikasi',
      data: {
        slug,
        title: p.title,
        abstract: p.abstract,
        status: 'published',
        year: p.year,
        publicationName: p.publicationName,
        volume: p.volume,
        issue: p.issue,
        pages: p.pages,
        typeBadge: p.typeBadge,
        sintaBadge: p.sintaBadge ?? 'Non-SINTA',
        doi: p.doi,
        externalUrl: p.externalUrl,
        authors: p.authors.map((a) => ({ name: a })),
        keywords: p.keywords.map((k) => ({ keyword: k })),
        publishedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })
    created += 1
  }

  console.log(`\nPublikasi extra: ${created} created, ${skipped} skipped`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})