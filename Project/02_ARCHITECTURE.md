# 02 — Architecture Specification

## 1. Architecture Goal

Preserve the existing FoodKing Next.js template and evolve it into a maintainable pizza ecommerce HCI prototype without unnecessary framework replacement.

The final architecture should separate:

- product data;
- reusable pizza components;
- cart state;
- 3D/AR logic;
- route-level pages;
- static assets;
- HCI feedback and guidance.

---

## 2. Audited Existing Stack

Current baseline:

| Area | Current State |
|---|---|
| Framework | Next.js 14.2.8 |
| React | 18.x |
| Router | App Router |
| Language | JavaScript / JSX |
| Styling | Bootstrap 5 CSS + existing SCSS |
| Animation | WOW.js + Animate.css |
| Slider | Swiper 11 |
| Select UI | react-nice-select |
| Price slider | rc-slider |
| State management | local component state only |
| Backend | none |
| API routes | none |
| Database | none |
| Authentication | none |
| 3D / AR | none |
| Product data | hardcoded JSX |

The implementation must evolve from this baseline rather than replacing it.

---

## 3. Existing Important Directories

```text
/
├── app/
├── components/
├── layouts/
├── public/
│   └── assets/
│       ├── css/
│       ├── fonts/
│       ├── img/
│       └── scss/
├── utility/
├── jsconfig.json
├── next.config.mjs
└── package.json
```

Current missing but planned:

```text
/context
/data
/components/ar
/components/pizza
```

---

## 4. Recommended Final Structure

```text
/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── menu/
│   │   └── page.js
│   ├── pizza/
│   │   └── [id]/
│   │       └── page.js
│   ├── cart/
│   │   └── page.js
│   ├── checkout/
│   │   └── page.js
│   ├── order-confirmation/
│   │   └── page.js
│   ├── faq/
│   │   └── page.js
│   └── not-found.js
│
├── components/
│   ├── ar/
│   │   ├── Pizza3DViewer.js
│   │   ├── ARLauncherButton.js
│   │   ├── ARInstructionsModal.js
│   │   ├── ARUnsupportedNotice.js
│   │   └── ModelLoadingState.js
│   │
│   ├── pizza/
│   │   ├── PizzaCard.js
│   │   ├── PizzaGrid.js
│   │   ├── PizzaSizeSelector.js
│   │   ├── PizzaQuantitySelector.js
│   │   ├── PizzaToppingsPicker.js
│   │   ├── PizzaPrice.js
│   │   └── PizzaIngredients.js
│   │
│   └── existing-template-components...
│
├── context/
│   └── CartContext.js
│
├── data/
│   ├── pizzas.js
│   └── sizes.js
│
├── layouts/
│   ├── FoodKingLayout.js
│   ├── Header.js
│   ├── Footer.js
│   └── Preloader.js
│
├── public/
│   └── assets/
│       ├── img/
│       ├── models/
│       │   ├── pizza-default.glb
│       │   └── pizza-default.usdz
│       ├── css/
│       ├── scss/
│       └── fonts/
│
├── utility/
├── docs/
└── AGENTS.md
```

Route migration may happen incrementally. Do not break working routes before replacements are ready.

---

## 5. Server and Client Component Strategy

Next.js App Router uses Server Components by default.

Use Server Components for:

- static route shells;
- data loading from local data modules when no browser state is needed;
- static informational sections.

Use Client Components only where browser interaction is required:

- cart context;
- size selector;
- quantity controls;
- filters;
- localStorage;
- 3D viewer;
- AR device detection;
- modals;
- browser-only APIs.

Every client component must begin with:

```js
"use client";
```

when required.

Do not convert the entire app into client components.

---

## 6. Product Data Architecture

The original hardcoded JSX must be replaced by a structured data source.

Recommended `data/pizzas.js` model:

