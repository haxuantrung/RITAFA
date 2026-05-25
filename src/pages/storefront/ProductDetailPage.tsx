import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Zap,
} from 'lucide-react';
import {
  Badge,
  Button,
  ElementGlyph,
  Rating,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/ui';
import { ProductViewer3D } from '@components/product/ProductViewer3D';
import { TechSpecsDashboard } from '@components/product/TechSpecsDashboard';
import { FitGuide } from '@components/product/FitGuide';
import { ReviewsTab } from '@components/product/ReviewsTab';
import { ProductCard } from '@components/product/ProductCard';
import { findProductBySlug, PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatCountdown, formatVND } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const CARE_LABELS = {
  wash30: 'Giặt máy 30°C',
  noBleach: 'Không tẩy',
  tumbleLow: 'Sấy nhiệt thấp',
  ironLow: 'Là nhiệt thấp',
  noDryClean: 'Không giặt khô',
} as const;

/**
 * Product Detail Page — the brand showcase.
 * Implements REQS §4.1.3 entirely:
 *  - 3D Viewer with mode toggle (Standard / Fabric / Wireframe)
 *  - Color + Size selection
 *  - Trust signals (Freeship, Flash countdown, Low stock, Best seller)
 *  - Tab system: Tech Specs · Fit · Care · Reviews
 */
export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? findProductBySlug(slug) : undefined;
  const { add, open: openCart } = useCart();

  const [colorId, setColorId] = useState(product?.colors[0]?.id ?? '');
  const [sizeId, setSizeId] = useState<string>('');
  const [qty, setQty] = useState(1);

  const activeColor = useMemo(
    () => product?.colors.find((c) => c.id === colorId) ?? product?.colors[0],
    [product, colorId],
  );

  const countdown = product?.flashDealEndsAt
    ? formatCountdown(product.flashDealEndsAt)
    : null;

  if (!product) {
    return (
      <div className="mx-auto max-w-screen-md px-6 py-32 text-center">
        <h2 className="font-display text-3xl font-semibold">Sản phẩm không tồn tại</h2>
        <p className="mt-2 text-muted">Có thể nó đã bị xoá hoặc URL không đúng.</p>
        <Link to="/shop" className="mt-6 inline-block">
          <Button>Về danh mục</Button>
        </Link>
      </div>
    );
  }

  const isSale = product.originalPrice && product.originalPrice > product.price;
  const relatedProducts = PRODUCTS.filter(
    (p) => p.element === product.element && p.id !== product.id,
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!sizeId) return;
    add(product, colorId, sizeId, qty);
  };

  return (
    <div className="bg-white dark:bg-ink-950">
      {/* Breadcrumb */}
      <div className="border-b border-black/[0.06] dark:border-white/[0.06]">
        <nav className="mx-auto flex max-w-screen-2xl items-center gap-1.5 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted sm:px-6 lg:px-10">
          <Link to="/" className="hover:text-amber-500">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-amber-500">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/shop?element=${product.element}`} className="hover:text-amber-500">
            [{product.element}]
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink-700 dark:text-ink-200">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <article className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:py-12">
        {/* Left: Viewer */}
        <div className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <ProductViewer3D product={product} activeColorImg={activeColor?.imageUrl ?? product.images[0]} />

          {/* Thumbnail strip */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-100 transition-all hover:ring-2 hover:ring-amber-500 dark:bg-ink-800"
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: details + actions */}
        <div className="space-y-7">
          {/* Element + sku + share */}
          <div className="flex items-start justify-between">
            <ElementGlyph code={product.element} variant="pill" />
            <div className="flex items-center gap-2 font-mono text-caption text-muted">
              <span>{product.sku}</span>
              <button aria-label="Chia sẻ" className="hover:text-amber-500">
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="font-mono text-sm text-muted">{product.subtitle}</p>
          </div>

          {/* Rating + sold */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Rating value={product.rating} showValue reviewCount={product.reviewCount} />
            <span className="inline-flex items-center gap-1 text-muted">
              <Users className="h-3.5 w-3.5" />
              {product.soldCount.toLocaleString('vi-VN')} đã bán
            </span>
            {product.isBestSeller && (
              <Badge tone="amber" uppercase>★ Best Seller</Badge>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2 border-y border-black/[0.06] py-5 dark:border-white/[0.06]">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-semibold tracking-tight text-amber-500">
                {formatVND(product.price)}
              </span>
              {isSale && (
                <>
                  <span className="font-mono text-base text-muted line-through">
                    {formatVND(product.originalPrice!)}
                  </span>
                  <Badge tone="danger" uppercase>
                    −{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                  </Badge>
                </>
              )}
            </div>
            {countdown && !countdown.expired && (
              <div className="inline-flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-1.5 text-sm text-danger">
                <Zap className="h-4 w-4" />
                <span>Flash Deal kết thúc trong</span>
                <span className="font-mono font-semibold">
                  {countdown.hours}:{countdown.minutes}:{countdown.seconds}
                </span>
              </div>
            )}
          </div>

          {/* Color picker */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="lab-label">Màu sắc</p>
              <span className="font-mono text-caption text-muted">{activeColor?.name}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.name}
                  onClick={() => setColorId(c.id)}
                  className={cn(
                    'h-11 w-11 rounded-full ring-1 ring-inset transition-all',
                    colorId === c.id
                      ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-transparent'
                      : 'ring-ink-200 hover:ring-amber-500 dark:ring-ink-600',
                  )}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size picker */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="lab-label">Kích thước</p>
              <button className="font-mono text-[10px] uppercase tracking-widest text-amber-500 hover:underline">
                Bảng size →
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((s) => {
                const isSel = sizeId === s.id;
                const disabled = s.stock === 0;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => !disabled && setSizeId(s.id)}
                    disabled={disabled}
                    className={cn(
                      'relative h-12 rounded-lg border font-mono text-sm uppercase transition-all',
                      disabled && 'cursor-not-allowed opacity-40',
                      !disabled && !isSel && 'border-black/[0.08] hover:border-amber-500 dark:border-white/[0.08]',
                      isSel && 'border-amber-500 bg-amber-500 text-ink-900',
                    )}
                  >
                    {s.label}
                    {disabled && (
                      <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-current" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to cart row */}
          <div className="flex gap-3">
            <div className="inline-flex h-14 items-center rounded-full border border-black/[0.08] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-full w-12 text-lg"
                aria-label="Giảm"
              >
                −
              </button>
              <span className="w-10 text-center font-mono text-base">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="h-full w-12 text-lg"
                aria-label="Tăng"
              >
                +
              </button>
            </div>
            <Button
              size="xl"
              fullWidth
              disabled={!sizeId}
              onClick={handleAddToCart}
              rightIcon={<ChevronRight className="h-5 w-5" />}
            >
              {sizeId ? 'Thêm vào giỏ' : 'Chọn size'}
            </Button>
            <Button
              size="xl"
              variant="outline"
              aria-label="Wishlist"
              className="aspect-square px-0"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Buy now */}
          <Button
            size="lg"
            variant="secondary"
            fullWidth
            disabled={!sizeId}
            onClick={() => {
              handleAddToCart();
              openCart();
            }}
          >
            Mua ngay với Apple Pay
          </Button>

          {/* Trust signals */}
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Truck, label: 'Freeship đơn từ 500K', sub: '2–3 ngày HCM/HN' },
              { icon: ShieldCheck, label: '30 ngày đổi trả', sub: 'Miễn phí kiểm tra' },
              { icon: Clock, label: 'Chốt đơn trước 14h', sub: 'Giao ngay trong ngày' },
              { icon: Sparkles, label: 'Tích điểm Elementa', sub: '+27 điểm cho đơn này' },
            ].map((t) => (
              <li key={t.label} className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-3 dark:border-white/[0.06] dark:bg-ink-700">
                <t.icon className="mt-0.5 h-4 w-4 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-caption text-muted">{t.sub}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Short description */}
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>
        </div>
      </article>

      {/* Tabs section */}
      <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-10">
        <Tabs defaultValue="specs" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList>
              <TabsTrigger value="specs">Tech Specs</TabsTrigger>
              <TabsTrigger value="fit">Fit Guide</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="reviews">Reviews · {product.reviewCount}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="specs">
            <TechSpecsDashboard spec={product.fabric} />
          </TabsContent>

          <TabsContent value="fit">
            <FitGuide />
          </TabsContent>

          <TabsContent value="care">
            <div className="rounded-3xl border border-black/[0.06] bg-white p-8 dark:border-white/[0.06] dark:bg-ink-700">
              <p className="lab-label mb-4">Care Instructions · ISO 3758</p>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {product.careIcons.map((c) => (
                  <div key={c} className="flex items-center gap-3 rounded-xl border border-black/[0.06] p-4 dark:border-white/[0.06]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 font-mono text-lg dark:bg-ink-800">
                      {c === 'wash30' && '30°'}
                      {c === 'noBleach' && '⌀'}
                      {c === 'tumbleLow' && '◍'}
                      {c === 'ironLow' && '·'}
                      {c === 'noDryClean' && '⊘'}
                    </div>
                    <span className="text-sm">{CARE_LABELS[c]}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-caption text-muted">
                * Khuyến nghị giặt mặt trái, không dùng nước xả vải mạnh để bảo toàn coating DWR (nếu có).
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab product={product} />
          </TabsContent>
        </Tabs>
      </section>

      {/* You may also like */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-black/[0.06] bg-ink-50 py-20 dark:border-white/[0.06] dark:bg-ink-900 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
            <div className="mb-8 space-y-1">
              <p className="lab-label">// Related · Same Element</p>
              <h3 className="font-display text-h3 font-semibold tracking-tight">Khám phá thêm [{product.element}]</h3>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
