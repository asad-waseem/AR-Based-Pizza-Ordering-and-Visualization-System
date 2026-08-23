# 06 — Development Phases

## Global Rule

Development must happen phase by phase.

The agent must not implement future phases early.

At the end of every phase:

1. run relevant verification;
2. fix failures;
3. repeat until acceptance passes or a real external blocker remains;
4. report results using `AGENTS.md`.

---

# Phase 0 — Documentation and Baseline Verification

## Goal

Establish project rules and verify the existing Envato template before feature changes.

## Work

- read all docs;
- inspect repository against documented baseline;
- run `npm install` if dependencies are not installed;
- run the existing development server;
- run build if possible;
- record current npm vulnerability warning without force-fixing;
- verify main template pages load;
- do not redesign.

## Expected Existing Baseline

- Next.js 14.2.8;
- React 18;
- App Router;
- FoodKing template;
- hardcoded products;
- no global state;
- no AR/3D.

## Acceptance Criteria

- [ ] project dependencies install;
- [ ] current homepage loads;
- [ ] current core shop pages can be inspected;
- [ ] baseline build/runtime issues are documented;
- [ ] no destructive upgrade is performed;
- [ ] documentation files exist.

---

# Phase 1 — Codebase Sanitization and Central Pizza Data

## Goal

Create a stable product data foundation while preserving the current visual template.

## Existing Code to Reuse

- current food/pizza imagery;
- current product card styles;
- current SCSS;
- current layout;
- existing shop/product markup as visual reference.

## Work

### 1. Inspect utility risk

Review `utility/index.js`.

Fix only confirmed duplicate declarations or client-safety issues that interfere with reliable development.

Do not broadly rewrite working utility code.

### 2. Create central pizza data

Create:

```text
data/pizzas.js
```

Include a manageable academic catalog, recommended 6–10 pizzas.

Each pizza should include:

- id;
- slug;
- name;
- description;
- short description;
- image;
- gallery;
- ingredients;
- category;
- tags;
- rating;
- size-specific prices;
- physical diameter;
- 3D model metadata contract.

### 3. Create size constants if useful

Optional:

```text
data/sizes.js
```

Avoid conflicting duplicated values.

### 4. Do not yet convert all shop pages

This phase establishes data and code hygiene.

## Testing

- import data into a safe test location or verify module syntax;
- confirm app still runs;
- confirm existing homepage/shop still render;
- run build.

## Acceptance Criteria

- [ ] central pizza data exists;
- [ ] every pizza has unique ID/slug;
- [ ] every pizza has Small/Medium/Large metadata;
- [ ] physical size metadata exists;
- [ ] model metadata contract exists;
- [ ] no major visual regression;
- [ ] build passes or blocker documented.

---

# Phase 2 — Shared Cart State and Persistence

## Goal

Replace isolated/mock cart behavior with a shared cart model.

## Existing Code to Reuse

- cart calculation concepts in current shop-cart page;
- current cart layout;
- current header mini-cart design.

## Work

### 1. Create Cart Context

Create:

```text
context/CartContext.js
```

Expose:

- cartItems;
- addToCart;
- removeFromCart;
- updateQuantity;
- clearCart;
- getCartCount;
- getCartSubtotal.

### 2. Add localStorage persistence

Use a safe client-side hydration strategy.

Suggested key:

```text
arPizzaCart
```

### 3. Add provider

Wrap appropriate app level in `CartProvider`.

### 4. Preserve current page visuals

Do not fully redesign cart in this phase.

### 5. Header preparation

Connect header cart count/preview only if doing so does not require Phase 3/4 product conversion.

## Testing

- add test cart items through controlled development path;
- refresh page;
- verify persistence;
- change quantity;
- remove item;
- verify totals.

## Acceptance Criteria

- [ ] shared cart context exists;
- [ ] cart state survives navigation;
- [ ] cart state survives refresh;
- [ ] quantity updates work;
- [ ] remove works;
- [ ] totals are derived;
- [ ] no server-render/localStorage crash;
- [ ] build passes.

---

# Phase 3 — Dynamic Pizza Catalog

## Goal

Convert the primary shop experience into a real pizza catalog using the central data source.

## Existing Code to Reuse

- `/shop` design;
- existing pizza/food product-card classes;
- `ProductSidebar.js` design where useful;
- `ProductTopBar.js` design where useful.

## Work

### 1. Choose primary route

Preferred:

```text
/menu
```

or retain:

```text
/shop
```

Do not maintain two competing primary catalogs.

### 2. Render from `data/pizzas.js`

No hardcoded repeated product cards.

### 3. Create reusable pizza card

Recommended:

