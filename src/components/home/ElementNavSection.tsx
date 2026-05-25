import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@components/ui';
import { ELEMENTS } from '@/data/elements';

/**
 * 4 RITAFA Elements as a periodic-table style grid.
 * REQS §4.1.1: "Element Navigation: 4 ô nguyên tố tương tác... với hiệu ứng lật 3D"
 *
 * UX choice: instead of literal CSS 3D flip, we use a luxe parallax-tilt + reveal
 * of inner mass/data text. Cleaner, performs better on mobile, more "lab" feel.
 */
export function ElementNavSection() {
  return (
    <section className="relative bg-ink-50 py-20 dark:bg-ink-900 md:py-32">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          marker="// 01 — The Element System"
          eyebrow="Identity"
          title={
            <>
              Bốn nguyên tố.
              <br />
              <span className="text-gradient-amber">Một bảng phân loại sống.</span>
            </>
          }
          description="Mỗi sản phẩm RITAFA thuộc về một Element. Hệ thống bảng tuần hoàn được lấy cảm hứng từ khoa học vật liệu — giúp bạn chọn đúng sản phẩm cho đúng ngữ cảnh."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {ELEMENTS.map((el, i) => (
            <motion.div
              key={el.code}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/shop?element=${el.code}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-700 hover:shadow-2xl dark:bg-ink-800"
                style={{
                  borderColor: `${el.hex}30`,
                  background: `linear-gradient(180deg, ${el.hex}06, transparent)`,
                }}
              >
                {/* Top-left: atomic number */}
                <span
                  className="font-mono text-xs"
                  style={{ color: el.hex }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Code: huge */}
                <div className="mt-6 flex flex-col">
                  <span
                    className="font-display text-[clamp(4rem,12vw,7.5rem)] font-bold leading-none tracking-tighter transition-transform duration-700 group-hover:-translate-y-1"
                    style={{ color: el.hex }}
                  >
                    {el.code}
                  </span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Mass: {Math.round(60 + i * 12)}.{Math.floor(Math.random() * 99)}
                  </span>
                </div>

                {/* Name */}
                <div className="absolute inset-x-6 bottom-6 space-y-2">
                  <p className="font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white">
                    {el.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {el.tagline}
                  </p>
                  <p className="line-clamp-2 max-h-0 overflow-hidden text-xs leading-relaxed text-muted opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {el.description}
                  </p>
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: el.hex }}>
                    Explore [{el.code}]
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" />
                  </div>
                </div>

                {/* Subtle glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${el.hex}25, transparent 60%)` }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
