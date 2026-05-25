import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
  Zap,
} from 'lucide-react';
import { Badge, Button, Card, Input } from '@components/ui';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/utils/formatters';
import { cn } from '@/utils/cn';

type Step = 'contact' | 'shipping' | 'payment' | 'review';

const STEPS: { key: Step; label: string }[] = [
  { key: 'contact', label: 'Liên hệ' },
  { key: 'shipping', label: 'Vận chuyển' },
  { key: 'payment', label: 'Thanh toán' },
  { key: 'review', label: 'Xác nhận' },
];

const PAYMENT_METHODS = [
  { id: 'momo', label: 'MoMo', sub: 'QR code động', icon: Smartphone, recommended: true },
  { id: 'zalopay', label: 'ZaloPay', sub: 'QR code động', icon: Smartphone },
  { id: 'visa', label: 'Thẻ Visa / Master', sub: 'OnePay · VNPAY', icon: CreditCard },
  { id: 'apple_pay', label: 'Apple Pay', sub: 'Touch ID / Face ID', icon: Wallet },
  { id: 'fundiin', label: 'Fundiin', sub: 'Mua trước trả sau · 0% lãi', icon: Wallet },
  { id: 'cod', label: 'COD', sub: 'Thanh toán khi nhận', icon: Truck },
];

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard', sub: 'GHN · 2–3 ngày', price: 0, eta: '27–28/05/2026' },
  { id: 'express', label: 'Express', sub: 'Ahamove · trong 4h', price: 49_000, eta: 'Hôm nay 19:00' },
  { id: 'pickup', label: 'Pickup tại Flagship', sub: 'TP.HCM · Q.1', price: 0, eta: 'Trong 1 giờ' },
];

/**
 * Checkout — REQS §4.1.4.
 * - Desktop: Single-page (3 columns shown side-by-side via sections)
 * - Mobile: Multi-step wizard with sticky CTA + progress
 *
 * Renders both layouts via the same data; layout choice is purely CSS.
 */
