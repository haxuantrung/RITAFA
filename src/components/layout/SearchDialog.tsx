import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';
import { formatVND } from '@/utils/formatters';
import { ElementGlyph } from '@components/ui';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Command-K style search overlay.
 * - Esc to close
 * - Type to filter live
 * - Empty state shows suggested categories
 */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = q.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.sku.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.includes(q.toLowerCase())),
      ).slice(0, 6)
    : PRODUCTS.slice(0, 4);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-4 top-20 z-50 mx-auto max-w-2xl"
            role="dialog"
            aria-label="Tìm kiếm"
          >
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-ink-700">
              <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 dark:border-white/[0.06]">
                <Search className="h-4 w-4 text-amber-500" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm theo tên, SKU, Element... (Esc để đóng)"
                  className="flex-1 bg-transparent py-4 text-sm outline-none"
                />
                <button
                  onClick={onClose}
                  className="rounded-md p-1 text-muted hover:bg-ink-100 dark:hover:bg-white/10"
                  aria-label="Đóng"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted">
                    Không tìm thấy kết quả cho "{q}"
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/shop/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-ink-50 dark:hover:bg-white/5"
                        >
                          <img
                            src={p.thumbnail}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <ElementGlyph code={p.element} variant="inline" />
                              <span className="truncate text-sm font-medium">{p.name}</span>
                            </div>
                            <p className="mt-0.5 truncate font-mono text-caption text-muted">
                              {p.sku}
                            </p>
                          </div>
                          <span className="shrink-0 font-mono text-sm text-amber-500">
                            {formatVND(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-black/[0.06] bg-ink-50 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted dark:border-white/[0.06] dark:bg-ink-800">
                <span>↵ Mở chi tiết</span>
                <span>esc Đóng</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
