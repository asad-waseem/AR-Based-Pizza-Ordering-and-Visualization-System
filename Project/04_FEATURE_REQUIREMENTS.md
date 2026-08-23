# 04 — Feature Requirements

## 1. Purpose

This document defines what each user-facing feature must actually do.

A feature is not considered implemented merely because a visual control exists.

---

# A. Pizza Catalog

## FR-001 — Central Product Data

The system must store pizza information in a structured shared data source.

Each pizza must have:

- unique ID;
- slug;
- name;
- description;
- image;
- ingredients;
- category/tags;
- size options;
- size-specific price;
- physical diameter;
- 3D model metadata.

### Acceptance

- catalog page and product page read from the same data source;
- no duplicate conflicting price source exists.

---

## FR-002 — Pizza Listing

The menu/catalog page must render pizza cards from structured data.

Each card must display:

- image;
- name;
- starting or selected price;
- short descriptor;
- link/action to details.

### Acceptance

- adding a new pizza to the data source can make it appear without manually copying page markup.

---

## FR-003 — Pizza Search

If search is included in final scope, the user must be able to search by pizza name and optionally ingredient/category.

### Acceptance

- typing a query changes results;
- empty result state is shown;
- search control is not decorative.

---

## FR-004 — Pizza Filters

If filter UI is visible, it must function.

Possible filters:

- category;
- vegetarian;
- spicy;
- price.

### Acceptance

- filter selection changes visible products;
- reset/clear option exists;
- mobile filtering remains usable.

---

# B. Product Detail

## FR-010 — Dynamic Pizza Route

Each pizza must have a unique product-detail route.

Preferred:

```text
/pizza/[id]
```

### Acceptance

- valid ID renders correct pizza;
- invalid ID shows not-found behavior;
- data is not hardcoded per page.

---

## FR-011 — Product Information

Product detail must show:

- name;
- description;
- ingredients;
- image or 3D viewer;
- rating if retained;
- size selection;
- selected diameter;
- selected price;
- quantity;
- AR action;
- add-to-cart action.

---

# C. Size Selection

## FR-020 — Three Sizes

Initial required sizes:

- Small — 10 inch;
- Medium — 12 inch;
- Large — 14 inch.

Metric equivalents:

- 0.254 m;
- 0.3048 m;
- 0.3556 m.

---

## FR-021 — Default Size

The product page must initialize with an explicit default size.

Recommended default:

`Medium`

The default must be visually selected.

---

## FR-022 — Size Feedback

When the user selects a different size, immediately update:

- selected control;
- diameter text;
- price;
- data passed to 3D/AR module.

No page reload should be required.

---

## FR-023 — Size Accessibility

The selected state must be programmatically understandable.

Do not use a plain decorative `<div>` without proper interaction semantics.

---

# D. Quantity

## FR-030 — Quantity Control

The user must be able to increase and decrease quantity.

Minimum:

`1`

The UI must prevent quantity from becoming 0 or negative on the product page.

---

# E. Cart

## FR-040 — Add to Cart

Add to Cart must create a real cart line item.

Required captured values:

- pizza ID;
- name;
- image;
- selected size;
- diameter;
- unit price;
- quantity.

### Acceptance

Clicking Add to Cart must do more than navigate to the cart page.

---

## FR-041 — Configured Line Identity

Different configurations must remain distinct.

Example:

```text
Pepperoni — Medium
Pepperoni — Large
```

must not accidentally merge into one line unless the merge logic includes configuration identity.

---

## FR-042 — Cart Persistence

The cart must survive normal route navigation and page refresh using `localStorage`.

---

## FR-043 — Remove Item

The user must be able to remove an item.

Totals must recalculate immediately.

---

## FR-044 — Update Quantity

The cart must support changing item quantity.

Totals must update immediately.

---

## FR-045 — Cart Totals

The cart must calculate:

- subtotal;
- optional demo delivery fee;
- grand total.

Use one price source.

---

## FR-046 — Empty Cart

When empty, show:

- clear message;
- action back to menu.

Do not render a broken empty table.

---

## FR-047 — Header Mini-Cart

The header cart UI must use the same cart state.

It must not keep original hardcoded demo products.

---

# F. 3D Viewer

## FR-050 — Interactive 3D Preview

The product page must provide an interactive pizza model preview.

Minimum interactions:

- rotate;
- inspect from different angles;
- reset or stable default camera.

Zoom is optional but recommended if it does not harm usability.

---

## FR-051 — 3D Loading State

While loading:

- display progress or loading indicator;
- prevent user confusion.

---

## FR-052 — 3D Error State

If the model fails:

- show a clear message;
- show fallback pizza image;
- keep ordering flow usable.

---

## FR-053 — Size Connection

The 3D/AR configuration must receive the currently selected physical size.

The implementation must not keep a fixed scale while the UI claims a different size.