export function CheckoutPage() {
  const { lines, subtotal, itemCount, clear } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('contact');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [voucher, setVoucher] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);

  const shippingFee = SHIPPING_METHODS.find((s) => s.id === shippingMethod)?.price ?? 0;
  const discount = voucherApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingFee - discount;

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const handleNext = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEPS.length) setStep(STEPS[nextIdx].key);
    else {
      clear();
      navigate('/checkout/success');
    }
  };

  const summaryCard = useMemo(
    () => (
      <Card variant="default" padding="md" className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Đơn hàng
          </h3>
          <Badge tone="neutral">{itemCount} sản phẩm</Badge>
        </div>

        <ul className="max-h-72 space-y-3 overflow-y-auto pr-1">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-ink-100 dark:bg-ink-800">
                <img src={line.product.thumbnail} alt="" className="h-full w-full object-cover" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[10px] font-medium text-white dark:bg-amber-500 dark:text-ink-900">
                  {line.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{line.product.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {line.product.colors.find((c) => c.id === line.colorId)?.name} ·{' '}
                  {line.product.sizes.find((s) => s.id === line.sizeId)?.label}
                </p>
                <p className="mt-0.5 font-mono text-xs">{formatVND(line.product.price * line.quantity)}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Voucher */}
        <div className="space-y-2">
          <p className="lab-label">Voucher / Gift card</p>
          <div className="flex gap-2">
            <Input
              placeholder="LABREPORT10"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              containerClassName="flex-1"
            />
            <Button
              variant="outline"
              size="md"
              onClick={() => voucher && setVoucherApplied(true)}
              disabled={!voucher || voucherApplied}
            >
              {voucherApplied ? '✓ Đã áp' : 'Áp dụng'}
            </Button>
          </div>
          {voucherApplied && (
            <p className="text-caption text-success">Voucher LABREPORT10 — Giảm 10% đơn hàng.</p>
          )}
        </div>

        {/* Totals */}
        <div className="space-y-2 border-t border-black/[0.06] pt-4 text-sm dark:border-white/[0.06]">
          <div className="flex justify-between">
            <span className="text-muted">Tạm tính</span>
            <span className="font-mono">{formatVND(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Vận chuyển</span>
            <span className="font-mono">{shippingFee === 0 ? 'Free' : formatVND(shippingFee)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Giảm giá</span>
              <span className="font-mono">−{formatVND(discount)}</span>
            </div>
          )}
          <div className="mt-3 flex items-baseline justify-between border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
            <span className="lab-label">Tổng</span>
            <span className="font-display text-2xl font-semibold text-amber-500">
              {formatVND(total)}
            </span>
          </div>
        </div>

        {/* Trust */}
        <ul className="space-y-2 text-caption text-muted">
          <li className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-success" /> SSL bảo mật 256-bit
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-success" /> 30 ngày đổi trả không lý do
          </li>
        </ul>
      </Card>
    ),
    [lines, itemCount, subtotal, shippingFee, discount, total, voucher, voucherApplied],
  );

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-screen-md px-6 py-32 text-center">
        <h2 className="font-display text-3xl font-semibold">Giỏ hàng trống</h2>
        <p className="mt-2 text-muted">Khám phá sản phẩm trước khi thanh toán.</p>
        <Link to="/shop" className="mt-6 inline-block">
          <Button>Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ink-50 dark:bg-ink-950">
      {/* Header */}
      <header className="border-b border-black/[0.06] bg-white dark:border-white/[0.06] dark:bg-ink-900">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-10">
          <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted hover:text-amber-500">
            ← Quay về shop
          </Link>
          <h1 className="font-display text-lg font-semibold tracking-tight">Checkout</h1>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success">
            <Lock className="h-3 w-3" /> Secure
          </div>
        </div>
        {/* Mobile progress */}
        <div className="border-t border-black/[0.06] px-4 py-3 dark:border-white/[0.06] lg:hidden">
          <div className="flex items-center gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex flex-1 items-center gap-1.5">
                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors',
                    i <= stepIndex
                      ? 'bg-amber-500 text-ink-900'
                      : 'bg-ink-100 text-muted dark:bg-ink-800',
                  )}
                >
                  {i < stepIndex ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                <span className={cn('flex-1 text-caption', i === stepIndex && 'font-medium')}>{s.label}</span>
                {i < STEPS.length - 1 && <div className="h-px flex-1 bg-current opacity-20" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:px-10 lg:py-14">
        {/* Forms */}
        <div className="space-y-6">
          {/* Contact (always visible on desktop, step on mobile) */}
          <section
            className={cn(
              'space-y-4 rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700',
              'lg:block',
              step !== 'contact' && 'hidden',
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-semibold text-ink-900">
                1
              </span>
              <h3 className="font-display text-lg font-semibold">Liên hệ</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Họ và tên" placeholder="Nguyễn Minh Anh" defaultValue="Nguyễn Minh Anh" />
              <Input label="Số điện thoại" placeholder="+84 ..." defaultValue="+84 901 234 567" />
              <Input
                label="Email"
                type="email"
                placeholder="ban@email.com"
                defaultValue="minh.anh@gmail.com"
                containerClassName="sm:col-span-2"
              />
            </div>
            <label className="flex items-center gap-2 text-caption">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-ink-300 text-amber-500 focus:ring-amber-500 dark:border-ink-600 dark:bg-ink-800"
              />
              Gửi email cập nhật trạng thái đơn hàng
            </label>
          </section>

          {/* Shipping */}
          <section
            className={cn(
              'space-y-4 rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700',
              'lg:block',
              step !== 'shipping' && 'hidden',
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-semibold text-ink-900">
                2
              </span>
              <h3 className="font-display text-lg font-semibold">Địa chỉ giao</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Địa chỉ"
                placeholder="12 Lê Lợi"
                leftIcon={<MapPin className="h-4 w-4" />}
                containerClassName="sm:col-span-2"
                defaultValue="12 Lê Lợi"
              />
              <Input label="Tỉnh / Thành" defaultValue="TP. Hồ Chí Minh" />
              <Input label="Quận / Huyện" defaultValue="Quận 1" />
              <Input label="Phường / Xã" defaultValue="P. Bến Nghé" />
              <Input label="Ghi chú (tuỳ chọn)" placeholder="Giao giờ hành chính" />
            </div>

            <div className="space-y-2 pt-3">
              <p className="lab-label">Phương thức giao</p>
              <div className="grid gap-2">
                {SHIPPING_METHODS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShippingMethod(s.id)}
                    className={cn(
                      'flex items-center justify-between rounded-2xl border p-4 text-left transition-colors',
                      shippingMethod === s.id
                        ? 'border-amber-500 bg-amber-500/5'
                        : 'border-black/[0.06] hover:border-amber-500 dark:border-white/[0.06]',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
                          shippingMethod === s.id ? 'border-amber-500 bg-amber-500' : 'border-ink-300 dark:border-ink-600',
                        )}
                      >
                        {shippingMethod === s.id && <Check className="h-3 w-3 text-ink-900" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-caption text-muted">{s.sub} · ETA {s.eta}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm">
                      {s.price === 0 ? <span className="text-success">Free</span> : formatVND(s.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Payment */}
          <section
            className={cn(
              'space-y-4 rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700',
              'lg:block',
              step !== 'payment' && 'hidden',
            )}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-semibold text-ink-900">
                3
              </span>
              <h3 className="font-display text-lg font-semibold">Phương thức thanh toán</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {PAYMENT_METHODS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentMethod(p.id)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl border p-4 text-left transition-colors',
                    paymentMethod === p.id
                      ? 'border-amber-500 bg-amber-500/5'
                      : 'border-black/[0.06] hover:border-amber-500 dark:border-white/[0.06]',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <p.icon className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="flex items-center gap-2 text-sm font-medium">
                        {p.label}
                        {p.recommended && <Badge tone="amber" uppercase>Recommend</Badge>}
                      </p>
                      <p className="text-caption text-muted">{p.sub}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full border-2',
                      paymentMethod === p.id ? 'border-amber-500 bg-amber-500' : 'border-ink-300 dark:border-ink-600',
                    )}
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Review (mobile only) */}
          <section
            className={cn(
              'space-y-4 rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700',
              'lg:hidden',
              step !== 'review' && 'hidden',
            )}
          >
            <h3 className="font-display text-lg font-semibold">Xác nhận đơn hàng</h3>
            <p className="text-sm text-muted">
              Kiểm tra lại thông tin và bấm "Đặt hàng" để hoàn tất.
            </p>
            {summaryCard}
          </section>

          {/* Sticky mobile CTA */}
          <div className="sticky bottom-0 left-0 right-0 -mx-4 border-t border-black/[0.06] bg-white p-4 dark:border-white/[0.06] dark:bg-ink-900 lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="lab-label">Tổng</p>
                <p className="font-display text-xl font-semibold text-amber-500">{formatVND(total)}</p>
              </div>
              <Button onClick={handleNext} rightIcon={<ChevronRight className="h-4 w-4" />}>
                {step === 'review' ? 'Đặt hàng' : 'Tiếp tục'}
              </Button>
            </div>
          </div>

          {/* Desktop submit */}
          <div className="hidden lg:block">
            <Button
              size="xl"
              fullWidth
              onClick={() => {
                clear();
                navigate('/checkout/success');
              }}
              rightIcon={<Zap className="h-5 w-5" />}
            >
              Đặt hàng · {formatVND(total)}
            </Button>
            <p className="mt-3 text-center text-caption text-muted">
              Bằng việc đặt hàng, bạn đồng ý với <Link to="#" className="underline">Điều khoản</Link> &{' '}
              <Link to="#" className="underline">Chính sách bảo mật</Link> của RITAFA.
            </p>
          </div>
        </div>

        {/* Right column: summary (desktop sticky) */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">{summaryCard}</div>
        </aside>
      </div>
    </div>
  );
}

/**
 * Order confirmation page — REQS §3.1 final step.
 */
export function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex max-w-screen-md flex-col items-center gap-6 px-6 py-32 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
        <Check className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <p className="lab-label">// Order confirmed</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Cám ơn bạn.
          <br />
          <span className="text-gradient-amber">Đơn hàng đã được ghi nhận.</span>
        </h1>
        <p className="text-muted">
          Mã đơn: <span className="font-mono text-amber-500">RTF-20260525-A1B2</span>
        </p>
      </div>
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {[
          { label: 'Verified', sub: '12 phút nữa' },
          { label: 'QC Check', sub: 'Hôm nay 16:00' },
          { label: 'Shipping', sub: '27/05/2026' },
        ].map((s, i) => (
          <div key={s.label} className="rounded-2xl border border-black/[0.06] bg-white p-4 text-left dark:border-white/[0.06] dark:bg-ink-700">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
              0{i + 1} · {s.label}
            </p>
            <p className="mt-2 text-sm">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/account/orders">
          <Button>Theo dõi đơn hàng</Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    </div>
  );
}
