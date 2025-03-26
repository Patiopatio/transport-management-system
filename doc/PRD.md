# Tour Planning Web Application – Product Requirements Document

## 1. Overview

This application allows logistics managers to plan and manage tours by assigning drivers to shipments based on their location.

## 2. Goals

- Enable creating and viewing tours
- Allow managing drivers
- Prevent assigning drivers to tours from mismatched locations
- Provide responsive, accessible UI using shadcn-vue
- Prioritise maintainable and testable code (unit + e2e tests)

---

## 3. Features

### A. Driver Management

- List all drivers
- Add a new driver
- A driver has:
  - `name` (string, min 2 characters)
  - `location` (string, must not contain numbers)
- No edit/delete functionality required

### B. Tour Management

- List all tours
- Create, update, delete a tour
- A tour has:
  - `customerName` (string)
  - `shipmentDate` (date)
  - `locationFrom` (string)
  - `locationTo` (string)
  - `assignedDriverId` (nullable, foreign key to driver)
- Validation:
  - Assigned driver must have matching `location` with Tour's `locationFrom`

---

## 4. Technical Requirements

- **Frontend:** Vue 3, TypeScript, Composition API
- **UI Library:** [shadcn-vue](https://www.shadcn-vue.com/)
- **Routing:** Vue Router (with `/drivers`, `/tours`)
- **State:** Pinia for managing mock in-memory data
- **Styling:** shadcn-vue's built-in design system
- **Validation:** VeeValidate
- **Linting & Formatting:**
  - ESLint with Vue 3 and TypeScript support
  - Prettier for consistent formatting
  - Standard rules: max line length, trailing commas, single quotes, etc.
- **Testing:**
  - Unit: Vitest + Vue Testing Library
  - E2E: Playwright or Cypress

---

## 5. UX Guidelines

- Use modal or drawer components for forms
- Provide instant inline validation feedback
- Lists should include basic filtering (by name, location)
- Show toasts or messages after key actions
- All inputs must be accessible and keyboard-navigable
- Mobile first responsive design

---

## 6. Data Mocking

- Backend is not required — mock data is stored in Pinia
- Initial data can be prefilled in stores or loaded from JSON

---

## 7. Architectural Practices

- Follow DRY and component reusability principles
- Use composables for logic and validation
- If a file exceeds 300 LOC, split it logically
- Use PascalCase for components and camelCase for functions/variables
- Ensure all props/emits/interfaces are strictly typed
