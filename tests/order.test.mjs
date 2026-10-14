import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeCheckoutForm, validateCheckoutForm } from "../utils/order.mjs";

test("sanitizeCheckoutForm trims text and keeps phone digits only", () => {
    assert.deepEqual(sanitizeCheckoutForm({
        fullName: "  Бат Болд  ",
        phone: "99 12-34 56",
        address: "  БЗД, 1-р хороо  ",
    }), {
        fullName: "Бат Болд",
        phone: "99123456",
        address: "БЗД, 1-р хороо",
    });
});

test("validateCheckoutForm accepts data matching Firestore rules", () => {
    const result = validateCheckoutForm({
        fullName: "Бат Болд",
        phone: "99123456",
        address: "БЗД, 1-р хороо",
    }, 2);

    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
});

test("validateCheckoutForm rejects short fields, invalid phones, and empty carts", () => {
    const result = validateCheckoutForm({ fullName: "Б", phone: "123", address: "БЗД" }, 0);

    assert.equal(result.isValid, false);
    assert.deepEqual(result.errors, {
        fullName: "nameInvalid",
        phone: "phoneInvalid",
        address: "addressInvalid",
        cart: "cartInvalid",
    });
});
