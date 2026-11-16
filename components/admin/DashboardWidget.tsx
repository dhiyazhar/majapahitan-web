import React from 'react'
import type { WidgetServerProps } from 'payload'

type StatusCounts = { published: number; draft: number }

/** Status values per collection (karya-publik uses pending/published/rejected). */
const STATUS_VALUES: Record<string, readonly string[]> = {
  'karya-publik': ['pending', 'published', 'rejected'] as const,
}

function formatAdminURL(adminRoute: string, path: string): string {
  const base = adminRoute.endsWith('/') ? adminRoute.slice(0, -1) : adminRoute
  return `${base}${path}`
}

function countUrl(adminRoute: string, slug: string, status: string): string {
  const where = encodeURIComponent(
    JSON.stringify({ status: { equals: status } }),
  )
  return formatAdminURL(adminRoute, `/collections/${slug}?where=${where}`)
}

/**
 * Server-side overview widget for the Payload dashboard.
 * Reads only through req.payload, so it is bound by the logged-in user's own
 * access rules — it can never expose data the user could not already see.
 */
export async function DashboardWidget({ req }: WidgetServerProps) {
  const { payload } = req
  const adminRoute = payload.config.routes.admin

  const counts = new Map<string, StatusCounts>()
  const pending: { slug: string; title: string; contributor: string; createdAt: string }[] = []
  let upcomingPrograms: { slug: string; title: string; eventDate: string | null; programType: string | null }[] = []

  try {
    for (const slug of ['berita', 'programs', 'publikasi', 'situs', 'artefak', 'karya-museum']) {
      const collection = payload.config.collections.find((c) => c.slug === slug)
      if (!collection) continue
      const values = STATUS_VALUES[slug] ?? ['published', 'draft'] as const
      const row: StatusCounts = { published: 0, draft: 0 }
      for (const status of values) {
        let total = 0
        try {
          const res = await payload.count({
            collection: slug as never,
            where: { status: { equals: status } },
            overrideAccess: false,
          })
          total = res.totalDocs
        } catch {
          total = 0
        }
        if (status === 'published') row.published = total
        else if (status === 'draft') row.draft = total
      }
      counts.set(slug, row)
    }

    // Pending public submissions — the curator queue.
    try {
      const res = await payload.find({
        collection: 'karya-publik' as never,
        where: { status: { equals: 'pending' } },
        sort: '-createdAt',
        limit: 5,
        depth: 0,
        overrideAccess: false,
        select: {
          id: true,
          title: true,
          contributorName: true,
          createdAt: true,
        } as never,
      })
      for (const doc of res.docs as Array<Record<string, any>>) {
        pending.push({
          slug: String(doc.id),
          title: String(doc.title ?? ''),
          contributor: String(doc.contributorName ?? ''),
          createdAt: String(doc.createdAt ?? ''),
        })
      }
    } catch {
      // ignore — no read access
    }

    // Upcoming published programs (next 3 by eventDate).
    try {
      const today = new Date().toISOString()
      const res = await payload.find({
        collection: 'programs' as never,
        where: {
          and: [
            { status: { equals: 'published' } },
            {
              or: [
                { eventDate: { greater_than_equal: today } },
                { eventDate: { exists: false } },
              ],
            },
          ],
        },
        sort: 'eventDate',
        limit: 3,
        depth: 0,
        overrideAccess: false,
        select: {
          id: true,
          title: true,
          slug: true,
          eventDate: true,
          programType: true,
        } as never,
      })
      upcomingPrograms = (res.docs as Array<Record<string, any>>).map((doc) => ({
        slug: String(doc.slug ?? ''),
        title: String(doc.title ?? ''),
        eventDate: doc.eventDate ? String(doc.eventDate) : null,
        programType: doc.programType ? String(doc.programType) : null,
      }))
    } catch {
      // ignore — no read access
    }
  } catch {
    // A widget failure must never take down the dashboard.
  }

  const fmtDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return iso
    }
  }

  const fmtEvent = (iso: string | null): string => {
    if (!iso) return 'Segera Hadir'
    return fmtDate(iso)
  }

  const sections = [
    { slug: 'berita', label: 'Warta & Berita' },
    { slug: 'programs', label: 'Program & Kegiatan' },
    { slug: 'publikasi', label: 'Publikasi & Riset' },
    { slug: 'situs', label: 'Situs & Arsitektur' },
    { slug: 'artefak', label: 'Artefak & Benda Budaya' },
    { slug: 'karya-museum', label: 'Galeri Virtual Museum' },
  ]

  const pendingTotal = pending.length

  return (
    <div className="dashboard-widget" style={{ display: 'grid', gap: 16 }}>
      {/* ── Ringkasan Status ─────────────────────────────────────────── */}
      <section aria-labelledby="dw-summary">
        <h2 id="dw-summary" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>
          Ringkasan Status
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 8,
          }}
        >
          {sections.map((s) => {
            const row = counts.get(s.slug)
            if (!row) return null
            const total = row.published + row.draft
            return (
              <a
                key={s.slug}
                href={formatAdminURL(adminRoute, `/collections/${s.slug}`)}
                style={{
                  display: 'block',
                  padding: '10px 12px',
                  borderRadius: 6,
                  color: 'var(--theme-elevation-800, #1a1a1a)',
                  background: 'var(--theme-elevation-100, #f5f5f5)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.72 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>
                  {total}
                  <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.65, marginLeft: 6 }}>
                    total
                  </span>
                </div>
                <div style={{ fontSize: 11.5, opacity: 0.72, marginTop: 2 }}>
                  {row.published} tayang · {row.draft} draf
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── Halaman & Konten Informasi ─────────────────────────────── */}
      <section aria-labelledby="dw-pages">
        <h2 id="dw-pages" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>
          Halaman & Konten Informasi
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 8,
          }}
        >
          <a
            href={formatAdminURL(adminRoute, '/globals/page-tentang')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 6,
              color: 'var(--theme-elevation-800, #1a1a1a)',
              background: 'var(--theme-elevation-100, #f5f5f5)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <span>
              <span style={{ display: 'block', fontWeight: 700 }}>Tentang Museum</span>
              <span style={{ display: 'block', fontSize: 11.5, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>
                Visi Misi, Tim Ahli, Mitra, Kontak
              </span>
            </span>
            <span style={{ opacity: 0.5, fontSize: 16 }}>→</span>
          </a>
          <a
            href={formatAdminURL(adminRoute, '/globals/page-beranda')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 6,
              color: 'var(--theme-elevation-800, #1a1a1a)',
              background: 'var(--theme-elevation-100, #f5f5f5)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <span>
              <span style={{ display: 'block', fontWeight: 700 }}>Beranda (Landing)</span>
              <span style={{ display: 'block', fontSize: 11.5, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>
                Hero Slides & Highlight
              </span>
            </span>
            <span style={{ opacity: 0.5, fontSize: 16 }}>→</span>
          </a>
          <a
            href={formatAdminURL(adminRoute, '/globals/site-settings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: 6,
              color: 'var(--theme-elevation-800, #1a1a1a)',
              background: 'var(--theme-elevation-100, #f5f5f5)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <span>
              <span style={{ display: 'block', fontWeight: 700 }}>Pengaturan Situs</span>
              <span style={{ display: 'block', fontSize: 11.5, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>
                Kontak, Nama Portal, Metadata
              </span>
            </span>
            <span style={{ opacity: 0.5, fontSize: 16 }}>→</span>
          </a>
        </div>
      </section>

      {/* ── Antrean Kurasi ──────────────────────────────────────────── */}
      <section aria-labelledby="dw-queue">
        <h2 id="dw-queue" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>
          Antrean Kurasi{' '}
          <span style={{ fontWeight: 600, opacity: 0.65 }}>
            ({pendingTotal} menunggu)
          </span>
        </h2>
        {pendingTotal === 0 ? (
          <p style={{ margin: 0, fontSize: 13.5, opacity: 0.7 }}>
            Tidak ada kiriman menunggu kurasi. Semua beres. ✅
          </p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {pending.map((item) => (
              <li key={item.slug}>
                <a
                  href={formatAdminURL(adminRoute, `/collections/karya-publik/${item.slug}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: 'var(--theme-elevation-100, #f5f5f5)',
                    color: 'var(--theme-elevation-800, #1a1a1a)',
                    textDecoration: 'none',
                    fontSize: 13.5,
                  }}
                >
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 600 }}>{item.title}</span>
                    <span style={{ display: 'block', opacity: 0.65, fontSize: 12 }}>
                      {item.contributor} · {fmtDate(item.createdAt)}
                    </span>
                  </span>
                  <span style={{ opacity: 0.5, fontSize: 18 }}>→</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {pendingTotal > 3 ? (
          <a
            href={countUrl(adminRoute, 'karya-publik', 'pending')}
            style={{
              display: 'inline-block',
              marginTop: 8,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--theme-elevation-800, #1a1a1a)',
            }}
          >
            Lihat semua {pendingTotal} kiriman →
          </a>
        ) : null}
      </section>

      {/* ── Agenda Terdekat ─────────────────────────────────────────── */}
      <section aria-labelledby="dw-upcoming">
        <h2 id="dw-upcoming" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>
          Agenda Terdekat
        </h2>
        {upcomingPrograms.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13.5, opacity: 0.7 }}>
            Belum ada program terjadwal.
          </p>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {upcomingPrograms.map((p) => (
              <li key={p.slug}>
                <a
                  href={
                    p.slug
                      ? formatAdminURL(adminRoute, `/collections/programs/${p.slug}`)
                      : formatAdminURL(adminRoute, '/collections/programs')
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: 'var(--theme-elevation-100, #f5f5f5)',
                    color: 'var(--theme-elevation-800, #1a1a1a)',
                    textDecoration: 'none',
                    fontSize: 13.5,
                  }}
                >
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 600 }}>{p.title}</span>
                    <span style={{ display: 'block', opacity: 0.65, fontSize: 12 }}>
                      {p.programType ?? ''}
                      {p.programType ? ' · ' : ''}
                      {fmtEvent(p.eventDate)}
                    </span>
                  </span>
                  <span style={{ opacity: 0.5, fontSize: 18 }}>→</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
