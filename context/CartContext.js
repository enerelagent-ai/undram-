"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { calculateCartTotal, normalizeQuantity } from "@/utils/cart.mjs";

// Separate contexts so action-only consumers don't re-render on state changes
const CartActionsContext = createContext();
const CartStateContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem("undramCart") || "[]");
      // Restore browser-only state after the server snapshot has hydrated.
      if (Array.isArray(value))
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(
          value.filter(
            (item) => item?.id && normalizeQuantity(item.quantity) > 0,
          ),
        );
    } catch {
      /* Restricted storage keeps the cart usable in memory. */
    }
    setHydrated(true);
  }, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("undramCart", JSON.stringify(cartItems));
    } catch {
      // Storage can be unavailable in private/restricted browsing modes.
    }
  }, [cartItems, hydrated]);

  // Stable function refs — never change, so CartActionsContext never re-triggers consumers
  const addToCart = useCallback((product, quantity = 1) => {
    const safeQuantity = normalizeQuantity(quantity);
    if (!product?.id || safeQuantity === 0) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: normalizeQuantity(item.quantity) + safeQuantity,
              }
            : item,
        );
      }
      return [...prev, { ...product, quantity: safeQuantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const safeQuantity = normalizeQuantity(quantity);
    if (safeQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item,
      ),
    );
  }, []);

  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const clearCart = useCallback(() => setCartItems([]), []);

  const cartTotal = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  // Actions value never changes reference → consumers never re-render unnecessarily
  const actions = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      clearCart,
    }),
    [addToCart, removeFromCart, updateQuantity, toggleCart, clearCart],
  );

  // State value changes when cart items or open state changes
  const state = useMemo(
    () => ({ cartItems, isCartOpen, cartTotal }),
    [cartItems, isCartOpen, cartTotal],
  );

  return (
    <CartActionsContext.Provider value={actions}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

// Use this in product components that only need cart actions.
export function useCartActions() {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error("useCartActions must be used within CartProvider");
  return context;
}

// Use this where cart state is needed (CartModal, Navbar)
export function useCartState() {
  const context = useContext(CartStateContext);
  if (!context)
    throw new Error("useCartState must be used within CartProvider");
  return context;
}

// Backward-compatible combined hook
export function useCart() {
  const actions = useContext(CartActionsContext);
  const state = useContext(CartStateContext);
  return { ...actions, ...state };
}
