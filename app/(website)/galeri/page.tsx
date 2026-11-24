import type { Metadata } from "next";
import GalleryHubTemplate from "@/components/templates/GalleryHubTemplate";
import { getAllKaryaData, getPartnerLogos } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Galeri Virtual & Seni Majapahitan — Museum Virtual Majapahitan",
  description:
    "Ruang pamer visual koleksi bersejarah otentik, karya seni rupa kontemporer, dan karya seni kurasi kiriman masyarakat bertema kebudayaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default async function GaleriPage() {
  const [items, partnerLogos] = await Promise.all([
    getAllKaryaData(),
    getPartnerLogos(),
  ]);

  return <GalleryHubTemplate items={items} partnerLogos={partnerLogos} />;
}
