# AR-Based Pizza Ordering and Visualization System

A Human Computer Interaction university project built on an existing FoodKing Next.js restaurant ecommerce template.

The system allows users to browse pizzas, open a pizza product page, select a size, inspect a 3D representation, and launch an augmented-reality experience on a supported mobile device to visualize the pizza in their physical environment at approximately real-world scale before ordering.

## Core HCI Problem

Pizza sizes such as 10 inch, 12 inch, or 14 inch are numerical measurements that many users cannot easily visualize. This can create uncertainty during ordering.

The project addresses this problem through an AR-assisted product visualization flow.

## Target User Flow

```text
Home
  ↓
Browse Pizzas
  ↓
Pizza Details
  ↓
Select Small / Medium / Large
  ↓
Interactive 3D Preview
  ↓
View in AR
  ↓
Place Pizza on a Real Surface
  ↓
Return to Product
  ↓
Add to Cart
  ↓
Demo Checkout
  ↓
Order Confirmation
```

## Current Technical Baseline

- Next.js 14.2.8
- React 18
- Next.js App Router
- JavaScript / JSX
- Bootstrap-based responsive layout
- Existing SCSS design system
- Swiper
- WOW.js / Animate.css
- Static hardcoded product content in the original Envato template
- No backend
- No database
- No authentication
- No existing AR or 3D package

## Planned Core Modules

- centralized pizza data catalog;
- dynamic pizza catalog;
- dynamic pizza detail route;
- size and price selection;
- shared cart state;
- persistent demo cart using localStorage;
- interactive 3D pizza preview;
- mobile AR launch;
- physical-size visualization;
- demo checkout;
- order confirmation;
- accessibility and HCI usability improvements.

## Documentation

The complete implementation specification is stored inside `/docs`.

Read in this order:

1. `docs/01_PROJECT_OVERVIEW.md`
2. `docs/02_ARCHITECTURE.md`
3. `docs/03_UI_UX_SPECIFICATION.md`
4. `docs/04_FEATURE_REQUIREMENTS.md`
5. `docs/05_AR_3D_SPECIFICATION.md`
6. `docs/06_DEVELOPMENT_PHASES.md`

Coding agents must also follow `AGENTS.md`.

## Important Scope

This is an HCI academic prototype. It is not intended to process real payments or operate as a production food-delivery backend.

The ecommerce flow should be convincing and functional for demonstration purposes, while the main innovation and evaluation focus remains the pizza-size visualization and AR interaction.
