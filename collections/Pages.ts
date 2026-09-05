import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Halaman Dinamis',
    plural: 'Halaman Dinamis',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    group: 'Halaman & Menu',
    description: 'Kelola konten halaman khusus dan laman statis tambahan.',
  },
  access: {
    read: () => true,
    create: isAdmin, // Hanya Admin yang dapat menambah entri halaman baru
    update: isAdminOrStaff, // Admin & Staff dapat memperbarui isi konten
    delete: isAdmin, // Hanya Admin yang dapat menghapus halaman
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Halaman',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL slug untuk halaman ini (misal: faq, kemitraan, panduan)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Isi Konten Halaman',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
