import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap } from 'lucide-react';
import { Badge, Rating, ElementGlyph, IconButton } from '@components/ui';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { formatVND } from '@/utils/formatters';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'compact' | 'tall';
}

/**
 * Reusable product card used on PLP, Home featured grid, Wishlist.
 * Interactions:
 * - Image cross-fade between thumbnail and second shot on hover
 * - Color swatch swap updates the cover image
 * - Quick-add reveal on hover (desktop) — opens cart drawer
 */
export function ProductCard({ product, index = 0, variant = 'default' }: ProductCardProps) {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [imgIdx, setImgIdx] = useState(0);
  const { add } = useCart();

  const isSale = product.originalPrice && product.originalPrice > product.price;
  const discount = isSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <article
      style={{ animationDelay: `${index * 60}ms` }}
      className="group relative flex flex-col animate-fade-up opacity-0"
      onMouseEnter={() => product.images.length > 1 && setImgIdx(1)}
      onMouseLeave={() => setImgIdx(0)}
    >
      <Link
        to={`/shop/${product.slug}`}
        className={cn(
          'relative block overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800',
          variant === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/5]',
        )}
        aria-label={product.name}
      >
        {/* Top badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isFlashDeal && (
            <Badge tone="amber" icon={<Zap className="h-3 w-3" />} uppercase>
              Flash
            </Badge>
          )}
          {product.isNew && !product.isFlashDeal && (
            <Badge tone="glass" uppercase>New</Badge>
          )}
          {product.isBestSeller && (
            <Badge tone="neutral" uppercase>★ Best</Badge>
          )}
          {isSale && (
            <Badge tone="danger" uppercase>−{discount}%</Badge>
          )}
          {product.lowStock && (
            <Badge tone="warning" uppercase>Low stock</Badge>
          )}
        </div>

        {/* Element marker */}
        <div className="absolute right-3 top-3 z-10">
          <ElementGlyph code={product.element} size="sm" />
        </div>

        {/* Image stack with cross-fade */}
        <img
          src={activeColor.imageUrl ?? product.images[0]}
          alt={product.name}
          loading="lazy"
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out',
            imgIdx === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
          )}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out',
              imgIdx === 1 ? 'opacity-100 scale-105' : 'opacity-0 scale-100',
            )}
          />
        )}

        {/* Wishlist (top-right of image-bottom area) */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <IconButton
            aria-label="Thêm vào yêu thích"
            variant="solid"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="bg-white/95 text-ink-900 dark:bg-ink-900/95 dark:text-white"
          >
            <Heart className="h-3.5 w-3.5" />
          </IconButton>
        </div>

        {/* Quick-add bar on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const firstAvailable =
              product.sizes.find((s) => s.stock > 0) ?? product.sizes[0];
            add(product, activeColor.id, firstAvailable.id, 1);
          }}
          className={cn(
            'absolute inset-x-3 bottom-3 z-10 flex h-10 translate-y-2 items-center justify-center',
            'rounded-full bg-ink-900 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white opacity-0',
            'transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
            'dark:bg-amber-500 dark:text-ink-900',
          )}
        >
          + Quick Add
        </button>
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        {/* Color swatches */}
        <div className="flex items-center gap-2">
          {product.colors.slice(0, 5).map((c) => (
            <button
              key={c.id}
              type="button"
              aria-label={`Đổi màu ${c.name}`}
              onClick={() => setActiveColor(c)}
              className={cn(
                'h-3.5 w-3.5 rounded-full ring-1 ring-inset transition-all',
                activeColor.id === c.id
                  ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-transparent'
                  : 'ring-ink-300 dark:ring-ink-600 hover:ring-amber-500',
              )}
              style={{ background: c.hex }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="font-mono text-[10px] text-muted">+{product.colors.length - 5}</span>
          )}
        </div>

        <Link to={`/shop/${product.slug}`} className="space-y-1">
          <h3 className="text-sm font-medium leading-snug text-ink-900 dark:text-white">
            {product.name}
          </h3>
          <p className="font-mono text-caption text-muted">{product.subtitle}</p>
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold text-ink-900 dark:text-white">
              {formatVND(product.price)}
            </span>
            {isSale && (
              <span className="font-mono text-caption text-muted line-through">
                {formatVND(product.originalPrice!)}
              </span>
            )}
          </div>
          <Rating value={product.rating} size="sm" showValue reviewCount={product.reviewCount} />
        </div>
      </div>
    </article>
  );
}
