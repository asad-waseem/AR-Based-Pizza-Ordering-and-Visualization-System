# Project Context: AR-Based Pizza Ordering and Visualization System

**Current State**: Phase 1 and Phase 2 have been fully implemented and verified. The codebase is ready to begin **Phase 3**.

---

## 🚀 Work Completed So Far

### Phase 1: Codebase Sanitization & Central Pizza Data
* **Goal**: Establish a single source of truth for all pizza products and ensure the template handles Next.js SSR safely.
* **`data/sizes.js`**: Created to define physical size mappings (Small, Medium, Large) with inches and meter properties for future AR reference.
* **`data/pizzas.js`**: Created the central pizza catalog containing 6 initial products (Margherita, Pepperoni, BBQ Chicken, Veggie, Creamy Garlic, Meat Lovers). Each pizza has an ID, slug, image paths (matching `/public/assets/img/food/`), size-based pricing, and a `model3d` contract.
* **Sanitization**: Verified `utility/index.js` to ensure DOM dependencies (`window`, `document`) do not break SSR.

### Phase 2: Shared Cart State & Persistence
* **Goal**: Create a global cart state that persists across page reloads and connects the header mini-cart to the main cart page.
* **`context/CartContext.js`**: Created a React Context to manage `cartItems`. Features include:
  - `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
  - Dynamic derivation of `getCartCount()` and `getCartSubtotal()`.
  - Safe `localStorage` persistence (`arPizzaCart`) that only hydrates via `useEffect` to prevent Next.js hydration mismatch errors.
  - Items use a compound `lineId` (e.g., `p1-Medium`) so different sizes of the same pizza are stored as separate items.
* **`app/layout.js`**: Integrated `<CartProvider>` at the root layout so cart state covers the entire application.
* **`components/HeaderCart.js`**: Extracted the hardcoded header mini-cart into this component, hooked it into the Context, and replaced the hardcoded instances in `layouts/Header.js`.
* **`app/shop-cart/page.js`**: Replaced the local dummy `useState` cart with `useCart()` hooks. The main cart page now fully respects global state.
* **`app/test-cart/page.js`**: Created a temporary test page to safely inject pizzas into the cart for manual testing.
* **Verification**: `npm run build` succeeds completely (27/27 pages statically generated). No SSR errors.

---

## ⏭️ Next Steps

You are now ready to begin **Phase 3 — Dynamic Pizza Catalog**. 

In Phase 3, you will need to:
1. Update `app/shop/page.js` (and any other catalog pages) to map over the products imported from `data/pizzas.js`.
2. Ensure links dynamically point to `/pizza/[slug]` or `/pizza/[id]`.
3. Keep the styling and FoodKing components identical to the template.
