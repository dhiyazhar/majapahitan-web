import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Situs: CollectionConfig = {
  slug: 'situs',
  labels: {
    singular: 'Situs Sejarah',
    plural: 'Situs & Arsitektur',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'location', 'era', 'status'],
    listSearchableFields: ['name', 'location', 'era'],
    group: 'Warisan & Konservasi',
    description: 'Pusat data dokumentasi situs dan arsitektur peninggalan era Majapahit.',
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
        if (data && data.name && (!data.slug || data.slug.trim() === '')) {
          data.slug = formatSlug(data.name) || `situs-${Date.now()}`
        } else if (data && data.slug) {
          data.slug = formatSlug(data.slug)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Situs',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (otomatis dibuat dari nama jika dikosongkan).',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Lokasi',
      defaultValue: 'Trowulan, Mojokerto',
    },
    {
      name: 'era',
      type: 'text',
      required: true,
      label: 'Era / Abad',
      defaultValue: 'Abad ke-14 Masehi',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'Terdokumentasi',
      options: [
        { label: 'Terdokumentasi', value: 'Terdokumentasi' },
        { label: 'Pemindaian 3D', value: 'Pemindaian 3D' },
        { label: 'Dalam Proses', value: 'Dalam Proses' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi',
      admin: {
        description: 'Resolusi optimal: 1200×900 px (rasio 4:3). Format WebP/JPG, maks 350 KB.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Singkat',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Laporan Kuratorial & Data Arkeologis Detail',
    },
  ],
}
