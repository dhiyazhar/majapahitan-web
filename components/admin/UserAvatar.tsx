import React from 'react'
import type { Payload } from 'payload'
import type { User, Media } from '@/payload-types'

interface UserAvatarServerProps {
  payload?: Payload
  user?: User | null
  [key: string]: unknown
}

export const UserAvatar = async ({ payload, user }: UserAvatarServerProps) => {
  let avatarUrl: string | null = null

  if (user?.avatar) {
    if (typeof user.avatar === 'object' && user.avatar !== null && 'url' in user.avatar) {
      avatarUrl = (user.avatar as Media).url || null
    } else if (payload && (typeof user.avatar === 'number' || typeof user.avatar === 'string')) {
      try {
        const media = await payload.findByID({
          collection: 'media',
          id: user.avatar,
          depth: 0,
        })
        avatarUrl = media?.url || null
      } catch {
        avatarUrl = null
      }
    }
  }

  if (avatarUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={avatarUrl}
        alt={user?.name || user?.email || 'Foto Profil'}
        style={{
          width: 25,
          height: 25,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />
    )
  }

  return (
    <svg
      height="25"
      width="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <circle cx="12.5" cy="12.5" r="11.5" fill="#444" />
      <circle cx="12.5" cy="10.73" r="3.98" fill="#aaa" />
      <path
        d="M12.5,24a11.44,11.44,0,0,0,7.66-2.94c-.5-2.71-3.73-4.8-7.66-4.8s-7.16,2.09-7.66,4.8A11.44,11.44,0,0,0,12.5,24Z"
        fill="#aaa"
      />
    </svg>
  )
}

export default UserAvatar
