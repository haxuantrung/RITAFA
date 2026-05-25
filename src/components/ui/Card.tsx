import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantStyles = {
  default:
    'bg-white border border-black/[0.06] dark:bg-ink-700 dark:border-white/[0.06]',
  elevated:
    'bg-white border border-black/[0.06] shadow-card-light dark:bg-ink-700 dark:border-white/[0.06] dark:shadow-card-dark',
  outline:
    'bg-transparent border border-black/10 dark:border-white/10',
  glass:
    'bg-white/70 backdrop-blur-xl border border-black/[0.06] dark:bg-ink-700/70 dark:border-white/[0.08]',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn('rounded-2xl', variantStyles[variant], paddingStyles[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
