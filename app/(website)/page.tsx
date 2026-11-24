import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AksesCepat from "@/components/sections/AksesCepat";
import PameranProgram from "@/components/sections/PameranProgram";
import KoleksiHighlight from "@/components/sections/KoleksiHighlight";
import TentangMuseum from "@/components/sections/TentangMuseum";
import BeritaTerbaru from "@/components/sections/BeritaTerbaru";
import PartisipasiPublik from "@/components/sections/PartisipasiPublik";
import Berlangganan from "@/components/sections/Berlangganan";
import Footer from "@/components/layout/Footer";
import { getPageBerandaData, getPartnerLogos } from "@/lib/payload";

export default async function Home() {
  const [berandaData, partnerLogos] = await Promise.all([
    getPageBerandaData(),
    getPartnerLogos(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero slides={berandaData.heroSlides} />
        <AksesCepat />
        <PameranProgram />
        <KoleksiHighlight />
        <TentangMuseum data={berandaData.tentang} />
        <BeritaTerbaru />
        <PartisipasiPublik />
        <Berlangganan />
      </main>
      <Footer partnerLogos={partnerLogos} />
    </>
  );
}
