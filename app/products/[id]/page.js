import React from 'react';
import ProductDetailClient from "./ProductDetailClient"; // we will create this

const PRODUCT_META = {
    "12": {
        title: "Байгалийн хосгүй бэлэг | Mongolian Honey",
        description: "Шинэхэн зөгийн балны рам, тансаг цэцгэн чимэглэл, гоёмсог савлагаатай онцгой бэлгийн багц.",
        image: "/images/ram.jpg",
    },
    "oxymel": {
        title: "UNDRAM OXYMEL | Mongolian Honey Drink",
        description: "Зөгийн бал, органик алимны цуу, цагаан гаатай уламжлалт эрүүл мэндийн ундаа. 330мл.",
        image: "/images/oxymel.png",
    },
    "honey-wine": {
        title: "UNDRAM HONEY WINE | Mongolian Mead",
        description: "Монголын цэвэр зөгийн балаар исгэсэн дээд зэрэглэлийн балт дарс. 330мл.",
        image: "/images/wine.png",
    },
};

export async function generateMetadata({ params }) {
    const meta = PRODUCT_META[params.id];
    if (meta) {
        return {
            title: meta.title,
            description: meta.description,
            openGraph: {
                title: meta.title,
                description: meta.description,
                images: [{ url: meta.image, width: 1200, height: 630, alt: "Байгалийн хосгүй бэлэг – зөгийн балны рамтай цэцгэн бэлгийн багц" }],
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
    // Generate static routes dynamically based on initial static dataset or fallback
    return ["1", "2", "3", "4", "5", "6", "7", "8", "_", "10", "11", "12", "13", "14", "15", "honey-set-6", "oxymel", "honey-wine"].map(id => ({ id }));
}

export default function Page() {
    return <ProductDetailClient />;
}

