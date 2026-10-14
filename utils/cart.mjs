export function parsePrice(value) {
    if (typeof value === "number") {
        return Number.isSafeInteger(value) && value > 0 ? value : 0;
    }

    if (typeof value !== "string") return 0;

    const digits = value.replace(/[^0-9]/g, "");
    if (!digits) return 0;

    const parsed = Number.parseInt(digits, 10);
    return Number.isSafeInteger(parsed) ? parsed : 0;
}

export function normalizeQuantity(value) {
    const quantity = Number(value);
    return Number.isSafeInteger(quantity) && quantity > 0 ? quantity : 0;
}

export function calculateCartTotal(items) {
    if (!Array.isArray(items)) return 0;

    return items.reduce(
        (total, item) => total + parsePrice(item?.price) * normalizeQuantity(item?.quantity),
        0
    );
}
