import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetailTemplate from "@/components/templates/PostDetailTemplate";
import { getPostsByCategory, getPostBySlug, getRelatedPosts } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPostsByCategory("berita");
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Warta Tidak Ditemukan — Museum Virtual Majapahitan",
    };
  }

  return {
    title: `${post.title} — Museum Virtual Majapahitan`,
    description: post.excerpt,
  };
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.category !== "berita") {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, "berita", 3);

  return (
    <PostDetailTemplate
      post={post}
      categoryLabel="Berita"
      categoryHref="/berita"
      relatedPosts={relatedPosts}
    />
  );
}