```js
export const pizzas = [
  {
    id: "margherita",
    slug: "margherita",
    name: "Margherita Pizza",
    shortDescription: "Classic tomato, mozzarella and basil.",
    description: "...",
    category: "classic",
    image: "/assets/img/...",
    gallery: [
      "/assets/img/..."
    ],
    ingredients: [
      "Tomato Sauce",
      "Mozzarella",
      "Basil"
    ],
    tags: ["vegetarian"],
    rating: 4.8,
    reviewCount: 120,
    sizes: {
      small: {
        label: "Small",
        diameterInches: 10,
        diameterMeters: 0.254,
        price: 12.99
      },
      medium: {
        label: "Medium",
        diameterInches: 12,
        diameterMeters: 0.3048,
        price: 15.99
      },
      large: {
        label: "Large",
        diameterInches: 14,
        diameterMeters: 0.3556,
        price: 18.99
      }
    },
    model3d: {
      glb: "/assets/models/pizza-default.glb",
      usdz: "/assets/models/pizza-default.usdz",
      authoredDiameterMeters: 0.3048
    }
  }
];
```

The exact catalog can be adjusted during implementation, but all product pages must use one source of truth.

---

## 7. Size Architecture

Recommended `data/sizes.js`:

```js
export const PIZZA_SIZES = {
  small: {
    label: "Small",
    diameterInches: 10,
    diameterMeters: 0.254
  },
  medium: {
    label: "Medium",
    diameterInches: 12,
    diameterMeters: 0.3048
  },
  large: {
    label: "Large",
    diameterInches: 14,
    diameterMeters: 0.3556
  }
};
```

Size data must not be duplicated across:

- UI labels;
- product data;
- AR configuration;
- cart display.

If the product-specific sizes already contain these values, avoid a second conflicting source.

---

## 8. Dynamic Product Routing

Preferred final route:

```text
/pizza/[id]
```

Examples:

```text
/pizza/margherita
/pizza/pepperoni
/pizza/bbq-chicken
```

The route should:

1. read the product identifier;
2. find the pizza from `data/pizzas.js`;
3. render a not-found state if invalid;
4. show structured product information;
5. mount the interactive configurator;
6. pass model metadata into the 3D/AR module.

---

## 9. Cart Architecture

Create:

```text
context/CartContext.js
```

The provider should expose at minimum:

```js
{
  cartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartCount,
  getCartSubtotal
}
```

A cart line item must preserve configuration:

```js
{
  lineId,
  pizzaId,
  name,
  image,
  selectedSize,
  diameterInches,
  unitPrice,
  quantity
}
```

If toppings are implemented later, include them in `lineId` identity so differently configured pizzas remain separate cart lines.

---

## 10. Cart Persistence

For this HCI prototype:

- use browser `localStorage`;
- hydrate safely in client code;
- avoid localStorage access during server rendering;
- handle empty or corrupted local data gracefully.

Suggested key:

```text
arPizzaCart
```

No database is required for the academic prototype.

---

## 11. Pricing Architecture

Price displayed on the product page must be derived from:

```text
pizza.sizes[selectedSize].price
```

The cart must use the same value captured at add-to-cart time.

Do not hardcode a second price inside the cart page.

---

## 12. 3D/AR Module Boundary

All 3D/AR-specific code should live under:

```text
components/ar/
```

The pizza detail page should not contain device-specific intent strings or WebXR logic directly.

Recommended responsibilities:

### `Pizza3DViewer.js`

- renders the model;
- supports rotation/zoom;
- receives selected size;
- shows loading/error state;
- exposes AR capability through props or event callbacks.

### `ARLauncherButton.js`

- determines available AR launch path;
- opens supported AR mode;
- communicates unsupported states.

### `ARInstructionsModal.js`

- explains how to scan a surface;
- explains camera permission;
- explains scale expectation;
- provides continue/cancel controls.

### `ARUnsupportedNotice.js`

- explains that 3D preview remains available;
- recommends supported device/browser where appropriate.

