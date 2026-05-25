import { Link } from 'react-router-dom';
import { ArrowRight, Box, CheckCircle2, Package, Truck } from 'lucide-react';
import { Badge, Card } from '@components/ui';
import { ORDERS } from '@/data/orders';
import { formatDate, formatVND } from '@/utils/formatters';
import type { OrderStatus } from '@/types';

const STEPS: { key: OrderStatus; label: string; icon: typeof Package }[] = [
  { key: 'new', label: 'Đã đặt', icon: Package },
  { key: 'verified', label: 'Xác nhận', icon: CheckCircle2 },
  { key: 'qc_passed', label: 'QC pass', icon: CheckCircle2 },
  { key: 'packed', label: 'Đóng gói', icon: Box },
  { key: 'shipping', label: 'Đang giao', icon: Truck },
  { key: 'delivered', label: 'Hoàn tất', icon: CheckCircle2 },
];

function OrderTimeline({ status }: { status: OrderStatus }) {
  const activeIdx = STEPS.findIndex((s) => s.key === status);
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const reached = i <= activeIdx;
        const isCurrent = i === activeIdx && status !== 'delivered';
        return (
          <div key={s.key} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  reached
                    ? 'bg-amber-500 text-ink-900'
                    : 'bg-ink-100 text-muted dark:bg-ink-800'
                } ${isCurrent ? 'animate-glow-pulse' : ''}`}
              >
                <s.icon className="h-3.5 w-3.5" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-1 h-px flex-1 ${reached ? 'bg-amber-500' : 'bg-ink-200 dark:bg-ink-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function AccountOrdersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl font-semibold tracking-tight">Đơn hàng</h2>
        <p className="text-muted">Theo dõi tiến trình từ phòng QC tới cửa nhà bạn.</p>
      </header>

      <div className="space-y-4">
        {ORDERS.map((o) => (
          <Card key={o.id} padding="none">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] p-6 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-amber-500">{o.code}</span>
                <Badge tone={o.status === 'delivered' ? 'success' : o.status === 'qc_failed' ? 'danger' : 'amber'}>
                  {o.status.replace('_', ' ')}
                </Badge>
              </div>
              <span className="font-mono text-caption text-muted">{formatDate(o.createdAt)}</span>
            </div>

            <div className="p-6">
              {o.status !== 'qc_failed' && o.status !== 'cancelled' && (
                <div className="mb-6">
                  <OrderTimeline status={o.status} />
                </div>
              )}

              <div className="flex flex-wrap items-start justify-between gap-6">
                <ul className="flex-1 space-y-3">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <img src={it.thumbnail} alt="" className="h-14 w-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{it.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                          {it.color} · {it.size} · ×{it.quantity}
                        </p>
                      </div>
                      <span className="font-mono text-sm">{formatVND(it.unitPrice * it.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/[0.06] bg-ink-50 px-6 py-4 dark:border-white/[0.06] dark:bg-ink-800">
              <span className="lab-label">Tổng</span>
              <div className="flex items-center gap-4">
                <span className="font-display text-xl font-semibold text-amber-500">
                  {formatVND(o.total)}
                </span>
                <Link
                  to={`/account/orders/${o.id}`}
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-amber-500 hover:underline"
                >
                  Chi tiết <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
