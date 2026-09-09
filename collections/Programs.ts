import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'
import { revalidateProgramAfterChange, revalidateProgramAfterDelete } from './programs/hooks/revalidateProgram'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Program & Kegiatan',
    plural: 'Program & Kegiatan',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'programType', 'eventDate', 'status'],
    group: 'Warta & Publikasi',
    description: 'Kelola pameran virtual 3D, workshop, webinar, pertunjukan, dan simposium kebudayaan.',
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
          data.slug = formatSlug(data.title) || `program-${Date.now()}`
        } else if (data && data.slug) {
          data.slug = formatSlug(data.slug)
        }
        return data
      },
    ],
    afterChange: [revalidateProgramAfterChange],
    afterDelete: [revalidateProgramAfterDelete],
  },
  fields: [
    // ========================================================================
    // MAIN CANVAS (Kolom Kiri: Fokus Penulisan & Visual)
    // ========================================================================
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Program / Kegiatan',
      admin: {
        placeholder: 'Masukkan judul pameran, workshop, atau webinar...',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster / Sampul Program',
      admin: {
        description: 'Poster atau foto representasi kegiatan beresolusi baik.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Program',
      admin: {
        description: 'Ringkasan singkat acara yang tampil pada kartu pratinjau dan beranda.',
        placeholder: 'Tuliskan intisari agenda kegiatan...',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Deskripsi Lengkap & Panduan Kegiatan',
    },

    // ========================================================================
    // SIDEBAR PANEL (Kolom Kanan: Pengaturan Event & Jadwal)
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
      name: 'programType',
      type: 'select',
      required: true,
      label: 'Kategori Agenda',
      defaultValue: 'Pameran Virtual',
      options: [
        { label: 'Pameran Virtual 3D', value: 'Pameran Virtual' },
        { label: 'Pameran Seni & Karya', value: 'Pameran Karya' },
        { label: 'Program Edukasi & Webinar', value: 'Program Edukasi' },
        { label: 'Pertunjukan Seni Budaya', value: 'Pertunjukan Budaya' },
        { label: 'Workshop & Pelatihan', value: 'Workshop & Pelatihan' },
        { label: 'Seminar & Simposium', value: 'Seminar & Simposium' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Menentukan jenis dan klasifikasi agenda museum.',
      },
    },
    {
      type: 'row',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'eventDate',
          type: 'date',
          label: 'Tanggal Mulai',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyyy',
            },
            description: 'Kosongkan jika jadwal belum ditentukan (Segera Hadir).',
          },
        },
        {
          name: 'eventEndDate',
          type: 'date',
          label: 'Tanggal Selesai (Opsional)',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyyy',
            },
            description: 'Diisi jika acara berlangsung beberapa hari/bulan (periode pameran).',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Tempat / Media Pelaksanaan',
      defaultValue: 'Museum Virtual (Daring)',
      admin: {
        position: 'sidebar',
        placeholder: 'Contoh: Daring (Zoom) / Museum Ruang Utama / Situs Trowulan',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Label Tombol Aksi (CTA)',
      defaultValue: 'Masuk Galeri',
      admin: {
        position: 'sidebar',
        placeholder: 'Contoh: Masuk Galeri / Daftar Sekarang / Tonton Live',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Tautan Aksi Khusus (Opsional)',
      admin: {
        position: 'sidebar',
        placeholder: 'Kosongkan jika tautan ke halaman detail program',
        description: 'Jika diisi (misal: link Zoom/Google Form), tombol akan membuka tautan ini.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal Penerbitan Halaman',
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
