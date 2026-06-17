import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/portfolio/site-header";
import {
  authorName,
  defaultDescription,
  defaultTitle,
  getAbsoluteUrl,
  getJsonLd,
  getSiteUrl,
  seoKeywords,
  siteName,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: siteName,
  authors: [{ name: authorName, url: getSiteUrl() }],
  creator: authorName,
  publisher: authorName,
  title: {
    default: defaultTitle,
    template: `%s | ${authorName}`,
  },
  description: defaultDescription,
  keywords: seoKeywords,
  category: "portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: getSiteUrl(),
    siteName,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName} - marketing digital, design et sites web`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/opengraph-image"],
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: getSiteUrl(),
  inLanguage: "fr-FR",
  description: defaultDescription,
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: authorName,
  url: getSiteUrl(),
  jobTitle: "Creatrice digitale",
  knowsAbout: [
    "Marketing digital",
    "Design",
    "Identite visuelle",
    "Creation de sites web",
    "SEO",
    "Social media",
  ],
  image: getAbsoluteUrl("/images/malvina4.jpeg"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html
      lang="fr"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        plusJakartaSans.variable,
        bebasNeue.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getJsonLd(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getJsonLd(personJsonLd) }}
        />
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        
        {children}
      </body>
    </html>
    <SpeedInsights />
    </>
  );
}
