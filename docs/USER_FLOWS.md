# RITAFA · User Flows

## Mục lục
1. [Customer · Mua hàng](#1-customer--mua-hàng)
2. [Customer · Đăng ký / Đăng nhập](#2-customer--đăng-ký--đăng-nhập)
3. [Customer · Theo dõi đơn](#3-customer--theo-dõi-đơn)
4. [Customer · Tích điểm Elementa](#4-customer--tích-điểm-elementa)
5. [Admin · Quản lý đơn (Fulfillment)](#5-admin--quản-lý-đơn-fulfillment)
6. [Admin · Quản lý đa kênh (Omnichannel)](#6-admin--quản-lý-đa-kênh)

---

## 1. Customer · Mua hàng

```
[Hero Homepage]
   │  ↓ "Khám phá Collection" CTA
   ▼
[PLP - /shop]
   │  · Sidebar Filter realtime
   │  · Element quick-jump (Ba/Sc/Ki/Hm)
   │  · Infinite scroll grid
   │  · Quick Add hover → mở giỏ
   │
   │  ↓ Click product card
   ▼
[PDP - /shop/:slug]
   │  · 3D Viewer mode-toggle
   │  · Chọn Color → Size → Quantity
   │  · Trust signals (Freeship, Flash countdown, Low stock)
   │  · Read Tech Specs / Fit / Care / Reviews
   │
   │  ↓ "Thêm vào giỏ" hoặc "Mua ngay"
   ▼
[MiniCart drawer]
   │  · Freeship progress bar
   │  · Edit quantity
   │  · Suggested cross-sell
   │
   │  ↓ "Thanh toán"
   ▼
[Checkout - /checkout]
   │
   │  DESKTOP: Single-page (Contact + Shipping + Payment + Summary)
   │  MOBILE:  Multi-step wizard (4 bước) + sticky CTA
   │
   │  · Voucher code
   │  · Address cascade (Tỉnh → Quận → Phường)
   │  · Shipping method (Standard/Express/Pickup)
   │  · Payment (Momo, ZaloPay, Visa, Apple Pay, Fundiin, COD)
   │
   │  ↓ "Đặt hàng"
   ▼
[Success - /checkout/success]
   │  · Mã đơn + timeline 3 bước tiếp theo
   │  ↓
[Account · Orders] · theo dõi tiếp
```

### Touchpoints quan trọng

- **Element badge** xuất hiện ở mọi product card → khách quen với hệ thống Element ngay từ PLP.
- **Mini cart auto-open** khi quick-add từ PLP → giảm friction.
- **Freeship progress** trong drawer cart → upsell tự nhiên.
- **Flash countdown** trên PDP → urgency không chói mắt.

---

## 2. Customer · Đăng ký / Đăng nhập

```
[Header · /auth/login]
   │
   ├── Tab "Đăng nhập"
   │    ├── Apple/Google quick login
   │    ├── Email + Password
   │    └── "Quên mật khẩu?" → email reset flow
   │
   └── Tab "Đăng ký"
        ├── Name + Email + Password
        └── Auto-create membership Base tier
              ↓
        [Welcome email · Lab Report Issue]
              ↓
        [/account] dashboard
```

**Guest Checkout** vẫn được hỗ trợ — REQS §3.2. Khách không bắt buộc đăng ký để mua. Sau khi mua thành công, hệ thống gợi ý tạo account để theo dõi đơn + tích điểm.

---

## 3. Customer · Theo dõi đơn

```
[/account/orders]
   │
   │  Mỗi đơn hiển thị:
   │   · Code (RTF-20260525-A1B2)
   │   · Order Timeline horizontal (6 bước)
   │   · Items (thumbnail + color/size/qty)
   │   · Total + CTA "Chi tiết"
   │
   ↓ Click "Chi tiết"
   │
[/account/orders/:id]
   │
   │  · Full timeline với actor + timestamp
   │  · Tracking number + carrier (GHN/GHTK/Ahamove)
   │  · Address + Payment recap
   │  · Action: Re-buy · Cancel (if pending) · Contact support
```

### Status timeline (REQS §3.3)
```
new → verified → qc_passed → packed → shipping → delivered
                    ↓
                qc_failed → cancelled
                                 ↓
                              shipping → returned → refunded
```

### Visual design choice
- Timeline render bằng row of icons + connecting lines, dùng `animate-glow-pulse` cho bước hiện tại.
- Bước hoàn tất: amber filled; bước chưa tới: muted grey.
- QC failed: status timeline thay thế bằng red note + action "Liên hệ CSKH".

---

## 4. Customer · Tích điểm Elementa

```
[Mua hàng] → +X points (1pt / 100K spent)
              ↓
[Account · Rewards]
   │
   │  · Hiển thị tier hiện tại (atomic glyph)
   │  · Progress bar tới tier kế tiếp
   │  · Voucher catalog đổi điểm:
   │       · 500pt → 100K off
   │       · 1000pt → Freeship Premium x3
   │       · 2000pt → 300K off
   │       · 5000pt → Lab notebook + tote gift
```

### Tier ladder

| Tier | Threshold (VND spent) | Element | Perks |
|------|------------------------|---------|-------|
| Base | 0 | [Ba] | 1pt/100K · Sinh nhật -10% · Lab Report |
| Scholar | 2,000,000 | [Sc] | 1.5pt · Freeship ∞ · Early access Collection |
| Kinetic | 10,000,000 | [Ki] | 2pt · Stylist riêng · Event kín · Ưu tiên đổi trả 30d |

---

## 5. Admin · Quản lý đơn (Fulfillment)

```
[Admin Dashboard]
   │  · To-do widget: "8 đơn chưa xác nhận"
   │  ↓ Click
[Admin Orders /admin/orders]
   │
   │  Filter by status: New | Verified | QC | Packed | Shipping | Delivered | QC Failed
   │  Bulk actions: Print waybill A6/A7 · Export CSV
   │
   │  ↓ Click row
[Order Detail]
   │
   │  Actions per state:
   │   · New → "Verify" (or auto if payment OK)
   │   · Verified → "Send to QC"
   │   · QC Passed → "Mark Packed"
   │   · Packed → "Assign Carrier" (auto-select GHN/GHTK/Ahamove by region)
   │   · Shipping → "Mark Delivered"
   │   · QC Failed → "Cancel" or "Replace item"
   │   · Delivered → "Request Return" (if customer asks)
```

### Auto-routing carriers (REQS §4.2.4)
- Region HCM/HN nội thành → Ahamove (intra-day)
- Liên tỉnh → GHN (default), GHTK (backup)
- COD-only orders → ưu tiên carrier với COD reconciliation tốt
- Hệ thống tính phí ship + ETA realtime, chọn carrier optimal.

---

## 6. Admin · Quản lý đa kênh

```
[Admin /admin/products]
   │
   ├── Push lên sàn (Bulk Push):
   │    ├── Shopee API → tạo product + variant
   │    ├── Lazada API → ...
   │    └── TikTok Shop API → ...
   │
   ├── Sync tồn kho 2 chiều (cron 5p):
   │    └── Bất kỳ kênh nào order → trừ stock trung tâm → đẩy lại các kênh khác
   │
   └── Đơn hàng đa kênh → gom về /admin/orders (Channel chip: Shopee/Lazada/TikTok/POS)
```

### Livestream comment auto-checkout
- Module Facebook live: comment "buy SKU-X" → auto generate cart link + DM khách → khách click hoàn tất checkout chuẩn.

### POS Pop-up Store
- iPad app, quét barcode → add to cart → in hoá đơn nhiệt + sync về Admin orders với channel `pos`.

---

## Trạng thái Empty / Error / Loading

Tất cả page có 3 trạng thái thiết kế sẵn:

- **Empty**: Illustration nhẹ + headline + CTA cụ thể (ví dụ cart trống → "Khám phá Year Collection").
- **Error**: Banner trên cùng + retry CTA. Không bao giờ hiện stack trace cho user.
- **Loading**: Skeleton (shimmer gradient) thay vì spinner — giữ layout stable, tránh CLS.

---

**Last updated: 2026-05-25**
