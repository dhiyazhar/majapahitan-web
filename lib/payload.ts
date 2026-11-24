import 'server-only'
import {
  formatProgramDateRange,
  formatProgramTime,
  getProgramStatus,
  isRegistrationOpen,
  resolveProgramCtaLabel,
  type ProgramStatus,
} from '@/lib/program-status'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import type { Berita, Program, Publikasi, Media } from '@/payload-types'
import {
  programSeedSchedule,
  type PostItem,
  type PostContent,
  type PublikasiItem,
  type TeamMember,
  heroSlides,
  type HeroSlide,
  tentang,
  tentangPage,
  konservasiPage,
  situsList,
  type SitusItem,
  artefakList,
  type ArtefakItem,
  karyaList,
  type KaryaItem,
  koleksis,
  type Koleksi,
  kerjasamaLogos,
  contactInfo,
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
export type GetProgramOptions = GetPostOptions & {
  /** Exact `programType` value (one of the CMS select options). */
  type?: string
}

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

/**
 * Timing fields for a program, derived at render time from its schedule.
 * Used by the CMS mapper and by the seed fallbacks (which have no schedule).
 */
function programSchedule(input: {
  startsAt?: string | null
  endsAt?: string | null
  registrationUrl?: string | null
  registrationDeadline?: string | null
  ctaLabel?: string | null
  programType?: string | null
}) {
  const status = getProgramStatus(input.startsAt, input.endsAt)
  const registrationOpen = isRegistrationOpen(
    input.registrationUrl,
    input.startsAt,
    input.endsAt,
    input.registrationDeadline,
  )
  return {
    eventDate: formatProgramDateRange(input.startsAt, input.endsAt),
    eventTime: formatProgramTime(input.startsAt, input.endsAt),
    startsAt: input.startsAt || undefined,
    endsAt: input.endsAt || undefined,
    status,
    registrationUrl: input.registrationUrl || undefined,
    registrationDeadline: input.registrationDeadline || undefined,
    registrationOpen,
    ctaLabel: resolveProgramCtaLabel({
      ctaLabel: input.ctaLabel,
      programType: input.programType,
      status,
      registrationOpen,
    }),
  }
}

export function formatProgramEventDate(startDate?: string | null, endDate?: string | null): string {
  return formatProgramDateRange(startDate, endDate)
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
  /** Formatted date range in WIB, or "Segera Hadir". */
  eventDate: string
  /** "09.00–12.00 WIB"; undefined for all-day events or when unscheduled. */
  eventTime?: string
  /** Raw ISO timestamps from the CMS; absent for unscheduled or seed items. */
  startsAt?: string
  endsAt?: string
  /** Derived from startsAt/endsAt when the page renders. Undefined = no schedule. */
  status?: ProgramStatus
  registrationUrl?: string
  registrationDeadline?: string
  /** True while the registration link should be offered. */
  registrationOpen: boolean
  location: string
  /** Editor's label, or one chosen from status and type when left empty. */
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
    ...programSchedule({
      startsAt: doc.eventDate,
      endsAt: doc.eventEndDate,
      registrationUrl: doc.registrationUrl,
      registrationDeadline: doc.registrationDeadline,
      ctaLabel: doc.ctaLabel,
      programType: doc.programType,
    }),
    location: doc.location || 'Museum Virtual (Daring)',
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

  const byType = options.type
    ? allPrograms.filter((p) => p.subcategory === options.type)
    : allPrograms
  const filtered = q
    ? byType.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : byType

  const totalDocs = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const startIndex = (page - 1) * limit
  const paginatedDocs: ProgramItem[] = filtered.slice(startIndex, startIndex + limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    programType: p.subcategory || 'Pameran Virtual',
    ...programSchedule({ ...programSeedSchedule[p.slug], programType: p.subcategory, ctaLabel: null }),
    location: 'Museum Virtual (Daring)',
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

    if (options.type) {
      extraClauses.push({ programType: { equals: options.type } })
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
        registrationUrl: true,
        registrationDeadline: true,
      },
    })

    // An empty filtered result is a real answer only if the collection has programs at all;
    // an empty collection still falls back to the seed data below.
    const hasFilter = Boolean((options.q && options.q.trim()) || options.type)
    const collectionHasDocs =
      result.totalDocs > 0 ||
      (hasFilter &&
        (await payload.count({ collection: 'programs', where: getPublishedProgramWhere() })).totalDocs > 0)

    if (collectionHasDocs) {
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
      ...programSchedule({ ...programSeedSchedule[fallback.slug], programType: fallback.subcategory, ctaLabel: null }),
      location: 'Museum Virtual (Daring)',
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
        registrationUrl: true,
        registrationDeadline: true,
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
    ...programSchedule({ ...programSeedSchedule[p.slug], programType: p.subcategory, ctaLabel: null }),
    location: 'Museum Virtual (Daring)',
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

export type PageTentangData = {
  hero: {
    title: string
    subtitle: string
    image: string
  }
  visiMisi: {
    title: string
    visi: string
    misi: string[]
  }
  sejarah: {
    title: string
    image: string
    caption: string
    paragraphs: string[]
  }
  tim: {
    title: string
    subtitle: string
    members: TeamMember[]
  }
  mitra: {
    title: string
    subtitle: string
    items: Array<{ id: string; name: string; logo: string; url?: string }>
  }
  kontak: {
    title: string
    description: string
    office: string
    operatingHours: string
    email: string
    mapsUrl: string
    mapsEmbedUrl: string
  }
}

export async function getPageTentangData(): Promise<PageTentangData> {
  const fallback: PageTentangData = {
    hero: {
      title: tentangPage.hero.title,
      subtitle: tentangPage.hero.subtitle,
      image: tentangPage.hero.image,
    },
    visiMisi: {
      title: tentangPage.visiMisi.title,
      visi: tentangPage.visiMisi.visi,
      misi: tentangPage.visiMisi.misi,
    },
    sejarah: {
      title: tentangPage.sejarah.title,
      image: tentangPage.sejarah.image,
      caption: 'Artefak Koleksi PUI Seni Budaya Majapahitan',
      paragraphs: tentangPage.sejarah.paragraphs,
    },
    tim: {
      title: tentangPage.tim.title,
      subtitle: tentangPage.tim.subtitle,
      members: tentangPage.tim.members,
    },
    mitra: {
      title: tentangPage.mitra.title,
      subtitle: tentangPage.mitra.subtitle,
      items: kerjasamaLogos,
    },
    kontak: {
      title: tentangPage.kontak.title,
      description: tentangPage.kontak.description,
      office: `${contactInfo.office}, ${contactInfo.university}`,
      operatingHours: contactInfo.operatingHours,
      email: contactInfo.email,
      mapsUrl: contactInfo.googleMaps.href,
      mapsEmbedUrl:
        'https://maps.google.com/maps?q=Gedung+Laboratorium+Anti+Doping+Universitas+Negeri+Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
  }

  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'page-tentang',
      depth: 1,
    })

    if (!doc) return fallback

    const heroImage = doc.heroImage
      ? resolveMediaUrl(doc.heroImage as any, fallback.hero.image)
      : fallback.hero.image
    const sejarahImage = doc.sejarahImage
      ? resolveMediaUrl(doc.sejarahImage as any, fallback.sejarah.image)
      : fallback.sejarah.image

    const misi =
      Array.isArray(doc.misi) && doc.misi.length > 0
        ? doc.misi.map((m: any) => m.point).filter(Boolean)
        : fallback.visiMisi.misi

    const paragraphs =
      Array.isArray(doc.sejarahParagraphs) && doc.sejarahParagraphs.length > 0
        ? doc.sejarahParagraphs.map((p: any) => p.text).filter(Boolean)
        : fallback.sejarah.paragraphs

    const members: TeamMember[] =
      Array.isArray(doc.timMembers) && doc.timMembers.length > 0
        ? doc.timMembers.map((m: any, idx: number) => ({
            id: m.id || `member-${idx}`,
            name: m.name || '',
            role: m.role || '',
            photo: m.photo
              ? resolveMediaUrl(m.photo, '/images/tentang/tim-1.jpg')
              : '/images/tentang/tim-1.jpg',
          }))
        : fallback.tim.members

    const mitraItems =
      Array.isArray(doc.mitraList) && doc.mitraList.length > 0
        ? doc.mitraList.map((m: any, idx: number) => ({
            id: m.id || `mitra-${idx}`,
            name: m.name || '',
            logo: m.logo
              ? resolveMediaUrl(m.logo, '/images/logos/unesa.png')
              : '/images/logos/unesa.png',
            url: m.url || undefined,
          }))
        : fallback.mitra.items

    return {
      hero: {
        title: doc.heroTitle || fallback.hero.title,
        subtitle: doc.heroSubtitle || fallback.hero.subtitle,
        image: heroImage,
      },
      visiMisi: {
        title: doc.visiTitle || fallback.visiMisi.title,
        visi: doc.visi || fallback.visiMisi.visi,
        misi,
      },
      sejarah: {
        title: doc.sejarahTitle || fallback.sejarah.title,
        image: sejarahImage,
        caption: doc.sejarahCaption || fallback.sejarah.caption,
        paragraphs,
      },
      tim: {
        title: doc.timTitle || fallback.tim.title,
        subtitle: doc.timSubtitle || fallback.tim.subtitle,
        members,
      },
      mitra: {
        title: doc.mitraTitle || fallback.mitra.title,
        subtitle: doc.mitraSubtitle || fallback.mitra.subtitle,
        items: mitraItems,
      },
      kontak: {
        title: doc.kontakTitle || fallback.kontak.title,
        description: doc.kontakDescription || fallback.kontak.description,
        office: doc.kontakAddress || fallback.kontak.office,
        operatingHours: doc.kontakOperatingHours || fallback.kontak.operatingHours,
        email: doc.kontakEmail || fallback.kontak.email,
        mapsUrl: doc.kontakMapsUrl || fallback.kontak.mapsUrl,
        mapsEmbedUrl: doc.kontakMapsEmbedUrl || fallback.kontak.mapsEmbedUrl,
      },
    }
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Global: PageTentang | Error: ${err?.message || err}`)
    return fallback
  }
}

export type PageBerandaData = {
  heroSlides: HeroSlide[]
  tentang: typeof tentang
}

/**
 * Fetches dynamic content for Landing Page Beranda (/) with seamless mock fallback.
 */
export async function getPageBerandaData(): Promise<PageBerandaData> {
  const fallback: PageBerandaData = {
    heroSlides,
    tentang,
  }

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'page-beranda',
      depth: 1,
    })

    if (!doc) return fallback

    const mappedSlides: HeroSlide[] =
      Array.isArray(doc.heroSlides) && doc.heroSlides.length > 0
        ? doc.heroSlides.map((s: any, idx: number) => {
            const fallbackSlide = heroSlides[idx] || heroSlides[0]
            return {
              id: s.id || `slide-${idx + 1}`,
              title: s.title || fallbackSlide.title,
              subtitle: s.subtitle || fallbackSlide.subtitle,
              image: s.image
                ? resolveMediaUrl(s.image, fallbackSlide.image)
                : fallbackSlide.image,
              primary: {
                label: s.primaryLabel || fallbackSlide.primary.label,
                href: s.primaryHref || fallbackSlide.primary.href,
              },
              secondary: {
                label: s.secondaryLabel || fallbackSlide.secondary.label,
                href: s.secondaryHref || fallbackSlide.secondary.href,
              },
            }
          })
        : fallback.heroSlides

    const mappedTentang = {
      eyebrow: doc.tentangEyebrow || fallback.tentang.eyebrow,
      title: doc.tentangTitle || fallback.tentang.title,
      body: doc.tentangBody || fallback.tentang.body,
      cta: fallback.tentang.cta,
      image: (doc as any).tentangImage
        ? resolveMediaUrl((doc as any).tentangImage, fallback.tentang.image)
        : fallback.tentang.image,
    }

    return {
      heroSlides: mappedSlides,
      tentang: mappedTentang,
    }
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Global: PageBeranda | Error: ${err?.message || err}`)
    return fallback
  }
}

