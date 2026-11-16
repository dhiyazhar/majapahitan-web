import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import { id as idLocale } from '@payloadcms/translations/languages/id'
import { en as enLocale } from '@payloadcms/translations/languages/en'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
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
})
