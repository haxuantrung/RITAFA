**RITAFA**

E-COMMERCE PLATFORM

# 1\. MỤC TIÊU HỆ THỐNG

## 1.1. Tổng quan dự án

RITAFA E-Commerce Platform là nền tảng thương mại điện tử (Ecommerce Website) được thiết kế riêng biệt cho thương hiệu thời trang RITAFA của tập đoàn Rita Võ - thương hiệu tiên phong mô hình M2C (Manufacturer to Consumer) tại Việt Nam với triết lý "The Science of Comfort".

▶ Loại website: E-Commerce (Bán hàng trực tuyến) + CMS Admin

▶ Mô hình: Headless Commerce (tách biệt Front-end và Back-end)

▶ Thiết kế: Dark Mode First, Mobile-First, Swiss-Tech Minimalism

▶ Đặc trưng: Trình xem 3D 360°, Dashboard thông số vật liệu, Giao diện tối ưu tiên

## 1.2. Mục tiêu kinh doanh

- Chuyển đổi số toàn diện: Dẫn dắt khách hàng từ các sàn TMĐT (Shopee, Lazada, TikTok Shop) về website chính thức.
- Kiểm soát trải nghiệm: Sở hữu 100% hành trình khách hàng và trải nghiệm thương hiệu.
- Mở rộng toàn cầu: Hỗ trợ đa ngôn ngữ (Việt, Anh) và thanh toán quốc tế.

## 1.3. Điểm khác biệt cốt lõi so với sàn TMĐT

| **Tính năng**     | **Sàn TMĐT thông thường** | **ELEMENTA Platform**                                 |
| ----------------- | ------------------------- | ----------------------------------------------------- |
| Hiển thị sản phẩm | Ảnh 2D tĩnh 4-6 tấm       | Trình xem 3D tương tác 360° với zoom cận cảnh sợi vải |
| Trải nghiệm       | Giao diện mẫu chuẩn hóa   | UX tùy chỉnh theo Industrial Design Language          |
| Mua sắm ban đêm   | Giao diện sáng chói mắt   | Dark Mode tối ưu với màu Amber dễ chịu                |
| Thông tin         | Mô tả văn bản đơn giản    | Dashboard thông số kỹ thuật chuẩn Khoa học Vật liệu   |
| Tin cậy           | Đánh giá từ người dùng    | Chứng nhận QC + Minh bạch dữ liệu vải                 |

# 2\. AI LÀ USER (ĐỐI TƯỢNG SỬ DỤNG)

## 2.1. Các loại User trong hệ thống

| **Loại User**         | **Mô tả**                                   | **Đối tượng cụ thể**                     |
| --------------------- | ------------------------------------------- | ---------------------------------------- |
| Customer (Khách hàng) | Người mua hàng trên website và mobile       | Gen Z, Gen Alpha, Gen Y toàn cầu         |
| Super Admin           | Quản trị viên cao nhất, toàn quyền hệ thống | Chủ doanh nghiệp / CTO                   |
| Staff - Kho           | Nhân viên kho vận                           | Chỉ xem đơn hàng & tồn kho, đổi trả hàng |
| Staff - Marketing     | Nhân viên Marketing                         | Xem báo cáo & tạo khuyến mãi             |
| Staff - Kế toán       | Nhân viên Kế toán                           | Xem báo cáo, chi phí vận hành            |
| Staff - CSKH          | Nhân viên chăm sóc khách hàng               | Xem đơn hàng & chat với khách            |
| Affiliate Partner     | Đối tác tiếp thị liên kết (KOL/KOC)         | Xem dashboard hiệu quả & hoa hồng        |

## 2.2. Phân quyền (Role-Based Access)

Hệ thống phân quyền theo vai trò, mỗi vai trò có quyền truy cập khác nhau. Mọi thao tác đều được ghi Audit Log để tra soát.

