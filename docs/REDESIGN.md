# UNDRAM storefront redesign

The existing Next.js 16 / React 19 static-export application remains in place. Local preview: `npm run dev -- --hostname 127.0.0.1`.

## Design

Warm ivory `#F6F1E7`, amber `#C88A24`, deep brown `#2A1C12`, olive `#697153`. Locally hosted Cormorant Garamond variable fonts (upright and true italic) provide the display typography; Manrope provides body text and prices. Both fonts include the full Mongolian Cyrillic alphabet and the ₮ sign. Next.js local font loading supplies preload, swap and adjusted fallback metrics. Text amber is darker than the decorative amber for contrast. Shared tokens, spacing, buttons, product cards, editorial cards, page headings, gallery/lightbox and footer live in `app/globals.css` and `components/`.

Home, catalog, product detail, story, stores, recipes and recipe detail, news and article detail, contact, 404, loading and error states use the same system. Four languages and all static product routes remain available. Original source data and prices are retained. No reviews, ratings, certificates or new health claims were added.

## React Bits evaluation

Reviewed upstream README, MIT + Commons Clause license and JS sources on 2026-10-14:
- Silk: https://github.com/DavidHDev/react-bits/blob/main/src/content/Backgrounds/Silk/Silk.jsx — vendored in `components/effects/`; current source uses React and native WebGL2, no Three.js dependency. Lazy client-only import; desktop DPR 1; reduced-motion/mobile uses the CSS fallback. Upstream pauses off-screen and on hidden tabs.
- Tilted Card: https://reactbits.dev/components/tilted-card — adapted only the spring/pointer rotation logic to the already-installed `framer-motion`. Image tilt capped at 2.5 degrees; product actions stay outside the transform. Touch and reduced motion disable tilt.
- Scroll Reveal: https://reactbits.dev/text-animations/scroll-reveal — upstream requires GSAP/ScrollTrigger. Used an original small `framer-motion` in-view reveal to avoid another animation dependency. Content stays visible in the server HTML.
- Circular Gallery: https://reactbits.dev/components/circular-gallery — inspected current native WebGL implementation; selected semantic scroll-snap buttons and accessible lightbox for native swipe, focus, keyboard, screen readers and no-WebGL support.
- Glass Surface: https://reactbits.dev/components/glass-surface — inspected current React/WebGL source; native CSS backdrop blur is sufficient for the navigation.

The full upstream license is retained in `components/effects/LICENSE.react-bits.md`. It permits use in websites and commercial applications but restricts selling/redistributing the components themselves. No Pro assets are used. Silk source has minimal integration changes documented in its header.

## Assets

`node scripts/optimize-storefront.mjs` generates static WebP assets without modifying originals. Gallery images use 1100px copies; product/editorial images use up to 1600px copies. Images have aspect-ratio containers and responsive sizes. Gallery and secondary images load lazily. The original gallery is preserved.

## Commerce

The existing local cart, fixed 8,000₮ delivery fee, validation, bank information and Messenger handoff remain. Browser preferences are restored after hydration. Catalog, product detail and homepage share the same live-product merge. Firebase prices/images override matching static products while localized text and known static routes remain intact. New unknown Firebase IDs cannot be added as routable products without rebuilding a static export.

A Messenger window opening does not establish delivery or payment confirmation. End-to-end QA must intercept external requests and avoid creating real orders. Test actual delivery/Firestore receipt only with a separately authorized test account/order.

## QA commands

- `npm run lint` (generated `out 2/` backup excluded along with `out/`)
- `npm run typecheck`
- `npm test`
- `npm run build`
- Browser verification at 360px, 768px and 1440px; screenshots and results are recorded after local QA.

## Verification results

- Lint, Next route/type generation and TypeScript passed; all 7 existing cart/order tests passed.
- Production static export generated 45 pages.
- Browser checks covered home, catalog/detail, story, stores, recipes/detail, news/detail, contact and 404 at 1440px, 768px and 360px. No horizontal overflow or JavaScript errors in the completed run.
- Catalog categories/search/empty/reset/price ordering, quantity updates, delivery totals, cart persistence, all four language preferences, mobile menu and gallery keyboard controls passed.
- Messenger blocked and ready states were simulated with outbound network requests blocked. Cart removal/empty states and WebGL fallback passed. No real message, payment or order was delivered.
- English, Chinese and Korean editorial placeholders were replaced with the matching existing brand photos.
- Screenshots: `docs/screenshots/`; machine-readable results: `docs/browser-checks.json` and `docs/checkout-states-checks.json`.

The static preview runs at http://127.0.0.1:3001 and the webpack development preview at http://127.0.0.1:3000 for this local session. The temporary static preview server resolves exported `.html` files for nested paths. For subsequent sessions use `npm run dev -- --hostname 127.0.0.1 --webpack`.
