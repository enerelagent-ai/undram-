"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

// Separate contexts so action-only consumers don't re-render on state changes
const CartActionsContext = createContext();
const CartStateContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const value = JSON.parse(localStorage.getItem("undramCart") || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem("undramCart", JSON.stringify(cartItems));
        } catch {
            // Storage can be unavailable in private/restricted browsing modes.
        }
    }, [cartItems]);

    // Stable function refs — never change, so CartActionsContext never re-triggers consumers
    const addToCart = useCallback((product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        setIsCartOpen(true);
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        if (quantity < 1) {
            setCartItems((prev) => prev.filter((item) => item.id !== productId));
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        );
    }, []);

    const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const val = parseInt((item.price || "").replace(/[^0-9]/g, ""), 10) || 0;
            return total + val * item.quantity;
        }, 0);
    }, [cartItems]);

    // Actions value never changes reference → consumers never re-render unnecessarily
    const actions = useMemo(
        () => ({ addToCart, removeFromCart, updateQuantity, toggleCart }),
        [addToCart, removeFromCart, updateQuantity, toggleCart]
    );

    // State value changes when cart items or open state changes
    const state = useMemo(
        () => ({ cartItems, isCartOpen, cartTotal }),
        [cartItems, isCartOpen, cartTotal]
    );

    return (
        <CartActionsContext.Provider value={actions}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartActionsContext.Provider>
    );
}

// Use this in ProductCard, ProductModal, ProductDetailClient — won't re-render on cart open/close
export function useCartActions() {
    const context = useContext(CartActionsContext);
    if (!context) throw new Error("useCartActions must be used within CartProvider");
    return context;
}

// Use this where cart state is needed (CartModal, Navbar)
export function useCartState() {
    const context = useContext(CartStateContext);
    if (!context) throw new Error("useCartState must be used within CartProvider");
    return context;
}

// Backward-compatible combined hook
export function useCart() {
    const actions = useContext(CartActionsContext);
    const state = useContext(CartStateContext);
    return { ...actions, ...state };
}