| **Vai trò** | **Sản phẩm** | **Đơn hàng** | **Báo cáo** | **Marketing** | **Cài đặt** |
| ----------- | ------------ | ------------ | ----------- | ------------- | ----------- |
| Super Admin | Full         | Full         | Full        | Full          | Full        |
| Kho         | Xem          | Xử lý        | Không       | Không         | Không       |
| Marketing   | Xem          | Xem          | Full        | Full          | Không       |
| CSKH        | Xem          | Xem + Chat   | Không       | Không         | Không       |

# 3\. USER FLOW CHÍNH

## 3.1. Customer Flow - Mua hàng

Luồng chính từ lúc khách hàng truy cập đến khi hoàn tất đơn hàng:

Trang chủ (Hero + Element Navigation)

↓

Trang Danh mục (PLP) - Filter / Sort / Infinite Scroll

↓

Trang Chi tiết sản phẩm (PDP) - 3D Viewer / Chọn Size-Màu / Tech Specs

↓

Thêm vào Giỏ hàng (Slide-in Cart Panel)

↓

Thanh toán (Single-Page Checkout) - Thông tin + Vận chuyển + Payment

↓

Xác nhận đơn hàng + Theo dõi giao hàng

## 3.2. Customer Flow - Đăng ký / Đăng nhập

- Khách có thể mua hàng không cần đăng ký (Guest Checkout).
- Đăng ký/Đăng nhập để theo dõi đơn hàng, tích điểm Loyalty, lưu Wishlist.
- Hệ thống Membership: Base Member → Scholar (>2tr) → Kinetic (>10tr).

## 3.3. Admin Flow - Quản lý đơn hàng

Quy trình Fulfillment tự động:

New → Verified → QC Passed → Packed → Shipping → Delivered

Ngoại lệ: QC Failed → Cancelled | Shipping → Returned → Refunded

Tự động gán ĐVVC (GHTK/GHN/Ahamove) theo khu vực khách hàng.

## 3.4. Admin Flow - Quản lý đa kênh (Omnichannel)

- Sync tồn kho 2 chiều với Shopee / Lazada / TikTok Shop.
- Đồng bộ đơn hàng về Admin để xử lý tập trung.
- Đẩy sản phẩm từ Admin lên các sàn (Bulk Push).
- Tích hợp Facebook/Instagram Shop + POS cho Pop-up Store.

# 4\. FEATURE LIST CHI TIẾT

## 4.1. STOREFRONT (Giao diện khách hàng)

### 4.1.1. Trang chủ (Homepage)

- Hero Section: Video/Ảnh toàn màn hình + Parallax + Slogan "FROM LAB TO LIFE"
- Element Navigation: 4 ô nguyên tố tương tác \[Ba\] \[Sc\] \[Ki\] \[Hm\] với hiệu ứng lật 3D
- Featured Products Grid: Bố cục Masonry + 3D tilt hover effect
- Social Proof: Huy hiệu "Engineered in Vietnam" + Dashboard minh bạch sản xuất
- Philosophy Section: 3 trụ cột (Nguyên bản, Tinh giản, Minh bạch)
- 3D Interactive Showcase: Scrollytelling (xoay model 3D theo cuộn trang, 400vh)
- Newsletter: Thu thập email với thông điệp "Join the Lab Report"
- System Marquee: Thanh thông báo chạy ngang (Free Shipping, Returns, v.v.)

### 4.1.2. Trang Danh mục sản phẩm (PLP)

- Sidebar Filter: Danh mục, Kích thước, Màu sắc, Công nghệ vải, Khoảng giá
- Lọc thời gian thực (AJAX, không reload trang)
- Lưu lịch sử lọc vào URL params (để chia sẻ link)
- Infinite Scroll (Intersection Observer API, tải 20 SP/lần)
- Sắp xếp: Mới nhất, Giá tăng/giảm, Bán chạy
- Responsive Grid: Desktop 4 cột / Tablet 2 cột / Mobile 1 cột
- Quick Add Modal: Chọn size nhanh từ thẻ sản phẩm

