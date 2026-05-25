import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User } from 'lucide-react';
import { IconButton } from '@components/ui';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { AtomicLogo } from './AtomicLogo';
import { cn } from '@/utils/cn';
import { ELEMENTS } from '@/data/elements';

const NAV = [
  { label: 'Shop', to: '/shop' },
  { label: 'Elements', to: '/elements' },
  { label: 'Lab Report', to: '/journal' },
  { label: 'Stores', to: '/stores' },
];

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

/**
 * Storefront header.
 * REQS §4.1.6: Reactive nav (collapses to atomic logo on scroll), <5 nav items, hamburger for mobile.
 * - Glass blur background once user scrolls past 24px
 * - Element quick-jump strip below the main nav (desktop only)
 */
export function Header({ onOpenMobileMenu, onOpenSearch }: HeaderProps) {
  const { theme, toggleTheme, language, setLanguage } = useTheme();
  const { itemCount, open: openCart } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-30 transition-all duration-300',
        scrolled ? 'glass' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4 sm:px-6 lg:px-10">
        <IconButton
          aria-label="Mở menu"
          onClick={onOpenMobileMenu}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </IconButton>

        <AtomicLogo variant={scrolled ? 'atomic' : 'full'} className="hidden sm:inline-flex" />
        <AtomicLogo variant="atomic" className="sm:hidden" />

        {/* Desktop nav */}
        <nav className="ml-10 hidden flex-1 items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group relative font-mono text-[11px] uppercase tracking-[0.25em] transition-colors',
                  isActive
                    ? 'text-amber-500'
                    : 'text-ink-700 hover:text-ink-900 dark:text-ink-200 dark:hover:text-white',
                )
              }
            >
              {item.label}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px bg-amber-500 transition-all duration-300',
                  pathname.startsWith(item.to) ? 'w-full' : 'w-0 group-hover:w-full',
                )}
              />
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <IconButton aria-label="Tìm kiếm sản phẩm" onClick={onOpenSearch}>
            <Search className="h-5 w-5" />
          </IconButton>

          <button
            type="button"
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="hidden h-10 items-center rounded-full border border-transparent px-3 font-mono text-[10px] uppercase tracking-widest text-ink-700 transition-colors hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10 sm:inline-flex"
            aria-label="Đổi ngôn ngữ"
          >
            {language === 'vi' ? 'VI · EN' : 'EN · VI'}
          </button>

          <IconButton
            aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </IconButton>

          <Link to="/account/wishlist" aria-label="Wishlist" className="hidden md:inline-flex">
            <IconButton aria-label="Sản phẩm yêu thích">
              <Heart className="h-5 w-5" />
            </IconButton>
          </Link>

          <Link to="/account" aria-label="Tài khoản" className="hidden md:inline-flex">
            <IconButton aria-label="Tài khoản">
              <User className="h-5 w-5" />
            </IconButton>
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 items-center gap-2 rounded-full bg-amber-500 px-3.5 font-mono text-xs font-medium text-ink-900 transition-all hover:bg-amber-400 hover:shadow-amber-glow"
            aria-label={`Giỏ hàng ${itemCount} sản phẩm`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{itemCount.toString().padStart(2, '0')}</span>
          </button>
        </div>
      </div>

      {/* Sub-strip: Element quick-jump on desktop */}
      <div
        className={cn(
          'hidden border-t border-black/[0.06] transition-all dark:border-white/[0.06] lg:block',
          scrolled ? 'h-0 overflow-hidden border-t-0' : 'h-9',
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-center gap-8 px-4 sm:px-6 lg:px-10">
          {ELEMENTS.map((el) => (
            <Link
              key={el.code}
              to={`/shop?element=${el.code}`}
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
            >
              <span
                className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150"
                style={{ background: el.hex }}
              />
              [{el.code}] {el.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
