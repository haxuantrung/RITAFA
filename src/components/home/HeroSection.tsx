import { ArrowDownRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';

/**
 * Homepage hero — REQS §4.1.1.
 * Full-bleed editorial composition with parallax-like image scale,
 * "Lab data strip" along the bottom to reinforce the science narrative.
 */
export function HeroSection() {
  return (
    <section className="relative -mt-16 flex h-[100svh] min-h-[640px] items-end overflow-hidden">
      {/* Backdrop image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2400&q=85"
          alt="RITAFA Year Collection editorial"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-transparent" />
      </div>

      {/* Lab grid overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 pb-24 text-white sm:px-6 lg:px-10 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300">
              Year One Collection · Available Now
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            From <span className="text-amber-400">Lab</span>
            <br />
            to Life.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Thời trang kỹ thuật được thiết kế bởi các kỹ sư vật liệu —
            không phải nhà thiết kế. Mỗi sợi vải đều được đo, kiểm chứng và minh bạch.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/shop">
              <Button size="xl" rightIcon={<ArrowDownRight className="h-5 w-5" />}>
                Khám phá Collection
              </Button>
            </Link>
            <Link to="/lab/materials">
              <Button size="xl" variant="outline" className="border-white/20 text-white hover:border-white/60">
                Đọc Lab Report
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Lab data strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-4"
        >
          {[
            { label: 'Materials', value: '12+', unit: 'engineered' },
            { label: 'GSM Range', value: '80–380', unit: 'grams/m²' },
            { label: 'Certifications', value: '6', unit: 'global' },
            { label: 'Year', value: '2026', unit: 'edition' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300/80">
                // {stat.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] text-white/50">{stat.unit}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
