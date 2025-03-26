# 🚚 Transport Management System

A simple Vue 3 + TypeScript + shadcn-vue application for managing transport tours and drivers. The application allows logistics managers to plan and manage transportation by assigning drivers to shipments based on their location.

## ✨ Features

- Driver list with create/edit/delete functionality
- Tour list with create/edit/delete functionality
- Location-based driver assignment logic
- Filtering and responsive UI
- State managed with Pinia (mocked data)

## 🛠️ Tech Stack

- Vue 3 + TypeScript
- shadcn-vue UI components
- VeeValidate (no Yup)
- Pinia (state management)
- Vue Router
- Vitest + Playwright (or Cypress)

Completed:

- ✅ Project setup and configuration
- ✅ Basic UI structure and navigation
- ✅ Driver and Tour management interfaces
- ✅ State management with Pinia
- ✅ CRUD operations for tours
- ✅ Driver-Tour location matching logic
- ✅ Filtering functionality

Pending Tasks:

- [ ] Form validation with VeeValidate
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright/Cypress
- [ ] Toast messages for actions
- [ ] Empty state UI

## Development

```bash

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```
