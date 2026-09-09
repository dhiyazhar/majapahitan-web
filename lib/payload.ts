import 'server-only'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import type { Berita, Program, Publikasi, Media } from '@/payload-types'
import {
  type PostItem,
  type PostContent,
  type PublikasiItem,
  getPostsByCategory,
  getPostBySlug,
  getRelatedPosts,
  getAllPublikasi,
  getPublikasiBySlug as getFallbackPublikasiBySlug,
} from '@/lib/content'

// ============================================================================
// 1. SINGLETON PAYLOAD CLIENT (Cached in both Production & Development)
// ============================================================================

declare global {
  // eslint-disable-next-line no-var
  var __payloadClient: ReturnType<typeof getPayload> | undefined
}

let cachedPayloadPromise: ReturnType<typeof getPayload> | null = null

export const getPayloadClient = async () => {
  if (!cachedPayloadPromise) {
    if (process.env.NODE_ENV === 'development') {
      if (!globalThis.__payloadClient) {
        globalThis.__payloadClient = getPayload({ config: configPromise })
      }
      cachedPayloadPromise = globalThis.__payloadClient
    } else {
      // In production, instantiate once and cache the promise across all requests
      cachedPayloadPromise = getPayload({ config: configPromise })
    }
  }

  try {
    return await cachedPayloadPromise
  } catch (err) {
    cachedPayloadPromise = null
    if (globalThis.__payloadClient) {
      globalThis.__payloadClient = undefined
    }
    throw err
  }
}

// ============================================================================
// 2. CENTRALIZED ACCESS CONTROL GUARDS (DRY)
// ============================================================================

/**
 * Enforces:
 * - status: 'published'
 * - publishedAt: <= current date/time (no future scheduled leaks)
 */
export function getPublishedWhere(extraClauses: Where[] = []): Where {
  return {
    and: [
      { status: { equals: 'published' } },
      { publishedAt: { less_than_equal: new Date().toISOString() } },
      ...extraClauses,
    ],
  }
}

export function getPublishedBeritaWhere(extraClauses: Where[] = []): Where {
  return getPublishedWhere(extraClauses)
}

export function getPublishedProgramWhere(extraClauses: Where[] = []): Where {
  return getPublishedWhere(extraClauses)
}

export function getPublishedPublikasiWhere(extraClauses: Where[] = []): Where {
  return getPublishedWhere(extraClauses)
}

// ============================================================================
// 3. TYPE CONTRACTS
// ============================================================================

export type GetPostOptions = {
  q?: string
  page?: number
  limit?: number
}

export type GetBeritaOptions = GetPostOptions
export type GetProgramOptions = GetPostOptions

export type PaginatedPostsResult = {
  docs: PostItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  isFallback: boolean
  fallbackReason?: string
}

export type PaginatedPublikasiResult = {
  docs: PublikasiItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  isFallback: boolean
  fallbackReason?: string
}

// ============================================================================
// 4. DATA MAPPING & SERIALIZATION HELPERS
// ============================================================================

const INDO_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export function formatIndonesianDate(isoDate?: string | null): string {
  if (!isoDate) return 'Baru Saja'
  try {
    const d = new Date(isoDate)
    if (isNaN(d.getTime())) return String(isoDate)
    const day = d.getDate()
    const month = INDO_MONTHS[d.getMonth()]
    const year = d.getFullYear()
    return `${day} ${month} ${year}`
  } catch {
    return String(isoDate)
  }
}

