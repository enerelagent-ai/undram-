"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { calculateCartTotal } from "@/utils/cart.mjs";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

export default function CartModal({ onCheckout }) {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart } =
    useCart();
  const { language } = useLanguage();
  const t = translations[language].cart;
  const dialogRef = useModalAccessibility(isCartOpen, toggleCart);

  const total = calculateCartTotal(cartItems);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="cart-panel fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-gold-100"
            >
              <div className="p-4 md:p-6 border-b border-gold-100 flex justify-between items-center bg-cream-50">
                <h2
                  id="cart-title"
                  className="text-base md:text-xl font-heading font-bold text-charcoal-900 flex items-center gap-2"
                >
                  <ShoppingBag size={20} className="text-gold-500" />
                  {t.title}
                </h2>
                <button
                  onClick={toggleCart}
                  aria-label={t.close || "Сагс хаах"}
                  className="text-charcoal-400 hover:text-charcoal-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-charcoal-400 space-y-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>{t.empty}</p>
                    <button
                      onClick={toggleCart}
                      className="text-gold-500 font-bold hover:underline"
                    >
                      {t.continueShopping}
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-2 md:gap-4 bg-white p-2 md:p-4 rounded-none border border-gold-50"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-cream-50 border border-gold-100 shrink-0">
                        <Image
                          src={item.image || "/images/logo.png"}
                          alt={item.title || item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-charcoal-900 text-sm md:text-base">
                          {item.title || item.name}
                        </h3>
                        <p className="text-gold-500 font-bold text-xs md:text-sm mt-0.5 md:mt-1 font-price">
                          {item.price}
                        </p>

                        <div className="flex items-center justify-between mt-2 md:mt-4">
                          <div className="flex items-center gap-2 md:gap-3 border border-gold-200 rounded-none px-1.5 md:px-2 py-0.5 md:py-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label={`${item.title || item.name}: ${language === "mn" ? "тоо хасах" : "decrease quantity"}`}
                              className="text-charcoal-400 hover:text-charcoal-900"
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              aria-live="polite"
                              className="text-xs md:text-sm font-bold text-charcoal-900 w-4 text-center"
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label={`${item.title || item.name}: ${language === "mn" ? "тоо нэмэх" : "increase quantity"}`}
                              className="text-charcoal-400 hover:text-charcoal-900"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-400 hover:text-red-600 underline"
                          >
                            {t.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 md:p-6 border-t border-gold-100 bg-cream-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-charcoal-600">{t.total}</span>
                      <span className="font-bold text-charcoal-900 text-sm md:text-base">
                        {total.toLocaleString()}₮
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-charcoal-600">{t.deliveryFee}</span>
                      <span className="font-bold text-gold-600 text-sm md:text-base">
                        8,000₮
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gold-100">
                      <span className="text-charcoal-600 font-bold text-base md:text-lg">
                        {t.total}
                      </span>
                      <span className="text-xl md:text-2xl font-price font-bold text-gold-600">
                        {(total + 8000).toLocaleString()}₮
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toggleCart();
                      if (onCheckout) onCheckout();
                    }}
                    className="w-full bg-gold-500 text-white py-3 md:py-4 text-sm md:text-base font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors shadow-lg shadow-gold-500/20"
                  >
                    {t.checkout}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
