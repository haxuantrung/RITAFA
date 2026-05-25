import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@components/product/ProductCard';
import { Button, SectionHeader } from '@components/ui';
import { PRODUCTS } from '@/data/products';

/**
 * Featured products grid — masonry-inspired with one editorial "hero" card.
 * REQS §4.1.1: "Featured Products Grid: Bố cục Masonry + 3D tilt hover effect"
 */
export function FeaturedGridSection() {
  const featured = PRODUCTS.slice(0, 7);
  const hero = featured[0];
  const rest = featured.slice(1, 7);

  return (
    <section className="bg-white py-20 dark:bg-ink-950 md:py-32">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          marker="// 02 — Featured"
          eyebrow="Curated this week"
          title="Engineered favourites."
          description="Những thiết kế được phòng lab tuyển chọn — đại diện cho triết lý The Science of Comfort."
          action={
            <Link to="/shop">
              <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Xem tất cả
              </Button>
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {/* Editorial hero card spans 2 cols on desktop */}
          <Link
            to={`/shop/${hero.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-ink-100 dark:bg-ink-800 lg:col-span-2 lg:row-span-2"
          >
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full">
              <img
                src={hero.images[0]}
                alt={hero.name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
            <div className="absolute inset-x-8 bottom-8 space-y-3 text-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300">
                Editor&apos;s Pick · [{hero.element}] {hero.element === 'Ba' ? 'Base' : 'Element'}
              </p>
              <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {hero.name}
              </h3>
              <p className="max-w-md text-sm text-white/70">{hero.subtitle}</p>
              <div className="inline-flex items-center gap-2 font-mono text-sm">
                <span className="text-amber-400">Explore</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Smaller cards */}
          {rest.slice(0, 2).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} variant="tall" />
          ))}
        </div>

        {/* Second row — 4 across */}
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {rest.slice(2).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
