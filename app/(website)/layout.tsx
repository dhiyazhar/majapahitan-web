import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Spectral_SC } from "next/font/google";
import "@/app/globals.css";

const spectral = Spectral_SC({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Museum Virtual Majapahitan — PUISBM Universitas Negeri Surabaya",
  description:
    "Konservasi peninggalan sejarah & budaya dan ruang apresiasi karya kreatif kontemporer bertema Majapahitan.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spectral.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
