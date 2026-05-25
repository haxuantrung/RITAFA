import { useState } from 'react';
import { Calculator, Ruler } from 'lucide-react';
import { Button, Input } from '@components/ui';

/**
 * Fit Guide tab content — REQS §4.1.3.
 * Interactive "Find My Size" calculator + reference size table.
 */
export function FitGuide() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fit, setFit] = useState<'slim' | 'regular' | 'loose'>('regular');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleCalc = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = w / Math.pow(h / 100, 2);
    let size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
    if (bmi < 18) size = 'XS';
    else if (bmi < 21) size = 'S';
    else if (bmi < 24) size = 'M';
    else if (bmi < 27) size = 'L';
    else if (bmi < 30) size = 'XL';
    else size = 'XXL';
    if (fit === 'slim') size = size === 'XS' ? 'XS' : (['XS', 'S', 'M', 'L', 'XL'] as const)[Math.max(0, ['XS', 'S', 'M', 'L', 'XL', 'XXL'].indexOf(size) - 1)] as typeof size;
    if (fit === 'loose') size = size === 'XXL' ? 'XXL' : (['S', 'M', 'L', 'XL', 'XXL', 'XXL'] as const)[Math.min(5, ['XS', 'S', 'M', 'L', 'XL', 'XXL'].indexOf(size) + 1)] as typeof size;
    setRecommendation(size);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Calculator */}
      <div className="rounded-3xl border border-amber-500/30 bg-amber-50/40 p-6 dark:border-amber-500/30 dark:bg-amber-500/[0.04]">
        <div className="mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-amber-500" />
          <h4 className="font-display text-lg font-semibold">Find My Size</h4>
        </div>
        <p className="mb-5 text-sm text-muted">
          Nhập số đo cơ thể — chúng tôi sẽ gợi ý size phù hợp dựa trên bảng đo của hơn 12,000 khách thật.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Chiều cao"
            placeholder="170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            rightSlot={<span className="font-mono text-xs text-muted">cm</span>}
          />
          <Input
            label="Cân nặng"
            placeholder="60"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            rightSlot={<span className="font-mono text-xs text-muted">kg</span>}
          />
        </div>

        <div className="mt-4 space-y-1.5">
          <p className="lab-label">Phong cách mặc</p>
          <div className="flex gap-2">
            {(['slim', 'regular', 'loose'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFit(f)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  fit === f
                    ? 'border-amber-500 bg-amber-500 text-ink-900'
                    : 'border-black/[0.08] hover:border-amber-500 dark:border-white/[0.08]'
                }`}
              >
                {f === 'slim' ? 'Ôm' : f === 'regular' ? 'Regular' : 'Rộng'}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleCalc} fullWidth className="mt-5">
          Tính size đề xuất
        </Button>

        {recommendation && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-amber-500 bg-white p-5 dark:bg-ink-700">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 font-display text-2xl font-bold text-ink-900">
              {recommendation}
            </div>
            <div>
              <p className="font-medium">Size đề xuất cho bạn</p>
              <p className="text-caption text-muted">Dựa trên 12K+ khách hàng cùng số đo</p>
            </div>
          </div>
        )}
      </div>

      {/* Size table */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Ruler className="h-5 w-5 text-amber-500" />
          <h4 className="font-display text-lg font-semibold">Bảng size (cm)</h4>
        </div>
        <div className="overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06]">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 dark:bg-ink-800">
              <tr className="font-mono text-[10px] uppercase tracking-widest text-muted">
                <th className="p-3 text-left">Size</th>
                <th className="p-3 text-right">Ngực</th>
                <th className="p-3 text-right">Eo</th>
                <th className="p-3 text-right">Dài áo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: 'XS', chest: 86, waist: 70, length: 64 },
                { s: 'S', chest: 90, waist: 74, length: 66 },
                { s: 'M', chest: 96, waist: 80, length: 68 },
                { s: 'L', chest: 102, waist: 86, length: 70 },
                { s: 'XL', chest: 108, waist: 92, length: 72 },
                { s: 'XXL', chest: 114, waist: 98, length: 74 },
              ].map((row) => (
                <tr
                  key={row.s}
                  className="border-t border-black/[0.06] font-mono text-sm dark:border-white/[0.06]"
                >
                  <td className="p-3 font-medium">{row.s}</td>
                  <td className="p-3 text-right">{row.chest}</td>
                  <td className="p-3 text-right">{row.waist}</td>
                  <td className="p-3 text-right">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
