# AGENTS.md

## Purpose

This repository is being converted from the existing **FoodKing React/Next.js Restaurant Template** into the university HCI project:

**AR-Based Pizza Ordering and Visualization System**

This file defines the operating rules for any coding agent working in this repository. It is the highest-level project instruction file. All implementation work must follow this file and the specifications inside `/docs`.

---

## 1. Mandatory Reading Order

Before making any code change, the agent must read these files in this exact order:

1. `AGENTS.md`
2. `docs/01_PROJECT_OVERVIEW.md`
3. `docs/02_ARCHITECTURE.md`
4. `docs/03_UI_UX_SPECIFICATION.md`
5. `docs/04_FEATURE_REQUIREMENTS.md`
6. `docs/05_AR_3D_SPECIFICATION.md`
7. `docs/06_DEVELOPMENT_PHASES.md`

If the requested work conflicts with any document, stop and report the conflict before modifying code.

---

## 2. Autonomous Work Permission

The agent is pre-authorized to work autonomously inside this repository for the currently requested development phase.

Within the active phase, the agent may do the following without repeatedly asking for permission:

- inspect all repository files;
- create new source files;
- edit existing source files;
- move or rename source files when required by the approved architecture;
- remove obsolete code only when the current phase explicitly makes it redundant;
- refactor code related to the current phase;
- install a new npm dependency when it is technically required and consistent with the architecture;
- run `npm install`;
- run `npm run dev`;
- run `npm run build`;
- run lint or formatting commands already available in the project;
- run non-destructive diagnostic commands;
- inspect browser/runtime errors;
- fix implementation errors;
- repeat the edit-test-fix loop until the phase acceptance criteria pass;
- update project documentation if implementation details materially change;
- create a normal Git commit after the requested phase passes, when Git access is available.

The agent should not stop after the first error. It should diagnose the error, implement a fix, retest, and continue until either the requested phase passes or a genuine external blocker is reached.

---

## 3. Actions That Are NOT Pre-Authorized

The following actions require explicit human approval and must not be performed automatically:

- `git push --force`;
- deleting the repository;
- deleting `.git`;
- destructive `git reset --hard` against user work;
- rewriting Git history;
- production deployment;
- modifying production DNS;
- creating paid cloud resources;
- purchasing subscriptions or assets;
- changing billing settings;
- exposing API keys, passwords, tokens, or secrets;
- committing `.env` files or credentials;
- disabling security controls just to make a feature work;
- running `npm audit fix --force`;
- major framework upgrades unless a later approved phase explicitly requires them;
- replacing the entire Envato template with a newly generated UI;
- downloading or using commercial 3D assets without a valid license;
- claiming AR functionality is complete without real-device testing evidence.

---

## 4. Continuous Agent Loop

For every implementation request, follow this loop:

### Step A: Understand
- Read the project documentation.
- Inspect the files relevant to the requested phase.
- Identify the current implementation state.
- Identify dependencies from earlier phases.
- Confirm that earlier required phases are not obviously broken.

### Step B: Plan
Create a short internal implementation plan covering:
- files to modify;
- files to create;
- data/state changes;
- expected UI behavior;
- tests to run.

Do not redesign unrelated parts of the project.

### Step C: Implement
Implement only the active phase and any strictly necessary fixes required to make that phase work.

### Step D: Verify
Run relevant checks, including where applicable:
- application build;
- runtime page load;
- navigation;
- state behavior;
- responsive layout;
- console errors;
- AR/3D component loading;
- mobile compatibility;
- accessibility basics.

### Step E: Fix
If any test fails:
1. inspect the failure;
2. identify root cause;
3. fix it;
4. rerun the relevant checks.

Repeat until passing or blocked.

### Step F: Report
At the end of the phase, report:
- completed work;
- changed files;
- created files;
- removed files;
- dependencies added or changed;
- tests run;
- test results;
- known limitations;
- external blockers;
- whether all phase acceptance criteria passed.

---

## 5. Phase Isolation Rule

Only implement the phase explicitly requested by the user.

Example:

If the user says:

`Implement Phase 3 according to docs/06_DEVELOPMENT_PHASES.md`

then:
- implement Phase 3;
- fix Phase 1/2 regressions only if necessary;
- do not begin Phase 4, 5, 6, 7, or 8;
- do not add AR merely because AR appears in the overall project specification.

Future-phase interfaces may be prepared only when the current phase explicitly requires a stable contract for later work.

