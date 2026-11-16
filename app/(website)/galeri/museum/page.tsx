import type { Metadata } from "next";
import MuseumGalleryTemplate, { type MuseumFilter } from "@/components/templates/MuseumGalleryTemplate";
import { getMuseumKarya } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galeri Virtual Museum — Museum Virtual Majapahitan",
  description:
    "Ruang pameran visual resmi koleksi internal PUI Seni Budaya Majapahitan UNESA, mencakup peninggalan bersejarah otentik dan kreasi seni rupa kontemporer.",
};

export default async function GaleriMuseumPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const items = getMuseumKarya();
  // Replaces the old /galeri/museum/otentik and /galeri/museum/kontemporer routes.
  const { kategori } = await searchParams;
  const initialCategory: MuseumFilter =
    kategori === "otentik" || kategori === "kontemporer" ? kategori : "all";

  return <MuseumGalleryTemplate items={items} initialCategory={initialCategory} />;
}
