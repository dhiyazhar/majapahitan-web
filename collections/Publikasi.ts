import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'
import { revalidatePublikasiAfterChange, revalidatePublikasiAfterDelete } from './publikasi/hooks/revalidatePublikasi'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Publikasi: CollectionConfig = {
  slug: 'publikasi',
  labels: {
    singular: 'Publikasi Ilmiah',
    plural: 'Publikasi & Riset',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'typeBadge', 'status'],
    group: 'Warta & Publikasi',
    description: 'Kelola repositori jurnal penelitian, buku monograf, dan prosiding ilmiah Majapahit.',
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
          data.slug = formatSlug(data.title) || `publikasi-${Date.now()}`
        } else if (data && data.slug) {
          data.slug = formatSlug(data.slug)
        }
        return data
      },
    ],
    afterChange: [revalidatePublikasiAfterChange],
    afterDelete: [revalidatePublikasiAfterDelete],
  },
  fields: [
    // ========================================================================
    // MAIN CANVAS (Kolom Kiri: Naskah & Abstrak)
    // ========================================================================
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Penelitian / Artikel Ilmiah',
      admin: {
        placeholder: 'Masukkan judul lengkap makalah atau jurnal...',
      },
    },
    {
      name: 'abstract',
      type: 'textarea',
      required: true,
      label: 'Abstrak (Bahasa Indonesia)',
      admin: {
        rows: 5,
        placeholder: 'Tuliskan abstrak ringkas penelitian...',
      },
    },

    // ========================================================================
    // SIDEBAR PANEL (Kolom Kanan: Metadata Publikasi & Pengindeksan)
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
      name: 'year',
      type: 'text',
      required: true,
      label: 'Tahun Penerbitan',
      defaultValue: () => String(new Date().getFullYear()),
      admin: {
        position: 'sidebar',
        placeholder: 'Contoh: 2024',
      },
    },
    {
      name: 'publicationName',
      type: 'text',
      required: true,
      label: 'Nama Jurnal / Penerbit / Prosiding',
      admin: {
        position: 'sidebar',
        placeholder: 'Contoh: Jurnal Reksa Budaya UNESA',
      },
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'volume',
          type: 'text',
          label: 'Volume',
          admin: {
            width: '33.33%',
            placeholder: '8',
          },
        },
        {
          name: 'issue',
          type: 'text',
          label: 'Nomor',
          admin: {
            width: '33.33%',
            placeholder: '2',
          },
        },
        {
          name: 'pages',
          type: 'text',
          label: 'Halaman',
          admin: {
            width: '33.34%',
            placeholder: '112-128',
          },
        },
      ],
    },
    {
      name: 'typeBadge',
      type: 'select',
      required: true,
      label: 'Tipe Dokumen Ilmiah',
      defaultValue: 'Jurnal Ilmiah Nasional',
      options: [
        { label: 'Jurnal Ilmiah Nasional', value: 'Jurnal Ilmiah Nasional' },
        { label: 'Jurnal Terakreditasi', value: 'Jurnal Terakreditasi' },
        { label: 'Jurnal Internasional', value: 'Jurnal Internasional' },
        { label: 'Prosiding Simposium', value: 'Prosiding Simposium' },
        { label: 'Buku & Monograf', value: 'Buku & Monograf' },
        { label: 'Laporan Arkeologis', value: 'Laporan Arkeologis' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sintaBadge',
      type: 'select',
      label: 'Indeks Akreditasi',
      defaultValue: 'SINTA 2',
      options: [
        { label: 'SINTA 1', value: 'SINTA 1' },
        { label: 'SINTA 2', value: 'SINTA 2' },
        { label: 'SINTA 3', value: 'SINTA 3' },
        { label: 'SINTA 4', value: 'SINTA 4' },
        { label: 'Scopus / WoS', value: 'Scopus' },
        { label: 'Non-SINTA', value: 'Non-SINTA' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'doi',
      type: 'text',
      label: 'Nomor DOI (Digital Object Identifier)',
      admin: {
        position: 'sidebar',
        placeholder: '10.26740/reksabudaya.v8n2.p112-128',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      required: true,
      label: 'Tautan E-Library / Repositori OJS',
      defaultValue: 'https://ejournal.unesa.ac.id',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pdfUrl',
      type: 'text',
      label: 'Tautan Unduh PDF Naskah (Opsional)',
      admin: {
        position: 'sidebar',
        placeholder: 'https://ejournal.unesa.ac.id/.../download.pdf',
      },
    },
    {
      name: 'authors',
      type: 'array',
      label: 'Daftar Penulis',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nama Lengkap & Gelar',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Kata Kunci (Keywords)',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal Masuk Repositori',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
