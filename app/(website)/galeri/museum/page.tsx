import type { Metadata } from "next";
import MuseumGalleryTemplate from "@/components/templates/MuseumGalleryTemplate";
import { getMuseumKarya } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galeri Virtual Museum — Museum Virtual Majapahitan",
  description:
    "Ruang pameran visual resmi koleksi internal PUI Seni Budaya Majapahitan UNESA, mencakup peninggalan bersejarah otentik dan kreasi seni rupa kontemporer.",
};

export default function GaleriMuseumPage() {
  const items = getMuseumKarya();

  return <MuseumGalleryTemplate items={items} mode="all-museum" />;
}
