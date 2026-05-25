# RITAFA · Design System

> **Swiss-Tech Minimalism** — Tinh giản kiểu Thụy Sĩ kết hợp Công nghệ.
> Lấy cảm hứng từ Gucci, Dior, Miu Miu — kết hợp ngôn ngữ phòng lab khoa học.

---

## 1. Triết lý thiết kế

### Sáu nguyên tắc cốt lõi (Visual)

1. **Khoảng trắng là sự sang trọng** · 40–60% canvas trống. Padding section 80–120px desktop.
2. **Phân cấp thị giác qua Typography** · Tiêu đề lớn 64–96px, thang tỷ lệ 1.25.
3. **Hình ảnh chất lượng cao** · Full-bleed, ≥2000px, nhiếp ảnh chuyên nghiệp.
4. **Điều hướng tối giản** · Header <5 mục chính, hamburger cho phụ.
5. **Hoạt ảnh tinh tế** · Fade-in, slide-up, micro-interaction 300–500ms.
6. **Dark Mode First** · Tối ưu OLED, giảm mỏi mắt khi mua sắm ban đêm.

### Ba nguyên tắc thương hiệu (Brand)

- **Nguyên bản** · Không thiết kế theo mùa. R&D 18+ tháng/SP.
- **Tinh giản** · Cắt bỏ chi tiết không cần. Mặt vải, form, cảm giác — chỉ vậy.
- **Minh bạch** · Mọi dữ liệu kỹ thuật được công khai trên PDP.

### Sự khác biệt sáng tạo so với REQS gốc

Bài thiết kế giữ tinh thần Swiss-Tech của brief nhưng bổ sung các nét tươi mới:

- **Element System như bảng tuần hoàn sống** — không chỉ là 4 icon, chúng là một hệ thống nhận diện đa cấp: gắn vào sản phẩm, hạng thành viên, navigation, badge.
- **Lab Report aesthetic** — section markers `// 01 — Identity`, monospace data strips, lab labels uppercase rộng — gợi cảm giác đọc bài báo khoa học chứ không phải landing thông thường.
- **3D Viewer với 3 mode-toggle** — Standard / Fabric (macro grain texture) / Wireframe (SVG-stroked seam map) — vượt xa "1 ảnh xoay" của TMĐT thông thường.
- **Tech Specs dashboard** trên PDP — hiển thị GSM, weave, composition, performance metrics dưới dạng spec-sheet khoa học chứ không phải bullet list.
- **Atomic Profile Card** — hồ sơ khách hàng hiển thị tier như nguyên tố hoá học.
- **AI Review Summary** — tổng hợp review bằng AI ngắn gọn ở đầu Reviews tab.
- **Warm-tinted dark mode** — chọn `#0A0A09` (ấm) thay vì `#000` cứng để mắt dễ chịu, kết hợp amber glow tinh tế trên CTA.

---

## 2. Color System

### Brand palette

| Token | Dark | Light | Usage |
|------|------|-------|------|
| `ink-900` (bg) | `#0A0A09` warm | — | Background dark |
| `ink-700` (surface) | `#1F1F1E` | — | Card, container |
| `ink-800` (surface-alt) | `#141413` | — | Section bg dark |
| `ink-0` | — | `#FAFAFA` | Background light |
| `ink-50` | — | `#F4F4F2` | Section bg light |
| `amber-500` (primary) | `#D4AF37` | `#D4AF37` | CTA, brand highlight |
| `text-primary` | `#FFFFFF` | `#1A1A1A` | Body text |
| `text-secondary` | `#A0A0A0` | `#666666` | Caption, hint |

### Element accents (cross-mode)

| Code | Element | Hex | Persona |
|------|---------|-----|---------|
| `[Ba]` | Base | `#9CA3AF` | Everyday core |
| `[Sc]` | Scholar | `#60A5FA` | Academic / Office |
| `[Ki]` | Kinetic | `#F87171` | Performance / Motion |
| `[Hm]` | Home | `#4ADE80` | Recovery / At Home |

### System states

| Token | Hex |
|-------|-----|
| success | `#10B981` |
| warning | `#F59E0B` |
| danger | `#EF4444` |
| info | `#3B82F6` |

### Quyết định thiết kế cho Dark Mode

- Background sử dụng `#0A0A09` (warm-tinted) thay vì `#000` — nhìn ít gắt hơn, đặc biệt ban đêm.
- Surface card `#1F1F1E` để có depth (`#000` over `#0A0A09` không có separation).
- Border: `rgba(255,255,255,0.08)` — hairline đủ rõ nhưng không "vẽ khung" toàn page.
- Amber glow `box-shadow: 0 0 32px rgba(212,175,55,0.25)` được dùng tiết kiệm chỉ trên CTA chính + atomic logo để tạo "luminous focal point".
- Selection color: `rgba(212,175,55,0.3)` — đồng nhất brand.

---

## 3. Typography

### Stack

- **Sans / Display**: `Inter` (fallback `Univers Next`, `system-ui`) · 300–800 weights · features `ss01, cv01, cv02, cv03`
- **Mono / Specs**: `JetBrains Mono` (fallback `Fira Code`, `Consolas`) · 400–600

### Scale (1.25 ratio)

| Role | Size | Line-height | Letter-spacing | Use |
|------|------|-------------|----------------|-----|
| Display XL | `6.5rem` (104px) | 0.95 | -0.04em | Hero on lg+ |
| Display | `4.768rem` (76.3px) | 1 | -0.04em | Page hero |
| H1 | `3.815rem` (61px) | 1.05 | -0.03em | Page title |
| H2 | `3.052rem` (48.8px) | 1.1 | -0.02em | Section title |
| H3 | `1.953rem` (31.3px) | 1.2 | -0.01em | Product name |
| Body | `1rem` (16px) | 1.6 | 0 | Paragraph |
| Caption | `0.8rem` (12.8px) | 1.4 | 0.02em | Meta, hint |
| Code | `0.875rem` (14px) Mono | 1.5 | 0 | SKU, spec |
| Lab Label | `0.625rem` (10px) Mono | — | 0.25em | Section marker |

