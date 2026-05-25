import { ProductCard } from '@components/product/ProductCard';
import { CURRENT_USER } from '@/data/users';
import { PRODUCTS } from '@/data/products';

export function AccountWishlistPage() {
  const products = PRODUCTS.filter((p) => CURRENT_USER.wishlist.includes(p.id));
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl font-semibold tracking-tight">Wishlist</h2>
        <p className="text-muted">{products.length} sản phẩm bạn đã lưu.</p>
      </header>

      {products.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/10 p-12 text-center text-muted dark:border-white/10">
          Chưa có sản phẩm nào. Bắt đầu khám phá nhé.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
