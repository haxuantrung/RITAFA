import { useState } from 'react';
import { Camera, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge, Rating } from '@components/ui';
import type { Product, ProductReview } from '@/types';
import { formatRelativeTime } from '@/utils/formatters';
import { cn } from '@/utils/cn';

interface ReviewsTabProps {
  product: Product;
}

type FilterKey = 'all' | 'verified' | 'photos';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'verified', label: 'Đã mua' },
  { key: 'photos', label: 'Có ảnh' },
];

export function ReviewsTab({ product }: ReviewsTabProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const reviews = product.reviews.filter((r: ProductReview) => {
    if (filter === 'verified') return r.verified;
    if (filter === 'photos') return r.photos && r.photos.length > 0;
    return true;
  });

  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: product.reviews.filter((r) => Math.round(r.rating) === stars).length,
  }));
  const total = product.reviews.length || 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      {/* Summary card */}
      <div className="space-y-5">
        <div className="rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700">
          <p className="lab-label">Average Rating</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold tracking-tight">
              {product.rating.toFixed(1)}
            </span>
            <span className="font-mono text-xs text-muted">/ 5.0</span>
          </div>
          <Rating value={product.rating} size="md" className="mt-1" />
          <p className="mt-2 text-caption text-muted">
            {product.reviewCount.toLocaleString('vi-VN')} đánh giá
          </p>

          <div className="mt-5 space-y-1.5">
            {breakdown.map((b) => (
              <div key={b.stars} className="flex items-center gap-2 text-xs">
                <span className="w-6 font-mono">{b.stars}★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${(b.count / total) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-muted">{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI summary card */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-50 to-transparent p-6 dark:from-amber-500/10">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500">
              AI Summary
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Khách hàng đánh giá cao <strong className="text-amber-600 dark:text-amber-400">chất vải dày dặn</strong> và
            <strong className="text-amber-600 dark:text-amber-400"> form đứng dáng</strong>. Một số người feedback rằng
            size hơi rộng — nên đặt nhỏ hơn 1 size nếu thích ôm.
          </p>
        </div>
      </div>

      {/* Reviews list */}
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors',
                filter === f.key
                  ? 'bg-ink-900 text-white dark:bg-amber-500 dark:text-ink-900'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700"
            >
              <div className="flex items-start gap-4">
                <img src={r.avatar} alt="" className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{r.author}</span>
                    {r.verified && (
                      <Badge tone="success" icon={<CheckCircle2 className="h-3 w-3" />}>
                        Đã mua
                      </Badge>
                    )}
                    <span className="font-mono text-caption text-muted">
                      · {formatRelativeTime(r.date)}
                    </span>
                  </div>
                  <Rating value={r.rating} size="sm" />
                  <p className="font-medium">{r.title}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{r.body}</p>

              {/* Body metric chips */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="chip">Size {r.size}</span>
                <span className="chip">{r.height} cm</span>
                <span className="chip">{r.weight} kg</span>
              </div>

              {/* Photos */}
              {r.photos && r.photos.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {r.photos.map((p, i) => (
                    <div
                      key={i}
                      className="relative h-20 w-20 overflow-hidden rounded-lg bg-ink-100 dark:bg-ink-800"
                    >
                      <img src={p} alt="" className="h-full w-full object-cover" />
                      <Camera className="absolute right-1 top-1 h-3 w-3 text-white opacity-60" />
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
