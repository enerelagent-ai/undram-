import { motion, AnimatePresence } from "framer-motion";
import { X, Flower, Copy, Check, Camera, ExternalLink } from "lucide-react";
import { useCallback, useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase";
import { calculateCartTotal } from "@/utils/cart.mjs";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { CHECKOUT_LIMITS, validateCheckoutForm } from "@/utils/order.mjs";

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems } = useCart();
  const { language } = useLanguage();
  const t = translations[language].checkout;
  const tCart = translations[language].cart;
  const statusText = {
    mn: {
      sent: "Захиалга Messenger рүү бэлэн боллоо",
      blocked: "Messenger автоматаар нээгдсэнгүй",
      sentBody:
        "Messenger цонхонд Send дарж, төлбөрийн баримтаа хавсаргана уу.",
      blockedBody:
        "Доорх товчоор захиалгын мэдээллээ хуулж Messenger-ээр илгээнэ үү.",
      copy: "Захиалга хуулах",
      copied: "Хууллаа",
      done: "Дуусгах",
      nameRequired: "Нэрээ оруулна уу",
      nameInvalid: "Нэр 2–80 тэмдэгт байх ёстой",
      phoneRequired: "Утасны дугаараа оруулна уу",
      phoneInvalid: "Утасны дугаар 8 оронтой байх ёстой",
      addressRequired: "Хаягаа оруулна уу",
      addressInvalid: "Хаяг 5–300 тэмдэгт байх ёстой",
      cartInvalid: "Сагс хоосон эсвэл хэт олон бараатай байна",
    },
    en: {
      sent: "Your order is ready in Messenger",
      blocked: "Messenger did not open automatically",
      sentBody: "Press Send in Messenger and attach your payment receipt.",
      blockedBody: "Copy your order below and send it through Messenger.",
      copy: "Copy order",
      copied: "Copied",
      done: "Done",
      nameRequired: "Enter your name",
      nameInvalid: "Name must be 2–80 characters",
      phoneRequired: "Enter your phone number",
      phoneInvalid: "Phone number must contain 8 digits",
      addressRequired: "Enter your delivery address",
      addressInvalid: "Address must be 5–300 characters",
      cartInvalid: "Your cart is empty or contains too many items",
    },
    zh: {
      sent: "订单已在 Messenger 中准备好",
      blocked: "Messenger 未自动打开",
      sentBody: "请在 Messenger 中点击发送并附上付款凭证。",
      blockedBody: "请复制订单内容并通过 Messenger 发送。",
      copy: "复制订单",
      copied: "已复制",
      done: "完成",
      nameRequired: "请输入姓名",
      nameInvalid: "姓名应为2至80个字符",
      phoneRequired: "请输入电话号码",
      phoneInvalid: "电话号码必须为8位数字",
      addressRequired: "请输入配送地址",
      addressInvalid: "地址应为5至300个字符",
      cartInvalid: "购物车为空或商品过多",
    },
    ko: {
      sent: "Messenger에 주문이 준비되었습니다",
      blocked: "Messenger가 자동으로 열리지 않았습니다",
      sentBody: "Messenger에서 보내기를 누르고 결제 영수증을 첨부해 주세요.",
      blockedBody: "주문 내용을 복사해 Messenger로 보내 주세요.",
      copy: "주문 복사",
      copied: "복사됨",
      done: "완료",
      nameRequired: "이름을 입력해 주세요",
      nameInvalid: "이름은 2~80자여야 합니다",
      phoneRequired: "전화번호를 입력해 주세요",
      phoneInvalid: "전화번호는 8자리여야 합니다",
      addressRequired: "배송 주소를 입력해 주세요",
      addressInvalid: "주소는 5~300자여야 합니다",
      cartInvalid: "장바구니가 비어 있거나 상품이 너무 많습니다",
    },
  }[language];
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [submitState, setSubmitState] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");

  const subtotal = calculateCartTotal(cartItems);

  const deliveryFee = subtotal > 0 ? 8000 : 0;
  const grandTotal = subtotal + deliveryFee;

  const validate = () => {
    const result = validateCheckoutForm(formData, cartItems.length);
    setErrors(
      Object.fromEntries(
        Object.entries(result.errors).map(([field, code]) => [
          field,
          statusText[code],
        ]),
      ),
    );
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (!validation.isValid) return;
    const customer = validation.data;

    // Build the Messenger message synchronously first
    const itemsList = cartItems
      .map((item) => `- ${item.title || item.name} (${item.quantity}ш)`)
      .join("\n");

    const message = `Сайн байна уу! Захиалга өгөх гэсэн юм.

👤 Нэр: ${customer.fullName}
📱 Утас: ${customer.phone}
📍 Хаяг: ${customer.address}

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
    const messengerWindow = window.open(url, "_blank");
    if (messengerWindow) messengerWindow.opener = null;
    setOrderMessage(message);
    setSubmitState(messengerWindow ? "sent" : "blocked");

    // Save to Firestore in the background — failure doesn't affect the user
    if (!isFirebaseConfigured) return;
    try {
      const firebase = await getFirebaseClient();
      if (!firebase) return;
      await firebase.addDoc(firebase.collection(firebase.db, "orders"), {
        customer: {
          fullName: customer.fullName,
          phone: customer.phone,
          address: customer.address,
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
        createdAt: firebase.serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to save order to Firestore:", err);
    }
  };

  const handleClose = useCallback(() => {
    // A handoff is not an order confirmation; keep the bag available for retry.
    setFormData({ fullName: "", phone: "", address: "" });
    setErrors({});
    setSubmitState(null);
    setOrderMessage("");
    onClose();
  }, [onClose]);
  const dialogRef = useModalAccessibility(isOpen, handleClose);

  const copyOrder = async () => {
    await navigator.clipboard.writeText(orderMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-[80]"
          />

          {/* Modal — centered with top/left + translate */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="checkout-dialog fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] bg-gradient-to-br from-white to-cream-50 rounded-3xl shadow-2xl w-[calc(100%-2rem)] max-w-4xl overflow-hidden flex flex-col md:flex-row border border-gold-100 max-h-[85vh] md:max-h-[90vh]"
          >
            {/* Decorative icon */}
            <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
              <Flower className="text-orange-400 w-24 h-24 rotate-12" />
            </div>

            {/* Right panel: Order Summary — shown first on mobile */}
            <div className="w-full md:w-2/5 bg-white/50 p-4 md:p-8 border-b md:border-b-0 md:border-l border-gold-100 flex flex-col backdrop-blur-sm relative order-1 md:order-2 max-h-[40vh] md:max-h-full overflow-y-auto">
              <div className="flex justify-between items-start mb-2 md:mb-8">
                <h2 className="text-base md:text-xl font-heading font-bold text-amber-900">
                  {tCart.title}
                </h2>
                <button
                  onClick={handleClose}
                  aria-label={tCart.close || "Хаах"}
                  className="hidden md:block text-amber-800/40 hover:text-amber-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 md:space-y-4 mb-2 md:mb-8 pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-2 md:gap-4 p-2 md:p-3 bg-white rounded-xl border border-gold-100 shadow-sm"
                  >
                    <div className="relative w-12 h-12 md:w-16 md:h-16 bg-cream-50 rounded-lg border border-gold-100 shrink-0 overflow-hidden">
                      <Image
                        src={item.image || "/images/logo.png"}
                        alt={item.title || item.name || "UNDRAM"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-amber-900 text-xs md:text-sm line-clamp-2">
                        {item.title || item.name}
                      </p>
                      <p className="text-amber-600 text-[10px] md:text-xs font-bold mt-0.5 md:mt-1">
                        {item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold-200 pt-2 md:pt-6 space-y-1 md:space-y-3">
                <div className="flex justify-between items-center text-amber-900/70 text-xs md:text-base">
                  <span>{t.summary.subtotal}</span>
                  <span className="font-bold text-amber-900 text-sm md:text-base">
                    {subtotal.toLocaleString()}₮
                  </span>
                </div>
                <div className="flex justify-between items-center text-amber-900/70 text-xs md:text-base">
                  <span>{t.summary.delivery}</span>
                  <span className="font-bold text-gold-500 text-sm md:text-base">
                    {deliveryFee.toLocaleString()}₮
                  </span>
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
                <h2
                  id="checkout-title"
                  className="text-lg md:text-3xl font-heading font-bold text-amber-900"
                >
                  {t.title}
                </h2>
                <button
                  onClick={handleClose}
                  aria-label={tCart.close || "Хаах"}
                  className="md:hidden text-amber-800/60 hover:text-amber-900"
                >
                  <X size={24} />
                </button>
              </div>

              {submitState ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-950">
                    {submitState === "sent"
                      ? statusText.sent
                      : statusText.blocked}
                  </h3>
                  <p className="mt-3 max-w-md text-amber-900/65">
                    {submitState === "sent"
                      ? statusText.sentBody
                      : statusText.blockedBody}
                  </p>
                  <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={copyOrder}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-4 font-bold text-amber-900"
                    >
                      <Copy size={18} />
                      {isCopied ? statusText.copied : statusText.copy}
                    </button>
                    <a
                      href="https://m.me/mongolian.natural.honey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 font-bold text-white"
                    >
                      Messenger <ExternalLink size={18} />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={tCart.close || "Хаах"}
                    className="mt-5 min-h-11 px-5 font-bold text-amber-800 underline underline-offset-4"
                  >
                    {statusText.done}
                  </button>
                </div>
              ) : (
                <>
                  {/* Bank Info Box */}
                  <div className="bg-yellow-100 border-2 border-yellow-400 p-3 md:p-6 rounded-2xl mb-3 md:mb-8 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-bl-full -mr-8 -mt-8 opacity-50" />
                    <h3 className="font-bold text-amber-900 mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {t.paymentInfo}
                    </h3>
                    <div className="space-y-1.5 md:space-y-3 text-amber-900">
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm opacity-80">
                          {t.bank}:
                        </span>
                        <span className="font-bold text-xs md:text-base">
                          Хаан Банк
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm opacity-80">
                          {t.receiver}:
                        </span>
                        <span className="font-bold text-xs md:text-base">
                          Энэрэлт Тулуй ХХК
                        </span>
                      </div>
                      <div className="pt-2 md:pt-3 border-t border-yellow-200/50">
                        <span className="text-[10px] md:text-xs opacity-80 block mb-1">
                          {t.account}:
                        </span>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-lg md:text-2xl font-bold tracking-wider font-heading">
                            5005920850456
                          </span>
                          <button
                            onClick={handleCopy}
                            className="p-1.5 md:p-2 hover:bg-yellow-200/50 rounded-full transition-colors text-amber-700"
                            title="Хуулах"
                          >
                            {isCopied ? (
                              <Check
                                size={16}
                                className="md:w-[18px] md:h-[18px]"
                              />
                            ) : (
                              <Copy
                                size={16}
                                className="md:w-[18px] md:h-[18px]"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-2 md:space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="checkout-name"
                        className="block text-[10px] md:text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-1 md:mb-2"
                      >
                        {t.form.name}
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            fullName: e.target.value,
                          });
                          setErrors((prev) => ({
                            ...prev,
                            fullName: undefined,
                          }));
                        }}
                        className={`w-full p-2 md:p-4 text-sm md:text-base bg-white border ${errors.fullName ? "border-red-500" : "border-gold-200"} rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all`}
                        placeholder={t.form.placeholder_name}
                        required
                        minLength={CHECKOUT_LIMITS.fullNameMin}
                        maxLength={CHECKOUT_LIMITS.fullNameMax}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? "checkout-name-error" : undefined
                        }
                      />
                      {errors.fullName && (
                        <p
                          id="checkout-name-error"
                          role="alert"
                          className="text-red-500 text-xs mt-1 ml-1"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-phone"
                        className="block text-[10px] md:text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-1 md:mb-2"
                      >
                        {t.form.phone}
                      </label>
                      <input
                        id="checkout-phone"
                        type="text"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, ""),
                          });
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        className={`w-full p-2 md:p-4 text-sm md:text-base bg-white border ${errors.phone ? "border-red-500" : "border-gold-200"} rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all`}
                        placeholder={t.form.placeholder_phone}
                        required
                        pattern="[0-9]{8}"
                        maxLength={CHECKOUT_LIMITS.phoneLength}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "checkout-phone-error" : undefined
                        }
                      />
                      {errors.phone && (
                        <p
                          id="checkout-phone-error"
                          role="alert"
                          className="text-red-500 text-xs mt-1 ml-1"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="checkout-address"
                        className="block text-[10px] md:text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-1 md:mb-2"
                      >
                        {t.form.address}
                      </label>
                      <textarea
                        id="checkout-address"
                        autoComplete="street-address"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          setErrors((prev) => ({
                            ...prev,
                            address: undefined,
                          }));
                        }}
                        className={`w-full p-2 md:p-4 text-sm md:text-base bg-white border ${errors.address ? "border-red-500" : "border-gold-200"} rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all h-16 md:h-24 resize-none`}
                        placeholder={t.form.placeholder_address}
                        required
                        minLength={CHECKOUT_LIMITS.addressMin}
                        maxLength={CHECKOUT_LIMITS.addressMax}
                        aria-invalid={Boolean(errors.address)}
                        aria-describedby={
                          errors.address ? "checkout-address-error" : undefined
                        }
                      />
                      {errors.address && (
                        <p
                          id="checkout-address-error"
                          role="alert"
                          className="text-red-500 text-xs mt-1 ml-1"
                        >
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {errors.cart && (
                      <p
                        role="alert"
                        className="text-center text-sm font-bold text-red-600"
                      >
                        {errors.cart}
                      </p>
                    )}

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
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
