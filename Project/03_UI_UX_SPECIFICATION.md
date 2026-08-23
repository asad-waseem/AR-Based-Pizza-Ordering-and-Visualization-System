# 03 — UI / UX Specification

## 1. Design Direction

The existing FoodKing Envato design is the visual foundation.

The goal is not to redesign the project into a new visual language.

The goal is to convert it into a focused pizza ecommerce experience while preserving the strongest existing interface patterns.

---

## 2. Existing Design Elements to Preserve

Preserve unless there is a specific usability problem:

- sticky header;
- responsive desktop navigation;
- mobile offcanvas navigation;
- existing footer;
- hero slider style;
- food category card style;
- pizza/food imagery;
- product card hover behavior;
- two-column product-detail layout;
- cart layout;
- typography hierarchy;
- red/green/orange/charcoal/off-white food palette;
- Swiper interactions;
- existing button styling;
- existing responsive Bootstrap grid.

---

## 3. Product Identity

The final website should read as a pizza ordering product, not a generic restaurant demo.

Replace or reduce unrelated content such as:

- burger-focused copy;
- steak-specific sections;
- chef-team emphasis;
- table-reservation emphasis;
- duplicate generic fast-food demo sections.

Use pizza-focused language consistently.

---

## 4. Primary Navigation

Recommended final desktop navigation:

```text
Home
Menu
How AR Works
About
FAQ
Contact
Cart
```

Optional items may be omitted if the existing header becomes crowded.

Mobile navigation must provide the same core routes.

---

## 5. Homepage UX

The homepage should communicate three things quickly:

1. this is a pizza ordering website;
2. users can browse/order pizza;
3. users can visualize pizza size in AR.

Recommended homepage hierarchy:

### Hero

Primary headline should explain the value.

Example direction:

**Choose Your Pizza. See the Real Size Before You Order.**

Supporting text should explain AR briefly without technical jargon.

Primary CTA:

**Order Pizza**

Secondary CTA:

**How AR Works**

Do not use a vague button such as "Explore" as the only primary action.

### Featured Pizzas

Use existing product card design.

Each card should show:

- image;
- pizza name;
- starting price;
- short category/tag;
- clear view/details action.

### AR Explanation Section

Three simple steps:

1. Choose a pizza and size.
2. Tap View in AR.
3. Place it on your table.

This section should explain the innovation before users reach the product page.

### Optional Social Proof

Existing testimonials can be reused if they fit naturally.

### Footer

Preserve the template footer but remove irrelevant links.

---

## 6. Pizza Catalog UX

The catalog should prioritize scanning and comparison.

Each pizza card should display:

- pizza image;
- name;
- short ingredient summary;
- starting price;
- dietary/tag badge if relevant;
- clear product-details action.

Avoid excessive text.

### Filtering

If implemented, filters must give immediate visible feedback.

Potential filter groups:

- Classic;
- Spicy;
- Chicken;
- Vegetarian;
- Price.

The filter state must actually affect displayed products.

Do not keep non-functional filter controls.

---

## 7. Product Detail Page Layout

Desktop:

```text
-------------------------------------------------
|  Product Visual / 3D Viewer | Pizza Details   |
|                             | Name            |
|                             | Rating          |
|                             | Ingredients     |
|                             | Size Selector   |
|                             | Price           |
|                             | Quantity        |
|                             | View in AR      |
|                             | Add to Cart     |
-------------------------------------------------
```

Mobile:

```text
Product Visual / 3D Viewer
Pizza Name
Short Description
Size Selector
Selected Diameter
Price
View in AR
Add to Cart
Additional Information
```

The AR action must not be hidden far below the fold.

---

## 8. Size Selector UX

The selector must be highly visible because it drives the main HCI experiment.

Example:

```text
Choose Size

[ Small ]
10 in / 25.4 cm
Rs / $ ...

[ Medium ]
12 in / 30.5 cm
Rs / $ ...

[ Large ]
14 in / 35.6 cm
Rs / $ ...
```

The exact currency can follow the final project content.

### Interaction Rules

When a size is selected:

- the active option must visibly change state;
- the price must update immediately;
- diameter text must update;
- 3D scale/AR configuration must receive the selected size;
- screen-reader accessible state must update.

Do not rely on color alone to indicate selection.

---

## 9. 3D Viewer UX

The 3D preview should communicate that it is interactive.

Provide:

- visible model;
- drag/rotate support;
- zoom where appropriate;
- short hint such as `Drag to rotate`;
- loading indicator;
- fallback image if model fails;
- no auto-animation that makes interaction difficult.

The 3D viewer is a preview, not a replacement for AR.

---

## 10. AR CTA UX

Primary label:

**View in AR**

Supporting microcopy:

**See this pizza at approximately real size on your table.**

Before opening AR, show a short guidance modal.

Do not expose technical terms such as "WebXR session" to normal users.

---

## 11. AR Instruction Modal

Recommended content:

### Title
See Your Pizza in Your Space

### Steps
1. Allow camera access if requested.
2. Point your phone at a well-lit table or flat surface.
3. Move your phone slowly until the surface is detected.
4. Place the pizza and move around it to compare the selected size.

Actions:

- `Continue to AR`
- `Cancel`

Optional note:

**AR availability depends on your device and browser.**

---

## 12. Unsupported AR UX

