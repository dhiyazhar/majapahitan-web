import { getProgramPosts } from "@/lib/payload";
import PameranProgramClient from "./PameranProgramClient";

export default async function PameranProgram() {
  const { docs } = await getProgramPosts({ limit: 6 });

  return <PameranProgramClient posts={docs} />;
}
