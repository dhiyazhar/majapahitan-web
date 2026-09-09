import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateProgramAfterChange: CollectionAfterChangeHook = ({
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
        revalidatePath(`/program/${doc.slug}`)
      }
      revalidatePath('/program')
      revalidatePath('/')
      revalidateTag('programs', 'default')
    } catch {
      // Ignored outside Next.js request store
    }
  }

  if (previousDoc?.slug && previousDoc.slug !== doc?.slug && wasPublished) {
    try {
      revalidatePath(`/program/${previousDoc.slug}`)
    } catch {}
  }

  return doc
}

export const revalidateProgramAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  try {
    if (doc?.slug) {
      revalidatePath(`/program/${doc.slug}`)
    }
    revalidatePath('/program')
    revalidatePath('/')
    revalidateTag('programs', 'default')
  } catch {}
  return doc
}
