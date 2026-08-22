/**
 * Mock content for the Museum Virtual Majapahitan landing page.
 *
 * This file is the single seam for a later Payload CMS integration: replace these
 * exports with data fetched from Payload collections and the components stay unchanged.
 *
 * `image` fields hold paths under /public/images/... Drop the real files there (see
 * public/images/README.md). Until a file exists, <ImageSlot> renders a labelled placeholder.
 */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Museum", href: "/tentang" },
  {
    label: "Museum Konservasi",
    href: "/konservasi",
    children: [
      { label: "Situs & Arsitektur", href: "/konservasi/situs" },
      { label: "Artefak & Benda Budaya", href: "/konservasi/artefak" },
    ],
  },
  {
    label: "Galeri Karya",
    href: "/galeri",
    children: [
      { label: "Galeri Virtual 3D", href: "/galeri/3d" },
      { label: "Karya Kontemporer", href: "/galeri/kontemporer" },
    ],
  },
  { label: "Publikasi & Penelitian", href: "/publikasi" },
  { label: "Program & Kegiatan", href: "/program" },
  { label: "Berita", href: "/berita" },
];

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "warisan",
    title: "Jelajahi Warisan\nKejayaan Majapahit",
    subtitle:
      "Konservasi peninggalan sejarah & budaya. Ruang apresiasi karya kreatif kontemporer bertema Majapahitan.",
    image: "/images/hero/slide-1.jpg",
    primary: { label: "Mulai Jelajah Virtual", href: "/galeri/3d" },
    secondary: { label: "Lihat Koleksi", href: "/koleksi" },
  },
  {
    id: "koleksi",
    title: "Ribuan Koleksi\nDalam Genggaman",
    subtitle:
      "Telusuri artefak, naskah kuno, dan situs bersejarah Kerajaan Majapahit dalam bentuk digital.",
    image: "/images/hero/slide-2.jpg",
    primary: { label: "Telusuri Koleksi", href: "/koleksi" },
    secondary: { label: "Peta Virtual", href: "/peta" },
  },
  {
    id: "kontemporer",
    title: "Rupa Kontemporer\nBertema Majapahitan",
    subtitle:
      "Ruang apresiasi bagi karya kreatif kontemporer yang terinspirasi warisan Majapahit.",
    image: "/images/hero/slide-3.jpg",
    primary: { label: "Masuk Galeri Karya", href: "/galeri/kontemporer" },
    secondary: { label: "Lihat Program", href: "/program" },
  },
];

export type QuickAccess = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  /** lucide-react icon name resolved in the component */
  icon: "cube" | "images" | "newspaper" | "map";
};

export const aksesCepat: QuickAccess[] = [
  {
    id: "3d",
    title: "Galeri Virtual 3D",
    subtitle: "Jelajahi ruang pamer secara interaktif",
    href: "/galeri/3d",
    icon: "cube",
  },
  {
    id: "digital",
    title: "Koleksi Digital",
    subtitle: "Telusuri ribuan koleksi Majapahit",
    href: "/koleksi",
    icon: "images",
  },
  {
    id: "berita",
    title: "Berita & Program",
    subtitle: "Informasi terbaru kegiatan museum",
    href: "/berita",
    icon: "newspaper",
  },
  {
    id: "peta",
    title: "Peta Virtual",
    subtitle: "Eksplorasi wilayah Kerajaan Majapahit",
    href: "/peta",
    icon: "map",
  },
];

export type Pameran = {
  id: string;
  category: string;
  title: string;
  date: string;
  image: string;
  cta: { label: string; href: string };
};

export const pamerans: Pameran[] = [
  {
    id: "arsitektur",
    category: "Pameran Virtual",
    title: "Majapahit dalam Arsitektur",
    date: "01 Mei – 30 Juni 2024",
    image: "/images/pameran/arsitektur.jpg",
    cta: { label: "Masuk Galeri", href: "/pameran/arsitektur" },
  },
  {
    id: "rupa",
    category: "Pameran Karya",
    title: "Rupa Kontemporer Majapahitan",
    date: "15 Mei – 15 Juli 2024",
    image: "/images/pameran/rupa.jpg",
    cta: { label: "Masuk Galeri", href: "/pameran/rupa" },
  },
  {
    id: "webinar",
    category: "Program Edukasi",
    title: "Webinar: Naskah Kuno Majapahit",
    date: "25 Mei 2024",
    image: "/images/pameran/webinar.jpg",
    cta: { label: "Daftar Sekarang", href: "/program/webinar-naskah" },
  },
  {
    id: "tari",
    category: "Pertunjukan Digital",
    title: "Tari & Musik Majapahit",
    date: "02 Juni 2024",
    image: "/images/pameran/tari.jpg",
    cta: { label: "Tonton Sekarang", href: "/program/tari-musik" },
  },
];

export type Koleksi = {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
};

