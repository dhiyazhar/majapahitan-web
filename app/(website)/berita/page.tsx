import type { Metadata } from "next";
import BeritaListingTemplate from "@/components/templates/BeritaListingTemplate";
import { getBeritaPosts } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Warta & Berita — Museum Virtual Majapahitan",
  description:
    "Kabar terkini dokumentasi kegiatan riset, survei konservasi lapangan, pameran seni rupa, dan agenda pelestarian kebudayaan Majapahit oleh PUI Seni Budaya Majapahitan UNESA.",
};

type Props = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function BeritaPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const paginatedResult = await getBeritaPosts({
    q,
    page: currentPage,
    limit: 9,
  });

  return (
    <BeritaListingTemplate
      beritaList={paginatedResult.docs}
      pagination={{
        totalDocs: paginatedResult.totalDocs,
        totalPages: paginatedResult.totalPages,
        page: paginatedResult.page,
        hasNextPage: paginatedResult.hasNextPage,
        hasPrevPage: paginatedResult.hasPrevPage,
        limit: paginatedResult.limit,
        prevPage: paginatedResult.prevPage,
        nextPage: paginatedResult.nextPage,
      }}
      isFallback={paginatedResult.isFallback}
      fallbackReason={paginatedResult.fallbackReason}
    />
  );
}
