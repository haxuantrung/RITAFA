import { motion } from 'framer-motion';
import { Award, Factory, FlaskConical, Leaf } from 'lucide-react';
import { SectionHeader } from '@components/ui';

const STATS = [
  { icon: Factory, label: 'Factories', value: '3', sub: 'Owned · Long An · Bình Dương · Đà Nẵng' },
  { icon: FlaskConical, label: 'Lab Tests/Year', value: '482', sub: 'Independent material testing' },
  { icon: Award, label: 'Certifications', value: '6', sub: 'OEKO-TEX · GOTS · Bluesign · GRS · BCI · RWS' },
  { icon: Leaf, label: 'Recycled Content', value: '38%', sub: 'Of total polymer use, 2026' },
];

/**
 * "Engineered in Vietnam" social proof — manufacturing transparency dashboard.
 * REQS §4.1.1: "Social Proof: Huy hiệu... Dashboard minh bạch sản xuất"
 */
export function TransparencySection() {
  return (
    <section className="border-y border-black/[0.06] bg-ink-50 py-20 dark:border-white/[0.06] dark:bg-ink-900 md:py-28">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              marker="// 03 — Transparency Dashboard"
              eyebrow="Engineered in Vietnam"
              title={
                <>
                  Bạn biết áo của bạn
                  <br />
                  <span className="text-gradient-amber">đến từ đâu, làm thế nào.</span>
                </>
              }
              description="Mô hình M2C (Manufacturer to Consumer) — chúng tôi sở hữu nhà máy, chọn sợi, kiểm chứng kết quả. Không qua trung gian, không che giấu dữ liệu."
            />
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-2 dark:bg-amber-500/10">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
                Real-time factory uptime · 98.4%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-3 rounded-2xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700"
              >
                <stat.icon className="h-5 w-5 text-amber-500" />
                <div>
                  <div className="font-display text-4xl font-semibold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500">
                    {stat.label}
                  </div>
                </div>
                <p className="text-caption text-muted">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
