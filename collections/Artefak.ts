import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Artefak: CollectionConfig = {
  slug: 'artefak',
  labels: {
    singular: 'Artefak',
    plural: 'Artefak & Benda Budaya',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'category', 'era', 'material'],
    listSearchableFields: ['name', 'category', 'era', 'material'],
    group: 'Warisan & Konservasi',
    description: 'Inventarisasi artefak, arca, tosan aji, dan benda cagar budaya.',
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
          data.slug = formatSlug(data.name) || `artefak-${Date.now()}`
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
      label: 'Nama Artefak',
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
      name: 'category',
      type: 'select',
      required: true,
      label: 'Klasifikasi Benda',
      options: [
        { label: 'Prasasti & Inskripsi', value: 'Prasasti & Inskripsi' },
        { label: 'Arca & Patung', value: 'Arca & Patung' },
        { label: 'Keramik & Gerabah', value: 'Keramik & Gerabah' },
        { label: 'Perhiasan & Logam', value: 'Perhiasan & Logam' },
        { label: 'Naskah & Sastra', value: 'Naskah & Sastra' },
      ],
    },
    {
      name: 'era',
      type: 'text',
      required: true,
      label: 'Era / Tahun Pembuatan',
      defaultValue: 'Abad ke-14 Masehi',
    },
    {
      name: 'material',
      type: 'text',
      required: true,
      label: 'Bahan / Material',
      defaultValue: 'Batu Andesit',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi Artefak',
      admin: {
        description: 'Resolusi optimal: 1200×900 px (rasio 4:3). Format WebP/JPG, latar studio netral, maks 350 KB.',
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
      label: 'Ulasan Kuratorial & Catatan Filologis',
    },
  ],
}
