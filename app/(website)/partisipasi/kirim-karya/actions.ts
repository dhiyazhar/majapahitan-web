"use server";

import { getPayloadClient } from "@/lib/payload";
import { kirimKaryaPage } from "@/lib/content";
import type { KaryaPublik } from "@/payload-types";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"] as const;

const ALLOWED_CATEGORIES = new Set(
  kirimKaryaPage.kategoriOptions.map((opt) => opt.value)
);

export type KirimKaryaField =
  | "contributorName"
  | "contributorEmail"
  | "contributorAffiliation"
  | "title"
  | "category"
  | "description"
  | "file"
  | "agreed"
  | "_form";

export type KirimKaryaState = {
  ok: boolean;
  errors?: Partial<Record<KirimKaryaField, string>>;
};

/**
 * Magic-byte sniff. `file.type` and the filename are attacker-controlled, so
 * the real format is read off the first bytes instead of trusted from the client.
 */
function detectImageMime(buffer: Buffer): string | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

/** In-memory per-identity guard. Stopgap, not durable across instances/restarts. */
const SUBMIT_WINDOW_MS = 60_000;
const SUBMIT_MAX_PER_WINDOW = 5;
const recentSubmits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recentSubmits.get(key) ?? []).filter(
    (t) => now - t < SUBMIT_WINDOW_MS
  );
  if (hits.length >= SUBMIT_MAX_PER_WINDOW) {
    recentSubmits.set(key, hits);
    return true;
  }
  hits.push(now);
  recentSubmits.set(key, hits);
  if (recentSubmits.size > 1000) {
    for (const [k, v] of recentSubmits) {
      if (now - (v[v.length - 1] ?? 0) > SUBMIT_WINDOW_MS) recentSubmits.delete(k);
    }
  }
  return false;
}

function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitKarya(
  formData: FormData
): Promise<KirimKaryaState> {
  const errors: Partial<Record<KirimKaryaField, string>> = {};

  const contributorName = str(formData, "contributorName");
  const contributorEmail = str(formData, "contributorEmail");
  const contributorAffiliation = str(formData, "contributorAffiliation");
  const title = str(formData, "title");
  const category = str(formData, "category");
  const description = str(formData, "description");
  const agreed = formData.get("agreed") === "on" || formData.get("agreed") === "true";

  if (!contributorName) errors.contributorName = "Nama lengkap wajib diisi.";
  if (!contributorEmail) {
    errors.contributorEmail = "Alamat email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contributorEmail)) {
    errors.contributorEmail = "Format alamat email tidak valid.";
  }
  if (!contributorAffiliation)
    errors.contributorAffiliation = "Institusi / afiliasi wajib diisi.";
  if (!title) errors.title = "Judul karya wajib diisi.";
  if (!category || !ALLOWED_CATEGORIES.has(category)) {
    errors.category = "Silakan pilih kategori karya yang tersedia.";
  }
  if (!description) errors.description = "Deskripsi & makna karya wajib diisi.";
  if (!agreed) errors.agreed = "Persetujuan orisinalitas wajib dicentang.";

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    errors.file = "Berkas visual karya wajib diunggah.";
  } else if (file.size > MAX_FILE_BYTES) {
    errors.file = "Ukuran berkas melebihi batas maksimal 5 MB.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const imageFile = file as File;
  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const detectedMime = detectImageMime(buffer);
  if (!detectedMime) {
    return {
      ok: false,
      errors: {
        file: "Berkas yang diunggah bukan gambar JPG, PNG, atau WebP yang valid.",
      },
    };
  }
  if (!ALLOWED_MIME.includes(detectedMime as (typeof ALLOWED_MIME)[number])) {
    return {
      ok: false,
      errors: { file: "Format berkas harus JPG, PNG, atau WebP." },
    };
  }

  if (isRateLimited(contributorEmail.toLowerCase())) {
    return {
      ok: false,
      errors: {
        _form:
          "Terlalu banyak pengiriman dalam waktu singkat. Silakan coba lagi beberapa saat lagi.",
      },
    };
  }

  try {
    const payload = await getPayloadClient();

    const media = await payload.create({
      collection: "media",
      data: { alt: `Karya publik: ${title}` },
      file: {
        data: buffer,
        mimetype: detectedMime,
        name: imageFile.name || `karya-${Date.now()}.jpg`,
        size: buffer.length,
      },
      // Trusted server-side write on behalf of an anonymous visitor. The visitor
      // never gets Media.create; all inputs above are validated or hardcoded.
      overrideAccess: true,
    });

    await payload.create({
      collection: "karya-publik",
      data: {
        title,
        contributorName,
        contributorEmail,
        contributorAffiliation,
        category: category as KaryaPublik["category"],
        description,
        image: media.id,
        // Forced server-side: a submitter can never self-approve.
        status: "pending",
      },
      overrideAccess: true,
    });

    return { ok: true };
  } catch (err) {
    console.error("[KIRIM_KARYA_SUBMIT_FAILED]", err);
    return {
      ok: false,
      errors: {
        _form:
          "Terjadi kesalahan saat menyimpan karya Anda. Silakan coba lagi beberapa saat lagi.",
      },
    };
  }
}
