import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePublikasiAfterChange: CollectionAfterChangeHook = ({
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
        revalidatePath(`/publikasi/${doc.slug}`)
      }
      revalidatePath('/publikasi')
      revalidatePath('/')
      revalidateTag('publikasi', 'default')
    } catch {
      // Ignored outside Next.js request store
    }
  }

  if (previousDoc?.slug && previousDoc.slug !== doc?.slug && wasPublished) {
    try {
      revalidatePath(`/publikasi/${previousDoc.slug}`)
    } catch {}
  }

  return doc
}

export const revalidatePublikasiAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  try {
    if (doc?.slug) {
      revalidatePath(`/publikasi/${doc.slug}`)
    }
    revalidatePath('/publikasi')
    revalidatePath('/')
    revalidateTag('publikasi', 'default')
  } catch {}
  return doc
}
