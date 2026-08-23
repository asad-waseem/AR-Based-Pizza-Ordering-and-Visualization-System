# 01 — Project Overview

## 1. Project Title

**AR-Based Pizza Ordering and Visualization System**

---

## 2. Project Type

Human Computer Interaction university project.

The project uses a professional existing Envato restaurant ecommerce interface as the visual foundation and extends it with a focused HCI feature: interactive 3D and augmented-reality pizza-size visualization.

---

## 3. Background

Traditional online pizza ordering interfaces usually present pizza size as text or numbers:

- Small
- Medium
- Large
- 10 inch
- 12 inch
- 14 inch

A numeric diameter is not always easy for users to mentally translate into the actual amount of food or physical footprint on a table.

This can cause:

- uncertainty;
- wrong size selection;
- over-ordering;
- under-ordering;
- hesitation before checkout;
- dissatisfaction after delivery.

The project explores whether a visual, spatial representation can reduce this uncertainty.

---

## 4. Problem Statement

Users ordering pizza online may struggle to understand the physical difference between available pizza sizes from labels and numbers alone.

The system should provide a clear ecommerce flow in which users can:

1. browse pizzas;
2. choose a pizza;
3. select a size;
4. inspect a 3D representation;
5. launch AR on a supported phone;
6. place the pizza on a real horizontal surface;
7. perceive its approximate real-world diameter before ordering.

---

## 5. Main HCI Objective

The primary objective is not simply to create a pizza ecommerce website.

The primary objective is to improve the user's understanding of product size through direct visual and spatial interaction.

The system should reduce the cognitive effort required to interpret pizza dimensions.

---

## 6. Secondary Objectives

The project should also demonstrate:

- responsive ecommerce interaction;
- clear navigation;
- immediate feedback;
- direct manipulation;
- visual consistency;
- error prevention;
- mobile-first AR guidance;
- accessibility basics;
- graceful fallback when AR is unsupported;
- a complete demo transaction flow.

---

## 7. Target Users

Primary users:

- university-age and adult smartphone users;
- users already familiar with online food ordering;
- users who may not easily visualize inch/cm measurements;
- users deciding between pizza sizes.

Secondary evaluation users:

- HCI instructor;
- university project reviewers;
- classmates participating in usability testing.

---

## 8. User Need

The key user need is:

> “Before I order, I want to understand how large this pizza will actually look in my space.”

---

## 9. Core User Story

As a customer ordering pizza online, I want to select a pizza size and visualize that pizza on my real table using my phone so that I can make a more confident size decision before adding it to my cart.

---

## 10. Primary User Journey

```text
Landing Page
    ↓
Browse Pizza Menu
    ↓
Open Pizza Product
    ↓
Review Name / Price / Ingredients
    ↓
Select Size
    ↓
See Size and Price Feedback
    ↓
Interact with 3D Preview
    ↓
Tap "View in AR"
    ↓
Read Short AR Instructions
    ↓
Launch Supported AR Experience
    ↓
Scan / Detect Horizontal Surface
    ↓
Place Pizza
    ↓
Compare Physical Appearance
    ↓
Return to Product Page
    ↓
Add Selected Pizza to Cart
    ↓
Review Cart
    ↓
Demo Checkout
    ↓
Order Confirmation
```

---

## 11. Core Features

The final project must include:

1. pizza-focused homepage;
2. dynamic pizza catalog;
3. pizza detail page;
4. Small / Medium / Large size selection;
5. price change according to selected size;
6. interactive 3D pizza preview;
7. `View in AR` action;
8. real-world pizza placement on supported mobile devices;
9. approximately true physical scale;
10. cart;
11. demo checkout;
12. order confirmation;
13. responsive mobile UI;
14. AR instructions and fallback states;
15. accessibility basics;
16. usability-oriented feedback and error handling.

---

## 12. Expected Pizza Size Mapping

Initial academic prototype mapping:

| Size | Diameter | Metric |
|---|---:|---:|
| Small | 10 in | 0.254 m |
| Medium | 12 in | 0.3048 m |
| Large | 14 in | 0.3556 m |

These values must be treated as product metadata rather than UI-only labels.

The final 3D asset must be calibrated so that the selected size corresponds to the intended physical diameter.

---

## 13. Existing Template Context

The imported Envato template is FoodKing, an existing restaurant/fast-food Next.js template.

The audit identified:

