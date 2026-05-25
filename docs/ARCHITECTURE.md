# RITAFA · Architecture

## 1. Approach: Headless Commerce + MCP separation

REQS §1.1 yêu cầu mô hình **Headless Commerce** (tách biệt Front-end và Back-end). Codebase này phản ánh trực tiếp tinh thần đó cộng thêm pattern **MCP (Model · Controller · Presenter)** để rạch ròi:

```
┌─────────────────────────────────────────────────────────────────┐
│                            MODEL                                │
│   src/types/      → TypeScript domain types (Product, Order...) │
│   src/data/       → Dummy fixtures (sẽ thay bằng API calls)     │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                         CONTROLLER                              │
│   src/context/    → Global state (Theme, Cart) — reducers       │
│   src/hooks/      → Custom hooks (data fetching, business)      │
│   src/utils/      → Pure functions (formatters, validators)     │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                          PRESENTER (View)                       │
│   src/components/ui/        → Atomic primitives                 │
│   src/components/layout/    → Frame-level (Header, Footer)      │
│   src/components/home/      → Section-level home blocks         │
│   src/components/product/   → Product-specific molecules        │
│   src/pages/                → Route-level pages                 │
│                                                                 │
│   Mục tiêu: 0 business logic. Chỉ render + dispatch events.     │
└─────────────────────────────────────────────────────────────────┘
```

### Quy tắc MCP áp dụng trong dự án

1. **Pages KHÔNG fetch data** — chúng chỉ đọc từ context hoặc import dummy. Khi production, thay bằng custom hook (`useProduct(slug)`).
2. **Components UI thuần presenter** — `Button`, `Card`, `ProductCard` chỉ nhận props; KHÔNG gọi context trừ khi component đó định nghĩa là "container" (vd `MiniCart`).
3. **Reducer ở context layer** — cart logic nằm trong `CartContext.tsx` qua `useReducer`, components chỉ dispatch.
4. **Formatters tách riêng** — `formatVND`, `formatDate`, `formatCountdown` ở `utils/formatters.ts`, không nhúng inline trong component.

---

## 2. Frontend Stack Choice — Lý do

| Layer | Choice | Lý do |
|------|--------|------|
| Build | Vite | HMR cực nhanh, tree-shake tốt, output ES2022 |
| UI | React 18 | Concurrent rendering, Suspense ready for data fetching |
| TypeScript | strict mode | Type safety cho domain models phức tạp (Product variants, Order timeline) |
| Tailwind | JIT + Atomic | Design tokens trong config = single source of truth, không bloat CSS |
| React Router | v6 | Nested routes phù hợp Storefront + Admin layout |
| Framer Motion | declarative animation | Scrollytelling 3D Showcase + page transitions |
| Recharts | charts | SVG-based, accessible, lightweight cho admin dashboards |

### Tại sao KHÔNG dùng Next.js cho prototype này?

- Trong production, Next.js sẽ là lựa chọn đúng (SSR cho SEO, ISR cho PLP, image optimization).
- Ở prototype này, ưu tiên **build time nhanh** và **demo nhanh** → Vite SPA đủ tốt. Migration path sang Next.js đơn giản vì 99% code là React components không SSR-specific.

### Tại sao KHÔNG dùng state library (Redux/Zustand)?

- Cart state đủ đơn giản cho Context + useReducer.
- Theme state là singleton — Context phù hợp.
- Khi thêm wishlist sync, address book, notifications → cân nhắc Zustand cho local-first speed.

---

## 3. Folder Conventions

### Quy ước đặt tên

- **Components**: PascalCase, named export (`export function ProductCard() {}`). Không default export — dễ refactor.
- **Hooks**: `useXxx` camelCase, named export.
- **Types**: PascalCase, suffix `Props` cho component props.
- **Files**: kebab-case là OK nhưng prefer PascalCase cho component files (`ProductCard.tsx`).
- **Constants**: SCREAMING_SNAKE_CASE.

### Layer Boundaries

```
ui/        ← chỉ phụ thuộc /utils, /types
layout/    ← phụ thuộc /ui, /context
home/      ← phụ thuộc /ui, /data, /utils
product/   ← phụ thuộc /ui, /context, /utils, /data
admin/     ← phụ thuộc /ui, /data, /utils
pages/     ← phụ thuộc tất cả layers trên (top of pyramid)
```

### Path Aliases

Đã setup trong `tsconfig.json` + `vite.config.ts`:

```ts
'@/*'           → src/*
'@components/*' → src/components/*
'@pages/*'      → src/pages/*
'@data/*'       → src/data/*
'@hooks/*'      → src/hooks/*
'@context/*'    → src/context/*
'@types/*'      → src/types/*
'@utils/*'      → src/utils/*
'@assets/*'     → src/assets/*
```

---

## 4. Routing Strategy

