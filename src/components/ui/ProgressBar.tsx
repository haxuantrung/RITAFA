import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number;                  // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: 'amber' | 'success' | 'info' | 'warning' | 'element-base' | 'element-scholar' | 'element-kinetic' | 'element-home';
  className?: string;
  thickness?: 'thin' | 'normal' | 'thick';
}

const toneStyles = {
  amber: 'bg-amber-500',
  success: 'bg-success',
  info: 'bg-info',
  warning: 'bg-warning',
  'element-base': 'bg-element-base',
  'element-scholar': 'bg-element-scholar',
  'element-kinetic': 'bg-element-kinetic',
  'element-home': 'bg-element-home',
};

const thicknessStyles = {
  thin: 'h-1',
  normal: 'h-2',
  thick: 'h-3',
};

/**
 * Linear progress bar — used for fabric specs, freeship progress, membership progress.
 */
export function ProgressBar({
  value,
  max = 100,
  label,
  showValue,
  tone = 'amber',
  className,
  thickness = 'normal',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="lab-label">{label}</span>}
          {showValue && (
            <span className="font-mono text-caption text-ink-700 dark:text-ink-200">
              {Math.round(pct)}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800',
          thicknessStyles[thickness],
        )}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', toneStyles[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
