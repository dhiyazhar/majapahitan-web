import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Donasi Partisipasi — Museum Virtual Majapahitan",
};

export default function PartisipasiDonasiPage() {
  return (
    <ComingSoonTemplate
      title="Dukungan & Donasi Preservasi"
      subtitle="Kanal partisipasi donasi dan kolaborasi pendanaan riset pelestarian budaya Majapahit sedang dalam proses integrasi administrasi resmi UNESA."
      breadcrumb="Donasi"
    />
  );
}
