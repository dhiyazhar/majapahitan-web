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
  children?: NavItem[];
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
      { label: "Galeri Karya Publik", href: "/galeri/publik" },
      {
        label: "Galeri Virtual Museum",
        href: "/galeri/museum",
        children: [
          { label: "Karya Otentik", href: "/galeri/museum/otentik" },
          { label: "Karya Kontemporer", href: "/galeri/museum/kontemporer" },
        ],
      },
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
    cta: { label: "Masuk Galeri", href: "/program/majapahit-dalam-arsitektur" },
  },
  {
    id: "rupa",
    category: "Pameran Karya",
    title: "Rupa Kontemporer Majapahitan",
    date: "15 Mei – 15 Juli 2024",
    image: "/images/pameran/rupa.jpg",
    cta: { label: "Masuk Galeri", href: "/program/rupa-kontemporer-majapahitan" },
  },
  {
    id: "webinar",
    category: "Program Edukasi",
    title: "Webinar: Naskah Kuno Majapahit",
    date: "25 Mei 2024",
    image: "/images/pameran/webinar.jpg",
    cta: { label: "Daftar Sekarang", href: "/program/webinar-naskah-kuno" },
  },
  {
    id: "tari",
    category: "Pertunjukan Digital",
    title: "Tari & Musik Majapahit",
    date: "02 Juni 2024",
    image: "/images/pameran/tari.jpg",
    cta: { label: "Tonton Sekarang", href: "/program/pertunjukan-tari-musik-majapahit" },
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

export type PostCategory = "berita" | "publikasi" | "program";

export type PostContent = {
  lead: string;
  paragraphs: string[];
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  subheading?: string;
  secondaryParagraphs?: string[];
};

export type PostItem = {
  id: string;
  slug: string;
  title: string;
  category: PostCategory;
  subcategory?: string;
  publishedAt: string;
  author: string;
  readingTime: string;
  image: string;
  imageCaption?: string;
  excerpt: string;
  content: PostContent;
  tags: string[];
  featured?: boolean;
};

export const postsList: PostItem[] = [
  {
    id: "peluncuran-galeri-3d",
    slug: "peluncuran-galeri-3d",
    title: "Peluncuran Galeri Virtual 3D Museum Majapahitan",
    category: "berita",
    subcategory: "Teknologi & Konservasi",
    publishedAt: "12 Mei 2024",
    author: "PUI Seni Budaya Majapahitan UNESA",
    readingTime: "4 mnt baca",
    image: "/images/berita/galeri-3d.jpg",
    imageCaption: "Tampilan antarmuka interaktif eksplorasi 3D candi dan artefak pada Museum Virtual Majapahitan.",
    excerpt:
      "PUI Seni Budaya Majapahitan resmi meluncurkan platform galeri virtual interaktif 3D yang memungkinkan publik global menjelajahi rekonstruksi situs percandian dan artefak bersejarah Majapahit secara imersif.",
    featured: true,
    content: {
      lead:
        "Sebagai wujud komitmen dalam melestarikan sekaligus mendemokratisasikan akses terhadap warisan kebudayaan luhur Nusantara, Pusat Unggulan IPTEK Seni Budaya Majapahitan (PUISBM) Universitas Negeri Surabaya secara resmi meluncurkan platform Galeri Virtual 3D Museum Majapahitan.",
      paragraphs: [
        "Inisiatif terobosan ini memadukan riset arkeologi mendalam dengan teknologi pemindaian fotogrametri dan pemodelan 3D terkini. Pengunjung dari seluruh penjuru dunia kini dapat menjelajahi kompleks candi, mengamati detail ornamen relief, hingga memutar artefak dengan tingkat presisi visual yang tinggi langsung melalui peramban web tanpa memerlukan perangkat keras khusus.",
        "Peluncuran yang diselenggarakan secara hibrida ini dihadiri oleh jajaran pimpinan universitas, arkeolog, kurator museum terkemuka, serta perwakilan komunitas pelestari budaya Jawa Timur. Platform ini dirancang ramah pengguna di berbagai ukuran layar, baik gawai ponsel pintar maupun komputer desktop.",
      ],
      quote: {
        text: "Museum virtual ini bukan sekadar galeri gambar statis, melainkan ruang belajar interaktif dan rekam digital ilmiah yang mengabadikan memori kejayaan peradaban Majapahit agar dapat diwariskan melintasi generasi.",
        author: "Prof. Dr. Djodjok Soepardjo, M.Hum.",
        role: "Ketua PUI Seni Budaya Majapahitan UNESA",
      },
      subheading: "Fitur Unggulan & Tahap Pengembangan Lanjutan",
      secondaryParagraphs: [
        "Pada fase awal peluncuran, galeri menampilkan 12 rekonstruksi digital situs utama di kawasan Trowulan serta puluhan artefak pilihan yang telah diverifikasi oleh tim kuratorial. Fitur navigasi spasial memungkinkan pengunjung berpindah titik pandang secara mulus dan membaca anotasi sejarah yang disematkan pada setiap objek.",
        "Ke depan, PUI Seni Budaya Majapahitan berencana mengintegrasikan audio narasi dwibahasa (Indonesia & Inggris) serta modul tur terpandu virtual bagi kalangan pelajar dan peneliti akademis.",
      ],
    },
    tags: ["Konservasi Digital", "Galeri 3D", "Trowulan", "UNESA", "Warisan Budaya"],
  },
  {
    id: "workshop-digitalisasi-naskah",
    slug: "workshop-digitalisasi-naskah",
    title: "Workshop Digitalisasi Naskah Kuno & Prasasti Majapahit",
    category: "berita",
    subcategory: "Edukasi & Pelatihan",
    publishedAt: "10 Mei 2024",
    author: "Tim Riset Filologi PUISBM",
    readingTime: "3 mnt baca",
    image: "/images/berita/workshop.jpg",
    imageCaption: "Sesi praktik penanganan naskah lontar dan pemindaian multispektral dalam workshop filologi.",
    excerpt:
      "Pelatihan teknis metode preservasi, alih aksara, dan pemindaian beresolusi tinggi naskah lontar era Majapahit bagi akademisi, mahasiswa, dan kurator museum daerah.",
    content: {
      lead:
        "Sebanyak 40 peserta yang terdiri atas filolog muda, mahasiswa pascasarjana, serta pengelola museum daerah mengikuti Workshop Intensif Digitalisasi Naskah Kuno dan Prasasti yang diselenggarakan oleh PUI Seni Budaya Majapahitan UNESA.",
      paragraphs: [
        "Workshop ini memfokuskan pembekalan pada standar penanganan fisik naskah lontar yang rapuh, teknik pencahayaan khusus bebas sinar ultraviolet saat pemotretan, hingga pengenalan software OCR (Optical Character Recognition) untuk aksara Jawa Kuno.",
        "Peserta diajak mempraktikkan langsung tahapan alih media digital dari naskah koleksi mitra dan mendokumentasikan metadata filologis sesuai kaidah standar internasional.",
      ],
      quote: {
        text: "Kunci penyelamatan naskah kuno adalah kecepatan dan ketepatan preservasi digital sebelum media fisiknya mengalami degradasi alami akibat kelembapan iklim tropis.",
        author: "Dr. Trisakti, M.Si.",
        role: "Koordinator Riset & Kurasi",
      },
      subheading: "Menghubungkan Kajian Teks dengan Publik",
      secondaryParagraphs: [
        "Selain aspek teknis preservasi, workshop ini menggarisbawahi pentingnya transliterasi dan terjemahan populer agar nilai-nilai filosofis yang terkandung dalam kakawin maupun prasasti dapat dipahami oleh masyarakat umum.",
      ],
    },
    tags: ["Naskah Kuno", "Filologi", "Preservasi", "Workshop"],
  },
  {
    id: "kolaborasi-pameran-seni",
    slug: "kolaborasi-pameran-seni",
    title: "Kolaborasi Pameran Seni Majapahit Kontemporer Bersama Seniman Jawa Timur",
    category: "berita",
    subcategory: "Seni & Komunitas",
    publishedAt: "05 Mei 2024",
    author: "Divisi Kurasi Seni Rupa PUISBM",
    readingTime: "3 mnt baca",
    image: "/images/berita/kolaborasi.jpg",
    imageCaption: "Karya seni rupa instalasi kontemporer yang terinspirasi filosofi Surya Majapahit.",
    excerpt:
      "PUI Seni Budaya Majapahitan menggandeng puluhan seniman rupa kontemporer untuk menginterpretasikan nilai estetika dan simbolisme Majapahit dalam medium seni modern.",
    content: {
      lead:
        "Warisan kebudayaan Majapahit tidak hanya dipandang sebagai peninggalan masa silam, melainkan sumber inspirasi kreatif yang hidup bagi seni rupa kontemporer.",
      paragraphs: [
        "Pameran seni rupa bertajuk 'Gema Kemaharajaan' menampilkan lukisan, patung tembaga, instalasi keramik, hingga seni grafis karya 25 seniman Jawa Timur yang diundang khusus untuk merespons narasi sejarah Majapahit.",
        "Pameran ini menjadi wadah dialog antara temuan arkeologis klasik dengan ekspresi artistik kekinian, membuka ruang apresiasi yang segar bagi generasi muda.",
      ],
      quote: {
        text: "Seniman masa kini memiliki kebebasan menafsirkan keagungan Majapahit dengan medium kontemporer, membuktikan bahwa nilai estetika leluhur tetap relevan dan dinamis.",
        author: "Welly Suryandoko, S.Pd., M.Pd.",
        role: "Divisi Konservasi & Sejarah",
      },
      subheading: "Apresiasi & Penayangan Virtual",
      secondaryParagraphs: [
        "Seluruh karya kurasi dalam pameran ini juga didokumentasikan dan dipamerkan pada rubrik Galeri Kontemporer di portal Museum Virtual Majapahitan untuk menjangkau penikmat seni di luar wilayah Jawa Timur.",
      ],
    },
    tags: ["Seni Rupa", "Kontemporer", "Pameran", "Kolaborasi"],
  },
  {
    id: "ekskavasi-trowulan-2024",
    slug: "ekskavasi-trowulan-2024",
    title: "Temuan Struktur Bata Kuno Hasil Ekskavasi Tim Peneliti UNESA di Kawasan Trowulan",
    category: "berita",
    subcategory: "Riset Lapangan",
    publishedAt: "28 April 2024",
    author: "Tim Arkeologi Lapangan UNESA",
    readingTime: "5 mnt baca",
    image: "/images/koleksi/gapura.jpg",
    imageCaption: "Susunan bata merah berukuran besar yang tersingkap dalam kotak ekskavasi di sektor barat Trowulan.",
    excerpt:
      "Ekskavasi arkeologis kolaboratif berhasil menyingkap fragmen struktur fondasi bata merah kuno yang diduga kuat merupakan bagian dari sistem drainase pemukiman perkotaan Majapahit.",
    content: {
      lead:
        "Penelitian lapangan berkala yang dilaksanakan oleh tim peneliti PUI Seni Budaya Majapahitan bersama para mahasiswa arkeologi di Trowulan kembali membuahkan temuan penting bagi pemetaan tata ruang kota kuno Majapahit.",
      paragraphs: [
        "Di kedalaman 1,2 meter di bawah permukaan tanah endapan vulkanik, tim menemukan susunan bata merah berkualitas tinggi berdimensi 34 × 22 × 8 cm yang tersusun rapi dengan teknik kosod (tanpa spesi semen). Pola susunan menunjukkan keberadaan saluran air bawah tanah yang terhubung ke jaringan kolam purba.",
        "Temuan ini memperkuat catatan sejarawan mengenai kemajuan teknologi hidrolika dan sanitasi perkotaan yang telah diterapkan oleh para insinyur Majapahit pada abad ke-14.",
      ],
      quote: {
        text: "Sistem pengelolaan air perkotaan Majapahit di Trowulan menunjukkan peradaban yang sangat maju dalam memadukan estetika, fungsi penampungan air, dan penataan lingkungan.",
        author: "Tim Ahli Arkeologi Lapangan",
        role: "Divisi Riset PUISBM",
      },
      subheading: "Langkah Konservasi & Pemindaian 3D Spasial",
      secondaryParagraphs: [
        "Sebagai langkah awal penyelamatan, struktur yang tersingkap telah dipindai menggunakan LiDAR terestrial guna merekam geometri tiga dimensi secara presisi sebelum area ditutup kembali untuk perlindungan geomorfologis.",
      ],
    },
    tags: ["Ekskavasi", "Arkeologi", "Trowulan", "Tata Kota"],
  },
  {
    id: "kerjasama-balai-pelestarian",
    slug: "kerjasama-balai-pelestarian",
    title: "PUI Seni Budaya Jalin Kemitraan Strategis dengan Balai Pelestarian Kebudayaan Wilayah XI",
    category: "berita",
    subcategory: "Kemitraan Institusi",
    publishedAt: "18 April 2024",
    author: "Humas PUI Seni Budaya",
    readingTime: "3 mnt baca",
    image: "/images/tentang/tim-1.jpg",
    imageCaption: "Penandatanganan nota kesepahaman program digitalisasi cagar budaya Jawa Timur.",
    excerpt:
      "Perjanjian kerja sama formal mencakup sinkronisasi basis data peninggalan purbakala, pertukaran tenaga ahli konservasi, dan pembukaan akses riset terintegrasi.",
    content: {
      lead:
        "Guna mempercepat digitalisasi cagar budaya di Jawa Timur, PUI Seni Budaya Majapahitan UNESA resmi menandatangani Nota Kesepahaman (MoU) bersama Balai Pelestarian Kebudayaan (BPK) Wilayah XI Jawa Timur.",
      paragraphs: [
        "Sinergi antar-lembaga ini mencakup integrasi katalog artefak, pemanfaatan laboratorium pengujian material purbakala, serta kolaborasi dalam penyusunan narasi sejarah yang dapat diakses publik.",
        "Dengan adanya kerja sama ini, Museum Virtual Majapahitan memperoleh legitimasi akademis dan kuratorial yang kuat sebagai rujukan digital terpercaya peninggalan Majapahit.",
      ],
      subheading: "Akses Data Terbuka bagi Peneliti",
      secondaryParagraphs: [
        "Melalui integrasi ini, data hasil pemindaian 3D dan dokumen riset arkeologis akan disajikan secara bertahap dalam portal museum sebagai kontribusi terhadap gerakan *Open Access Heritage* di Indonesia.",
      ],
    },
    tags: ["Kemitraan", "BPK Wilayah XI", "Cagar Budaya", "Konservasi"],
  },
  {
    id: "seminar-internasional-majapahit",
    slug: "seminar-internasional-majapahit",
    title: "Seminar Internasional: Menelusuri Jalur Diplomasi Maritim Kemaharajaan Majapahit",
    category: "berita",
    subcategory: "Seminar & Simposium",
    publishedAt: "08 April 2024",
    author: "Panitia Simposium Sejarah Maritim",
    readingTime: "4 mnt baca",
    image: "/images/hero/slide-2.jpg",
    imageCaption: "Para pembicara seminar internasional membahas peta pelayaran dan bukti keramik asing di Trowulan.",
    excerpt:
      "Menghadirkan pakar sejarah maritim dari Asia Tenggara untuk menelaah jaringan perdagangan, armada Jung Majapahit, dan hubungan diplomatik antar-bangsa abad pertengahan.",
    content: {
      lead:
        "Kemaharajaan Majapahit tidak hanya berjaya di pedalaman Jawa Timur, namun menancapkan pengaruh peradaban maritim yang kuat di persimpangan jalur perdagangan dunia.",
      paragraphs: [
        "Seminar internasional yang diprakarsai PUISBM UNESA menghadirkan sejarawan dari berbagai universitas di Asia Tenggara guna mengkaji bukti arkeologis perkapalan, catatan Dinasti Ming, serta temuan keramik mancanegara di pelabuhan kuno Canggu dan Hujung Galuh.",
        "Diskusi menyoroti kearifan maritim Nusantara dan hukum tata pelayaran kuno yang pernah ditegakkan oleh Mahapatih Gajah Mada dalam menjaga kedaulatan perairan Nusantara.",
      ],
      subheading: "Publikasi Prosiding Ilmiah Terindeks",
      secondaryParagraphs: [
        "Makalah-makalah terpilih dari simposium internasional ini tengah disiapkan untuk diterbitkan dalam bentuk buku bunga rampai dan publikasi ilmiah terindeks di rubrik Publikasi Museum Virtual.",
      ],
    },
    tags: ["Maritim", "Seminar Internasional", "Diplomasi", "Sejarah"],
  },

  /* =========================================================================
     PROGRAM & KEGIATAN MUSEUM
     ========================================================================= */
  {
    id: "majapahit-dalam-arsitektur",
    slug: "majapahit-dalam-arsitektur",
    title: "Pameran Virtual 3D: Rekonstruksi Arsitektur Megah Kota Kuno Majapahit",
    category: "program",
    subcategory: "Pameran Virtual",
    publishedAt: "01 Mei 2024",
    author: "Kurator PUI Seni Budaya UNESA",
    readingTime: "4 mnt baca",
    image: "/images/pameran/arsitektur.jpg",
    imageCaption: "Tampilan render rekonstruksi 3D Gapura Bajang Ratu dan tata kota Trowulan.",
    excerpt:
      "Menjelajahi keagungan tata ruang dan arsitektur bata merah peninggalan era Wilwatikta melalui tur virtual 360 derajat dan pemodelan digital interaktif.",
    content: {
      lead:
        "PUI Seni Budaya Majapahitan UNESA mempersembahkan pameran virtual interaktif berskala luas yang merekonstruksi kemegahan tata kota metropolitan Trowulan pada abad ke-14.",
      paragraphs: [
        "Pengunjung diajak melintasi simulasi 3D gapura megah, kompleks perumahan bangsawan, petirtaan suci, hingga kanal-kanal hidrolika yang mengelilingi ibu kota kerajaan.",
        "Setiap model bangunan dirancang dengan akurasi ilmiah tinggi berdasarkan komparasi data ekskavasi arkeologi, sisa fondasi bata merah insitu, dan naskah Kakawin Nagarakretagama.",
      ],
      quote: {
        text: "Pameran ini adalah jembatan imersif bagi generasi muda untuk merasakan langsung atmosfer kemegahan arsitektur leluhur Nusantara.",
        author: "Prof. Dr. Djodjok Soepardjo, M.Hum.",
        role: "Kepala PUI Seni Budaya Majapahitan UNESA",
      },
      subheading: "Aksesibilitas dan Panduan Jelajah",
      secondaryParagraphs: [
        "Pameran dapat diakses secara gratis melalui peramban web desktop maupun perangkat mobile tanpa memerlukan perangkat VR khusus.",
      ],
    },
    tags: ["Pameran Virtual", "Arsitektur 3D", "Trowulan", "Rekonstruksi"],
    featured: true,
  },
  {
    id: "rupa-kontemporer-majapahitan",
    slug: "rupa-kontemporer-majapahitan",
    title: "Pameran Seni Rupa Kontemporer Bertema Warisan Budaya Majapahit",
    category: "program",
    subcategory: "Pameran Karya",
    publishedAt: "15 Mei 2024",
    author: "Divisi Kurasi Seni PUISBM",
    readingTime: "3 mnt baca",
    image: "/images/pameran/rupa.jpg",
    imageCaption: "Karya lukis dan seni instalasi seniman Jawa Timur dalam pameran seni rupa Majapahitan.",
    excerpt:
      "Kompilasi karya lukis, patung modern, dan seni instalasi oleh 30 seniman kontemporer yang mereinterpretasikan simbol dan mitologi Majapahit.",
    content: {
      lead:
        "Ruang temu antara estetika klasik dan ekspresi rupa modern terwujud dalam Pameran Seni Rupa Kontemporer Majapahitan.",
      paragraphs: [
        "Pameran ini menampilkan karya kurasi dari perupa Jawa Timur dan sivitas akademika Fakultas Bahasa dan Seni UNESA yang menggali kembali makna simbol Surya Majapahit, ragam hias terakota, dan figur punakawan.",
        "Setiap karya disertai catatan kuratorial yang mengulas dialog antara tradisi masa lalu dan tantangan sosial zaman modern.",
      ],
      subheading: "Kurasi dan Partisipasi Terbuka",
      secondaryParagraphs: [
        "Selain karya seniman undangan, pameran ini juga membuka ruang bagi karya terpilih kiriman masyarakat melalui rubrik Partisipasi Publik.",
      ],
    },
    tags: ["Seni Rupa", "Kontemporer", "Pameran Karya", "Kurasi Seni"],
  },
  {
    id: "webinar-naskah-kuno",
    slug: "webinar-naskah-kuno",
    title: "Webinar Nasional: Menyingkap Rahasia Manuskrip dan Prasasti Tembaga Majapahit",
    category: "program",
    subcategory: "Program Edukasi",
    publishedAt: "25 Mei 2024",
    author: "Tim Edukasi & Publikasi PUISBM",
    readingTime: "3 mnt baca",
    image: "/images/pameran/webinar.jpg",
    imageCaption: "Sesi materi pembacaan dan alih aksara prasasti kuno via daring.",
    excerpt:
      "Kelas daring terbuka mengenai tata cara membaca aksara Kawi, metode preservasi lontar, dan pembacaan prasasti lempeng tembaga peninggalan Hayam Wuruk.",
    content: {
      lead:
        "Sebuah kelas edukasi publik intensif untuk memperluas pemahaman masyarakat tentang aksara dan prasasti bersejarah era Majapahit.",
      paragraphs: [
        "Menghadirkan narasumber ahli filologi dan paleografi Nusantara, webinar ini membahas teknik alih aksara prasasti lempeng tembaga (tamra prasasti) dan metode penanggalan candrasengkala.",
        "Peserta diberikan modul pengenalan aksara Kawi serta panduan dasar identifikasi bahasa Jawa Kuno.",
      ],
      subheading: "Rekaman Sesi & Materi Pembelajaran",
      secondaryParagraphs: [
        "Seluruh materi presentasi dan rekaman webinar dapat diakses kembali oleh publik pada repositori edukasi daring PUI Seni Budaya Majapahitan.",
      ],
    },
    tags: ["Webinar", "Prasasti", "Filologi", "Edukasi"],
  },
  {
    id: "pertunjukan-tari-musik-majapahit",
    slug: "pertunjukan-tari-musik-majapahit",
    title: "Gelar Pertunjukan Seni Tari & Rekonstruksi Musik Klasik Wilwatikta",
    category: "program",
    subcategory: "Pertunjukan Budaya",
    publishedAt: "02 Juni 2024",
    author: "Laboratorium Seni Pertunjukan UNESA",
    readingTime: "4 mnt baca",
    image: "/images/pameran/tari.jpg",
    imageCaption: "Rekonstruksi koreografi tari istana berdasarkan motif relief Candi Penataran.",
    excerpt:
      "Penyajian garap seni tari dan tabuhan gamelan kuna laras slendro-pelog yang direkonstruksi dari relief instrumen musik percandian Jawa Timur.",
    content: {
      lead:
        "Laboratorium Seni Pertunjukan UNESA bersama seniman tradisi Jawa Timur mementaskan rekonstruksi gerak tari dan musikalitas era Majapahit.",
      paragraphs: [
        "Pementasan ini merupakan hasil penelitian panjang atas relief-relief pemusik dan penari di dinding Candi Penataran, Candi Surowono, dan Candi Rimbi.",
        "Alat musik rekacipta seperti celempung kuno, kendang gerabah, dan saron berbilah perunggu dimainkan secara harmonis mengiringi tari keprajuritan dan tari puja sakral.",
      ],
      subheading: "Dokumentasi Audio Visual 4K",
      secondaryParagraphs: [
        "Pertunjukan ini telah didokumentasikan dalam format video resolusi tinggi dan rekaman audio multitrack untuk pelestarian arsip kebudayaan nasional.",
      ],
    },
    tags: ["Pertunjukan Budaya", "Tari Tradisi", "Gamelan Kuno", "Rekonstruksi"],
  },
  {
    id: "workshop-fotogrametri-3d-artefak",
    slug: "workshop-fotogrametri-3d-artefak",
    title: "Workshop Intensif: Pemindaian Fotogrametri 3D dan Digitalisasi Koleksi Sejarah",
    category: "program",
    subcategory: "Workshop & Pelatihan",
    publishedAt: "10 Juni 2024",
    author: "Tim Teknologi Konservasi PUISBM",
    readingTime: "5 mnt baca",
    image: "/images/hero/slide-1.jpg",
    imageCaption: "Praktik langsung pemindaian terestrial 3D dan pemodelan tekstur artefak.",
    excerpt:
      "Pelatihan teknis bagi kurator museum, mahasiswa, dan komunitas pelestari cagar budaya dalam membuat model 3D artefak resolusi tinggi.",
    content: {
      lead:
        "Program pelatihan berbasis praktik langsung (*hands-on workshop*) untuk mencetak tenaga terampil dalam teknologi konservasi digital cagar budaya.",
      paragraphs: [
        "Peserta dibimbing melakukan pengambilan foto multisudut terkalibrasi, pemrosesan *point cloud*, pembuatan jaring geometri (*polygon mesh*), hingga optimasi tekstur PBR (*Physically Based Rendering*).",
        "Hasil pemodelan peserta langsung diunggah ke repositori 3D Museum Virtual Majapahitan.",
      ],
      subheading: "Sertifikasi Kompetensi Konservasi Digital",
      secondaryParagraphs: [
        "Setiap peserta yang menyelesaikan proyek digitalisasi artefak mendapatkan sertifikat resmi pelatihan dari PUI Seni Budaya Majapahitan UNESA.",
      ],
    },
    tags: ["Workshop & Pelatihan", "Fotogrametri 3D", "Konservasi", "Digitalisasi"],
  },
  {
    id: "simposium-internasional-kebudayaan",
    slug: "simposium-internasional-kebudayaan",
    title: "Simposium Internasional: Kebijakan Konservasi dan Diplomasi Budaya Nusantara",
    category: "program",
    subcategory: "Seminar & Simposium",
    publishedAt: "20 Juni 2024",
    author: "PUI Seni Budaya Majapahitan UNESA",
    readingTime: "4 mnt baca",
    image: "/images/hero/slide-3.jpg",
    imageCaption: "Panel diskusi internasional tentang diplomasi kebudayaan dan pelestarian cagar budaya.",
    excerpt:
      "Forum ilmiah berkala yang mempertemukan pemangku kebijakan, arkeolog, dan sejarawan global dalam merumuskan strategi pelestarian cagar budaya berkelanjutan.",
    content: {
      lead:
        "Sebuah forum dialog internasional yang mendiskusikan strategi perlindungan warisan budaya di tengah tantangan modernisasi dan perubahan iklim.",
      paragraphs: [
        "Simposium ini menghadirkan perwakilan UNESCO, Kementerian Kebudayaan, peneliti arkeometri, serta kurator museum internasional.",
        "Fokus utama diskusi adalah pemanfaatan teknologi digital dan museum virtual sebagai sarana diplomasi kebudayaan dan pendidikan publik global.",
      ],
      subheading: "Rekomendasi Kebijakan (Policy Brief)",
      secondaryParagraphs: [
        "Hasil sidang komisi simposium dirumuskan menjadi dokumen rekomendasi kebijakan konservasi cagar budaya untuk pemerintah daerah dan pusat.",
      ],
    },
    tags: ["Seminar & Simposium", "Diplomasi Budaya", "Konservasi", "UNESCO"],
  },
];

/* Helper queries for Posts */
export function getAllPosts(): PostItem[] {
  return postsList;
}

export function getPostsByCategory(category: PostCategory): PostItem[] {
  return postsList.filter((p) => p.category === category);
}

export function getPostBySlug(slug: string): PostItem | undefined {
  return postsList.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category?: PostCategory, limit = 3): PostItem[] {
  return postsList
    .filter((p) => p.slug !== currentSlug && (!category || p.category === category))
    .slice(0, limit);
}

/* ==========================================================================
   PUBLIKASI & PENELITIAN AKADEMIS (E-Library Gateway)
   ========================================================================== */

export type PublikasiItem = {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  publicationName: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: string;
  typeBadge: string;
  sintaBadge?: string;
  doi?: string;
  externalUrl: string; // Tautan langsung ke E-Library / OJS / Repositori
  pdfUrl?: string; // Tautan unduh PDF jika ada
  abstract: string;
  keywords: string[];
  citation?: string; // Format sitasi (opsional)
};

export const publikasiList: PublikasiItem[] = [
  {
    id: "rekonstruksi-hidrolika-trowulan",
    slug: "rekonstruksi-hidrolika-trowulan",
    title: "Rekonstruksi Spasial dan Tata Kelola Hidrolika Kota Kuno Majapahit Berdasarkan Fotogrametri 3D dan Kakawin Nagarakretagama",
    authors: ["Prof. Dr. Djodjok Soepardjo, M.Hum.", "Dr. Trisakti, M.Si.", "Welly Suryandoko, M.Pd."],
    publicationName: "Jurnal Reksa Budaya UNESA · Vol. 8 No. 2 (2024)",
    year: "2024",
    typeBadge: "Jurnal Ilmiah Nasional",
    sintaBadge: "SINTA 2",
    doi: "10.26740/reksabudaya.v8n2.p112-128",
    externalUrl: "https://ejournal.unesa.ac.id",
    pdfUrl: "https://ejournal.unesa.ac.id",
    abstract:
      "Penelitian ini mengkaji struktur jaringan hidrolika dan saluran air purba di kawasan situs percandian Trowulan melalui integrasi pemindaian spasial fotogrametri 3D dan analisis komparatif teks Nagarakretagama pupuh 8–12. Temuan menunjukkan adanya perencanaan tata air terpadu yang memadukan waduk penampung (Segaran), kanal pembagi, dan kolam petirtaan suci berdimensi modular.",
    keywords: ["Majapahit", "Hidrolika Kuno", "Trowulan", "Fotogrametri 3D", "Nagarakretagama"],
    citation:
      "Soepardjo, D., Trisakti, & Suryandoko, W. (2024). Rekonstruksi Spasial dan Tata Kelola Hidrolika Kota Kuno Majapahit Berdasarkan Fotogrametri 3D dan Kakawin Nagarakretagama. Jurnal Reksa Budaya UNESA, 8(2), 112-128.",
  },
  {
    id: "kajian-estetika-relief-majapahit",
    slug: "kajian-estetika-relief-majapahit",
    title: "Kajian Estetika dan Simbolisme Kosmologi Relief Surya Majapahit pada Arsitektur Candi Abad XIV",
    authors: ["Dr. Trisakti, M.Si.", "Prof. Dr. Djodjok Soepardjo, M.Hum."],
    publicationName: "Jurnal Seni Rupa dan Desain Nusantara · Vol. 11 No. 1 (2024)",
    year: "2024",
    typeBadge: "Jurnal Terakreditasi",
    sintaBadge: "SINTA 2",
    doi: "10.26740/jsrdn.v11n1.p45-60",
    externalUrl: "https://ejournal.unesa.ac.id",
    abstract:
      "Simbol Surya Majapahit merupakan representasi visual kosmologi adiluhung yang memadukan delapan arah mata angin dewa Lokapala dengan diagram kosmis Hindu-Buddha. Penelitian ini menganalisis ragam hias motif surya pada gapura paduraksa dan candi bentar di Jawa Timur.",
    keywords: ["Surya Majapahit", "Estetika Relief", "Kosmologi", "Arsitektur Klasik"],
    citation:
      "Trisakti, & Soepardjo, D. (2024). Kajian Estetika dan Simbolisme Kosmologi Relief Surya Majapahit pada Arsitektur Candi Abad XIV. Jurnal Seni Rupa dan Desain Nusantara, 11(1), 45-60.",
  },
  {
    id: "preservasi-digital-naskah-lontar",
    slug: "preservasi-digital-naskah-lontar",
    title: "Preservasi Digital dan Alih Aksara Naskah Lontar Manuskrip Pustaka Raja Jawa Timur Era Majapahit Akhir",
    authors: ["Tim Peneliti Filologi PUISBM UNESA"],
    publicationName: "Prosiding Simposium Internasional Pernaskahan Nusantara XX (2023)",
    year: "2023",
    typeBadge: "Prosiding Internasional",
    sintaBadge: "Scopus / Crossref",
    doi: "10.1007/978-981-19-4567-8_12",
    externalUrl: "https://repository.unesa.ac.id",
    abstract:
      "Studi ini memaparkan protokol standardisasi pemindaian multispektral bebas UV pada daun lontar rapuh koleksi masyarakat Jawa Timur serta metodologi anotasi filologis berbasis Unicode aksara Jawa Kuno untuk keterbukaan akses akademis publik.",
    keywords: ["Filologi", "Naskah Lontar", "Aksara Jawa Kuno", "Digital Preservation"],
    citation:
      "PUISBM UNESA. (2023). Preservasi Digital dan Alih Aksara Naskah Lontar Manuskrip Pustaka Raja Jawa Timur Era Majapahit Akhir. Prosiding Simposium Internasional Pernaskahan Nusantara XX, 185-202.",
  },
  {
    id: "diplomasi-maritim-ekonomi-majapahit",
    slug: "diplomasi-maritim-ekonomi-majapahit",
    title: "Jejak Diplomasi Maritim dan Jaringan Perdagangan Keramik Kemaharajaan Majapahit di Pelabuhan Canggu",
    authors: ["Welly Suryandoko, S.Pd., M.Pd.", "Dr. Trisakti, M.Si."],
    publicationName: "Jurnal Paramita: Historical Studies Journal · Vol. 33 No. 2 (2023)",
    year: "2023",
    typeBadge: "Jurnal Terindeks Scopus",
    sintaBadge: "SINTA 1",
    doi: "10.15294/paramita.v33i2.41289",
    externalUrl: "https://journal.unnes.ac.id",
    abstract:
      "Melalui temuan pecahan keramik Dinasti Yuan dan Ming di pelabuhan sungai Canggu, artikel ini membuktikan intensitas perdagangan internasional dan hukum pelayaran maritim yang diatur secara ketat oleh Syahbandar Majapahit pada abad pertengahan.",
    keywords: ["Pelabuhan Canggu", "Diplomasi Maritim", "Keramik Kuno", "Sungai Brantas"],
    citation:
      "Suryandoko, W., & Trisakti. (2023). Jejak Diplomasi Maritim dan Jaringan Perdagangan Keramik Kemaharajaan Majapahit di Pelabuhan Canggu. Paramita: Historical Studies Journal, 33(2), 210-224.",
  },
  {
    id: "monograf-ragam-arca-andesit",
    slug: "monograf-ragam-arca-andesit",
    title: "Monograf: Tipologi dan Gaya Pahat Arca Andesit Masa Hayam Wuruk di Museum Wilayah Jawa Timur",
    authors: ["Prof. Dr. Djodjok Soepardjo, M.Hum."],
    publicationName: "Penerbit UNESA University Press (ISBN: 978-602-449-812-4)",
    year: "2023",
    typeBadge: "Buku Monograf Referensi",
    externalUrl: "https://repository.unesa.ac.id",
    abstract:
      "Buku monograf komprehensif setebal 240 halaman yang menguraikan klasifikasi morfologi, proporsi anatomi seni pahat, dan signifikansi keagamaan arca-arca andesit peninggalan masa keemasan Raja Hayam Wuruk.",
    keywords: ["Monograf", "Arca Andesit", "Hayam Wuruk", "Seni Patung Klasik"],
    citation:
      "Soepardjo, D. (2023). Tipologi dan Gaya Pahat Arca Andesit Masa Hayam Wuruk di Museum Wilayah Jawa Timur. Surabaya: UNESA University Press.",
  },
  {
    id: "laporan-ekskavasi-bata-merah",
    slug: "laporan-ekskavasi-bata-merah",
    title: "Laporan Teknis Arkeologis: Ekskavasi Penyelamatan Struktur Fondasi Bata Merah Sektor Sooko-Trowulan",
    authors: ["Tim Arkeologi Lapangan PUISBM UNESA"],
    publicationName: "Laporan Riset Terbuka Balai Konservasi & PUISBM UNESA",
    year: "2024",
    typeBadge: "Laporan Riset Terbuka",
    externalUrl: "https://repository.unesa.ac.id",
    pdfUrl: "https://repository.unesa.ac.id",
    abstract:
      "Dokumentasi stratigrafi, analisis komposisi mineral tanah liat bata merah, dan rekonstruksi 3D fondasi pemukiman urban yang tersingkap pada survei geomorfologi penyelamatan tahun 2024.",
    keywords: ["Laporan Ekskavasi", "Bata Merah Kosod", "Trowulan", "Stratigrafi"],
    citation:
      "Tim PUISBM UNESA. (2024). Laporan Teknis Arkeologis: Ekskavasi Penyelamatan Struktur Fondasi Bata Merah Sektor Sooko-Trowulan. Surabaya: PUISBM UNESA.",
  },
];

export function getAllPublikasi(): PublikasiItem[] {
  return publikasiList;
}

export function getPublikasiBySlug(slug: string): PublikasiItem | undefined {
  return publikasiList.find((p) => p.slug === slug);
}

/* ==========================================================================
   GALERI KARYA & KOLEKSI VISUAL (Interactive Lightbox Dataset)
   ========================================================================== */

export type KaryaCategory = "publik" | "otentik" | "kontemporer";

export type KaryaItem = {
  id: string;
  slug: string;
  title: string;
  category: KaryaCategory;
  categoryLabel: string;
  subcategory?: string; // "Lukisan & Gambar" | "Patung & Seni Kriya" | "Seni Digital & 3D" | "Fotografi Arsitektur"
  creator: string;
  institution?: string;
  year: string;
  material?: string;
  dimensions?: string;
  image: string;
  description: string;
  featured?: boolean;
};

export const karyaList: KaryaItem[] = [
  {
    id: "arca-harihara-simping",
    slug: "arca-harihara-simping",
    title: "Arca Harihara (Perwujudan Kertarajasa Jayawardhana)",
    category: "otentik",
    categoryLabel: "Koleksi Otentik",
    subcategory: "Patung & Seni Kriya",
    creator: "Pematung Kerajaan Era Majapahit Awal",
    institution: "Candi Simping (Sumberjati, Blitar)",
    year: "Abad XIV (± 1309 M)",
    material: "Batu Andesit Halus",
    dimensions: "Tinggi 200 cm, Lebar 75 cm",
    image: "/images/koleksi/ganesha.jpg",
    description:
      "Arca deifikasi Raden Wijaya sebagai gabungan Dewa Wisnu dan Siwa (Harihara). Memegang atribut sankha, cakra, trisula, dan gada dengan hiasan mahkota kirita mukuta yang melambangkan penyatuan dua aliran keagamaan besar di masa awal berdirinya Majapahit.",
    featured: true,
  },
  {
    id: "surya-majapahit-emas",
    slug: "surya-majapahit-emas",
    title: "Relief Lambang Surya Majapahit Berlapis Emas",
    category: "kontemporer",
    categoryLabel: "Seni Kontemporer",
    subcategory: "Patung & Seni Kriya",
    creator: "Dr. Trisakti, M.Si. & Tim Seni Rupa UNESA",
    institution: "Laboratorium Desain & Seni Rupa UNESA",
    year: "2024",
    material: "Resin Logam & Serbuk Kuningan Berpudar Emas",
    dimensions: "Diameter 110 cm, Tebal 8 cm",
    image: "/images/pameran/rupa.jpg",
    description:
      "Interpretasi rupa kontemporer atas simbol Surya Majapahit. Menggambarkan lingkaran kosmis delapan dewa Lokapala dengan teknik tempa relief modern yang memantulkan gradasi keemasan megah.",
    featured: true,
  },
  {
    id: "lukisan-gajah-mada-pantang-surut",
    slug: "lukisan-gajah-mada-pantang-surut",
    title: "Lukisan: Sumpah Palapa Sang Mahapatih",
    category: "publik",
    categoryLabel: "Karya Publik",
    subcategory: "Lukisan & Gambar",
    creator: "Bambang Wijanarko",
    institution: "Komunitas Seni Lukis Jawa Timur",
    year: "2023",
    material: "Cat Minyak di Atas Kanvas Linen",
    dimensions: "150 x 100 cm",
    image: "/images/hero/slide-1.jpg",
    description:
      "Lukisan ekspresif realis yang menggambarkan gestur khidmat Mahapatih Gajah Mada saat mengikrarkan Sumpah Palapa di hadapan Ratu Tribhuwana Tunggadewi dan para petinggi Wilwatikta.",
    featured: true,
  },
  {
    id: "gapura-wringin-lawang-senja",
    slug: "gapura-wringin-lawang-senja",
    title: "Fotografi Arsitektur: Keagungan Gapura Wringin Lawang",
    category: "publik",
    categoryLabel: "Karya Publik",
    subcategory: "Fotografi Arsitektur",
    creator: "Rendra Kurniawan",
    institution: "Institut Seni & Fotografi Indonesia",
    year: "2024",
    material: "Digital C-Print on Metallic Paper",
    dimensions: "90 x 60 cm",
    image: "/images/koleksi/gapura.jpg",
    description:
      "Karya fotografi lanskap beresolusi tinggi yang menangkap siluet candi bentar Wringin Lawang berbalut cahaya jingga matahari terbenam di Trowulan, menonjolkan tekstur bata merah kosod kuno.",
    featured: true,
  },
  {
    id: "seni-digital-pelabuhan-canggu",
    slug: "seni-digital-pelabuhan-canggu",
    title: "Seni Digital 3D: Suasana Niaga Pelabuhan Canggu Abad XIV",
    category: "publik",
    categoryLabel: "Karya Publik",
    subcategory: "Seni Digital & 3D",
    creator: "Maya Saraswati",
    institution: "Prodi Desain Komunikasi Visual UNESA",
    year: "2024",
    material: "Digital 3D Concept Art & Matte Painting",
    dimensions: "3840 x 2160 px (4K)",
    image: "/images/hero/slide-2.jpg",
    description:
      "Rekonstruksi seni visual digital yang memvisualisasikan hiruk-pikuk kapal-kapal dagang mancanegara, dermaga sungai Brantas, dan para pedagang di Pelabuhan Canggu masa pemerintahan Hayam Wuruk.",
  },
  {
    id: "kain-batik-motif-surya-wilwatikta",
    slug: "kain-batik-motif-surya-wilwatikta",
    title: "Kain Batik Tulis Motif Surya Wilwatikta & Flora Candi",
    category: "publik",
    categoryLabel: "Karya Publik",
    subcategory: "Patung & Seni Kriya",
    creator: "Sanggar Batik Tradisi Majapahit",
    institution: "Paguyuban Perajin Batik Trowulan-Mojokerto",
    year: "2024",
    material: "Kain Sutra ATBM & Pewarna Alami Kulit Kayu",
    dimensions: "250 x 115 cm",
    image: "/images/pameran/rupa.jpg",
    description:
      "Karya seni tekstil batik tulis halus yang memadukan ragam hias lambang Surya Majapahit dengan sulur-suluran teratai terinspirasi dari ornamen relief batu Candi Bajang Ratu.",
  },
  {
    id: "sketsa-arsitektur-candi-tikus",
    slug: "sketsa-arsitektur-candi-tikus",
    title: "Ilustrasi Manual: Sketsa Aksonometri Petirtaan Candi Tikus",
    category: "publik",
    categoryLabel: "Karya Publik",
    subcategory: "Lukisan & Gambar",
    creator: "Dimas Arya Prasetya",
    institution: "Komunitas Sketsa Heritage Surabaya",
    year: "2023",
    material: "Tinta Cina (Drawing Pen) & Cat Air",
    dimensions: "60 x 42 cm (A2)",
    image: "/images/hero/slide-3.jpg",
    description:
      "Gambar sketsa arsitektur tangan bebas yang memperlihatkan tata susun miniatur candi dan kolam petirtaan Candi Tikus dengan studi pencahayaan dramatis.",
  },
  {
    id: "celengan-terakota-majapahit",
    slug: "celengan-terakota-majapahit",
    title: "Celengan Terakota Berbentuk Babi Hutan (Peninggalan Trowulan)",
    category: "otentik",
    categoryLabel: "Koleksi Otentik",
    subcategory: "Patung & Seni Kriya",
    creator: "Pengrajin Gerabah Trowulan Kuno",
    institution: "Situs Pemukiman Segaran, Trowulan",
    year: "Abad XIV–XV Masehi",
    material: "Tanah Liat Bakar (Terakota)",
    dimensions: "Panjang 32 cm, Tinggi 20 cm",
    image: "/images/koleksi/prasasti.jpg",
    description:
      "Benda budaya ikonik masyarakat perkotaan Majapahit yang merefleksikan kemakmuran ekonomi dan tradisi menabung. Dibuat dengan teknik cetak tekan dan lepa tanah liat halus berglasir natural.",
  },
  {
    id: "pusaka-keris-majapahit-luk-sembilan",
    slug: "pusaka-keris-majapahit-luk-sembilan",
    title: "Pusaka Keris Luk Sembilan Tangguh Majapahit Pamor Udan Mas",
    category: "otentik",
    categoryLabel: "Koleksi Otentik",
    subcategory: "Patung & Seni Kriya",
    creator: "Mpu Keris Kerajaan Majapahit",
    institution: "Koleksi Pusaka Karaton Majapahit",
    year: "Abad XIV Masehi",
    material: "Besi Tempa, Baja, & Meteorit Pamor",
    dimensions: "Panjang Bilah 36 cm, Warangka 45 cm",
    image: "/images/koleksi/kitab.jpg",
    description:
      "Pusaka tosan aji era klasik dengan bilah ramping berluk sembilan. Pola pamor udan mas (hujan emas) melambangkan kemakmuran dan perlindungan spiritual bagi pemegangnya.",
  },
  {
    id: "relief-kala-candi-bajangratu",
    slug: "relief-kala-candi-bajangratu",
    title: "Dokumentasi Ornamen Relief Kepala Kala Candi Bajang Ratu",
    category: "otentik",
    categoryLabel: "Koleksi Otentik",
    subcategory: "Fotografi Arsitektur",
    creator: "Arsitek Kerajaan Majapahit",
    institution: "Situs Candi Bajang Ratu, Trowulan",
    year: "Abad XIV Masehi",
    material: "Pahatan Bata Merah Kosod & Batu Andesit",
    dimensions: "Lebar Ornamen 140 cm",
    image: "/images/koleksi/gapura.jpg",
    description:
      "Foto makro ornamen kepala Kala berkumis melengkung yang terpasang di atas ambang pintu gapura paduraksa, berfungsi sebagai penolak bala dan penjaga kesucian ruang sakral.",
  },
  {
    id: "prasasti-canggu-lempeng-tembaga",
    slug: "prasasti-canggu-lempeng-tembaga",
    title: "Prasasti Canggu (Tamra Prasasti Piagam Penyeberangan Ferry)",
    category: "otentik",
    categoryLabel: "Koleksi Otentik",
    subcategory: "Patung & Seni Kriya",
    creator: "Juru Tulis Kerajaan Era Raja Hayam Wuruk",
    institution: "Dikeluarkan di Desa Canggu, Mojokerto",
    year: "1358 Masehi",
    material: "Lempeng Tembaga Berukir Aksara Kawi",
    dimensions: "40 x 12 cm per lempeng",
    image: "/images/koleksi/prasasti.jpg",
    description:
      "Prasasti bersejarah yang memuat dekrit Raja Hayam Wuruk mengenai hak istimewa para pengelola penyeberangan (naditira pradeça) di sepanjang Sungai Brantas dan Bengawan Solo.",
  },
  {
    id: "rekonstruksi-3d-candi-brahu",
    slug: "rekonstruksi-3d-candi-brahu",
    title: "Model Virtual 3D: Candi Brahu & Kawasan Suci",
    category: "otentik",
    categoryLabel: "Koleksi Otentik",
    subcategory: "Seni Digital & 3D",
    creator: "Tim Fotogrametri & 3D Scanning PUISBM",
    institution: "Laboratorium Arkeologi Digital UNESA",
    year: "2024",
    material: "Digital Polygon Mesh & 4K PBR Texture",
    dimensions: "Skala 1:1 Digital Asset",
    image: "/images/pameran/arsitektur.jpg",
    description:
      "Hasil pemindaian spasial terestrial fotogrametri berakurasi milimeter dari bangunan Candi Brahu, candi Buddha tertua di kawasan ibu kota Majapahit.",
  },
  {
    id: "kain-batik-modern-pola-candi",
    slug: "kain-batik-modern-pola-candi",
    title: "Kain Sutra Modern: Eksplorasi Motif Geometris Candi Penataran",
    category: "kontemporer",
    categoryLabel: "Seni Kontemporer",
    subcategory: "Patung & Seni Kriya",
    creator: "Tim Riset Tekstil & Kriya FBS UNESA",
    institution: "Laboratorium Kriya Tekstil UNESA",
    year: "2024",
    material: "Sutra Tenun Tradisional & Canting Tulis",
    dimensions: "260 x 120 cm",
    image: "/images/pameran/rupa.jpg",
    description:
      "Kreasi tekstil modern kontemporer yang mengekstraksi pola geometris dan sulur dedaunan dari relief dinding Candi Penataran menjadi komposisi busana etnik modern bertaraf internasional.",
  },
  {
    id: "instalasi-naskah-kawi-digital",
    slug: "instalasi-naskah-kawi-digital",
    title: "Instalasi Seni Digital: Rekonstruksi Tipografi Aksara Kawi",
    category: "kontemporer",
    categoryLabel: "Seni Kontemporer",
    subcategory: "Seni Digital & 3D",
    creator: "Welly Suryandoko, M.Pd. & Tim Multimedia",
    institution: "PUI Seni Budaya Majapahitan UNESA",
    year: "2024",
    material: "Animasi Interaktif & Proyeksi Pemetaan",
    dimensions: "Dimensi Variabel (300 x 200 cm)",
    image: "/images/koleksi/kitab.jpg",
    description:
      "Karya instalasi seni media baru yang mengubah bait-bait Kakawin Nagarakretagama beraksara Kawi menjadi partikel cahaya dinamis yang bereaksi terhadap gerakan pengunjung.",
  },
  {
    id: "lukisan-ekspresi-wilwatikta",
    slug: "lukisan-ekspresi-wilwatikta",
    title: "Lukisan Akrilik: Gema Kejayaan Armada Laut Wilwatikta",
    category: "kontemporer",
    categoryLabel: "Seni Kontemporer",
    subcategory: "Lukisan & Gambar",
    creator: "Dr. Trisakti, M.Si.",
    institution: "PUI Seni Budaya Majapahitan UNESA",
    year: "2023",
    material: "Cat Akrilik & Tekstur Pasir Vulkanik di Kanvas",
    dimensions: "180 x 120 cm",
    image: "/images/hero/slide-2.jpg",
    description:
      "Lukisan kontemporer semi-abstrak yang menangkap energi kedigdayaan bahari Majapahit dengan sapuan warna tanah terakota, biru laut samudra, dan guratan emas simbol kedaulatan.",
  },
  {
    id: "kriya-topeng-panji-majapahitan",
    slug: "kriya-topeng-panji-majapahitan",
    title: "Kriya Kayu Pahat: Topeng Panji Karakter Ksatria Wilwatikta",
    category: "publik",
    categoryLabel: "Karya Publik",
    subcategory: "Patung & Seni Kriya",
    creator: "Ki Suwardi Atmosudirjo",
    institution: "Sanggar Seni Ukir Tradisi Trowulan",
    year: "2023",
    material: "Kayu Jati Kuno & Cat Sungging Emas Prada",
    dimensions: "22 x 16 x 12 cm",
    image: "/images/pameran/tari.jpg",
    description:
      "Karya seni kriya topeng kayu bermotif ukir klasik cerita Panji yang berkembang pada masa Majapahit akhir, menampilkan raut wajah tenang penuh kewibawaan dan keagungan budi pekerti.",
  },
];

export function getAllKarya(): KaryaItem[] {
  return karyaList;
}

export function getKaryaByCategory(category: KaryaCategory): KaryaItem[] {
  return karyaList.filter((k) => k.category === category);
}

export function getMuseumKarya(): KaryaItem[] {
  return karyaList.filter((k) => k.category === "otentik" || k.category === "kontemporer");
}

export function getFeaturedKarya(): KaryaItem[] {
  return karyaList.filter((k) => k.featured);
}



/* Backward compatibility for landing page BeritaTerbaru */
export type Berita = {
  id: string;
  title: string;
  date: string;
  image: string;
  href: string;
};

export const beritas: Berita[] = postsList
  .filter((p) => p.category === "berita")
  .slice(0, 3)
  .map((p) => ({
    id: p.id,
    title: p.title,
    date: p.publishedAt,
    image: p.image,
    href: `/berita/${p.slug}`,
  }));



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
    href: "#",
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
    label: "Gedung Laboratorium Anti Doping UNESA",
    href: "https://maps.app.goo.gl/GqpisKzQERkrwvKz9",
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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export type GaleriDokumentasiItem = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export const tentangPage = {
  hero: {
    eyebrow: "TENTANG MUSEUM",
    title: "Mengenal Museum Virtual Majapahitan",
    subtitle:
      "Pusat konservasi digital dan ruang apresiasi warisan kebudayaan Kerajaan Majapahit dalam kemasan teknologi modern.",
    image: "/images/hero/slide-1.jpg",
  },
  visiMisi: {
    eyebrow: "VISI & MISI",
    title: "Arah & Dedikasi Kami",
    visi: "Menjadi pusat konservasi digital dan rujukan utama pelestarian seni budaya Majapahit berkelas dunia yang memadukan keilmuan akademis dengan apresiasi publik.",
    misi: [
      "Mendokumentasikan dan mendigitalisasi peninggalan sejarah, situs, artefak, dan manuskrip era Majapahit secara komprehensif.",
      "Mengembangkan platform museum virtual interaktif yang dapat diakses oleh masyarakat global untuk keperluan edukasi dan penelitian.",
      "Mewadahi ruang temu dan ekspresi bagi penciptaan karya seni kontemporer bernafaskan nilai-nilai kearifan lokal Majapahitan.",
      "Membangun kolaborasi lintas institusi dan kemitraan masyarakat dalam pelestarian warisan budaya Nusantara.",
    ],
  },
  sejarah: {
    eyebrow: "SEJARAH MUSEUM",
    title: "Latar Belakang & Pendirian",
    image: "/images/tentang/arca.jpg",
    paragraphs: [
      "Pusat Unggulan IPTEK Perguruan Tinggi (PUI-PT) Seni Budaya Majapahitan didirikan di Universitas Negeri Surabaya sebagai ikhtiar pelestarian warisan peradaban Majapahit yang kaya akan nilai historis, filosofis, dan estetika adiluhung.",
      "Melalui pemanfaatan teknologi digital, pemindaian 3D, serta dokumentasi kuratorial mendalam, Museum Virtual Majapahitan hadir untuk menjembatani memori kolektif masa lampau dengan generasi masa kini dan masa depan.",
      "Inisiatif ini tidak hanya berfokus pada konservasi artefak bersejarah (karya otentik), namun juga secara aktif mendorong riset akademis, publikasi ilmiah, dan ruang kreasi kontemporer bagi sivitas akademika maupun masyarakat luas.",
    ],
  },
  tim: {
    eyebrow: "STRUKTUR ORGANISASI",
    title: "Pengelola & Tim Ahli",
    subtitle:
      "Didukung oleh para akademisi, kurator seni, peneliti sejarah, dan pengembang teknologi.",
    members: [
      {
        id: "ketua",
        name: "Prof. Dr. Djodjok Soepardjo, M.Hum.",
        role: "Ketua PUI Seni Budaya Majapahitan",
        photo: "/images/tentang/tim-1.jpg",
      },
      {
        id: "kurator",
        name: "Dr. Trisakti, M.Si.",
        role: "Koordinator Riset & Kurasi",
        photo: "/images/tentang/tim-2.jpg",
      },
      {
        id: "arkeolog",
        name: "Welly Suryandoko, S.Pd., M.Pd.",
        role: "Divisi Konservasi & Sejarah",
        photo: "/images/tentang/tim-3.jpg",
      },
      {
        id: "teknologi",
        name: "Tim Pengembang Virtual & Media",
        role: "Teknologi Digital & Sistem Informasi",
        photo: "/images/tentang/tim-4.jpg",
      },
    ] as TeamMember[],
  },
  mitra: {
    eyebrow: "MITRA KERJA SAMA",
    title: "Partner & Kolaborasi Institusi",
    subtitle:
      "Bekerja sama dengan berbagai institusi pendidikan, balai pelestarian kebudayaan, dan komunitas seni.",
  },
  kontak: {
    eyebrow: "KONTAK & LOKASI",
    title: "Hubungi & Kunjungi Kami",
    description:
      "Kami terbuka untuk kolaborasi penelitian, kunjungan edukasi, serta partisipasi aktif dalam pelestarian seni budaya Majapahitan.",
  },
  galeri: {
    eyebrow: "GALERI FOTO",
    title: "Dokumentasi Museum & Kegiatan",
    subtitle:
      "Dokumentasi penelusuran situs bersejarah, konservasi artefak, dan kegiatan apresiasi seni budaya.",
    items: [
      {
        id: "g1",
        title: "Gapura Wringin Lawang",
        category: "Situs Sejarah",
        image: "/images/koleksi/gapura.jpg",
      },
      {
        id: "g2",
        title: "Prasasti Canggu & Manuskrip",
        category: "Artefak Kuno",
        image: "/images/koleksi/prasasti.jpg",
      },
      {
        id: "g3",
        title: "Arsitektur Klasik Majapahit",
        category: "Arsitektur",
        image: "/images/pameran/arsitektur.jpg",
      },
      {
        id: "g4",
        title: "Pameran Seni Kontemporer",
        category: "Pameran",
        image: "/images/pameran/rupa.jpg",
      },
      {
        id: "g5",
        title: "Arca & Relik Klasik",
        category: "Koleksi Budaya",
        image: "/images/koleksi/ganesha.jpg",
      },
      {
        id: "g6",
        title: "Workshop Digitalisasi Budaya",
        category: "Edukasi & Riset",
        image: "/images/berita/workshop.jpg",
      },
    ] as GaleriDokumentasiItem[],
  },
};

/* ==========================================================================
   MUSEUM KONSERVASI
   ========================================================================== */

export type KonservasiPilar = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
  stat?: string;
};