export const koleksis: Koleksi[] = [
  {
    id: "gapura",
    title: "Gapura Wringin Lawang",
    category: "Arsitektur & Situs",
    image: "/images/koleksi/gapura.jpg",
    href: "/koleksi/gapura-wringin-lawang",
  },
  {
    id: "prasasti",
    title: "Prasasti Canggu",
    category: "Artefak & Benda Budaya",
    image: "/images/koleksi/prasasti.jpg",
    href: "/koleksi/prasasti-canggu",
  },
  {
    id: "kitab",
    title: "Kitab Negara Kertagama",
    category: "Naskah & Sastra Kuno",
    image: "/images/koleksi/kitab.jpg",
    href: "/koleksi/negara-kertagama",
  },
  {
    id: "ganesha",
    title: "Patung Ganesha",
    category: "Seni Rupa & Estetika Klasik",
    image: "/images/koleksi/ganesha.jpg",
    href: "/koleksi/patung-ganesha",
  },
  {
    id: "peta",
    title: "Peta Majapahit",
    category: "Peta Virtual",
    image: "/images/koleksi/peta.jpg",
    href: "/koleksi/peta-majapahit",
  },
];

export type Berita = {
  id: string;
  title: string;
  date: string;
  image: string;
  href: string;
};

export const beritas: Berita[] = [
  {
    id: "galeri-3d",
    title: "Peluncuran Galeri Virtual 3D Museum Majapahitan",
    date: "12 Mei 2024",
    image: "/images/berita/galeri-3d.jpg",
    href: "/berita/peluncuran-galeri-3d",
  },
  {
    id: "workshop",
    title: "Workshop Digitalisasi Naskah Kuno Majapahit",
    date: "10 Mei 2024",
    image: "/images/berita/workshop.jpg",
    href: "/berita/workshop-digitalisasi-naskah",
  },
  {
    id: "kolaborasi",
    title: "Kolaborasi Pameran Seni Majapahit Kontemporer",
    date: "05 Mei 2024",
    image: "/images/berita/kolaborasi.jpg",
    href: "/berita/kolaborasi-pameran-seni",
  },
];

export type Partisipasi = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: "pen-line" | "users" | "clipboard-list" | "message-square-quote" | "heart-handshake";
};

export const partisipasis: Partisipasi[] = [
  {
    id: "kirim",
    title: "Kirim Karya",
    subtitle: "untuk Dikurasi",
    href: "/partisipasi/kirim-karya",
    icon: "pen-line",
  },
  {
    id: "relawan",
    title: "Relawan Virtual",
    subtitle: "Bergabung bersama kami",
    href: "/partisipasi/relawan",
    icon: "users",
  },
  {
    id: "buku-tamu",
    title: "Buku Tamu",
    subtitle: "Digital",
    href: "/partisipasi/buku-tamu",
    icon: "clipboard-list",
  },
  {
    id: "testimoni",
    title: "Testimoni",
    subtitle: "Pengunjung",
    href: "/partisipasi/testimoni",
    icon: "message-square-quote",
  },
  {
    id: "donasi",
    title: "Donasi",
    subtitle: "Konservasi",
    href: "/donasi",
    icon: "heart-handshake",
  },
];

export const tentang = {
  eyebrow: "Tentang Museum",
  title: "Mengenal Museum Virtual Majapahitan",
  body: "Museum Virtual Majapahitan adalah inisiatif Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya untuk melestarikan, mendokumentasikan, dan mempublikasikan warisan budaya Majapahit dalam bentuk digital yang dapat diakses oleh seluruh dunia.",
  cta: { label: "Selengkapnya", href: "/tentang" },
  image: "/images/tentang/arca.jpg",
};

export const contactInfo = {
  org: "PUI-PT Seni Budaya Majapahitan",
  university: "Universitas Negeri Surabaya",
  operatingHours: "Senin s/d Jum'at | 08.00-16.00 WIB",
  office: "Gedung Lab Anti Doping Lt.4",
  email: "pusenibud@unesa.ac.id",
  socials: [
    { label: "Instagram", href: "https://instagram.com/pusenibudayaunesa", handle: "@pusenibudayaunesa", icon: "instagram" as const },
    { label: "YouTube", href: "https://youtube.com/@pusenibudunesa", handle: "@pusenibudunesa", icon: "youtube" as const },
  ],
  googleMaps: {
    label: "PUI Seni Budaya",
    href: "https://maps.google.com/?q=PUI+Seni+Budaya+Universitas+Negeri+Surabaya",
  },
};

export const footerLinks = {
  title: "Tautan Cepat",
  links: [
    { label: "Tentang Museum", href: "/tentang" },
    { label: "Museum Konservasi", href: "/konservasi" },
    { label: "Galeri Karya Kontemporer", href: "/galeri/kontemporer" },
    { label: "Publikasi & Penelitian", href: "/publikasi" },
    { label: "Program & Kegiatan", href: "/program" },
    { label: "Hubungi Kami", href: "/kontak" },
  ],
};

export type Partner = { id: string; name: string; logo: string };

export const kerjasamaLogos: Partner[] = [
  { id: "unesa", name: "Universitas Negeri Surabaya", logo: "/images/logos/unesa.png" },
  { id: "puisbm", name: "PUISBM", logo: "/images/logos/puisbm.png" },
  { id: "partner-3", name: "Mitra Kerja Sama 3", logo: "/images/logos/partner-3.png" },
  { id: "partner-4", name: "Mitra Kerja Sama 4", logo: "/images/logos/partner-4.png" },
];

export const legalLinks = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
];
