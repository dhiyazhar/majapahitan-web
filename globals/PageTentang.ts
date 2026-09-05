import type { GlobalConfig } from 'payload'
import { isAdminOrStaff } from '../access'

export const PageTentang: GlobalConfig = {
  slug: 'page-tentang',
  label: 'Halaman: Tentang Museum',
  admin: {
    group: 'Halaman & Menu',
    description: 'Pengaturan konten untuk Halaman Tentang Museum (/tentang)',
  },
  access: {
    read: () => true,
    update: isAdminOrStaff,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Mengenal Museum Virtual Majapahitan',
      label: 'Judul Hero',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue:
        'Pusat konservasi digital dan ruang apresiasi warisan kebudayaan Kerajaan Majapahit dalam kemasan teknologi modern.',
      label: 'Subjudul Hero',
    },
    {
      name: 'visi',
      type: 'textarea',
      defaultValue:
        'Menjadi pusat konservasi digital dan rujukan utama pelestarian seni budaya Majapahit berkelas dunia yang memadukan keilmuan akademis dengan apresiasi publik.',
      label: 'Visi Organisasi',
    },
    {
      name: 'misi',
      type: 'array',
      label: 'Poin-Poin Misi',
      fields: [
        {
          name: 'point',
          type: 'textarea',
          required: true,
          label: 'Pernyataan Misi',
        },
      ],
    },
    {
      name: 'sejarahParagraphs',
      type: 'array',
      label: 'Paragraf Narasi Sejarah',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Paragraf',
        },
      ],
    },
  ],
}
