import type { CollectionConfig } from 'payload'
import { isAdminOrStaff } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Berkas Media',
    plural: 'Pustaka Media',
  },
  admin: {
    group: 'Sistem & Pengguna',
    description: 'Pusat penyimpanan foto, gambar koleksi, dan aset visual situs.',
  },
  access: {
    read: () => true,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Teks Alternatif (Alt Text)',
      admin: {
        description: 'Deskripsi gambar untuk aksesibilitas pembaca layar dan optimasi SEO.',
        placeholder: 'contoh: Foto relief Candi Penataran pada sudut barat',
      },
    },
  ],
  upload: {
    staticDir: 'public/media',
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
}
