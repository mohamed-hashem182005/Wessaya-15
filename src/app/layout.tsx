import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans_Arabic, Reem_Kufi } from "next/font/google";

import "./globals.css";
import { getConfiguredSiteUrl, getSiteUrl, siteConfig } from "@/data/site";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const configuredUrl = getConfiguredSiteUrl();
const hasConfiguredUrl = Boolean(configuredUrl);

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "وصايه الـــ 15 | مشويات وفرايد تشكن وبيتزا في سوهاج",
    template: "%s | وصايه الـــ 15",
  },
  description: siteConfig.description,
  applicationName: siteConfig.nameAr,
  keywords: [
    "وصايه الـــ 15",
    "وصاية 15",
    "Wessaya 15",
    "WESAYA 15 ST.",
    "مطعم سوهاج",
    "مطعم شارع 15 سوهاج",
    "مشويات سوهاج",
    "بيتزا سوهاج",
    "فرايد تشكن سوهاج",
    "طعام سوهاج",
    "دليفري سوهاج",
    "وصايه 15 سوهاج",
  ],
  authors: [{ name: siteConfig.nameAr }],
  creator: siteConfig.nameAr,
  publisher: siteConfig.nameAr,
  referrer: "origin-when-cross-origin",
  ...(hasConfiguredUrl
    ? {
        alternates: {
          canonical: "/",
          languages: {
            "ar-EG": "/",
          },
        },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: siteConfig.nameAr,
    url: hasConfiguredUrl ? "/" : undefined,
    title: siteConfig.nameAr,
    description: siteConfig.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "وصايه الـــ 15 — شارع 15 بسوهاج، مشويات وفرايد تشكن وبيتزا وكريب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.nameAr,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#10211B",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body
        className={`${reemKufi.variable} ${archivo.variable} ${ibmPlex.variable} bg-cream text-ink antialiased selection:bg-brass selection:text-ink`}
      >
        <a href="#main" className="skip-link">
          تخطى إلى المحتوى
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
