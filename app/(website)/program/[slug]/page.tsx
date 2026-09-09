import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetailTemplate from "@/components/templates/ProgramDetailTemplate";
import {
  getAllProgramSlugs,
  getProgramBySlug,
  getRelatedProgram,
} from "@/lib/payload";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    return {
      title: "Program Tidak Ditemukan — Museum Virtual Majapahitan",
    };
  }

  return {
    title: `${program.title} — Museum Virtual Majapahitan`,
    description: program.excerpt,
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const relatedPrograms = await getRelatedProgram(slug, 3);

  return (
    <ProgramDetailTemplate
      program={program}
      relatedPrograms={relatedPrograms}
    />
  );
}
