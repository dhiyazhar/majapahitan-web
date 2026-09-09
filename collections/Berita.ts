import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'
import { revalidateBeritaAfterChange, revalidateBeritaAfterDelete } from './berita/hooks/revalidateBerita'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Berita: CollectionConfig = {
  slug: 'berita',
  labels: {
    singular: 'Warta / Berita',
    plural: 'Warta & Berita',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author'],
    group: 'Warta & Publikasi',
    description: 'Kelola warta berita, liputan lapangan, dan kabar kebudayaan Majapahit.',
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
          data.slug = formatSlug(data.title) || `berita-${Date.now()}`
        } else if (data && data.slug) {
          data.slug = formatSlug(data.slug)
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, req }) => {
        if (data && !data.author && req.user?.name) {
          data.author = req.user.name
        }
        return data
      },
    ],
    afterChange: [revalidateBeritaAfterChange],
    afterDelete: [revalidateBeritaAfterDelete],
  },
  fields: [
    // ========================================================================
    // MAIN CANVAS (Kolom Kiri: Fokus Penulisan & Visual)
    // ========================================================================
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Warta / Berita',
      admin: {
        placeholder: 'Masukkan judul warta atau liputan berita...',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Sampul Utama',
      admin: {
        description: 'Disarankan foto landscape beresolusi baik dengan rasio 16:9.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Cuplikan (Excerpt)',
      admin: {
        description: 'Ringkasan singkat (2–3 kalimat) yang muncul pada kartu pratinjau halaman beranda.',
        placeholder: 'Tuliskan intisari ringkas warta...',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Isi Narasi Berita',
    },

    // ========================================================================
    // SIDEBAR PANEL (Kolom Kanan: Pengaturan Penerbitan & Metadata)
    // ========================================================================
    {
      name: 'status',
      type: 'select',
      label: 'Status Publikasi',
      defaultValue: 'published',
      options: [
        { label: 'Draf (Belum Tayang ke Publik)', value: 'draft' },
        { label: 'Tayang (Tampil di Website)', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal & Waktu Penerbitan',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Nama Penulis / Atribusi',
      defaultValue: 'PUI Seni Budaya Majapahitan',
      admin: {
        position: 'sidebar',
        description: 'Otomatis terisi akun kurator saat diterbitkan.',
      },
    },

    // ========================================================================
    // HIDDEN / AUTO-GENERATED (Otomatis dari Judul)
    // ========================================================================
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
  ],
}
