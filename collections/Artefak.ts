import type { CollectionConfig } from 'payload'

export const Artefak: CollectionConfig = {
  slug: 'artefak',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'era', 'material'],
    group: 'Konservasi',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Artefak',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Klasifikasi Benda',
      options: [
        { label: 'Prasasti & Inskripsi', value: 'Prasasti & Inskripsi' },
        { label: 'Arca & Patung', value: 'Arca & Patung' },
        { label: 'Keramik & Gerabah', value: 'Keramik & Gerabah' },
        { label: 'Perhiasan & Logam', value: 'Perhiasan & Logam' },
        { label: 'Naskah & Sastra', value: 'Naskah & Sastra' },
      ],
    },
    {
      name: 'era',
      type: 'text',
      required: true,
      label: 'Era / Tahun Pembuatan',
      defaultValue: 'Abad ke-14 Masehi',
    },
    {
      name: 'material',
      type: 'text',
      required: true,
      label: 'Bahan / Material',
      defaultValue: 'Batu Andesit',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi Artefak',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Singkat',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Ulasan Kuratorial & Catatan Filologis',
    },
  ],
}
