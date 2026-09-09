import type { Metadata } from "next";
import ProgramListingTemplate from "@/components/templates/ProgramListingTemplate";
import { getProgramPosts } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Program & Kegiatan — Museum Virtual Majapahitan",
  description:
    "Jelajahi pameran tematik, lokakarya konservasi 3D, simposium ilmiah, dan pertunjukan seni budaya yang diselenggarakan oleh PUI Seni Budaya Majapahitan UNESA.",
};

type Props = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function ProgramPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const paginatedResult = await getProgramPosts({
    q,
    page: currentPage,
    limit: 9,
  });

  return (
    <ProgramListingTemplate
      programs={paginatedResult.docs}
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
