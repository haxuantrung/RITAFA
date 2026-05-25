import { cn } from '@/utils/cn';
import type { ElementCode } from '@/types';
import { getElement } from '@/data/elements';

interface ElementGlyphProps {
  code: ElementCode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
  variant?: 'card' | 'pill' | 'inline';
}

const sizeStyles = {
  xs: { box: 'h-6 w-6 text-[10px]', label: 'text-[8px]' },
  sm: { box: 'h-9 w-9 text-xs', label: 'text-[9px]' },
  md: { box: 'h-14 w-14 text-base', label: 'text-[10px]' },
  lg: { box: 'h-20 w-20 text-xl', label: 'text-xs' },
  xl: { box: 'h-32 w-32 text-3xl', label: 'text-sm' },
};

/**
 * Periodic-table styled element glyph.
 * The signature visual identity of RITAFA — used everywhere from PLP cards to membership tiers.
 */
export function ElementGlyph({
  code,
  size = 'md',
  showName,
  className,
  variant = 'card',
}: ElementGlyphProps) {
  const meta = getElement(code);
  const sz = sizeStyles[size];

  if (variant === 'inline') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-mono font-medium',
          className,
        )}
        style={{ color: meta.hex }}
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: meta.hex }} />
        [{meta.code}]
      </span>
    );
  }

  if (variant === 'pill') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs',
          className,
        )}
        style={{
          color: meta.hex,
          borderColor: `${meta.hex}40`,
          background: `${meta.hex}10`,
        }}
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: meta.hex }} />
        [{meta.code}] {meta.name}
      </span>
    );
  }

  return (
    <div
      className={cn(
        'relative flex shrink-0 flex-col items-center justify-center rounded-xl border font-mono font-medium',
        'transition-transform duration-500',
        sz.box,
        className,
      )}
      style={{
        color: meta.hex,
        borderColor: `${meta.hex}40`,
        background: `linear-gradient(135deg, ${meta.hex}14, ${meta.hex}05)`,
      }}
    >
      <span className="absolute left-1 top-0.5 font-mono text-[8px] opacity-70">
        {code === 'Ba' ? '01' : code === 'Sc' ? '02' : code === 'Ki' ? '03' : '04'}
      </span>
      <span className="font-bold leading-none">{meta.code}</span>
      {showName && <span className={cn('mt-0.5 opacity-70', sz.label)}>{meta.name}</span>}
    </div>
  );
}
