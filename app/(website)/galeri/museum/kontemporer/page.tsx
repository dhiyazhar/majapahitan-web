import type { Metadata } from "next";
import MuseumGalleryTemplate from "@/components/templates/MuseumGalleryTemplate";
import { getKaryaByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Karya Seni Rupa Kontemporer — Galeri Virtual Museum",
  description:
    "Pameran kreasi seni rupa modern Majapahitan: lukisan kanvas kontemporer, kain batik/sutra pola ornamen candi, dan instalasi media baru oleh sivitas akademika PUI UNESA.",
};

export default function GaleriKontemporerPage() {
  const items = getKaryaByCategory("kontemporer");

  return <MuseumGalleryTemplate items={items} mode="kontemporer" />;
}
