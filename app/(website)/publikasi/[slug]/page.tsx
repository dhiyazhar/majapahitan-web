import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicationDetailTemplate from "@/components/templates/PublicationDetailTemplate";
import {
  getAllPublikasiSlugs,
  getPublikasiBySlug,
  getRelatedPublikasi,
  getPartnerLogos,
} from "@/lib/payload";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPublikasiSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublikasiBySlug(slug);

  if (!item) {
    return {
      title: "Publikasi Tidak Ditemukan — Museum Virtual Majapahitan",
    };
  }

  return {
    title: `${item.title} — Publikasi Ilmiah PUISBM`,
    description: item.abstract,
  };
}

export default async function PublikasiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getPublikasiBySlug(slug);

  if (!item) {
    notFound();
  }

  const [relatedItems, partnerLogos] = await Promise.all([
    getRelatedPublikasi(slug, 2),
    getPartnerLogos(),
  ]);

  return (
    <PublicationDetailTemplate
      item={item}
      relatedItems={relatedItems}
      partnerLogos={partnerLogos}
    />
  );
}
