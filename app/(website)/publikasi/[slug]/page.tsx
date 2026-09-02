import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicationDetailTemplate from "@/components/templates/PublicationDetailTemplate";
import { getAllPublikasi, getPublikasiBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = getAllPublikasi();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublikasiBySlug(slug);

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
  const item = getPublikasiBySlug(slug);

  if (!item) {
    notFound();
  }

  const allItems = getAllPublikasi();
  const relatedItems = allItems.filter((i) => i.slug !== slug).slice(0, 2);

  return <PublicationDetailTemplate item={item} relatedItems={relatedItems} />;
}
