# Ethiopian Crafts

A responsive storefront for discovering handcrafted Ethiopian baskets, pottery, jewelry, and textiles. Customers can browse and filter the catalogue, view product details, manage a cart, and submit a delivery order request.

This is a student demonstration project. It does not collect payment details, process payments, or save submitted orders to a server.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify

```bash
npm run lint
npm run build
npm run start
```

## Store journey

- `/` — store introduction and featured products
- `/products` — category-filterable catalogue
- `/products/[id]` — product information and availability
- `/cart` — quantity controls, remove action, and calculated subtotal
- `/checkout` — validated contact and delivery details with order summary
- `/order-success` — submitted order reference and summary

Product data lives in `src/data/products.ts` and is shared by the home page, catalogue, detail pages, and cart actions. Most pages are Server Components; client-side code is limited to cart interactions and the checkout/confirmation flow.

## Configuration and scope

Create a local `.env.local` from `.env.example` and replace every example value. Use a unique admin password of at least 12 characters and generate a random `SESSION_SECRET` with at least 32 characters (for example, `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`). These are server-only variables; do not prefix them with `NEXT_PUBLIC_`, commit `.env.local`, or reuse real credentials from another service.

There is no payment page or payment credential field. Cart state and the last order exist only in memory for the current browsing session; they are not persisted or sent to a service.

### Admin session demonstration

- `/admin/login` accepts the single server-configured account. `/admin` is a protected sample dashboard.
- Successful login creates a signed, eight-hour session cookie with `HttpOnly`, `SameSite=Lax`, `Path=/`, and `Secure` in production. Logout expires the cookie.
- Login and logout POSTs require a matching `Origin`; `SameSite=Lax` adds browser-level cross-site request protection.
- The Next.js proxy validates the session cookie before allowing access to admin routes, and the admin page independently verifies the signature and expiration on the server. The proxy check is a fast early gate, while the page remains the final authorization decision.
- This is an educational, single-account demo, not production identity infrastructure: it has no database, password reset, MFA, or distributed rate limiter. Configure edge/server rate limiting before exposing a login publicly, and verify authorization in every future protected server page, route handler, and data operation.

See [PERF.md](./PERF.md) for the measurement method and results. Do not treat local, unthrottled results as production Core Web Vitals.

See [UI_THEME.md](./UI_THEME.md) for the reusable visual brief and design tokens used across the storefront.
