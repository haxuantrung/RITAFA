import { useState, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Marquee } from './Marquee';
import { MobileNav } from './MobileNav';
import { SearchDialog } from './SearchDialog';
import { MiniCart } from '@components/cart/MiniCart';

interface StorefrontLayoutProps {
  children?: ReactNode;
}

/**
 * Top-level storefront chrome — wraps every customer-facing page.
 */
export function StorefrontLayout({ children }: StorefrontLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Marquee />
      <Header
        onOpenMobileMenu={() => setMobileNavOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <main className="flex-1 pt-16">{children ?? <Outlet />}</main>
      <Footer />

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MiniCart />
    </div>
  );
}
