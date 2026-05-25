import { Check, Gift, Sparkles } from 'lucide-react';
import { Badge, Card, ElementGlyph, ProgressBar } from '@components/ui';
import { CURRENT_USER } from '@/data/users';
import { MEMBERSHIP_TIERS } from '@/data/elements';
import { formatCompactVND } from '@/utils/formatters';

const VOUCHERS = [
  { id: 'v1', cost: 500, label: 'Giảm 100K', sub: 'Đơn từ 1M', earned: false },
  { id: 'v2', cost: 1000, label: 'Freeship Premium', sub: 'Express miễn phí ×3', earned: true },
  { id: 'v3', cost: 2000, label: 'Giảm 300K', sub: 'Đơn từ 2.5M', earned: false },
  { id: 'v4', cost: 5000, label: 'Quà tặng riêng', sub: 'Lab notebook + tote', earned: false },
];

export function AccountRewardsPage() {
  const user = CURRENT_USER;
  const currentTierIdx = MEMBERSHIP_TIERS.findIndex((t) => t.tier === user.membership.tier);

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <p className="lab-label">// Elementa Rewards</p>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {user.membership.points.toLocaleString('vi-VN')} điểm có thể đổi
        </h2>
        <p className="text-muted">Tích 1 điểm cho mỗi 100,000₫ chi tiêu — không hết hạn.</p>
      </header>

      {/* Tier ladder */}
      <Card padding="lg">
        <p className="lab-label mb-6">Hành trình của bạn</p>
        <div className="grid gap-4 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((t, i) => {
            const isCurrent = i === currentTierIdx;
            const passed = i < currentTierIdx;
            return (
              <div
                key={t.tier}
                className={`relative rounded-2xl border p-5 transition-all ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/5 shadow-amber-glow'
                    : passed
                    ? 'border-success/30 bg-success/[0.04]'
                    : 'border-black/[0.06] dark:border-white/[0.06]'
                }`}
              >
                {isCurrent && (
                  <Badge tone="amber" className="absolute -top-3 right-4" uppercase>
                    Tier hiện tại
                  </Badge>
                )}
                {passed && (
                  <span className="absolute -top-3 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <ElementGlyph code={t.elementCode} size="md" />
                <h3 className="mt-3 font-display text-xl font-semibold">{t.label}</h3>
                <p className="font-mono text-caption text-muted">
                  {t.threshold === 0 ? 'Bắt đầu' : `Spend ${formatCompactVND(t.threshold)}`}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: t.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <ProgressBar
            value={user.membership.progressToNext}
            tone="amber"
            label={`Còn ${formatCompactVND(10_000_000 - user.membership.spentYTD)} để lên Kinetic`}
            showValue
          />
        </div>
      </Card>

      {/* Vouchers */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-amber-500" />
          <h3 className="font-display text-lg font-semibold">Đổi điểm lấy voucher</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {VOUCHERS.map((v) => {
            const canRedeem = user.membership.points >= v.cost;
            return (
              <div
                key={v.id}
                className={`flex items-center justify-between rounded-2xl border p-5 transition-all ${
                  v.earned
                    ? 'border-success/40 bg-success/[0.04]'
                    : canRedeem
                    ? 'border-amber-500/40 bg-amber-500/[0.04]'
                    : 'border-black/[0.06] dark:border-white/[0.06]'
                }`}
              >
                <div>
                  <p className="font-display text-lg font-semibold">{v.label}</p>
                  <p className="text-caption text-muted">{v.sub}</p>
                  <div className="mt-2 flex items-center gap-1.5 font-mono text-xs">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    {v.cost.toLocaleString('vi-VN')} điểm
                  </div>
                </div>
                <button
                  disabled={!canRedeem || v.earned}
                  className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                    v.earned
                      ? 'bg-success text-white'
                      : canRedeem
                      ? 'bg-amber-500 text-ink-900 hover:bg-amber-400'
                      : 'cursor-not-allowed bg-ink-100 text-muted dark:bg-ink-800'
                  }`}
                >
                  {v.earned ? '✓ Đã đổi' : canRedeem ? 'Đổi ngay' : 'Chưa đủ'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
