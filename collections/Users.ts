import type { CollectionConfig } from 'payload'
import {
  isAdmin,
  isAdminOrSelf,
  canUpdateUserRole,
  canSetRoleOnCreate,
  isNotAdmin,
} from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Pengguna',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'title', 'createdAt'],
    group: 'Sistem & Pengguna',
    hidden: isNotAdmin,
    description: 'Kelola akun pengguna dan hak akses sistem.',
  },
  auth: {
    tokenExpiration: 28800,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      saveToJWT: false,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Lengkap',
      admin: {
        placeholder: 'contoh: Dr. Budi Santoso, M.Sn.',
        description: 'Nama yang dicantumkan sebagai identitas dan atribusi penulis.',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      label: 'Role',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
      ],
      access: {
        create: canSetRoleOnCreate,
        update: canUpdateUserRole,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Jabatan / Peran Institusional',
      admin: {
        placeholder: 'contoh: Peneliti Utama / Kurator Warisan Budaya',
        description: 'Jabatan resmi atau spesialisasi di lingkungan PUI Seni Budaya Majapahitan.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil / Avatar',
      admin: {
        description: 'Foto identitas profil pengguna (disarankan foto portrait rasio 1:1).',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografi Singkat',
      admin: {
        description: 'Biografi atau profil singkat pengelola untuk kebutuhan pengenalan penulis.',
      },
    },
  ],
}
