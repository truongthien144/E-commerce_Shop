# Pawlio Petshop E-commerce Plan

## Overview
Build a complete ecommerce website for "Pawlio Petshop", specializing in personalized pet accessories and memorial products. The UI should have a warm, friendly, and emotional aesthetic (warm yellow, beige, soft orange, warm brown) suitable for pet lovers buying keepsakes. 

## Project Type
**WEB** (Next.js, React, Tailwind CSS)

## Success Criteria
1. Fully functional Next.js 14 App Router application.
2. Users can view products (Accessories & Memorials).
3. Users can personalize products (text and optional photo upload depending on category).
4. Users can add items to cart and edit quantities.
5. Users can check out securely using Stripe Checkout.
6. Order information and personalization details are securely saved in a local SQLite database using Prisma.
7. Clean UI utilizing Shadcn UI components.
8. Passes all verification checks (Performance, Security, Lint, UX).

## Tech Stack
- Frontend: Next.js 14 (App Router), React, TailwindCSS, Shadcn UI
- Backend: Next.js API Routes
- Database: SQLite
- ORM: Prisma
- Payment: Stripe Checkout
- State Management: React Context or Zustand
- Image Upload: Base64 string storage or local filesystem (simple approach)

## File Structure
```text
/
├── app/
│   ├── layout.tsx         # Global layout with navigation and footer
│   ├── page.tsx           # Home page
│   ├── products/          # Product listing
│   ├── products/[slug]/   # Product detail with personalization
│   ├── cart/              # Shopping cart view
│   ├── checkout/          # Checkout page + Stripe flow
│   ├── about/             # About page
│   ├── policies/          # Policy page
│   └── api/               # API routes (products, checkout, orders)
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── shared/            # Reusable UI (Navbar, Footer, ProductCard)
│   ├── cart/              # Cart components
│   └── checkout/          # Checkout/Stripe components
├── lib/                   # Utility modules
├── prisma/
│   └── schema.prisma      # SQLite Database schema
├── public/                # Static assets (images, icons)
├── package.json
└── tailwind.config.ts
```

## Task Breakdown

### Task 1: Initialize Project Foundation
- **Agent**: `orchestrator`
- **Skill**: app-builder
- **Dependencies**: None
- **INPUT**: `npx create-next-app@latest`, Tailwind, ESLint
- **OUTPUT**: Next.js project initialized with Shadcn UI configured
- **VERIFY**: `npm run dev` starts correctly and shows the home page.

### Task 2: Database Schema & Core Entities
- **Agent**: `database-architect`
- **Skill**: database-design
- **Dependencies**: Task 1
- **INPUT**: Prisma schema definition (Category, Product, ProductVariant, Cart, CartItem, Personalization, Order, OrderItem, Payment)
- **OUTPUT**: `schema.prisma` file, applied migrations, and a seed script with example products
- **VERIFY**: `npx prisma studio` opens properly and database tables reflect the correct relations.

### Task 3: API & Backend Infrastructure
- **Agent**: `backend-specialist`
- **Skill**: api-patterns
- **Dependencies**: Task 2
- **INPUT**: Implement RESTful endpoints (GET /api/products, POST /api/cart, POST /api/checkout)
- **OUTPUT**: Working API layer handling product loading, order submission and payment webhooks.
- **VERIFY**: API endpoints return 200 OK via cURL or Postman when queried.

### Task 4: UI Design System & Theming
- **Agent**: `frontend-specialist`
- **Skill**: frontend-design
- **Dependencies**: Task 1
- **INPUT**: Global CSS adjustments, primary color palette (yellow, beige, brown), typography.
- **OUTPUT**: `globals.css` updated, components/ui styled cleanly
- **VERIFY**: Pages reflect the "warm and emotional" aesthetic constraints cleanly.

### Task 5: Core Pages & Product Flow
- **Agent**: `frontend-specialist`
- **Skill**: frontend-design
- **Dependencies**: Task 3, Task 4
- **INPUT**: Home, Product List, Product Detail, About, Policies components. Form inputs for Personalization.
- **OUTPUT**: Functioning UI connecting to the local API routes for loading products.
- **VERIFY**: Users can view the product list and detail pages with correctly rendered personalization fields based on product category.

### Task 6: Payment Integration & Order Processing
- **Agent**: `backend-specialist` & `security-auditor`
- **Skill**: api-patterns
- **Dependencies**: Task 5
- **INPUT**: Stripe integration, saving Cart/Order to the database securely.
- **OUTPUT**: Stripe Checkout redirects, success page, and Order validation logic.
- **VERIFY**: Stripe test payments succeed and corresponding Orders are visible in the database.

## Phase X: Verification
- [ ] Lint: `npm run lint` && `npx tsc --noEmit`
- [ ] Security: `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .`
- [ ] UX Audit: `python .agent/skills/frontend-design/scripts/ux_audit.py .`
- [ ] Rules: No purple/violet hex codes, Socratic check.
- [ ] Build: `npm run build` succeeds
