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
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Latar Banner Hero',
      filterOptions: {
        category: { equals: 'halaman' },
      },
      admin: {
        description: 'Resolusi optimal: 1920×800 px (ultrawide 21:9). WebP/JPG monokrom/gelap, maks 350 KB.',
      },
    },
    {
      name: 'pilarSitusImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Kartu Pilar: Situs & Arsitektur',
      filterOptions: {
        category: { equals: 'halaman' },
      },
      admin: {
        description: 'Resolusi optimal: 1200×600 px (rasio panorama 2:1). Foto situs candi, WebP/JPG, maks 250 KB.',
      },
    },
    {
      name: 'pilarArtefakImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Kartu Pilar: Artefak & Benda Budaya',
      filterOptions: {
        category: { equals: 'halaman' },
      },
      admin: {
        description: 'Resolusi optimal: 1200×600 px (rasio panorama 2:1). Foto benda artefak, WebP/JPG, maks 250 KB.',
      },
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