```text
components/pizza/PizzaCard.js
```

### 4. Make visible filters functional

If category/filter controls remain visible, wire them to actual data.

### 5. Make sorting functional if kept

If sorting remains visible, implement at least:

- price low to high;
- price high to low;
- name.

Otherwise remove the decorative control.

### 6. Route product cards

All cards must route to future dynamic product path.

## Testing

- catalog renders correct number of pizzas;
- routes are correct;
- filters update products;
- sorting works if visible;
- responsive layout works;
- no hardcoded burger product remains in primary catalog.

## Acceptance Criteria

- [ ] pizza catalog is data-driven;
- [ ] reusable card exists;
- [ ] visible filters work;
- [ ] visible sorting works or is removed;
- [ ] cards route correctly;
- [ ] mobile catalog works;
- [ ] build passes.

---

# Phase 4 — Dynamic Pizza Detail and Size Selection

## Goal

Create the core pizza configuration page before adding 3D/AR.

## Existing Code to Reuse

- existing `/shop-single` two-column layout;
- current product-gallery styling;
- existing quantity controls where reliable;
- current button styles;
- existing tabs if stable.

## Work

### 1. Dynamic route

Create:

```text
app/pizza/[id]/page.js
```

or the approved equivalent.

### 2. Load structured pizza data

Invalid product should use not-found behavior.

### 3. Build pizza configurator

Create:

```text
components/pizza/PizzaSizeSelector.js
components/pizza/PizzaQuantitySelector.js
```

### 4. Default Medium

Default selected size:

`Medium`

### 5. Immediate feedback

When size changes update:

- active control;
- inches/cm;
- price;
- configuration state.

### 6. Real Add to Cart

Add the configured line item to `CartContext`.

### 7. Cart feedback

Show a clear added-to-cart confirmation.

### 8. Dynamic cart page

By the end of this phase, the primary cart page should use the real context rather than hardcoded products.

## Testing

- open multiple pizzas;
- switch sizes;
- verify prices;
- verify dimensions;
- add different sizes of same pizza;
- verify separate lines;
- verify refresh persistence;
- test mobile.

## Acceptance Criteria

- [ ] dynamic product route works;
- [ ] product data matches selected pizza;
- [ ] size selector works;
- [ ] price updates immediately;
- [ ] diameter updates immediately;
- [ ] quantity works;
- [ ] add to cart stores configuration;
- [ ] cart displays correct size/price;
- [ ] mobile product page works;
- [ ] build passes.

---

# Phase 5 — Interactive 3D Pizza Viewer

## Goal

Add a real interactive 3D pizza preview to the dynamic product page.

## Dependency

A valid `.glb` pizza model is required for final acceptance.

If missing, implement architecture but report:

```text
ASSET_REQUIRED
```

## Existing Code to Reuse

- product image/gallery container;
- product page layout;
- current loading/preloader visual language.

## Work

### 1. Install 3D dependency if required

Preferred:

`<model-viewer>` integration.

Document package/version if installed.

### 2. Create AR/3D components

Minimum:

```text
components/ar/Pizza3DViewer.js
components/ar/ModelLoadingState.js
```

### 3. Integrate viewer

Place viewer in the product-detail visual area.

### 4. Support interaction

- rotate;
- touch interaction;
- responsive sizing;
- loading state;
- error fallback.

### 5. Connect selected size metadata

The viewer must receive current diameter/scale configuration.

Do not yet claim mobile AR is complete.

## Testing

- model loads;
- rotation works;
- touch works;
- changing size updates required 3D configuration;
- failed model shows fallback;
- mobile layout remains usable;
- build passes.

## Acceptance Criteria

- [ ] real GLB loads or `ASSET_REQUIRED` declared;
- [ ] viewer is interactive;
- [ ] loading state exists;
- [ ] error fallback exists;
- [ ] size metadata is connected;
- [ ] no major mobile regression;
- [ ] build passes.

---

# Phase 6 — Mobile AR and Physical Scale

## Goal

Enable supported mobile users to place the pizza in the real environment at approximately the selected physical diameter.

## Dependencies

- Phase 5 complete;
- valid 3D model;
- known authored model diameter;
- supported real mobile device for final acceptance.

## Work

### 1. AR launcher

Create:

```text
components/ar/ARLauncherButton.js
```

### 2. Instruction modal

Create:

```text
components/ar/ARInstructionsModal.js
```

### 3. Unsupported notice

Create:

```text
components/ar/ARUnsupportedNotice.js
```

### 4. Configure supported launch paths

Evaluate and configure:

- WebXR where appropriate;
- Android Scene Viewer;
- iOS Quick Look if USDZ support is included.