- Next.js 14.2.8;
- React 18;
- App Router;
- JavaScript/JSX;
- Bootstrap + SCSS;
- Swiper;
- food-specific components and pizza imagery;
- multiple shop layouts;
- a product-detail page;
- a locally interactive cart page;
- a static checkout page.

The template is visually suitable for the pizza domain and should be extended rather than replaced.

---

## 14. Pages to Keep as Primary Product Pages

Primary final routes should converge toward:

- `/` — pizza-focused landing page;
- `/menu` or `/shop` — pizza catalog;
- `/pizza/[id]` — dynamic pizza product page;
- `/cart` or existing cart route — dynamic cart;
- `/checkout` — demo checkout;
- `/order-confirmation` — demo confirmation;
- `/faq` — optional FAQ / AR help;
- custom 404 page.

Existing route names may remain during migration, but the final route structure should be coherent.

---

## 15. Existing Pages That Are Not Core to the HCI Scope

The following original Envato pages are not required for the final academic flow:

- alternate homepage demos;
- redundant shop layouts;
- reservation;
- chef/team pages;
- blog/news;
- redundant testimonial page;
- gallery;
- duplicate food menu pages.

They should not be deleted during early phases unless the phase plan explicitly says to remove or exclude them.

---

## 16. Project Scope

### In Scope

- frontend pizza ecommerce experience;
- structured local product data;
- React state/context;
- localStorage demo persistence;
- 3D viewer;
- web/mobile AR launch;
- real-size visualization;
- demo cart and checkout;
- responsive design;
- accessibility;
- usability testing readiness.

### Out of Scope

- production payment gateway;
- real restaurant order dispatch;
- real delivery tracking;
- production authentication;
- production database;
- production inventory;
- live restaurant API;
- admin dashboard;
- real CRM;
- native Android/iOS app;
- complex multiplayer or social functionality.

---

## 17. HCI Principles to Demonstrate

### Visibility of System Status

Examples:

- selected pizza size is visibly active;
- selected price updates immediately;
- cart count updates;
- 3D model loading status is visible;
- AR availability is communicated;
- unsupported-device state is explained.

### Match Between System and Real World

- physical pizza sizes use real dimensions;
- terms such as Small, Medium, Large are supported by inches/cm;
- AR object is presented on a real surface.

### User Control and Freedom

- user can change size;
- user can leave AR and return to product;
- cart quantity can be changed;
- cart item can be removed.

### Consistency

- buttons, typography, colors, product cards, and interactions should follow the existing FoodKing design system.

### Error Prevention

- do not allow accidental quantity below 1;
- do not show AR as available when device support is absent;
- validate demo checkout inputs;
- explain camera/surface requirements before launch.

### Recognition Rather Than Recall

- show size dimensions directly;
- show price directly beside selected option;
- show pizza preview;
- keep cart item configuration visible.

### Accessibility

- semantic controls;
- keyboard support where applicable;
- clear focus states;
- adequate target sizes;
- readable text;
- alt text;
- AR fallback description.

---

## 18. Academic Demonstration Goal

During project demonstration, the evaluator should be able to:

1. open the website;
2. browse pizza products;
3. select a pizza;
4. switch between sizes;
5. see price/size feedback;
6. rotate a 3D pizza;
7. launch AR on a supported phone;
8. place the pizza on a table;
9. compare Small/Medium/Large physical appearance;
10. add a configured pizza to cart;
11. complete a demo checkout.

---

## 19. Success Criteria

The project is considered successful when:

- the ecommerce interface feels complete enough for a convincing user test;
- the main flow is understandable without developer explanation;
- the size selector produces immediate visual feedback;
- the 3D viewer works smoothly;
- AR can launch on at least one supported real mobile device;
- the pizza appears at approximately the correct selected physical diameter;
- unsupported devices receive a clear fallback;
- the cart retains the selected pizza size and price;
- the demo checkout works;
- no major responsive or accessibility issue prevents use.

---

## 20. Non-Goals

The system should not become a general restaurant management platform.

Do not expand the project into:

- delivery logistics;
- AI recommendations;
- chatbot ordering;
- loyalty system;
- multi-vendor marketplace;
- real payment processing;
- production authentication.

These may be future work but are outside the current HCI scope.

---

## 21. Final Product Position

The final experience should look like a polished pizza ecommerce product, but its defining feature is:

**AR-assisted real-size pizza visualization for better ordering decisions.**
