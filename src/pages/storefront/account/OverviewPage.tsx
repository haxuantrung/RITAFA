import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Package, Sparkles } from 'lucide-react';
import { Badge, Button, Card, Rating } from '@components/ui';
import { CURRENT_USER } from '@/data/users';
import { ORDERS } from '@/data/orders';
import { PRODUCTS } from '@/data/products';
import { formatDate, formatVND } from '@/utils/formatters';

const STATUS_COPY: Record<string, { label: string; tone: 'success' | 'warning' | 'info' | 'amber' }> = {
  new: { label: 'Mới', tone: 'warning' },
  verified: { label: 'Đã xác nhận', tone: 'info' },
  qc_passed: { label: 'QC OK', tone: 'info' },
  packed: { label: 'Đã đóng gói', tone: 'info' },
  shipping: { label: 'Đang giao', tone: 'amber' },
  delivered: { label: 'Đã giao', tone: 'success' },
};

export function AccountOverviewPage() {
  const user = CURRENT_USER;
  const recentOrders = ORDERS.slice(0, 3);
  const wishlistProducts = PRODUCTS.filter((p) => user.wishlist.includes(p.id));

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Tổng đơn', value: ORDERS.length, sub: 'năm 2026' },
          { label: 'Điểm Elementa', value: user.membership.points, sub: 'có thể đổi voucher' },
          { label: 'Wishlist', value: user.wishlist.length, sub: 'sản phẩm đã lưu' },
        ].map((s) => (
          <Card key={s.label}>
            <p className="lab-label">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
              {s.value.toLocaleString('vi-VN')}
            </p>
            <p className="mt-1 text-caption text-muted">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Recent orders */}
      <Card padding="none">
        <div className="flex items-center justify-between border-b border-black/[0.06] p-6 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-amber-500" />
            <h3 className="font-display text-lg font-semibold">Đơn hàng gần đây</h3>
          </div>
          <Link to="/account/orders" className="font-mono text-[10px] uppercase tracking-widest text-amber-500 hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
          {recentOrders.map((o) => (
            <li key={o.id}>
              <Link to={`/account/orders/${o.id}`} className="flex items-center gap-4 p-6 transition-colors hover:bg-ink-50 dark:hover:bg-white/[0.02]">
                <div className="flex shrink-0 -space-x-2">
                  {o.items.slice(0, 3).map((it, i) => (
                    <img
                      key={i}
                      src={it.thumbnail}
                      alt=""
                      className="h-12 w-12 rounded-lg border-2 border-white object-cover dark:border-ink-700"
                    />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-amber-500">{o.code}</span>
                    <Badge tone={STATUS_COPY[o.status]?.tone ?? 'neutral'}>{STATUS_COPY[o.status]?.label ?? o.status}</Badge>
                  </div>
                  <p className="mt-1 truncate text-sm">
                    {o.items.map((it) => it.name).join(' · ')}
                  </p>
                  <p className="font-mono text-caption text-muted">{formatDate(o.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold">{formatVND(o.total)}</p>
                  <ArrowRight className="mt-1 ml-auto h-4 w-4 text-muted" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {/* Reward call-to-action */}
      <Card className="overflow-hidden bg-gradient-to-br from-amber-500/10 to-transparent">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2">
            <Badge tone="amber" icon={<Sparkles className="h-3 w-3" />} uppercase>
              Sắp lên Kinetic
            </Badge>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Còn {formatVND(10_000_000 - user.membership.spentYTD)} nữa để lên tier <span className="text-element-kinetic">[Ki] Kinetic</span>
            </h3>
            <p className="text-muted">Nhận stylist riêng, mời sự kiện kín và đổi trả ưu tiên 30 ngày.</p>
          </div>
          <Link to="/shop">
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Tiếp tục shopping</Button>
          </Link>
        </div>
      </Card>

      {/* Wishlist preview */}
      <Card padding="none">
        <div className="flex items-center justify-between border-b border-black/[0.06] p-6 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-amber-500" />
            <h3 className="font-display text-lg font-semibold">Wishlist</h3>
          </div>
          <Link to="/account/wishlist" className="font-mono text-[10px] uppercase tracking-widest text-amber-500 hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {wishlistProducts.slice(0, 3).map((p) => (
            <Link key={p.id} to={`/shop/${p.slug}`} className="group flex gap-3 rounded-xl border border-black/[0.06] p-3 transition-colors hover:border-amber-500 dark:border-white/[0.06]">
              <img src={p.thumbnail} alt="" className="h-16 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <Rating value={p.rating} size="sm" />
                <p className="mt-1 font-mono text-xs text-amber-500">{formatVND(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
