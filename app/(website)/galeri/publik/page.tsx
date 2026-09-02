import type { Metadata } from "next";
import PublicGalleryTemplate from "@/components/templates/PublicGalleryTemplate";
import { getKaryaByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galeri Karya Publik — Museum Virtual Majapahitan",
  description:
    "Ruang pameran dan apresiasi bagi karya seni rupa, lukisan, patung, seni kriya, dan karya digital bertema Majapahit kiriman seniman dan masyarakat luas yang telah lolos kurasi resmi PUI Seni Budaya Majapahitan UNESA.",
};

export default function GaleriPublikPage() {
  const items = getKaryaByCategory("publik");

  return <PublicGalleryTemplate items={items} />;
}
