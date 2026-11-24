import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrStaff } from '../access'
import { directPromoteSubmissionToPublic } from '../lib/s3-curation'

export const KaryaPublik: CollectionConfig = {
  slug: 'karya-publik',
  labels: {
    singular: 'Karya Publik',
    plural: 'Galeri Karya Publik',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['submissionMedia', 'title', 'contributorName', 'category', 'status', 'createdAt'],
    listSearchableFields: ['title', 'contributorName', 'contributorEmail', 'category'],
    group: 'Partisipasi & Galeri',
    description: 'Tinjau dan kurasi kiriman karya seni dari masyarakat dan sivitas akademika.',
  },
  access: {
    read: () => true,
    create: () => false, // Submissions only come via public visitor form (server action with overrideAccess)
    update: isAdminOrStaff, // Admin atau Staff dapat melakukan kurasi / approval
    delete: isAdmin, // Hanya Admin yang dapat menghapus data karya
  },
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        // 1. Larang rollback dari published kembali ke pending
        if (originalDoc?.status === 'published' && data?.status === 'pending') {
          throw new Error(
            'Karya yang telah disetujui tidak dapat dikembalikan ke status Menunggu Kurasi. Pilih "Diturunkan dari Galeri (Takedown)" jika ingin menarik karya dari galeri publik.'
          )
        }

        // 2. Deteksi approval (transisi ke published): salin langsung di AWS S3
        const isApproving = originalDoc?.status !== 'published' && data?.status === 'published'

        if (isApproving) {
          const subMediaId =
            typeof data?.submissionMedia === 'object' && data?.submissionMedia !== null
              ? data.submissionMedia.id
              : data?.submissionMedia ||
                (typeof originalDoc?.submissionMedia === 'object' && originalDoc?.submissionMedia !== null
                  ? originalDoc.submissionMedia.id
                  : originalDoc?.submissionMedia)

          if (subMediaId) {
            const subMedia = await req.payload.findByID({
              collection: 'submission-media',
              id: subMediaId,
            })

            if (subMedia?.filename) {
              await directPromoteSubmissionToPublic({
                submissionMediaFilename: subMedia.filename,
                deleteSubmissionSource: true,
              })
            }
          }
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
      name: 'submissionMedia',
      type: 'upload',
      relationTo: 'submission-media',
      label: 'Berkas Kurasi',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        hidden: true,
      },
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
        { label: 'Diturunkan dari Galeri (Takedown)', value: 'takedown' },
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
