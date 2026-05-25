import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'solid' | 'outline';
  'aria-label': string;            // accessibility required
}

const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' };

const variants = {
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10',
  solid:
    'bg-ink-900 text-white hover:bg-ink-700 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100',
  outline:
    'border border-ink-900/10 text-ink-900 hover:border-ink-900/30 dark:border-white/15 dark:text-white dark:hover:border-white/40',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, size = 'md', variant = 'ghost', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
