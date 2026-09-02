import type { Metadata } from "next";
import PublicationListingTemplate from "@/components/templates/PublicationListingTemplate";
import { getAllPublikasi } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publikasi & Hasil Penelitian — Museum Virtual Majapahitan",
  description:
    "Kumpulan jurnal ilmiah, artikel penelitian, buku monograf, dan laporan arkeologis Kerajaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function PublikasiPage() {
  const items = getAllPublikasi();

  return <PublicationListingTemplate items={items} />;
}
