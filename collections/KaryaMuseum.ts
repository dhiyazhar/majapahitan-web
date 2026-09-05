import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

export const KaryaMuseum: CollectionConfig = {
  slug: 'karya-museum',
  labels: {
    singular: 'Koleksi Museum',
    plural: 'Galeri Virtual Museum',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'creator', 'status'],
    group: 'Partisipasi & Galeri',
    description: 'Katalog pameran karya museum: koleksi otentik dan karya kontemporer.',
  },
  access: {
    read: () => true,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdmin,
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
