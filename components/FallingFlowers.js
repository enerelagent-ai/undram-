"use client";

import { useState } from "react";

export default function FallingFlowers() {
    const [flowers] = useState(() => {
        // Reduce to only 6 flowers for better performance
        const flowerEmojis = ["🌸", "🌼", "🌺"];
        const newFlowers = Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
            left: `${Math.random() * 100}%`,
            animationDuration: `${20 + Math.random() * 15}s`, // 20-35s (slower)
            animationDelay: `${Math.random() * 10}s`, // 0-10s delay
            size: `${18 + Math.random() * 10}px`, // 18-28px (smaller)
            opacity: 0.3 + Math.random() * 0.2, // 0.3-0.5 (more subtle)
        }));
        return newFlowers;
    });

    return (
        <>
            <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-10vh) translateX(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(110vh) translateX(15px) rotate(360deg);
                    }
                }
                
                .flower {
                    will-change: transform;
                    animation-name: fall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>

            <div
                className="fixed inset-0 overflow-hidden pointer-events-none"
                style={{ zIndex: 1 }}
                aria-hidden="true"
            >
                {flowers.map((flower) => (
                    <div
                        key={flower.id}
                        className="flower absolute"
                        style={{
                            left: flower.left,
                            top: "-10%",
                            fontSize: flower.size,
                            opacity: flower.opacity,
                            color: "#F59E0B",
                            animationDuration: flower.animationDuration,
                            animationDelay: flower.animationDelay,
                        }}
                    >
                        {flower.emoji}
                    </div>
                ))}
            </div>
        </>
    );
}
