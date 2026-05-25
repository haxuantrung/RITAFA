import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { IconButton } from './IconButton';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: 'right' | 'left' | 'bottom';
  width?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  footer?: ReactNode;
}

const widthStyles = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
};

/**
 * Slide-in drawer used by mini cart, mobile nav, filter sidebar.
 * - Locks body scroll when open
 * - Closes on Escape
 * - Backdrop blur for the "premium feel"
 */
export function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  width = 'md',
  children,
  footer,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const offscreen =
    side === 'right' ? { x: '100%' } : side === 'left' ? { x: '-100%' } : { y: '100%' };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-md"
          />
          <motion.aside
            initial={offscreen}
            animate={{ x: 0, y: 0 }}
            exit={offscreen}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className={cn(
              'fixed z-50 flex flex-col bg-white shadow-2xl dark:bg-ink-900',
              side === 'right' && 'right-0 top-0 h-full',
              side === 'left' && 'left-0 top-0 h-full',
              side === 'bottom' && 'bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl',
              side !== 'bottom' && widthStyles[width],
            )}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
                <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
                <IconButton aria-label="Đóng" onClick={onClose}>
                  <X className="h-5 w-5" />
                </IconButton>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer && (
              <div className="border-t border-black/[0.06] bg-ink-50 px-6 py-5 dark:border-white/[0.06] dark:bg-ink-800">
                {footer}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
