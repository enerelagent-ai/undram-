export const CHECKOUT_LIMITS = Object.freeze({
    fullNameMin: 2,
    fullNameMax: 80,
    addressMin: 5,
    addressMax: 300,
    phoneLength: 8,
    maxItems: 30,
});

export function sanitizeCheckoutForm(formData = {}) {
    return {
        fullName: typeof formData.fullName === "string" ? formData.fullName.trim() : "",
        phone: typeof formData.phone === "string" ? formData.phone.replace(/\D/g, "") : "",
        address: typeof formData.address === "string" ? formData.address.trim() : "",
    };
}

export function validateCheckoutForm(formData, itemCount) {
    const data = sanitizeCheckoutForm(formData);
    const errors = {};

    if (!data.fullName) errors.fullName = "nameRequired";
    else if (data.fullName.length < CHECKOUT_LIMITS.fullNameMin || data.fullName.length > CHECKOUT_LIMITS.fullNameMax) {
        errors.fullName = "nameInvalid";
    }

    if (!data.phone) errors.phone = "phoneRequired";
    else if (!new RegExp(`^\\d{${CHECKOUT_LIMITS.phoneLength}}$`).test(data.phone)) {
        errors.phone = "phoneInvalid";
    }

    if (!data.address) errors.address = "addressRequired";
    else if (data.address.length < CHECKOUT_LIMITS.addressMin || data.address.length > CHECKOUT_LIMITS.addressMax) {
        errors.address = "addressInvalid";
    }

    if (!Number.isSafeInteger(itemCount) || itemCount < 1 || itemCount > CHECKOUT_LIMITS.maxItems) {
        errors.cart = "cartInvalid";
    }

    return { data, errors, isValid: Object.keys(errors).length === 0 };
}
