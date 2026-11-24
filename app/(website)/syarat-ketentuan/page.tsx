import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Museum Virtual Majapahitan",
};

export default function SyaratKetentuanPage() {
  return (
    <ComingSoonTemplate
      title="Syarat & Ketentuan Layanan"
      subtitle="Pedoman hak cipta materi budaya, tata tertib pengiriman karya, serta ketentuan penggunaan aset digital museum sedang dalam finalisasi tim hukum institusi."
      badge="Legal & Tata Kelola"
      breadcrumb="Syarat & Ketentuan"
    />
  );
}
