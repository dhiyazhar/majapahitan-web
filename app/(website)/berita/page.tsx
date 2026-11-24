import type { Metadata } from "next";
import BeritaListingTemplate from "@/components/templates/BeritaListingTemplate";
import { getBeritaPosts, getPartnerLogos } from "@/lib/payload";

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

  const [paginatedResult, partnerLogos] = await Promise.all([
    getBeritaPosts({
      q,
      page: currentPage,
      limit: 9,
    }),
    getPartnerLogos(),
  ]);

  return (
    <BeritaListingTemplate
      beritaList={paginatedResult.docs}
      partnerLogos={partnerLogos}
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
