import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import { id as idLocale } from '@payloadcms/translations/languages/id'
import { en as enLocale } from '@payloadcms/translations/languages/en'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { SubmissionMedia } from './collections/SubmissionMedia'
import { Berita } from './collections/Berita'
import { Programs } from './collections/Programs'
import { Publikasi } from './collections/Publikasi'
import { Situs } from './collections/Situs'
import { Artefak } from './collections/Artefak'
import { KaryaMuseum } from './collections/KaryaMuseum'
import { KaryaPublik } from './collections/KaryaPublik'
import { Pages } from './collections/Pages'

// Globals
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { PageBeranda } from './globals/PageBeranda'
import { PageTentang } from './globals/PageTentang'
import { PageKonservasi } from './globals/PageKonservasi'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: {
      Component: './components/admin/UserAvatar#UserAvatar',
    },
    components: {
      graphics: {
        Icon: './components/admin/Icon#Icon',
        Logo: './components/admin/Logo#Logo',
      },
    },
    meta: {
      titleSuffix: ' — Museum Virtual Majapahitan',
    },
    theme: 'dark',
    dateFormat: 'd MMM yyyy, HH:mm',
    dashboard: {
      widgets: [
        {
          slug: 'overview',
          Component: './components/admin/DashboardWidget#DashboardWidget',
          minWidth: 'full',
          maxWidth: 'full',
        },
      ],
      defaultLayout: [
        { widgetSlug: 'overview', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
  },
  i18n: {
    supportedLanguages: { id: idLocale, en: enLocale },
    fallbackLanguage: 'id',
  },
  collections: [
    // Warta, Agenda Program, & Publikasi Ilmiah
    Berita,
    Programs,
    Publikasi,
    // Konservasi Warisan
    Situs,
    Artefak,
    // Galeri Seni & Partisipasi
    KaryaMuseum,
    KaryaPublik,
    // Halaman Dinamis
    Pages,
    // Sistem & Akun
    Users,
    Media,
    SubmissionMedia,
  ],
  globals: [
    // Pengaturan Situs & Menu
    Navigation,
    SiteSettings,
    // Singleton Halaman Statis
    PageBeranda,
    PageTentang,
    PageKonservasi,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      connectionTimeoutMillis: 5000,
    },
    push: false,
  }),
  sharp,
  localization: {
    locales: [
      { label: 'Bahasa Indonesia', code: 'id' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'id',
    fallback: true,
  },
  plugins: [
    // 1. Bucket publik untuk berkas media resmi dan tayang umum (CDN CloudFront)
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const rawCdn = process.env.NEXT_PUBLIC_CDN_URL?.trim() || ''
            const cleanCdn = rawCdn.replace(/^https?:\/\//, '').replace(/\/$/, '')
            const fileKey = prefix ? `${prefix}/${filename}` : filename
            if (cleanCdn) {
              return `https://${cleanCdn}/${fileKey}`
            }
            const bucket = process.env.S3_PUBLIC_BUCKET || process.env.S3_PENDING_BUCKET || ''
            const region = process.env.S3_REGION || process.env.AWS_REGION || 'ap-southeast-2'
            return `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`
          },
        },
      },
      bucket: process.env.S3_PUBLIC_BUCKET || process.env.S3_PENDING_BUCKET || '',
      config: {
        credentials: {
          accessKeyId:
            process.env.AWS_ACCESS_KEY_ID ||
            process.env.AWS_ACCESS_KEY ||
            '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || 'ap-southeast-2',
      },
      enabled: Boolean(
        (process.env.S3_PUBLIC_BUCKET || process.env.S3_PENDING_BUCKET) &&
        (process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY) &&
        process.env.AWS_SECRET_ACCESS_KEY
      ),
    }),
    // 2. Bucket privat untuk kiriman karya publik (antrean kurasi, pre-signed download)
    s3Storage({
      collections: {
        'submission-media': {
          signedDownloads: true,
        },
      },
      bucket: process.env.S3_SUBMISSION_BUCKET || '',
      config: {
        credentials: {
          accessKeyId:
            process.env.AWS_ACCESS_KEY_ID ||
            process.env.AWS_ACCESS_KEY ||
            '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || 'ap-southeast-2',
      },
      enabled: Boolean(
        process.env.S3_SUBMISSION_BUCKET &&
        (process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY) &&
        process.env.AWS_SECRET_ACCESS_KEY
      ),
    }),
  ],
})
