import type { GlobalConfig } from 'payload'
import { isAdminOrStaff } from '../access'

export const PageTentang: GlobalConfig = {
  slug: 'page-tentang',
  label: 'Halaman: Tentang Museum',
  admin: {
    group: 'Halaman & Menu',
    description: 'Pengaturan konten untuk Halaman Tentang Museum (/tentang)',
  },
  access: {
    read: () => true,
    update: isAdminOrStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero & Latar Belakang',
          description: 'Pengaturan banner utama dan bagian narasi sejarah museum.',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Mengenal Museum Virtual Majapahitan',
              label: 'Judul Hero',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              defaultValue:
                'Pusat konservasi digital dan ruang apresiasi warisan kebudayaan Kerajaan Majapahit dalam kemasan teknologi modern.',
              label: 'Subjudul Hero',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Gambar Latar Banner Hero',
            },
            {
              name: 'sejarahTitle',
              type: 'text',
              defaultValue: 'Latar Belakang & Pendirian',
              label: 'Judul Bagian Sejarah',
            },
            {
              name: 'sejarahImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Foto Dokumentasi Sejarah',
            },
            {
              name: 'sejarahCaption',
              type: 'text',
              defaultValue: 'Artefak Koleksi PUI Seni Budaya Majapahitan',
              label: 'Keterangan Foto Sejarah (Caption)',
            },
            {
              name: 'sejarahParagraphs',
              type: 'array',
              label: 'Paragraf Narasi Sejarah',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                  label: 'Paragraf',
                },
              ],
            },
          ],
        },
        {
          label: 'Visi & Misi',
          description: 'Visi utama dan butir-butir misi pelestarian museum.',
          fields: [
            {
              name: 'visiTitle',
              type: 'text',
              defaultValue: 'Arah & Dedikasi Kami',
              label: 'Judul Bagian Visi & Misi',
            },
            {
              name: 'visi',
              type: 'textarea',
              defaultValue:
                'Menjadi pusat konservasi digital dan rujukan utama pelestarian seni budaya Majapahit berkelas dunia yang memadukan keilmuan akademis dengan apresiasi publik.',
              label: 'Visi Organisasi',
            },
            {
              name: 'misi',
              type: 'array',
              label: 'Poin-Poin Misi',
              fields: [
                {
                  name: 'point',
                  type: 'textarea',
                  required: true,
                  label: 'Pernyataan Misi',
                },
              ],
            },
          ],
        },
        {
          label: 'Pengelola & Tim Ahli',
          description: 'Daftar pengurus, kurator, dan dewan pakar museum.',
          fields: [
            {
              name: 'timTitle',
              type: 'text',
              defaultValue: 'Pengelola & Tim Ahli',
              label: 'Judul Bagian Tim',
            },
            {
              name: 'timSubtitle',
              type: 'textarea',
              defaultValue:
                'Didukung oleh para akademisi, kurator seni, peneliti sejarah, dan pengembang teknologi.',
              label: 'Subjudul / Deskripsi Tim',
            },
            {
              name: 'timMembers',
              type: 'array',
              label: 'Daftar Anggota Tim',
              labels: {
                singular: 'Anggota Tim',
                plural: 'Anggota Tim',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Nama Lengkap & Gelar',
                },
                {
                  name: 'role',
                  type: 'text',
                  required: true,
                  label: 'Jabatan / Peran Tim',
                },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Foto Profil',
                },
              ],
            },
          ],
        },
        {
          label: 'Partner & Kolaborasi',
          description: 'Daftar mitra kerja sama institusi, universitas, dan balai kebudayaan.',
          fields: [
            {
              name: 'mitraTitle',
              type: 'text',
              defaultValue: 'Partner & Kolaborasi Institusi',
              label: 'Judul Bagian Mitra',
            },
            {
              name: 'mitraSubtitle',
              type: 'textarea',
              defaultValue:
                'Bekerja sama dengan berbagai institusi pendidikan, balai pelestarian kebudayaan, dan komunitas seni.',
              label: 'Subjudul / Deskripsi Mitra',
            },
            {
              name: 'mitraList',
              type: 'array',
              label: 'Daftar Mitra Kerja Sama',
              labels: {
                singular: 'Mitra',
                plural: 'Daftar Mitra',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Nama Lembaga / Mitra',
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Logo Institusi',
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Tautan Website Mitra (Opsional)',
                },
              ],
            },
          ],
        },
        {
          label: 'Kontak & Lokasi',
          description: 'Informasi kontak sekretariat, jam buka, dan peta lokasi kantor.',
          fields: [
            {
              name: 'kontakTitle',
              type: 'text',
              defaultValue: 'Hubungi & Kunjungi Kami',
              label: 'Judul Bagian Kontak',
            },
            {
              name: 'kontakDescription',
              type: 'textarea',
              defaultValue:
                'Kami terbuka untuk kolaborasi penelitian, kunjungan edukasi, serta partisipasi aktif dalam pelestarian seni budaya Majapahitan.',
              label: 'Deskripsi Singkat',
            },
            {
              name: 'kontakAddress',
              type: 'textarea',
              defaultValue:
                'Gedung Laboratorium Anti Doping Lt. 4, UNESA Kampus Lidah Wetan',
              label: 'Alamat Kantor',
            },
            {
              name: 'kontakOperatingHours',
              type: 'text',
              defaultValue: 'Senin – Jumat, 08.00 – 16.00 WIB',
              label: 'Jam Operasional',
            },
            {
              name: 'kontakEmail',
              type: 'email',
              defaultValue: 'puisbm@unesa.ac.id',
              label: 'Email Resmi',
            },
            {
              name: 'kontakMapsUrl',
              type: 'text',
              defaultValue:
                'https://maps.google.com/?q=Universitas+Negeri+Surabaya+Lidah+Wetan',
              label: 'Tautan Google Maps',
            },
            {
              name: 'kontakMapsEmbedUrl',
              type: 'textarea',
              defaultValue:
                'https://maps.google.com/maps?q=Gedung+Laboratorium+Anti+Doping+Universitas+Negeri+Surabaya&t=&z=16&ie=UTF8&iwloc=&output=embed',
              label: 'URL Iframe Embed Google Maps',
            },
          ],
        },
      ],
    },
  ],
}
