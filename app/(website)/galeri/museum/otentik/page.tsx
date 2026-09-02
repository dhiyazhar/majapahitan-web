import type { Metadata } from "next";
import MuseumGalleryTemplate from "@/components/templates/MuseumGalleryTemplate";
import { getKaryaByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Koleksi Peninggalan Otentik — Galeri Virtual Museum",
  description:
    "Katalog visual peninggalan bersejarah otentik era keemasan Majapahit: arca andesit, ornamen relief candi, pusaka tosan aji, dan prasasti tembaga asli abad ke-14.",
};

export default function GaleriOtentikPage() {
  const items = getKaryaByCategory("otentik");

  return <MuseumGalleryTemplate items={items} mode="otentik" />;
}
