import { useState } from 'react';
import { Download, Filter, Printer, Search } from 'lucide-react';
import { Badge, Button, Card } from '@components/ui';
import { ORDERS } from '@/data/orders';
import { formatDate, formatVND } from '@/utils/formatters';
import type { OrderStatus } from '@/types';

const STATUS_FILTERS: { key: OrderStatus | 'all'; label: string; count?: number }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'new', label: 'Mới' },
  { key: 'verified', label: 'Đã xác nhận' },
  { key: 'qc_passed', label: 'QC pass' },
  { key: 'packed', label: 'Đóng gói' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Đã giao' },
  { key: 'qc_failed', label: 'QC lỗi' },
];

const STATUS_TONES: Record<OrderStatus, 'warning' | 'success' | 'info' | 'danger' | 'amber'> = {
  new: 'warning',
  verified: 'info',
  qc_passed: 'info',
  qc_failed: 'danger',
  packed: 'info',
  shipping: 'amber',
  delivered: 'success',
  cancelled: 'danger',
  returned: 'warning',
  refunded: 'warning',
};

const CHANNEL_TAGS: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile App',
  shopee: 'Shopee',
  lazada: 'Lazada',
  tiktok: 'TikTok',
  pos: 'POS',
};

export function AdminOrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filtered = filter === 'all' ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <div className="space-y-5 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lab-label">// Operations</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Đơn hàng</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={<Printer className="h-4 w-4" />}>
            In vận đơn hàng loạt
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters row */}
      <Card padding="md">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((f) => {
            const count = f.key === 'all' ? ORDERS.length : ORDERS.filter((o) => o.status === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  active
                    ? 'bg-ink-900 text-white dark:bg-amber-500 dark:text-ink-900'
                    : 'bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-200'
                }`}
              >
                {f.label}
                <span className="rounded-full bg-white/20 px-1.5 py-px text-[10px]">{count}</span>
              </button>
            );
          })}

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                placeholder="Mã đơn, khách hàng..."
                className="h-9 rounded-lg border border-black/[0.06] bg-transparent pl-8 pr-3 text-sm outline-none focus:border-amber-500 dark:border-white/[0.06]"
              />
            </div>
            <Button variant="outline" size="sm" leftIcon={<Filter className="h-3.5 w-3.5" />}>
              Lọc nâng cao
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-black/[0.06] bg-ink-50 text-left dark:border-white/[0.06] dark:bg-ink-800">
              <tr className="font-mono text-[10px] uppercase tracking-widest text-muted">
                <th className="p-4"><input type="checkbox" className="rounded border-ink-300 dark:border-ink-600" /></th>
                <th className="p-4">Mã đơn</th>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Items</th>
                <th className="p-4">Kênh</th>
                <th className="p-4">Thanh toán</th>
                <th className="p-4 text-right">Tổng</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Ngày</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {filtered.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-amber-50/40 dark:hover:bg-amber-500/[0.03]">
                  <td className="p-4"><input type="checkbox" className="rounded border-ink-300 dark:border-ink-600" /></td>
                  <td className="p-4">
                    <a href={`#order-${o.id}`} className="font-mono text-xs text-amber-500 hover:underline">
                      {o.code}
                    </a>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {o.customer.avatar && (
                        <img src={o.customer.avatar} alt="" className="h-7 w-7 rounded-full" />
                      )}
                      <div>
                        <p className="font-medium">{o.customer.name}</p>
                        <p className="text-caption text-muted">{o.customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {o.items.slice(0, 3).map((it, i) => (
                        <img key={i} src={it.thumbnail} alt="" className="h-8 w-8 rounded-md border-2 border-white object-cover dark:border-ink-700" />
                      ))}
                      {o.items.length > 3 && (
                        <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-white bg-ink-100 font-mono text-[10px] dark:border-ink-700 dark:bg-ink-800">
                          +{o.items.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge tone="neutral" uppercase>{CHANNEL_TAGS[o.channel]}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest">{o.payment.method}</span>
                      <Badge tone={o.payment.paid ? 'success' : 'warning'}>
                        {o.payment.paid ? 'Đã thanh toán' : 'Chờ TT'}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{formatVND(o.total)}</td>
                  <td className="p-4">
                    <Badge tone={STATUS_TONES[o.status]}>{o.status.replace('_', ' ')}</Badge>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted">{formatDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