export type PartnerLogoItem = {
  id: string
  name: string
  logo: string
  url?: string
}

/**
 * Fetches institutional partner logos from PageTentang global with fallback.
 * Used across /tentang and site-wide Footer.
 */
export async function getPartnerLogos(): Promise<PartnerLogoItem[]> {
  const fallback: PartnerLogoItem[] = kerjasamaLogos

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'page-tentang',
      depth: 1,
    })

    if (!doc || !Array.isArray(doc.mitraList) || doc.mitraList.length === 0) {
      return fallback
    }

    return doc.mitraList.map((m: any, idx: number) => ({
      id: m.id || `partner-${idx}`,
      name: m.name || '',
      logo: m.logo
        ? resolveMediaUrl(m.logo, fallback[idx]?.logo || '/images/logos/unesa.png')
        : (fallback[idx]?.logo || '/images/logos/unesa.png'),
      url: m.url || undefined,
    }))
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Global: PageTentang (Mitra) | Error: ${err?.message || err}`)
    return fallback
  }
}

export type PageKonservasiData = typeof konservasiPage

/**
 * Fetches dynamic content for Museum Konservasi (/konservasi) with seamless mock fallback.
 */
export async function getPageKonservasiData(): Promise<PageKonservasiData> {
  const fallback: PageKonservasiData = konservasiPage

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'page-konservasi',
      depth: 1,
    })

    if (!doc) return fallback

    const heroImage = (doc as any).heroImage
      ? resolveMediaUrl((doc as any).heroImage, fallback.hero.image)
      : fallback.hero.image

    const situsImage = (doc as any).pilarSitusImage
      ? resolveMediaUrl((doc as any).pilarSitusImage, fallback.pilar[0].image)
      : fallback.pilar[0].image

    const artefakImage = (doc as any).pilarArtefakImage
      ? resolveMediaUrl((doc as any).pilarArtefakImage, fallback.pilar[1].image)
      : fallback.pilar[1].image

    const paragraphs =
      Array.isArray(doc.pengantarParagraphs) && doc.pengantarParagraphs.length > 0
        ? doc.pengantarParagraphs.map((p: any) => p.text).filter(Boolean)
        : fallback.pengantar.paragraphs

    return {
      ...fallback,
      hero: {
        ...fallback.hero,
        title: doc.heroTitle || fallback.hero.title,
        subtitle: doc.heroSubtitle || fallback.hero.subtitle,
        image: heroImage,
      },
      pengantar: {
        ...fallback.pengantar,
        paragraphs,
      },
      pilar: [
        {
          ...fallback.pilar[0],
          image: situsImage,
        },
        {
          ...fallback.pilar[1],
          image: artefakImage,
        },
      ],
    }
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Global: PageKonservasi | Error: ${err?.message || err}`)
    return fallback
  }
}

