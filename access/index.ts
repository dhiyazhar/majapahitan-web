import type { Access, FieldAccess, ClientUser } from 'payload'

export type UserRole = 'admin' | 'staff'

interface UserWithRole extends Partial<ClientUser> {
  id: number | string
  role?: UserRole
}

/**
 * Akses autentikasi dasar: Pengguna harus sudah login ke sistem.
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Hak akses Admin.
 * Memiliki akses penuh terhadap seluruh entitas, skema, dan manajemen akun.
 */
export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && (user as UserWithRole).role === 'admin')
}

/**
 * Hak akses Staff.
 */
export const isStaff: Access = ({ req: { user } }) => {
  return Boolean(user && (user as UserWithRole).role === 'staff')
}

/**
 * Hak akses staf operasional: Admin ATAU Staff.
 * Digunakan untuk pembuatan, penyuntingan warta, artefak, karya, dan media.
 */
export const isAdminOrStaff: Access = ({ req: { user } }) => {
  const role = (user as UserWithRole | null)?.role
  return Boolean(user && (role === 'admin' || role === 'staff'))
}

// Backward compatibility aliases
export const isWriter = isStaff
export const isAdminOrWriter = isAdminOrStaff

/**
 * Hak akses untuk pengelolaan akun User:
 * - Admin dapat membaca dan menyunting akun siapa pun.
 * - Pengguna non-admin (penulis) hanya dapat membaca dan menyunting profil miliknya sendiri.
 */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if ((user as UserWithRole).role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * Field-level access: Hanya Admin yang dapat menyunting field tertentu (misal: role).
 */
export const isAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && (user as UserWithRole).role === 'admin')
}

/**
 * Field-level access untuk pembaruan role pengguna:
 * - Hanya Admin yang berhak mengubah role.
 * - Admin TIDAK BISA mengubah role akunnya sendiri (prevent self-demotion / accidental lockout).
 */
export const canUpdateUserRole: FieldAccess = ({ req: { user }, id, doc }) => {
  if (!user || (user as UserWithRole).role !== 'admin') return false

  const targetId = id ?? doc?.id
  if (targetId && String(user.id) === String(targetId)) {
    return false
  }

  return true
}

/**
 * Field-level access saat pembuatan akun (create):
 * Hanya Admin yang sudah login yang berhak menentukan role pengguna baru.
 * Ketika inisialisasi akun pertama (belum ada sesi login), role dikunci (tidak dapat diubah)
 * dan otomatis ditetapkan sebagai Admin.
 */
export const canSetRoleOnCreate: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return (user as UserWithRole).role === 'admin'
}

/**
 * Hak akses pembuatan akun pengguna baru:
 * - Admin yang telah login dapat membuat akun pengguna baru.
 * - Jika sistem belum memiliki pengguna sama sekali (first boot / initial setup),
 *   siapapun diizinkan membuat akun admin pertama.
 */
export const canCreateUser: Access = async ({ req }) => {
  if (req.user && (req.user as UserWithRole).role === 'admin') {
    return true
  }

  try {
    const { totalDocs } = await req.payload.count({ collection: 'users' })
    return totalDocs === 0
  } catch {
    return false
  }
}

/**
 * Helper untuk menyembunyikan navigasi sidebar admin jika bukan admin.
 * Sangat penting untuk menjaga tampilan admin staf redaksi tetap bersih dan fokus.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotAdmin = ({ user }: { user?: any }): boolean => {
  return (user as UserWithRole | null)?.role !== 'admin'
}
