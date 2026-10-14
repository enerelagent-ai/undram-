"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useModalAccessibility(isOpen, onClose) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const dialog = dialogRef.current;
        const previouslyFocused = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusDialog = window.requestAnimationFrame(() => {
            const firstFocusable = [...(dialog?.querySelectorAll(FOCUSABLE_SELECTOR) || [])]
                .find((element) => element.getClientRects().length > 0);
            (firstFocusable || dialog)?.focus();
        });

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialog) return;

            const focusableElements = [...dialog.querySelectorAll(FOCUSABLE_SELECTOR)]
                .filter((element) => !element.hasAttribute("hidden") && element.getClientRects().length > 0);

            if (focusableElements.length === 0) {
                event.preventDefault();
                dialog.focus();
                return;
            }

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusDialog);
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
        };
    }, [isOpen, onClose]);

    return dialogRef;
}
