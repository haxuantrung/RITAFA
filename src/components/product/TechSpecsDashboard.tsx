import { BadgeCheck, Factory, Layers } from 'lucide-react';
import { ProgressBar } from '@components/ui';
import type { FabricSpec } from '@/types';

interface TechSpecsDashboardProps {
  spec: FabricSpec;
}

/**
 * The signature element of PDP — REQS §4.1.3.
 * Renders the fabric spec sheet like a scientific data dashboard.
 * Goes far beyond a typical e-commerce description.
 */
export function TechSpecsDashboard({ spec }: TechSpecsDashboardProps) {
  const performance = [
    { label: 'Stretch', value: spec.stretch },
    { label: 'Breathability', value: spec.breathability },
    { label: 'Thermal Regulation', value: spec.thermalRegulation },
    { label: 'Moisture Wicking', value: spec.moistureWicking },
    { label: 'Durability', value: spec.durability },
  ];

  return (
    <div className="space-y-8 rounded-3xl border border-black/[0.06] bg-white p-6 dark:border-white/[0.06] dark:bg-ink-700 md:p-8">
      {/* Top: GSM card + weave card */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/[0.06] bg-ink-50 p-5 dark:border-white/[0.06] dark:bg-ink-800">
          <p className="lab-label">GSM · Weight</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl font-semibold tracking-tight">{spec.gsm}</span>
            <span className="font-mono text-xs text-muted">g/m²</span>
          </div>
          <p className="mt-2 text-caption text-muted">
            {spec.gsm < 180 ? 'Lightweight · Cảm giác mỏng nhẹ' : spec.gsm < 280 ? 'Mid · Cân bằng' : 'Heavy · Đứng form'}
          </p>
        </div>
        <div className="rounded-2xl border border-black/[0.06] bg-ink-50 p-5 dark:border-white/[0.06] dark:bg-ink-800">
          <p className="lab-label">Weave Structure</p>
          <div className="mt-2 flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            <span className="font-display text-2xl font-semibold">{spec.weave}</span>
          </div>
          <p className="mt-2 text-caption text-muted">
            {spec.weave === 'Twill' ? 'Bền, ít nhăn — chuyên dùng cho áo sơ mi/quần' :
             spec.weave === 'Jersey' ? 'Mềm, co giãn — quen thuộc với áo thun' :
             spec.weave === 'Interlock' ? 'Dày dặn 2 lớp đan — chống biến dạng' :
             'Cấu trúc truyền thống'}
          </p>
        </div>
      </div>

      {/* Composition bar */}
      <div>
        <p className="lab-label mb-3">Composition</p>
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {spec.composition.map((c, i) => (
            <div
              key={c.material}
              className="h-full"
              style={{
                width: `${c.percent}%`,
                background:
                  i === 0 ? '#D4AF37' : i === 1 ? '#60A5FA' : i === 2 ? '#9CA3AF' : '#4ADE80',
              }}
              title={`${c.material} ${c.percent}%`}
            />
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {spec.composition.map((c, i) => (
            <div key={c.material} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background:
                    i === 0 ? '#D4AF37' : i === 1 ? '#60A5FA' : i === 2 ? '#9CA3AF' : '#4ADE80',
                }}
              />
              <span className="font-mono text-xs">{c.percent}%</span>
              <span>{c.material}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance bars */}
      <div>
        <p className="lab-label mb-4">Performance · Lab Tested</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {performance.map((p) => (
            <ProgressBar key={p.label} label={p.label} value={p.value} showValue tone="amber" />
          ))}
        </div>
      </div>

      {/* Certifications + Factory */}
      <div className="grid gap-4 border-t border-black/[0.06] pt-6 dark:border-white/[0.06] md:grid-cols-2">
        <div>
          <p className="lab-label mb-3">Certifications</p>
          <ul className="space-y-2">
            {spec.certifications.map((cert) => (
              <li key={cert} className="flex items-center gap-2 text-sm">
                <BadgeCheck className="h-4 w-4 text-success" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="lab-label mb-3">Origin Factory</p>
          <div className="flex items-start gap-3">
            <Factory className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium">{spec.factory}</p>
              <p className="text-caption text-muted">
                Owned by Rita Võ Group · ISO 14001 + SA8000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
