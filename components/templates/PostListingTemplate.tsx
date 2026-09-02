"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Newspaper } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSlot from "@/components/ui/ImageSlot";
import FeaturedPostHero from "@/components/posts/FeaturedPostHero";
import PostCard from "@/components/posts/PostCard";
import PostFilterBar from "@/components/posts/PostFilterBar";
import Berlangganan from "@/components/sections/Berlangganan";
import type { PostItem, PostCategory } from "@/lib/content";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbCurrent: string;
  category: PostCategory;
  posts: PostItem[];
  heroImage?: string;
};

export default function PostListingTemplate({
  eyebrow,
  title,
  description,
  breadcrumbCurrent,
  posts,
  heroImage = "/images/hero/slide-1.jpg",
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Extract unique subcategories
  const subcategories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.subcategory) set.add(p.subcategory);
    });
    return ["Semua", ...Array.from(set)];
  }, [posts]);

  // Identify featured post (either marked as featured or the first post)
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Filtered posts (excluding featured post if no search/filter active, or including all matches when searching)
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude featured hero post from regular grid only when no search or category filter is active
      const isHero = !searchQuery && activeCategory === "Semua" && post.id === featuredPost?.id;
      if (isHero) return false;

      const matchesCategory =
        activeCategory === "Semua" || post.subcategory === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, activeCategory, featuredPost]);

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* =========================================================================
            1. HERO & BREADCRUMB
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-hairline bg-ink-2 py-16 sm:py-24">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
            <ImageSlot
              src={heroImage}
              alt={title}
              position="absolute"
              className="h-full w-full"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center justify-center gap-2 text-xs font-medium text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 text-hairline" />
              <span className="text-gold">{breadcrumbCurrent}</span>
            </nav>

            <p className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-cream sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
              {description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* =========================================================================
              2. FEATURED POST HERO (Headline Sorotan)
          ========================================================================= */}
          {featuredPost && !searchQuery && activeCategory === "Semua" ? (
            <section className="mt-12 sm:mt-16">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Sorotan Terkini
                </h2>
              </div>
              <FeaturedPostHero post={featuredPost} />
            </section>
          ) : null}

          {/* =========================================================================
              3. TOOLBAR FILTER & SEARCH
          ========================================================================= */}
          <section className="mt-14 sm:mt-18">
            <PostFilterBar
              categories={subcategories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={posts.length}
              filteredCount={
                filteredPosts.length +
                (featuredPost && !searchQuery && activeCategory === "Semua" ? 1 : 0)
              }
            />

            {/* =========================================================================
                4. POST GRID CARDS (3-Columns)
            ========================================================================= */}
            {filteredPosts.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="my-16 rounded-xl border border-dashed border-hairline bg-panel/50 p-12 text-center">
                <Newspaper className="mx-auto h-12 w-12 text-muted/40" />
                <h3 className="mt-4 font-display text-lg font-bold text-cream">
                  Tidak Ada Warta yang Ditemukan
                </h3>
                <p className="mt-2 text-xs text-muted sm:text-sm">
                  Tidak ada artikel yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;. Silakan coba kata kunci lain.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Semua");
                  }}
                  className="mt-5 inline-flex items-center rounded-sm border border-gold-deep px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-ink transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </section>

          {/* =========================================================================
              5. NEWSLETTER SUBSCRIPTION
          ========================================================================= */}
          <div className="mt-20 sm:mt-24">
            <Berlangganan />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