export function formatProgramEventDate(startDate?: string | null, endDate?: string | null): string {
  if (!startDate) return 'Segera Hadir'
  try {
    const start = new Date(startDate)
    if (isNaN(start.getTime())) {
      return String(startDate)
    }

    const startDay = start.getDate()
    const startMonth = INDO_MONTHS[start.getMonth()]
    const startYear = start.getFullYear()

    if (!endDate) {
      return `${startDay} ${startMonth} ${startYear}`
    }

    const end = new Date(endDate)
    if (isNaN(end.getTime())) {
      return `${startDay} ${startMonth} ${startYear}`
    }

    const endDay = end.getDate()
    const endMonth = INDO_MONTHS[end.getMonth()]
    const endYear = end.getFullYear()

    if (start.getTime() === end.getTime() || (startDay === endDay && startMonth === endMonth && startYear === endYear)) {
      return `${startDay} ${startMonth} ${startYear}`
    }

    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay} – ${endDay} ${startMonth} ${startYear}`
    }

    if (startYear === endYear) {
      return `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`
    }

    return `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`
  } catch {
    return String(startDate)
  }
}

export function resolveMediaUrl(
  mediaField?: (number | null) | Media,
  fallback = '/images/berita/galeri-3d.jpg'
): string {
  if (!mediaField) return fallback
  if (typeof mediaField === 'object' && mediaField !== null && 'url' in mediaField && mediaField.url) {
    return mediaField.url
  }
  return fallback
}

/**
 * Extracts plain-text paragraph and quote strings from Payload Lexical RichText AST.
 */
export function serializeLexicalToPostContent(
  lexicalContent?: any,
  fallbackExcerpt = ''
): PostContent {
  if (!lexicalContent || !lexicalContent.root || !Array.isArray(lexicalContent.root.children)) {
    return {
      lead: fallbackExcerpt,
      paragraphs: fallbackExcerpt ? [fallbackExcerpt] : [],
    }
  }

  const paragraphs: string[] = []
  let subheading: string | undefined
  let quote: { text: string; author: string; role?: string } | undefined

  for (const node of lexicalContent.root.children) {
    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      const text = node.children
        .map((c: any) => c?.text || '')
        .join('')
        .trim()
      if (text) {
        paragraphs.push(text)
      }
    } else if (node.type === 'heading' && Array.isArray(node.children)) {
      const text = node.children
        .map((c: any) => c?.text || '')
        .join('')
        .trim()
      if (text && !subheading) {
        subheading = text
      }
    } else if (node.type === 'quote' && Array.isArray(node.children)) {
      const text = node.children
        .map((c: any) => c?.text || '')
        .join('')
        .trim()
      if (text && !quote) {
        quote = {
          text,
          author: 'PUI Seni Budaya Majapahitan',
        }
      }
    }
  }

  const lead = paragraphs.length > 0 ? paragraphs[0] : fallbackExcerpt
  const bodyParagraphs = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs

  return {
    lead,
    paragraphs: bodyParagraphs,
    subheading,
    quote,
  }
}

/**
 * Calculates or estimates reading time (e.g. "4 mnt baca").
 */
export function calculateReadingTime(lexicalContent?: any, excerpt?: string): string {
  let wordCount = 0

  if (lexicalContent?.root?.children && Array.isArray(lexicalContent.root.children)) {
    for (const node of lexicalContent.root.children) {
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          if (child.text) {
            wordCount += child.text.trim().split(/\s+/).length
          }
        }
      }
    }
  }

  if (wordCount === 0 && excerpt) {
    wordCount = excerpt.trim().split(/\s+/).length * 8
  }

  const minutes = Math.max(1, Math.ceil(wordCount / 180))
  return `${minutes} mnt baca`
}

/**
 * Dedicated Program item model for public pages.
 */
export type ProgramItem = {
  id: string
  slug: string
  title: string
  programType: string
  eventDate: string
  location: string
  ctaLabel: string
  ctaUrl?: string
  publishedAt: string
  readingTime: string
  image: string
  coverImage: string
  excerpt: string
  content: PostContent
  featured?: boolean
}

export type PaginatedProgramResult = {
  docs: ProgramItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  isFallback: boolean
  fallbackReason?: string
}

/**
 * Dedicated Berita item model for public pages.
 */
export type BeritaItem = {
  id: string
  slug: string
  title: string
  category: string
  subcategory?: string
  publishedAt: string
  author: string
  readingTime: string
  image: string
  coverImage: string
  excerpt: string
  content: PostContent
  tags: string[]
  featured?: boolean
}

export type PaginatedBeritaResult = {
  docs: BeritaItem[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  isFallback: boolean
  fallbackReason?: string
}

/**
 * Maps a Payload Berita document to BeritaItem.
 */
export function mapPayloadBeritaToBeritaItem(doc: Partial<Berita>): BeritaItem {
  const hasContent = Boolean(doc.content && typeof doc.content === 'object')
  const imageUrl = resolveMediaUrl(doc.coverImage, '/images/berita/galeri-3d.jpg')

  return {
    id: String(doc.id),
    slug: doc.slug || '',
    title: doc.title || 'Tanpa Judul',
    category: 'berita',
    subcategory: 'Warta Kebudayaan',
    publishedAt: formatIndonesianDate(doc.publishedAt),
    author: doc.author || 'PUI Seni Budaya Majapahitan',
    readingTime: calculateReadingTime(doc.content, doc.excerpt),
    image: imageUrl,
    coverImage: imageUrl,
    excerpt: doc.excerpt || '',
    content: hasContent
      ? serializeLexicalToPostContent(doc.content, doc.excerpt)
      : { lead: doc.excerpt || '', paragraphs: [] },
    tags: ['Majapahit', 'Konservasi', 'Warta'],
    featured: false,
  }
}

/**
 * Maps a Payload Program document to ProgramItem.
 */
export function mapPayloadProgramToProgramItem(doc: Partial<Program>): ProgramItem {
  const hasContent = Boolean(doc.content && typeof doc.content === 'object')
  const imageUrl = resolveMediaUrl(doc.coverImage, '/images/pameran/arsitektur.jpg')

  return {
    id: String(doc.id),
    slug: doc.slug || '',
    title: doc.title || 'Tanpa Judul',
    programType: doc.programType || 'Program Edukasi',
    eventDate: formatProgramEventDate(doc.eventDate, (doc as any).eventEndDate),
    location: doc.location || 'Museum Virtual (Daring)',
    ctaLabel: doc.ctaLabel || 'Daftar / Ikuti Program',
    ctaUrl: doc.ctaUrl || undefined,
    publishedAt: formatIndonesianDate(doc.publishedAt),
    readingTime: calculateReadingTime(doc.content, doc.excerpt),
    image: imageUrl,
    coverImage: imageUrl,
    excerpt: doc.excerpt || '',
    content: hasContent
      ? serializeLexicalToPostContent(doc.content, doc.excerpt)
      : { lead: doc.excerpt || '', paragraphs: [] },
    featured: false,
  }
}

// Backward-compatible mappers for existing callers
export const mapPayloadBeritaToPostItem = mapPayloadBeritaToBeritaItem as unknown as (doc: Partial<Berita>) => PostItem
export const mapPayloadProgramToPostItem = mapPayloadProgramToProgramItem as unknown as (doc: Partial<Program>) => PostItem

/**
 * Maps a Payload Publikasi document to PublikasiItem.
 */
export function mapPayloadPublikasiToPublikasiItem(doc: Partial<Publikasi>): PublikasiItem {
  const authorsList = (doc.authors || [])
    .map((a) => (typeof a === 'object' && a !== null ? a.name : String(a)))
    .filter(Boolean)

  const keywordsList = (doc.keywords || [])
    .map((k) => (typeof k === 'object' && k !== null ? k.keyword : String(k)))
    .filter(Boolean)

  const vol = (doc as any).volume ? String((doc as any).volume).trim() : ''
  const iss = (doc as any).issue ? String((doc as any).issue).trim() : ''
  const pgs = (doc as any).pages ? String((doc as any).pages).trim() : ''

  let displayPubName = doc.publicationName || ''
  const volIssueParts: string[] = []
  if (vol) volIssueParts.push(`Vol. ${vol}`)
  if (iss) volIssueParts.push(`No. ${iss}`)
  if (volIssueParts.length > 0 && !displayPubName.includes('Vol.')) {
    displayPubName = `${displayPubName} · ${volIssueParts.join(' ')}`
  }

  return {
    id: String(doc.id),
    slug: doc.slug || '',
    title: doc.title || 'Tanpa Judul',
    authors: authorsList.length > 0 ? authorsList : ['PUI Seni Budaya Majapahitan UNESA'],
    publicationName: displayPubName,
    volume: vol || undefined,
    issue: iss || undefined,
    pages: pgs || undefined,
    year: doc.year || String(new Date().getFullYear()),
    typeBadge: doc.typeBadge || 'Jurnal Ilmiah Nasional',
    sintaBadge: doc.sintaBadge && doc.sintaBadge !== 'Non-SINTA' ? doc.sintaBadge : undefined,
    doi: doc.doi || undefined,
    externalUrl: doc.externalUrl || 'https://ejournal.unesa.ac.id',
    pdfUrl: doc.pdfUrl || undefined,
    abstract: doc.abstract || '',
    keywords: keywordsList,
    citation: (doc as any).citation || undefined,
  }
}

// ============================================================================
// 5. FALLBACK HANDLERS
// ============================================================================

function getFallbackBeritaResult(
  options: GetBeritaOptions = {},
  reason: string
): PaginatedBeritaResult {
  const allBerita = getPostsByCategory('berita')
  const q = options.q?.toLowerCase().trim() || ''
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(50, Math.max(1, options.limit || 9))

  const filtered = q
    ? allBerita.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : allBerita

  const totalDocs = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const startIndex = (page - 1) * limit
  const paginatedDocs: BeritaItem[] = filtered.slice(startIndex, startIndex + limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: 'berita',
    subcategory: p.subcategory || 'Warta Kebudayaan',
    publishedAt: p.publishedAt,
    author: p.author,
    readingTime: p.readingTime,
    image: p.image,
    coverImage: p.image,
    excerpt: p.excerpt,
    content: p.content,
    tags: p.tags,
    featured: p.featured,
  }))

  return {
    docs: paginatedDocs,
    totalDocs,
    limit,
    totalPages,
    page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    isFallback: true,
    fallbackReason: reason,
  }
}

function getFallbackProgramResult(
  options: GetProgramOptions = {},
  reason: string
): PaginatedProgramResult {
  const allPrograms = getPostsByCategory('program')
  const q = options.q?.toLowerCase().trim() || ''
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(50, Math.max(1, options.limit || 9))

  const filtered = q
    ? allPrograms.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : allPrograms

  const totalDocs = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const startIndex = (page - 1) * limit
  const paginatedDocs: ProgramItem[] = filtered.slice(startIndex, startIndex + limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    programType: p.subcategory || 'Pameran Virtual',
    eventDate: p.publishedAt || 'Segera Hadir',
    location: 'Museum Virtual (Daring)',
    ctaLabel: 'Masuk Galeri',
    ctaUrl: `/program/${p.slug}`,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
    image: p.image,
    coverImage: p.image,
    excerpt: p.excerpt,
    content: p.content,
    featured: p.featured,
  }))

  return {
    docs: paginatedDocs,
    totalDocs,
    limit,
    totalPages,
    page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    isFallback: true,
    fallbackReason: reason,
  }
}

function getFallbackPublikasiResult(
  options: GetPostOptions = {},
  reason: string
): PaginatedPublikasiResult {
  const allPub = getAllPublikasi()
  const q = options.q?.toLowerCase().trim() || ''
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(50, Math.max(1, options.limit || 9))

  const filtered = q
    ? allPub.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.abstract.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
      )
    : allPub

  const totalDocs = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const startIndex = (page - 1) * limit
  const paginatedDocs = filtered.slice(startIndex, startIndex + limit)

  return {
    docs: paginatedDocs,
    totalDocs,
    limit,
    totalPages,
    page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    isFallback: true,
    fallbackReason: reason,
  }
}

// ============================================================================
// 6. PUBLIC QUERY API — BERITA (Collection: 'berita')
// ============================================================================

export async function getBeritaPosts(
  options: GetBeritaOptions = {}
): Promise<PaginatedBeritaResult> {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(50, Math.max(1, options.limit || 9))

  try {
    const payload = await getPayloadClient()

    const extraClauses: Where[] = []
    if (options.q && options.q.trim()) {
      const searchTerm = options.q.trim()
      extraClauses.push({
        or: [
          { title: { like: searchTerm } },
          { excerpt: { like: searchTerm } },
        ],
      })
    }

    const where = getPublishedBeritaWhere(extraClauses)

    const result = await payload.find({
      collection: 'berita',
      where,
      page,
      limit,
      sort: '-publishedAt',
      depth: 1,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        author: true,
      },
    })

    if (result.totalDocs > 0 || (options.q && options.q.trim())) {
      return {
        docs: result.docs.map(mapPayloadBeritaToBeritaItem),
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page || page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage || null,
        nextPage: result.nextPage || null,
        isFallback: false,
      }
    }

    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Berita | Reason: Database collection 'berita' has 0 published items. Using mock seam.`
    )
    return getFallbackBeritaResult(options, 'Koleksi database masih kosong.')
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Berita | Query: ${JSON.stringify(options)} | Error: ${err?.message || err}`
    )
    return getFallbackBeritaResult(options, err?.message || 'Database connection error')
  }
}

export async function getBeritaBySlug(slug: string): Promise<BeritaItem | undefined> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedBeritaWhere([
      { slug: { equals: slug } },
    ])

    const result = await payload.find({
      collection: 'berita',
      where,
      limit: 1,
      depth: 1,
    })

    if (result.docs && result.docs.length > 0) {
      return mapPayloadBeritaToBeritaItem(result.docs[0])
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: BeritaDetail | Slug: ${slug} | Error: ${err?.message || err}`
    )
  }

  const fallback = getPostBySlug(slug)
  if (fallback && fallback.category === 'berita') {
    return {
      id: fallback.id,
      slug: fallback.slug,
      title: fallback.title,
      category: 'berita',
      subcategory: fallback.subcategory || 'Warta Kebudayaan',
      publishedAt: fallback.publishedAt,
      author: fallback.author,
      readingTime: fallback.readingTime,
      image: fallback.image,
      coverImage: fallback.image,
      excerpt: fallback.excerpt,
      content: fallback.content,
      tags: fallback.tags,
      featured: fallback.featured,
    }
  }
  return undefined
}