### 5. Fixed physical scale

Use actual metric dimensions.

Do not use arbitrary visual scaling.

### 6. Camera permission timing

Only initiate AR/camera-related permission after intentional user action.

### 7. Physical validation

Test Small/Medium/Large using a measuring tape or known physical reference.

## Testing

Desktop:
- 3D fallback behavior;
- no broken AR CTA.

Android supported device:
- AR launch;
- surface detection;
- placement;
- scale.

iOS:
- test if included and asset available.

## Acceptance Criteria

- [ ] View in AR exists;
- [ ] instruction modal exists;
- [ ] supported AR path launches;
- [ ] unsupported state works;
- [ ] camera is not requested on page load;
- [ ] physical size is connected to selected size;
- [ ] at least one supported real device has been tested;
- [ ] scale validation recorded;
- [ ] build passes.

If device testing is unavailable:

```text
REAL_DEVICE_TEST_REQUIRED
```

must be reported and final AR acceptance remains incomplete.

---

# Phase 7 — Checkout and Order Confirmation

## Goal

Complete the demo ecommerce transaction flow.

## Existing Code to Reuse

- current checkout visual structure;
- current cart styles;
- existing form styling.

## Work

### 1. Clean demo checkout

Use fields:

- name;
- email;
- phone;
- address;
- optional city;
- optional note.

### 2. Remove misleading real-payment behavior

Prefer:

- Cash on Delivery;
- Demo Payment.

### 3. Validation

Prevent invalid submission.

### 4. Temporary order

Generate:

- order ID;
- customer summary;
- configured items;
- totals;
- timestamp.

### 5. Confirmation route

Create:

```text
/order-confirmation
```

### 6. Clear cart

Clear after successful order creation/confirmation.

## Testing

- empty cart checkout behavior;
- invalid form;
- valid form;
- correct item sizes;
- correct totals;
- confirmation page;
- cart clears only after success.

## Acceptance Criteria

- [ ] checkout uses real cart state;
- [ ] validation works;
- [ ] no real card collection is required;
- [ ] order summary is generated;
- [ ] confirmation route works;
- [ ] sizes/quantities/totals are correct;
- [ ] cart clears after success;
- [ ] mobile checkout works;
- [ ] build passes.

---

# Phase 8 — HCI Polish, Accessibility, Performance and Final QA

## Goal

Prepare the project for academic submission and live demonstration.

## Work

### A. HCI Review

Verify:

- visibility of system status;
- feedback;
- consistency;
- error prevention;
- recognition over recall;
- user control;
- real-world mapping.

### B. Accessibility

Check:

- labels;
- focus;
- keyboard use;
- alt text;
- semantic buttons;
- size-control state;
- touch targets;
- contrast.

### C. Mobile QA

Check:

- 360 px;
- 375 px;
- 390 px;
- 412 px;
- 430 px.

### D. Performance

- reduce unnecessarily heavy images;
- avoid loading 3D model outside product pages;
- reduce obvious console errors;
- prevent duplicate script initialization;
- verify stable route transitions.

### E. Content Cleanup

Remove or hide irrelevant template demo content from primary navigation.

Do not destroy files needed for fallback unless safe.

### F. Final Demo Path

Verify:

```text
Home
→ Menu
→ Product
→ Size
→ 3D
→ AR
→ Cart
→ Checkout
→ Confirmation
```

### G. HCI User Test Readiness

Prepare a short evaluator task set and feedback questions.

## Acceptance Criteria

- [ ] core flow works end-to-end;
- [ ] responsive QA completed;
- [ ] accessibility basics completed;
- [ ] no obvious dead controls in primary flow;
- [ ] no major console error in core flow;
- [ ] 3D loading/error states work;
- [ ] AR fallback works;
- [ ] real-device AR validation status is documented;
- [ ] irrelevant demo content is removed from primary navigation;
- [ ] final build passes;
- [ ] README reflects final project;
- [ ] known limitations are documented.

---

# Suggested Agent Commands

The human can start each phase with a short instruction because all context is already stored in the repository.

Examples:

```text
Read AGENTS.md and all files in /docs.
Implement Phase 1 from docs/06_DEVELOPMENT_PHASES.md.
Work autonomously inside the scope of Phase 1.
Keep iterating through inspect → implement → test → fix until all Phase 1 acceptance criteria pass or a genuine external blocker is reached.
Do not start any future phase.
```

Then:

```text
Implement Phase 2 according to docs/06_DEVELOPMENT_PHASES.md.
Follow AGENTS.md.
Continue autonomously until acceptance criteria pass or an external blocker is reached.
Do not start Phase 3.
```

Repeat through Phase 8.