```
/                      → HomePage
/shop                  → PLP (URL params: ?element=Ki&size=M&sort=price-asc)
/shop/:slug            → PDP
/checkout              → Checkout
/checkout/success      → Confirmation
/auth/login            → Login
/auth/register         → Register
/account               → Account dashboard (Outlet)
/account/orders        → Orders list
/account/orders/:id    → Order detail
/account/wishlist      → Wishlist grid
/account/rewards       → Elementa Rewards
/admin                 → Admin Dashboard (Outlet)
/admin/orders          → Orders table
/admin/products        → Products PIM
/admin/inventory       → Inventory multi-warehouse
/admin/marketing       → Vouchers + Segments
/admin/analytics       → P&L + Funnel + Trends
```

### URL params drive UI state (PLP)

Filter selections sync với URL (REQS §4.1.2 "Lưu lịch sử lọc vào URL params"). Khi share link, người nhận thấy đúng filter.

---

## 5. Theme & Internationalization

### Theme strategy

- `ThemeContext` quản lý `theme` (light/dark) + `language` (vi/en).
- Persisted vào `localStorage` key `ritafa.preferences.v1`.
- Apply lên `<html class="dark">` để Tailwind picks up.
- Default = `dark` (REQS §5.1 Dark Mode First) trừ khi user override.

### i18n approach

- Hiện tại: strings inline tiếng Việt + tiếng Anh xen kẽ phù hợp brand bilingual.
- Production: migrate sang `react-i18next` với JSON files `vi.json` / `en.json`.
- Date / currency formatters dùng `Intl.NumberFormat` + `Intl.DateTimeFormat` — đã đúng locale-aware.

---

## 6. Data Layer (Production blueprint)

Hiện tại data đến từ `src/data/*.ts`. Khi production:

```
[Browser]
   │
   ├── Apollo Client / TanStack Query
   │       ↓
   ├── GraphQL Gateway (BFF) — Vercel/Cloudflare Workers
   │       ↓
   ├── Storefront API (Saleor / Shopify Storefront API / custom)
   │       ↓
   └── Headless backend
         ├── Postgres (orders, customers, products)
         ├── Redis (inventory cache, session)
         └── S3 (assets, .glb 3D models)
```

### Caching strategy

- **PLP**: ISR 60s + stale-while-revalidate
- **PDP**: ISR 5 phút (product info rarely changes intra-day)
- **Stock**: realtime via WebSocket / SSE (Low Stock warning needs freshness)
- **Cart**: localStorage + server sync on auth

---

## 7. Performance Budget

| Metric | Target |
|--------|--------|
| LCP (Homepage) | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| JS bundle (initial) | < 200KB gzip |
| Image LCP | AVIF/WebP, lazy below fold |

### Mitigations

- Code-split admin routes via `React.lazy` (production step).
- Lazy load 3D Viewer Canvas (heavy three.js bundle).
- `loading="lazy"` cho mọi `<img>` ngoài viewport.
- Fonts subset + preconnect (đã trong `index.html`).

---

## 8. Security & Compliance

- **CSP**: strict in production — chỉ allow self + trusted CDN.
- **PCI**: payment fields phải nằm trong iframe của gateway (Stripe Elements / OnePay hosted).
- **OWASP Top 10** addressed at server tier; frontend mitigations:
  - Sanitise user-generated content (review body) bằng DOMPurify trước render
  - Never `dangerouslySetInnerHTML` cho user content
  - CSRF tokens trong checkout submission
- **GDPR / NĐ-13**: cookie banner + opt-in analytics.

---

## 9. CI/CD Roadmap (REQS §3 — CI/CD)

```
Push to feature/* branch
   ↓ pre-commit hooks
   ├── ESLint
   ├── Prettier check
   ├── TypeScript compile
   └── Unit tests (Jest + RTL)
   ↓ Open PR
   ↓ GitHub Actions
   ├── Lint + Build
   ├── Lighthouse CI (PLP, PDP, Home)
   ├── Visual regression (Chromatic)
   └── E2E (Playwright on staging)
   ↓ Merge to develop
   ├── Auto-deploy to staging.ritafa.vn
   └── Manual gate → main → prod
```

**Branch naming**: `feature/RTF-123-add-3d-viewer` · `bugfix/RTF-145-cart-qty-bug` · `hotfix/RTF-200-payment-gateway`

**Commit format** (Conventional Commits):
```
feat(pdp): add fabric macro mode toggle
fix(cart): correct quantity reducer when removing last item
docs(design): document atomic profile card pattern
```

---

## 10. Mở rộng tương lai

- **PWA**: Service Worker + manifest cho install on mobile, offline cart.
- **A/B testing**: GrowthBook integration cho variant testing.
- **Personalization**: Algolia Recommend cho "Suggested for you".
- **AI**: GPT-powered fit recommendation dựa trên review body sentiment.
- **AR Try-on**: WebAR shoe & accessories preview.

---

**Last updated: 2026-05-25**
