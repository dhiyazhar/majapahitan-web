import type { GlobalConfig } from 'payload'

export const PageBeranda: GlobalConfig = {
  slug: 'page-beranda',
  admin: {
    group: 'Halaman Statis',
    description: 'Pengaturan konten dinamis untuk Landing Page Beranda (/)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Slide Hero Utama',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Banner (Bisa gunakan newline)',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          required: true,
          label: 'Subjudul / Teks Pengantar',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Gambar Latar Banner',
        },
        {
          name: 'primaryLabel',
          type: 'text',
          defaultValue: 'Mulai Jelajah Virtual',
          label: 'Label Tombol Utama',
        },
        {
          name: 'primaryHref',
          type: 'text',
          defaultValue: '/galeri/3d',
          label: 'Tautan Tombol Utama',
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          defaultValue: 'Lihat Koleksi',
          label: 'Label Tombol Sekunder',
        },
        {
          name: 'secondaryHref',
          type: 'text',
          defaultValue: '/koleksi',
          label: 'Tautan Tombol Sekunder',
        },
      ],
    },
    {
      name: 'tentangEyebrow',
      type: 'text',
      defaultValue: 'Tentang Museum',
      label: 'Eyebrow Bagian Tentang',
    },
    {
      name: 'tentangTitle',
      type: 'text',
      defaultValue: 'Mengenal Museum Virtual Majapahitan',
      label: 'Judul Bagian Tentang',
    },
    {
      name: 'tentangBody',
      type: 'textarea',
      defaultValue:
        'Museum Virtual Majapahitan adalah inisiatif Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya untuk melestarikan, mendokumentasikan, dan mempublikasikan warisan budaya Majapahit dalam bentuk digital yang dapat diakses oleh seluruh dunia.',
      label: 'Isi Ringkasan Tentang',
    },
  ],
}
