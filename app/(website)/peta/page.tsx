import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Peta Arkeologi Interaktif — Museum Virtual Majapahitan",
};

export default function PetaPage() {
  return (
    <ComingSoonTemplate
      title="Peta Arkeologi Majapahit"
      subtitle="Sistem informasi geografis (GIS) pemetaan sebaran situs, candi, dan kanal hidrolika Trowulan sedang dalam persiapan data spasial."
      breadcrumb="Peta Situs"
    />
  );
}
