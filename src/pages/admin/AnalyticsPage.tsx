import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Download } from 'lucide-react';
import { Card, Button, Badge } from '@components/ui';
import { REVENUE_TREND } from '@/data/dashboardMetrics';
import { formatVND } from '@/utils/formatters';

const PNL = [
  { label: 'Doanh thu thuần', value: 1_240_500_000, delta: 12.4, tone: 'success' as const },
  { label: 'Giá vốn (COGS)', value: -460_000_000, delta: 8.2, tone: 'warning' as const },
  { label: 'Phí ship', value: -38_400_000, delta: -2.1, tone: 'success' as const },
  { label: 'Phí sàn', value: -64_200_000, delta: 4.1, tone: 'warning' as const },
  { label: 'Marketing', value: -148_000_000, delta: 18.4, tone: 'warning' as const },
  { label: 'Lợi nhuận gộp', value: 529_900_000, delta: 11.8, tone: 'success' as const, emphasis: true },
];

export function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lab-label">// Analytics · Last 30 days</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Báo cáo & Phân tích</h1>
        </div>
        <div className="flex gap-2">
          <select className="h-9 rounded-lg border border-black/[0.06] bg-transparent px-3 text-sm outline-none dark:border-white/[0.06]">
            <option>30 ngày qua</option>
            <option>90 ngày qua</option>
            <option>Năm 2026</option>
          </select>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* P&L */}
      <Card padding="md">
        <h3 className="mb-5 font-display text-lg font-semibold">Báo cáo Lãi/Lỗ (P&L)</h3>
        <ul className="space-y-3">
          {PNL.map((p) => (
            <li
              key={p.label}
              className={`flex items-center justify-between border-b border-black/[0.06] pb-3 last:border-0 dark:border-white/[0.06] ${
                p.emphasis ? 'rounded-lg bg-amber-50 px-3 py-3 dark:bg-amber-500/5' : ''
              }`}
            >
              <span className={`text-sm ${p.emphasis ? 'font-display text-base font-semibold' : ''}`}>
                {p.label}
              </span>
              <div className="flex items-center gap-3">
                <Badge tone={p.tone}>
                  {p.delta > 0 ? '+' : ''}
                  {p.delta}%
                </Badge>
                <span
                  className={`font-mono ${p.value < 0 ? 'text-danger' : p.emphasis ? 'text-amber-600 dark:text-amber-400' : ''} ${
                    p.emphasis ? 'text-xl font-bold' : 'text-sm'
                  }`}
                >
                  {formatVND(p.value)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales velocity */}
        <Card padding="md">
          <h3 className="mb-4 font-display text-lg font-semibold">Sales velocity</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_TREND}>
                <CartesianGrid stroke="rgba(127,127,127,0.1)" />
                <XAxis dataKey="date" fontSize={10} stroke="rgba(127,127,127,0.5)" />
                <YAxis fontSize={10} stroke="rgba(127,127,127,0.5)" tickFormatter={(v) => `${v / 1_000_000}M`} />
                <Tooltip
                  contentStyle={{ background: '#0A0A09', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => formatVND(v)}
                />
                <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#D4AF37', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders by day */}
        <Card padding="md">
          <h3 className="mb-4 font-display text-lg font-semibold">Đơn hàng theo ngày</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_TREND}>
                <CartesianGrid stroke="rgba(127,127,127,0.1)" />
                <XAxis dataKey="date" fontSize={10} stroke="rgba(127,127,127,0.5)" />
                <YAxis fontSize={10} stroke="rgba(127,127,127,0.5)" />
                <Tooltip
                  contentStyle={{ background: '#0A0A09', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="orders" fill="#60A5FA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Conversion funnel */}
      <Card padding="md">
        <h3 className="mb-4 font-display text-lg font-semibold">Funnel chuyển đổi</h3>
        <div className="space-y-3">
          {[
            { stage: 'Sessions', value: 42_180, pct: 100 },
            { stage: 'Product views', value: 28_400, pct: 67.3 },
            { stage: 'Add to cart', value: 6_240, pct: 14.8 },
            { stage: 'Begin checkout', value: 2_180, pct: 5.2 },
            { stage: 'Purchase', value: 1_443, pct: 3.42 },
          ].map((stage, i) => (
            <div key={stage.stage} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stage.stage}</span>
                <span className="font-mono text-xs">
                  {stage.value.toLocaleString('vi-VN')} <span className="text-muted">· {stage.pct}%</span>
                </span>
              </div>
              <div className="h-6 overflow-hidden rounded-lg bg-ink-100 dark:bg-ink-800">
                <div
                  className="flex h-full items-center justify-end px-3 font-mono text-[10px] text-ink-900"
                  style={{
                    width: `${stage.pct}%`,
                    background: `linear-gradient(90deg, #D4AF37, ${i === 4 ? '#4ADE80' : '#F5EBC3'})`,
                  }}
                >
                  {stage.pct}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
