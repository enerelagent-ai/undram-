import React from 'react';
import ProductDetailClient from "./ProductDetailClient"; // we will create this
import { translations } from "@/context/translations";

const PRODUCT_META = {
    "12": {
        title: "Байгалийн хосгүй бэлэг | Mongolian Honey",
        description: "Шинэхэн зөгийн балны рам, тансаг цэцгэн чимэглэл, гоёмсог савлагаатай онцгой бэлгийн багц.",
        image: "/images/ram.jpg",
    },
    "oxymel": {
        title: "UNDRAM OXYMEL | Mongolian Honey Drink",
        description: "Зөгийн бал, органик алимны цуу, цагаан гаатай уламжлалт эрүүл мэндийн ундаа. 330мл.",
        image: "/images/oxymel.webp",
    },
    "honey-wine": {
        title: "UNDRAM HONEY WINE | Mongolian Mead",
        description: "Монголын цэвэр зөгийн балаар исгэсэн дээд зэрэглэлийн балт дарс. 330мл.",
        image: "/images/wine.webp",
    },
};

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = translations.mn.products.items.find((item) => String(item.id) === id);
    const meta = PRODUCT_META[id] || (product && {
        title: product.title,
        description: product.description.replace(/\n/g, " ").slice(0, 160),
        image: product.image,
    });
    if (meta) {
        return {
            title: meta.title,
            description: meta.description,
            openGraph: {
                title: meta.title,
                description: meta.description,
                images: [{ url: meta.image, alt: product?.alt || meta.title }],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: meta.title,
                description: meta.description,
                images: [meta.image],
            },
        };
    }
    return {
        title: "Undram Honey | Mongolian Natural Honey",
        description: "Монголын байгалийн цэвэр зөгийн бал. Pure natural honey from Mongolia.",
    };
}

export async function generateStaticParams() {
    return translations.mn.products.items.map((product) => ({ id: String(product.id) }));
}

export default async function Page({ params }) {
    const { id } = await params;
    const product = translations.mn.products.items.find((item) => String(item.id) === id);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://undram-honey.vercel.app";
    const numericPrice = product ? Number(String(product.price).replace(/[^0-9]/g, "")) : 0;
    const jsonLd = product && {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: `${siteUrl}${product.image}`,
        description: product.description.replace(/\n/g, " "),
        brand: { "@type": "Brand", name: "Undram" },
        offers: {
            "@type": "Offer",
            url: `${siteUrl}/products/${id}`,
            priceCurrency: "MNT",
            price: numericPrice,
            availability: "https://schema.org/InStock",
        },
    };

    return <>{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}<ProductDetailClient /></>;
}
