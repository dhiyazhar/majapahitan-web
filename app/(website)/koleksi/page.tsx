import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Koleksi Khusus — Museum Virtual Majapahitan",
};

export default function KoleksiPage() {
  return (
    <ComingSoonTemplate
      title="Koleksi Khusus & Pusaka"
      subtitle="Pusat katalog terpadu koleksi pusaka dan artefak Majapahit sedang dalam proses sinkronisasi kuratorial."
      breadcrumb="Koleksi"
    />
  );
}