### 4.1.3. Trang Chi tiết sản phẩm (PDP)

- 3D Viewer (Three.js + React Three Fiber): Xoay 360°, Zoom 0.5x-3x, đổi màu realtime
- Chế độ Fabric Mode: Zoom cực cận bề mặt vải (macro lens effect)
- Wireframe Mode: Hiển thị cấu trúc wireframe với glow amber
- Fallback cho thiết bị yếu: Ảnh 2D chất lượng cao + CSS 3D transform
- Tab Tech Specs: GSM, thành phần vải, kiểu dệt, chứng nhận QC
- Tab Fit Guide: Bảng size tương tác + Máy tính "Find My Size"
- Tab Care: Icon giặt ủi chuẩn ISO 3758 + Video hướng dẫn
- Tab Reviews: Xếp hạng sao, lọc theo "Đã mua" / "Có ảnh", AI tóm tắt
- Tín hiệu tin cậy: Freeship >500K, Flash Deal countdown, Social Proof, Low Stock Alert, Best Seller badge

### 4.1.4. Giỏ hàng & Thanh toán

- Giỏ hàng Mini: Slide-in panel từ bên phải, thanh tiến trình Freeship, gợi ý mua kèm
- Single-Page Checkout (Desktop): Thông tin + Vận chuyển + Thanh toán trên 1 trang
- Multi-Step Wizard (Mobile): 4 bước với thanh tiến trình + CTA sticky
- Phương thức thanh toán: COD, Chuyển khoản, Momo/ZaloPay, Thẻ Visa/Master (OnePay/VNPAY)
- Buy Now Pay Later: Fundiin / Kredivo
- Thanh toán nhanh: Apple Pay / Google Pay
- Tự động điền địa chỉ cascade (Tỉnh → Quận → Phường) qua API GHN/GHTK
- Yếu tố tin cậy: SSL badge, đổi trả, chat hỗ trợ

### 4.1.5. Tài khoản khách hàng

- Đăng ký / Đăng nhập (Email + Mật khẩu)
- Quản lý thông tin cá nhân, địa chỉ giao hàng
- Lịch sử đơn hàng + Theo dõi vận chuyển
- Wishlist (Lưu sản phẩm yêu thích)
- Elementa Rewards: Tích điểm, đổi voucher
- Hạng thành viên: Base → Scholar → Kinetic

### 4.1.6. Giao diện chung

- Dark Mode / Light Mode toggle
- Đa ngôn ngữ: Tiếng Việt + Tiếng Anh
- Responsive: Desktop (12 cột) / Tablet (8 cột) / Mobile (4 cột)
- Reactive Navigation: Thu gọn thành Atomic Logo khi cuộn
- ScrollReveal animation (fade-in, slide-up, parallax)
- Search sản phẩm

## 4.2. ADMIN PANEL (Hệ thống quản trị)

### 4.2.1. Dashboard Điều hành

- Real-time Metrics: Doanh thu live, Visitor online, Sự cố (Failed Payments, QC Rejects)
- To-Do List thông minh: Đơn chưa xác nhận, SP dưới định mức, Tin nhắn chưa trả lời
- Biểu đồ doanh thu, đơn hàng, traffic (Recharts)

### 4.2.2. Quản lý Sản phẩm (Advanced PIM)

- CRUD sản phẩm: Tên, mô tả, giá, ảnh, video, file 3D (.glb)
- Biến thể (Variants): Ma trận Size / Màu / Chất liệu / Year Collection
- Thuộc tính tùy chỉnh (Metafields): GSM, thành phần vải, độ co giãn, kiểu dệt, nhà máy
- Quản lý Digital Assets tập trung (ảnh 4K, video, 3D model)

### 4.2.3. Quản lý Tồn kho đa kho

