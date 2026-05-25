import { motion } from 'framer-motion';
import { SectionHeader } from '@components/ui';

const PILLARS = [
  {
    no: '01',
    title: 'Nguyên bản',
    en: 'Originality',
    body:
      'Không thiết kế theo mùa. Mỗi sản phẩm là kết quả của 18+ tháng R&D — sống được nhiều năm trong tủ đồ của bạn.',
  },
  {
    no: '02',
    title: 'Tinh giản',
    en: 'Restraint',
    body:
      'Cắt bỏ chi tiết không cần. Hình học sạch, đường may chính xác. Mặt vải, form và cảm giác — là toàn bộ những gì bạn cảm nhận.',
  },
  {
    no: '03',
    title: 'Minh bạch',
    en: 'Transparency',
    body:
      'Mỗi dữ liệu kỹ thuật được công khai: GSM, thành phần sợi, nhà máy, chứng nhận. Bạn biết những gì bạn mặc.',
  },
];

export function PhilosophySection() {
  return (
    <section className="bg-white py-20 dark:bg-ink-950 md:py-32">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          marker="// 04 — Philosophy"
          eyebrow="Three pillars"
          title="The Science of Comfort."
          description="Ba trụ cột định hình cách chúng tôi thiết kế."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/[0.06] bg-black/[0.06] dark:border-white/[0.06] dark:bg-white/[0.06] md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative flex flex-col gap-6 bg-white p-8 transition-colors hover:bg-amber-50/40 dark:bg-ink-900 dark:hover:bg-amber-500/[0.04] md:p-12"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500">
                {p.no} / {p.en}
              </span>
              <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {p.title}
              </h3>
              <p className="text-base leading-relaxed text-muted">{p.body}</p>
              <div className="mt-auto h-px w-12 origin-left scale-x-100 bg-amber-500 transition-transform duration-700 group-hover:scale-x-[3]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
