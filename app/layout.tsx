import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import StorefrontWrapper from "@/components/StorefrontWrapper";

export const metadata = {
  title: "Undram Brand | Mongolian Honey",
  description: "Монголын байгалийн цэвэр зөгийн бал. Pure natural honey from the wild meadows of Mongolia – premium gifts, honeycomb, and wellness products.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body className="antialiased font-body bg-background text-foreground md:cursor-none">
        <LanguageProvider>
          <CartProvider>
            <StorefrontWrapper />
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
