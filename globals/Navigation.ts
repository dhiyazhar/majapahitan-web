import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Pengaturan',
  },
  access: {
    read: () => true,
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
