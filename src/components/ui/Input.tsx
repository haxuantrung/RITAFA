import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftIcon, rightSlot, containerClassName, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name ?? Math.random().toString(36).slice(2, 8);
  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="lab-label block">
          {label}
        </label>
      )}
      <div
        className={cn(
          'group relative flex items-center rounded-lg border bg-transparent transition-colors',
          'border-ink-900/10 dark:border-white/10',
          'focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20',
          error && 'border-danger focus-within:border-danger focus-within:ring-danger/20',
        )}
      >
        {leftIcon && (
          <span className="pl-3.5 text-ink-400 dark:text-ink-300">{leftIcon}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex-1 bg-transparent px-4 py-3 text-sm outline-none',
            'placeholder:text-ink-300 dark:placeholder:text-ink-500',
            leftIcon && 'pl-2.5',
            className,
          )}
          {...rest}
        />
        {rightSlot && <span className="pr-3">{rightSlot}</span>}
      </div>
      {(hint || error) && (
        <p className={cn('text-caption', error ? 'text-danger' : 'text-muted')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
});
