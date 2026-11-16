import { createRequire } from 'node:module'
import { getPayload } from 'payload'

const require = createRequire(import.meta.url)
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

const { default: configPromise } = await import('../payload.config')
import {
  postsList,
  publikasiList,
  programSeedSchedule,
  type PostContent,
} from '../lib/content'

const INDO_MONTHS: Record<string, number> = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
}

const TYPE_BADGE_MAP: Record<string, string> = {
  'Prosiding Internasional': 'Prosiding Simposium',
  'Jurnal Terindeks Scopus': 'Jurnal Internasional',
  'Buku Monograf Referensi': 'Buku & Monograf',
  'Laporan Riset Terbuka': 'Laporan Arkeologis',
}

const SINTA_BADGE_MAP: Record<string, string> = {
  'Scopus / Crossref': 'Scopus',
}

function parseIndoDate(value: string): string | undefined {
  const match = value.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/)
  if (!match) return undefined
  const month = INDO_MONTHS[match[2]]
  if (month === undefined) return undefined
  return new Date(Date.UTC(Number(match[3]), month, Number(match[1]))).toISOString()
}

type LexicalNode = Record<string, unknown>

const textNode = (text: string): LexicalNode => ({
  type: 'text',
  text,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = (type: string, children: LexicalNode[]): LexicalNode => ({
  type,
  format: '',
  indent: 0,
  direction: 'ltr',
  version: 1,
  children,
})

const paragraph = (text: string): LexicalNode => block('paragraph', [textNode(text)])

const heading = (text: string): LexicalNode => ({
  ...block('heading', [textNode(text)]),
  tag: 'h2',
})

const quote = (text: string): LexicalNode => block('quote', [textNode(text)])

function toLexical(content: PostContent) {
  const children: LexicalNode[] = []
  if (content.lead) children.push(paragraph(content.lead))
  for (const p of content.paragraphs) children.push(paragraph(p))
  if (content.subheading) children.push(heading(content.subheading))
  if (content.quote) {
    const attribution = [content.quote.author, content.quote.role].filter(Boolean).join(', ')
    const full = attribution ? `${content.quote.text}\n\n${attribution}` : content.quote.text
    children.push(quote(full))
  }
  for (const p of content.secondaryParagraphs ?? []) children.push(paragraph(p))

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

type SeedInput = {
  collection: string
  slug: string
  data: Record<string, unknown>
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  const berita = postsList.filter((p) => p.category === 'berita').map((p) => ({
    slug: p.slug,
    data: {
      title: p.title,
      excerpt: p.excerpt,
      content: toLexical(p.content),
      status: 'published',
      publishedAt: parseIndoDate(p.publishedAt) ?? new Date().toISOString(),
      author: p.author,
    },
  }))

  const programs = postsList.filter((p) => p.category === 'program').map((p) => {
    const sched = programSeedSchedule[p.slug]
    return {
      slug: p.slug,
      data: {
        title: p.title,
        excerpt: p.excerpt,
        content: toLexical(p.content),
        status: 'published',
        programType: p.subcategory,
        eventDate: sched?.startsAt,
        eventEndDate: sched?.endsAt,
        registrationUrl: sched?.registrationUrl,
        registrationDeadline: sched?.registrationDeadline,
        publishedAt: parseIndoDate(p.publishedAt) ?? new Date().toISOString(),
      },
    }
  })

  const publikasi = publikasiList.map((p) => ({
    slug: p.slug,
    data: {
      title: p.title,
      abstract: p.abstract,
      status: 'published',
      year: p.year,
      publicationName: p.publicationName,
      volume: p.volume,
      issue: p.issue,
      pages: p.pages,
      typeBadge: TYPE_BADGE_MAP[p.typeBadge] ?? p.typeBadge,
      sintaBadge: p.sintaBadge ? SINTA_BADGE_MAP[p.sintaBadge] ?? p.sintaBadge : 'Non-SINTA',
      doi: p.doi,
      externalUrl: p.externalUrl,
      pdfUrl: p.pdfUrl,
      authors: p.authors.map((a) => ({ name: a })),
      keywords: p.keywords.map((k) => ({ keyword: k })),
      publishedAt: new Date().toISOString(),
    },
  }))

  const batches: Array<{ collection: string; items: SeedInput[] }> = [
    { collection: 'berita', items: berita as SeedInput[] },
    { collection: 'programs', items: programs as SeedInput[] },
    { collection: 'publikasi', items: publikasi as SeedInput[] },
  ]

  const summary: Record<string, { created: number; skipped: number }> = {}

  for (const { collection, items } of batches) {
    let created = 0
    let skipped = 0
    for (const item of items) {
      const existing = await payload.find({
        collection: collection as any,
        where: { slug: { equals: item.slug } },
        limit: 1,
        depth: 0,
      })
      if (existing.totalDocs > 0) {
        skipped += 1
        continue
      }
      await payload.create({
        collection: collection as any,
        data: { ...item.data, slug: item.slug },
        overrideAccess: true,
      })
      created += 1
    }
    summary[collection] = { created, skipped }
  }

  console.log('\nSeeding complete.')
  for (const [collection, counts] of Object.entries(summary)) {
    console.log(`  ${collection}: ${counts.created} created, ${counts.skipped} skipped`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})