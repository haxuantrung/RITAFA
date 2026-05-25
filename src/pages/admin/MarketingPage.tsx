import { Calendar, Plus, Sparkles, Tag, Users } from 'lucide-react';
import { Badge, Button, Card } from '@components/ui';

const PROMOS = [
  { id: 'p1', code: 'LABREPORT10', type: 'Percent · 10%', scope: 'Toàn site', uses: 1024, max: 5000, ends: '31/05/2026', active: true },
  { id: 'p2', code: 'FREESHIP500', type: 'Freeship', scope: 'Đơn ≥500K', uses: 8932, max: 99999, ends: '∞', active: true },
  { id: 'p3', code: 'SCHOLAR-EXTRA', type: 'Percent · 15%', scope: 'Tier Scholar+', uses: 421, max: 2000, ends: '30/06/2026', active: true },
  { id: 'p4', code: 'FLASH-KI3', type: 'Amount · 200K', scope: '[Ki] only', uses: 1200, max: 1500, ends: '26/05/2026 23:59', active: true },
  { id: 'p5', code: 'BIRTHDAY10', type: 'Percent · 10%', scope: 'Birthday auto', uses: 348, max: 0, ends: 'Auto', active: true },
];

const SEGMENTS = [
  { id: 's1', name: 'New customers (7 ngày)', count: 318 },
  { id: 's2', name: 'Lapsed (60+ ngày không mua)', count: 1245 },
  { id: 's3', name: 'High-value (Kinetic tier)', count: 87 },
  { id: 's4', name: 'Wishlist [Ki] không mua', count: 2156 },
];

export function AdminMarketingPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lab-label">// Growth · Marketing</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Khuyến mãi & Tăng trưởng</h1>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Tạo voucher mới</Button>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Voucher đang chạy', value: '12', icon: Tag },
          { label: 'Đơn dùng voucher hôm nay', value: '47', icon: Sparkles },
          { label: 'Doanh thu ưu đãi', value: '12.4M₫', icon: Calendar },
          { label: 'Segments', value: '8', icon: Users },
        ].map((s) => (
          <Card key={s.label} padding="md">
            <s.icon className="h-4 w-4 text-amber-500" />
            <p className="mt-2 font-display text-2xl font-semibold">{s.value}</p>
            <p className="lab-label">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Promo table */}
      <Card padding="none">
        <div className="border-b border-black/[0.06] p-5 dark:border-white/[0.06]">
          <h3 className="font-display text-lg font-semibold">Voucher hiện hành</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left font-mono text-[10px] uppercase tracking-widest text-muted dark:bg-ink-800">
              <tr>
                <th className="p-4">Mã</th>
                <th className="p-4">Loại</th>
                <th className="p-4">Phạm vi</th>
                <th className="p-4">Lượt dùng</th>
                <th className="p-4">Kết thúc</th>
                <th className="p-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {PROMOS.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-500/[0.03]">
                  <td className="p-4 font-mono text-xs font-medium text-amber-500">{p.code}</td>
                  <td className="p-4 text-xs">{p.type}</td>
                  <td className="p-4 text-xs">{p.scope}</td>
                  <td className="p-4">
                    <span className="font-mono text-xs">
                      {p.uses.toLocaleString('vi-VN')} {p.max > 0 && <span className="text-muted">/ {p.max.toLocaleString('vi-VN')}</span>}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs">{p.ends}</td>
                  <td className="p-4">
                    <Badge tone={p.active ? 'success' : 'neutral'}>{p.active ? 'Active' : 'Paused'}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Segments */}
      <Card padding="md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Customer Segments</h3>
          <Button size="sm" variant="outline">Đẩy lên Facebook Ads</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {SEGMENTS.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-black/[0.06] p-4 dark:border-white/[0.06]">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-caption text-muted">Last synced 12 phút trước</p>
              </div>
              <Badge tone="amber">{s.count.toLocaleString('vi-VN')}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
