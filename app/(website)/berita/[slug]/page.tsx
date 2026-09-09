import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BeritaDetailTemplate from "@/components/templates/BeritaDetailTemplate";
import {
  getAllBeritaSlugs,
  getBeritaBySlug,
  getRelatedBerita,
} from "@/lib/payload";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllBeritaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) {
    return {
      title: "Warta Tidak Ditemukan — Museum Virtual Majapahitan",
    };
  }

  return {
    title: `${berita.title} — Museum Virtual Majapahitan`,
    description: berita.excerpt,
  };
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getBeritaBySlug(slug);

  if (!berita) {
    notFound();
  }

  const relatedBerita = await getRelatedBerita(slug, 3);

  return (
    <BeritaDetailTemplate
      berita={berita}
      relatedBerita={relatedBerita}
    />
  );
}