export async function getRelatedBerita(
  currentSlug: string,
  limit = 3
): Promise<BeritaItem[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedBeritaWhere([
      { slug: { not_equals: currentSlug } },
    ])

    const result = await payload.find({
      collection: 'berita',
      where,
      limit,
      depth: 1,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        author: true,
      },
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map(mapPayloadBeritaToBeritaItem)
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: RelatedBerita | Slug: ${currentSlug} | Error: ${err?.message || err}`
    )
  }

  return getRelatedPosts(currentSlug, 'berita', limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: 'berita',
    subcategory: p.subcategory || 'Warta Kebudayaan',
    publishedAt: p.publishedAt,
    author: p.author,
    readingTime: p.readingTime,
    image: p.image,
    coverImage: p.image,
    excerpt: p.excerpt,
    content: p.content,
    tags: p.tags,
    featured: p.featured,
  }))
}

export async function getAllBeritaSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedBeritaWhere()

    const result = await payload.find({
      collection: 'berita',
      where,
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
      },
      pagination: false,
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((d) => d.slug).filter(Boolean)
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: AllBeritaSlugs | Error: ${err?.message || err}`
    )
  }

  return getPostsByCategory('berita').map((p) => p.slug)
}

// ============================================================================
// 7. PUBLIC QUERY API — PROGRAM (Collection: 'programs')
// ============================================================================

