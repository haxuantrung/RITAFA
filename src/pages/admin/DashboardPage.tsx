import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertCircle, ArrowDownRight, ArrowUpRight, MessageCircle, Package, ShoppingBag, TrendingUp, Users, Wifi } from 'lucide-react';
import { Badge, Card } from '@components/ui';
import {
  AOV_TODAY,
  CHANNEL_BREAKDOWN,
  CONVERSION_RATE,
  ORDERS_DELTA_PCT,
  ORDERS_TODAY,
  REVENUE_DELTA_PCT,
  REVENUE_TODAY,
  REVENUE_TREND,
  TODO_LIST,
  TOP_PRODUCTS,
  VISITORS_ONLINE,
} from '@/data/dashboardMetrics';
import { formatCompactVND, formatVND } from '@/utils/formatters';

const KPI_CARDS = [
  { label: 'Doanh thu hôm nay', value: formatVND(REVENUE_TODAY), delta: REVENUE_DELTA_PCT, icon: TrendingUp, tone: 'amber' as const },
  { label: 'Đơn hàng', value: ORDERS_TODAY.toString(), delta: ORDERS_DELTA_PCT, icon: ShoppingBag, tone: 'success' as const },
  { label: 'Visitor đang online', value: VISITORS_ONLINE.toString(), live: true, icon: Wifi, tone: 'info' as const },
  { label: 'Tỷ lệ chuyển đổi', value: `${CONVERSION_RATE}%`, delta: 0.4, icon: Users, tone: 'info' as const },
  { label: 'AOV', value: formatCompactVND(AOV_TODAY), delta: 5.2, icon: Package, tone: 'amber' as const },
];

const CHANNEL_COLORS = ['#D4AF37', '#60A5FA', '#F87171', '#4ADE80', '#9CA3AF'];

const SEVERITY_TONES = {
  warning: 'warning',
  danger: 'danger',
  info: 'info',
} as const;

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500">
            // Live · Today
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Dashboard điều hành</h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/[0.06] px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-success">
            Realtime sync · 98.4% uptime
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {KPI_CARDS.map((k) => (
          <Card key={k.label} padding="md">
            <div className="mb-3 flex items-center justify-between">
              <span className="lab-label">{k.label}</span>
              <k.icon className="h-4 w-4 text-amber-500" />
            </div>
            <p className="font-display text-2xl font-semibold tracking-tight">{k.value}</p>
            {k.live ? (
              <div className="mt-1 inline-flex items-center gap-1 text-caption text-success">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Live
              </div>
            ) : k.delta !== undefined ? (
              <div
                className={`mt-1 inline-flex items-center gap-1 text-caption ${
                  k.delta >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {k.delta >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(k.delta)}% so với hôm qua
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue trend */}
        <Card padding="md" className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="lab-label">// Revenue · Last 14 days</p>
              <h3 className="mt-1 font-display text-lg font-semibold">Xu hướng doanh thu</h3>
            </div>
            <div className="flex gap-1 rounded-full border border-black/[0.06] p-1 text-caption dark:border-white/[0.06]">
              <button className="rounded-full bg-amber-500 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-900">14d</button>
              <button className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">30d</button>
              <button className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">90d</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(127,127,127,0.1)" vertical={false} />
                <XAxis dataKey="date" stroke="rgba(127,127,127,0.5)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="rgba(127,127,127,0.5)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v / 1_000_000}M`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0A0A09',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#D4AF37', fontFamily: 'monospace' }}
                  formatter={(v: number) => formatVND(v)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* To-do */}
        <Card padding="md">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <h3 className="font-display text-lg font-semibold">Cần xử lý hôm nay</h3>
          </div>
          <ul className="space-y-2">
            {TODO_LIST.map((todo) => (
              <li key={todo.id}>
                <a
                  href={todo.href}
                  className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-ink-50 p-3 transition-colors hover:bg-amber-50 dark:border-white/[0.06] dark:bg-ink-800 dark:hover:bg-amber-500/5"
                >
                  <span className="text-sm">{todo.label}</span>
                  <Badge tone={SEVERITY_TONES[todo.severity]}>
                    {todo.count}
                  </Badge>
                </a>
              </li>
            ))}
            <li>
              <a className="flex items-center justify-between rounded-xl bg-amber-500 px-4 py-3 text-ink-900 hover:bg-amber-400">
                <span className="text-sm font-medium">Mở support inbox</span>
                <MessageCircle className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </Card>

        {/* Channel breakdown */}
        <Card padding="md">
          <h3 className="mb-4 font-display text-lg font-semibold">Doanh thu theo kênh</h3>
          <div className="flex items-center gap-6">
            <div className="h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CHANNEL_BREAKDOWN}
                    dataKey="revenue"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {CHANNEL_BREAKDOWN.map((_, i) => (
                      <Cell key={i} fill={CHANNEL_COLORS[i]} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2 text-sm">
              {CHANNEL_BREAKDOWN.map((c, i) => (
                <li key={c.channel} className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: CHANNEL_COLORS[i] }} />
                    {c.channel}
                  </span>
                  <span className="font-mono text-xs">{c.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Top products bar */}
        <Card padding="md" className="lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">Top sản phẩm tuần này</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_PRODUCTS} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="rgba(127,127,127,0.1)" horizontal={false} />
                <XAxis type="number" stroke="rgba(127,127,127,0.5)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={150}
                  stroke="rgba(127,127,127,0.7)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0A0A09',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="sold" fill="#D4AF37" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