export type KonservasiStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const konservasiPage = {
  hero: {
    eyebrow: "MUSEUM KONSERVASI",
    title: "Melestarikan Warisan Peradaban Majapahit",
    subtitle:
      "Dokumentasi, konservasi, dan digitalisasi situs bersejarah serta artefak peninggalan Kerajaan Majapahit oleh PUI Seni Budaya Majapahitan, Universitas Negeri Surabaya.",
    image: "/images/hero/slide-1.jpg",
  },
  pengantar: {
    eyebrow: "TENTANG KONSERVASI",
    title: "Mengapa Konservasi Digital?",
    paragraphs: [
      "Peninggalan Kerajaan Majapahit tersebar di berbagai wilayah Jawa Timur — dari candi dan gapura yang masih berdiri, hingga prasasti dan artefak yang tersimpan di museum-museum dan situs terbuka. Tantangan utamanya adalah aksesibilitas: tidak semua pihak dapat mengunjungi lokasi secara langsung, dan banyak peninggalan mengalami kerusakan akibat waktu dan cuaca.",
      "Museum Konservasi hadir sebagai jawaban — sebuah ruang virtual yang mendokumentasikan, memindai, dan menyajikan peninggalan-peninggalan tersebut dalam bentuk digital beresolusi tinggi. Dengan pendekatan ini, warisan Majapahit dapat diakses, dipelajari, dan diapresiasi oleh siapa saja, di mana saja.",
    ],
  },
  pilar: [
    {
      id: "situs",
      title: "Situs & Arsitektur",
      description:
        "Candi, gapura, petirtaan, dan kompleks bangunan peninggalan era Majapahit yang telah didokumentasikan dan dikonservasi secara digital.",
      image: "/images/koleksi/gapura.jpg",
      href: "/konservasi/situs",
      cta: "Jelajahi Situs",
      stat: "12+ Situs Terdokumentasi",
    },
    {
      id: "artefak",
      title: "Artefak & Benda Budaya",
      description:
        "Prasasti, arca, keramik, perhiasan, dan benda-benda budaya otentik dari masa Kerajaan Majapahit yang didigitalisasi untuk kepentingan riset dan edukasi.",
      image: "/images/koleksi/prasasti.jpg",
      href: "/konservasi/artefak",
      cta: "Telusuri Artefak",
      stat: "50+ Artefak Terdigitalisasi",
    },
  ] as KonservasiPilar[],
  proses: {
    eyebrow: "PROSES KAMI",
    title: "Tahapan Konservasi Digital",
    steps: [
      {
        id: "survei",
        number: "01",
        title: "Identifikasi & Survei Lapangan",
        description:
          "Tim peneliti melakukan survei langsung ke situs dan lokasi penyimpanan artefak untuk pendataan awal.",
      },
      {
        id: "dokumentasi",
        number: "02",
        title: "Dokumentasi & Pemindaian",
        description:
          "Fotografi resolusi tinggi, pemindaian 3D, dan pencatatan detail dimensi, material, serta kondisi objek.",
      },
      {
        id: "digitalisasi",
        number: "03",
        title: "Digitalisasi & Kurasi",
        description:
          "Data lapangan diolah menjadi aset digital: model 3D, foto katalog, dan deskripsi ilmiah yang dikurasi oleh tim ahli.",
      },
      {
        id: "publikasi",
        number: "04",
        title: "Publikasi & Akses Terbuka",
        description:
          "Hasil konservasi dipublikasikan di Museum Virtual untuk akses publik, penelitian akademis, dan keperluan edukasi.",
      },
    ] as KonservasiStep[],
  },
  cta: {
    eyebrow: "PARTISIPASI & KOLABORASI",
    title: "Ikut Serta dalam Pelestarian",
    body: "Apakah Anda memiliki informasi, dokumentasi, atau akses ke peninggalan Majapahit yang belum terdata? Kami mengundang kolaborasi dari masyarakat, peneliti, dan institusi untuk memperkaya basis data konservasi ini.",
  },
};

