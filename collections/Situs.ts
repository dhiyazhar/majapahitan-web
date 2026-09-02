import type { CollectionConfig } from 'payload'

export const Situs: CollectionConfig = {
  slug: 'situs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'era', 'status'],
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
      label: 'Nama Situs',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Lokasi',
      defaultValue: 'Trowulan, Mojokerto',
    },
    {
      name: 'era',
      type: 'text',
      required: true,
      label: 'Era / Abad',
      defaultValue: 'Abad ke-14 Masehi',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'Terdokumentasi',
      options: [
        { label: 'Terdokumentasi', value: 'Terdokumentasi' },
        { label: 'Pemindaian 3D', value: 'Pemindaian 3D' },
        { label: 'Dalam Proses', value: 'Dalam Proses' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi',
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
      label: 'Laporan Kuratorial & Data Arkeologis Detail',
    },
  ],
}
