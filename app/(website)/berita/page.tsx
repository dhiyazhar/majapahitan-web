import type { Metadata } from "next";
import PostListingTemplate from "@/components/templates/PostListingTemplate";
import { getPostsByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Warta & Berita — Museum Virtual Majapahitan",
  description:
    "Kabar terkini dokumentasi kegiatan riset, survei konservasi lapangan, pameran seni rupa, dan agenda pelestarian kebudayaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function BeritaPage() {
  const posts = getPostsByCategory("berita");

  return (
    <PostListingTemplate
      category="berita"
      eyebrow="WARTA & PUBLIKASI"
      title="Kabar & Warta Terkini"
      description="Dokumentasi kegiatan riset, survei konservasi lapangan, pameran seni rupa, dan agenda pelestarian warisan budaya Majapahit oleh PUI Seni Budaya Majapahitan UNESA."
      breadcrumbCurrent="Berita"
      posts={posts}
      heroImage="/images/berita/galeri-3d.jpg"
    />
  );
}