---

# G. Augmented Reality

## FR-060 — View in AR Action

A clear `View in AR` action must exist on the pizza product page.

---

## FR-061 — AR Guidance

Before launch, show concise instructions for:

- camera access;
- scanning a horizontal surface;
- placing the pizza;
- comparing size.

---

## FR-062 — Supported Device Handling

The system must use a technically appropriate path for supported mobile AR.

Implementation details are defined in `05_AR_3D_SPECIFICATION.md`.

---

## FR-063 — Unsupported Device Handling

If AR is not available:

- explain it clearly;
- keep the 3D viewer available;
- do not show a dead button.

---

## FR-064 — Physical Scale

AR must target approximately true physical pizza diameter.

Selected size mapping:

- Small = 0.254 m;
- Medium = 0.3048 m;
- Large = 0.3556 m.

---

## FR-065 — Real Device Validation

Final AR acceptance requires real supported device testing.

Desktop browser preview alone does not satisfy this requirement.

---

# H. Checkout

## FR-070 — Demo Checkout Form

Required fields:

- name;
- email;
- phone;
- address.

Optional:

- city;
- delivery note.

---

## FR-071 — Validation

Required fields must be validated before confirmation.

Errors must appear in understandable language.

---

## FR-072 — Payment Scope

Do not process real card payments.

Recommended options:

- Cash on Delivery;
- Demo Payment.

If the original template contains credit-card fields, they should be removed or clearly disabled for the academic prototype unless specifically required.

---

## FR-073 — Order Creation

Submitting a valid demo checkout must create a temporary order summary.

Order summary must include:

- order ID;
- items;
- sizes;
- quantities;
- totals;
- customer delivery information;
- selected demo payment method.

---

## FR-074 — Order Confirmation

After checkout, navigate to a confirmation page.

Show:

- success message;
- order number;
- order items;
- totals;
- return action.

---

## FR-075 — Cart Clear

After successful demo order confirmation, the active cart should be cleared.

Avoid clearing it before successful validation.

---

# I. Responsive Behavior

## FR-080 — Mobile Support

The complete core flow must work on mobile.

Minimum checks:

- home;
- menu;
- product details;
- size selector;
- 3D viewer;
- AR action;
- cart;
- checkout;
- confirmation.

---

## FR-081 — No Horizontal Overflow

No primary route may have persistent horizontal overflow at standard mobile widths.

---

## FR-082 — Touch Targets

Important buttons must be comfortably tappable.

Priority:

- size options;
- View in AR;
- Add to Cart;
- quantity controls;
- checkout submit.

---

# J. Accessibility

## FR-090 — Form Labels

All checkout inputs need labels or equivalent accessible names.

---

## FR-091 — Keyboard Use

Non-AR website interactions should be keyboard operable where practical.

---

## FR-092 — Focus Visibility

Interactive controls must retain a visible focus state.

---

## FR-093 — Image Alternatives

Pizza images must use meaningful alt text.

Decorative images may use empty alt text.

---

## FR-094 — Status Feedback

Important status messages should be understandable without relying solely on animation or color.

---

# K. HCI-Specific Features

## FR-100 — Dimension Visibility

The selected physical diameter must be visible near the size selector and AR action.

Example:

```text
Medium — 12 in / 30.5 cm
```

---

## FR-101 — AR Purpose Explanation

The UI should explain why AR is useful.

Example:

`See approximately how much table space this pizza will take before you order.`

---

## FR-102 — User Control

The user must be able to:

- change size before ordering;
- cancel AR launch;
- return from AR;
- edit cart quantity;
- remove cart items;
- return to shopping.

---

# L. Non-Functional Requirements

## NFR-001 — Build Stability

The project should complete `npm run build` successfully at the end of each relevant phase unless a known template issue is explicitly documented.

---

## NFR-002 — Console Stability

Core user flows should not generate unhandled runtime errors.

---

## NFR-003 — Performance

The 3D module should not load unnecessarily on pages that do not display it.

---

## NFR-004 — Maintainability

Product data and cart logic must not be duplicated across pages.

---

## NFR-005 — Security

No secret or real payment credential may be placed in source code.

---

## NFR-006 — Licensing

3D models and third-party visual assets must have a license appropriate for the project.

---

# M. Final Functional Demo Checklist

The final reviewer should be able to perform this complete path:

```text
Open Home
→ Open Menu
→ Choose Pizza
→ Select Medium
→ Observe Price and 12-inch Dimension
→ Rotate 3D Pizza
→ Open AR Instructions
→ Launch AR on Supported Phone
→ Place Pizza on Table
→ Return to Website
→ Add Pizza to Cart
→ Change Quantity
→ Open Checkout
→ Submit Valid Demo Information
→ View Order Confirmation
```

If one of these core steps is only decorative, the corresponding feature is incomplete.