export async function getProgramPosts(
  options: GetProgramOptions = {}
): Promise<PaginatedProgramResult> {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(50, Math.max(1, options.limit || 9))

  try {
    const payload = await getPayloadClient()

    const extraClauses: Where[] = []
    if (options.q && options.q.trim()) {
      const searchTerm = options.q.trim()
      extraClauses.push({
        or: [
          { title: { like: searchTerm } },
          { excerpt: { like: searchTerm } },
        ],
      })
    }

    const where = getPublishedProgramWhere(extraClauses)

    const result = await payload.find({
      collection: 'programs',
      where,
      page,
      limit,
      sort: '-publishedAt',
      depth: 1,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        eventDate: true,
        eventEndDate: true,
        programType: true,
        location: true,
        ctaLabel: true,
        ctaUrl: true,
      },
    })

    if (result.totalDocs > 0 || (options.q && options.q.trim())) {
      return {
        docs: result.docs.map(mapPayloadProgramToProgramItem),
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page || page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage || null,
        nextPage: result.nextPage || null,
        isFallback: false,
      }
    }

    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Program | Reason: Database collection 'programs' has 0 published items. Using mock seam.`
    )
    return getFallbackProgramResult(options, 'Koleksi database masih kosong.')
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Program | Query: ${JSON.stringify(options)} | Error: ${err?.message || err}`
    )
    return getFallbackProgramResult(options, err?.message || 'Database connection error')
  }
}

