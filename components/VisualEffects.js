"use client";

import dynamic from "next/dynamic";

// Lazy load visual components for better performance
const FallingFlowers = dynamic(() => import("./FallingFlowers"), {
    ssr: false,
    loading: () => null
});

const CustomCursor = dynamic(() => import("./CustomCursor"), {
    ssr: false,
    loading: () => null
});

export default function VisualEffects() {
    return (
        <>
            <FallingFlowers />
            <CustomCursor />
        </>
    );
}
