import { motion, AnimatePresence } from "framer-motion";
import { X, Flower, Copy, Check, Camera } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CheckoutModal({ isOpen, onClose }) {
    const { cartItems } = useCart();
    const { language } = useLanguage();
    const t = translations[language].checkout;
    const tCart = translations[language].cart;

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState({});
    const [isCopied, setIsCopied] = useState(false);

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseInt(priceStr.toString().replace(/[^0-9]/g, ''), 10) || 0;
    };

    const subtotal = cartItems.reduce((acc, item) => {
        return acc + parsePrice(item.price) * item.quantity;
    }, 0);

    const deliveryFee = subtotal > 0 ? 8000 : 0;
    const grandTotal = subtotal + deliveryFee;

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Нэрээ оруулна уу";
        if (!formData.phone) {
            newErrors.phone = "Утасны дугаараа оруулна уу";
        } else if (!/^\d{8}$/.test(formData.phone)) {
            newErrors.phone = "Утасны дугаар 8 оронтой байх ёстой";
        }
        if (!formData.address) newErrors.address = "Хаягаа оруулна уу";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Build the Messenger message synchronously first
        const itemsList = cartItems
            .map((item) => `- ${item.title || item.name} (${item.quantity}ш)`)
            .join("\n");

        const message = `Сайн байна уу! Захиалга өгөх гэсэн юм.

👤 Нэр: ${formData.fullName}
📱 Утас: ${formData.phone}
📍 Хаяг: ${formData.address}

🛒 ЗАХИАЛГА:
${itemsList}

💵 Барааны үнэ: ${subtotal.toLocaleString()}₮
🚚 Хүргэлт: ${deliveryFee.toLocaleString()}₮
💰 НИЙТ ТӨЛӨХ: ${grandTotal.toLocaleString()}₮

💳 Төлбөрөө хийсэн.
📸 Төлбөрийн баримтаа хавсаргав.`;

        const url = `https://m.me/mongolian.natural.honey?text=${encodeURIComponent(message)}`;

        // Open Messenger NOW — must be synchronous (before any await)
        // so the browser doesn't block it as a popup
        window.open(url, "_blank");
        onClose();

        // Save to Firestore in the background — failure doesn't affect the user
        if (!db) return;
        try {
            await addDoc(collection(db, "orders"), {
                customer: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                },
                items: cartItems.map((item) => ({
                    id: item.id,
                    name: item.title || item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image || "/images/logo.png",
                })),
                subtotal,
                deliveryFee,
                grandTotal,
                status: "Pending",
                createdAt: serverTimestamp(),
            });
        } catch (err) {
            console.error("Failed to save order to Firestore:", err);
        }
    };

    const handleClose = () => {
        setFormData({ fullName: "", phone: "", address: "" });
        setErrors({});
        onClose();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("5005920850456");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 z-[80]"
                    />

                    {/* Modal — centered with top/left + translate */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] bg-gradient-to-br from-white to-cream-50 rounded-3xl shadow-2xl w-[calc(100%-2rem)] max-w-4xl overflow-hidden flex flex-col md:flex-row border border-gold-100 max-h-[85vh] md:max-h-[90vh]"
                    >
                        {/* Decorative icon */}
                        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
                            <Flower className="text-orange-400 w-24 h-24 rotate-12" />
                        </div>

                        {/* Right panel: Order Summary — shown first on mobile */}
                        <div className="w-full md:w-2/5 bg-white/50 p-4 md:p-8 border-b md:border-b-0 md:border-l border-gold-100 flex flex-col backdrop-blur-sm relative order-1 md:order-2 max-h-[40vh] md:max-h-full overflow-y-auto">
                            <div className="flex justify-between items-start mb-2 md:mb-8">
                                <h2 className="text-base md:text-xl font-heading font-bold text-amber-900">{tCart.title}</h2>
                                <button onClick={handleClose} className="hidden md:block text-amber-800/40 hover:text-amber-900 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2 md:space-y-4 mb-2 md:mb-8 pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.name} className="flex gap-2 md:gap-4 p-2 md:p-3 bg-white rounded-xl border border-gold-100 shadow-sm">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 bg-cream-50 rounded-lg border border-gold-100 shrink-0 overflow-hidden">
                                            <Image
                                                src={item.image || "/images/logo.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-amber-900 text-xs md:text-sm line-clamp-2">{item.title || item.name}</p>
                                            <p className="text-amber-600 text-[10px] md:text-xs font-bold mt-0.5 md:mt-1">{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gold-200 pt-2 md:pt-6 space-y-1 md:space-y-3">
                                <div className="flex justify-between items-center text-amber-900/70 text-xs md:text-base">
                                    <span>{t.summary.subtotal}</span>
                                    <span className="font-bold text-amber-900 text-sm md:text-base">{subtotal.toLocaleString()}₮</span>
                                </div>
                                <div className="flex justify-between items-center text-amber-900/70 text-xs md:text-base">
                                    <span>{t.summary.delivery}</span>
                                    <span className="font-bold text-gold-500 text-sm md:text-base">{deliveryFee.toLocaleString()}₮</span>
                                </div>
                                <div className="flex justify-between items-center text-base md:text-2xl font-heading font-bold text-amber-900 pt-2 md:pt-4 border-t border-gold-200/50">
                                    <span>{t.summary.total}</span>
                                    <span>{grandTotal.toLocaleString()}₮</span>
                                </div>
                            </div>
                        </div>

                        {/* Left panel: Form — flex-1 min-h-0 so it scrolls properly on mobile */}
                        <div className="w-full md:w-3/5 flex-1 min-h-0 overflow-y-auto p-4 md:p-8 relative z-10 order-2 md:order-1">
                            <div className="flex justify-between items-center mb-3 md:mb-8">
                                <h2 className="text-lg md:text-3xl font-heading font-bold text-amber-900">{t.title}</h2>
                                <button onClick={handleClose} className="md:hidden text-amber-800/60 hover:text-amber-900">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Bank Info Box */}
                            <div className="bg-yellow-100 border-2 border-yellow-400 p-3 md:p-6 rounded-2xl mb-3 md:mb-8 relative overflow-hidden shadow-md">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full -mr-8 -mt-8 opacity-50" />
                                <h3 className="font-bold text-amber-900 mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                    {t.paymentInfo}
                                </h3>
                                <div className="space-y-1.5 md:space-y-3 text-amber-900">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs md:text-sm opacity-80">{t.bank}:</span>
                                        <span className="font-bold text-xs md:text-base">Хаан Банк</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs md:text-sm opacity-80">{t.receiver}:</span>
                                        <span className="font-bold text-xs md:text-base">Энэрэлт Тулуй ХХК</span>
                                    </div>
                                    <div className="pt-2 md:pt-3 border-t border-yellow-200/50">
                                        <span className="text-[10px] md:text-xs opacity-80 block mb-1">{t.account}:</span>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <span className="text-lg md:text-2xl font-bold tracking-wider font-heading">5005920850456</span>
                                            <button
                                                onClick={handleCopy}
                                                className="p-1.5 md:p-2 hover:bg-yellow-200/50 rounded-full transition-colors text-amber-700"
                                                title="Хуулах"
                                            >
                                                {isCopied ? <Check size={16} className="md:w-[18px] md:h-[18px]" /> : <Copy size={16} className="md:w-[18px] md:h-[18px]" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-5">
                                <div>
                                    <label className="block text-[10px] md:text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-1 md:mb-2">{t.form.name}</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className={`w-full p-2 md:p-4 text-sm md:text-base bg-white border ${errors.fullName ? "border-red-500" : "border-gold-200"} rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all`}
                                        placeholder={t.form.placeholder_name}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] md:text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-1 md:mb-2">{t.form.phone}</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className={`w-full p-2 md:p-4 text-sm md:text-base bg-white border ${errors.phone ? "border-red-500" : "border-gold-200"} rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all`}
                                        placeholder={t.form.placeholder_phone}
                                        maxLength={8}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] md:text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-1 md:mb-2">{t.form.address}</label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`w-full p-2 md:p-4 text-sm md:text-base bg-white border ${errors.address ? "border-red-500" : "border-gold-200"} rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all h-16 md:h-24 resize-none`}
                                        placeholder={t.form.placeholder_address}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                                </div>

                                <div className="flex items-center justify-center gap-1.5 md:gap-2 text-red-500 font-bold text-xs md:text-sm text-center animate-pulse">
                                    <Camera size={16} className="md:w-[18px] md:h-[18px]" />
                                    <p>{t.screenshotReminder}</p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 md:py-4 rounded-xl font-bold text-sm md:text-base uppercase tracking-widest hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-orange-200 transform hover:-translate-y-0.5 active:scale-95"
                                >
                                    {t.confirmBtn}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