/* -- Situs & Arsitektur catalogue -- */

export type SitusItem = {
  id: string;
  name: string;
  location: string;
  era: string;
  description: string;
  image: string;
  status: "Terdokumentasi" | "Pemindaian 3D" | "Dalam Proses";
};

export const situsList: SitusItem[] = [
  {
    id: "gapura-wringin-lawang",
    name: "Gapura Wringin Lawang",
    location: "Trowulan, Mojokerto",
    era: "Abad ke-14 Masehi",
    description:
      "Gapura belah (candi bentar) setinggi 15,5 meter yang menjadi salah satu ikon peninggalan arsitektur Majapahit. Dibangun dari bata merah tanpa perekat, menunjukkan keahlian teknik konstruksi tinggi pada masanya.",
    image: "/images/koleksi/gapura.jpg",
    status: "Terdokumentasi",
  },
  {
    id: "candi-tikus",
    name: "Candi Tikus",
    location: "Trowulan, Mojokerto",
    era: "Abad ke-14 Masehi",
    description:
      "Petirtaan (kolam pemandian suci) berbentuk unik yang ditemukan di bawah permukaan tanah. Struktur ini menggambarkan konsep kosmologi Hindu — Gunung Mahameru — dalam bentuk arsitektur miniatur.",
    image: "/images/pameran/arsitektur.jpg",
    status: "Pemindaian 3D",
  },
  {
    id: "candi-bajang-ratu",
    name: "Candi Bajang Ratu",
    location: "Trowulan, Mojokerto",
    era: "Abad ke-14 Masehi",
    description:
      "Gapura paduraksa (gapura beratap) yang diperkirakan berhubungan dengan penobatan Jayanegara. Memiliki relief cerita Sri Tanjung dan ornamen sulur-suluran yang sangat detail.",
    image: "/images/tentang/arca.jpg",
    status: "Terdokumentasi",
  },
  {
    id: "candi-brahu",
    name: "Candi Brahu",
    location: "Trowulan, Mojokerto",
    era: "Abad ke-14–15 Masehi",
    description:
      "Salah satu candi tertua di kawasan Trowulan, diduga berfungsi sebagai tempat pembakaran jenazah (kremasi) para raja atau bangsawan Majapahit. Strukturnya terbuat dari bata merah berukuran besar.",
    image: "/images/pameran/rupa.jpg",
    status: "Terdokumentasi",
  },
  {
    id: "kolam-segaran",
    name: "Kolam Segaran",
    location: "Trowulan, Mojokerto",
    era: "Abad ke-14 Masehi",
    description:
      "Kolam buatan berukuran raksasa (375 × 175 meter) yang diperkirakan berfungsi sebagai tempat perjamuan tamu kerajaan dan reservoar air. Temuan artefak keramik asing menunjukkan hubungan diplomatik Majapahit.",
    image: "/images/hero/slide-2.jpg",
    status: "Dalam Proses",
  },
  {
    id: "pendopo-agung",
    name: "Situs Pendopo Agung",
    location: "Trowulan, Mojokerto",
    era: "Abad ke-14 Masehi",
    description:
      "Situs yang diidentifikasi sebagai lokasi pusat keraton Majapahit berdasarkan deskripsi dalam Kakawin Nagarakretagama karya Mpu Prapanca. Area ini menjadi fokus ekskavasi arkeologis berkelanjutan.",
    image: "/images/hero/slide-3.jpg",
    status: "Terdokumentasi",
  },
];

