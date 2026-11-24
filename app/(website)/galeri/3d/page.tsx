import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Galeri 3D Interaktif — Museum Virtual Majapahitan",
};

export default function Galeri3DPage() {
  return (
    <ComingSoonTemplate
      title="Galeri 3D Interaktif"
      subtitle="Ruang visualisasi 3D rekonstruksi situs dan artefak Majapahit sedang dalam tahap rendering model interaktif berbasis WebGL."
      breadcrumb="Galeri 3D"
    />
  );
}