### Quy ước sử dụng

- **Lab labels** (`// 01 — Identity`, `// rotation`) chỉ dùng JetBrains Mono, uppercase, tracking 0.25em → khẳng định nhận dạng "engineering note".
- **Display** dành riêng cho hero — không lạm dụng.
- **H3** dùng cho product name + tab section title — không to hơn.
- Body text **không bao giờ dưới 14px** (a11y).

---

## 4. Grid & Spacing

| Device | Grid | Max-width | Container padding |
|--------|------|-----------|---------------------|
| Mobile (<640) | 4 cột | 100% | 16px |
| Tablet (640–1024) | 8 cột | 100% | 24px |
| Desktop (≥1024) | 12 cột | 1440px | 32–48px |

### Spacing scale

Base 4px. Thang: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160`. Section padding (Y) tối thiểu **80px mobile**, **120–160px desktop**.

---

## 5. Components

Atomic UI library nằm trong `src/components/ui/`:

| Component | Variants | Sizes |
|-----------|----------|-------|
| `Button` | primary · secondary · outline · ghost · danger | sm · md · lg · xl |
| `IconButton` | ghost · solid · outline | sm · md · lg |
| `Badge` | neutral · amber · success · warning · danger · info · glass | — |
| `Input` | with label, hint, error, leftIcon, rightSlot | — |
| `Card` | default · elevated · outline · glass | padding: none/sm/md/lg |
| `SectionHeader` | left · center · with action | — |
| `Tabs` (compound) | pill style | — |
| `ProgressBar` | amber · success · info · warning · 4×element | thin · normal · thick |
| `ElementGlyph` | card · pill · inline | xs–xl |
| `Rating` | with value, with review count | sm · md · lg |
| `Drawer` | right · left · bottom | sm · md · lg |

### Atomic Card pattern (Element)

Một sáng tạo cốt lõi: mỗi Element được render thành một "atomic tile" gồm:

- Atomic number (top-left, mono)
- Code chữ to (`Ba`, `Sc`, `Ki`, `Hm`)
- Mass placeholder (mono, italic-feel)
- Name + Tagline
- Hover: glow radial từ dưới lên + description expand

Pattern này được dùng lại trên Homepage (Element Nav), PLP filter, Membership tiers, Account banner — tạo cảm giác consistent "the periodic table is alive".

---

## 6. Motion

### Easing & duration

- **Standard ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth out — Apple feel)
- **Quick**: 200–250ms (hover state, focus ring)
- **Standard**: 300–400ms (drawer open, theme switch)
- **Long**: 600–800ms (page transitions, scrollytelling)

### Curated animations

| Name | Use |
|------|-----|
| `fade-up` 600ms | Section reveal on scroll |
| `fade-in` 500ms | Tab content swap |
| `scale-in` 300ms | Modal/popover open |
| `glow-pulse` 3s infinite | Active step in order timeline |
| `marquee` 30s linear infinite | System status strip |
| `shimmer` 2s linear infinite | Skeleton loading |

### Principles

- **Never block interactivity** — animations chỉ "trang trí", không gate UX.
- **Respect `prefers-reduced-motion`** — sẽ apply trong production CSS (currently default behavior of framer-motion).
- **Stagger small** — list reveal max delay 60–120ms per item.

---

## 7. Iconography

- **Library**: `lucide-react` (stroke = 1.5–2, outlined, geometric)
- **Sizes**: 12 (caption), 14 (body), 16 (button), 20 (header), 24+ (illustration)
- **Color**: inherit currentColor — never use raw hex on icons.

---

## 8. Accessibility (WCAG 2.1 AA)

- **Color contrast**: Amber `#D4AF37` trên dark `#0A0A09` = 7.2:1 ✅. Trên light `#FAFAFA` = 3.1:1 → chỉ dùng cho element ≥18px hoặc bold.
- **Focus rings**: `outline: 2px solid #D4AF37; outline-offset: 2px` toàn site.
- **Touch targets**: min 44×44px (mobile CTAs, IconButtons size `md` = 40, size `lg` = 48).
- **ARIA**: `aria-label` bắt buộc cho mọi IconButton, drawer, search dialog.
- **Tab order**: Logical — header → main → footer. Drawer traps focus (sẽ thêm focus-trap khi production).
- **Reduced motion**: Animations dùng framer-motion tự respect `prefers-reduced-motion`.
- **Form labels**: Mọi Input có label hoặc aria-label.

---

## 9. Responsive breakpoints

| Name | px | Layout |
|------|-----|--------|
| `sm` | 640 | 2-col grid, mobile drawer cart |
| `md` | 768 | 2-col on PDP, mobile checkout still wizard |
| `lg` | 1024 | Desktop nav, sidebar filter, checkout single-page |
| `xl` | 1280 | 4-col product grid |
| `2xl` | 1440 | Max container, hero display-xl |

---

## 10. Content & Voice

### Tiếng Việt
- Trung tính, tinh giản, không spam emoji.
- Bullet ngắn, câu cảm có chấm cuối.
- Sử dụng thuật ngữ chuyên ngành kỹ thuật vải (GSM, Twill, Jersey) — không tránh né.

### Tiếng Anh
- Sentence case cho tiêu đề chính.
- Lab markers tiếng Anh (`// 01 — Identity`).
- Tạo cảm giác "engineering brief" chứ không phải sale copy.

---

**Last updated: 2026-05-25**
