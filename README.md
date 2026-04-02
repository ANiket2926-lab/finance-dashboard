# FinDash — Finance Dashboard

A modern, production-quality personal finance dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**. Track income, manage expenses, and gain financial insights — all in a beautifully designed, fully responsive interface.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)

---

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards** — Total Balance, Income, and Expenses at a glance
- **Balance Chart** — Interactive area chart showing balance trends over time
- **Spending Pie Chart** — Category-wise spending breakdown with percentages
- **Recent Transactions** — Quick preview of latest financial activity

### 💳 Transactions Management
- Full transaction table with description, date, category, type, and amount
- **Search** — Filter by description, category, or amount
- **Type Filter** — Toggle between All, Income, and Expense views
- **Sort** — By date or amount (ascending/descending)
- Responsive mobile card layout

### 🔐 Role-Based UI (Simulated)
- **Admin** — Add new transactions, edit, and delete existing ones
- **Viewer** — Read-only access across all screens
- Role selector in the top navigation bar

### 💡 Insights
- **Top Spending Category** — Identifies your highest expense area
- **Monthly Comparison** — Shows spending change vs previous month
- **Savings Rate** — Calculates and displays your savings percentage
- **Income vs Expenses Chart** — Monthly bar chart comparison
- **Spending Breakdown** — Category progress bars with percentages

### 🎨 UI/UX
- **Dark Mode** — Toggle with persistence via localStorage
- **Smooth Animations** — Fade-in, scale-in, and transition effects
- **Loading States** — Spinner on initial load
- **Empty States** — Friendly messages when no data is available
- **Responsive Design** — Mobile, tablet, and desktop layouts
- **Gradient Accents** — Modern, polished visual identity

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework & routing |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Recharts** | Charts & data visualization |
| **Lucide React** | Icon library |
| **React Context API** | State management |
| **localStorage** | Data persistence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Folder Structure

```
finance-dashboard/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Dashboard overview page
│   │   ├── globals.css               # Global styles & animations
│   │   ├── transactions/
│   │   │   └── page.tsx              # Transactions page
│   │   └── insights/
│   │       └── page.tsx              # Insights & analytics page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx          # Main layout wrapper
│   │   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   │   └── TopNavbar.tsx         # Top bar with role & dark mode
│   │   ├── dashboard/
│   │   │   ├── SummaryCards.tsx       # Balance/Income/Expense cards
│   │   │   ├── BalanceChart.tsx       # Line/Area chart
│   │   │   ├── SpendingPieChart.tsx   # Donut chart
│   │   │   └── RecentTransactions.tsx # Latest transactions list
│   │   ├── transactions/
│   │   │   ├── TransactionTable.tsx   # Full transaction table
│   │   │   ├── TransactionFilters.tsx # Search, filter, sort controls
│   │   │   └── TransactionModal.tsx   # Add/Edit modal dialog
│   │   └── insights/
│   │       └── InsightCards.tsx        # Smart insight cards
│   │
│   ├── context/
│   │   └── AppContext.tsx             # Global state (reducer pattern)
│   │
│   ├── hooks/
│   │   └── useFinanceData.ts          # Derived financial computations
│   │
│   ├── data/
│   │   └── transactions.ts           # Mock data & category colors
│   │
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   │
│   └── utils/
│       └── index.ts                   # Utility functions
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🔧 State Management

Uses **React Context API** with a `useReducer` pattern for clean, scalable state management:

- **Transactions** — CRUD operations stored in state & persisted to localStorage
- **Filters** — Search query, type filter, sort field & direction
- **Role** — Admin or Viewer mode
- **Dark Mode** — Theme preference with persistence

---

## 🎯 Key Design Decisions

1. **No external state library** — React Context + useReducer is sufficient and avoids unnecessary dependencies
2. **Mock data with localStorage** — Enables full offline functionality and data persistence without a backend
3. **Component-driven architecture** — Each component has a single responsibility and is reusable
4. **Tailwind v4** — Uses the latest `@theme` directive and `@import "tailwindcss"` syntax
5. **Memoized computations** — Uses `useMemo` for derived financial data to avoid recalculation

---

## 🔮 Future Improvements

- [ ] Backend API integration (REST or GraphQL)
- [ ] User authentication (NextAuth.js)
- [ ] Budget goal setting & tracking
- [ ] Recurring transaction support
- [ ] Export to CSV/PDF
- [ ] Multi-currency support
- [ ] Real-time notifications
- [ ] Data visualization with more chart types
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] E2E tests with Playwright

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
