import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const KaryaMuseum: CollectionConfig = {
  slug: 'karya-museum',
  labels: {
    singular: 'Koleksi Museum',
    plural: 'Galeri Virtual Museum',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['image', 'title', 'type', 'creator', 'status'],
    listSearchableFields: ['title', 'creator', 'description', 'material'],
    group: 'Partisipasi & Galeri',
    description: 'Katalog pameran karya museum: koleksi otentik dan karya kontemporer.',
  },
  access: {
    read: () => true,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && data.title && (!data.slug || data.slug.trim() === '')) {
          data.slug = formatSlug(data.title) || `karya-${Date.now()}`
        } else if (data && data.slug) {
          data.slug = formatSlug(data.slug)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Karya',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (otomatis dibuat dari judul karya jika dikosongkan).',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Jenis Koleksi Galeri',
      options: [
        { label: 'Karya Otentik Bersejarah', value: 'otentik' },
        { label: 'Karya Seni Kontemporer', value: 'kontemporer' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto / Visual Karya',
      admin: {
        description: 'Resolusi optimal: 1200×900 px (4:3) s/d 1600×1200 px (zoom modal). Format WebP/PNG/JPG, maks 500 KB.',
      },
    },
    {
      name: 'creator',
      type: 'text',
      label: 'Seniman / Pembuat / Asal Temuan',
    },
    {
      name: 'era',
      type: 'text',
      label: 'Tahun / Era Penciptaan',
    },
    {
      name: 'material',
      type: 'text',
      label: 'Media / Material & Dimensi',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi & Ulasan Kuratorial',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
