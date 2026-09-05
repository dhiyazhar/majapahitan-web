import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'

export const KaryaPublik: CollectionConfig = {
  slug: 'karya-publik',
  labels: {
    singular: 'Karya Publik',
    plural: 'Galeri Karya Publik',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'contributorName', 'category', 'status'],
    group: 'Partisipasi & Galeri',
    description: 'Tinjau dan kurasi kiriman karya seni dari masyarakat dan sivitas akademika.',
  },
  access: {
    read: () => true,
    create: () => true, // Publik dapat mengirim karya melalui form partisipasi
    update: isAdminOrStaff, // Admin atau Staff dapat melakukan kurasi / approval
    delete: isAdmin, // Hanya Admin yang dapat menghapus data karya
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Karya',
    },
    {
      name: 'contributorName',
      type: 'text',
      required: true,
      label: 'Nama Lengkap Kontributor',
    },
    {
      name: 'contributorEmail',
      type: 'email',
      required: true,
      label: 'Email Kontributor',
    },
    {
      name: 'contributorAffiliation',
      type: 'text',
      label: 'Institusi / Komunitas / Umum',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategori Karya',
      options: [
        { label: 'Seni Rupa Kontemporer (Lukisan / Patung)', value: 'seni-rupa' },
        { label: 'Desain Grafis & Ilustrasi Digital', value: 'desain-ilustrasi' },
        { label: 'Dokumentasi Fotografi Situs / Budaya', value: 'fotografi' },
        { label: 'Karya 3D Render / Animasi Budaya', value: 'model-3d' },
        { label: 'Riset Visual & Infografis Sejarah', value: 'riset-visual' },
        { label: 'Karya Kreatif Lainnya', value: 'lainnya' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi / Konsep Karya',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Berkas Karya Unggahan',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      label: 'Status Kurasi',
      options: [
        { label: 'Menunggu Kurasi (Pending)', value: 'pending' },
        { label: 'Disetujui & Tampil (Published)', value: 'published' },
        { label: 'Ditolak (Rejected)', value: 'rejected' },
      ],
    },
    {
      name: 'moderationNotes',
      type: 'textarea',
      label: 'Catatan Internal Tim Kurator',
      admin: {
        description: 'Hanya dapat dilihat oleh pengelola / tim kurator PUI',
      },
    },
  ],
}