- Cấu hình nhiều kho: Kho Tổng HCM, Kho Hà Nội, Kho Đà Nẵng
- Phiếu chuyển hàng (Stock Transfer) giữa các kho
- Kiểm kê bằng quét Barcode/QR
- Dự báo nhập hàng dựa trên Sales velocity

### 4.2.4. Quản lý Đơn hàng & Vận chuyển

- Workflow: New → Verified → QC Passed → Packed → Shipping → Delivered
- Tự động gán ĐVVC (GHTK/GHN/Ahamove) tối ưu phí/tốc độ
- In vận đơn hàng loạt (A6/A7)
- Quản lý Hoàn/Hủy (RMA): đổi trả, hoàn tiền, nhập kho hàng hoàn
- Đối soát COD tự động

### 4.2.5. Đa kênh (Omnichannel)

- Sync 2 chiều tồn kho + đơn hàng: Shopee, Lazada, TikTok Shop
- Bulk Push sản phẩm lên sàn
- Tích hợp Facebook/Instagram Shop
- Chốt đơn tự động qua livestream comment
- POS cho Pop-up Store (iPad app, quét barcode, in hóa đơn)

### 4.2.6. Thanh toán (Payment Gateway)

- Momo, ZaloPay (QR Code động)
- Thẻ ATM/Visa/Master qua OnePay/VNPAY
- Buy Now Pay Later: Fundiin/Kredivo
- Đối soát COD từ ĐVVC

### 4.2.7. Quản lý Tài chính

- Quản lý thu nhập từ các đơn hàng đã thanh toán
- Quản lý chi phí chi trả cho các bên liên quan
- Quản lý chi phí sản xuất
- Quản lý hóa đơn
- Báo cáo tài chính

### 4.2.78. Marketing & Tăng trưởng

- Mã giảm giá: Theo % hoặc số tiền, áp dụng cho SP/BST/VIP, giới hạn lượt dùng
- Auto Discount: Mua X tặng Y, Combo, Tiered Discount, Flash Sale
- Elementa Rewards: Tích điểm 1đ/100K, đổi voucher/quà
- Hạng thành viên: Base → Scholar → Kinetic
- Phân nhóm khách hàng (Segmentation) cho Facebook Ads
- Affiliate: Link liên kết cho KOL/KOC, hoa hồng tự động, dashboard Partner

### 4.2.9. Báo cáo & Phân tích

- Báo cáo Lãi/Lỗ (P&L): Doanh thu - (Giá vốn + Phí ship + Phí sàn + Marketing)
- Báo cáo Bán hàng: Theo kênh, nhân viên, khu vực
- Báo cáo Tồn kho: Quay vòng vốn, Dead stock, Giá trị tồn kho realtime
- Tích hợp Google Analytics 4 + Facebook Pixel (sự kiện e-commerce)

### 4.2.9. Cài đặt hệ thống

- Tên miền & SSL
- Phân quyền nhân viên (Super Admin, Kho, Marketing, CSKH)
- Nhật ký hoạt động (Audit Log)

# 5\. YÊU CẦU DESIGN (UX/UI & FIGMA)

## 5.1. Phong cách thiết kế

Swiss-Tech Minimalism - Tối giản kiểu Thụy Sĩ kết hợp Công nghệ. Lấy cảm hứng từ Gucci, Dior, Miu Miu. 6 nguyên tắc cốt lõi:

- Khoảng trắng là sự sang trọng: Tỷ lệ khoảng trắng 40-60%, padding 80-120px giữa các section.
- Phân cấp thị giác qua Typography: Tiêu đề lớn 64-96px, thang tỷ lệ 1.25.
- Ưu tiên hình ảnh chất lượng cao: Full-bleed, min 2000px, nhiếp ảnh chuyên nghiệp.
- Điều hướng tối giản: Header cố định <5 mục, hamburger menu cho phụ.
- Hoạt ảnh tinh tế: Fade-in, slide-up, micro-interactions (300-500ms).
- Dark Mode First: Tối ưu OLED, giảm mỏi mắt ban đêm.

