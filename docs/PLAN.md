# Pawlio Petshop - Strategic Upgrade Plan

This document outlines the architecture and implementation strategy for the Pawlio Petshop feature expansion.

## 1. Authentication System (Custom)
We will implement a custom authentication system using **bcrypt** for hashing and **cookies** for session management. This provides full visibility into the security logic for thesis evaluation.

- **User Model**: Name, Email (unique), Password (hashed), CreatedAt, UpdatedAt.
- **Middleware**: Integrated Next.js middleware to protect `/orders`, `/checkout`, and sensitive API routes.
- **Persistence**: Prisma ORM with SQLite.

## 2. Product Search Feature
- **Input**: A responsive search bar in the global Navbar.
- **Engine**: Prisma `contains` query with `insensitive` mode.
- **Results**: A dedicated `/search` page displaying matching products, result counts, and clear "No products found" messaging.

## 3. Improved Cart System
- **Guest Usage**: LocalStorage stores the cart for unauthenticated users.
- **Account Usage**: Authenticated users store their cart in the database.
- **Merge Logic**: On login, items from guest localStorage will be merged into the account-based cart, updating quantities for duplicate items.

## 4. Checkout & Stripe Integration
- **Flow**: Stripe Hosted Checkout Page for maximum security and reduced frontend complexity.
- **Orders**: Database record created only after successful Stripe Webhook confirmation (`checkout.session.completed`).
- **File Handling**: Local storage in `/public/uploads` for personalization photos.

## 5. Timeline & Phases
1. **Phase 1**: Schema updates & Auth Foundation.
2. **Phase 2**: Register/Login Pages & Search Engine.
3. **Phase 3**: Cart Sync Logic & UI Enhancements.
4. **Phase 4**: Stripe Integration, Order History & Webhooks.

---
*Created by Antigravity Orchestrator*
