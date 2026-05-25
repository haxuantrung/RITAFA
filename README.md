# RITAFA · E-Commerce Platform

> **The Science of Comfort.** From Lab to Life.
>
> Nền tảng thương mại điện tử headless cho thương hiệu RITAFA — thuộc Rita Võ Group. Mô hình M2C (Manufacturer-to-Consumer), thiết kế Swiss-Tech Minimalism, Dark Mode First.

![Status](https://img.shields.io/badge/version-1.0.0-D4AF37) ![Tech](https://img.shields.io/badge/stack-Vite%20·%20React%2018%20·%20TypeScript-D4AF37) ![Design](https://img.shields.io/badge/design-Swiss--Tech%20Minimalism-0A0A09)

---

## ⌬ Khái quát

Đây là prototype hệ thống RITAFA E-Commerce gồm **Storefront** (giao diện khách hàng) và **Admin Panel** (CMS quản trị), được thiết kế tích hợp đầy đủ với:

- **Triết lý thị giác**: Swiss-Tech Minimalism — khoảng trắng là sang trọng, typography là linh hồn, dữ liệu là minh bạch.
- **Hệ thống Element**: 4 nguyên tố `[Ba] [Sc] [Ki] [Hm]` được dùng làm khung nhận diện cho mọi sản phẩm và cấp thành viên — như một bảng tuần hoàn sống.
- **Dark Mode First**: Sử dụng warm-tinted black `#0A0A09` thay vì đen thuần, kết hợp Amber glow để dịu mắt khi mua sắm về đêm.
- **3D Viewer Mode-toggle**: Standard / Fabric (zoom macro) / Wireframe — đưa khách vào tư thế kỹ sư.
- **Lab Report aesthetic**: Mã monospace, marker `// 01 — Identity`, thông số GSM / Weave / Composition như một spec-sheet khoa học.

## ⌬ Tech Stack

| Layer | Choice | Why |
|------|--------|-----|
| Build | Vite 5 + TypeScript 5.6 | DX nhanh, type-safe production-ready |
| UI | React 18 + Tailwind CSS 3.4 | Atomic styling, design tokens trong tailwind.config |
| Routing | React Router 6 | Lazy nested layouts cho Storefront + Admin |
| Animation | Framer Motion | Page transitions, scrollytelling 3D showcase |
| Icons | lucide-react | Stroke đồng đều, ăn brand |
| Charts | Recharts | Dashboard, P&L, funnel |

## ⌬ Cấu trúc dự án

```
RITA/
├── docs/                          # Tài liệu thiết kế chi tiết
│   ├── DESIGN_SYSTEM.md          # Tokens, typography, color, spacing, motion
│   ├── USER_FLOWS.md             # Flow chính của Customer & Admin
│   └── ARCHITECTURE.md           # MCP separation, headless approach
│
├── src/
│   ├── components/
│   │   ├── ui/                   # Atomic components (Button, Card, Tabs...)
│   │   ├── layout/               # Header, Footer, Marquee, Mobile Nav, Search
│   │   ├── home/                 # Hero, ElementNav, Featured, Philosophy, 3D Showcase
│   │   ├── product/              # ProductCard, 3D Viewer, Tech Specs, Fit Guide, Reviews
│   │   ├── cart/                 # MiniCart drawer
│   │   └── admin/                # AdminLayout
│   │
│   ├── pages/
│   │   ├── storefront/           # Customer-facing pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductListingPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   ├── AccountPage.tsx
│   │   │   └── account/          # Nested account routes
│   │   │       ├── OverviewPage.tsx
│   │   │       ├── OrdersPage.tsx
│   │   │       ├── WishlistPage.tsx
│   │   │       └── RewardsPage.tsx
│   │   └── admin/
│   │       ├── DashboardPage.tsx
│   │       ├── OrdersPage.tsx
│   │       ├── ProductsPage.tsx
│   │       ├── InventoryPage.tsx
│   │       ├── MarketingPage.tsx
│   │       └── AnalyticsPage.tsx
│   │
│   ├── data/                     # Dummy data
│   │   ├── elements.ts          # 4 Elements + Membership tiers
│   │   ├── products.ts          # 12 SKUs với fabric specs đầy đủ
│   │   ├── orders.ts            # Sample orders covering all status states
│   │   ├── users.ts             # Customer + Admin user samples
│   │   └── dashboardMetrics.ts  # Revenue trend, KPI, channel breakdown
│   │
│   ├── context/                  # Global state (Model + Controller)
│   │   ├── ThemeContext.tsx     # Dark/light + language
│   │   └── CartContext.tsx      # Cart reducer
│   │
│   ├── types/                    # TypeScript domain models
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── user.ts
│   │
│   ├── utils/                    # Pure utilities
│   │   ├── cn.ts                # Tailwind merge helper
│   │   └── formatters.ts        # VND, dates, countdown
│   │
│   ├── styles/
│   │   └── globals.css          # Design tokens + component utilities
│   │
│   ├── routes/
│   │   └── index.tsx            # createBrowserRouter
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.js            # Brand colors, fonts, animations
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

## ⌬ Tính năng đã hiện thực hoá

### Storefront

- ✅ **Homepage** — Hero parallax + Lab data strip · Element Navigation (4 atomic tiles) · Featured Grid (editorial + masonry) · Transparency Dashboard · Philosophy 3 pillars · Scrollytelling 3D Showcase · Membership Teaser
- ✅ **Product Listing (PLP)** — Sidebar filter realtime · URL params · Sort · Grid 4/2/1 responsive · Mobile filter drawer · Active chips
- ✅ **Product Detail (PDP)** — 3D Viewer 3 modes (Standard / Fabric / Wireframe) · Color + Size picker · Trust signals · Flash countdown · Tabs Tech/Fit/Care/Reviews · Related products
- ✅ **Mini Cart** — Slide-in drawer · Freeship progress · Quantity stepper · Suggested items
- ✅ **Checkout** — Single-page (desktop) + Multi-step wizard (mobile) · Voucher · 6 payment methods · 3 shipping methods · Sticky CTA
- ✅ **Auth** — Login / Register tab toggle · Social (Apple, Google) · Split-screen editorial
- ✅ **Account** — Atomic profile banner · Overview · Orders timeline · Wishlist · Elementa Rewards với tier ladder

### Admin Panel

- ✅ **Dashboard** — KPI cards · Revenue trend (Recharts) · Channel breakdown pie · Top products · To-do widget
- ✅ **Orders** — Status filters · Table với customer avatar, item thumbnails · Bulk actions
- ✅ **Products (PIM)** — Catalog table với Element glyph, variant counts, stock heatmap
- ✅ **Inventory** — Multi-warehouse · Low-stock alert · Size matrix heatmap
- ✅ **Marketing** — Voucher table · Customer segments · Quick stats
- ✅ **Analytics** — P&L · Sales velocity · Funnel chuyển đổi

## ⌬ Chạy local

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build
```

Routes chính để demo:

| Path | Mô tả |
|------|------|
| `/` | Homepage |
| `/shop` | PLP |
| `/shop?element=Ki` | PLP filtered by Element |
| `/shop/kinetic-flex-jogger` | PDP với 3D Viewer |
| `/checkout` | Checkout (cần thêm sản phẩm vào giỏ trước) |
| `/auth/login` | Login + Register |
| `/account` | Account dashboard |
| `/admin` | Admin Dashboard |
| `/admin/orders` | Quản lý đơn |
| `/admin/products` | Quản lý sản phẩm |
| `/admin/inventory` | Tồn kho |
| `/admin/marketing` | Khuyến mãi |
| `/admin/analytics` | Báo cáo |

## ⌬ Tài liệu thiết kế

Đọc thêm trong thư mục `docs/`:

- [`DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — Tokens, typography, motion, accessibility
- [`USER_FLOWS.md`](./docs/USER_FLOWS.md) — Customer & Admin flows
- [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — MCP separation, headless approach

---

**Engineered in Vietnam · Rita Võ Group · 2026**
