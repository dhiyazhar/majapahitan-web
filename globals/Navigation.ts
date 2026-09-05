import type { GlobalConfig } from 'payload'
import { isAdmin, isNotAdmin } from '../access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigasi Menu Utama',
  admin: {
    group: 'Pengaturan Sistem',
    hidden: isNotAdmin,
    description: 'Kelola hierarki dan tautan menu navigasi utama website.',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menu Navigasi Utama',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label Menu',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Tautan URL',
        },
        {
          name: 'children',
          type: 'array',
          label: 'Submenu (Dropdown)',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label Submenu',
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'Tautan URL',
            },
          ],
        },
      ],
    },
  ],
}
