# Tour Planning Web App – Backlog

## Phase 1: Project Setup & UI Structure (with Mock hardcoded inline Data)

### Setup

- [x] Init project using Vite + Vue 3 + TypeScript
- [x] Install and configure:
  - shadcn-vue
  - Vue Router
  - Pinia
  - VeeValidate
  - Testing: Vitest, Cypress/Playwright
  - Linting: ESLint + Prettier + eslint-plugin-vue
- [x] Add `.eslintrc` and `.prettierrc` config files
- [x] Add npm scripts: `dev`, `lint`, `lint:fix`, `format`

### Global Structure

- [x] Setup base folder structure (`components`, `pages`, `stores`, `types` etc.)
- [x] Configure router with `/drivers` and `/tours`
- [x] Create layout shell in `App.vue` with sidebar/nav

### Homepage UI

- [x] Create main layout with two sections:
  - Sidebar (left): Contains navigation links or tabs for "Drivers" and "Tours"
  - Main content (right): Displays the selected view (Driver list or Tour list)
- [x] Implement router logic and basic state/tabs to switch between Driver and Tour views inside the homepage layout

### Driver UI

- [x] Create `DriversView.vue`
- [ ] Create `DriverList.vue` with mocked driver cards
- [ ] Create `AddDriverModal.vue` using shadcn <Dialog />
- [ ] Create form fields using BaseInput, BaseSelect
- [ ] Validate name (min 2 chars) and location (regex: no numbers) using VeeValidate

### Tour UI

- [x] Create `ToursView.vue`
- [ ] Create `TourList.vue` showing mock tour cards
- [ ] Create `TourFormModal.vue` with form for create/edit
- [ ] Add driver AutoComplete component filtered by mocked locationFrom
- [ ] Validate that selected driver matches locationFrom

---

## Phase 2: Stores & Logic Integration

### Pinia Stores

- [ ] Create `useDriverStore` with mock data, addDriver()
- [ ] Create `useTourStore` with mock data, add/update/deleteTour()

### Business Logic

- [ ] In Tour form: dynamically filter available drivers
- [ ] In Driver form: validate location with regex (no numbers)
- [ ] Add simple filters to Driver and Tour lists
- [ ] Wire up all create/edit/delete actions

---

## Phase 3: Validation & Testing

### Validation (VeeValidate Only)

- [ ] Use inline rules or `defineRule` for fields
- [ ] Show inline validation errors
- [ ] Prevent form submission on invalid data

### Unit Tests (Vitest)

- [ ] Test `useDriverStore` actions
- [ ] Test `useTourStore` actions
- [ ] Test validation logic
- [ ] Test reusable components render with props

### E2E Tests (Playwright/Cypress)

- [ ] Add driver flow (open modal → submit → shows in list)
- [ ] Add tour flow with matching driver
- [ ] Invalid input validation (shows error, blocks submit)
- [ ] Filter flow: typing filters list

---

## Phase 4: Polishing & Bonus

- [ ] Add toast messages after create/edit/delete actions
- [ ] Handle empty state UI for both lists
- [ ] Improve mobile responsiveness with sheets/drawers
- [ ] Refactor large components over 300 LOC into subcomponents
- [ ] Add README.md with project setup instructions