---

## 6. Preserve the Existing Envato Design

The FoodKing template is intentionally being used because it already provides a mature restaurant/pizza visual system.

Therefore:

- preserve the existing responsive design language;
- preserve the strongest existing header, footer, hero, cards, product layout, cart styling, typography, animation system, and color palette unless a specification says otherwise;
- customize the template into a pizza-focused product;
- do not replace the application with a generic AI-generated dashboard or generic Tailwind template;
- do not introduce a second design system unnecessarily;
- prefer existing Bootstrap/SCSS classes when they meet requirements;
- avoid rewriting large working components simply for stylistic preference.

---

## 7. Existing Technology Baseline

The audited baseline is:

- Next.js `14.2.8`
- React `18.x`
- App Router
- JavaScript/JSX
- Bootstrap 5 CSS + existing SCSS architecture
- Swiper 11
- WOW.js + Animate.css
- `react-bootstrap` currently present
- `react-nice-select`
- `rc-slider`
- no backend
- no database
- no authentication
- no global state management
- no existing 3D/AR package

Do not silently convert the whole project to TypeScript.

Do not silently migrate the framework.

---

## 8. Dependency Policy

A new dependency may be added only when:

1. the feature cannot reasonably be implemented with the current stack;
2. the dependency is actively maintained or technically appropriate;
3. it does not require replacing the existing UI architecture;
4. the dependency is documented in the phase report.

For AR/3D, follow `docs/05_AR_3D_SPECIFICATION.md`.

Do not run `npm audit fix --force`.

If npm reports vulnerabilities, record them and address them deliberately without forcing breaking upgrades.

---

## 9. Data Integrity Rule

The current Envato template contains hardcoded product markup.

The final project must use a central pizza catalog rather than duplicating product data across multiple pages.

Once the central data model is introduced:

- product cards must read from it;
- product detail pages must read from it;
- pricing must read from it;
- size options must read from it;
- 3D/AR metadata must read from it;
- cart line items must reference it;
- duplicate hardcoded product copies must not become the new source of truth.

---

## 10. HCI Rule

This is not merely an ecommerce visual redesign.

The HCI value of the project is:

**reducing uncertainty about pizza size by allowing the user to visualize the selected pizza at approximately real-world physical scale in their environment before ordering.**

Every major interaction must prioritize:

- visibility of system status;
- clear feedback;
- consistency;
- error prevention;
- recognition over recall;
- user control;
- accessibility;
- mobile usability;
- understandable AR instructions.

---

## 11. 3D/AR Honesty Rule

Never report that AR is complete merely because a `View in AR` button exists.

A complete AR feature requires:

- a valid 3D asset;
- correct asset dimensions;
- supported mobile launch behavior;
- surface placement behavior on a supported device;
- physical-size validation;
- fallback behavior for unsupported devices;
- real-device testing.

If the required final 3D asset is missing, use the status:

`ASSET_REQUIRED`

If a supported test device is unavailable, use:

`REAL_DEVICE_TEST_REQUIRED`

Do not fabricate test results.

---

## 12. External Blocker Protocol

Only stop autonomous work for a genuine external blocker such as:

- required 3D asset not present;
- account authorization required;
- platform permission prompt requiring human input;
- commercial asset license required;
- external API credential required;
- physical Android/iOS test device required;
- user decision would materially change the product architecture.

When blocked, report:

1. blocker;
2. why it blocks the phase;
3. exact item required from the user;
4. work already completed;
5. what will continue immediately after the blocker is resolved.

---

## 13. Definition of Done

A phase is not done merely because code was generated.

A phase is done only when:

- the required feature is implemented;
- existing required flows still work;
- the project builds successfully, unless an external blocker prevents it;
- no obvious runtime error remains in the changed flow;
- responsive behavior is checked;
- phase acceptance criteria pass;
- implementation is documented in the final phase report.

---

## 14. Agent Response Format After Each Phase

Use this structure:

### Phase Completed
Name and number of the phase.

### Implemented
Concise list of completed behavior.

### Files Changed
List files modified.

### Files Created
List files created.

### Dependencies
Added, removed, or changed packages.

### Verification
Commands and functional checks performed.

### Acceptance Criteria
PASS/FAIL for every criterion in the active phase.

### Known Limitations
Only real limitations.

### External Blockers
`None` or explicit blocker.

### Next Phase
State the next phase name, but do not implement it until requested.
