import type { Metadata } from "next";
import ComingSoonTemplate from "@/components/templates/ComingSoonTemplate";

export const metadata: Metadata = {
  title: "Testimoni & Kesan Pengunjung — Museum Virtual Majapahitan",
};

export default function TestimoniPage() {
  return (
    <ComingSoonTemplate
      title="Testimoni & Apresiasi Publik"
      subtitle="Kanal kesan dan kurasi testimoni para peneliti, budayawan, dan pengunjung pameran sedang disiapkan."
      breadcrumb="Testimoni"
    />
  );
}
