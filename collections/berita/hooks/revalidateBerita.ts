import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateBeritaAfterChange: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (context?.disableRevalidate) return doc

  const isPublished = doc?.status === 'published'
  const wasPublished = previousDoc?.status === 'published'

  if (isPublished || wasPublished) {
    try {
      if (doc?.slug) {
        revalidatePath(`/berita/${doc.slug}`)
      }
      revalidatePath('/berita')
      revalidatePath('/')
      revalidateTag('berita', 'default')
    } catch {
      // Ignored outside Next.js request store
    }
  }

  if (previousDoc?.slug && previousDoc.slug !== doc?.slug && wasPublished) {
    try {
      revalidatePath(`/berita/${previousDoc.slug}`)
    } catch {}
  }

  return doc
}

export const revalidateBeritaAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  try {
    if (doc?.slug) {
      revalidatePath(`/berita/${doc.slug}`)
    }
    revalidatePath('/berita')
    revalidatePath('/')
    revalidateTag('berita', 'default')
  } catch {}
  return doc
}
