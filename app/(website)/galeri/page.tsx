import type { Metadata } from "next";
import GalleryHubTemplate from "@/components/templates/GalleryHubTemplate";
import { getAllKarya } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galeri Virtual & Seni Majapahitan — Museum Virtual Majapahitan",
  description:
    "Ruang pamer visual koleksi bersejarah otentik, karya seni rupa kontemporer, dan karya seni kurasi kiriman masyarakat bertema kebudayaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function GaleriPage() {
  const items = getAllKarya();

  return <GalleryHubTemplate items={items} />;
}
