import type { GlobalConfig } from 'payload'
import { isAdminOrStaff } from '../access'

export const PageKonservasi: GlobalConfig = {
  slug: 'page-konservasi',
  label: 'Halaman: Konservasi',
  admin: {
    group: 'Halaman & Menu',
    description: 'Pengaturan konten untuk Halaman Indeks Museum Konservasi (/konservasi)',
  },
  access: {
    read: () => true,
    update: isAdminOrStaff,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Melestarikan Warisan Peradaban Majapahit',
      label: 'Judul Hero',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      defaultValue:
        'Dokumentasi, konservasi, dan digitalisasi situs bersejarah serta artefak peninggalan Kerajaan Majapahit oleh PUI Seni Budaya Majapahitan, Universitas Negeri Surabaya.',
      label: 'Subjudul Hero',
    },
    {
      name: 'pengantarParagraphs',
      type: 'array',
      label: 'Paragraf Narasi Pengantar Konservasi',
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
