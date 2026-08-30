"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { kirimKaryaPage } from "@/lib/content";

export default function KirimKaryaForm() {
  const [formData, setFormData] = useState({
    contributorName: "",
    contributorEmail: "",
    contributorAffiliation: "",
    title: "",
    category: "",
    description: "",
    agreed: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setFileError(null);
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFileError("Format berkas harus berupa JPG, PNG, atau WebP.");
      return;
    }
    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Ukuran berkas melebihi batas maksimal 5 MB.");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError("Silakan unggah foto/berkas visual karya Anda.");
      return;
    }
    if (!formData.agreed) {
      return;
    }

    setIsSubmitting(true);

    // Client-side stub: In future phase (Target 1/3), this calls Payload Local API / Server Action
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      contributorName: "",
      contributorEmail: "",
      contributorAffiliation: "",
      title: "",
      category: "",
      description: "",
      agreed: false,
    });
    handleRemoveFile();
    setIsSubmitted(false);
  };

  // SUCCESS STATE
  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-cream p-8 sm:p-12 text-cream-ink shadow-xl">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-8 ring-emerald-50">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
            KONTRIBUSI DITERIMA
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-cream-ink sm:text-3xl">
            Karya Berhasil Dikirim!
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-cream-ink/80">
            Terima kasih atas kontribusi Anda,{" "}
            <strong className="text-cream-ink">
              {formData.contributorName}
            </strong>
            . Karya berjudul{" "}
            <strong className="text-cream-ink">
              &ldquo;{formData.title}&rdquo;
            </strong>{" "}
            telah tercatat dan saat ini sedang dalam proses antrean kurasi oleh tim kurator PUI Seni Budaya Majapahitan.
          </p>

          <div className="mt-6 rounded-lg border border-cream-ink/15 bg-cream-2/70 p-4 text-left text-xs leading-relaxed text-cream-ink/75">
            <p className="font-semibold text-cream-ink">Informasi Selanjutnya:</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Estimasi proses peninjauan kuratorial: 3–7 hari kerja.</li>
              <li>Pemberitahuan hasil kurasi akan dikirimkan ke <strong className="text-cream-ink">{formData.contributorEmail}</strong>.</li>
              <li>Karya yang disetujui akan otomatis tampil di Galeri Karya Publik.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-sm bg-maroon px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-maroon-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Kirim Karya Lain
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-sm border border-cream-ink/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream-ink transition-colors hover:border-maroon hover:text-maroon"
            >
              Kembali ke Beranda
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE FORM
  return (
    <div className="rounded-xl bg-cream p-6 sm:p-10 text-cream-ink shadow-xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
          FORMULIR KURASI
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-cream-ink sm:text-3xl">
          Pengiriman Karya Publik
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-cream-ink/70 sm:text-sm">
          Semua kolom bertanda bintang (<span className="text-maroon font-bold">*</span>) wajib diisi dengan data yang sebenar-benarnya.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Identitas Kontributor */}
        <div className="border-b border-cream-ink/15 pb-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-maroon">
            1. Identitas Kontributor
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contributorName"
                className="block text-xs font-medium text-cream-ink"
              >
                Nama Lengkap <span className="text-maroon">*</span>
              </label>
              <input
                id="contributorName"
                name="contributorName"
                type="text"
                required
                value={formData.contributorName}
                onChange={handleChange}
                placeholder="Contoh: Raden Ayu Sekar"
                className="mt-1.5 w-full rounded-sm border border-cream-ink/20 bg-cream-2/80 px-3.5 py-2.5 text-sm text-cream-ink placeholder:text-cream-ink/40 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
              />
            </div>

            <div>
              <label
                htmlFor="contributorEmail"
                className="block text-xs font-medium text-cream-ink"
              >
                Alamat Email <span className="text-maroon">*</span>
              </label>
              <input
                id="contributorEmail"
                name="contributorEmail"
                type="email"
                required
                value={formData.contributorEmail}
                onChange={handleChange}
                placeholder="nama@institusi.ac.id"
                className="mt-1.5 w-full rounded-sm border border-cream-ink/20 bg-cream-2/80 px-3.5 py-2.5 text-sm text-cream-ink placeholder:text-cream-ink/40 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="contributorAffiliation"
                className="block text-xs font-medium text-cream-ink"
              >
                Institusi / Afiliasi / Komunitas <span className="text-maroon">*</span>
              </label>
              <input
                id="contributorAffiliation"
                name="contributorAffiliation"
                type="text"
                required
                value={formData.contributorAffiliation}
                onChange={handleChange}
                placeholder="Contoh: FBS Universitas Negeri Surabaya / Sanggar Seni Trowulan"
                className="mt-1.5 w-full rounded-sm border border-cream-ink/20 bg-cream-2/80 px-3.5 py-2.5 text-sm text-cream-ink placeholder:text-cream-ink/40 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
              />
            </div>
          </div>
        </div>

        {/* Detail Karya */}
        <div className="border-b border-cream-ink/15 pb-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-maroon">
            2. Detail Karya
          </h3>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block text-xs font-medium text-cream-ink"
                >
                  Judul Karya <span className="text-maroon">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Kejayaan Hayam Wuruk dalam Kanvas"
                  className="mt-1.5 w-full rounded-sm border border-cream-ink/20 bg-cream-2/80 px-3.5 py-2.5 text-sm text-cream-ink placeholder:text-cream-ink/40 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-xs font-medium text-cream-ink"
                >
                  Kategori Karya <span className="text-maroon">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-cream-ink/20 bg-cream-2/80 px-3.5 py-2.5 text-sm text-cream-ink focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                >
                  <option value="" disabled>
                    -- Pilih Kategori Karya --
                  </option>
                  {kirimKaryaPage.kategoriOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-xs font-medium text-cream-ink"
              >
                Deskripsi & Makna Filosofis Karya <span className="text-maroon">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan gagasan utama, inspirasi sejarah Majapahit yang diangkat, teknik berkarya, serta pesan budaya yang ingin disampaikan..."
                className="mt-1.5 w-full resize-y rounded-sm border border-cream-ink/20 bg-cream-2/80 px-3.5 py-2.5 text-sm text-cream-ink placeholder:text-cream-ink/40 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
              />
              <p className="mt-1 text-[11px] text-cream-ink/60">
                Deskripsi ini akan digunakan oleh kurator dalam penulisan takarir (*curatorial caption*) saat karya dipamerkan.
              </p>
            </div>
          </div>
        </div>

        {/* Unggah Berkas Karya */}
        <div className="border-b border-cream-ink/15 pb-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-maroon">
            3. Berkas Visual Karya <span className="text-maroon">*</span>
          </h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragging
                  ? "border-maroon bg-maroon/10"
                  : "border-cream-ink/25 bg-cream-2/50 hover:border-maroon/60 hover:bg-cream-2/80"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                <Upload className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-semibold text-cream-ink">
                Klik untuk memilih berkas atau seret berkas ke sini
              </p>
              <p className="mt-1 text-xs text-cream-ink/60">
                Format yang didukung: JPG, PNG, WebP (Maksimal 5 MB)
              </p>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-cream-ink/20 bg-cream-2/90 p-4">
              <div className="flex items-center gap-3.5 overflow-hidden">
                {previewUrl ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-cream-ink/20 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Preview Karya"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-cream-ink/10">
                    <ImageIcon className="h-6 w-6 text-cream-ink/60" />
                  </div>
                )}
                <div className="truncate">
                  <p className="truncate text-sm font-semibold text-cream-ink">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-cream-ink/60">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.replace("image/", "").toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-sm border border-cream-ink/20 px-3 py-1.5 text-xs font-medium text-cream-ink hover:border-maroon hover:text-maroon"
                >
                  Ganti
                </button>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-cream-ink/60 hover:bg-maroon/10 hover:text-maroon"
                  aria-label="Hapus file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {fileError && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-700">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {fileError}
            </p>
          )}
        </div>

        {/* Persetujuan & Etika */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreed"
              required
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-1 h-4 w-4 shrink-0 rounded border-cream-ink/30 text-maroon focus:ring-maroon"
            />
            <span className="text-xs leading-relaxed text-cream-ink/80">
              Saya menyatakan dengan jujur bahwa karya yang saya kirimkan adalah hasil karya orisinal ciptaan saya sendiri, tidak melanggar hak kekayaan intelektual pihak lain, dan saya menyetujui ketentuan penayangan untuk keperluan pendidikan dan apresiasi kebudayaan di Museum Virtual Majapahitan.
            </span>
          </label>
        </div>

        {/* Tombol Kirim */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.agreed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-maroon px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-cream transition-all hover:bg-maroon-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Mengirim Karya...
              </>
            ) : (
              <>
                Kirim Karya untuk Dikurasi
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
