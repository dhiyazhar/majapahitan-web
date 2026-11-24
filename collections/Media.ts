import type { CollectionConfig } from 'payload'
import { isAdminOrStaff } from '../access'

function getCategoryFromReferer(referer: string): 'banner' | 'koleksi' | 'konten' {
  if (!referer) return 'konten'
  if (referer.includes('/globals/page-beranda') || referer.includes('/globals/page-tentang')) {
    return 'banner'
  }
  if (
    referer.includes('/collections/situs') ||
    referer.includes('/collections/artefak') ||
    referer.includes('/collections/karya-')
  ) {
    return 'koleksi'
  }
  return 'konten'
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Berkas Media',
    plural: 'Pustaka Media',
  },
  admin: {
    group: 'Sistem & Pengguna',
    description: 'Pusat penyimpanan aset visual situs. Panduan resolusi: Hero 1920×1080 (16:9), Koleksi & Galeri 1200×900 (4:3), Pilar 1200×600 (2:1), Logo 400×400 (1:1). Format: WebP/SVG.',
    defaultColumns: ['filename', 'category', 'alt', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && (!data.category || data.category === 'konten')) {
          const referer = req?.headers?.get?.('referer') || ''
          const detected = getCategoryFromReferer(referer)
          if (detected !== 'konten') {
            data.category = detected
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      defaultValue: ({ req }) => {
        const referer = req?.headers?.get?.('referer') || ''
        return getCategoryFromReferer(referer)
      },
      index: true,
      label: 'Kategori Media',
      options: [
        { label: 'Banner & Halaman', value: 'banner' },
        { label: 'Koleksi & Artefak', value: 'koleksi' },
        { label: 'Berita & Program', value: 'konten' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Kelompok aset media untuk memudahkan penyaringan di Pustaka Media.',
      },
    },
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
    adminThumbnail: ({ doc }) => {
      const thumb = (doc?.sizes as any)?.thumbnail?.filename || doc?.filename
      if (!thumb) return null
      const rawCdn = process.env.NEXT_PUBLIC_CDN_URL?.trim() || ''
      const cleanCdn = rawCdn.replace(/^https?:\/\//, '').replace(/\/$/, '')
      return cleanCdn ? `https://${cleanCdn}/${thumb}` : ((doc?.sizes as any)?.thumbnail?.url || doc?.url || null)
    },
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
