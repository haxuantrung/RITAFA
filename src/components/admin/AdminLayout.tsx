import { Bell, ChevronDown, LayoutDashboard, LogOut, Megaphone, MessageSquare, Package, PieChart, Search, Settings, ShoppingBag, Tag, Truck, Users, Warehouse } from 'lucide-react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { IconButton } from '@components/ui';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { ADMIN_USER } from '@/data/users';

const NAV_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/admin/analytics', label: 'Báo cáo & Phân tích', icon: PieChart },
    ],
  },
  {
    title: 'Operations',
    items: [
      { to: '/admin/orders', label: 'Đơn hàng', icon: ShoppingBag },
      { to: '/admin/products', label: 'Sản phẩm', icon: Package },
      { to: '/admin/inventory', label: 'Tồn kho', icon: Warehouse },
      { to: '/admin/shipping', label: 'Vận chuyển', icon: Truck },
    ],
  },
  {
    title: 'Growth',
    items: [
      { to: '/admin/marketing', label: 'Marketing', icon: Megaphone },
      { to: '/admin/loyalty', label: 'Loyalty & Rewards', icon: Tag },
      { to: '/admin/support', label: 'CSKH', icon: MessageSquare },
      { to: '/admin/customers', label: 'Khách hàng', icon: Users },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/admin/settings', label: 'Cài đặt', icon: Settings },
    ],
  },
];

/**
 * Admin Panel layout — sidebar + topbar.
 * - Dense data design language: tighter spacing, smaller type than storefront
 * - Sticky topbar with search, notifications, user menu
 * - REQS §4.2: Role-aware nav (full Super Admin shown here)
 */
export function AdminLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-ink-50 text-sm dark:bg-ink-950">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-black/[0.06] bg-white dark:border-white/[0.06] dark:bg-ink-900 lg:flex lg:flex-col">
        <div className="border-b border-black/[0.06] p-5 dark:border-white/[0.06]">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-amber-500/40 bg-amber-500/5 font-mono font-bold text-amber-500">
              Rf
            </span>
            <div className="leading-none">
              <p className="font-display text-base font-bold uppercase tracking-[0.18em]">RITAFA</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-amber-500/80">Admin · v1.0</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                {section.title}
              </h4>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/[0.04]'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User card */}
        <div className="border-t border-black/[0.06] p-3 dark:border-white/[0.06]">
          <button className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-ink-100 dark:hover:bg-white/5">
            <img src={ADMIN_USER.avatar} alt="" className="h-9 w-9 rounded-full" />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium">{ADMIN_USER.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
                Super Admin
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-black/[0.06] bg-white px-6 dark:border-white/[0.06] dark:bg-ink-900">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              placeholder="Tìm SKU, mã đơn, khách hàng... (⌘K)"
              className="h-10 w-full rounded-full border border-black/[0.06] bg-ink-50 pl-10 pr-4 text-sm outline-none transition-colors focus:border-amber-500 dark:border-white/[0.06] dark:bg-ink-800"
            />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <IconButton aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </IconButton>
            <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink-100 dark:hover:bg-white/5">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-white dark:ring-ink-900" />
            </button>
            <Link
              to="/"
              className="ml-1 inline-flex items-center gap-2 rounded-full border border-black/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-amber-500 hover:text-amber-500 dark:border-white/[0.06]"
            >
              <LogOut className="h-3 w-3" />
              Về Storefront
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
