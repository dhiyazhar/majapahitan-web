import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Pengaturan',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'org',
      type: 'text',
      required: true,
      defaultValue: 'PUI-PT Seni Budaya Majapahitan',
      label: 'Nama Organisasi / Lembaga',
    },
    {
      name: 'university',
      type: 'text',
      required: true,
      defaultValue: 'Universitas Negeri Surabaya',
      label: 'Nama Universitas',
    },
    {
      name: 'operatingHours',
      type: 'text',
      defaultValue: "Senin s/d Jum'at | 08.00-16.00 WIB",
      label: 'Jam Layanan Operasional',
    },
    {
      name: 'office',
      type: 'text',
      defaultValue: 'Gedung Lab Anti Doping Lt.4',
      label: 'Ruang Kantor / Gedung',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'pusenibud@unesa.ac.id',
      label: 'Email Resmi',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      defaultValue: 'https://maps.app.goo.gl/GqpisKzQERkrwvKz9',
      label: 'Tautan Google Maps',
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Media Sosial Resmi',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Platform (Instagram / YouTube / dll)',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Tautan URL Akun',
        },
        {
          name: 'handle',
          type: 'text',
          required: true,
          label: 'Nama Handle / @username',
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'instagram',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
          ],
        },
      ],
    },
  ],
}
