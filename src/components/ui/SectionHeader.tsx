import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  /** Lab-style marker e.g. "01 / Identity" */
  marker?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
}

/**
 * Section header used across the storefront.
 * Implements the "Lab Report" aesthetic: monospace markers + display headlines.
 */
export function SectionHeader({
  marker,
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl space-y-3', align === 'center' && 'mx-auto')}>
        {marker && (
          <div className="lab-label flex items-center gap-3">
            <span className="h-px w-8 bg-current opacity-30" />
            {marker}
          </div>
        )}
        {eyebrow && (
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-amber-500">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 dark:text-white md:text-h2">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
