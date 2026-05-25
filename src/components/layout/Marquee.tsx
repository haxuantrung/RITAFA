import { Beaker, Repeat, ShieldCheck, Truck } from 'lucide-react';

const items = [
  { icon: <Truck className="h-3 w-3" />, text: 'FREESHIP FOR ORDERS OVER 500K' },
  { icon: <Repeat className="h-3 w-3" />, text: '30-DAY HASSLE-FREE RETURNS' },
  { icon: <ShieldCheck className="h-3 w-3" />, text: 'OEKO-TEX CERTIFIED FABRICS' },
  { icon: <Beaker className="h-3 w-3" />, text: 'ENGINEERED IN VIETNAM · M2C MODEL' },
];

/**
 * System marquee — REQS §4.1.1.
 * Top-of-page horizontal scroller. Duplicated content for seamless looping.
 */
export function Marquee() {
  return (
    <div className="overflow-hidden border-b border-black/[0.06] bg-ink-900 text-amber-100 dark:border-white/[0.06] dark:bg-ink-950">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/90"
          >
            {item.icon}
            {item.text}
            <span className="mx-6 text-amber-500/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
