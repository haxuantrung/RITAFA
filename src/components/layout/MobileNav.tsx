import { Link } from 'react-router-dom';
import { Heart, LogIn, Package, User } from 'lucide-react';
import { Drawer, ElementGlyph } from '@components/ui';
import { ELEMENTS } from '@/data/elements';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile slide-in nav with Element-first browsing.
 * Optimised for one-handed thumb reach.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <Drawer open={open} onClose={onClose} side="left" width="md" title="Menu">
      <div className="space-y-8 p-6">
        <section>
          <h4 className="lab-label mb-3">Browse by Element</h4>
          <div className="grid grid-cols-2 gap-3">
            {ELEMENTS.map((el) => (
              <Link
                key={el.code}
                to={`/shop?element=${el.code}`}
                onClick={onClose}
                className="group flex flex-col gap-2 rounded-xl border border-black/[0.06] p-4 transition-all hover:border-current dark:border-white/[0.06]"
                style={{ color: el.hex }}
              >
                <ElementGlyph code={el.code} size="md" />
                <div className="text-ink-900 dark:text-white">
                  <div className="font-mono text-xs uppercase tracking-wider">[{el.code}] {el.name}</div>
                  <div className="text-caption text-muted">{el.tagline}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h4 className="lab-label mb-3">Shop</h4>
          <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
            {['All Products', 'New Arrivals', 'Year Collection', 'Sale'].map((label) => (
              <li key={label}>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="flex items-center justify-between py-3 text-sm font-medium"
                >
                  {label}
                  <span className="text-amber-500">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="lab-label mb-3">Account</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/auth/login" onClick={onClose} className="flex items-center gap-3 rounded-xl p-3 text-sm transition-colors hover:bg-ink-100 dark:hover:bg-white/5">
                <LogIn className="h-4 w-4 text-amber-500" /> Đăng nhập / Đăng ký
              </Link>
            </li>
            <li>
              <Link to="/account/orders" onClick={onClose} className="flex items-center gap-3 rounded-xl p-3 text-sm transition-colors hover:bg-ink-100 dark:hover:bg-white/5">
                <Package className="h-4 w-4 text-amber-500" /> Đơn hàng
              </Link>
            </li>
            <li>
              <Link to="/account/wishlist" onClick={onClose} className="flex items-center gap-3 rounded-xl p-3 text-sm transition-colors hover:bg-ink-100 dark:hover:bg-white/5">
                <Heart className="h-4 w-4 text-amber-500" /> Wishlist
              </Link>
            </li>
            <li>
              <Link to="/account" onClick={onClose} className="flex items-center gap-3 rounded-xl p-3 text-sm transition-colors hover:bg-ink-100 dark:hover:bg-white/5">
                <User className="h-4 w-4 text-amber-500" /> Profile
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </Drawer>
  );
}