/**
 * Fetches all Situs items from Payload CMS with fallback.
 */
export async function getSitusList(): Promise<SitusItem[]> {
  const fallback = situsList

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'situs',
      limit: 100,
      depth: 1,
    })

    if (!result || !Array.isArray(result.docs) || result.docs.length === 0) {
      return fallback
    }

    return result.docs.map((doc: any, idx: number) => ({
      id: doc.slug || String(doc.id) || `situs-${idx}`,
      name: doc.name || 'Tanpa Nama',
      location: doc.location || 'Jawa Timur',
      era: doc.era || 'Abad ke-14 Masehi',
      description: doc.description || '',
      image: resolveMediaUrl(doc.image, fallback[idx % fallback.length]?.image || '/images/koleksi/gapura.jpg'),
      status: (doc.status as any) || 'Terdokumentasi',
    }))
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Collection: Situs | Error: ${err?.message || err}`)
    return fallback
  }
}

/**
 * Fetches all Artefak items from Payload CMS with fallback.
 */
export async function getArtefakList(): Promise<ArtefakItem[]> {
  const fallback = artefakList

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'artefak',
      limit: 100,
      depth: 1,
    })

    if (!result || !Array.isArray(result.docs) || result.docs.length === 0) {
      return fallback
    }

    return result.docs.map((doc: any, idx: number) => ({
      id: doc.slug || String(doc.id) || `artefak-${idx}`,
      name: doc.name || 'Tanpa Nama',
      category: (doc.category as any) || 'Arca & Patung',
      era: doc.era || 'Abad ke-14 Masehi',
      material: doc.material || 'Batu Andesit',
      description: doc.description || '',
      image: resolveMediaUrl(doc.image, fallback[idx % fallback.length]?.image || '/images/koleksi/prasasti.jpg'),
    }))
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Collection: Artefak | Error: ${err?.message || err}`)
    return fallback
  }
}

