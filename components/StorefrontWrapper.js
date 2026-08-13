"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import VisualEffects from "@/components/VisualEffects";

export default function StorefrontWrapper() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return null;

    return (
        <>
            <VisualEffects />
            <Navbar />
        </>
    );
}
