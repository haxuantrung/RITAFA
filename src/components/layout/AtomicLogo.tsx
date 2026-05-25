import { cn } from '@/utils/cn';

interface AtomicLogoProps {
  variant?: 'full' | 'atomic';
  className?: string;
}

/**
 * RITAFA brand mark.
 * - `full`: Wordmark with atomic symbol — desktop default
 * - `atomic`: Collapses to a periodic-table style "Rf" tile when scrolled
 */
export function AtomicLogo({ variant = 'full', className }: AtomicLogoProps) {
  if (variant === 'atomic') {
    return (
      <a
        href="/"
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md',
          'border border-amber-500/40 bg-amber-500/5',
          'font-mono text-sm font-bold text-amber-500 transition-all hover:bg-amber-500/10',
          className,
        )}
        aria-label="RITAFA — Home"
      >
        <span className="absolute -mt-3 ml-3 font-mono text-[8px] opacity-60">26</span>
        Rf
      </a>
    );
  }

  return (
    <a
      href="/"
      className={cn('group inline-flex items-center gap-2', className)}
      aria-label="RITAFA — Home"
    >
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-md',
          'border border-amber-500/40 bg-amber-500/5',
          'font-mono text-sm font-bold text-amber-500',
          'transition-all duration-300 group-hover:rotate-[8deg]',
        )}
      >
        Rf
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold uppercase tracking-[0.18em] text-ink-900 dark:text-white">
          RITAFA
        </span>
        <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-amber-500/80">
          From Lab to Life
        </span>
      </span>
    </a>
  );
}
