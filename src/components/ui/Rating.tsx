import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizes = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' };

export function Rating({ value, size = 'sm', showValue, reviewCount, className }: RatingProps) {
  const stars = Array.from({ length: 5 });
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center">
        {stars.map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizes[size],
              i < Math.round(value)
                ? 'fill-amber-500 text-amber-500'
                : 'text-ink-200 dark:text-ink-600',
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="font-mono text-caption text-ink-700 dark:text-ink-200">
          {value.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-muted"> ({reviewCount.toLocaleString('vi-VN')})</span>
          )}
        </span>
      )}
    </div>
  );
}
