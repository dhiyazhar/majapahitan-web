import React from 'react'

/**
 * Sidebar icon: the same gapura mark, monochrome so it follows the admin
 * theme's currentColor at small sizes.
 */
export const Icon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 44 44"
    role="img"
    aria-label="Museum Virtual Majapahitan"
  >
    <path
      d="M6 38V16l6-9 6 9v22h4V14l6-9 6 9v24h-4V18l-2-3-2 3v20h-4V16l-4-6-4 6v22H6z"
      fill="currentColor"
    />
    <rect x="3" y="38" width="38" height="3" rx="1.5" fill="currentColor" opacity="0.55" />
  </svg>
)