If AR is unavailable:

Do not show a dead button.

Show:

**AR is not available on this device/browser. You can still rotate the 3D pizza preview and view the selected physical dimensions.**

Possible secondary guidance:

- try Chrome on a supported Android device;
- try Safari/Quick Look on a supported iPhone if the implementation supports it.

Do not guarantee compatibility with every device.

---

## 13. Loading States

### Product data

Use existing layout with skeleton or simple loading state if dynamic loading is introduced.

### 3D model

Show:

- loading spinner or branded loader;
- text: `Loading 3D preview...`

### AR launch

Prevent repeated taps while launching.

If launch fails, show a clear retry/fallback message.

---

## 14. Error States

Required understandable errors:

- product not found;
- 3D model unavailable;
- AR unsupported;
- AR launch failed;
- empty cart;
- checkout validation failure;
- corrupted local cart recovery.

Error messages should explain what the user can do next.

---

## 15. Cart UX

A cart item must display:

- pizza image;
- pizza name;
- selected size;
- diameter;
- unit price;
- quantity;
- line total;
- remove action.

Changing quantity must update totals immediately.

If the same pizza is added in two different sizes, they must appear as separate configured lines.

---

## 16. Mini-Cart UX

The header mini-cart should use real cart state after cart context is implemented.

Show:

- item count;
- recent/cart items;
- subtotal;
- view cart action;
- checkout action;
- empty state.

Remove original hardcoded cart products.

---

## 17. Checkout UX

This is a demo checkout.

Fields can include:

- full name;
- email;
- phone;
- delivery address;
- city;
- optional note.

Recommended payment choice:

- Cash on Delivery;
- Demo Payment.

Do not collect real card details unless there is a specific academic requirement.

### Validation

Show inline validation.

Do not submit a visibly incomplete order.

---

## 18. Order Confirmation UX

After demo checkout:

Display:

- success heading;
- generated order number;
- ordered pizzas;
- selected sizes;
- quantities;
- total;
- delivery information;
- return-to-home/menu action.

The confirmation should clearly indicate the demo order was accepted by the prototype.

---

## 19. Mobile UX Requirements

AR is primarily a mobile feature.

Therefore test at least:

- 360 px;
- 375 px;
- 390 px;
- 412 px;
- 430 px.

Requirements:

- no horizontal overflow;
- AR CTA large enough for touch;
- size selector tap targets are comfortable;
- cart controls remain usable;
- product information hierarchy remains clear;
- modal fits within viewport;
- 3D viewer does not block normal scrolling;
- header/mobile menu does not overlap AR controls.

---

## 20. Accessibility Requirements

Minimum requirements:

- semantic buttons for actions;
- meaningful links;
- alt text for pizza images;
- labels for form inputs;
- visible keyboard focus;
- selectable size controls expose active state;
- sufficient text contrast;
- no critical meaning communicated by color alone;
- touch targets approximately 44x44 px where practical;
- modal focus behavior should be understandable;
- AR instructions must also exist as text.

---

## 21. HCI Feedback Requirements

Every important user action must provide feedback.

Examples:

### Size changed
Update:
- active control;
- diameter;
- price;
- 3D scale indicator if visible.

### Added to cart
Show:
- toast/notice;
- updated cart count.

### Quantity changed
Update:
- line total;
- subtotal;
- cart count if relevant.

### AR unsupported
Show:
- explicit explanation;
- alternative 3D preview.

### Checkout submitted
Show:
- loading state;
- confirmation.

---

## 22. Animation Policy

Keep existing template animation style but avoid motion that harms usability.

Allowed:

- existing subtle entry animations;
- product-card hover transitions;
- button feedback;
- smooth modal transitions;
- gentle 3D auto-rotation if it stops on user interaction.

Avoid:

- constant distracting motion;
- long intro loaders;
- animation that delays product interaction;
- excessive parallax on mobile.

---

## 23. Content Tone

Use clear ecommerce language.

Avoid technical AR terminology in customer-facing content.

Good:

- `View in AR`
- `See actual size`
- `Place on your table`
- `Selected size: 12 in`

Avoid:

- `Initialize WebXR Session`
- `Launch Scene Viewer Intent`
- `Load GLB Asset`

Technical terminology belongs in code and documentation only.

---

## 24. Usability Evaluation Tasks

The final system should support these HCI evaluation tasks:

### Task 1
Find a Pepperoni pizza.

### Task 2
Compare Medium and Large.

### Task 3
Identify the real diameter of the selected pizza.

### Task 4
Open the 3D preview and rotate the pizza.

### Task 5
Launch AR and place the pizza on a table.

### Task 6
Return and add the selected size to cart.

### Task 7
Change quantity.

### Task 8
Complete demo checkout.

Potential measurements:

- task completion;
- time on task;
- user errors;
- user confidence before/after AR;
- subjective usability feedback.

---

## 25. UX Definition of Done

The UI/UX work is acceptable when:

- the original professional template quality is preserved;
- all primary buttons work;
- the pizza ordering journey is coherent;
- size choice is obvious;
- the selected dimensions are visible;
- AR entry is discoverable;
- unsupported states are understandable;
- mobile interaction is comfortable;
- cart configuration is transparent;
- checkout is clearly a demo;
- no major accessibility issue blocks task completion.