/* -- Artefak & Benda Budaya catalogue -- */

export type ArtefakItem = {
  id: string;
  name: string;
  category: "Prasasti & Inskripsi" | "Arca & Patung" | "Keramik & Gerabah" | "Perhiasan & Logam" | "Naskah & Sastra";
  era: string;
  material: string;
  description: string;
  image: string;
};

export const artefakCategories = [
  "Semua",
  "Prasasti & Inskripsi",
  "Arca & Patung",
  "Keramik & Gerabah",
  "Perhiasan & Logam",
  "Naskah & Sastra",
] as const;

export const artefakList: ArtefakItem[] = [
  {
    id: "prasasti-canggu",
    name: "Prasasti Canggu",
    category: "Prasasti & Inskripsi",
    era: "1358 Masehi",
    material: "Tembaga",
    description:
      "Prasasti berbahan tembaga yang mencatat penetapan sejumlah desa penyeberangan (ferry) di sepanjang sungai Brantas pada masa pemerintahan Hayam Wuruk.",
    image: "/images/koleksi/prasasti.jpg",
  },
  {
    id: "arca-ganesha",
    name: "Arca Ganesha Trowulan",
    category: "Arca & Patung",
    era: "Abad ke-14 Masehi",
    material: "Batu Andesit",
    description:
      "Arca Ganesha berukuran besar yang ditemukan di kawasan Trowulan. Menampilkan gaya seni pahat khas Majapahit dengan detail ornamen mahkota dan atribut dewa yang sangat halus.",
    image: "/images/koleksi/ganesha.jpg",
  },
  {
    id: "negarakretagama",
    name: "Kitab Negarakretagama",
    category: "Naskah & Sastra",
    era: "1365 Masehi",
    material: "Lontar",
    description:
      "Kakawin karya Mpu Prapanca yang menjadi sumber utama pengetahuan tentang struktur pemerintahan, wilayah kekuasaan, dan kehidupan istana Kerajaan Majapahit di masa jayanya.",
    image: "/images/koleksi/kitab.jpg",
  },
  {
    id: "keramik-majapahit",
    name: "Keramik Majapahit",
    category: "Keramik & Gerabah",
    era: "Abad ke-14 Masehi",
    material: "Tanah Liat",
    description:
      "Koleksi keramik dan gerabah produksi lokal yang ditemukan di kawasan Trowulan, mencakup wadah penyimpanan, peralatan upacara, dan benda hias yang menunjukkan tingkat kerajinan tinggi.",
    image: "/images/koleksi/peta.jpg",
  },
  {
    id: "perhiasan-emas",
    name: "Perhiasan Emas Trowulan",
    category: "Perhiasan & Logam",
    era: "Abad ke-14 Masehi",
    material: "Emas",
    description:
      "Koleksi perhiasan emas hasil temuan arkeologis di Trowulan, meliputi cincin, gelang, dan ornamen yang menggambarkan kemewahan serta keahlian pengrajin logam mulia pada era Majapahit.",
    image: "/images/pameran/rupa.jpg",
  },
  {
    id: "prasasti-trowulan",
    name: "Prasasti Trowulan I",
    category: "Prasasti & Inskripsi",
    era: "Abad ke-14 Masehi",
    material: "Batu",
    description:
      "Prasasti batu yang ditemukan di kawasan situs Trowulan, memuat inskripsi dalam aksara Jawa Kuno yang memberikan informasi tentang aktivitas keagamaan dan administratif kerajaan.",
    image: "/images/tentang/arca.jpg",
  },
];

