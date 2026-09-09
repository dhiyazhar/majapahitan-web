/**
 * Client-safe URL building utilities.
 * Kept strictly free of server-only modules and database connections.
 */

export type BuildPostUrlOptions = {
  q?: string
  page?: number
}

export type BuildBeritaUrlOptions = BuildPostUrlOptions
export type BuildProgramUrlOptions = BuildPostUrlOptions

/**
 * Helper to build consistent post listing URLs for search & pagination.
 * Resets page to 1 whenever a new search query 'q' is submitted.
 */
export function buildPostUrl(basePath: string, { q, page }: BuildPostUrlOptions): string {
  const cleanPath = basePath.startsWith('/') ? basePath : `/${basePath}`
  const params = new URLSearchParams()
  if (q && q.trim()) {
    params.set('q', q.trim())
  }
  if (page && page > 1) {
    params.set('page', String(page))
  }
  const qs = params.toString()
  return qs ? `${cleanPath}?${qs}` : cleanPath
}

export function buildBeritaUrl(options: BuildPostUrlOptions): string {
  return buildPostUrl('/berita', options)
}

export function buildProgramUrl(options: BuildPostUrlOptions): string {
  return buildPostUrl('/program', options)
}
