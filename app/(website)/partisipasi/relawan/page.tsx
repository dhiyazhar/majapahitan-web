import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Program Relawan Budaya — Museum Virtual Majapahitan",
};

export default function RelawanPage() {
  return (
    <ComingSoonTemplate
      title="Program Relawan Budaya"
      subtitle="Pendaftaran program sukarelawan digitalisasi, dokumentasi lapangan, dan pemandu virtual museum sedang dipersiapkan untuk periode berikutnya."
      breadcrumb="Relawan"
    />
  );
}
