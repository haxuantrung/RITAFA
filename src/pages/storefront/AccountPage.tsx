import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Award,
  Bell,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { Badge, Card, ProgressBar, ElementGlyph } from '@components/ui';
import { CURRENT_USER } from '@/data/users';
import { MEMBERSHIP_TIERS } from '@/data/elements';
import { formatCompactVND } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const NAV = [
  { to: '/account', label: 'Tổng quan', icon: UserIcon, end: true },
  { to: '/account/orders', label: 'Đơn hàng', icon: Package },
  { to: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account/rewards', label: 'Elementa Rewards', icon: Award },
  { to: '/account/addresses', label: 'Địa chỉ', icon: MapPin },
  { to: '/account/notifications', label: 'Thông báo', icon: Bell },
  { to: '/account/settings', label: 'Cài đặt', icon: Settings },
];

/**
 * Account layout — left rail + content area.
 * Top "Atomic Profile Card" displays membership status as periodic element.
 */
export function AccountLayout() {
  const navigate = useNavigate();
  const user = CURRENT_USER;
  const tier = MEMBERSHIP_TIERS.find((t) => t.tier === user.membership.tier)!;

  return (
    <div className="bg-ink-50 dark:bg-ink-950">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        {/* Atomic profile banner */}
        <Card variant="default" padding="lg" className="overflow-hidden">
          <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
              style={{ background: tier.color }}
            />
            <div className="relative flex items-center gap-4">
              <img
                src={user.avatar}
                alt=""
                className="h-16 w-16 rounded-full ring-2 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-offset-ink-700"
              />
              <div>
                <p className="lab-label">// Member · Since {new Date(user.createdAt).getFullYear()}</p>
                <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  Chào {user.name.split(' ').slice(-1)[0]}.
                </h1>
              </div>
            </div>

            <div className="relative space-y-3">
              <div className="flex items-center gap-3">
                <ElementGlyph code={tier.elementCode} size="md" showName />
                <div>
                  <Badge tone="amber" icon={<Sparkles className="h-3 w-3" />} uppercase>
                    {tier.label} Tier
                  </Badge>
                  <p className="mt-1 font-mono text-caption text-muted">
                    {user.membership.points.toLocaleString('vi-VN')} points · spent {formatCompactVND(user.membership.spentYTD)}
                  </p>
                </div>
              </div>
              <ProgressBar
                value={user.membership.progressToNext}
                label="Tiến độ lên Kinetic"
                showValue
                tone="amber"
              />
            </div>

            <button
              onClick={() => navigate('/')}
              className="relative inline-flex items-center gap-2 self-start rounded-full border border-black/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-danger hover:text-danger dark:border-white/10"
            >
              <LogOut className="h-3 w-3" />
              Đăng xuất
            </button>
          </div>
        </Card>

        {/* Content grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <nav className="sticky top-32 space-y-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                      isActive
                        ? 'bg-ink-900 text-white dark:bg-amber-500 dark:text-ink-900'
                        : 'text-ink-700 hover:bg-white dark:text-ink-200 dark:hover:bg-ink-800',
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