/* ==========================================================================
   PARTISIPASI PUBLIK — KIRIM KARYA
   ========================================================================== */

export const kirimKaryaPage = {
  hero: {
    eyebrow: "PARTISIPASI PUBLIK",
    title: "Ruang Partisipasi Karya",
    subtitle:
      "Ruang kontribusi bagi mahasiswa, seniman, peneliti, dan masyarakat umum untuk memamerkan karya terinspirasi warisan budaya Majapahit melalui kurasi tim ahli PUI Seni Budaya Majapahitan.",
    image: "/images/hero/slide-3.jpg",
  },
  panduan: {
    kriteriaEyebrow: "PANDUAN KONTRIBUSI",
    kriteriaTitle: "Kriteria Karya",
    kriteriaList: [
      "Karya seni rupa kontemporer bertema Majapahitan (lukisan, ilustrasi, grafis digital, 3D render).",
      "Dokumentasi fotografi situs, artefak, atau kegiatan pelestarian seni budaya Majapahit.",
      "Karya tulis reflektif, manuskrip ulasan, atau riset visual kebudayaan Majapahit.",
      "Karya merupakan hasil ciptaan orisinal dan tidak melanggar hak cipta pihak mana pun.",
    ],
    teknisTitle: "Ketentuan Teknis File",
    teknisList: [
      "Format berkas: JPG, PNG, atau WebP.",
      "Ukuran maksimal berkas: 5 MB.",
      "Resolusi visual disarankan minimal 1200 × 800 piksel agar detail kurasi terlihat jelas.",
      "Satu berkas unggahan per satu formulir pengiriman karya.",
    ],
    alurTitle: "Alur Proses Kurasi",
    alurSteps: [
      {
        step: "01",
        title: "Pengiriman Formulir",
        desc: "Kontributor melengkapi data diri dan mengunggah berkas karya digital.",
      },
      {
        step: "02",
        title: "Peninjauan Tim Kurator",
        desc: "Tim kurator PUI meninjau kesesuaian tema, orisinalitas, dan etika karya (estimasi 3–7 hari kerja).",
      },
      {
        step: "03",
        title: "Publikasi di Galeri Publik",
        desc: "Karya yang dinyatakan lolos kurasi akan dipublikasikan di Galeri Karya Publik Museum Virtual.",
      },
    ],
    hakCipta:
      "Hak cipta karya tetap sepenuhnya milik kontributor. Dengan mengirimkan karya, Anda memberikan izin non-eksklusif kepada PUI Seni Budaya Majapahitan UNESA untuk menampilkan karya di platform Museum Virtual demi kepentingan apresiasi seni, kebudayaan, dan edukasi publik.",
  },
  kategoriOptions: [
    { value: "seni-rupa", label: "Seni Rupa Kontemporer (Lukisan / Patung)" },
    { value: "desain-ilustrasi", label: "Desain Grafis & Ilustrasi Digital" },
    { value: "fotografi", label: "Dokumentasi Fotografi Situs / Budaya" },
    { value: "model-3d", label: "Karya 3D Render / Animasi Budaya" },
    { value: "riset-visual", label: "Riset Visual & Infografis Sejarah" },
    { value: "lainnya", label: "Karya Kreatif Lainnya" },
  ],
};

