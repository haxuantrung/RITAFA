import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, ElementGlyph, SectionHeader } from '@components/ui';
import { MEMBERSHIP_TIERS } from '@/data/elements';
import { formatCompactVND } from '@/utils/formatters';

/**
 * Membership tease — uses the Element system as visual cue.
 * REQS §4.1.5 + §4.2.7: Loyalty (Base → Scholar → Kinetic).
 */
export function MembershipTeaser() {
  return (
    <section className="bg-white py-20 dark:bg-ink-950 md:py-32">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          marker="// 06 — Elementa Rewards"
          eyebrow="Membership"
          title={
            <>
              Đi cùng phòng lab.
              <br />
              <span className="text-gradient-amber">Nhận đặc quyền theo cấp.</span>
            </>
          }
          description="3 tier theo bảng nguyên tố. Tích điểm 1đ/100K, đổi voucher, mời sự kiện kín. Sinh nhật giảm thêm 10%."
          action={
            <Link to="/account/rewards">
              <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Cách hoạt động
              </Button>
            </Link>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-card-light dark:border-white/[0.06] dark:bg-ink-700 dark:hover:shadow-card-dark"
            >
              <div className="flex items-start justify-between">
                <ElementGlyph code={tier.elementCode} size="lg" showName />
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    Threshold
                  </p>
                  <p className="font-mono text-sm font-medium" style={{ color: tier.color }}>
                    {tier.threshold === 0 ? 'Bắt đầu' : formatCompactVND(tier.threshold)}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  {tier.label}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Tier 0{i + 1} / 03
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tier.color }} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 0%, ${tier.color}1f, transparent 60%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
