# Store 22

A complete, responsive shoe store made with semantic HTML, vanilla JavaScript ES modules, Tailwind CSS 3, PostCSS, and Vite. No frontend framework or backend.

## Run locally

Use Node.js 20.19+ or Node.js 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173. Serve through Vite instead of opening HTML files directly: ES modules and secure password hashing require localhost or HTTPS.

```sh
npm run build     # Outputs all 12 HTML entry points and shared assets to dist/
npm run preview   # Serves the production build locally
npm test          # Tests authentication, inventory, cart, locales, and safe return URLs
```

## Included

- Home, Men, Women, Kids, Sale, Product, Contact, Cart, Login, Signup, Admin Login, and Admin Dashboard pages.
- 24 seeded shoes: eight per collection, including nine discounted shoes. Sale is derived from the original price, so discounted shoes also stay in their normal collection.
- Size and color filters, search, newest/price sorting, product variants, quantity controls, live cart totals, and mock checkout.
- English, French, and Arabic, including translated seeded product content and full Arabic RTL. Language and theme persist across pages.
- Signup and login, user menu, automatic resumption of a pending cart action, logout with cart clearing, and independent administrator sessions.
- Protected admin page with add/edit/delete, a searchable and filterable table, stock validation, and immediate storefront updates across tabs.
- Accessible labels, keyboard focus states, mobile navigation, toast feedback, form validation, reduced motion support, and offline SVG image fallbacks.
- Contact and newsletter forms persist locally and show confirmation. They do not send email.

## Admin credentials

Open [admin-login.html](./admin-login.html).

```text
Email:    admin@store22.com
Password: admin123
```

Customer accounts are created from [signup.html](./signup.html). Signup signs the customer in automatically. Passwords must have at least six characters. Demo passwords are stored as salted PBKDF2-SHA256 hashes, never plaintext.

This project intentionally uses browser-only authentication. The admin credentials are visible in the source, and localStorage can be changed by the browser owner. Real commerce requires server-side authentication, authorization, inventory, and payment processing. Checkout only clears the demo bag; no payment is collected or order sent. Address, contact details, delivery and return policies are illustrative.

## Persistence

Keys are centralized in [storage.js](./src/js/storage.js). All values are JSON except the theme string, which is read before the module loads to avoid a theme flash.

| Key | Contents |
| --- | --- |
| `store22.shoes` | Current catalog, seeded only if absent or invalid |
| `store22.users` | Customer profiles, salts, and password hashes |
| `store22.cart` | Current customer's line IDs, shoe IDs, sizes, colors, quantities |
| `store22.theme` | Raw `light` or `dark` string; initially follows the system |
| `store22.language` | `en`, `fr`, or `ar` |
| `store22.customerSession` | Customer user ID and session timestamp |
| `store22.adminSession` | Independent mock administrator session |
| `store22.pendingCart` | Selected shoe and variant awaiting customer login |
| `store22.flash` | One-time feedback after navigation |
| `store22.newsletter` | Locally subscribed email addresses |
| `store22.messages` | Locally saved contact messages |

An intentionally empty catalog stays empty after reload. To reset the catalog, remove only `store22.shoes` in browser developer tools and reload. Cart reads reconcile removed products, changed sizes/colors, and stock reductions. Prices always come from the current catalog; stock limits apply across variants. Customer logout leaves the administrator session intact.

## Project layout

```text
*.html                 Twelve Vite page entry points
src/css/style.css      Tailwind layers, shared controls, responsive styling
src/data/shoes.js      Seed catalog with translated names and descriptions
src/locales/           Complete English/French/Arabic dictionaries
src/js/main.js         Bootstrap and page routing by data-page
src/js/ui.js           Navbar, footer, icons, cards, toast, image fallback
src/js/storage.js      Namespaced persistence helpers
src/js/auth.js         Customer/admin authentication
src/js/cart.js         Cart and inventory reconciliation
src/js/shoes.js        Catalog CRUD and validation
src/js/theme.js        Persistent class-based theme
src/js/i18n.js         Translation helpers, price formatting, RTL
src/js/pages/          Page renderers and delegated event handlers
tests/store.test.js    Dependency-free Node test suite
```

All HTML files are registered as inputs in [vite.config.js](./vite.config.js). Exact colors, Inter/Cairo font families, and `darkMode: 'class'` are configured in [tailwind.config.js](./tailwind.config.js). [postcss.config.js](./postcss.config.js) builds Tailwind and Autoprefixer. Google Fonts and Unsplash images require a network connection; system fonts and embedded shoe illustrations are used when unavailable. Social icons link to the platforms' home pages.

To translate additional text, add a row to the aligned dictionaries in [en.js](./src/locales/en.js), then use `t(key, params)` for generated content or `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria`, and `data-i18n-title` attributes for markup. Admin-authored shoe text appears as entered, while seeded shoes include complete translations.