---

## 13. 3D Asset Architecture

Store project-owned or properly licensed 3D files under:

```text
public/assets/models/
```

Expected final assets:

```text
pizza-default.glb
pizza-default.usdz
```

Potentially later:

```text
margherita.glb
pepperoni.glb
bbq-chicken.glb
```

For the MVP, one visually convincing pizza model reused across pizza products is acceptable if the HCI evaluation is focused on size perception.

Do not pretend different toppings are 3D-accurate if the same model is reused.

---

## 14. Existing Layout Preservation

Reuse the existing:

- `FoodKingLayout.js`;
- `Header.js`;
- mobile menu;
- `Footer.js`;
- hero patterns;
- product card styles;
- product-detail two-column structure;
- cart layout;
- SCSS variables;
- Swiper configuration where useful.

The new architecture should fit inside the template.

---

## 15. Header Cart Integration

The existing mini-cart is hardcoded.

After `CartContext` is introduced:

- header cart count must come from context;
- preview items must come from context;
- subtotal must come from context;
- empty state must be shown when no items exist.

Do not maintain a separate header cart data array.

---

## 16. Search and Filter Architecture

For the academic prototype, filtering can be fully client-side.

Possible filters:

- category;
- vegetarian/non-vegetarian;
- price;
- size availability.

Search can filter the local pizza catalog by:

- name;
- ingredients;
- category.

No backend search service is required.

---

## 17. Demo Checkout Architecture

The checkout page should remain frontend-only.

Recommended flow:

```text
Cart
  ↓
Checkout Form
  ↓
Client Validation
  ↓
Create Temporary Order Summary
  ↓
Store in sessionStorage or route state
  ↓
Clear Cart
  ↓
Order Confirmation
```

Do not collect real card payments.

Payment UI must be clearly demo-only.

---

## 18. Order Object

Suggested temporary order structure:

```js
{
  orderId: "AR-2026-00123",
  createdAt: "...",
  customer: {
    name: "...",
    email: "...",
    phone: "...",
    address: "..."
  },
  items: [...],
  subtotal: 0,
  deliveryFee: 0,
  total: 0,
  paymentMethod: "Cash on Delivery"
}
```

For academic demonstration, Cash on Delivery or "Demo Payment" is sufficient.

---

## 19. Utility / Hydration Risk

The current audit found direct browser DOM manipulation inside `utility/index.js`.

Any direct use of:

- `window`;
- `document`;
- WOW.js;
- DOM element lookup;

must remain inside safe client lifecycle code.

Do not introduce browser-only calls into server-rendered execution.

Duplicate utility declarations should be cleaned only in the approved phase.

---

## 20. Legacy Dependency Risk

`react-bootstrap` is currently older than the template's Bootstrap CSS generation.

Do not automatically perform a broad dependency upgrade.

If a specific component becomes unstable, replace that specific dependency usage with simpler native React behavior during the relevant phase.

---

## 21. Security Baseline

Even though the app is a prototype:

- never expose secrets;
- do not store real payment data;
- validate checkout fields;
- escape/safely render user-entered values;
- do not use `dangerouslySetInnerHTML` for user data;
- keep external links controlled;
- do not request unnecessary browser permissions.

---

## 22. Performance Baseline

Important performance areas:

- optimize large pizza images;
- lazy-load non-critical images where reasonable;
- avoid loading the 3D model on unrelated pages;
- lazy-load the 3D module if needed;
- display loading state while model loads;
- do not initialize AR logic globally.

---

## 23. Architecture Decision Summary

The final project is intentionally:

- frontend-first;
- locally data-driven;
- context-driven for cart;
- mobile responsive;
- isolated 3D/AR module;
- no production backend;
- no production auth;
- no real payments;
- based on the existing FoodKing visual foundation.

This architecture is sufficient for the HCI project and avoids unnecessary infrastructure.
