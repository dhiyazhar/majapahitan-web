import type { Metadata } from "next";
import PostListingTemplate from "@/components/templates/PostListingTemplate";
import { getPostsByCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Program & Kegiatan — Museum Virtual Majapahitan",
  description:
    "Jelajahi pameran tematik, lokakarya konservasi 3D, simposium ilmiah, dan pertunjukan seni budaya yang diselenggarakan oleh PUI Seni Budaya Majapahitan UNESA.",
};

export default function ProgramPage() {
  const posts = getPostsByCategory("program");

  return (
    <PostListingTemplate
      category="program"
      eyebrow="AGENDA & PROGRAM MUSEUM"
      title="Program & Kegiatan"
      description="Jelajahi pameran tematik, lokakarya konservasi 3D, simposium ilmiah, dan pertunjukan seni budaya yang diselenggarakan oleh PUI Seni Budaya Majapahitan UNESA."
      breadcrumbCurrent="Program"
      posts={posts}
      heroImage="/images/pameran/arsitektur.jpg"
    />
  );
}