export async function getProgramBySlug(slug: string): Promise<ProgramItem | undefined> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedProgramWhere([
      { slug: { equals: slug } },
    ])

    const result = await payload.find({
      collection: 'programs',
      where,
      limit: 1,
      depth: 1,
    })

    if (result.docs && result.docs.length > 0) {
      return mapPayloadProgramToProgramItem(result.docs[0])
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: ProgramDetail | Slug: ${slug} | Error: ${err?.message || err}`
    )
  }

  const fallback = getPostBySlug(slug)
  if (fallback && fallback.category === 'program') {
    return {
      id: fallback.id,
      slug: fallback.slug,
      title: fallback.title,
      programType: fallback.subcategory || 'Program & Kegiatan',
      eventDate: fallback.publishedAt || 'Segera Hadir',
      location: 'Museum Virtual (Daring)',
      ctaLabel: 'Masuk Galeri',
      ctaUrl: `/program/${fallback.slug}`,
      publishedAt: fallback.publishedAt,
      readingTime: fallback.readingTime,
      image: fallback.image,
      coverImage: fallback.image,
      excerpt: fallback.excerpt,
      content: fallback.content,
      featured: fallback.featured,
    }
  }
  return undefined
}

export async function getRelatedProgram(
  currentSlug: string,
  limit = 3
): Promise<ProgramItem[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedProgramWhere([
      { slug: { not_equals: currentSlug } },
    ])

    const result = await payload.find({
      collection: 'programs',
      where,
      limit,
      depth: 1,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        eventDate: true,
        eventEndDate: true,
        programType: true,
        location: true,
        ctaLabel: true,
        ctaUrl: true,
      },
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map(mapPayloadProgramToProgramItem)
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: RelatedProgram | Slug: ${currentSlug} | Error: ${err?.message || err}`
    )
  }

  return getRelatedPosts(currentSlug, 'program', limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    programType: p.subcategory || 'Program & Kegiatan',
    eventDate: p.publishedAt || 'Segera Hadir',
    location: 'Museum Virtual (Daring)',
    ctaLabel: 'Masuk Galeri',
    ctaUrl: `/program/${p.slug}`,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
    image: p.image,
    coverImage: p.image,
    excerpt: p.excerpt,
    content: p.content,
    featured: p.featured,
  }))
}