## 5.2. Bảng màu (Color Palette)

| **Token**      | **Dark Mode**          | **Light Mode**      | **Sử dụng**           |
| -------------- | ---------------------- | ------------------- | --------------------- |
| background     | #0A0A0A (Đen thuần)    | #FAFAFA (Off-white) | Nền chính             |
| surface        | #1A1A1A (Than chì)     | #FFFFFF (Trắng)     | Bề mặt thẻ, container |
| primary        | #D4AF37 (Vàng Amber)   | #D4AF37             | Màu chủ đạo, Nút CTA  |
| text-primary   | #FFFFFF (Trắng)        | #1A1A1A (Đen)       | Văn bản chính         |
| text-secondary | #A0A0A0 (Xám 62%)      | #666666             | Văn bản phụ           |
| border         | rgba(255,255,255,0.08) | rgba(0,0,0,0.08)    | Đường viền            |
| hyperlink      | #0000FF                | #0000FF             | Liên kết tương tác    |

## 5.3. Màu theo Element

| **Element** | **Code** | **Màu Hex**     | **Mô tả**            |
| ----------- | -------- | --------------- | -------------------- |
| Base        | \[Ba\]   | #9CA3AF (Gray)  | Cốt lõi hàng ngày    |
| Scholar     | \[Sc\]   | #60A5FA (Blue)  | Học thuật / Công sở  |
| Kinetic     | \[Ki\]   | #F87171 (Red)   | Vận động / Hiệu suất |
| Home        | \[Hm\]   | #4ADE80 (Green) | Phục hồi / Tại gia   |

## 5.4. Typography System

| **Role**   | **Font**             | **Size** | **Ứng dụng**              |
| ---------- | -------------------- | -------- | ------------------------- |
| Display    | Univers Next / Inter | 76.3px   | Tiêu đề Hero Banner       |
| H1         | Univers Next / Inter | 61.0px   | Tiêu đề trang             |
| H2         | Univers Next / Inter | 48.8px   | Tiêu đề Section           |
| H3         | Univers Next / Inter | 31.3px   | Tên sản phẩm              |
| Body       | Univers Next / Inter | 16.0px   | Văn bản nội dung          |
| Caption    | Univers Next / Inter | 12.8px   | Chú thích                 |
| Code/Specs | JetBrains Mono       | 14.0px   | Mã SKU, thông số kỹ thuật |

## 5.5. Grid & Spacing

| **Thiết bị** | **Grid** | **Max-width** | **Spacing base**               |
| ------------ | -------- | ------------- | ------------------------------ |
| Desktop      | 12 cột   | 1440px        | 4px (đơn vị cơ sở)             |
| Tablet       | 8 cột    | 1024px        | 4, 8, 16, 24, 32, 48, 64, 96px |
| Mobile       | 4 cột    | 375px         |                                |

## 5.6. Các màn hình cần thiết kế Figma

Danh sách các màn hình cần Figma Design (Desktop + Mobile):

- Homepage (Hero, Elements, Featured, Philosophy, 3D Showcase, Footer)
- Product Listing Page (PLP) với Sidebar Filter
- Product Detail Page (PDP) với 3D Viewer placeholder
- Giỏ hàng Mini (Slide-in Panel)
- Checkout Page (Single-page desktop + Multi-step mobile)
- Login / Register
- Tài khoản khách hàng (Profile, Orders, Wishlist, Rewards)
- Admin Dashboard
- Admin - Quản lý Sản phẩm (List + Create/Edit)
- Admin - Quản lý Đơn hàng (List + Detail)
- Admin - Quản lý Tồn kho
- Admin - Khuyến mãi & Loyalty
- Admin - Báo cáo