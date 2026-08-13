"use client";

import { MapPin, Phone, Building2 } from "lucide-react";
import Image from "next/image";

// --- STORE DATA ---
const STORES = [
    // NEW LOCATIONS (Detailed)
    {
        id: 1,
        name: "Саруул зах",
        location: "Гадаах бөөний 2-р павилон",
        phone: "8888-0758",
        image: "/images/saruul.png",
        type: "specific"
    },
    {
        id: 2,
        name: "Их наяд худалдааны төв",
        location: "“БӨӨН АМТА” лангуу",
        phone: "8888-0758",
        image: "/images/ih-nayd.png",
        type: "specific"
    },
    // EXISTING CHAINS (Brand Logos)
    { id: 3, name: "Наран Супермаркет", location: "Бүх салбараар", image: "/images/naran.png", type: "chain" },
    { id: 4, name: "Номин Сүлжээ", location: "Бүх салбараар", image: "/images/nomin.png", type: "chain" },
    { id: 5, name: "M-Mart", location: "Бүх салбараар", image: "/images/mmart.png", type: "chain" },
    { id: 6, name: "Монос Эмийн Сан", location: "Эрүүл мэндийн тасгаар", image: "/images/monos.png", type: "chain" },
    { id: 7, name: "Ханбүргэдэй", location: "Бүх салбараар", image: "/images/khanburegdei.png", type: "chain" },
];

export default function StoresPage() {
    return (
        <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs">Locations</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Борлуулалтын цэгүүд</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Та манай бүтээгдэхүүнийг дараах албан ёсны цэгүүд болон сүлжээ дэлгүүрүүдээс худалдан авах боломжтой.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {STORES.map((store) => (
                        <div key={store.id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">

                            {/* Image Container */}
                            <div className="h-48 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center p-4 overflow-hidden relative">
                                <Image
                                    src={store.image}
                                    alt={store.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className={`transition-transform duration-700 group-hover:scale-105 ${store.type === 'chain' ? 'object-contain p-4' : 'object-cover rounded-xl'}`}
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-yellow-600 transition-colors">
                                    {store.name}
                                </h3>

                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-yellow-500 shrink-0 mt-1" />
                                        <span className="text-sm">{store.location}</span>
                                    </div>

                                    {store.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone size={18} className="text-yellow-500 shrink-0" />
                                            <span className="text-sm font-bold">{store.phone}</span>
                                        </div>
                                    )}

                                    {!store.phone && (
                                        <div className="flex items-center gap-3 opacity-50">
                                            <Building2 size={18} className="shrink-0" />
                                            <span className="text-sm">Албан ёсны борлуулагч</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
