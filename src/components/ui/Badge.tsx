import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'neutral' | 'amber' | 'success' | 'warning' | 'danger' | 'info' | 'glass';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  uppercase?: boolean;
}

const toneStyles: Record<Tone, string> = {
  neutral: 'bg-ink-100 text-ink-700 dark:bg-ink-700 dark:text-ink-200',
  amber: 'bg-amber-50 text-amber-700 border border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/40',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger: 'bg-danger/10 text-danger border border-danger/20',
  info: 'bg-info/10 text-info border border-info/20',
  glass: 'bg-white/80 text-ink-900 backdrop-blur dark:bg-ink-900/80 dark:text-white',
};

export function Badge({ tone = 'neutral', children, className, icon, uppercase }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide',
        uppercase && 'uppercase tracking-wider',
        toneStyles[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
