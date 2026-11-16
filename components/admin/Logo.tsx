import React from 'react'

/**
 * Login-page logo: a compact Majapahit split-gate (gapura) mark with the
 * museum wordmark. Pure SVG + text, no admin-specific dependencies.
 */
export const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      role="img"
      aria-label="Museum Virtual Majapahitan"
    >
      {/* Split gate silhouette in brand gold */}
      <path
        d="M6 38V16l6-9 6 9v22h4V14l6-9 6 9v24h-4V18l-2-3-2 3v20h-4V16l-4-6-4 6v22H6z"
        fill="#c9a24a"
      />
      {/* Maroon lintel band */}
      <rect x="4" y="31" width="36" height="3" rx="1.5" fill="#6d1414" />
      {/* Base plinth */}
      <rect x="3" y="38" width="38" height="3" rx="1.5" fill="#c9a24a" opacity="0.55" />
    </svg>
    <div style={{ lineHeight: 1.25 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: 'var(--theme-elevation-800, #1a1a1a)',
          letterSpacing: '0.02em',
        }}
      >
        Museum Virtual Majapahitan
      </div>
      <div
        style={{
          fontWeight: 500,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--theme-elevation-400, #6b6b6b)',
        }}
      >
        PUI Seni Budaya · UNESA
      </div>
    </div>
  </div>
)
