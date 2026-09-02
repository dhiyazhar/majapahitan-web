import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
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
  },
  collections: [
    // Warta & Publikasi
    Posts,
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
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
