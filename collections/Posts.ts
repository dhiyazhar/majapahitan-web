import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Warta / Artikel',
    plural: 'Warta & Publikasi',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Warta & Publikasi',
    description: 'Kelola warta berita, publikasi ilmiah, dan agenda kegiatan kebudayaan.',
  },
  access: {
    read: () => true,
    create: isAdminOrStaff,
    update: isAdminOrStaff,
    delete: isAdmin, // Hanya Admin yang dapat menghapus artikel secara permanen
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = formatSlug(data.title)
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
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Warta / Artikel',
      admin: {
        placeholder: 'Masukkan judul warta atau artikel publikasi...',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Alamat Tautan URL (Slug)',
      admin: {
        description: 'Tautan URL artikel. Otomatis terisi dari judul jika dikosongkan.',
        placeholder: 'otomatis-terisi-dari-judul',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategori Warta',
      options: [
        { label: 'Berita & Liputan Khusus', value: 'berita' },
        { label: 'Publikasi & Penelitian Ilmiah', value: 'publikasi' },
        { label: 'Program & Agenda Kegiatan', value: 'program' },
      ],
      admin: {
        description: 'Menentukan penempatan warta pada kanal website yang sesuai.',
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
        placeholder: 'Tuliskan intisari ringkas artikel...',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Isi Narasi Artikel',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Nama Penulis / Atribusi',
      defaultValue: 'PUI Seni Budaya Majapahitan',
      admin: {
        description: 'Otomatis terisi dengan nama akun Anda saat diterbitkan.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal & Waktu Penerbitan',
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Publikasi',
      defaultValue: 'published',
      options: [
        { label: 'Draf (Belum Tayang ke Publik)', value: 'draft' },
        { label: 'Tayang (Tampil di Website)', value: 'published' },
      ],
    },
  ],
}
