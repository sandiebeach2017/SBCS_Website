import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sbcre8ivesolutions.com"),
  title: {
    default: "SB Cre8ive Solutions | Website, LinkedIn, SEO & Branding Services",
    template: "%s | SB Cre8ive Solutions",
  },
  description:
    "SB Cre8ive Solutions helps startups and growing businesses build clear digital presence through websites, LinkedIn optimization, SEO, branding, and content strategy.",
  keywords: [
    "SB Cre8ive Solutions",
    "website design services",
    "linkedin profile optimization",
    "linkedin company page optimization",
    "branding services",
    "content writing services",
    "seo services",
    "startup digital presence",
    "business branding agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SB Cre8ive Solutions | Website, LinkedIn, SEO & Branding Services",
    description:
      "Build a clear, credible online presence with website development, LinkedIn optimization, SEO, branding, and content strategy.",
    url: "https://www.sbcre8ivesolutions.com",
    siteName: "SB Cre8ive Solutions",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png.png",
        width: 1200,
        height: 1200,
        alt: "SB Cre8ive Solutions logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SB Cre8ive Solutions | Website, LinkedIn, SEO & Branding Services",
    description:
      "Websites, LinkedIn optimization, SEO, branding, and content strategy designed to help your business grow.",
    images: ["/logo.png.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png.png",
    shortcut: "/logo.png.png",
    apple: "/logo.png.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