export async function getAllProgramSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedProgramWhere()

    const result = await payload.find({
      collection: 'programs',
      where,
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
      },
      pagination: false,
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((d) => d.slug).filter(Boolean)
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: AllProgramSlugs | Error: ${err?.message || err}`
    )
  }

  return getPostsByCategory('program').map((p) => p.slug)
}

// ============================================================================
// 8. PUBLIC QUERY API — PUBLIKASI (Collection: 'publikasi')
// ============================================================================

export async function getAllPublikasiPosts(): Promise<PublikasiItem[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedPublikasiWhere()

    const result = await payload.find({
      collection: 'publikasi',
      where,
      limit: 100,
      sort: '-year',
      depth: 0,
    })

    if (result.totalDocs > 0) {
      return result.docs.map(mapPayloadPublikasiToPublikasiItem)
    }

    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Publikasi | Reason: Database collection 'publikasi' has 0 published items. Using mock seam.`
    )
    return getAllPublikasi()
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Publikasi | Error: ${err?.message || err}`
    )
    return getAllPublikasi()
  }
}

export async function getPublikasiPosts(
  options: GetPostOptions = {}
): Promise<PaginatedPublikasiResult> {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(50, Math.max(1, options.limit || 9))

  try {
    const payload = await getPayloadClient()

    const extraClauses: Where[] = []
    if (options.q && options.q.trim()) {
      const searchTerm = options.q.trim()
      extraClauses.push({
        or: [
          { title: { like: searchTerm } },
          { abstract: { like: searchTerm } },
          { publicationName: { like: searchTerm } },
        ],
      })
    }

    const where = getPublishedPublikasiWhere(extraClauses)

    const result = await payload.find({
      collection: 'publikasi',
      where,
      page,
      limit,
      sort: '-year',
      depth: 0,
    })

    if (result.totalDocs > 0 || (options.q && options.q.trim())) {
      return {
        docs: result.docs.map(mapPayloadPublikasiToPublikasiItem),
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page || page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage || null,
        nextPage: result.nextPage || null,
        isFallback: false,
      }
    }

    return getFallbackPublikasiResult(options, 'Koleksi database masih kosong.')
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: Publikasi | Query: ${JSON.stringify(options)} | Error: ${err?.message || err}`
    )
    return getFallbackPublikasiResult(options, err?.message || 'Database connection error')
  }
}

