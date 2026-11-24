import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Buku Tamu Digital — Museum Virtual Majapahitan",
};

export default function BukuTamuPage() {
  return (
    <ComingSoonTemplate
      title="Buku Tamu Digital"
      subtitle="Ruang catatan kunjungan dan pesan apresiasi pengunjung Museum Virtual Majapahitan sedang dalam tahap pengembangan fitur interaktif."
      breadcrumb="Buku Tamu"
    />
  );
}
