import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetailTemplate from "@/components/templates/PostDetailTemplate";
import { getPostsByCategory, getPostBySlug, getRelatedPosts } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPostsByCategory("program");
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Program Tidak Ditemukan — Museum Virtual Majapahitan",
    };
  }

  return {
    title: `${post.title} — Program Museum Virtual`,
    description: post.excerpt,
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.category !== "program") {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, "program", 3);

  return (
    <PostDetailTemplate
      post={post}
      categoryLabel="Program & Kegiatan"
      categoryHref="/program"
      relatedPosts={relatedPosts}
    />
  );
}
