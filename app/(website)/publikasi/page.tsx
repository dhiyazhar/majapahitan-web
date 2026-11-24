import type { Metadata } from "next";
import PublicationListingTemplate from "@/components/templates/PublicationListingTemplate";
import { getAllPublikasiPosts, getPartnerLogos } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Publikasi & Hasil Penelitian — Museum Virtual Majapahitan",
  description:
    "Kumpulan jurnal ilmiah, artikel penelitian, buku monograf, dan laporan arkeologis Kerajaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default async function PublikasiPage() {
  const [items, partnerLogos] = await Promise.all([
    getAllPublikasiPosts(),
    getPartnerLogos(),
  ]);

  return <PublicationListingTemplate items={items} partnerLogos={partnerLogos} />;
}