/**
 * Maps KaryaPublik category select values to human readable subcategories.
 */
function mapPublikCategory(cat: string): string {
  switch (cat) {
    case 'seni-rupa':
      return 'Lukisan & Gambar'
    case 'fotografi':
      return 'Fotografi Arsitektur'
    case 'desain-ilustrasi':
    case 'model-3d':
    case 'riset-visual':
      return 'Seni Digital & 3D'
    case 'lainnya':
    default:
      return 'Patung & Seni Kriya'
  }
}

/**
 * Fetches all Karya (Museum & Publik) with fallback to mock karyaList.
 */
export async function getAllKaryaData(): Promise<KaryaItem[]> {
  const fallback = karyaList

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const [museumResult, publikResult] = await Promise.all([
      payload.find({
        collection: 'karya-museum',
        where: { status: { equals: 'published' } },
        limit: 100,
        depth: 1,
      }),
      payload.find({
        collection: 'karya-publik',
        where: { status: { equals: 'published' } },
        limit: 100,
        depth: 1,
      }),
    ])

    const hasMuseum = Array.isArray(museumResult?.docs) && museumResult.docs.length > 0
    const hasPublik = Array.isArray(publikResult?.docs) && publikResult.docs.length > 0

    if (!hasMuseum && !hasPublik) {
      return fallback
    }

    const museumItems: KaryaItem[] = (museumResult?.docs || []).map((doc: any, idx: number) => {
      const cat = doc.type === 'kontemporer' ? 'kontemporer' : 'otentik'
      return {
        id: doc.slug || String(doc.id) || `karya-museum-${idx}`,
        slug: doc.slug || String(doc.id) || `karya-museum-${idx}`,
        title: doc.title || 'Tanpa Judul',
        category: cat,
        categoryLabel: cat === 'kontemporer' ? 'Seni Kontemporer' : 'Koleksi Otentik',
        subcategory: cat === 'kontemporer' ? 'Lukisan & Gambar' : 'Patung & Seni Kriya',
        creator: doc.creator || 'Koleksi Museum',
        institution: 'PUI Seni Budaya Majapahitan UNESA',
        year: doc.era || 'Abad ke-14 Masehi',
        material: doc.material || '',
        image: resolveMediaUrl(doc.image, fallback[idx % fallback.length]?.image || '/images/koleksi/gapura.jpg'),
        description: doc.description || '',
      }
    })

    const rawCdn = process.env.NEXT_PUBLIC_CDN_URL?.trim() || ''
    const cleanCdn = rawCdn.replace(/^https?:\/\//, '').replace(/\/$/, '')
    const publicBucket = process.env.S3_PUBLIC_BUCKET || process.env.S3_PENDING_BUCKET || ''
    const region = process.env.S3_REGION || process.env.AWS_REGION || 'ap-southeast-2'

    const publikItems: KaryaItem[] = (publikResult?.docs || []).map((doc: any, idx: number) => {
      const subFilename =
        typeof doc.submissionMedia === 'object' && doc.submissionMedia !== null
          ? doc.submissionMedia.filename
          : null

      let resolvedImage = resolveMediaUrl(doc.image, '')
      if (!resolvedImage && subFilename) {
        resolvedImage = cleanCdn
          ? `https://${cleanCdn}/${subFilename}`
          : `https://${publicBucket}.s3.${region}.amazonaws.com/${subFilename}`
      }
      if (!resolvedImage) {
        resolvedImage = fallback[idx % fallback.length]?.image || '/images/pameran/tari.jpg'
      }

      return {
        id: String(doc.id) || `karya-publik-${idx}`,
        slug: String(doc.id) || `karya-publik-${idx}`,
        title: doc.title || 'Tanpa Judul',
        category: 'publik',
        categoryLabel: 'Karya Publik',
        subcategory: mapPublikCategory(doc.category),
        creator: doc.contributorName || 'Kontributor Publik',
        institution: doc.contributorAffiliation || 'Masyarakat Umum',
        year: new Date(doc.createdAt || Date.now()).getFullYear().toString(),
        image: resolvedImage,
        description: doc.description || '',
      }
    })

    const combined = [...museumItems, ...publikItems]
    return combined.length > 0 ? combined : fallback
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Collections: Karya | Error: ${err?.message || err}`)
    return fallback
  }
}

/**
 * Fetches Museum Karya items (otentik & kontemporer).
 */
export async function getMuseumKaryaData(): Promise<KaryaItem[]> {
  const all = await getAllKaryaData()
  return all.filter((k) => k.category === 'otentik' || k.category === 'kontemporer')
}

/**
 * Fetches Public Karya items.
 */
export async function getPublicKaryaData(): Promise<KaryaItem[]> {
  const all = await getAllKaryaData()
  return all.filter((k) => k.category === 'publik')
}

/**
 * Fetches highlight items for Beranda Koleksi Highlight section.
 * Queries up to 2 items from Situs and 3 items from Artefak.
 * Falls back gracefully to curated Koleksi items if collections have 0 items.
 */
export async function getKoleksiHighlights(): Promise<Koleksi[]> {
  const fallback = koleksis

  if (process.env.CMS_FALLBACK_ACTIVE === 'true') {
    return fallback
  }

  try {
    const payload = await getPayloadClient()
    const [situsResult, artefakResult] = await Promise.all([
      payload.find({
        collection: 'situs',
        limit: 2,
        depth: 1,
      }),
      payload.find({
        collection: 'artefak',
        limit: 3,
        depth: 1,
      }),
    ])

    const items: Koleksi[] = []

    if (situsResult && Array.isArray(situsResult.docs)) {
      for (const doc of situsResult.docs as any[]) {
        items.push({
          id: doc.slug || String(doc.id),
          title: doc.name || 'Situs Sejarah',
          category: 'Arsitektur & Situs',
          image: resolveMediaUrl(doc.image, '/images/koleksi/gapura.jpg'),
          href: '/konservasi/situs',
        })
      }
    }

    if (artefakResult && Array.isArray(artefakResult.docs)) {
      for (const doc of artefakResult.docs as any[]) {
        items.push({
          id: doc.slug || String(doc.id),
          title: doc.name || 'Artefak Budaya',
          category: (doc.category as string) || 'Artefak & Benda Budaya',
          image: resolveMediaUrl(doc.image, '/images/koleksi/prasasti.jpg'),
          href: '/konservasi/artefak',
        })
      }
    }

    if (items.length === 0) {
      return fallback
    }

    if (items.length < 5) {
      const remaining = fallback.slice(items.length)
      return [...items, ...remaining]
    }

    return items.slice(0, 5)
  } catch (err: any) {
    console.warn(`[CMS_FALLBACK_ACTIVE] Module: KoleksiHighlight | Error: ${err?.message || err}`)
    return fallback
  }
}







