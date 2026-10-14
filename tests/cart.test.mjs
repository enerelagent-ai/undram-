import assert from "node:assert/strict";
import test from "node:test";
import { calculateCartTotal, normalizeQuantity, parsePrice } from "../utils/cart.mjs";

test("parsePrice supports the price formats used by the storefront", () => {
    assert.equal(parsePrice("28,200₮"), 28_200);
    assert.equal(parsePrice("20 100 MNT"), 20_100);
    assert.equal(parsePrice(8_000), 8_000);
});

test("parsePrice rejects missing, negative, decimal, and unsafe numeric values", () => {
    assert.equal(parsePrice(null), 0);
    assert.equal(parsePrice(""), 0);
    assert.equal(parsePrice(-1), 0);
    assert.equal(parsePrice(12.5), 0);
    assert.equal(parsePrice(Number.MAX_SAFE_INTEGER + 1), 0);
});

test("normalizeQuantity accepts positive whole quantities only", () => {
    assert.equal(normalizeQuantity(2), 2);
    assert.equal(normalizeQuantity("3"), 3);
    assert.equal(normalizeQuantity(0), 0);
    assert.equal(normalizeQuantity(-1), 0);
    assert.equal(normalizeQuantity(1.5), 0);
});

test("calculateCartTotal calculates a cart and safely ignores malformed entries", () => {
    assert.equal(calculateCartTotal([
        { price: "28,200₮", quantity: 2 },
        { price: "20 100₮", quantity: 1 },
        { price: "invalid", quantity: 4 },
        null,
    ]), 76_500);
    assert.equal(calculateCartTotal(null), 0);
});
