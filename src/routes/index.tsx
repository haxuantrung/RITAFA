import { createBrowserRouter } from 'react-router-dom';
import { StorefrontLayout } from '@components/layout/StorefrontLayout';
import { HomePage } from '@/pages/storefront/HomePage';
import { ProductListingPage } from '@/pages/storefront/ProductListingPage';
import { ProductDetailPage } from '@/pages/storefront/ProductDetailPage';
import { CheckoutPage, CheckoutSuccessPage } from '@/pages/storefront/CheckoutPage';
import { AuthPage } from '@/pages/storefront/AuthPage';
import { AccountLayout } from '@/pages/storefront/AccountPage';
import { AccountOverviewPage } from '@/pages/storefront/account/OverviewPage';
import { AccountOrdersPage } from '@/pages/storefront/account/OrdersPage';
import { AccountWishlistPage } from '@/pages/storefront/account/WishlistPage';
import { AccountRewardsPage } from '@/pages/storefront/account/RewardsPage';

import { AdminLayout } from '@components/admin/AdminLayout';
import { AdminDashboardPage } from '@/pages/admin/DashboardPage';
import { AdminOrdersPage } from '@/pages/admin/OrdersPage';
import { AdminProductsPage } from '@/pages/admin/ProductsPage';
import { AdminInventoryPage } from '@/pages/admin/InventoryPage';
import { AdminMarketingPage } from '@/pages/admin/MarketingPage';
import { AdminAnalyticsPage } from '@/pages/admin/AnalyticsPage';

export const router = createBrowserRouter([
  // ===== Storefront =====
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ProductListingPage /> },
      { path: 'shop/:slug', element: <ProductDetailPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'checkout/success', element: <CheckoutSuccessPage /> },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountOverviewPage /> },
          { path: 'orders', element: <AccountOrdersPage /> },
          { path: 'wishlist', element: <AccountWishlistPage /> },
          { path: 'rewards', element: <AccountRewardsPage /> },
        ],
      },
    ],
  },

  // ===== Auth =====
  {
    path: '/auth/login',
    element: (
      <StorefrontLayout>
        <AuthPage mode="login" />
      </StorefrontLayout>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <StorefrontLayout>
        <AuthPage mode="register" />
      </StorefrontLayout>
    ),
  },

  // ===== Admin =====
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'orders', element: <AdminOrdersPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'inventory', element: <AdminInventoryPage /> },
      { path: 'marketing', element: <AdminMarketingPage /> },
      { path: 'analytics', element: <AdminAnalyticsPage /> },
    ],
  },
]);
