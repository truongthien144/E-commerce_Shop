# Pawlio Pet Shop - Developer Documentation

## Project Overview
Pawlio Pet Shop is a modern, responsive e-commerce application tailored for purchasing personalized pet accessories and bespoke memorial keepsakes. The application features robust real-time cart handling, dynamic customized photo-uploading, seamless responsive sorting/filtering interfaces, and a highly sophisticated mock-checkout routing system natively integrated securely with Next.js App Router parameters.

## Technical Stack
- **Framework:** Next.js 16 (App Router paradigm)
- **Styling:** Tailwind CSS v4, Framer Motion, Radix UI (Shadcn Library)
- **State Management:** React Context API globally natively wrapped via `CartProvider`
- **Database Architecture:** Prisma ORM schema directly bound to lightweight SQLite
- **Testing Ecosystem:** Jest & React Testing Library (JSDOM environment) natively injected with custom `jest.setup.cjs` configurations.

## Setup Instructions

### 1. Prerequisites Configuration
Ensure you have `Node.js` v18+ and `npm` installed securely on your physical system.

### 2. Installation
Clone the master repository and natively install all production & development dependencies:
```bash
npm install
```

### 3. Database Initialization
Instantiate the local SQLite database schema bindings and safely populate the initial product seed data containing dynamic base prices and relational variants:
```bash
npx prisma db push
npx prisma db seed
```

## Complete Usage & Development Guide

### Running the Local Server
Boot up the development environment mapping strictly to local configurations with real-time browser hot-reloading:
```bash
npm run dev
```
Visit `http://localhost:3000` via a dedicated browser window to interact seamlessly with the frontend.

### Executing the System Testing Suite
The repository is professionally secured natively via a comprehensive, isolated Jest unit testing suite strictly targeting interactive components, layout bounds, and UI validation errors. Execute the entire Jest diagnostics framework via:
```bash
npm test
```

For interactive persistent watch mode specifically designed for live active development:
```bash
npm run test:watch
```

### Key Technical Features Under The Hood
- **Adaptive Product Grid:** Advanced flexbox-driven mobile-first visual mapping seamlessly dynamically shifting from dense cohesive 2-column mobile footprints entirely out to 4-column wide desktops cleanly.
- **Dynamic Sorting System:** Fully integrated interactive HTML parameter sorting natively executing `useRouter().push()` URL `searchParams` logic, instantly synchronizing UI configurations explicitly downward into raw Prisma layer filter objects.
- **Robust Checkout API Flow:** Beautifully simulated checkout mechanism systematically intercepting generic `handleCheckout()` submissions via backend `/api/checkout/mock` modules, generating entirely flawless, isolated e-commerce confirmations avoiding actual Stripe portal lockouts.