export async function getPublikasiBySlug(slug: string): Promise<PublikasiItem | undefined> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedPublikasiWhere([
      { slug: { equals: slug } },
    ])

    const result = await payload.find({
      collection: 'publikasi',
      where,
      limit: 1,
      depth: 0,
    })

    if (result.docs && result.docs.length > 0) {
      return mapPayloadPublikasiToPublikasiItem(result.docs[0])
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: PublikasiDetail | Slug: ${slug} | Error: ${err?.message || err}`
    )
  }

  return getFallbackPublikasiBySlug(slug)
}

export async function getRelatedPublikasi(
  currentSlug: string,
  limit = 2
): Promise<PublikasiItem[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedPublikasiWhere([
      { slug: { not_equals: currentSlug } },
    ])

    const result = await payload.find({
      collection: 'publikasi',
      where,
      limit,
      depth: 0,
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map(mapPayloadPublikasiToPublikasiItem)
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: RelatedPublikasi | Slug: ${currentSlug} | Error: ${err?.message || err}`
    )
  }

  return getAllPublikasi()
    .filter((i) => i.slug !== currentSlug)
    .slice(0, limit)
}

export async function getAllPublikasiSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const where = getPublishedPublikasiWhere()

    const result = await payload.find({
      collection: 'publikasi',
      where,
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
      },
      pagination: false,
    })

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((d) => d.slug).filter(Boolean)
    }
  } catch (err: any) {
    console.warn(
      `[CMS_FALLBACK_ACTIVE] Module: AllPublikasiSlugs | Error: ${err?.message || err}`
    )
  }

  return getAllPublikasi().map((p) => p.slug)
}
