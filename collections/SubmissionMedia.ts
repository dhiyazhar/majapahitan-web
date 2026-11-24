import type { CollectionConfig } from 'payload'
import { isAdminOrStaff } from '../access'

export const SubmissionMedia: CollectionConfig = {
  slug: 'submission-media',
  labels: {
    singular: 'Berkas Kirim Karya',
    plural: 'Berkas Kirim Karya (S3 Submission)',
  },
  admin: {
    group: 'Partisipasi & Galeri',
    description: 'Penyimpanan terisolasi (private S3) untuk berkas kiriman publik yang belum/sedang dikurasi.',
    hidden: true, // Disembunyikan dari sidebar kurator agar tidak berantakan
  },
  access: {
    read: isAdminOrStaff,
    create: () => false, // Disallow manual create in admin; only created via server action (overrideAccess)
    update: isAdminOrStaff,
    delete: isAdminOrStaff,
  },
  upload: {
    disableLocalStorage: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Keterangan Berkas',
    },
  ],
}
