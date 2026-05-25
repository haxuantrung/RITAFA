import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { Button, Drawer, ProgressBar, IconButton, ElementGlyph } from '@components/ui';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/utils/formatters';

const FREESHIP_THRESHOLD = 500_000;

/**
 * Slide-in mini cart — REQS §4.1.4.
 * Features:
 * - Freeship progress bar with delta-to-target hint
 * - Quantity steppers (atomic +/- design)
 * - Smart suggestions row (REQS: "gợi ý mua kèm")
 */
export function MiniCart() {
  const { isOpen, close, lines, remove, updateQty, subtotal, itemCount } = useCart();

  const remaining = Math.max(0, FREESHIP_THRESHOLD - subtotal);
  const freeshipProgress = (subtotal / FREESHIP_THRESHOLD) * 100;

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title={`Giỏ hàng · ${itemCount} sản phẩm`}
      side="right"
      width="lg"
      footer={
        lines.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Tạm tính</span>
                <span className="font-mono">{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Vận chuyển</span>
                <span className="font-mono">
                  {remaining === 0 ? <span className="text-success">Free</span> : '— tính ở Checkout'}
                </span>
              </div>
              <div className="my-2 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
              <div className="flex items-baseline justify-between">
                <span className="lab-label">Tổng</span>
                <span className="font-display text-xl font-semibold text-amber-500">
                  {formatVND(subtotal)}
                </span>
              </div>
            </div>
            <Link to="/checkout" onClick={close}>
              <Button fullWidth size="lg">
                Thanh toán
              </Button>
            </Link>
          </div>
        ) : undefined
      }
    >
      {/* Freeship progress */}
      {lines.length > 0 && (
        <div className="border-b border-black/[0.06] bg-amber-50/40 px-6 py-4 dark:border-white/[0.06] dark:bg-amber-500/[0.04]">
          <div className="mb-2 flex items-center gap-2 text-caption">
            <Truck className="h-3.5 w-3.5 text-amber-500" />
            {remaining === 0 ? (
              <span className="font-medium text-success">Đơn của bạn được FREESHIP</span>
            ) : (
              <span>
                Mua thêm <strong className="text-amber-600 dark:text-amber-400">{formatVND(remaining)}</strong> để được Freeship
              </span>
            )}
          </div>
          <ProgressBar value={Math.min(100, freeshipProgress)} tone="amber" thickness="thin" />
        </div>
      )}

      <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {lines.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-800">
              <ShoppingBag className="h-8 w-8 text-muted" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-lg font-medium">Giỏ hàng trống</h4>
              <p className="text-sm text-muted">Khám phá Year Collection để bắt đầu.</p>
            </div>
            <Link to="/shop" onClick={close}>
              <Button variant="outline">Xem sản phẩm</Button>
            </Link>
          </div>
        ) : (
          lines.map((line) => {
            const color = line.product.colors.find((c) => c.id === line.colorId);
            const size = line.product.sizes.find((s) => s.id === line.sizeId);
            return (
              <article key={line.id} className="flex gap-4 p-6">
                <Link to={`/shop/${line.product.slug}`} onClick={close} className="shrink-0">
                  <img
                    src={line.product.thumbnail}
                    alt={line.product.name}
                    className="h-24 w-20 rounded-lg object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <ElementGlyph code={line.product.element} variant="inline" />
                      <h5 className="mt-1 text-sm font-medium leading-snug">
                        {line.product.name}
                      </h5>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                        {color?.name} · {size?.label}
                      </p>
                    </div>
                    <IconButton
                      aria-label="Xoá"
                      size="sm"
                      onClick={() => remove(line.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-black/[0.08] dark:border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => updateQty(line.id, line.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-ink-100 dark:hover:bg-white/5"
                        aria-label="Giảm"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(line.id, line.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-ink-100 dark:hover:bg-white/5"
                        aria-label="Tăng"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-mono text-sm font-medium">
                      {formatVND(line.product.price * line.quantity)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </Drawer>
  );
}
