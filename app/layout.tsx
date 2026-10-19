import "./globals.css";
import "./commerce.css";
import localFont from "next/font/local";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import StorefrontWrapper from "@/components/StorefrontWrapper";
import Footer from "@/components/Footer";
import type { Metadata, Viewport } from "next";

const displayFont = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-Regular.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-undram-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const bodyFont = localFont({
  src: "./fonts/Manrope.woff2",
  weight: "200 800",
  style: "normal",
  variable: "--font-undram-body",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Arial", "Helvetica Neue", "sans-serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "https://undram-honey.netlify.app";

export const viewport: Viewport = { themeColor: "#F6F1E7" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Undram Brand | Монголын байгалийн зөгийн бал",
    template: "%s | Undram Brand",
  },
  description:
    "Монголын байгалийн цэвэр зөгийн бал. Pure natural honey from the wild meadows of Mongolia – premium gifts, honeycomb, and wellness products.",
  keywords: [
    "зөгийн бал",
    "Монгол зөгийн бал",
    "Undram",
    "Mongolian honey",
    "natural honey",
  ],
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "/",
    siteName: "Undram Brand",
    title: "Undram Brand | Монголын байгалийн зөгийн бал",
    description: "Туул голын хөндийн зэрлэг цэцгийн 100% байгалийн зөгийн бал.",
    images: [
      {
        url: "/images/undram-social-hero.webp",
        width: 1448,
        height: 1086,
        alt: "Undram зөгийн бал",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/undram-social-hero.webp"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Undram Brand",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    sameAs: [
      "https://www.facebook.com/mongolian.natural.honey",
      "https://www.instagram.com/undram_brand_products/",
    ],
  };

  return (
    <html lang="mn" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>
          <CartProvider>
            <StorefrontWrapper />
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
