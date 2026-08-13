"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const beeRef = useRef(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);
    const prevX = useRef(0);

    useEffect(() => {
        // Hide on mobile devices (touch screens)
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = cursorRef.current;
        const bee = beeRef.current;
        if (!cursor || !bee) return;

        let isFacingLeft = false;

        const updateCursor = () => {
            if (cursor) {
                cursor.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
            }
            rafRef.current = null;
        };

        const moveCursor = (e) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            // Determine direction for bee flip
            if (currentX < prevX.current && !isFacingLeft) {
                isFacingLeft = true;
                bee.style.transform = "scaleX(-1)";
            } else if (currentX > prevX.current && isFacingLeft) {
                isFacingLeft = false;
                bee.style.transform = "scaleX(1)";
            }

            prevX.current = currentX;
            positionRef.current = { x: currentX, y: currentY };

            // Use RAF to batch DOM updates
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(updateCursor);
            }
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Don't render on mobile
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ willChange: "transform" }}
        >
            <div
                ref={beeRef}
                className="relative -translate-x-1/2 -translate-y-1/2 text-4xl animate-wiggle-slow"
                style={{ transition: "transform 0.15s ease" }}
            >
                🐝
            </div>
        </div>
    );
}
