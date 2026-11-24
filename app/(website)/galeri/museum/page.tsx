import type { Metadata } from "next";
import MuseumGalleryTemplate, { type MuseumFilter } from "@/components/templates/MuseumGalleryTemplate";
import { getMuseumKaryaData, getPartnerLogos } from "@/lib/payload";

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
  const [items, partnerLogos] = await Promise.all([
    getMuseumKaryaData(),
    getPartnerLogos(),
  ]);

  const { kategori } = await searchParams;
  const initialCategory: MuseumFilter =
    kategori === "otentik" || kategori === "kontemporer" ? kategori : "all";

  return (
    <MuseumGalleryTemplate
      items={items}
      initialCategory={initialCategory}
      partnerLogos={partnerLogos}
    />
  );
}
