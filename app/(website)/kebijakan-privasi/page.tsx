import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Museum Virtual Majapahitan",
};

export default function KebijakanPrivasiPage() {
  return (
    <ComingSoonTemplate
      title="Kebijakan Privasi"
      subtitle="Dokumen kebijakan perlindungan data pribadi dan privasi pengunjung platform Museum Virtual Majapahitan sedang diselaraskan dengan tata kelola universitas."
      badge="Legal & Tata Kelola"
      breadcrumb="Kebijakan Privasi"
    />
  );
}
